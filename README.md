---
title: "Digital Brain"
description: "Documentación para construir un cerebro digital con Obsidian + Claude CLI + MCP"
---

<p align="center">
  <img src="https://img.shields.io/badge/status-activo-059669?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/docs-v1.0-2563EB?style=flat-square" alt="Docs">
  <img src="https://img.shields.io/badge/PRs-bienvenidas-8B5CF6?style=flat-square" alt="PRs">
  <img src="https://img.shields.io/badge/license-MIT-F59E0B?style=flat-square" alt="License">
</p>

<h1 align="center">🧠 Digital Brain</h1>
<p align="center"><strong>Obsidian + Claude CLI + MCP</strong></p>
<p align="center">Tu cerebro digital que se alimenta solo — conecta tu conocimiento con inteligencia artificial.</p>

<p align="center">
  <a href="./docs/01-introduccion.md">📖 Empezar</a>
  ·
  <a href="./docs/02-instalacion.md">📥 Instalación</a>
  ·
  <a href="./docs/cheatsheet.md">📋 Cheatsheet</a>
  ·
  <a href="./docs/glosario.md">📖 Glosario</a>
</p>

---

## 🤔 ¿Qué es esto?

**Digital Brain** es un sistema que convierte **Obsidian** en el centro de tu conocimiento personal, usando **Claude CLI** como asistente de IA y **MCP (Model Context Protocol)** como puente de comunicación.

```
       👤 Tú
        │
        ▼
  ┌──────────┐     ┌──────────┐     ┌──────────┐
  │  Claude  │◄───►│   MCP    │◄───►│ Obsidian │
  │   CLI    │     │  Server  │     │  Vault   │
  │  (Mente) │     │ (Puente) │     │(Memoria) │
  └──────────┘     └──────────┘     └──────────┘
```

---

## 📖 Cómo usar esta guía

| # | Paso | Documento | Aprenderás |
|---|---|---|---|
| 1️⃣ | 🧠 Introducción | [`docs/01-introduccion.md`](./docs/01-introduccion.md) | Conceptos y arquitectura |
| 2️⃣ | 📥 Instalación | [`docs/02-instalacion.md`](./docs/02-instalacion.md) | Instalar dependencias |
| 3️⃣ | ⚙️ Configuración | [`docs/03-configuracion.md`](./docs/03-configuracion.md) | Estructurar vault y Harness |
| 4️⃣ | 🤖 Prompts | [`docs/04-prompts.md`](./docs/04-prompts.md) | Biblioteca de prompts |
| 5️⃣ | 🎯 Casos de uso | [`docs/05-casos-de-uso.md`](./docs/05-casos-de-uso.md) | Ejemplos prácticos |
| 6️⃣ | 🔌 MCP | [`docs/06-mcp-explicado.md`](./docs/06-mcp-explicado.md) | Protocolo MCP en detalle |
| 7️⃣ | 🛠️ Troubleshooting | [`docs/07-solucion-problemas.md`](./docs/07-solucion-problemas.md) | Errores comunes |

> 💡 **Tip:** Si eres nuevo, empieza por `docs/01-introduccion.md` y sigue en orden.

---

## 📂 Estructura del proyecto

| Carpeta | Contenido |
|---|---|
| `docs/` | 📖 Documentación detallada (7 guías + glosario + cheatsheet) |
| `prompts/` | 🤖 Biblioteca de prompts listos para copiar y pegar |
| `scripts/` | ⚙️ Guías explicativas de automatización |
| `config/` | 🔧 Archivos de configuración de referencia |
| `templates/` | 📝 Plantillas para notas en Obsidian |
| `examples/` | 🎯 Ejemplos prácticos y vault de demostración |

---

## 🤖 Prompts disponibles

| Prompt | Propósito |
|---|---|
| [`prompts/procesar-entrada.md`](./prompts/procesar-entrada.md) | 📥 Procesar info nueva y guardarla en el vault |
| [`prompts/sincronizar-vault.md`](./prompts/sincronizar-vault.md) | 🔄 Reorganizar notas existentes |
| [`prompts/generar-insights.md`](./prompts/generar-insights.md) | 💡 Encontrar conexiones entre notas |
| [`prompts/revision-diaria.md`](./prompts/revision-diaria.md) | 📅 Revisión diaria de conocimiento |

---

## 🛠️ Requisitos mínimos

| Herramienta | Versión |
|---|---|
| **Node.js** | v18+ |
| **npm** | v9+ |
| **Obsidian** | v1.5+ |
| **Claude API Key** | Anthropic console |
| **SO** | macOS / Linux / Windows (WSL2) |

---

## 📋 Referencia rápida

| Recurso | Enlace |
|---|---|
| 📋 Cheatsheet | [`docs/cheatsheet.md`](./docs/cheatsheet.md) |
| 📖 Glosario | [`docs/glosario.md`](./docs/glosario.md) |
| 🎨 Guía de estilo | [`STYLEGUIDE.md`](./STYLEGUIDE.md) |
| 🎯 Ejemplos | [`examples/`](./examples/) |
| 📝 Plantillas | [`templates/`](./templates/) |

---

## 📄 Licencia

MIT — haz lo que quieras con esto.

---

## 🧠 Flujo de trabajo

```
📥 Llega información nueva (artículo, video, idea)
   ↓
🤖 Claude la procesa y extrae lo esencial
   ↓
📓 Se guarda estructurada en Obsidian
   ↓
🔗 Claude conecta con notas existentes
   ↓
💡 Obtienes insights y nuevas conexiones
   ↓
♻️ Repites — tu cerebro crece solo
```
