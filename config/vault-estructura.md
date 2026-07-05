# 📁 Estructura recomendada del vault

---

## 🌳 Árbol de directorios

```
📁 DigitalBrain/                    ← Raíz del vault
│
├── 📥 Inbox/                       ★ Todo lo nuevo llega aquí
│   └── ...                         Ideas, artículos, notas rápidas
│
├── 🗂️ Proyectos/                   ★ Proyectos activos
│   ├── proyecto-actual/
│   │   ├── proyecto-actual.md      Nota principal del proyecto
│   │   ├── tareas.md               Lista de tareas
│   │   └── notas/                  Notas específicas del proyecto
│   └── ...
│
├── 📚 Referencias/                  ★ Conocimiento permanente
│   ├── conceptos/                  Conceptos fundamentales
│   │   ├── machine-learning.md
│   │   └── ...
│   ├── personas/                   Personas e investigadores
│   │   ├── alan-turing.md
│   │   └── ...
│   ├── recursos/                   Recursos externos (libros, papers)
│   │   └── ...
│   └── insights/                   Insights generados por Claude
│       └── ...
│
├── 📅 Diario/                      ★ Notas diarias
│   ├── 2024-07-05.md
│   ├── 2024-07-06.md
│   └── ...
│
├── 🗺️ MOCs/                        ★ Maps of Content (índices)
│   ├── moc-aprendizaje.md
│   ├── moc-proyectos.md
│   └── ...
│
├── 🏷️ Tags/                        ★ Notas por etiqueta (opcional)
│   └── ...
│
└── 📎 Archivo/                     ★ Proyectos completados
    └── ...
```

---

## 📋 Descripción de cada carpeta

| Carpeta | 🎯 Propósito | 📥 Qué va aquí |
|---|---|---|
| **Inbox** | Captura rápida de cualquier idea o info nueva | Notas sin procesar, artículos, URLs, ideas sueltas |
| **Proyectos** | Proyectos activos con sus propias notas | Cada proyecto tiene su subcarpeta |
| **Referencias** | Conocimiento permanente y atómico | Conceptos, definiciones, personas, recursos |
| **Diario** | Registro diario de actividades y aprendizaje | Una nota por día con formato YYYY-MM-DD |
| **MOCs** | Mapas de Contenido — índices temáticos | Notas que actúan como hubs de navegación |
| **Archivo** | Proyectos terminados | Mover proyectos completados aquí |

---

## 🏛️ Convención de nombres

| Tipo | Formato | Ejemplo |
|---|---|---|
| Notas diarias | `YYYY-MM-DD.md` | `2024-07-05.md` |
| Notas de concepto | `kebab-case.md` | `machine-learning.md` |
| MOCs | `moc-tema.md` | `moc-aprendizaje.md` |
| Proyectos | `kebab-case/` | `mi-proyecto/` |

---

## 💡 Principios

1. **📥 Inbox siempre primero** — Todo lo nuevo llega al Inbox
2. **🔗 Enlaza todo** — Cada nota debe conectar con al menos otra
3. **🗺️ Usa MOCs** — Los Mapas de Contenido son tus guías
4. **🧹 Procesa el Inbox** — Vacíalo regularmente (diario o semanal)
5. **🏷️ Tags complementan** — Los tags son metadata, no reemplazan estructura
