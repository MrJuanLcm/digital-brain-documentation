#!/bin/bash
# Verificador de enlaces internos — omite enlaces dentro de bloques de código

errors=0
total=0

for file in $(find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*"); do
  in_code_block=0
  
  while IFS= read -r line; do
    # Detectar inicio/fin de bloque de código (ignorando espacios iniciales)
    trimmed="${line## }"
    trimmed="${trimmed## }"
    case "$trimmed" in
      \`\`\`*) 
        if [ $in_code_block -eq 0 ]; then
          in_code_block=1
        else
          in_code_block=0
        fi
        ;;
    esac
    
    # Solo procesar enlaces fuera de bloques de código
    if [ $in_code_block -eq 0 ]; then
      case "$line" in
        *\]\(\./*)
          # Extraer ruta entre ](./ y )
          rest="${line#*]\(./}"
          link=""
          # Extraer hasta el primer ) que no esté escapado
          temp="$rest"
          paren_depth=0
          while [ -n "$temp" ]; do
            c="${temp:0:1}"
            temp="${temp:1}"
            if [ "$c" = "(" ]; then
              paren_depth=$((paren_depth + 1))
            elif [ "$c" = ")" ]; then
              if [ $paren_depth -eq 0 ]; then
                break
              else
                paren_depth=$((paren_depth - 1))
              fi
            fi
            link="$link$c"
            # Quitar el último ) extraído
            if [ "$c" = ")" ] && [ $paren_depth -eq 0 ]; then
              link="${link%?}"
              break
            fi
          done
          
          # Limpiar espacios
          link="${link#"${link%%[![:space:]]*}"}"
          link="${link%"${link##*[![:space:]]}"}"
          link="${link%\)}"  # quitar ) sobrante
          
          if [ -n "$link" ]; then
            total=$((total + 1))
            dir=$(dirname "$file")
            target="$dir/$link"
            
            # Si termina en /, verificar como directorio
            if [ "${link: -1}" = "/" ]; then
              if [ -d "$target" ]; then
                continue
              fi
            fi
            
            # Si no tiene extensión .md, intentar agregarla
            case "$link" in
              *.md) ;;
              *) 
                if [ -f "$target.md" ]; then
                  continue
                fi
                ;;
            esac
            
            if [ ! -f "$target" ]; then
              echo "   ❌ $file → Enlace roto: $link"
              errors=$((errors + 1))
            fi
          fi
          ;;
      esac
    fi
  done < "$file"
done

if [ $errors -eq 0 ]; then
  echo "   ✅ $total enlaces verificados, todos válidos"
else
  echo "   ❌ $errors de $total enlaces rotos"
  exit 1
fi
