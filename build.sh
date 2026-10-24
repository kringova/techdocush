#!/bin/bash

# Гибридный билд: Astro для лендинга и услуг, Hugo для документации

set -e

node --test apps/puzzleush/tests/*.test.mjs
node apps/puzzleush/scripts/build-yandex.mjs
node apps/puzzleush/scripts/sync-to-site.mjs --site-directory .
node --test apps/corio/tests/*.test.mjs
node apps/corio/scripts/sync-to-site.mjs --site-directory .

echo "🚀 Начинаем гибридный билд..."

# 1. Билдим Hugo (документация) - сначала, чтобы Astro мог перезаписать нужные страницы
echo "📚 Билдим Hugo (документация)..."
hugo --gc --minify

# 2. Билдим Astro (лендинг и услуги)
echo "📦 Билдим Astro (лендинг и услуги)..."
npm run build

# 3. Копируем результаты Astro в public Hugo (перезаписывая главную и услуги)
echo "🔀 Объединяем результаты..."
cp -r astro-dist/* public/

# 4. Удаляем временную папку Astro
rm -rf astro-dist

echo "✅ Билд завершён! Результат в папке public/"

