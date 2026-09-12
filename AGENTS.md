<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ficha de Plan

Landing de captación de leads para planes de ahorro Chevrolet (Argentina) y un mostrador `/admin` para ver las fichas.

## Skills (obligatorias)

Antes de tocar UI, leé y seguí [`.cursor/skills/frontend-design/SKILL.md`](.cursor/skills/frontend-design/SKILL.md) (copia en [`.agents/skills/frontend-design/SKILL.md`](.agents/skills/frontend-design/SKILL.md)). Dirección visual: showroom de noche, asfalto + papel de solicitud, no dashboard SaaS.

Antes de usar APIs de librerías (Next.js, Drizzle, Tailwind, Zod, shadcn), consultá Context7. No te bases solo en memoria de entrenamiento.

```bash
npx ctx7@latest library "Next.js" "tu consulta"
npx ctx7@latest docs /vercel/next.js "tu consulta"
```

Skills instaladas desde [skills.sh](https://www.skills.sh/): `frontend-design` (anthropics/skills), `find-docs` y `context7-cli` (upstash/context7).

## Stack

- Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, npm
- Leads en SQLite (`better-sqlite3` + Drizzle) en `data/leads.db`
- Auth admin: `ADMIN_USER` + `ADMIN_PASSWORD` + cookie firmada (`jose`)
- En Next.js 16+ el archivo de red es `proxy.ts`, no `middleware.ts`
- `cookies()`, `headers()`, `params` y `searchParams` son async

## Convenciones

- Package manager: npm. No yarn, no pnpm.
- El formulario público muta con Server Actions en `app/actions/`.
- Landing `/` estática y liviana: poco JS, inputs nativos, `next/font`.
- `/admin` es dinámico y `noindex`.
- Copy en español argentino. Contenido real, no lorem.
- Este sitio es independiente: no inventes endpoints, precios oficiales ni identidad de chevrolet.com.ar.
- No agregues auth multi-usuario, CRM ni mails transaccionales salvo que lo pidan.

## Comandos

```bash
npm install
cp .env.example .env
npm run dev
```

Admin local: usuario `admin`, contraseña `ficha-demo` (la de `.env.example`).
