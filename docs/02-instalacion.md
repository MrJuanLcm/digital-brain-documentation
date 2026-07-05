---
title: "Instalación"
description: "Guía paso a paso para instalar Node.js, Obsidian, Claude CLI y el MCP Server"
tags: [instalacion, setup]
sidebar_position: 2
---

# 📥 Guía de instalación paso a paso

> Sigue esta guía en orden para tener todo listo.

## 📋 Tabla de contenidos

- [📋 Prerequisitos](#-prerequisitos)
- [🪜 Paso 1: Instalar Obsidian](#-paso-1-instalar-obsidian)
- [🪜 Paso 2: Instalar Claude CLI](#-paso-2-instalar-claude-cli)
- [🪜 Paso 3: Instalar el MCP Server](#-paso-3-instalar-el-mcp-server)
- [🪜 Paso 4: Configurar todo junto](#-paso-4-configurar-todo-junto)
- [🪜 Paso 5: Verificar que todo funciona](#-paso-5-verificar-que-todo-funciona)
- [✅ Checklist de instalación](#-checklist-de-instalación)

---

## 📋 Prerequisitos

Antes de empezar, asegúrate de tener:

| Herramienta | Versión mínima | Cómo verificarlo |
|---|---|---|
| **Node.js** | v18+ | `node --version` |
| **npm** | v9+ | `npm --version` |
| **Git** | cualquier | `git --version` |
| **Obsidian** | v1.5+ | Abre Obsidian → Configuración → Acerca de |

Si no tienes Node.js:

```bash
# macOS (con Homebrew)
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Descarga desde: https://nodejs.org/
```

---

## 🪜 Paso 1: Instalar Obsidian

1. Ve a [obsidian.md](https://obsidian.md) y descarga la versión para tu SO
2. Instálalo como cualquier aplicación
3. Crea un **nuevo vault** (o usa uno existente)
4. **Importante:** Anota la ruta de tu vault. Ejemplo:
   - macOS: `~/Documents/DigitalBrain/`
   - Windows: `C:\Users\TuNombre\DigitalBrain\`
   - Linux: `~/DigitalBrain/`

### 🔌 Plugins esenciales para instalar

Dentro de Obsidian:

1. Abre **Configuración** → **Community plugins** → **Activar plugins comunitarios**
2. Activa **Turn on community plugins**
3. Instala estos plugins:

| Plugin | Por qué lo necesitas |
|---|---|
| 📅 **Periodic Notes** | Para notas diarias automáticas |
| 🔗 **Dataview** | Consultas avanzadas sobre tus notas |
| 🏷️ **Tag Wrangler** | Gestionar etiquetas fácilmente |
| 📎 **Paste URL into Selection** | Pegar URLs formateadas |
| 🔍 **Omnisearch** | Búsqueda rápida en todo el vault |

> 💡 **Tips:** En [`../config/plugins-recomendados.md`](../config/plugins-recomendados.md) hay una lista más completa con enlaces directos.

---

## 🪜 Paso 2: Instalar Claude CLI

Claude CLI es la herramienta de línea de comandos de Anthropic.

### Opción A — Instalación global con npm

```bash
# Instalar globalmente
npm install -g @anthropic-ai/claude-code

# Verificar instalación
claude --version
```

### Opción B — Usar npx (sin instalación global)

```bash
# Ejecutar directamente sin instalar
npx @anthropic-ai/claude-code
```

### Configurar API Key

Claude CLI necesita una API Key de Anthropic:

1. Ve a [console.anthropic.ai](https://console.anthropic.ai)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** → **Create Key**
4. Copia la clave

```bash
# Configurar la API Key (agrega a tu ~/.zshrc o ~/.bashrc)
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"

# Para que sea permanente:
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc

# Verificar que funciona
claude "Hola, ¿cómo estás?"
```

---

## 🪜 Paso 3: Instalar el MCP Server para Obsidian

El MCP Server permite que Claude lea y escriba en tu vault de Obsidian.

### Opción A — Usando obsidian-mcp-server (recomendado)

```bash
# Instalar globalmente
npm install -g @n8n/obsidian-mcp-server

# Verificar
obsidian-mcp-server --version
```

### Opción B — Usar el servidor incluido en este proyecto

```bash
# Instalar dependencias locales
cd config/
npm install
```

El archivo [`../config/mcp-server.js`](../config/mcp-server.js) contiene un servidor MCP listo para usar.

---

## 🪜 Paso 4: Configurar todo junto

### 4.1 Crear archivo de configuración del Harness

Crea `~/.digital-brain/config.yaml`:

```yaml
# ~/.digital-brain/config.yaml

vault_path: "/Users/tu-usuario/Documents/DigitalBrain"
obsidian_mcp_server: "@n8n/obsidian-mcp-server"
claude_model: "claude-sonnet-4-20250514"
auto_start: true
backup_enabled: true
backup_interval_hours: 24
```

O usa el que viene en [`../config/harness-config.yaml`](../config/harness-config.yaml) y edita la ruta.

### 4.2 Configurar Claude para usar MCP

```bash
# Agregar el MCP server a la configuración de Claude
claude mcp add obsidian -- npx @n8n/obsidian-mcp-server
```

---

## 🪜 Paso 5: Verificar que todo funciona

```bash
# 1. Probar que Claude CLI responde
claude "¿Cuál es la capital de Francia?"

# 2. Probar el MCP server
claude "Busca en mi vault de Obsidian notas sobre aprendizaje"

# 3. Si todo funciona, deberías ver resultados de tu vault
```

---

## ✅ Checklist de instalación

- [ ] ✅ Node.js v18+ instalado
- [ ] ✅ Obsidian instalado con vault creado
- [ ] ✅ Claude CLI instalado y autenticado
- [ ] ✅ MCP Server instalado
- [ ] ✅ API Key configurada
- [ ] ✅ Claude puede leer tu vault

---

> 💡 **Tip:** Si encuentras errores durante la instalación, revisa [`07-solucion-problemas.md`](./07-solucion-problemas.md).

## ➡️ Siguiente paso

⬅️ **Anterior:** [`01-introduccion.md`](./01-introduccion.md) 🧠 · **Siguiente:** [`03-configuracion.md`](./03-configuracion.md) ⚙️
