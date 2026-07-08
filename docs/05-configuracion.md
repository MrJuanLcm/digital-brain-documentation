---
title: "Configuración"
description: "Configuración detallada del vault, MCP Server, Harness, prompts y seguridad"
tags: [configuracion, setup]
sidebar_position: 5
---

# ⚙️ Configuración detallada del sistema

> Una vez instalado todo, aquí tienes los pasos para configurar cada componente.

## 📋 Tabla de contenidos

- [📁 1. Estructura recomendada del vault](#-1-estructura-recomendada-del-vault)
- [🔧 2. Configuración del MCP Server](#-2-configuración-del-mcp-server)
- [⚙️ 3. Configuración del Harness](#-3-configuración-del-harness)
- [🤖 4. Configurar los prompts](#-4-configurar-los-prompts)
- [🔐 5. Seguridad y buenas prácticas](#-5-seguridad-y-buenas-prácticas)
- [🧠 6. Configurar Graphify](#-6-configurar-graphify-grafo-de-conocimiento)
- [🧪 7. Probar la configuración](#-7-probar-la-configuración)
- [✅ Checklist de configuración](#-checklist-de-configuración)

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
├── 📅 Diario/                      # Daily notes (YYYY-MM-DD.md)
│   └── 2026-07-08.md
└── 🗺️ MOCs/                       # Maps of Content (índices)
    └── moc-aprendizaje.md
```

> 💡 Puedes copiar [`../config/vault-estructura.md`](../config/vault-estructura.md) como referencia.

---

## 🔧 2. Configuración del MCP Server

### 2.1 Configurar el servidor MCP

El servidor MCP necesita saber dónde está tu vault. En todos los ejemplos, `/ruta/a/tu/vault` es **la ruta que anotaste en el Paso 1 de la instalación** (la misma que exportaste como `OBSIDIAN_VAULT_PATH`):

```bash
# Método 1: Variable de entorno (recomendado; ya lo hiciste en el Paso 5.1)
export OBSIDIAN_VAULT_PATH="$HOME/DigitalBrain"

# Método 2: Pasar como argumento
node config/mcp-server.js --vault "$OBSIDIAN_VAULT_PATH"
```

### 2.2 Configurar en Claude Desktop

Si usas Claude Desktop, agrega esto a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "node",
      "args": [
        "/ruta/absoluta/a/mi-cerebro-digital/config/mcp-server.js",
        "--vault",
        "/ruta/a/tu/vault"
      ]
    }
  }
}
```

> ⚠️ En Claude Desktop usa **rutas absolutas** tanto para `mcp-server.js` como para el vault. A diferencia de Claude Code (que arranca desde la raíz de tu proyecto), Desktop no tiene un directorio de trabajo fijo, así que una ruta relativa como `config/mcp-server.js` fallaría.

### 2.3 Configurar en Claude Code

```bash
# Agregar el MCP server
claude mcp add obsidian -- node config/mcp-server.js --vault /ruta/a/tu/vault

# Ver servidores configurados
claude mcp list

# Ver el detalle del servidor recién añadido
claude mcp get obsidian
```

> 💡 **Probar la conexión de verdad:** abre una sesión con `claude` y pídele
> algo que use el servidor, p. ej. *"lista las notas de mi vault"* o
> *"crea una nota de prueba en Inbox"*. Si Claude responde usando las
> herramientas del MCP, la conexión funciona. (No existe un subcomando
> `claude mcp call`; las herramientas se invocan desde la conversación.)

---

## ⚙️ 3. Configuración del Harness

El "Harness" es la capa de orquestación que coordina Claude, MCP, Obsidian y Graphify. No es un demonio que se ejecute aparte: es la suma de la configuración, el registro MCP, los prompts y los scripts.

> 📄 Explicación completa de qué es y qué no es el Harness: [`03-harness.md`](./03-harness.md).

### 3.1 Usar la plantilla de configuración incluida

Edita [`../config/harness-config.yaml`](../config/harness-config.yaml) con tus rutas (es una plantilla de referencia; los valores efectivos los toman el servidor MCP y los scripts vía variables de entorno):

```yaml
vault_path: "/Users/tu-usuario/DigitalBrain"
mcp_server: "node config/mcp-server.js"
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
# Ejecutar un prompt en modo interactivo (abre la sesión con ese prompt)
claude "$(cat prompts/procesar-entrada.md)"

# O ejecutarlo en modo no interactivo (imprime la respuesta y termina)
claude -p "$(cat prompts/revision-diaria.md)"
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

# Decirle a Claude que lo use (se añade al prompt de sistema por defecto)
claude --append-system-prompt "$(cat ~/.digital-brain/system-prompt.md)"
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

> ℹ️ Si ya lo instalaste en el [Paso 4 de la instalación](./04-instalacion.md), **salta esta parte** y ve directo a la 6.2. Es el mismo paquete.

```bash
# Instalar paquete Python (oficial: graphifyy con doble 'y')
pip install graphifyy

# Verificar
graphify --help
```

> 💡 **Tip:** El paquete en PyPI se llama `graphifyy` (doble 'y') — no es un error de tipeo. El comando CLI sigue siendo `graphify`.

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
graphify . --watch

# Ver estado y configuración
graphify --help

# Consultar el grafo
graphify query "¿Cómo se conecta X con Y?"

# Reconstruir solo cambios (incremental via cache SHA256)
graphify . --update

# Reconstruir en cada commit: usa un git hook post-commit que ejecute `graphify . --update`
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

> 💡 **Tip:** Añade `graphify-out/` a `.gitignore`. El cache SHA256 hace que re-runs en corpus sin cambios tomen segundos. Configura auto-rebuild en cada commit con un git hook post-commit que ejecute `graphify . --update`.

---

## 🧪 7. Probar la configuración

```bash
# 1. Verificar que el MCP server está registrado y sano
claude mcp list          # debe aparecer "obsidian"
claude mcp get obsidian  # muestra el comando y su estado

# 2. Probar las herramientas desde una sesión (modo no interactivo)
claude -p "Lista 5 notas de mi vault de Obsidian usando el MCP"

# 3. Procesar información de prueba de extremo a extremo
echo "La teoría de cuerdas propone que..." | \
  claude -p "Procesa esta información y guárdala como nota en Inbox de mi vault"

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
- [ ] 🧠 Graphify instalado (`pip install graphifyy`)
- [ ] 🧪 Prueba de extremo a extremo funcionando

---

## ➡️ Siguiente paso

⬅️ **Anterior:** [`04-instalacion.md`](./04-instalacion.md) 📥 · **Siguiente:** [`06-graphify-integracion.md`](./06-graphify-integracion.md) 🧠
