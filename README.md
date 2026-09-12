# Ficha de Plan

Sitio para captar leads de **planes de ahorro Chevrolet** en Argentina. Una landing rápida (pensada para Core Web Vitals y SEO) y un mostrador interno para ver las fichas que llegan por el formulario.

No es el sitio oficial de Chevrolet ni de un concesionario GM. Es un captador independiente: el visitante deja nombre, email y el modelo que le interesa.

## Qué incluye

- Landing estática con el catálogo vigente de Plan Chevrolet: Onix, Onix Plus, Tracker, Montana y S10 (fotos y cuota 1 referencial al 1/9/2026)
- Formulario: nombre completo, email y select de plan
- Panel `/admin` con login (usuario y contraseña en variables de entorno)
- Tabla de leads con búsqueda y filtro por plan
- Persistencia local en SQLite (`data/leads.db`)

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

### Variables de entorno

| Variable | Para qué |
| --- | --- |
| `ADMIN_USER` | Usuario del mostrador |
| `ADMIN_PASSWORD` | Contraseña del mostrador |
| `SESSION_SECRET` | Secreto para firmar la cookie (16+ caracteres) |
| `DATABASE_PATH` | Ruta del SQLite (por defecto `./data/leads.db`) |
| `NEXT_PUBLIC_SITE_URL` | URL canónica para SEO (Open Graph, sitemap) |

Valores de ejemplo en [`.env.example`](.env.example): usuario `admin`, contraseña `ficha-demo`.

### Panel admin

1. Abrí `/admin/login`
2. Entrá con las credenciales de `.env`
3. Vas a ver las fichas (o un vacío si todavía no llegó ninguna)

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Drizzle ORM, better-sqlite3, Zod.

Para agentes: leé [AGENTS.md](AGENTS.md) y [DESIGN.md](DESIGN.md). Las skills `frontend-design` y Context7 viven en `.cursor/skills/`.
