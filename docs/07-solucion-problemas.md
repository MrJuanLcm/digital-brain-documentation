---
title: "Solución de problemas"
description: "Errores comunes, causas y soluciones para problemas del Digital Brain"
tags: [troubleshooting, errores]
sidebar_position: 7
---

# 🛠️ Solución de problemas comunes

> Problemas frecuentes y cómo resolverlos rápidamente.

## 📋 Tabla de contenidos

- [❌ Problema: Claude Code no se encuentra](#-problema-claude-cli-no-se-encuentra)
- [❌ Problema: API Key no configurada](#-problema-api-key-no-configurada)
- [❌ Problema: MCP Server no se conecta](#-problema-mcp-server-no-se-conecta)
- [❌ Problema: Claude no puede leer mis notas](#-problema-claude-no-puede-leer-mis-notas)
- [❌ Problema: Error de permisos](#-problema-error-de-permisos)
- [❌ Problema: npm install falla](#-problema-npm-install-falla)
- [❌ Problema: Los prompts no funcionan](#-problema-los-prompts-no-funcionan-como-esperaba)
- [❌ Problema: Obsidian no muestra los cambios](#-problema-obsidian-no-muestra-los-cambios)
- [❌ Problema: Backups fallan](#-problema-backups-fallan)
- [❌ Problema: Timeouts en MCP Server](#-problema-timeouts-en-mcp-server)
- [❌ Problema: Rutas con espacios en Windows](#-problema-rutas-con-espacios-en-windows)
- [❌ Problema: Vault muy grande (rendimiento)](#-problema-vault-muy-grande-rendimiento)
- [❌ Problema: Graphify falla o no genera grafo](#-problema-graphify-falla-o-no-genera-grafo)
- [❌ Problema: Conflictos de plugins en Obsidian](#-problema-conflictos-de-plugins-en-obsidian)
- [🔍 Diagnóstico rápido](#-diagnóstico-rápido)

---

## ❌ Problema: Claude Code no se encuentra

```bash
zsh: command not found: claude
```

**Causa:** Claude Code no está instalado o no está en el PATH.

**Solución:**

```bash
# Verificar si está instalado
npm list -g @anthropic-ai/claude-code

# Si no aparece, instalarlo
npm install -g @anthropic-ai/claude-code

# Verificar la ubicación
which claude || echo "No está en PATH"
```

**Si está instalado pero no en PATH:**
```bash
# Agregar al PATH
export PATH="$PATH:$(npm root -g)/bin"
# Hacerlo permanente
echo 'export PATH="$PATH:$(npm root -g)/bin"' >> ~/.zshrc
```

---

## ❌ Problema: API Key no configurada

```bash
Error: ANTHROPIC_API_KEY is not set
```

**Solución:**

```bash
# Configurar temporalmente (para probar)
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"

# Configurar permanentemente
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxx"' >> ~/.zshrc
source ~/.zshrc

# Verificar
echo $ANTHROPIC_API_KEY
```

---

## ❌ Problema: MCP Server no se conecta

```bash
Error: Could not connect to MCP server obsidian
```

**Causas posibles:**

1. **El vault path es incorrecto**
   ```bash
   # Verificar que la ruta existe
   ls /ruta/a/tu/vault
   # Debe mostrar archivos .md
   ```

2. **El servidor no está instalado**
   ```bash
   cd config && npm install
   ```

3. **Puerto ocupado**
   ```bash
   # Verificar qué está usando el puerto
   lsof -i :3000
   # Cambiar el puerto en la configuración si es necesario
   ```

4. **Firewall bloqueando**
   ```bash
   # En macOS, revisar configuración de firewall
   # Preferencias del Sistema → Red → Firewall
   ```

---

## ❌ Problema: Claude no puede leer mis notas

```bash
Claude responde: "No encontré notas en tu vault"
```

**Solución:**

```bash
# 1. Verificar que el MCP server funciona
claude mcp list

# 2. Probar la conexión desde una sesión (las tools se invocan en la conversación)
claude -p "Lista 5 notas de mi vault de Obsidian usando el MCP"

# 3. Verificar que el vault tiene archivos .md
ls /ruta/a/tu/vault/**/*.md 2>/dev/null | head -10

# 4. Si está vacío, crear una nota de prueba
echo "# Nota de prueba" > /ruta/a/tu/vault/prueba.md
```

---

## ❌ Problema: Error de permisos

```bash
Error: EACCES: permission denied
```

**Solución:**

```bash
# Verificar permisos del vault
ls -la /ruta/a/tu/vault/

# Arreglar permisos si es necesario
chmod -R 755 /ruta/a/tu/vault/
chown -R $(whoami) /ruta/a/tu/vault/
```

---

## ❌ Problema: npm install falla

```bash
npm ERR! code EACCES
npm ERR! syscall access
```

**Solución:**

```bash
# No uses sudo con npm. Mejor reconfigurar:
npm config set prefix ~/.npm-global
echo 'export PATH="$PATH:~/.npm-global/bin"' >> ~/.zshrc
source ~/.zshrc

# O usar nvm para gestionar Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

---

## ❌ Problema: Los prompts no funcionan como esperaba

**Causas posibles:**

1. **El prompt es muy genérico**
   - Sé más específico en lo que quieres
   - Agrega ejemplos concretos

2. **Falta contexto**
   - Asegúrate de que tu vault tenga contenido relevante
   - Claude necesita datos para conectar ideas

3. **El MCP server no tiene las tools necesarias**
   ```bash
   # Verificar que el servidor está registrado y sano
   claude mcp get obsidian
   # Y pedir a Claude que use una tool concreta para comprobarla:
   claude -p "Usa el MCP de Obsidian para darme las estadísticas del vault"
   ```

---

## ❌ Problema: Obsidian no muestra los cambios

Claude creó archivos pero Obsidian no los muestra.

**Solución:**

```bash
# 1. Verificar que los archivos existen
ls -la /ruta/a/tu/vault/Inbox/

# 2. Forzar recarga en Obsidian
#    Cmd/Ctrl + P → "Reload app without saving"

# 3. O desactivar y activar el plugin de sincronización
#    Configuración → Community plugins → desactivar/activar
```

---

## ❌ Problema: Backups fallan

**Solución:**

```bash
# Verificar que la ruta de backup existe
ls ~/backups/

# Verificar espacio en disco
df -h ~/

# Probar backup manual para ver errores
tar -czf "~/backups/test-backup.tar.gz" -C /ruta/al/vault .
```

---

## ❌ Problema: Timeouts en MCP Server

Claude responde lento o devuelve timeout al consultar el vault.

```bash
Claude responde: "The request timed out" o tarda >30s en responder
```

**Causas y soluciones:**

| Causa | Solución |
|-------|----------|
| Vault muy grande (>5000 notas) | Pedir menos notas por consulta (p. ej. *"lista solo 10 notas"*) para acotar la respuesta |
| Servidor MCP desactualizado | Actualizar: `cd config && npm update` |
| Índice corrupto | No aplica con el servidor local (no usa caché) |
| Muchas llamadas concurrentes | Usar `limit` en las queries, evitar `list_notes` sin filtro |

**Configuración de timeout:**

```yaml
# En ~/.digital-brain/config.yaml
mcp_timeout_seconds: 60
max_notes_per_query: 50
```

---

## ❌ Problema: Rutas con espacios en Windows

En Windows/WSL2, rutas con espacios rompen comandos.

```bash
# ❌ Mal - falla por espacios
claude mcp add obsidian -- node config/mcp-server.js --vault "C:\Users\Mi Usuario\Documents\Mi Vault"

# ✅ Bien - comillas dobles escapadas o ruta sin espacios
claude mcp add obsidian -- node config/mcp-server.js --vault "C:\\Users\\Mi Usuario\\Documents\\Mi Vault"
```

**Solución recomendada:** Usar ruta sin espacios o vincular:

```cmd
# Crear junction sin espacios
mklink /J C:\DigitalBrain "C:\Users\Mi Usuario\Documents\Mi Vault"

# Usar C:\DigitalBrain en la configuración
```

**WSL2:** Montar unidad de Windows:

```bash
# En .zshrc / .bashrc
export OBSIDIAN_VAULT_PATH="/mnt/c/Users/Mi Usuario/Documents/Mi Vault"

# O crear symlink
ln -s "/mnt/c/Users/Mi Usuario/Documents/Mi Vault" ~/vault
export OBSIDIAN_VAULT_PATH=~/vault
```

---

## ❌ Problema: Vault muy grande (rendimiento)

Síntomas: búsquedas lentas, timeouts, alto uso de CPU/memoria.

**Soluciones:**

```bash
# 1. Limitar resultados: pídeselo a Claude en la propia consulta
claude -p "Busca en mi vault notas sobre 'tema' y muéstrame como mucho 20"

# 2. Excluir carpetas pesadas en config
# ~/.digital-brain/config.yaml
exclude_patterns:
  - ".git/**"
  - "node_modules/**"
  - ".obsidian/**"
  - "*.png"
  - "*.pdf"

# 3. Usar MOCs (Maps of Content) como índices
# En lugar de buscar en todo, busca en MOCs específicos

# 4. Archivar proyectos antiguos
mv Proyectos/antiguo/ Archive/
```

---

## ❌ Problema: Graphify falla o no genera grafo

### Síntomas
```bash
graphify .
# Error: ModuleNotFoundError: No module named 'graphify'
# O: graphify: command not found
# O: El grafo se genera pero está vacío
```

### Causas y soluciones

| Causa | Solución |
|-------|----------|
| No instalado | `pip install graphifyy` |
| No en PATH | `export PATH="$HOME/.local/bin:$PATH"` y reiniciar terminal |
| Skill no instalado en Claude | `/graphify` (auto-instala en el primer uso, requiere Claude Code) |
| Vault vacío o sin .md | Verifica que hay archivos `.md` en el vault |
| Permisos | `chmod -R 755 /ruta/a/tu/vault` |
| Python version | Requiere Python 3.10+, verifica con `python3 --version` |

### Debug paso a paso

```bash
# 1. Verificar instalación
pip show graphifyy
graphify --help

# 2. Verificar skill en Claude
claude mcp list

# 3. Test con directorio simple
mkdir /tmp/test-graphify
echo "# Test" > /tmp/test-graphify/test.md
cd /tmp/test-graphify
graphify .

# 4. Ver logs detallados
graphify . --verbose

# 5. Verificar outputs
ls -la graphify-out/
```

### Graphify watch no detecta cambios

```bash
# Verificar que inotify está disponible (Linux)
sudo apt-get install inotify-tools

# macOS - usar fsevents (incluido)
# Si falla, probar sin watch:
graphify .  # regeneración manual
```

---

## ❌ Problema: Conflictos de plugins en Obsidian

Plugins que interfieren con MCP o archivos:

| Plugin | Conflicto | Solución |
|--------|-----------|----------|
| **Live Preview** | Bloquea archivos | Desactivar en notas activas |
| **Sync (oficial)** | Conflictos de lock | Pausar sync durante operaciones MCP |
| **Git** | Commits automáticos | Configurar `.gitignore` para `.obsidian/` |
| **Dataview** | Índices pesados | Limitar queries en vaults grandes |

**Diagnóstico:**

```bash
# Desactivar todos los plugins community
# Configuración → Community plugins → Desactivar todos
# Probar MCP, luego activar uno a uno
```

---

## 📋 Tabla de errores comunes

| Error | Causa más probable | Solución rápida |
|---|---|---|
| `command not found: claude` | No instalado | `npm install -g @anthropic-ai/claude-code` |
| `ANTHROPIC_API_KEY is not set` | API Key faltante | `export ANTHROPIC_API_KEY="sk-ant-..."` |
| `Could not connect to MCP server` | Ruta incorrecta | `claude mcp list` |
| `EACCES: permission denied` | Permisos | `chmod -R 755 /ruta/vault` |
| `npm ERR!` | Permisos npm | Configurar prefix local |
| No encuentra notas | Vault vacío o ruta mal | `ls /ruta/vault/*.md` |

---

## 🔍 Diagnóstico rápido

```bash
# Script de diagnóstico para verificar todo el sistema
cat << 'SCRIPT'
echo "🔍 Diagnosticando Digital Brain..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━"

echo "1. Node.js: $(node --version 2>/dev/null || echo '❌ No encontrado')"
echo "2. npm: $(npm --version 2>/dev/null || echo '❌ No encontrado')"
echo "3. Claude Code: $(claude --version 2>/dev/null || echo '❌ No instalado')"
echo "4. MCP Server: $(node config/mcp-server.js --version 2>/dev/null && echo '✅ Activo' || echo '❌ No disponible')"
echo "5. API Key: $(echo ${ANTHROPIC_API_KEY:0:10}...) configurada"
echo "6. Vault: $(ls /ruta/a/tu/vault/*.md 2>/dev/null | wc -l) notas encontradas"
SCRIPT
```

---

## 📞 ¿Sigue sin funcionar?

1. Revisa que seguiste todos los pasos de [`02-instalacion.md`](./02-instalacion.md)
2. Verifica la configuración en [`03-configuracion.md`](./03-configuracion.md)
3. Abre un issue en el repositorio con:
   - Tu sistema operativo
   - Versiones de Node, npm, Claude
   - El mensaje de error completo

---

## ➡️ Siguiente paso

⬅️ **Anterior:** [`06-mcp-explicado.md`](./06-mcp-explicado.md) 🔌 · **Siguiente:** [`08-graphify-integracion.md`](./08-graphify-integracion.md) 🧠

---

> 💡 **¿Todo funciona?** Explora los [`prompts/`](../prompts/) y los [`templates/`](../templates/) para sacarle el máximo partido a tu Digital Brain.
