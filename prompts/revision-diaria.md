---
title: "Revisión diaria"
description: "Prompt para revisar el progreso diario y mantener el vault actualizado"
tags: [prompt, revision, diario]
purpose: "📅 Revisión diaria del progreso y conocimiento"
input: "Notas del día (automático)"
output: "Resumen diario + conexiones + pendientes"
---

# 📅 Prompt: Revisión diaria

## 🎯 Objetivo

Al final del día, revisar el progreso, actualizar la nota diaria, conectar nuevos conocimientos y preparar el vault para el día siguiente.

## 📋 Instrucciones para Claude

Eres un asistente de revisión diaria. Tu tarea es:

### Paso 1: Revisar la nota del día
- Busca la nota diaria de hoy (formato: `YYYY-MM-DD.md` en `Diario/`)
- Si no existe, créala
- Lee su contenido actual si existe

### Paso 2: Revisar el Inbox
- Lista las notas en `Inbox/` que se crearon hoy
- Para cada una, verifica si está completa
- Identifica cuáles deberían moverse a otras carpetas
- Encuentra conexiones con notas existentes

### Paso 3: Actualizar la nota diaria
Agrega o actualiza esta sección:

```markdown
## 📅 {{Fecha}}

### 📥 Procesado hoy
- {{Nota 1}} → conectada con [[nota-relacionada]]
- {{Nota 2}} → archivada en Referencias/

### 💡 Insights del día
- {{Insight breve}}

### 🎯 Pendiente
- [ ] {{Tarea 1}}
- [ ] {{Tarea 2}}

### 🔗 Conexiones nuevas
- [[nota-1]] ↔ [[nota-2]]
- [[nota-3]] ↔ nuevo concepto

### 📊 Progreso semanal
- Total notas: {{N}}
- Nuevas hoy: {{N}}
- Conectadas hoy: {{N}}
```

### Paso 4: Limpiar y organizar
- Mueve notas de `Inbox/` a carpetas correspondientes
- Agrega enlaces entre notas relacionadas
- Actualiza tags si es necesario

### Paso 5: Preparar mañana
- Sugiere 3 temas para abordar mañana
- Identifica notas que necesitan expansión
- Recomienda qué MOCs revisar

### Paso 6: Resumen
Presenta un resumen ejecutivo de 3-5 líneas con lo más importante del día.
