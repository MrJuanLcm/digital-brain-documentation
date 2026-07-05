---
title: "Cheatsheet"
description: "Comandos y prompts esenciales del Digital Brain en una página"
tags: [cheatsheet, referencia-rapida]
sidebar_position: 10
---

# 📋 Cheatsheet — Digital Brain

> Referencia rápida de comandos y prompts. Una página para lo esencial.

---

## 🚀 Instalación

```bash
npm install -g @anthropic-ai/claude-code           # Claude Code
npm install -g @n8n/obsidian-mcp-server            # MCP Server
export ANTHROPIC_API_KEY="sk-ant-..."              # API Key
```

---

## 🔌 Conexión Claude ↔ Obsidian

```bash
# Iniciar MCP Server
obsidian-mcp-server --vault /ruta/al/vault

# Registrar en Claude
claude mcp add obsidian -- npx @n8n/obsidian-mcp-server --vault /ruta/al/vault

# Ver servidores activos
claude mcp list

# Probar conexión
claude "Busca notas sobre [tema] en mi vault"
```

---

## 🤖 Prompts esenciales

| Acción | Comando |
|---|---|
| 📥 Procesar info nueva | `cat archivo \| claude "$(cat prompts/procesar-entrada.md)"` |
| 🔄 Sincronizar vault | `claude "$(cat prompts/sincronizar-vault.md)"` |
| 💡 Generar insights | `claude "$(cat prompts/generar-insights.md)"` |
| 📅 Revisión diaria | `claude "$(cat prompts/revision-diaria.md)"` |

---

## ⚙️ MCP Tools disponibles

| Tool | Descripción | Ejemplo |
|---|---|---|
| `list_notes` | Lista notas en carpeta | `folder="Inbox"` |
| `read_note` | Lee contenido | `path="nota.md"` |
| `create_note` | Crea nueva nota | `title="...", content="..."` |
| `update_note` | Actualiza nota | `path="...", content="..."` |
| `search_notes` | Busca en vault | `query="machine learning"` |
| `get_vault_stats` | Estadísticas | — |

---

## 📁 Estructura del vault

```
📁 Vault/
├── 📥 Inbox/          ← Info nueva sin procesar
├── 🗂️ Proyectos/       ← Proyectos activos
├── 📚 Referencias/     ← Conocimiento permanente
├── 📅 Diario/          ← Notas diarias (YYYY-MM-DD.md)
└── 🗺️ MOCs/            ← Mapas de Contenido
```

---

## 🧠 Graphify

```bash
pip install graphifyy                       # Instalar Graphify
graphify install                             # Instalar skill en Claude Code
graphify .                                   # Generar grafo en carpeta actual
graphify watch                               # Regenerar automáticamente al detectar cambios
graphify status                              # Ver estado del skill
```

### Outputs principales

| Archivo | Para qué |
|---|---|
| `graphify-out/graph.html` | Visualizar grafo en navegador |
| `graphify-out/obsidian/` | Abrir como vault de Obsidian |
| `graphify-out/GRAPH_REPORT.md` | Reporte legible del grafo |
| `graphify-out/graph.json` | Grafo en JSON para otras herramientas |

### Alias para `~/.zshrc`

```bash
alias brain-graph='graphify .'
alias brain-graph-watch='graphify watch'
```

### Flujo integrado

```bash
cd ~/digital-brain       # Ir al vault o proyecto
graphify .               # Generar grafo
claude "$(cat prompts/graphify-insights.md)"  # Analizar con Claude
```

---

## 🛠️ Troubleshooting rápido

| Problema | Solución |
|---|---|
| `command not found: claude` | `npm install -g @anthropic-ai/claude-code` |
| `API Key is not set` | `export ANTHROPIC_API_KEY="sk-ant-..."` |
| `MCP server no conecta` | `claude mcp add obsidian -- npx @n8n/...` |
| `Permisos denegados` | `chmod -R 755 /ruta/vault` |

---

## 🧠 Consejos rápidos

> 💡 **Alias útiles** para tu `~/.zshrc`:
> ```bash
> alias brain-process='claude "$(cat ~/digital-brain/prompts/procesar-entrada.md)"'
> alias brain-review='claude "$(cat ~/digital-brain/prompts/revision-diaria.md)"'
> alias brain-insights='claude "$(cat ~/digital-brain/prompts/generar-insights.md)"'
> ```

> 🚀 **Flujo diario recomendado:**
> 1. 📥 Captura ideas en Inbox durante el día
> 2. 💡 Por la noche: `brain-process` para lo nuevo
> 3. 📅 Cierra con: `brain-review`
