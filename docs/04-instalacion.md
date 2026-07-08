---
title: "Instalación"
description: "Guía paso a paso para instalar Node.js, Obsidian, Claude Code y el MCP Server"
tags: [instalacion, setup]
sidebar_position: 2
---

# 📥 Guía de instalación paso a paso

> Sigue esta guía **en orden, de arriba abajo**. Cada paso construye sobre el anterior.

> 📖 **Antes de empezar:** si te topas con un término que no conoces (vault, MCP, MOC, god node…), consúltalo en el [`glosario.md`](./glosario.md). Tenerlo abierto en otra pestaña ayuda.

## 📋 Tabla de contenidos

- [📋 Prerequisitos](#-prerequisitos)
- [🪜 Paso 0: Prepara tu carpeta de proyecto](#-paso-0-prepara-tu-carpeta-de-proyecto)
- [🪜 Paso 1: Instalar Obsidian y crear tu vault](#-paso-1-instalar-obsidian-y-crear-tu-vault)
- [🪜 Paso 2: Instalar Claude Code](#-paso-2-instalar-claude-code)
- [🪜 Paso 3: Instalar el MCP Server](#-paso-3-instalar-el-mcp-server-para-obsidian)
- [🪜 Paso 4: Instalar Graphify](#-paso-4-instalar-graphify-grafo-de-conocimiento)
- [🪜 Paso 5: Conectar todo](#-paso-5-conectar-todo)
- [🪜 Paso 6: Verificar que todo funciona](#-paso-6-verificar-que-todo-funciona)
- [✅ Checklist de instalación](#-checklist-de-instalación)

---

## 📋 Prerequisitos

Antes de empezar, asegúrate de tener:

| Herramienta | Versión mínima | Cómo verificarlo |
|---|---|---|
| **Node.js** | v18+ | `node --version` |
| **npm** | v9+ | `npm --version` |
| **Python** | 3.10+ | `python3 --version` |
| **pip** | cualquier | `pip3 --version` |
| **Git** | cualquier | `git --version` |
| **Obsidian** | v1.5+ | Abre Obsidian → Configuración → Acerca de |

> 💡 Ejecuta los cuatro comandos de verificación primero. Si alguno da "command not found", instálalo con los bloques de abajo antes de continuar.

Si no tienes **Node.js**:

```bash
# macOS (con Homebrew)
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
# Descarga desde: https://nodejs.org/
```

Si no tienes **Python** (lo necesita Graphify en el Paso 4):

```bash
# macOS (con Homebrew)
brew install python

# Linux (Ubuntu/Debian)
sudo apt-get update && sudo apt-get install -y python3 python3-pip

# Windows (dentro de WSL2, igual que Linux)
sudo apt-get install -y python3 python3-pip
```

> 🪟 **Windows: usa WSL2.** Esta guía asume un entorno tipo Unix (bash). En Windows,
> los comandos con `"$(cat ...)"`, `export` y rutas `/ruta/...` son de bash y **no
> funcionan en PowerShell/CMD nativo**. Instala [WSL2](https://learn.microsoft.com/windows/wsl/install)
> (`wsl --install` en PowerShell como administrador), abre una terminal Ubuntu y sigue
> desde ahí los pasos de Linux. Tu vault de Obsidian en `C:\...` es accesible desde
> WSL2 en `/mnt/c/...` (ver [`09-solucion-problemas.md`](./09-solucion-problemas.md) para rutas con espacios).

---

## 🪜 Paso 0: Prepara tu carpeta de proyecto

Antes que nada necesitas **una carpeta propia** donde vivirán el servidor MCP, los prompts y la configuración. En esta guía la llamamos **"la raíz de tu proyecto"** — es distinta de tu vault de Obsidian (que son tus notas).

La forma más fácil es clonar este repositorio, que ya trae todo lo que necesitas:

```bash
# 1. Clona este repositorio (trae config/, prompts/, templates/, scripts/)
git clone https://github.com/MrJuanLcm/digital-brain-documentation.git mi-cerebro-digital

# 2. Entra en la carpeta: ESTA es "la raíz de tu proyecto"
cd mi-cerebro-digital

# 3. Comprueba que estás en el sitio correcto (debes ver config/ y prompts/)
ls
```

> 📁 A partir de aquí, **ejecuta todos los comandos desde esta carpeta** (`mi-cerebro-digital`), salvo que se indique lo contrario. Cuando un comando use `config/mcp-server.js`, se refiere al que está aquí dentro.

> 💡 ¿Prefieres empezar de cero sin clonar? Crea la carpeta con `mkdir mi-cerebro-digital && cd mi-cerebro-digital` y copia dentro las carpetas `config/`, `prompts/`, `templates/` y `scripts/` de este repo.

---

## 🪜 Paso 1: Instalar Obsidian y crear tu vault

> Un **vault** es simplemente una carpeta donde Obsidian guarda tus notas en `.md`. Es la "memoria" de tu cerebro digital.

1. Ve a [obsidian.md](https://obsidian.md) y descarga la versión para tu SO
2. Instálalo como cualquier aplicación
3. Ábrelo y pulsa **"Create new vault"** → ponle un nombre (p. ej. `DigitalBrain`) → elige dónde guardarlo → **Create**
4. **Importante — anota la ruta de tu vault.** Para verla: en Obsidian, clic derecho sobre cualquier carpeta del vault → **"Show in system explorer"** (o **"Mostrar en el explorador"**). Ejemplos típicos:
   - macOS: `~/Documents/DigitalBrain/`
   - Windows (WSL2): `/mnt/c/Users/TuNombre/DigitalBrain/`
   - Linux: `~/DigitalBrain/`

> 📌 Guarda esa ruta a mano: la usarás varias veces más abajo como `OBSIDIAN_VAULT_PATH`.

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

## 🪜 Paso 2: Instalar Claude Code

Claude Code es la herramienta de línea de comandos de Anthropic.

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

Claude Code necesita una API Key de Anthropic:

1. Ve a [console.anthropic.com](https://console.anthropic.com)
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

Ya tienes el servidor incluido en la carpeta `config/` (viene del Paso 0). Solo falta instalar sus dependencias:

```bash
# Desde la raíz de tu proyecto (mi-cerebro-digital):
cd config
npm install
cd ..    # vuelve a la raíz del proyecto
```

Verifica que el servidor arranca (Ctrl+C para salir):

```bash
node config/mcp-server.js --vault "$OBSIDIAN_VAULT_PATH"
# Deberías ver: 📁 Vault: ...  y  ✅ MCP Server conectado y listo
```

> ⚠️ ¿`OBSIDIAN_VAULT_PATH` vacío o error "El vault no existe"? Es que aún no lo exportaste — se hace en el **Paso 5.1** de abajo. Puedes volver a esta comprobación después.

---

## 🪜 Paso 4: Instalar Graphify (Grafo de conocimiento)

Graphify genera un grafo de conocimiento persistente desde tu vault de Obsidian.

```bash
# Instalar paquete Python (oficial: graphifyy con doble 'y')
pip install graphifyy

# Verificar
graphify --help
```

> 💡 **Tip:** El paquete en PyPI se llama `graphifyy` (doble 'y'). El comando CLI sigue siendo `graphify`.
> 
> **Opcional — Extras:**
> ```bash
> # PDF support
> pip install "graphifyy[pdf]"
> 
> # Video/audio transcription (faster-whisper + yt-dlp)
> pip install "graphifyy[video]"
> 
> # MCP server
> pip install "graphifyy[mcp]"
> 
> # Neo4j export
> pip install "graphifyy[neo4j]"
> 
> # Todo junto
> pip install "graphifyy[all]"
> ```

---

## 🪜 Paso 5: Conectar todo

### 5.1 Exportar la ruta de tu vault

Toma **la ruta que anotaste en el Paso 1** y expórtala como variable de entorno. Es lo que usarán el servidor MCP y los scripts:

```bash
# Sustituye por TU ruta real (la del Paso 1)
export OBSIDIAN_VAULT_PATH="$HOME/DigitalBrain"

# Hazlo permanente (usa ~/.bashrc o ~/.zshrc según tu shell)
echo 'export OBSIDIAN_VAULT_PATH="$HOME/DigitalBrain"' >> ~/.bashrc
source ~/.bashrc

# Comprueba que apunta a una carpeta que existe
ls "$OBSIDIAN_VAULT_PATH"
```

### 5.2 Registrar el MCP Server en Claude

```bash
# Desde la raíz de tu proyecto (mi-cerebro-digital):
claude mcp add obsidian -- node config/mcp-server.js --vault "$OBSIDIAN_VAULT_PATH"

# Verifica que quedó registrado:
claude mcp list        # debe aparecer "obsidian"
```

### 5.3 (Opcional) Guardar tus preferencias en un archivo

Puedes centralizar tus rutas y preferencias copiando [`../config/harness-config.yaml`](../config/harness-config.yaml) y editando la ruta del vault.

> 📄 **Importante:** `harness-config.yaml` es una **plantilla de referencia**; hoy no hay ningún programa que la lea automáticamente. Lo que realmente conecta el sistema es el `claude mcp add` de arriba más la variable `OBSIDIAN_VAULT_PATH`. Explicación completa en [`03-harness.md`](./03-harness.md).

---

## 🪜 Paso 6: Verificar que todo funciona

```bash
# 1. Probar que Claude Code responde
claude "¿Cuál es la capital de Francia?"

# 2. Probar el MCP server
claude "Busca en mi vault de Obsidian notas sobre aprendizaje"

# 3. Probar Graphify (genera grafo en graphify-out/)
graphify .

# 4. Ver outputs generados
ls graphify-out/
# graph.html       - visualización interactiva (ábrela con open/xdg-open/start)
# GRAPH_REPORT.md  - reporte con god nodes, conexiones, preguntas
# graph.json       - grafo persistente
# (obsidian/ solo aparece si ejecutas: graphify . --obsidian)

# 5. Si todo funciona, deberías ver resultados de tu vault y el grafo generado
```

---

## ✅ Checklist de instalación

- [ ] ✅ Node.js v18+ y Python 3.10+ instalados
- [ ] ✅ Carpeta de proyecto creada (clonada) y `cd` dentro de ella
- [ ] ✅ Obsidian instalado con vault creado y ruta anotada
- [ ] ✅ Claude Code instalado y autenticado
- [ ] ✅ Dependencias del MCP Server instaladas (`cd config && npm install`)
- [ ] ✅ Graphify instalado (`pip install graphifyy`)
- [ ] ✅ API Key configurada
- [ ] ✅ `OBSIDIAN_VAULT_PATH` exportado y apuntando a tu vault
- [ ] ✅ MCP registrado (`claude mcp list` muestra "obsidian")
- [ ] ✅ Claude puede leer tu vault
- [ ] ✅ Graphify genera el grafo

---

> 💡 **Tip:** Si encuentras errores durante la instalación, revisa [`09-solucion-problemas.md`](./09-solucion-problemas.md).

## ➡️ Siguiente paso

⬅️ **Anterior:** [`03-harness.md`](./03-harness.md) 🎛️ · **Siguiente:** [`05-configuracion.md`](./05-configuracion.md) ⚙️
