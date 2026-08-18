# Plan del showroom — menú de mini-demos interactivas

> Sitio tipo **showroom**: un menú donde el cliente ve mini-demos clickables de lo que
> construimos y elige *"quiero una de esas"*. No es un portafolio de casos reales.
> Estratega: tu Claude Project de marca personal · v2 (pivote a showroom) · 2026-08-01.
>
> **Decisiones cerradas contigo:**
> - Formato = **showroom / menú de demos** (NO casos reales → cero tema de confidencialidad).
> - Demos = **todo interactivo / clickable** (incluidas las automatizaciones).
> - Alcance v1 = **pocas y buenas** (3 web + 3 automatización, las más vendibles).
> - Marca = **estudio, nombre "Ensambla"** · **Sin precios** en el sitio · Stack = **Astro/Vercel**.
> - Entrega de esta vuelta = **este plan + un prompt para Claude Code** para construirlo.

---

## 1. El concepto en una frase

Una página muy visual con dos vitrinas —**Web** y **Automatización con IA**— donde cada ítem del menú abre una **mini-demo que se puede clickear y usar**. El cliente juega con la demo, entiende al instante qué es, y pulsa **"quiero una así"** → contacto. El showroom no cuenta lo que hiciste; **muestra lo que puedes hacer.**

## 2. La regla que mantiene esto simple (léela dos veces)

Elegiste "todo interactivo", y eso es lo que impresiona. Pero interactivo **no** significa app de verdad, o el proyecto se te vuelve inmanejable. La regla:

> **Cada demo es un prototipo de *fachada*: front-end con datos falsos sembrados.** Se ve y se siente real —clickeas, filtras, armas el pedido, mueves el lead— pero por debajo **no hay login, ni base de datos, ni pagos, ni persistencia.** Eso es lo que lo mantiene simple y sin mantenimiento.

**Única excepción que vale la pena:** el **chatbot con IA** sí hace una llamada real a un LLM sobre una base de conocimiento ficticia, porque el "wow" de que te responda de verdad vende solo y cuesta poco. Todo lo demás es fachada.

Si una demo empieza a volverse un proyecto de verdad (backend, cuentas, datos reales), la cortas a **video/GIF** y listo. La fachada es la norma; nada de sobre-construir.

## 3. Las 6 demos de la v1 (mi recomendación)

Escogí las **más vendibles** para un cliente pyme LATAM, no las más vistosas porque sí. Cada una abre en su propia pantalla, se usa, y cierra con "quiero una así".

### Vitrina Web

| Demo | Qué muestra / cómo se interactúa | Esfuerzo |
|---|---|---|
| **Landing / página de venta** | Una landing real de una marca ficticia: scroll, beneficios, testimonios, y un form que "envía" con animación de éxito. El 80% de los clientes pide esto. | Bajo |
| **Tienda / e-commerce** | Mini-tienda: grilla de productos, filtro por categoría, página de producto, agregar al carrito, drawer del carrito, checkout de mentira. Se siente 100% real. | Medio |
| **Sitio informativo / corporativo** | Mini-sitio multipágina de un negocio ficticio (inicio, servicios, nosotros, contacto), navegable. El pan de cada día de las pymes. | Bajo-medio |

### Vitrina Automatización con IA

| Demo | Qué muestra / cómo se interactúa | Esfuerzo |
|---|---|---|
| **Chatbot con IA** ⭐ | Widget de chat que **de verdad** responde sobre una base ficticia (mini-RAG). Es la demo estrella: el cliente escribe y le contesta. | Medio (única con backend mínimo) |
| **Bot de pedidos / domicilios** | Chat estilo WhatsApp: eliges productos, armas el pedido, "confirmado", y ves un mini-tracking del domicilio. Guionizado, sin backend. | Medio |
| **CRM / no pierdas leads** | Mini-tablero: pipeline con tarjetas de leads que arrastras entre etapas, detalle de un lead, y una notificación de "nuevo lead". Datos falsos locales. | Medio |

**La palanca que te dejo:** cambié tus *marketplace* y *foros* por demos de **mayor demanda** (landing, e-commerce, informativo). Marketplace y foro se ven más "wow" pero se piden menos y cuestan más de montar → los dejo para la ampliación. Si prefieres una de esas en el menú inicial por vistosidad, cambiamos "informativo" por "marketplace". Igual en automatización: dejé fuera **ERP/operaciones** de la v1 porque es lo más difícil de demostrar clickable y lo menos "lo quiero a primera vista".

## 4. Estructura del sitio (mínima)

```
/  (Home)  → hero + las 2 vitrinas + el menú de las 6 demos (bento) + CTA
/demos/[slug]  → cada demo a pantalla completa + botón "quiero una así"
/contacto  → form simple (WhatsApp + agenda)
```

Nada más. Sin blog, sin casos, sin "sobre nosotros" pesado en v1 (una línea de "detrás de esto está Ensambla" basta). **Wireframe del Home:** titular de una frase → dos bloques enormes (Web / Automatización) → mosaico *bento* con las 6 demos, cada una con un preview vivo → franja de "cómo trabajamos" en 3 pasos → CTA final. El mosaico bento es el corazón visual.

## 5. Dirección visual (la que ya te gustó, resumida)

Oscuro, técnico, premium y **en movimiento** — la estética refuerza "cosas que funcionan solas". Base casi-negra, un acento eléctrico (lima/cian) para lo "encendido", y un color señal (ámbar) solo para los CTA. Titulares en una grotesk fuerte (Space Grotesk / Satoshi), mono para lo técnico (JetBrains Mono). Layout **bento-grid** para el menú de demos. Fondo *blueprint* sutil. Todo con `prefers-reduced-motion` respetado. Como le vendes web a la gente, el sitio **debe** cargar rapidísimo (Lighthouse 95+): un vendedor de web con sitio lento pierde solo.

## 6. Cómo se construye (stack, a mi recomendación)

- **Astro + Tailwind** para el shell del sitio (rapidísimo, casi cero JS, ideal para algo muy visual).
- **Islands de React** para cada demo interactiva (la tienda, el CRM, los chats). Cada demo es un componente autocontenido con su estado local y sus datos falsos.
- **El chatbot**: una función serverless mínima (en Vercel) que llama a un LLM sobre un JSON de conocimiento ficticio. Es lo único con "backend", y es diminuto.
- **Hosting: Vercel** (gratis, deploy en minutos, dominio propio, cero mantenimiento). Perfecto para tu restricción de 30 h/semana.
- **Form de contacto**: simple. Si quieres el toque de dogfooding, lo enganchas a un workflow de n8n que te avisa por WhatsApp — pero no es obligatorio para lanzar, no te compliques en la v1.

Todo en un solo repo. Costo para arrancar: **dominio ~$12/año y $0 de hosting.**

## 7. Conversión: el "quiero una así"

- **CTA por demo:** cada demo termina con **"Quiero una así →"** que lleva a contacto ya sabiendo qué tipo pidió (ej. `/contacto?tipo=ecommerce`).
- **Contacto:** ofrece **WhatsApp** (convierte durísimo en LATAM) **y** agenda (Cal.com). Los dos.
- **Sin precios en el sitio** (tu decisión): cada demo apunta a **abrir la conversación**, no a filtrar por precio. El "cuánto" se habla en el WhatsApp o la llamada, ya con contexto.

## 8. Que no se te olvide: el sitio solo no vende

Un showroom perfecto con 5 seguidores no vende nada — el cuello de botella es la **distribución** (te lo dijo el consejo). Este sitio es **el destino de tu contenido**: cada video/post cierra con "¿lo quieres para tu negocio? → [link]", y cuando alguien te pregunta "¿qué haces?", mandas el link y te ves como estudio, no como freelancer suelto. El SEO madura después; la palanca real hoy eres tú mandando el link.

## 9. Roadmap y el pushback que me pediste

| Fase | Qué | Estimado |
|---|---|---|
| **v1 — Showroom** | Shell (home + menú + contacto + estilo) + las 6 demos | ~3–4 fines de semana |
| **v2 — Ampliar** | Marketplace, foros, ERP/"reemplazar planilla", más webs; precios finos; n8n en el form | Según demanda |

Desglose de la v1: el shell ~1 fin de semana; cada demo entre medio día y día y medio. Lanza apenas tengas el shell + 3–4 demos; las otras las agregas en vivo.

**El pushback (directo, como te gusta):** el riesgo #1 sigue siendo que te enamores de pulir demos y **no salgas a mandar el link.** El showroom te respalda; no consigue clientes por ti. Y el riesgo #2 lo trajo tu propia elección de "todo interactivo": si dejas que cada demo crezca a app real, **chau simple.** Mantén cada una chiquita y de fachada; si una se está volviendo un proyecto, córtala a video sin culpa.

## 10. Marca / nombre

**Nombre elegido: Ensambla.** Estudio *founder-led* — tu cara y tu historia respaldan, "Ensambla" al frente. Encaja perfecto: *ensamblar* sistemas (web + automatización + hardware) es literalmente lo que haces, es un verbo (acción, construir) y se presta a una identidad limpia — piezas que se ensamblan, un logo de bloques/nodos que encajan. Va solo, sin "Studio" detrás, salvo que lo quieras.

## 11. Decisiones cerradas y siguiente paso

Todo definido: **6 demos** confirmadas · nombre **Ensambla** · **sin precios** en el sitio · stack **Astro + Vercel**.

El build lo ejecutas tú en **Claude Code** con el prompt que te dejo aparte (`prompt-claude-code-ensambla.md`). Ese prompt le entrega a Claude Code el spec completo —estructura, sistema visual, las 6 demos de fachada y el chatbot con IA— y le pide construir **por fases** (scaffold → home → contacto → demo por demo) para que vayas revisando. Lo puedes lanzar tal cual, o cortarlo por partes si prefieres ir una demo a la vez.

---

*Documento vivo, guardado en tu Project como `claude/plan-sitio-portafolio-estudio.md` (reemplaza la versión anterior, más pesada).*
