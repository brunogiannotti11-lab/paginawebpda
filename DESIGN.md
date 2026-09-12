# DESIGN.md

Identidad visual de Ficha de Plan. Cualquier cambio de UI parte de acá, de Tailwind y de la skill `frontend-design`. No inventar otra paleta ni otro tono.

## Dirección

Showroom de noche: asfalto, chapa y una solicitud de papel sobre el mostrador. No es un dashboard SaaS ni el sitio oficial de Chevrolet.

Una cosa memorable: la ficha de papel (sombra dura, tipografía de contrato). El resto, quieto.

## Color

| Token   | Hex       | Uso                         |
| ------- | --------- | --------------------------- |
| Asfalto | `#16140F` | Fondo de página             |
| Laca    | `#221E16` | Paneles oscuros, foto       |
| Cromo   | `#C9C2B2` | Texto secundario, bordes    |
| Lámpara | `#C48A2A` | Acento, CTA, cuota          |
| Papel   | `#EDE6D6` | Formulario, texto sobre fondo oscuro |
| Tinta   | `#1A1712` | Texto sobre papel           |
| Freno   | `#8B2E1F` | Error                       |

Variables en `app/globals.css`: `--asphalt`, `--lacquer`, `--chrome`, `--lamp`, `--paper`, `--ink`. Radio casi 0 (`2px`).

## Tipo

- Títulos: **Archivo Narrow** (`--font-display` / `font-heading`).
- Cuerpo: **Source Serif 4** (`--font-body`).
- Sentence case. Sin cejas en versales, sin resaltar una sola palabra del titular.

## Layout

- Hero a la izquierda, solicitud de papel a la derecha (en mobile, apilado).
- Catálogo en filas: foto 3/4 + nombre, versión, modalidad, cuota 1. No grilla de cards redondeadas ni sombra suave.
- Admin: misma paleta, más sobrio (tabla, filtros).

## Copy

Español argentino. Verbos concretos. Sin lorem. El sitio es independiente: no copiar el legal de GM ni hacerse pasar por chevrolet.com.ar.

## Cómo implementar

Tailwind + primitives de shadcn si hacen falta. Antes de pintar, leé la skill `frontend-design`. No cambies este branding sin actualizar este archivo.
