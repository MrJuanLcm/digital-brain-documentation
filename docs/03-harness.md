---
title: "El Harness"
description: "La capa de orquestación que conecta Claude, MCP, Obsidian y Graphify en un solo flujo"
tags: [harness, orquestacion, configuracion, arquitectura]
sidebar_position: 3
---

# 🎛️ El Harness — la capa de orquestación

> El Harness es el "pegamento" que hace que todas las piezas del Digital Brain trabajen juntas como un solo sistema.

## 📋 Tabla de contenidos

- [🤔 ¿Qué es el Harness?](#-qué-es-el-harness)
- [🧩 De qué está hecho](#-de-qué-está-hecho)
- [📄 El archivo `harness-config.yaml`](#-el-archivo-harness-configyaml)
- [🌱 Variables de entorno](#-variables-de-entorno)
- [🔄 El bucle autoalimentado](#-el-bucle-autoalimentado)
- [🧠 Memoria persistente entre sesiones](#-memoria-persistente-entre-sesiones)
- [📈 Aprendizaje continuo](#-aprendizaje-continuo)
- [⚠️ Qué NO es el Harness](#️-qué-no-es-el-harness)

---

## 🤔 ¿Qué es el Harness?

En este proyecto, **"Harness" no es un programa ni un demonio** que se ejecute en segundo plano. Es el nombre que le damos a la **capa de orquestación**: el conjunto de configuración, registro de MCP, prompts y scripts que hacen que Claude, Obsidian y Graphify funcionen como un cerebro digital coherente en lugar de como herramientas sueltas.

Piénsalo así: si Claude Code es la **mente**, MCP el **puente** y Obsidian la **memoria**, el Harness es el **sistema nervioso** que coordina cuándo y cómo se hablan entre sí.

```
        ┌──────────────────── EL HARNESS ─────────────────────┐
        │                                                     │
        │   harness-config.yaml   ← tus rutas y preferencias  │
        │   claude mcp add ...    ← registro del puente MCP   │
        │   prompts/*.md          ← qué hace Claude           │
        │   scripts/*             ← automatización (iniciar,  │
        │                            detener, backup)         │
        │   graphify . --watch    ← disparador del grafo      │
        │                                                     │
        └─────────────────────────────────────────────────────┘
                 │            │             │           │
                 ▼            ▼             ▼           ▼
             Claude Code    MCP        Obsidian     Graphify
```

---

## 🧩 De qué está hecho

El Harness no es un único archivo, sino la suma de cinco piezas que ya usas en las guías anteriores:

| Pieza                       | Rol en la orquestación                                           | Dónde se configura                                                   |
| --------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| 🧠**Claude Code**           | El bucle de agente que ejecuta el trabajo                        | `claude` (CLI)                                                       |
| 🔌**Registro MCP**          | Conecta a Claude con tu vault                                    | `claude mcp add obsidian -- node config/mcp-server.js --vault /ruta` |
| 📄**`harness-config.yaml`** | Fuente única de verdad: rutas, modelo, carpetas, backup          | [`../config/harness-config.yaml`](../config/harness-config.yaml)     |
| 🤖**Prompts**               | Definen qué hace Claude con la información                       | [`../prompts/`](../prompts/)                                         |
| ⚙️**Scripts + Graphify**    | Disparan la automatización (arranque, backup, rebuild del grafo) | [`../scripts/`](../scripts/)                                         |

> 💡 La idea del Harness es que **no tengas que recordar rutas ni comandos sueltos**: los centralizas una vez y los scripts/prompts los reutilizan.

---

## 📄 El archivo `harness-config.yaml`

Este archivo es una **plantilla de referencia**: reúne en un solo sitio todos los valores que el resto del sistema necesita (la ruta de tu vault, el servidor MCP, el modelo de Claude, las carpetas y la política de backup).

```yaml
vault_path: "/Users/tu-usuario/DigitalBrain"
mcp_server: "node config/mcp-server.js"
claude_model: "claude-sonnet-4-20250514"

vault:
  inbox_folder: "Inbox"
  daily_notes_folder: "Diario"
  projects_folder: "Proyectos"
  references_folder: "Referencias"
  mocs_folder: "MOCs"

backup:
  enabled: true
  interval_hours: 24
  directory: "~/backups/digital-brain"
```

Consulta la versión completa y comentada en [`../config/harness-config.yaml`](../config/harness-config.yaml).

---

## 🌱 Variables de entorno

En la práctica, la pieza que hoy **lee configuración de verdad** es el servidor MCP (`config/mcp-server.js`), y lo hace a través de la variable `OBSIDIAN_VAULT_PATH` (o del argumento `--vault`). Por eso, la forma más fiable de "activar" el Harness es exportar tus valores como variables de entorno en tu `~/.zshrc` o `~/.bashrc`:

```bash
# El vault que usará el servidor MCP
export OBSIDIAN_VAULT_PATH="/ruta/a/tu/vault"

# Preferencias del Digital Brain (las leen los scripts de scripts/)
export DIGITAL_BRAIN_VAULT_PATH="/ruta/a/tu/vault"
export DIGITAL_BRAIN_MCP_SERVER="node config/mcp-server.js"
export DIGITAL_BRAIN_CLAUDE_MODEL="claude-sonnet-4-20250514"
```

Las variables de entorno **sobrescriben** los valores del archivo YAML, así que puedes tener un `harness-config.yaml` versionado como referencia y sobreescribir lo específico de tu máquina con `export`.

> 📌 **Nota honesta:** `harness-config.yaml` es una plantilla; hoy no hay un demonio que la cargue automáticamente. La conexión real se establece al registrar el MCP con `claude mcp add` y al exportar `OBSIDIAN_VAULT_PATH`. Los scripts de [`../scripts/`](../scripts/) usan las variables `DIGITAL_BRAIN_*` para orquestar arranque, parada y backup.

---

## 🔄 El bucle autoalimentado

El Harness es lo que convierte pasos manuales en un ciclo que se repite casi solo:

```
📥 Llega información nueva
   ↓  (tú la pegas o un script la recoge)
🤖 Claude Code la procesa con un prompt de prompts/
   ↓  (vía MCP → escribe en Obsidian)
📓 Se guarda estructurada en el vault
   ↓
🧠 Graphify (--watch o git hook post-commit) actualiza el grafo
   ↓
💡 Claude consulta el grafo y sugiere conexiones nuevas
   ↓
♻️ Vuelta a empezar
```

Para dejarlo funcionando de forma continua:

```bash
# 1. Arrancar el cerebro (registra MCP y prepara el entorno)
#    → ver scripts/iniciar-cerebro.md
claude mcp add obsidian -- node config/mcp-server.js --vault "$OBSIDIAN_VAULT_PATH"

# 2. Mantener el grafo actualizado en segundo plano
graphify . --watch
```

---

## 🧠 Memoria persistente entre sesiones

Por defecto, cada vez que abres Claude Code empieza "en blanco": no recuerda lo que hiciste ayer. En un Digital Brain eso es un desperdicio, porque **tu vault ya es la memoria** — solo falta que Claude la lea al arrancar y la actualice al terminar.

El Harness resuelve esto con **hooks** de Claude Code: pequeños comandos que se ejecutan automáticamente en momentos concretos de la sesión. Los dos que importan aquí:

| Hook           | Cuándo se dispara            | Para qué lo usamos                                                        |
| -------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `SessionStart` | Al abrir una sesión          | Cargar contexto: nota diaria de hoy, últimos cambios del vault, tareas    |
| `Stop`         | Al terminar de responder     | Guardar un resumen de lo tratado en el Inbox o en la nota diaria          |

Ejemplo mínimo en tu `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "cat \"$OBSIDIAN_VAULT_PATH/Diario/$(date +%Y-%m-%d).md\" 2>/dev/null" }
        ]
      }
    ]
  }
}
```

Al arrancar, Claude recibe automáticamente tu nota del día como contexto — sin que tengas que pegarla. La salida del hook se inyecta en la conversación.

> 💡 **La idea clave:** no necesitas una "base de datos de memoria" aparte. El vault de Obsidian **es** la memoria; los hooks solo la conectan al principio y al final de cada sesión.

> 📌 **Nota honesta:** los hooks son una capa **opcional** del Harness. El sistema funciona sin ellos (tú mismo puedes pedirle a Claude que lea la nota diaria). Los hooks solo automatizan ese gesto para que no dependa de tu memoria.

---

## 📈 Aprendizaje continuo

Un cerebro digital mejora si **aprende de su propio uso**. El patrón es sencillo: cuando detectas que repites un prompt, una estructura de nota o un flujo, lo **conviertes en algo reutilizable** dentro del proyecto.

```
🔁 Repites un patrón (mismo prompt 3+ veces)
   ↓
📝 Lo extraes a prompts/ como plantilla con nombre
   ↓
♻️ La próxima vez lo invocas en vez de reescribirlo
   ↓
🧠 El grafo de Graphify conecta las notas que genera
```

Dónde vive cada tipo de aprendizaje en este proyecto:

- **Prompts recurrentes** → guárdalos en [`../prompts/`](../prompts/) (ver [`07-prompts.md`](./07-prompts.md)).
- **Estructuras de nota que funcionan** → conviértelas en plantillas en [`../templates/`](../templates/).
- **Conexiones entre ideas** → deja que Graphify las descubra automáticamente (ver [`06-graphify-integracion.md`](./06-graphify-integracion.md)).

> 💡 Regla práctica: **si haces algo tres veces a mano, la cuarta debería ser una plantilla o un prompt.** Eso es lo que convierte un montón de notas en un sistema que se refuerza solo.

---

## ⚠️ Qué NO es el Harness

Para evitar confusiones frecuentes:

- ❌ **No es un servidor que debas "levantar" aparte.** El único proceso de larga duración es el servidor MCP, y a ese lo lanza Claude Code cuando lo necesita (gracias a `claude mcp add`).
- ❌ **`harness-config.yaml` no se ejecuta.** Es configuración declarativa; ninguna parte del sistema falla si lo dejas sin tocar, siempre que exportes `OBSIDIAN_VAULT_PATH`.
- ❌ **No requiere una API key propia.** Usa la de Claude Code (`ANTHROPIC_API_KEY`). Graphify, para código, no necesita ninguna.

---

## ➡️ Siguiente paso

⬅️ **Anterior:** [`02-mcp-explicado.md`](./02-mcp-explicado.md) 🔌 · **Siguiente:** [`04-instalacion.md`](./04-instalacion.md) 📥
