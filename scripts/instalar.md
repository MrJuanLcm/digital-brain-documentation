# 🚀 Guía de instalación automática

> **Propósito:** Este documento explica los comandos necesarios para instalar todas las dependencias del Digital Brain.
>
> 📖 La guía completa paso a paso está en [`docs/02-instalacion.md`](../docs/02-instalacion.md).

---

## 📦 Dependencias a instalar

| Herramienta | Propósito | Instalación |
|---|---|---|
| **Node.js v20+** | Entorno de ejecución | `brew install node@20` (macOS) o `apt install nodejs` (Linux) |
| **Claude Code** | Interfaz de IA | `npm install -g @anthropic-ai/claude-code` |
| **MCP Server** | Conexión con Obsidian | `cd config && npm install` |

---

## 🔑 API Key

```bash
# Configurar la clave de Anthropic
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"

# Hacerla permanente
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"' >> ~/.zshrc
```

---

## ✅ Verificación

```bash
node --version          # → v20.x
claude --version        # → 1.x
node config/mcp-server.js --version  # → 1.x
echo $ANTHROPIC_API_KEY # → sk-ant-...
```
