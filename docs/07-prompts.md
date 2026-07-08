---
title: "Biblioteca de prompts"
description: "Todos los prompts organizados por propósito con ejemplos de uso"
tags: [prompts, guia]
sidebar_position: 7
---

# 🤖 Biblioteca de prompts

> Aquí encontrarás todos los prompts organizados por propósito. Cada prompt está diseñado para una tarea específica dentro de tu Digital Brain.

## 📋 Tabla de contenidos

- [📋 Índice de prompts](#-índice-de-prompts)
- [1️⃣ 📥 Procesar entrada](#1️⃣--procesar-entrada)
- [2️⃣ 🔄 Sincronizar vault](#2️⃣--sincronizar-vault)
- [3️⃣ 💡 Generar insights](#3️⃣--generar-insights)
- [4️⃣ 📅 Revisión diaria](#4️⃣--revisión-diaria)
- [5️⃣ 🧠 Analizar grafo (Graphify)](#5️⃣--analizar-grafo-graphify)
- [📂 Cómo usar los prompts en tu proyecto](#-cómo-usar-los-prompts-en-tu-proyecto)
- [🎯 Cómo personalizar los prompts](#-cómo-personalizar-los-prompts)
- [🚀 Tips de uso avanzado](#-tips-de-uso-avanzado)

---

## 📋 Índice de prompts

| # | Prompt | Propósito |
|---|---|---|
| 1 | 📥 Procesar entrada | Procesar info nueva y guardarla en el vault |
| 2 | 🔄 Sincronizar vault | Revisar y reorganizar notas existentes |
| 3 | 💡 Generar insights | Encontrar conexiones entre notas |
| 4 | 📅 Revisión diaria | Revisar el progreso y conocimiento diario |
| 5 | 🧠 Analizar grafo | Analizar el grafo de conocimiento con Graphify |

---

## 1️⃣ 📥 Procesar entrada

**Archivo:** [`../prompts/procesar-entrada.md`](../prompts/procesar-entrada.md)

**Cuándo usarlo:** Cuando tienes información nueva (artículo, idea, video, PDF) y quieres que Claude la procese y la guarde en tu vault.

**Uso:**
```bash
cat articulo.txt | claude "$(cat prompts/procesar-entrada.md)"
# O
claude "$(cat prompts/procesar-entrada.md)" << 'EOF'
Aquí pego el texto del artículo que quiero procesar...
EOF
```

**Qué hace:**
1. 📖 Lee y comprende la información
2. 🏷️ Extrae conceptos clave y etiquetas
3. 📝 Crea una nota estructurada en `Inbox/`
4. 🔗 Sugiere conexiones con notas existentes
5. ✅ Confirma lo que se guardó

---

## 2️⃣ 🔄 Sincronizar vault

**Archivo:** [`../prompts/sincronizar-vault.md`](../prompts/sincronizar-vault.md)

**Cuándo usarlo:** Cuando tu vault tiene notas desorganizadas o huérfanas (sin conexiones).

**Uso:**
```bash
claude "$(cat prompts/sincronizar-vault.md)"
```

**Qué hace:**
1. 🔍 Escanea el vault buscando notas huérfanas
2. 🏷️ Sugiere tags y categorías
3. 🔗 Propone conexiones entre notas relacionadas
4. 📂 Recomienda mover notas a carpetas correctas
5. 📊 Genera un reporte del estado del vault

---

## 3️⃣ 💡 Generar insights

**Archivo:** [`../prompts/generar-insights.md`](../prompts/generar-insights.md)

**Cuándo usarlo:** Quieres descubrir patrones, conexiones o ideas nuevas que no habías visto antes en tu conocimiento.

**Uso:**
```bash
claude "$(cat prompts/generar-insights.md)"
```

**Qué hace:**
1. 🧠 Analiza todas tus notas (o un subconjunto)
2. 🔗 Encuentra patrones y conexiones ocultas
3. 💡 Genera ideas nuevas basadas en tus notas
4. 📝 Crea notas de insight en tu vault
5. 🗺️ Actualiza Mapas de Contenido (MOCs)

---

## 4️⃣ 📅 Revisión diaria

**Archivo:** [`../prompts/revision-diaria.md`](../prompts/revision-diaria.md)

**Cuándo usarlo:** Cada día para cerrar tus notas, revisar lo aprendido y planificar.

**Uso:**
```bash
claude "$(cat prompts/revision-diaria.md)"
```

**Qué hace:**
1. 📖 Revisa tus notas del día
2. 📝 Actualiza tu nota diaria con un resumen
3. 🔗 Conecta los temas del día con conocimiento existente
4. 🗺️ Actualiza MOCs relevantes
5. ✅ Limpia el inbox (procesa notas pendientes)
6. 🎯 Sugiere temas para el día siguiente

---

## 5️⃣ 🧠 Analizar grafo (Graphify)

**Archivo:** [`../prompts/graphify-insights.md`](../prompts/graphify-insights.md)

**Cuándo usarlo:** Después de generar el grafo con Graphify (`graphify .`), quieres que Claude analice el reporte y encuentre conexiones nuevas.

**Uso:**
```bash
# 1. Primero genera el grafo
graphify .

# 2. Luego analiza con Claude
claude "$(cat prompts/graphify-insights.md)"
```

**Qué hace:**
1. 📊 Lee el `GRAPH_REPORT.md` generado por Graphify
2. 🔍 Identifica clusters de conocimiento aislados
3. 💡 Sugiere conexiones entre áreas que no habías vinculado
4. 📝 Crea notas de insight en tu vault
5. 🗺️ Propone actualizaciones a MOCs existentes

---

## 📂 Cómo usar los prompts en tu proyecto

Los prompts están en la carpeta `prompts/` de este repositorio. Para usarlos en tu proyecto personal:

1. **Copia la carpeta `prompts/`** a la raíz de tu proyecto:
   ```bash
   cp -r /ruta/a/este/repo/prompts /ruta/a/tu/proyecto/prompts
   ```

2. **Ejecuta los prompts** desde la raíz de tu proyecto:
   ```bash
   claude "$(cat prompts/procesar-entrada.md)"
   claude "$(cat prompts/revision-diaria.md)"
   ```

---

## 🎯 Cómo personalizar los prompts

Cada prompt está en su propio archivo `.md` dentro de `prompts/`. Puedes editarlos para adaptarlos a tu estilo.

**Ejemplo de personalización:**

```markdown
<!-- Original -->
Procesa la siguiente información y guárdala en mi vault.

<!-- Personalizado -->
Procesa la siguiente información y guárdala en mi vault.
Usa el formato Zettelkasten: idea principal → contexto → conexiones.
No uses más de 3 etiquetas por nota.
```

---

## 🚀 Tips de uso avanzado

### Encadenar prompts

```bash
# Primero procesas información
cat paper.txt | claude "$(cat prompts/procesar-entrada.md)"

# Luego generas insights sobre lo procesado
claude "$(cat prompts/generar-insights.md)"

# Al final del día, revisión
claude "$(cat prompts/revision-diaria.md)"
```

### Crear alias en el shell

```bash
# Agregar a ~/.zshrc o ~/.bashrc
alias brain-process='claude "$(cat ~/digital-brain/prompts/procesar-entrada.md)"'
alias brain-review='claude "$(cat ~/digital-brain/prompts/revision-diaria.md)"'
alias brain-insights='claude "$(cat ~/digital-brain/prompts/generar-insights.md)"'
alias brain-sync='claude "$(cat ~/digital-brain/prompts/sincronizar-vault.md)"'
```

### Usar con pipes

> 💡 **`pbpaste` es de macOS.** En Linux usa `xclip -o` (X11) o `wl-paste` (Wayland); en Windows/WSL2, `powershell.exe Get-Clipboard`. También puedes omitirlo y pegar el texto tú mismo.

```bash
# Procesar desde el portapapeles (macOS)
pbpaste | claude "$(cat prompts/procesar-entrada.md)"

# Procesar desde un archivo
cat mi-nota.md | claude "$(cat prompts/procesar-entrada.md)"

# Combinar herramientas
pbpaste | claude "$(cat prompts/procesar-entrada.md)" | tee resultado.txt
```

---

> 💡 **Tip:** Los prompts están diseñados para encadenarse. Usa `procesar-entrada.md` primero, luego `generar-insights.md` sobre lo procesado.

## ➡️ Siguiente paso

⬅️ **Anterior:** [`06-graphify-integracion.md`](./06-graphify-integracion.md) 🧠 · **Siguiente:** [`08-casos-de-uso.md`](./08-casos-de-uso.md) 🎯
