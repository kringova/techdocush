> ⚠️ черновик — проверь (собран онбордингом Огорода 2026-09-07 из package.json, DEPLOY.md, структуры репо; не подтверждён владелицей)

# AGENTS.md — techdocush

Контракт проекта для любого агента (Claude Code, Codex, Cursor и др.). Источник правды по командам, структуре и конвенциям — этот файл, не догадки.

## Что это

Сайт-визитка консалтинга по технической документации, ringova.com. Лендинг, услуги, выступления, книга/мини-курс, резюме. Аудитория и контекст — `docs/architecture.md` и vault-проект `techdocush` (`brief.md`, `decisions.md`).

## Стек

- **Astro 4** — лендинг, услуги, книга, отзывы, privacy (`src/pages/*.astro`). Статическая сборка (`output: 'static'`), билд в `astro-dist/`.
- **Hugo (extended) + модуль Hextra** (форк `github.com/kringova/hextra`) — `/docs` (мини-курс) и `/samples`. Контент в `content/`, кастомные layout-оверрайды в `layouts/`.
- Node 20, Go 1.22 (CI), Hugo 0.132.2.

## Структура каталогов

| Путь | Что |
|---|---|
| `src/pages/*.astro` | Astro-страницы: `index`, `services`, `book`, `frombook`, `activities`, `privacy` |
| `src/components/*.astro` | Переиспользуемые Astro-компоненты (Header, Footer, FAQ, ServiceCard, CookieConsent, LandingHero) |
| `src/layouts/BaseLayout.astro` | Общий layout Astro-страниц |
| `content/docs/`, `content/samples/` | Hugo-контент мини-курса и образцов документации |
| `layouts/` | Hugo layout-оверрайды поверх темы Hextra (`services.html`, `landing.html`, `partials/footer.html`) |
| `static/` | Статика, общая для Hugo и Astro (см. `astro.config.mjs` → `publicDir`) |
| `public/` | Итоговый билд Hugo, куда `build.sh` докладывает `astro-dist/*` (в `.gitignore`) |
| `astro-dist/` | Промежуточный билд Astro, удаляется в конце `build.sh` |
| `docs/` | Внутренняя документация проекта (этот канон) |

## Команды

Из `package.json`:

```bash
npm run dev       # astro dev — локальный сервер Astro-страниц, localhost:4321
npm run build     # astro build — билд только Astro (в astro-dist/)
npm run preview   # astro preview
```

Hugo (не в package.json, отдельно):

```bash
hugo server       # локальный сервер Hugo-контента, localhost:1313
hugo --gc --minify  # билд Hugo в public/
```

Полный прод-билд (гибридный, воспроизводит CI):

```bash
./build.sh   # hugo build → astro build → копирует astro-dist/* поверх public/
```

Тестов нет: `package.json` не содержит `test`-скрипта. Проверка изменений — локальный `npm run dev`/`hugo server` и визуальный просмотр; перед релизом — `./build.sh` должен пройти без ошибок.

## Деплой

Подробности и открытый вопрос (Netlify vs GitHub Pages) — `docs/architecture.md` → «Запуск и деплой» и vault `decisions.md`. Кратко: пуш в `main` → GitHub Actions (`.github/workflows/pages.yaml`) → GitHub Pages, домен `ringova.com` (файл `CNAME`).

## Конвенции

- Правки лендинга/услуг/книги/privacy — в `src/pages/*.astro`, не в `content/`.
- Правки мини-курса — в `content/docs/*.md` (Hugo), не создавать `.astro`-дубликаты.
- Стиль текста — без ИИ-тире и нейро-слопа (см. задачу `fix-ai-dashes` в vault, `#511`): не механическая замена «—», а перестройка фразы; тире оставлять только там, где оправдано (определения, диалоги, юридические формулы).
- `static/` — общий каталог статики для обеих сборок; не дублировать ассеты в `public/src`.

## Чего не делать

- Не редактировать `public/` и `astro-dist/` напрямую — это билд-артефакты (в `.gitignore`), теряются при следующей сборке.
- Не менять `astro.config.mjs` `outDir`/`publicDir` без синхронной правки `build.sh` — гибридная склейка на них завязана.
- Не переносить документацию `/docs` в Astro без решения владелицы — сознательное разделение стеков (см. `decisions.md`, 2025-12-03).
- Не коммитить секреты (`.env*` — уже в `.gitignore`).
- Root `README.md` — не редактировался под проект, остался от шаблона `imfing/hextra-starter-template`; актуальная точка входа для разработки — этот файл и `ASTRO_README.md`.
