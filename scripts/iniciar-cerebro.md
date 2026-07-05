# 🧠 Iniciar el Digital Brain

> **Propósito:** Explica cómo iniciar el MCP Server y conectar Claude CLI con Obsidian.
>
> 📖 La configuración detallada está en [`docs/03-configuracion.md`](../docs/03-configuracion.md).

---

## 1️⃣ Configurar variable de entorno

```bash
export OBSIDIAN_VAULT_PATH="/ruta/a/tu/vault"
```

## 2️⃣ Iniciar el MCP Server

```bash
# Usando obsidian-mcp-server global
obsidian-mcp-server --vault "$OBSIDIAN_VAULT_PATH"

# O usando el servidor local (desde config/)
node config/mcp-server.js
```

## 3️⃣ Conectar Claude con Obsidian

```bash
# En otra terminal, registrar el servidor MCP
claude mcp add obsidian -- npx @n8n/obsidian-mcp-server --vault /ruta/a/tu/vault

# Verificar que está conectado
claude mcp list
```

## 4️⃣ Probar la conexión

```bash
claude "Busca notas sobre aprendizaje en mi vault"
```

## ⏹️ Detener

```bash
claude mcp remove obsidian
# Ctrl+C en la terminal del MCP Server
```
