# 🎯 Ejemplo: Flujo de investigación

> **Tema:** Aprendizaje Automático (Machine Learning)
> **Objetivo:** Investigar el tema y construir notas conectadas en el vault

---

## 📥 Paso 1: Capturar información

Encuentras un artículo sobre ML y lo procesas:

```bash
cat articulo-ml.md | claude "$(cat ../prompts/procesar-entrada.md)"
```

**Claude crea:** `Inbox/que-es-machine-learning.md`

```markdown
# Machine Learning

> Rama de la IA que permite a sistemas aprender de datos.

## 📝 Notas

- Algoritmos aprenden patrones sin programación explícita
- Tres tipos: supervisado, no supervisado, refuerzo
- Aplicaciones: clasificación, regresión, clustering

## 🏷️ Tags

- #ia
- #machine-learning
- #algoritmos
```

---

## 🔗 Paso 2: Conectar con conocimiento existente

```bash
claude "$(cat ../prompts/generar-insights.md)" --filter "machine learning"
```

**Claude busca en tu vault y encuentra:**

- Notas existentes sobre `inteligencia-artificial.md`
- Una nota vieja sobre `python-scikit-learn.md`
- Un proyecto de `analisis-datos.md`

**Claude actualiza las notas:**

| Nota | Cambio |
|---|---|
| `inteligencia-artificial.md` | Agrega enlace → `machine-learning.md` |
| `python-scikit-learn.md` | Agrega enlace → `machine-learning.md` |
| `machine-learning.md` | Agrega enlaces → esas dos notas |

---

## 🗺️ Paso 3: Crear MOC

```bash
claude "Crea un MOC llamado 'Aprendizaje Automático' que
conecte todas las notas sobre IA y ML de mi vault."
```

**Claude crea:** `MOCs/moc-aprendizaje-automatico.md`

Y al final del día:

```bash
claude "$(cat ../prompts/revision-diaria.md)"
```

---

## ✅ Resultado final

```
Antes:                        Después:
Una nota suelta               Un mapa de conocimiento
en Inbox/                     conectado:

                              moc-aprendizaje-automatico.md
                              ├── machine-learning.md ← NUEVA
                              ├── inteligencia-artificial.md
                              ├── python-scikit-learn.md
                              └── analisis-datos.md
```
