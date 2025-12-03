# Гибридный сайт: Astro + Hugo

Этот сайт использует гибридный подход:
- **Astro** — лендинг (главная страница) и страница услуг
- **Hugo** — документация (`/docs`, `/samples` и остальное)

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Для локальной разработки запустите оба сервера:

**Astro (лендинг и услуги):**
```bash
npm run dev
# Откроется на http://localhost:4321
```

**Hugo (документация):**
```bash
hugo server
# Откроется на http://localhost:1313
```

## Структура проекта

```
├── src/
│   ├── components/     # Astro компоненты
│   ├── layouts/        # Базовые layout'ы
│   └── pages/          # Страницы Astro (index.astro, services.astro)
├── content/            # Контент Hugo (документация)
├── layouts/            # Шаблоны Hugo
├── static/             # Статика (общая для Hugo и Astro)
└── build.sh            # Скрипт гибридного билда
```

## Билд для продакшена

Запустите скрипт билда:
```bash
./build.sh
```

Скрипт:
1. Билдит Hugo (документация)
2. Билдит Astro (лендинг и услуги)
3. Объединяет результаты в `public/`

## Деплой

Netlify автоматически запустит `build.sh` при деплое. Убедитесь, что в настройках Netlify указаны:
- Build command: `chmod +x build.sh && ./build.sh`
- Publish directory: `public`

## Добавление новых страниц

- **Лендинг/Услуги**: создайте `.astro` файл в `src/pages/`
- **Документация**: создайте `.md` файл в `content/docs/` или `content/samples/`

