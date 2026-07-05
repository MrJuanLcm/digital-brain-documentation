#!/bin/bash
# Verificador de enlaces internos para la documentación

errors=0

for file in $(find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*"); do
  # Extraer enlaces relativos del tipo [texto](./ruta)
  links=$(grep -oP '\]\(\./[^)]+\)' "$file" | sed 's/\]\(\.\// /;s/)\)//')
  
  for link in $links; do
    # Resolver ruta relativa al archivo
    dir=$(dirname "$file")
    target="$dir/$link"
    
    # Normalizar la ruta
    if [[ ! -f "$target" ]]; then
      echo "❌ $file → Enlace roto: $link"
      errors=$((errors + 1))
    fi
  done
done

if [ $errors -eq 0 ]; then
  echo "✅ Todos los enlaces internos son válidos"
else
  echo "❌ $errors enlaces rotos encontrados"
  exit 1
fi
