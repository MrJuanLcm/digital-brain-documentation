# 📥 Procesar entrada de información

> **Propósito:** Explica cómo enviar información nueva a Claude para que la procese y la guarde en el vault de Obsidian.
>
> 📖 El prompt completo está en [`prompts/procesar-entrada.md`](../prompts/procesar-entrada.md).

---

## Con texto desde el portapapeles

> 💡 **`pbpaste` es de macOS.** En Linux usa `xclip -o` (X11) o `wl-paste` (Wayland); en Windows/WSL2, `powershell.exe Get-Clipboard`. También puedes omitirlo y pegar el texto tú mismo.

```bash
# macOS: pegar y procesar
pbpaste | claude "$(cat prompts/procesar-entrada.md)"

# Linux: usar xclip
xclip -o | claude "$(cat prompts/procesar-entrada.md)"
```

## Con un archivo

```bash
claude "$(cat prompts/procesar-entrada.md)" < articulo.txt

# O pasando el archivo como argumento
cat articulo.txt | claude "$(cat prompts/procesar-entrada.md)"
```

## Con múltiples archivos

```bash
for archivo in *.txt; do
  cat "$archivo" | claude "$(cat prompts/procesar-entrada.md)"
done
```

## Con una URL

```bash
curl -s "https://ejemplo.com/articulo" | \
  pandoc -f html -t markdown | \
  claude "$(cat prompts/procesar-entrada.md)"
```
