# 🎯 Ejemplo: Gestión de proyectos con Digital Brain

> **Objetivo:** Usar tu Digital Brain para planificar, ejecutar y dar seguimiento a proyectos complejos.

---

## 📋 Escenario

Tienes un proyecto **"Lanzamiento MVP SaaS"** con múltiples áreas:

- Investigación de mercado
- Desarrollo técnico
- Diseño UX/UI
- Marketing y lanzamiento
- Documentación

---

## 🚀 Paso 1: Crear la estructura del proyecto

```bash
# Usar el prompt para crear proyecto
claude "$(cat ../prompts/procesar-entrada.md)" << 'EOF'
Crear estructura para proyecto "Lanzamiento MVP SaaS"

Carpetas necesarias:
- Proyectos/lanzamiento-mvp-saas/
  - 01-investigacion/
  - 02-desarrollo/
  - 03-diseno/
  - 04-marketing/
  - 05-documentacion/
  - MOCs/
EOF
```

**Claude crea:** `Proyectos/lanzamiento-mvp-saas/` con subcarpetas + `MOCs/moc-lanzamiento-mvp-saas.md`

---

## 📥 Paso 2: Capturar investigación (Inbox)

```bash
# Procesar artículos, análisis de competencia, entrevistas
cat analisis-competencia.md | claude "$(cat ../prompts/procesar-entrada.md)"
cat entrevistas-usuarios.md | claude "$(cat ../prompts/procesar-entrada.md)"
cat tendencias-mercado-2024.md | claude "$(cat ../prompts/procesar-entrada.md)"
```

**Resultado en `Inbox/`:**

- `analisis-competencia-saas.md`
- `entrevistas-usuarios-pain-points.md`
- `tendencias-mercado-saas-2024.md`

---

## 🔗 Paso 3: Conectar y organizar

```bash
# Mover investigación a carpeta del proyecto
claude "$(cat ../prompts/sincronizar-vault.md)"
```

**Claude:**

1. Detecta notas en `Inbox/` relacionadas con "MVP SaaS"
2. Mueve a `Proyectos/lanzamiento-mvp-saas/01-investigacion/`
3. Actualiza `MOCs/moc-lanzamiento-mvp-saas.md` con enlaces

---

## 📝 Paso 4: Crear notas de acción (tasks)

```bash
# Crear tareas técnicas
claude "Crea notas de tarea en Proyectos/lanzamiento-mvp-saas/02-desarrollo/ para:
1. Configurar repo + CI/CD
2. Diseñar esquema DB (usuarios, suscripciones, API keys)
3. Implementar auth (NextAuth + email/password + OAuth)
4. API Stripe para suscripciones
5. Dashboard de usuario con uso de API
6. Landing page con pricing
7. Tests E2E críticos
8. Deploy a Vercel + Railway

Formato: cada tarea como nota con checkbox, prioridad, estimación"
```

**Resultado:** 8 notas en `02-desarrollo/` con formato:

```markdown
# Tarea: Configurar repo + CI/CD

> Prioridad: 🔴 Alta | Estimación: 2h | Estado: ☐ Pendiente

## 📋 Descripción

Inicializar monorepo con Turborepo, configurar ESLint, Prettier, GitHub Actions

## ✅ Criterios de aceptación

- [ ] `turbo run build` pasa
- [ ] `turbo run lint` pasa
- [ ] GitHub Actions corre en push/PR
- [ ] Deploy preview en Vercel funciona
```

---

## 🔄 Paso 5: Daily standup con revisión diaria

```bash
# Cada mañana
claude "$(cat ../prompts/revision-diaria.md)"
```

**Claude revisa:**

- Qué se completó ayer
- Qué está en progreso
- Bloqueadores
- Actualiza `Diario/2024-07-05.md` con progreso del proyecto

---

## 💡 Paso 6: Generar insights semanales

```bash
# Cada viernes
claude "$(cat ../prompts/generar-insights.md)" --filter "lanzamiento-mvp-saas"
```

**Claude analiza:**

- Patrones en bloqueos recurrentes
- Dependencias entre tareas
- Riesgos técnicos detectados
- Oportunidades de paralelización

**Crea:** `Proyectos/lanzamiento-mvp-saas/insights-semana-3.md`

---

## 🗺️ Paso 7: Actualizar MOC del proyecto

El MOC `moc-lanzamiento-mvp-saas.md` se mantiene vivo:

```markdown
# 🗺️ MOC: Lanzamiento MVP SaaS

> Estado: 🟡 En desarrollo | Sprint 3/6 | Lanzamiento: 2024-08-15

## 📊 Dashboard

- **Progreso global:** 45% (18/40 tareas)
- **Esta semana:** 5 completadas, 2 en progreso
- **Bloqueadores:** 1 (Stripe webhook testing)

## 📁 Estructura

- [[01-investigacion/]] — 12 notas
- [[02-desarrollo/]] — 8 tareas activas
- [[03-diseno/]] — 3 notas (pendiente revisión)
- [[04-marketing/]] — 5 notas (landing, emails, social)
- [[05-documentacion/]] — 2 notas (API docs, user guide)

## 🔗 Enlaces rápidos

- [GitHub Project Board](https://github.com/orgs/mi-org/projects/3)
- [Vercel Preview](https://mvp-saas-git-main-mi-org.vercel.app)
- [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

## 📅 Próximos hitos

| Fecha      | Hito              | Estado         |
| ---------- | ----------------- | -------------- |
| 2024-07-15 | Auth + DB listos  | ✅ Done        |
| 2024-07-22 | Stripe integrado  | 🔄 En progreso |
| 2024-07-29 | Dashboard usuario | ⏳ Pendiente   |
| 2024-08-05 | Landing + pricing | ⏳ Pendiente   |
| 2024-08-12 | Tests + deploy    | ⏳ Pendiente   |
| 2024-08-15 | 🚀 LANZAMIENTO    | ⏳ Pendiente   |
```

---

## 📈 Flujo visual completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    GESTIÓN DE PROYECTOS                         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. CAPTURAR → Inbox/                                            │
│    Artículos, ideas, requerimientos, notas de reuniones         │
└─────────────────────────────────────────────────────────────────┘
                                │
                    claude procesar-entrada.md
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. ESTRUCTURAR → Proyectos/<nombre>/                            │
│    Subcarpetas por área + MOC en MOCs/                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                   claude sincronizar-vault.md
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. DESGLOSAR → Tareas accionables con checkboxes                │
│    Prioridad, estimación, criterios de aceptación               │
└─────────────────────────────────────────────────────────────────┘
                                │
                   claude revision-diaria.md (diario)
                   claude generar-insights.md (semanal)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. SEGUIMIENTO → MOC actualizado + Diario + Insights            │
│    Visibilidad total: progreso, riesgos, decisiones             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Checklist de proyecto completo

- [ ] MOC creado en `MOCs/`
- [ ] Estructura de carpetas en `Proyectos/`
- [ ] Investigación procesada y conectada
- [ ] Tareas técnicas creadas con criterios de aceptación
- [ ] Revisión diaria configurada (automatizar con cron si quieres)
- [ ] Insights semanales generados
- [ ] Hitos y fechas clave en MOC
- [ ] Enlaces a herramientas externas (GitHub, Vercel, Stripe, etc.)

---

## 💡 Variaciones

| Tipo de proyecto            | Carpetas sugeridas                                           | Prompts clave                                              |
| --------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| **Investigación académica** | `papers/`, `experimentos/`, `datos/`, `redaccion/`           | `procesar-entrada`, `generar-insights`                     |
| **Escritura de libro**      | `capitulos/`, `personajes/`, `investigacion/`, `borradores/` | `procesar-entrada`, `revision-diaria`                      |
| **Desarrollo software**     | `backend/`, `frontend/`, `infra/`, `tests/`, `docs/`         | `procesar-entrada`, `sincronizar-vault`, `revision-diaria` |
| **Gestión personal**        | `habitos/`, `metas/`, `finanzas/`, `salud/`                  | `revision-diaria`, `generar-insights`                      |

---

## ➡️ Siguiente paso

Explora [`../templates/proyecto.md`](../templates/proyecto.md) para la plantilla base de proyecto, o ve a [`../docs/05-casos-de-uso.md`](../docs/05-casos-de-uso.md) para más ejemplos.
