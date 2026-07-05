# ⏹️ Detener el Digital Brain

> **Propósito:** Explica cómo detener el MCP Server y limpiar la conexión de Claude.

---

## Detener el MCP Server

```bash
# Si lo iniciaste en primer plano
# → Ctrl+C en la terminal donde está corriendo

# Si lo iniciaste en background
kill $(lsof -ti :3000) 2>/dev/null || echo "No hay proceso en puerto 3000"

# O buscar el proceso por nombre
pkill -f "obsidian-mcp-server"
```

## Limpiar registro MCP de Claude

```bash
claude mcp remove obsidian
```
