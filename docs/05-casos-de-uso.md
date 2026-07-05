---
title: "Casos de uso"
description: "Ejemplos prácticos de uso del Digital Brain en situaciones reales"
tags: [ejemplos, casos-de-uso]
sidebar_position: 5
---

# 🎯 Casos de uso prácticos

> Situaciones reales donde el Digital Brain resuelve problemas concretos.

## 📋 Tabla de contenidos

- [📖 Caso 1: Investigación de un tema nuevo](#-caso-1-investigación-de-un-tema-nuevo)
- [📅 Caso 2: Diario de aprendizaje diario](#-caso-2-diario-de-aprendizaje-diario)
- [🧪 Caso 3: Estudio para un examen](#-caso-3-estudio-para-un-examen)
- [📝 Caso 4: Procesar una idea repentina](#-caso-4-procesar-una-idea-repentina)
- [🔄 Caso 5: Reorganización mensual](#-caso-5-reorganización-mensual)
- [🌐 Caso 6: Integración con web](#-caso-6-integración-con-web)

---

## 📖 Caso 1: Investigación de un tema nuevo

**Situación:** Quieres aprender sobre "Arquitectura Hexagonal" y tener notas organizadas.

```bash
# 1️⃣ Pega un artículo en el sistema
pbpaste | claude "$(cat ../prompts/procesar-entrada.md)"

# 2️⃣ Claude extrae y guarda conceptos clave
#     → Crea nota en Inbox/arquitectura-hexagonal.md
#     → Extrae: puertos, adaptadores, dominio, infraestructura

# 3️⃣ Pide a Claude que conecte con lo que ya sabes
claude "$(cat ../prompts/generar-insights.md)" \
  --filter "arquitectura hexagonal"
```

**Resultado:** Una nota estructurada con enlaces a tus notas existentes sobre arquitectura de software.

---

## 📅 Caso 2: Diario de aprendizaje diario

**Situación:** Cada día aprendes cosas nuevas y quieres registrar tu progreso.

```bash
# Por la noche, revisión diaria
claude "$(cat ../prompts/revision-diaria.md)"
```

**Lo que hace Claude:**
1. 📂 Abre tu nota diaria de Obsidian
2. ✍️ Agrega un resumen del día
3. 🔗 Enlaza con conceptos que mencionaste
4. 🎯 Sugiere 3 temas para mañana

---

## 🧪 Caso 3: Estudio para un examen

**Situación:** Tienes 5 PDFs de estudio y quieres extraer lo esencial.

```bash
# 1️⃣ Procesa cada PDF
for pdf in *.pdf; do
  pdftotext "$pdf" - | claude "$(cat ../prompts/procesar-entrada.md)"
done

# 2️⃣ Genera un mapa de conceptos
claude "$(cat ../prompts/generar-insights.md)" \
  --filter "examen-biologia"

# 3️⃣ Pide un resumen unificado
claude "Crea un MOC (Map of Content) llamado 'Biología - Examen Final'
que conecte todas las notas que procesé sobre este tema."

# 4️⃣ Claude:
#     - Crea moc-examen-biologia.md
#     - Enlaza todas las notas relevantes
#     - Identifica lagunas de conocimiento
```

---

## 📝 Caso 4: Procesar una idea repentina

**Situación:** Tienes una idea brillante pero estás en medio de otra cosa.

```bash
# Rápido: pasas la idea a Claude directamente
claude "$(cat ../prompts/procesar-entrada.md)" << 'EOF'
Se me ocurrió que podríamos combinar el sistema de
recomendación con un grafo de conocimiento para
hacer sugerencias más contextuales. La clave sería
usar embeddings en tiempo real.
EOF
```

**Resultado:** La idea queda guardada en `Inbox/` con tags, contexto y enlaces a proyectos relacionados.

---

## 🔄 Caso 5: Reorganización mensual

**Situación:** Tu vault tiene 3 meses de notas y está desordenado.

```bash
# Escanea y reorganiza
claude "$(cat ../prompts/sincronizar-vault.md)"

# Claude va a:
# 1. Encontrar notas huérfanas (sin enlaces)
# 2. Sugerir categorías y tags
# 3. Proponer MOCs para temas recurrentes
# 4. Mover notas de Inbox/ a Referencias/
```

---

## 🌐 Caso 6: Integración con web

**Situación:** Encuentras un artículo interesante en el navegador.

```bash
# Opción 1: Copiar URL y procesar
curl -s "https://ejemplo.com/articulo" | \
  pandoc -f html -t markdown | \
  claude "$(cat ../prompts/procesar-entrada.md)"

# Opción 2: Usar una herramienta como Reader Mode
# y pasar el texto limpio
pbpaste | claude "$(cat ../prompts/procesar-entrada.md)"
```

---

## 🎯 Resumen — ¿Qué caso usar y cuándo?

| Cuándo | Qué usar |
|---|---|
| 📥 Nueva información | [`procesar-entrada.md`](../prompts/procesar-entrada.md) |
| 🔄 Desorden en el vault | [`sincronizar-vault.md`](../prompts/sincronizar-vault.md) |
| 💡 Quiero conectar ideas | [`generar-insights.md`](../prompts/generar-insights.md) |
| 📅 Fin del día | [`revision-diaria.md`](../prompts/revision-diaria.md) |

---

> 💡 **Tip:** Estos casos son acumulativos. Empieza por el Caso 1 (investigación) y avanza. Cada caso asume que dominas el anterior.

## ➡️ Siguiente paso

⬅️ **Anterior:** [`04-prompts.md`](./04-prompts.md) 🤖 · **Siguiente:** [`06-mcp-explicado.md`](./06-mcp-explicado.md) 🔌
