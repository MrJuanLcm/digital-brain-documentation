---
title: "Prompts — README"
description: "Índice de la biblioteca de prompts para Claude Code"
tags: [prompts, indice]
---

# 🤖 Biblioteca de prompts para Digital Brain

Aquí encontrarás prompts listos para usar con Claude Code.
Cada prompt está diseñado para una tarea específica dentro de tu sistema de conocimiento.

---

## 📋 Prompts disponibles

| Archivo | 🎯 Propósito | 📥 Input | 📤 Output |
|---|---|---|---|
| [`procesar-entrada.md`](./procesar-entrada.md) | Procesar info nueva y guardarla en el vault | Texto, URL, idea | Nota estructurada en Inbox/ |
| [`sincronizar-vault.md`](./sincronizar-vault.md) | Revisar y reorganizar notas existentes | Ninguno (escanea el vault) | Reporte + notas organizadas |
| [`generar-insights.md`](./generar-insights.md) | Encontrar conexiones entre notas | Tema o filtro opcional | Nuevas notas de insight |
| [`revision-diaria.md`](./revision-diaria.md) | Revisión al final del día | Notas del día | Resumen + conexiones |

---

## 🚀 Cómo usar los prompts

```bash
# Método 1: Pasar el prompt como argumento
claude "$(cat prompts/procesar-entrada.md)" "texto a procesar..."

# Método 2: Pipe de texto
cat articulo.txt | claude "$(cat prompts/procesar-entrada.md)"

# Método 3: Prompt + input manual
claude "$(cat prompts/revision-diaria.md)"
```

---

## 🎨 Personalización

Siéntete libre de editar cualquier prompt para adaptarlo a tu flujo de trabajo.
Cada prompt incluye instrucciones claras para Claude sobre qué hacer paso a paso.
