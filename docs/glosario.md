---
title: "Glosario"
description: "Definiciones de términos técnicos usados en el Digital Brain"
tags: [glosario, referencia]
sidebar_position: 9
---

# 📖 Glosario

> Definiciones rápidas de los términos clave del ecosistema Digital Brain.

---

## A

### API Key
Clave de autenticación para usar la API de Anthropic. Permite que Claude Code se comunique con los modelos de lenguaje de Anthropic. Se configura via variable de entorno `ANTHROPIC_API_KEY`.

---

## C

### Claude Code
Interfaz de línea de comandos de Anthropic para interactuar con Claude. Permite ejecutar prompts, procesar archivos y conectarse con MCP servers.

### Callout
Elemento visual en Markdown para destacar información importante (tips, advertencias, errores). Se crea con `> 💡 **Tip:** texto`.

---

## D

### Dataview
Plugin de Obsidian que permite consultar y filtrar notas usando una sintaxis similar a SQL. Útil para crear índices dinámicos y dashboards.

### Digital Brain (Cerebro Digital)
Sistema que combina Obsidian (almacenamiento), Claude Code (procesamiento) y MCP (conexión) para gestionar conocimiento personal de forma automatizada.

---

## G

### Graphify
Skill para Claude Code que construye automáticamente un grafo de conocimiento a partir de archivos (código, documentación, imágenes, SQL). Se integra con el Digital Brain como una capa de descubrimiento estructural: revela conexiones entre entidades que no son obvias desde las notas individuales. Salida en HTML, Obsidian vault, wiki y JSON. Se instala con `pip install graphifyy && graphify install`.

---

## H

### Harness
Capa de orquestación que configura, inicia y gestiona la comunicación entre Claude Code y el MCP Server. Mantiene las rutas, credenciales y procesos necesarios para que el sistema funcione.

---

## I

### Inbox
Carpeta principal del vault donde llega toda la información nueva. Es el punto de entrada antes de ser procesada y clasificada.

---

## M

### MCP (Model Context Protocol)
Protocolo abierto creado por Anthropic que permite conectar modelos de lenguaje con herramientas externas y fuentes de datos. Actúa como un "USB-C para la IA" — un estándar universal de conexión.

### MCP Client
Componente que vive dentro del MCP Host. Establece la conexión con el servidor, envía peticiones y recibe respuestas.

### MCP Host
Programa que inicia la conexión MCP. En el Digital Brain, es Claude Code. Contiene el MCP Client y gestiona múltiples MCP Servers.

### MCP Server
Programa que expone recursos y herramientas para que el modelo de lenguaje las use. En nuestro caso, el servidor que conecta con Obsidian.

### MOC (Map of Content)
Nota índice que organiza y conecta un conjunto de notas sobre un mismo tema. Actúa como un hub de navegación dentro del vault.

---

## O

### Obsidian
Aplicación de notas basada en archivos Markdown locales. Es el almacenamiento principal del Digital Brain.

---

## P

### Plugin
Extensión de Obsidian que agrega funcionalidades. Ejemplos: Dataview, Periodic Notes, Omnisearch.

### Prompt
Instrucción en lenguaje natural que se le da a Claude para que realice una tarea específica. Los prompts están en la carpeta `prompts/`.

---

## R

### Resource (MCP)
Datos que el MCP Server expone para que Claude los lea. Ejemplo: contenido de una nota de Obsidian.

---

## T

### Tool (MCP)
Acción que Claude puede ejecutar a través del MCP Server. Ejemplos: crear nota, buscar texto, listar archivos.

---

## V

### Vault
Carpeta raíz donde Obsidian almacena todas las notas. Es el repositorio de conocimiento del Digital Brain.

---

## Z

### Zettelkasten
Método de toma de notas basado en ideas atómicas interconectadas. Cada nota contiene una sola idea y se enlaza con otras. Obsidian está diseñado para este método.
