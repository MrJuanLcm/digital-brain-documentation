# 🎯 Ejemplo: Sistema de estudio

> **Tema:** Preparación para un examen de Biología Molecular
> **Material:** 5 PDFs, 3 videos, apuntes dispersos

---

## 📥 Paso 1: Procesar todo el material

> 💡 **`pbpaste` es de macOS.** En Linux usa `xclip -o` (X11) o `wl-paste` (Wayland); en Windows/WSL2, `powershell.exe Get-Clipboard`. También puedes omitirlo y pegar el texto tú mismo.

```bash
# Procesar PDFs
for pdf in ~/Downloads/biologia/*.pdf; do
  pdftotext "$pdf" - | claude "$(cat ../prompts/procesar-entrada.md)"
done

# Procesar notas de YouTube
pbpaste | claude "$(cat ../prompts/procesar-entrada.md)"
```

---

## 🧠 Paso 2: Generar mapa conceptual

```bash
claude "Analiza todas las notas en mi vault sobre
biología molecular y crea un mapa de conceptos.
Identifica: temas principales, sub-temas, y
relaciones entre ellos. Guarda el resultado como
un MOC en MOCs/moc-biologia-molecular.md"
```

---

## 📝 Paso 3: Crear notas de estudio

```bash
claude "Para cada tema principal del MOC de biología
molecular, crea una nota de estudio en Referencias/
con: definición, proceso paso a paso y preguntas
de práctica. Conecta cada nota al MOC."
```

---

## ❓ Paso 4: Generar preguntas de práctica

```bash
claude "Basado en las notas de biología molecular,
genera 10 preguntas de examen tipo test y 5
preguntas de desarrollo. Crea una nota en
Proyectos/Examen-Biologia/preguntas-practica.md"
```

---

## 📅 Paso 5: Repaso diario

```bash
# Cada día de estudio
claude "$(cat ../prompts/revision-diaria.md)"
```

---

## ✅ Resultado final

```
📁 DigitalBrain/
├── 📥 Inbox/
│   ├── transcripcion-adn.md
│   ├── replicacion-adn.md
│   └── sintesis-proteinas.md
├── 📚 Referencias/
│   ├── adn-estructura.md
│   ├── transcripcion.md
│   ├── traduccion.md
│   └── mutaciones.md
├── 🗺️ MOCs/
│   └── moc-biologia-molecular.md
├── 🗂️ Proyectos/
│   └── Examen-Biologia/
│       ├── preguntas-practica.md
│       └── plan-estudio.md
└── 📅 Diario/
    └── 2024-07-05.md
```
