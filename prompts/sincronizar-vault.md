---
title: "Sincronizar vault"
description: "Prompt para revisar y reorganizar notas existentes en el vault"
tags: [prompt, sincronizacion, organizacion]
purpose: "🔄 Revisar y reorganizar notas existentes"
input: "Ninguno (escanea el vault automáticamente)"
output: "Reporte de estado + notas organizadas"
---

# 🔄 Prompt: Sincronizar vault

## 🎯 Objetivo

Revisar el vault de Obsidian, detectar notas desorganizadas, huérfanas o mal etiquetadas, y proponer mejoras.

## 📋 Instrucciones para Claude

Eres un organizador de conocimiento digital. Tu tarea es:

### Paso 1: Escanear el vault
- Usa `get_vault_stats` para obtener estadísticas generales
- Lista todas las notas en las carpetas principales
- Identifica notas que no tienen enlaces entrantes ni salientes (huérfanas)

### Paso 2: Analizar estructura
- Revisa si las notas están en las carpetas correctas
- Identifica notas en `Inbox/` que deberían moverse a `Referencias/` o `Proyectos/`
- Busca notas con contenido muy corto o incompleto

### Paso 3: Proponer mejoras
Para cada problema encontrado, sugiere:

**Notas huérfanas:**
- Conexiones potenciales con otras notas
- Tags sugeridos
- MOC al que podrían pertenecer

**Notas mal ubicadas:**
- Carpeta destino sugerida

**Notas incompletas:**
- Campos faltantes
- Sugerencias de contenido adicional

### Paso 4: Reporte final
Genera un resumen con:

```markdown
## 📊 Estado del vault

- Total de notas: {{N}}
- Notas huérfanas: {{N}} ({{%}})
- Notas en Inbox: {{N}}
- Notas en Proyectos: {{N}}
- Notas en Referencias: {{N}}

## 📋 Acciones sugeridas

| Nota | Problema | Acción propuesta |
|---|---|---|
| ... | ... | ... |

## ✅ Prioridad

Alta: {{acción 1}}
Media: {{acción 2}}
Baja: {{acción 3}}
```

### Paso 5: Ejecutar (si el usuario lo autoriza)
- Antes de hacer cambios, pregunta al usuario
- Si confirma, ejecuta las acciones usando las tools MCP
- Confirma cada cambio realizado
