# Flujos e2e (Playwright MCP)

Correr estos pasos con el MCP de Playwright (`npx @playwright/mcp@latest`, config en `.cursor/mcp.json`). El sitio tiene que estar en `http://127.0.0.1:4317`. No uses `@playwright/test`.

Base: `http://127.0.0.1:4317`

## 1. Landing y catálogo

- Abrir `/`
- Ver Onix, Onix Plus, Tracker, Montana y S10
- Ver el formulario (nombre, email, select de plan)

## 2. Enviar ficha

- Nombre: `Sofía Ruiz`
- Email: `sofia.ruiz@example.com`
- Plan: Montana
- Confirmar el mensaje de éxito (ficha enviada)

## 3. Admin: redirect y login

- Abrir `/admin` → tiene que ir a `/admin/login`
- Login mal (usuario `admin`, clave `incorrecta`) → error, no entra
- Login bien (credenciales de `.env`, en local `admin` / `ficha-demo`) → `/admin`

## 4. La ficha aparece

- En la tabla tiene que estar Sofía Ruiz / Montana
- Filtrar por plan Montana y que siga apareciendo
