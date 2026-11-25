import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Путь для билда - Hugo будет копировать результаты в свой public
  outDir: './astro-dist',
  // Базовый URL
  base: '/',
  // Книга продаётся в магазине bukvalno.pro; старый адрес /book (в т. ч. из печатной книги) ведёт туда.
  redirects: {
    '/book': 'https://bukvalno.pro/store',
  },
  // Путь для статики (Hugo использует static/, Astro будет использовать тот же)
  publicDir: './static',
});

