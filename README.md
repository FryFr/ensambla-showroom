# Ensambla · Showroom

Sitio **showroom** del estudio **Ensambla** (desarrollo web + automatización con IA).
No es un portafolio de casos reales: es un **menú de mini-demos interactivas**. El visitante
prueba cada demo y pulsa **"Quiero una así →"** para contactar.

> **Regla de oro:** cada demo es una **fachada de front-end** con datos falsos sembrados —
> totalmente clickable, pero **sin login, base de datos, pagos ni persistencia**.
> **Única excepción:** el chatbot hace una llamada real a un LLM vía una función serverless mínima.

---

## Stack

- **Astro 5** + **Tailwind CSS v4** + **TypeScript** (shell del sitio, SSG, casi cero JS).
- **Islands de React 19** para las demos interactivas.
- **@dnd-kit** para el drag & drop del CRM.
- Deploy target: **Vercel** (`@astrojs/vercel`). El chatbot es una función serverless en `/api/chat`.
- Fuentes self-hosted (`@fontsource`): Space Grotesk, Inter, JetBrains Mono.

---

## Arrancar en local

```bash
npm install
cp env.example .env      # y completá las variables (ver abajo)
npm run dev              # http://localhost:4321
```

> El archivo de ejemplo se llama `env.example` (no `.env.example`). Copialo a `.env`.

Scripts:

| Comando           | Qué hace                          |
| ----------------- | --------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR    |
| `npm run build`   | Build de producción (`dist/`)     |
| `npm run preview` | Previsualiza el build local       |
| `npm run astro`   | CLI de Astro (`astro check`, etc.)|

---

## Variables de entorno

Definidas en `env.example`:

| Variable                 | Requerida    | Descripción                                                        |
| ------------------------ | ------------ | ------------------------------------------------------------------ |
| `GROQ_API_KEY`           | Sí (chatbot) | API key de [Groq](https://console.groq.com/keys). Gratis.          |
| `GROQ_MODEL`             | No           | Modelo de Groq. Default: `llama-3.3-70b-versatile`.                |
| `PUBLIC_WHATSAPP_NUMBER` | Recomendada  | WhatsApp para el CTA de `/contacto` (formato internacional).       |

> **Sin `GROQ_API_KEY` el sitio igual funciona:** solo el chatbot responde con un mensaje
> avisando que falta la key. Todo lo demás no tiene backend.

El proveedor de IA está aislado en [`src/lib/llm.ts`](src/lib/llm.ts). Para cambiar a OpenAI /
Anthropic, solo se toca ese archivo (usa un endpoint OpenAI-compatible).

---

## Desplegar en Vercel

1. Subí el repo a GitHub e importalo en [Vercel](https://vercel.com/new). Detecta Astro solo.
2. En **Settings → Environment Variables** cargá `GROQ_API_KEY` (y `PUBLIC_WHATSAPP_NUMBER`).
3. Deploy. El endpoint `/api/chat` corre como función serverless; el resto es estático.

No hace falta configurar nada más: el adapter `@astrojs/vercel` ya está en `astro.config.mjs`.

---

## Estructura

```
src/
  data/
    demos.ts            ← REGISTRO de demos (única fuente de verdad)
    kb/cafe-latitud.json← base de conocimiento del chatbot (negocio ficticio)
  layouts/BaseLayout.astro
  components/
    site/               ← Hero, Pillars, BentoMenu, Header, Footer, ContactForm…
    brand/Wordmark.astro
    demos/
      registry.ts       ← mapa slug → componente React
      DemoHost.tsx      ← monta la demo según el slug
      BrowserFrame.tsx  ← marco tipo navegador (demos web)
      ChatbotDemo.tsx  LandingDemo.tsx  TiendaDemo.tsx
      InformativoDemo.tsx  PedidosDemo.tsx  CrmDemo.tsx
  pages/
    index.astro         ← Home (menú bento desde el registro)
    contacto.astro      ← WhatsApp + formulario de fachada
    demos/[slug].astro  ← cada demo a pantalla completa (getStaticPaths)
    api/chat.ts         ← serverless: KB + pregunta → Groq
    api/contact.ts      ← stub del formulario (responde 200)
  lib/llm.ts            ← wrapper del proveedor de LLM
  styles/global.css     ← tokens (@theme) + utilidades + animaciones
```

---

## ➕ Cómo agregar una demo nueva

El sitio se genera desde el registro, así que sumar una demo son **3 pasos**:

1. Creá el componente en `src/components/demos/MiDemo.tsx`.
2. Registralo en `src/components/demos/registry.ts`:
   ```ts
   import MiDemo from './MiDemo';
   export const demoComponents = { /* … */ midemo: MiDemo };
   ```
3. Agregá su entrada en `src/data/demos.ts` (con `slug: 'midemo'`).

Listo: aparece sola en la Home (menú bento) y en `/demos/midemo`, con su CTA a
`/contacto?tipo=midemo`. No se toca nada más.

---

## Las 6 demos (v1)

**Web**
- `landing` — Landing de venta de una marca ficticia ("Órbita"), con form de éxito.
- `tienda` — E-commerce ("Raíz"): catálogo, filtros, carrito con drawer y checkout falso.
- `informativo` — Sitio multipágina ("Núcleo") con navegación en memoria.

**Automatización con IA**
- `chatbot` ⭐ — Widget que responde con IA sobre una base de conocimiento ("Café Latitud").
  **Única demo con backend.**
- `pedidos` — Bot estilo WhatsApp ("La Birra Burger"): arma el pedido y muestra el tracking.
- `crm` — Pipeline Kanban con leads arrastrables, panel de detalle y toast de nuevo lead.

---

## Rendimiento y accesibilidad

- **Home 100% estática** (sin islands): pensada para Lighthouse 95+.
- Fuentes self-hosted → sin requests a terceros.
- Todas las animaciones respetan `prefers-reduced-motion`.
- Skip-link, foco visible, `aria-*` y HTML semántico.

> Para medir Lighthouse: `npm run build && npm run preview` y corré Lighthouse sobre
> `http://localhost:4321/` en modo producción.

---

*Datos, marcas y nombres de las demos son ficticios, a modo de ejemplo.*
