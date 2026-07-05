#!/usr/bin/env python3
"""Verificador de enlaces internos para documentación Markdown."""
import os
import re
import sys

errors = 0
total = 0
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

for dirpath, _, files in os.walk(root):
    for fname in files:
        if not fname.endswith(".md"):
            continue
        fpath = os.path.join(dirpath, fname)
        if ".git" in fpath or "node_modules" in fpath:
            continue

        with open(fpath, "r") as f:
            content = f.read()

        # Eliminar bloques de código (```...```)
        cleaned = re.sub(r"```.*?```", "", content, flags=re.DOTALL)

        # Buscar enlaces del tipo [texto](./ruta)
        for match in re.finditer(r"\]\(\./([^)]+)\)", cleaned):
            link = match.group(1)
            total += 1
            target = os.path.normpath(os.path.join(dirpath, link))

            # Links que terminan en / → verificar como directorio
            if link.endswith("/"):
                if os.path.isdir(target):
                    continue
            else:
                if os.path.isfile(target):
                    continue
                # Intentar con extensión .md si no tiene
                if not link.endswith(".md") and os.path.isfile(target + ".md"):
                    continue

            rel_path = os.path.relpath(fpath, root)
            print(f"   ❌ {rel_path} → Enlace roto: {link}")
            errors += 1

if errors == 0:
    print(f"   ✅ {total} enlaces verificados, todos válidos")
else:
    print(f"   ❌ {errors} de {total} enlaces rotos")
    sys.exit(1)
