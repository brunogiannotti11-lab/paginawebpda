# Ficha de Plan

Sitio para captar leads de **planes de ahorro Chevrolet** en Argentina. Una landing rápida (pensada para Core Web Vitals y SEO) y un mostrador interno para ver las fichas que llegan por el formulario.

No es el sitio oficial de Chevrolet ni de un concesionario GM. Es un captador independiente: el visitante deja nombre, email y el modelo que le interesa.

## Qué incluye

- Landing estática con el catálogo vigente de Plan Chevrolet: Onix, Onix Plus, Tracker, Montana y S10 (fotos y cuota 1 referencial al 1/9/2026)
- Formulario: nombre completo, email y select de plan
- Panel `/admin` con login (usuario y contraseña en variables de entorno)
- Tabla de leads con búsqueda y filtro por plan
- Persistencia en libSQL: archivo local en desarrollo, [Turso](https://turso.tech) en producción (Vercel)

## Requisitos

- Node.js 20.9+
- npm

## Cómo correrlo

```bash
npm install
cp .env.example .env
npm run dev
```

La app queda en [http://127.0.0.1:4317](http://127.0.0.1:4317).

En local, `TURSO_DATABASE_URL=file:./data/leads.db` alcanza (sin token).

## Tests

```bash
npm test
npm run test:unit
npm run test:integration
```

Unitarias e integración van con Vitest. El e2e se corre con el [MCP de Playwright](https://github.com/microsoft/playwright-mcp) (config en `.cursor/mcp.json`, flujos en `tests/e2e/flows.md`) con el `npm run dev` levantado.

### Variables de entorno

| Variable | Para qué |
| --- | --- |
| `ADMIN_USER` | Usuario del mostrador |
| `ADMIN_PASSWORD` | Contraseña del mostrador |
| `SESSION_SECRET` | Secreto para firmar la cookie (16+ caracteres) |
| `TURSO_DATABASE_URL` | URL libSQL (`file:./data/leads.db` en local, `libsql://…` en Turso) |
| `TURSO_AUTH_TOKEN` | Token de Turso (vacío en local con `file:`) |
| `NEXT_PUBLIC_SITE_URL` | URL canónica para SEO (Open Graph, sitemap) |

Copiá [`.env.example`](.env.example) a `.env` y cambiá usuario, contraseña y `SESSION_SECRET`. El `.env` no se sube a git.

### Panel admin

1. Abrí `/admin/login`
2. Entrá con las credenciales de `.env`
3. Vas a ver las fichas (o un vacío si todavía no llegó ninguna)

## Deploy en Vercel

La app no puede usar SQLite en disco en Vercel (filesystem efímero). Usá Turso + este repo.

1. Creá una base en [Turso](https://turso.tech) y copiá `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`.
2. En [Vercel](https://vercel.com) → **Add New Project** → importá este repo de GitHub (Next.js se detecta solo).
3. En **Settings → Environment Variables** (Production + Preview), cargá:
   - `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`
   - `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` = la URL del deploy (ej. `https://tu-proyecto.vercel.app`)
4. Deploy. Cada push a `main` vuelve a desplegar.

La tabla `leads` se crea sola al primer request. Después del primer deploy, si hace falta, actualizá `NEXT_PUBLIC_SITE_URL` con la URL definitiva y redeployá.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Drizzle ORM, `@libsql/client` (Turso), Zod.

Para agentes: leé [AGENTS.md](AGENTS.md) y [DESIGN.md](DESIGN.md). Las skills `frontend-design` y Context7 viven en `.cursor/skills/`.
