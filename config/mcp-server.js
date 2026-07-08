#!/usr/bin/env node

/**
 * 🧠 Digital Brain — MCP Server para Obsidian
 * =============================================
 *
 * Servidor MCP que conecta Claude CLI con Obsidian.
 * Expone herramientas para leer, crear y buscar notas
 * en el vault de Obsidian del usuario.
 *
 * Uso (cualquiera de estas formas):
 *   export OBSIDIAN_VAULT_PATH="/ruta/al/vault" && node mcp-server.js
 *   node mcp-server.js /ruta/al/vault
 *   node mcp-server.js --vault /ruta/al/vault
 *   node mcp-server.js --version
 *
 * Requisitos:
 *   - Node.js 18+
 *   - @modelcontextprotocol/sdk
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_VERSION = "1.0.0";

// ─── Parseo de argumentos ───────────────────────────────
/**
 * Resuelve la ruta del vault desde (en orden de prioridad):
 *   1. --vault <ruta>  (o --vault=<ruta>)
 *   2. primer argumento posicional
 *   3. variable de entorno OBSIDIAN_VAULT_PATH
 * Soporta también --version / -v.
 */
function parseArgs(argv) {
  const args = argv.slice(2);
  let vault = null;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--version" || arg === "-v") {
      console.log(SERVER_VERSION);
      process.exit(0);
    } else if (arg === "--vault") {
      vault = args[++i];
    } else if (arg.startsWith("--vault=")) {
      vault = arg.slice("--vault=".length);
    } else if (!arg.startsWith("-") && vault === null) {
      vault = arg; // primer posicional
    }
  }
  return vault || process.env.OBSIDIAN_VAULT_PATH || null;
}

// ─── Configuración ──────────────────────────────────────
const VAULT_PATH = parseArgs(process.argv);
if (!VAULT_PATH) {
  console.error("❌ Define OBSIDIAN_VAULT_PATH o pasa la ruta con --vault /ruta/al/vault");
  process.exit(1);
}

if (!fs.existsSync(VAULT_PATH)) {
  console.error(`❌ El vault no existe: ${VAULT_PATH}`);
  process.exit(1);
}

console.error(`📁 Vault: ${VAULT_PATH}`);

// ─── Utilidades ──────────────────────────────────────────

/** Normaliza una ruta dentro del vault (seguridad: evita path traversal) */
function safePath(filePath) {
  const normalized = path.normalize(filePath).replace(/^\/+/, "");
  const fullPath = path.join(VAULT_PATH, normalized);
  if (!fullPath.startsWith(VAULT_PATH)) {
    throw new Error("Acceso denegado: fuera del vault");
  }
  return fullPath;
}

/** Lee el contenido de un archivo .md */
function readNote(filePath) {
  const fullPath = safePath(filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Nota no encontrada: ${filePath}`);
  }
  return fs.readFileSync(fullPath, "utf-8");
}

/** Escribe contenido en un archivo .md */
function writeNote(filePath, content) {
  const fullPath = safePath(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, "utf-8");
  return fullPath;
}

/** Lista archivos .md en una carpeta */
function listNotes(folderPath) {
  const fullPath = safePath(folderPath || "");
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs.readdirSync(fullPath)
    .filter(f => f.endsWith(".md"))
    .map(f => ({
      name: f,
      path: path.join(folderPath || "", f),
      modified: fs.statSync(path.join(fullPath, f)).mtime.toISOString(),
    }));
}

/** Busca texto en el contenido de las notas */
function searchNotes(query) {
  const results = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (content.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            name: entry.name,
            path: path.relative(VAULT_PATH, fullPath),
            snippet: content.slice(0, 200),
          });
        }
      }
    }
  }
  walk(VAULT_PATH);
  return results;
}

function getVaultStats() {
  let totalNotes = 0;
  let totalSize = 0;
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md")) {
        totalNotes++;
        totalSize += fs.statSync(fullPath).size;
      }
    }
  }
  walk(VAULT_PATH);
  return {
    totalNotes,
    totalSizeBytes: totalSize,
    vaultPath: VAULT_PATH,
    folders: fs.readdirSync(VAULT_PATH).filter(f =>
      fs.statSync(path.join(VAULT_PATH, f)).isDirectory() && !f.startsWith(".")
    ),
  };
}

// ─── MCP Server ──────────────────────────────────────────

const server = new Server(
  {
    name: "obsidian-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// ─── Resources — recursos que Claude puede leer ─────────

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const notes = listNotes("");
  return {
    resources: notes.map(n => ({
      uri: `obsidian://note/${n.path.replace(/\.md$/, "")}`,
      name: n.name.replace(/\.md$/, ""),
      description: `Nota: ${n.name}`,
      mimeType: "text/markdown",
    })),
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const notePath = uri.replace("obsidian://note/", "") + ".md";
  const content = readNote(notePath);
  return {
    contents: [
      {
        uri: uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
});

// ─── Tools — herramientas que Claude puede ejecutar ──────

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_notes",
        description: "Lista notas en una carpeta del vault",
        inputSchema: {
          type: "object",
          properties: {
            folder: {
              type: "string",
              description: "Carpeta (ej: '', 'Inbox', 'Referencias')",
            },
          },
        },
      },
      {
        name: "read_note",
        description: "Lee el contenido de una nota",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Ruta de la nota" },
          },
          required: ["path"],
        },
      },
      {
        name: "create_note",
        description: "Crea una nueva nota en el vault",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Título de la nota (sin .md)" },
            content: { type: "string", description: "Contenido en Markdown" },
            folder: {
              type: "string",
              description: "Carpeta (ej: 'Inbox', 'Referencias')",
              default: "Inbox",
            },
          },
          required: ["title", "content"],
        },
      },
      {
        name: "update_note",
        description: "Actualiza el contenido de una nota existente",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Ruta de la nota" },
            content: { type: "string", description: "Nuevo contenido en Markdown" },
          },
          required: ["path", "content"],
        },
      },
      {
        name: "delete_note",
        description: "Elimina una nota del vault",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Ruta de la nota" },
          },
          required: ["path"],
        },
      },
      {
        name: "search_notes",
        description: "Busca texto en todas las notas del vault",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Texto a buscar" },
          },
          required: ["query"],
        },
      },
      {
        name: "get_vault_stats",
        description: "Obtiene estadísticas del vault",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_notes": {
        const notes = listNotes(args?.folder || "");
        return {
          content: [{ type: "text", text: JSON.stringify(notes, null, 2) }],
        };
      }

      case "read_note": {
        const content = readNote(args.path);
        return {
          content: [{ type: "text", text: content }],
        };
      }

      case "create_note": {
        const filename = args.title.endsWith(".md") ? args.title : `${args.title}.md`;
        const folder = args.folder || "Inbox";
        const filePath = path.join(folder, filename);
        const fullPath = writeNote(filePath, args.content);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              success: true,
              path: path.relative(VAULT_PATH, fullPath),
            }, null, 2),
          }],
        };
      }

      case "update_note": {
        writeNote(args.path, args.content);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ success: true, path: args.path }, null, 2),
          }],
        };
      }

      case "delete_note": {
        const fullPath = safePath(args.path);
        fs.unlinkSync(fullPath);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ success: true, path: args.path }, null, 2),
          }],
        };
      }

      case "search_notes": {
        const results = searchNotes(args.query);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      }

      case "get_vault_stats": {
        const stats = getVaultStats();
        return {
          content: [{ type: "text", text: JSON.stringify(stats, null, 2) }],
        };
      }

      default:
        throw new Error(`Tool not found: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

// ─── Iniciar servidor ────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ MCP Server conectado y listo");
}

main().catch((error) => {
  console.error("❌ Error fatal:", error);
  process.exit(1);
});
