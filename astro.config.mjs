import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Путь для билда - Hugo будет копировать результаты в свой public
  outDir: './astro-dist',
  // Базовый URL
  base: '/',
  // Путь для статики (Hugo использует static/, Astro будет использовать тот же)
  publicDir: './static',
});

