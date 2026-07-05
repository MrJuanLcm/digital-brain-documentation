---
title: "Graphify insights"
description: "Prompt para analizar el grafo de conocimiento generado por Graphify y descubrir conexiones"
tags: [prompt, graphify, grafo, conexiones]
purpose: "🔗 Descubrir conexiones estructurales desde el grafo de Graphify"
input: "GRAPH_REPORT.md generado por graphify ."
output: "Nuevas notas de insight + MOCs actualizados en el vault principal"
---

# 🔗 Prompt: Graphify Insights

## 🎯 Objetivo

Usar el grafo de conocimiento generado por Graphify para identificar patrones estructurales, clusters temáticos y conexiones que no eran obvias desde las notas individuales.

## 📋 Instrucciones para Claude

Eres un analista de grafos especializado en encontrar estructura dentro del conocimiento. Tu tarea es analizar el `GRAPH_REPORT.md` generado por Graphify y extraer insights accionables.

### Paso 1: Leer el reporte del grafo

Lee el archivo `graphify-out/GRAPH_REPORT.md` para entender:

- Cuántas entidades se detectaron
- Cuántas relaciones existen
- Cuáles son los nodos más conectados (hubs)
- Qué clusters o comunidades se forman

### Paso 2: Identificar patrones estructurales

Busca estos patrones en el grafo:

1. **🌟 Hubs** — Entidades con muchas conexiones. Son candidatas a MOCs.
2. **🔗 Puentes** — Entidades que conectan dos clusters diferentes. Revelan conexiones跨disciplinarias.
3. **🧩 Islas** — Entidades sin o con muy pocas conexiones. Posible contenido por procesar o conectar.
4. **📦 Clusters** — Grupos densamente conectados. Representan áreas temáticas coherentes.
5. **🕳️ Lagunas** — Áreas del proyecto que no aparecen en el grafo. Conocimiento faltante.

### Paso 3: Generar insights desde el grafo

Para cada patrón encontrado, genera un insight estructurado:

```markdown
## 💡 Insight: {{Título}}

**Tipo:** {{Hub / Puente / Isla / Cluster / Laguna}}

**Descubrimiento:**
{{Qué revela el grafo sobre esta entidad o relación}}

**Entidades involucradas:**
- {{Entidad 1}} ({{n}} conexiones)
- {{Entidad 2}} ({{n}} conexiones)

**Implicación:**
{{Cómo afecta esto a tu comprensión del proyecto}}

**Acción sugerida:**
{{Crear MOC, conectar nota, investigar tema, etc.}}
```

### Paso 4: Crear MOCs si es necesario

Si identificaste un hub o cluster que no tiene un MOC en tu vault principal:

1. Crea una nota MOC en `MOCs/{{tema}}.md`
2. Enlaza todas las entidades del cluster
3. Agrega un resumen de las relaciones del cluster

### Paso 5: Conectar islas

Para cada entidad aislada identificada:

1. Busca en tu vault principal notas relacionadas usando `search_notes`
2. Si encuentras conexiones potenciales, agrega links en ambas direcciones
3. Si no encuentras nada, crea una nota en `Inbox/` como recordatorio para investigar

### Paso 6: Resumen para el usuario

Presenta un resumen estructurado:

```markdown
## 📊 Resumen del análisis

**Estadísticas del grafo:**
- {{n}} entidades detectadas
- {{n}} relaciones
- {{n}} clusters identificados

**Hallazgos principales:**
1. 🏆 Hub principal: {{nombre}} ({{n}} conexiones)
2. 🔗 Puente clave: {{nombre}} conecta {{cluster A}} con {{cluster B}}
3. 🧩 Islas por conectar: {{n}} entidades
4. 📦 Clusters encontrados: {{lista}}

**Próximos pasos:**
- [ ] Crear MOC para {{cluster}}
- [ ] Conectar {{isla}} con {{tema}}
- [ ] Investigar {{laguna}}
```
