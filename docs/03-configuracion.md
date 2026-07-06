---
title: "Configuración"
description: "Configuración detallada del vault, MCP Server, Harness, prompts y seguridad"
tags: [configuracion, setup]
sidebar_position: 3
---

# ⚙️ Configuración detallada del sistema

> Una vez instalado todo, aquí tienes los pasos para configurar cada componente.

## 📋 Tabla de contenidos

- [📁 1. Estructura recomendada del vault](#-1-estructura-recomendada-del-vault)
- [🔧 2. Configuración del MCP Server](#-2-configuración-del-mcp-server)
- [⚙️ 3. Configuración del Harness](#-3-configuración-del-harness)
- [🤖 4. Configurar los prompts](#-4-configurar-los-prompts)
- [🔐 5. Seguridad y buenas prácticas](#-5-seguridad-y-buenas-prácticas)
- [🧪 6. Probar la configuración](#-6-probar-la-configuración)

---

## 📁 1. Estructura recomendada del vault

```
📁 DigitalBrain/                    # ← Tu vault de Obsidian
├── 📥 Inbox/                       # Todo lo nuevo llega aquí
│   └── nota-sin-procesar.md
├── 🗂️ Proyectos/                   # Proyectos activos
│   ├── proyecto-uno/
│   └── proyecto-dos/
├── 📚 Referencias/                 # Conocimiento permanente
│   ├── conceptos/
│   ├── personas/
│   └── recursos/
├── 📅 Diario/                      # Daily notes
│   └── 2024-07-05.md
└── 🗺️ MOCs/                       # Maps of Content (índices)
    └── moc-aprendizaje.md
```

> 💡 Puedes copiar [`../config/vault-estructura.md`](../config/vault-estructura.md) como referencia.

---

## 🔧 2. Configuración del MCP Server

### 2.1 Configurar obsidian-mcp-server

El servidor MCP necesita saber dónde está tu vault:

```bash
# Método 1: Variable de entorno
export OBSIDIAN_VAULT_PATH="/ruta/a/tu/vault"

# Método 2: Pasar como argumento
npx @n8n/obsidian-mcp-server --vault /ruta/a/tu/vault
```

### 2.2 Configurar en Claude Desktop

Si usas Claude Desktop, agrega esto a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": [
        "@n8n/obsidian-mcp-server",
        "--vault",
        "/ruta/a/tu/vault"
      ]
    }
  }
}
```

### 2.3 Configurar en Claude Code

```bash
# Agregar el MCP server
claude mcp add obsidian -- npx @n8n/obsidian-mcp-server --vault /ruta/a/tu/vault

# Ver servidores configurados
claude mcp list

# Probar la conexión
claude mcp call obsidian list_notes
```

---

## ⚙️ 3. Configuración del Harness

El Harness orquesta la comunicación entre Claude y Obsidian.

### 3.1 Usar el script incluido

Edita [`../config/harness-config.yaml`](../config/harness-config.yaml) con tus rutas:

```yaml
vault_path: "/Users/tu-usuario/DigitalBrain"
mcp_server: "@n8n/obsidian-mcp-server"
claude_model: "claude-sonnet-4-20250514"
```

### 3.2 Variables de entorno

Crea un archivo `.env`:

```bash
# .env (NUNCA subas esto al repo)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
OBSIDIAN_VAULT_PATH=/ruta/a/tu/vault
DIGITAL_BRAIN_HOME=~/.digital-brain
```

---

## 🤖 4. Configurar los prompts

Los prompts están en la carpeta [`../prompts/`](../prompts/). Para usarlos:

```bash
# Ejecutar un prompt directamente
claude "$(cat prompts/procesar-entrada.md)"

# O cargarlo como instrucción inicial
claude --prompt "$(cat prompts/revision-diaria.md)"
```

### 4.1 Prompt de sistema personalizado

Puedes crear un prompt de sistema que Claude cargue siempre:

```bash
# Crear prompt de sistema
cat > ~/.digital-brain/system-prompt.md << 'EOF'
Eres un asistente especializado en gestionar conocimiento personal.
Tienes acceso a un vault de Obsidian a través de MCP.
Tus funciones son:
1. Procesar información nueva y estructurarla
2. Conectar notas relacionadas
3. Extraer insights y patrones
4. Mantener el vault organizado
EOF

# Decirle a Claude que lo use
claude --system "$(cat ~/.digital-brain/system-prompt.md)"
```

---

## 🔐 5. Seguridad y buenas prácticas

### API Key

```bash
# NUNCA pongas la API Key en el código
# Usa variables de entorno
export ANTHROPIC_API_KEY="sk-ant-..."

# O un archivo .env (agregado a .gitignore)
```

### Backups automáticos

Configura backups periódicos de tu vault:

👉 Consulta la guía en [`scripts/backup-vault.md`](../scripts/backup-vault.md) para las distintas opciones de backup.

```bash
# Backup diario con cron (ejecuta a las 2 AM)
0 2 * * * cd /ruta/al/vault && tar -czf "~/backups/vault-$(date +\%Y\%m\%d).tar.gz" .
```

### Git para el vault

```bash
# Inicializar git en el vault (opcional)
cd /ruta/a/tu/vault
git init
git add .
git commit -m "Initial vault"

# Ignorar archivos de configuración
echo ".obsidian/" >> .gitignore
```

---

## 🧠 6. Configurar Graphify (Grafo de conocimiento)

Graphify escanea tu vault de Obsidian y genera un grafo de conocimiento navegable.

### 6.1 Instalar Graphify

```bash
# Instalar paquete Python (oficial: graphifyy con doble 'y')
pip install graphifyy

# Instalar skill en Claude Code (auto-detecta plataforma)
graphify install

# Verificar
graphify status
```

> 💡 **Tip:** El paquete en PyPI se llama `graphifyy` (doble 'y'). El comando CLI sigue siendo `graphify`.

**Extras opcionales:**
```bash
# PDF support
pip install "graphifyy[pdf]"

# Video/audio transcription (faster-whisper + yt-dlp)
pip install "graphifyy[video]"

# MCP server
pip install "graphifyy[mcp]"

# Neo4j export
pip install "graphifyy[neo4j]"

# Todo junto
pip install "graphifyy[all]"
```

### 6.2 Usar Graphify en tu vault

```bash
# Escaneo único (genera graphify-out/ en el directorio actual)
cd /ruta/a/tu/vault
graphify .

# Con vault Obsidian específico (escribe en vault existente sin tocar tus notas)
graphify . --obsidian --obsidian-dir ~/vaults/mi-proyecto

# Modo vigilancia (actualiza automáticamente al detectar cambios)
graphify watch

# Ver estado y configuración
graphify status

# Consultar el grafo
graphify query "¿Cómo se conecta X con Y?"

# Reconstruir solo cambios (incremental via cache SHA256)
graphify . --update

# Git hook: reconstruir en cada commit
graphify hook install
```

### 6.3 Outputs que genera Graphify

```
graphify-out/
├── graph.html           ← Visualización HTML interactiva (click, filtra, busca)
├── GRAPH_REPORT.md      ← Auditoría: god nodes, conexiones sorprendentes, preguntas sugeridas
├── graph.json           ← Grafo persistente (node-link format, NetworkX/Neo4j compatible)
├── obsidian/            ← Vault Obsidian (solo si usaste --obsidian)
│   ├── entities/        ← Cada entidad = nota .md con wikilinks
│   └── relationships/   ← Relaciones como notas
├── wiki/                ← Wiki navegable estilo Wikipedia (--wiki)
│   ├── index.md
│   └── ...
├── cache/               ← SHA256 cache (re-runs en segundos en corpus sin cambios)
│   └── ...
└── memory/              ← Q&A feedback loop (respuestas guardadas como nodos)
    └── ...
```

### 6.4 Integrar con el flujo de trabajo

| Output | Comando | Para qué sirve |
|--------|---------|----------------|
| Grafo visual | `graphify .` → abre `graphify-out/graph.html` | Explorar conocimiento visualmente, filtrar por comunidad |
| Vault Obsidian | `graphify . --obsidian` → abre en Obsidian | Graph view nativo, Dataview, wikilinks |
| Wiki estática | `graphify . --wiki` → `graphify-out/wiki/` | Publicar en GitHub Pages |
| Reporte | `cat graphify-out/GRAPH_REPORT.md` | God nodes, conexiones sorpresa, preguntas sugeridas |
| MCP Server | `python -m graphify.serve graphify-out/graph.json` | Herramientas: query_graph, get_node, get_neighbors, shortest_path, get_pr_impact, triage_prs |

> 💡 **Tip:** Añade `graphify-out/` a `.gitignore`. El cache SHA256 hace que re-runs en corpus sin cambios tomen segundos. Usa `graphify hook install` para auto-rebuild en cada commit.

---

## 🧪 7. Probar la configuración

```bash
# 1. Verificar que el MCP server responde
claude mcp call obsidian health

# 2. Listar notas del vault
claude mcp call obsidian list_notes limit=5

# 3. Procesar información de prueba
echo "La teoría de cuerdas propone que..." | claude --prompt "Procesa esta información y guárdala en mi vault:"

# 4. Verificar que se creó la nota
ls /ruta/a/tu/vault/Inbox/
```

---

## ✅ Checklist de configuración

- [ ] 📁 Vault estructurado (Inbox, Proyectos, Referencias, Diario)
- [ ] 🔌 MCP Server configurado y funcionando
- [ ] ⚙️ Harness configurado con rutas correctas
- [ ] 🤖 Prompts de sistema cargados
- [ ] 🔐 API Key segura en variable de entorno
- [ ] 💾 Backups configurados
- [ ] 🧠 Graphify instalado (`pip install graphifyy && graphify install`)
- [ ] 🧪 Prueba de extremo a extremo funcionando

---

## ➡️ Siguiente paso

⬅️ **Anterior:** [`02-instalacion.md`](./02-instalacion.md) 📥 · **Siguiente:** [`04-prompts.md`](./04-prompts.md) 🤖
