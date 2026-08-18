<div align="center">

# 🧩 Ensambla · Showroom

**Software y automatizaciones que hacen que tu negocio funcione solo.**

Un *showroom* interactivo: en vez de contar casos, deja que el visitante **use** mini-demos reales
de lo que construimos y pulse **“Quiero una así →”** para contactar.

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ✨ Qué es

Ensambla vende **desarrollo web** y **automatización con IA**. La automatización es difícil de
*mostrar* porque es abstracta, así que este sitio la vuelve **tangible**: un menú tipo *bento* con
demos que se tocan, se prueban y se sienten reales.

> [!IMPORTANT]
> **La regla que mantiene todo simple.** Cada demo es una **fachada de front-end** con datos de
> ejemplo: totalmente interactiva, pero **sin login, base de datos, pagos ni persistencia**.
> **Única excepción:** el chatbot hace una llamada real a un LLM mediante una función serverless
> mínima. Si una demo empezara a necesitar backend, se recorta a fachada.

---

## 🎯 Las 12 demos

Todas viven en un **registro** ([`src/data/demos.ts`](src/data/demos.ts)) que es la única fuente de
verdad: la home y cada `/demos/[slug]` se generan desde ahí.

### 🌐 Desarrollo web

| Demo | Qué muestra |
| ---- | ----------- |
| **Landing de venta** | Landing completa de marca ficticia con formulario de éxito. |
| **Tienda online** | E-commerce: catálogo, filtros, carrito con *drawer* y checkout simulado. |
| **Sitio informativo** | Micrositio multipágina con navegación en memoria. |
| **Catálogo por WhatsApp** | El pedido se arma y se envía como mensaje de WhatsApp, sin comisiones. |
| **Panel de control** | Dashboard de operaciones con métricas y ventas en vivo. |
| **Micrositio de curso** | Landing de curso con módulos que se desbloquean al inscribirse. |

### 🤖 Automatización con IA

| Demo | Qué muestra |
| ---- | ----------- |
| **Chatbot con IA** ⭐ | Responde con IA sobre una base de conocimiento. **Única demo con backend real.** |
| **Bot de pedidos** | Chat estilo WhatsApp que arma el pedido y muestra el seguimiento del envío. |
| **CRM anti-leads-perdidos** | Pipeline *kanban* con leads arrastrables, ficha y alertas. |
| **Flujo de automatización** | Grafo que se ejecuta paso a paso: lead → responde → CRM → avisa → agenda. |
| **Turnos con recordatorios** | Reserva de turnos + recordatorios automáticos anti-ausentismo. |
| **Cotizador instantáneo** | Presupuesto que se recalcula en vivo y se envía por WhatsApp. |

> Todas las marcas, datos y precios de las demos son **ficticios**, a modo de ejemplo.

---

## 🛠️ Stack

- **[Astro 5](https://astro.build)** — shell del sitio en SSG, casi cero JavaScript.
- **[Tailwind CSS v4](https://tailwindcss.com)** — sistema de diseño con *design tokens* en `@theme`.
- **[React 19](https://react.dev)** — *islands* interactivas para cada demo (`client:load`).
- **[TypeScript](https://www.typescriptlang.org)** — tipado estricto en todo el proyecto.
- **[@dnd-kit](https://dndkit.com)** — *drag & drop* accesible del CRM.
- **[Groq](https://groq.com)** — LLM del chatbot, detrás de un *wrapper* intercambiable.
- Fuentes self-hosted con `@fontsource` (Space Grotesk · Inter · JetBrains Mono) — sin llamadas a terceros.

---

## 🚀 Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp env.example .env      # y completá los valores (ver abajo)

# 3. Levantar el entorno de desarrollo
npm run dev              # → http://localhost:4321
```

> El archivo de ejemplo se llama `env.example` (sin punto). Copialo a `.env`.

### Scripts

| Comando | Descripción |
| ------- | ----------- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción (`dist/`) |
| `npm run preview` | Previsualiza el build de producción |
| `npm run astro -- check` | Chequeo de tipos del proyecto |

---

## 🔑 Variables de entorno

Definidas en [`env.example`](env.example):

| Variable | Requerida | Descripción |
| -------- | :-------: | ----------- |
| `GROQ_API_KEY` | Sí *(chatbot)* | API key de [Groq](https://console.groq.com/keys). Gratis. |
| `GROQ_MODEL` | No | Modelo de Groq. Default: `openai/gpt-oss-120b`. |
| `PUBLIC_WHATSAPP_NUMBER` | Recomendada | Número de WhatsApp para los CTA (formato internacional, solo dígitos). |

> [!NOTE]
> **Sin `GROQ_API_KEY` el sitio igual funciona.** Solo el chatbot responde con un aviso de que falta
> la key; el resto del sitio no tiene backend. El proveedor de IA está aislado en
> [`src/lib/llm.ts`](src/lib/llm.ts): cambiar a OpenAI o Anthropic es tocar un solo archivo.

---

## ☁️ Despliegue (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FryFr/ensambla-showroom&env=GROQ_API_KEY,PUBLIC_WHATSAPP_NUMBER)

1. Importá el repositorio en [Vercel](https://vercel.com/new) — detecta Astro automáticamente.
2. Cargá las variables de entorno (`GROQ_API_KEY` y `PUBLIC_WHATSAPP_NUMBER`).
3. **Deploy.** El endpoint `/api/chat` corre como función serverless; el resto es estático.

Cada `git push` a `main` vuelve a desplegar automáticamente.

> **¿Por qué Vercel y no GitHub Pages?** El chatbot (`/api/chat`) y la página de contacto necesitan
> renderizado en servidor. GitHub Pages sirve solo estáticos, así que el chatbot no respondería.

---

## 🧱 Arquitectura

```
src/
├─ data/
│  ├─ demos.ts            # ← REGISTRO de demos (única fuente de verdad)
│  └─ kb/                 # base de conocimiento del chatbot (negocio ficticio)
├─ layouts/
│  └─ BaseLayout.astro    # fondo blueprint, fuentes, meta, skip-link
├─ components/
│  ├─ site/               # Hero, Pillars, BentoMenu, Header, Footer…
│  ├─ brand/Wordmark.astro
│  └─ demos/
│     ├─ registry.ts      # mapa slug → componente React
│     ├─ DemoHost.tsx     # monta la demo según el slug
│     ├─ BrowserFrame.tsx # marco tipo navegador (demos web)
│     └─ *Demo.tsx        # una demo por archivo
├─ pages/
│  ├─ index.astro         # home (menú bento desde el registro)
│  ├─ contacto.astro      # CTA de WhatsApp (lee ?tipo=)
│  ├─ demos/[slug].astro  # cada demo a pantalla completa (getStaticPaths)
│  └─ api/chat.ts         # serverless: base de conocimiento + pregunta → Groq
├─ lib/llm.ts             # wrapper del proveedor de LLM
└─ styles/global.css      # design tokens (@theme) + utilidades + animaciones
```

---

## ➕ Agregar una demo nueva

Gracias al registro, sumar una demo son **3 pasos** y no se toca nada más:

1. **Componente** — creá `src/components/demos/MiDemo.tsx`.
2. **Registro** — mapeá el slug en `src/components/demos/registry.ts`:
   ```ts
   import MiDemo from './MiDemo';
   export const demoComponents = { /* … */ midemo: MiDemo };
   ```
3. **Metadata** — agregá su entrada en `src/data/demos.ts` (con `slug: 'midemo'`).

Aparece sola en la home y en `/demos/midemo`, con su CTA hacia `/contacto?tipo=midemo`.

---

## 📊 Rendimiento y accesibilidad

- **Home 100% estática** (sin *islands*): pensada para Lighthouse 95+.
- Demos con `client:load` → **renderizan en el servidor** y se ven aunque el JavaScript falle.
- Fuentes self-hosted → cero requests a terceros.
- Todas las animaciones respetan `prefers-reduced-motion`.
- Skip-link, foco visible, `aria-*` y HTML semántico. Copy en español neutro.

Para medir Lighthouse en condiciones reales: `npm run build && npm run preview`.

---

<div align="center">

Hecho con 🧩 por **Ensambla** · © 2026 · Todos los derechos reservados.

</div>
