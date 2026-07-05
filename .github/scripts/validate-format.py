#!/usr/bin/env python3
"""Verificador de formato Markdown — detecta tabs."""
import os
import sys

errors = 0
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

for dirpath, _, files in os.walk(root):
    if ".git" in dirpath or "node_modules" in dirpath:
        continue
    for fname in files:
        if not fname.endswith(".md"):
            continue
        fpath = os.path.join(dirpath, fname)
        with open(fpath) as f:
            for i, line in enumerate(f, 1):
                if line.startswith("\t"):
                    rel = os.path.relpath(fpath, root)
                    print(f"   ⚠️  {rel}:{i} — usa espacios, no tabs")
                    errors += 1

if errors == 0:
    print("   ✅ No se encontraron tabs en los archivos")
else:
    print(f"   ⚠️  {errors} líneas con tabs")
    sys.exit(0)  # no fatal, solo advertencia
