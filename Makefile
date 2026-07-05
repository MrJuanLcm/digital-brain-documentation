# 🧠 Digital Brain — Makefile
# ============================

# ─── Configuración ─────────────────────────────────────
MARKDOWN_FILES := $(shell find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*")
SCRIPTS_DIR := scripts
DOCS_DIR := docs

# ─── Ayuda ─────────────────────────────────────────────
.PHONY: help
help: ## Muestra esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Validación ────────────────────────────────────────
.PHONY: validate
validate: validate-links validate-format ## Ejecuta todas las validaciones

.PHONY: validate-links
validate-links: ## Verifica que los enlaces internos no estén rotos
	@echo "🔗 Verificando enlaces internos..."
	@.github/scripts/validate-links.py

.PHONY: validate-format
validate-format: ## Verifica el formato de los archivos Markdown
	@echo "📝 Verificando formato Markdown..."
	@.github/scripts/validate-format.py

# ─── Lint ──────────────────────────────────────────────
.PHONY: lint
lint: ## Corre markdownlint en todos los archivos
	@if command -v markdownlint &>/dev/null; then \
		markdownlint $(MARKDOWN_FILES); \
	elif command -v mdl &>/dev/null; then \
		mdl $(MARKDOWN_FILES); \
	else \
		echo "⚠️  markdownlint no instalado. Para instalarlo:"; \
		echo "   npm install -g markdownlint-cli"; \
		echo "   O usa: make lint-docker"; \
	fi

.PHONY: lint-docker
lint-docker: ## Corre markdownlint usando Docker
	docker run --rm -v "$(PWD):/workspace" dlavric/markdownlint /workspace

# ─── Servidor local ────────────────────────────────────
.PHONY: serve
serve: ## Inicia un servidor local para previsualizar (Python)
	@if command -v python3 &>/dev/null; then \
		echo "🌐 Servidor en http://localhost:8000"; \
		python3 -m http.server 8000; \
	elif command -v python &>/dev/null; then \
		echo "🌐 Servidor en http://localhost:8000"; \
		python -m SimpleHTTPServer 8000; \
	else \
		echo "❌ Python no instalado. Instálalo o abre los archivos directamente."; \
	fi

# ─── Construcción ──────────────────────────────────────
.PHONY: build
build: ## Prepara el proyecto (placeholder)
	@echo "📦 Build: no aplica para documentación Markdown pura."
	@echo "   Si migras a MkDocs/Docusaurus, este comando generará el sitio."

# ─── Limpieza ──────────────────────────────────────────
.PHONY: clean
clean: ## Limpia archivos temporales
	rm -rf node_modules .DS_Store
	find . -name "*.log" -delete
	@echo "🧹 Limpieza completada"
