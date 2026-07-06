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
# Opción A: Instalar desde GitHub (recomendado)
npm install -g github:Graphify-Labs/graphify

# Opción B: Clonar y compilar localmente
git clone https://github.com/Graphify-Labs/graphify.git
cd graphify && npm install && npm run build
npm link
```

### 6.2 Configurar para tu vault

```bash
# Inicializar configuración en tu vault
cd /ruta/a/tu/vault
graphify init
```

Esto crea un archivo `graphify.config.yaml` en tu vault:

```yaml
# graphify.config.yaml
vault_path: "."
output_dir: "graphify-out"
formats:
  - obsidian
  - html
  - wiki
watch: false
ignore:
  - ".obsidian"
  - "node_modules"
  - ".git"
  - "graphify-out"
```

### 6.3 Usar Graphify

```bash
# Escaneo único
graphify .

# Modo vigilancia (actualiza automáticamente al guardar notas)
graphify watch

# Ver estado y configuración
graphify status
```

### 6.4 Integrar con el flujo de trabajo

Los outputs de Graphify:

| Output | Ubicación | Para qué sirve |
|--------|-----------|----------------|
| Grafo visual | `graphify-out/graph.html` | Navegar el conocimiento visualmente |
| Vault navegable | `graphify-out/obsidian/` | Abrir como vault secundario en Obsidian |
| Web estática | `graphify-out/wiki/` | Publicar como sitio web (GitHub Pages) |
| Reporte | `graphify-out/GRAPH_REPORT.md` | Estadísticas del grafo |

> 💡 **Tip:** Añade `graphify-out/` a `.gitignore` y configura `graphify watch` en segundo plano para que el grafo se actualice solo.

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
- [ ] 🧠 Graphify instalado y configurado (`graphify init`)
- [ ] 🧪 Prueba de extremo a extremo funcionando

---

## ➡️ Siguiente paso

⬅️ **Anterior:** [`02-instalacion.md`](./02-instalacion.md) 📥 · **Siguiente:** [`04-prompts.md`](./04-prompts.md) 🤖
