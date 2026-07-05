# 💾 Backup del vault de Obsidian

> **Propósito:** Explica cómo hacer backups periódicos del vault de Obsidian para no perder información.

---

## Backup manual con tar

```bash
# Comprimir todo el vault (excluyendo .obsidian y node_modules)
tar -czf "backup-$(date +%Y%m%d_%H%M%S).tar.gz" \
  --exclude=".obsidian" \
  --exclude="node_modules" \
  -C "$(dirname /ruta/al/vault)" "$(basename /ruta/al/vault)"
```

## Backup con Git

```bash
# Inicializar repo en el vault
cd /ruta/a/tu/vault
git init
echo ".obsidian/" >> .gitignore

# Commit periódico
git add .
git commit -m "Backup $(date +%Y-%m-%d)"
```

## Backup automático con cron

```bash
# Agregar a crontab (backup diario a las 2 AM)
crontab -e
# Agregar esta línea:
0 2 * * * cd /ruta/al/vault && tar -czf "~/backups/vault-$(date +\%Y\%m\%d).tar.gz" --exclude=".obsidian" .
```
