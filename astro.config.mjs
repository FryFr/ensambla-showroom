import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Este archivo NO ve el .env por sí solo (Vite lo carga después), así que lo
// leemos a mano para que `site` funcione igual en local y en Vercel.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  // Dominio público, necesario para canonical y og:image (URLs absolutas).
  // Vacío o sin definir → `undefined`, y BaseLayout omite esas etiquetas en vez
  // de inventar un dominio. En Vercel: PUBLIC_SITE_URL=https://tu-dominio.com
  site: PUBLIC_SITE_URL || undefined,
  // El sitio es mayormente estático; solo /api/* necesita runtime serverless.
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
