<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ficha de Plan

Landing de captación de leads para planes de ahorro Chevrolet (Argentina) y un mostrador `/admin` para ver las fichas.

## Reglas del proyecto

1. Revisá el stack del repo (Next.js, TypeScript, Tailwind, npm) **antes** de meter código o una librería nueva.
2. Package manager: **npm**. Preferí librerías conocidas y mantenidas. No yarn, no pnpm.
3. Nunca hardcodear secretos ni credenciales en el repo. Van en variables de entorno (`.env`, no commiteado) o en el servidor. Ejemplo: `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`.
4. Para crear o cambiar pantallas: **Tailwind** + skill `frontend-design` ([`.cursor/skills/frontend-design/SKILL.md`](.cursor/skills/frontend-design/SKILL.md)).
5. Para docs al día de cualquier paquete: skill **Context7** (`npx ctx7@latest`), no memoria de entrenamiento.
6. Ante un cambio de UI, leé [DESIGN.md](DESIGN.md) y respetá ese branding de punta a punta.
7. Unitarias e integración: **Vitest** (`npm test`, `npm run test:unit`, `npm run test:integration`). e2e: **MCP de Playwright** ([`.cursor/mcp.json`](.cursor/mcp.json), flujos en [`tests/e2e/flows.md`](tests/e2e/flows.md)). No uses `@playwright/test`.
8. Nunca des una tarea por terminada sin correr los tests completos: `npm test` y, si tocaste UI o flujos, los e2e del MCP.

```bash
npx ctx7@latest library "Next.js" "tu consulta"
npx ctx7@latest docs /vercel/next.js "tu consulta"
```

Skills instaladas desde [skills.sh](https://www.skills.sh/): `frontend-design` (anthropics/skills), `find-docs` y `context7-cli` (upstash/context7). Copias en `.cursor/skills/` y `.agents/skills/`.

## Stack

- Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, npm
- Leads en SQLite (`better-sqlite3` + Drizzle) en `data/leads.db`
- Auth admin: cookie firmada (`jose`) con credenciales leídas de `.env`
- En Next.js 16+ el archivo de red es `proxy.ts`, no `middleware.ts`
- `cookies()`, `headers()`, `params` y `searchParams` son async

## Convenciones

- El formulario público muta con Server Actions en `app/actions/`.
- Landing `/` estática y liviana: poco JS, inputs nativos, `next/font`.
- `/admin` es dinámico y `noindex`.
- Copy en español argentino. Contenido real, no lorem.
- El catálogo vive en `lib/plans.ts` y sale de Plan Chevrolet (fotos en `public/vehicles/`). No inventar modelos ni pegar el legal de GM.
- Este sitio es independiente: no inventes endpoints, precios oficiales ni identidad de chevrolet.com.ar.
- No agregues auth multi-usuario, CRM ni mails transaccionales salvo que lo pidan.

## Comandos

```bash
npm install
cp .env.example .env
npm run dev
npm test
```

e2e: Cursor Settings → MCP, o el server de [`.cursor/mcp.json`](.cursor/mcp.json) (`npx @playwright/mcp@latest`). Checklist: [`tests/e2e/flows.md`](tests/e2e/flows.md).

Credenciales de admin: las de `.env` (plantilla en `.env.example`).
