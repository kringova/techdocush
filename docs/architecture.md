> ⚠️ черновик — проверь (собран онбордингом Огорода 2026-09-07 из кода, CI-конфига и git-истории; не подтверждён владелицей)

<!-- Audience: разработчик/агент, продолжающий проект
     Purpose: понять, как части сайта связаны и почему так, не реверс-инжиня заново -->

# Архитектура techdocush

## Компоненты

| Компонент | Где живёт | Роль |
|---|---|---|
| Astro-страницы | `src/pages/*.astro` | Лендинг (`/`), услуги (`/services`), книга (`/book`, `/frombook`), публичные активности (`/activities`), privacy |
| Hugo-контент + тема Hextra | `content/docs/`, `content/samples/`, форк `github.com/kringova/hextra` (`go.mod`) | Мини-курс по документации (`/docs`), образцы документации (`/samples`) |
| Hugo layout-оверрайды | `layouts/services.html`, `layouts/landing.html`, `layouts/partials/footer.html` | Кастомизация темы Hextra под нужды сайта |
| `build.sh` | корень репо | Склейка гибридной сборки: `hugo --gc --minify` → `npm run build` (Astro в `astro-dist/`) → копирование `astro-dist/*` поверх `public/` |
| GitHub Actions (`pages.yaml`) | `.github/workflows/pages.yaml` | CI: на пуш в `main` — Setup Go/Hugo/Node → `npm ci` → `./build.sh` → деплой `public/` в GitHub Pages |
| `netlify.toml` | корень репо | Альтернативный конфиг деплоя на Netlify (та же команда `build.sh`, тот же `public/`) — статус активности не подтверждён, см. `decisions.md` |
| `CNAME` | корень репо | `ringova.com` — кастомный домен для GitHub Pages |

## Почему так, не иначе

- **Гибрид Astro + Hugo, не один стек** — Hugo/Hextra уже нёс мини-курс (тема из коробки под документацию), Astro добавлен позже (2025-12-03) под визуальный лендинг с карточками/анимациями. Причина не переписывать всё на один стек не задокументирована — TODO(SME) в `decisions.md`.
- **Astro перекрывает Hugo, не наоборот** — `build.sh` билдит Hugo первым, затем копирует Astro поверх `public/`: страницы, которые есть и там и там (главная, услуги), в итоге отдаются Astro-версией.
- **Форк темы, не upstream** — `github.com/kringova/hextra` вместо `imfing/hextra`; конкретные отличия форка не задокументированы (`decisions.md`, TODO(SME)).
- **B2B-фокус текстов** — лендинг и `/services` переписаны 2026-06-05 под ЛПР компаний; страницы для частных специалистов (курс, книга, менторинг) сохранены как второстепенные. См. `decisions.md`.

## Данные и потоки

Статический сайт без бэкенда и базы данных. Контент — файлы в git (`.astro`, `.md`). Единственная динамика на клиенте:

- **CookieConsent** (`src/components/CookieConsent.astro`) — баннер согласия, от него зависит запуск Яндекс.Метрики.
- **Формы/заявки** — нет форм на сайте; контакт идёт через прямую ссылку на Telegram (`https://t.me/ushkatia`) и email (заказ книги).

## Запуск и деплой

**Локально:**

```bash
npm install
npm run dev        # Astro-страницы, localhost:4321
hugo server        # Hugo-контент (/docs, /samples), localhost:1313
```

Полный прод-билд локально: `./build.sh` (требует установленный Hugo extended 0.132.2+ и Node 20).

**Прод:** пуш в `main` → GitHub Actions (`.github/workflows/pages.yaml`, env `HUGO_VERSION: 0.132.2`) → `npm ci` → `./build.sh` → `actions/deploy-pages` → GitHub Pages, домен `ringova.com` через `CNAME`. Секретов и внешних сервисов в CI нет.

**TODO(SME):** в репо также лежит `netlify.toml` с идентичной билд-командой и доменом — не подтверждено, активен ли Netlify как второй канал (staging/зеркало) или это неудалённый остаток от прежней конфигурации. `DEPLOY.md` называет его «рекомендуемым» вариантом первым по счёту, что расходится с фактическим прод-каналом (GitHub Actions, см. задачу `#511` в vault). Поправить `DEPLOY.md` или подтвердить статус Netlify — на владелице.

**Откат:** по `DEPLOY.md` — вернуть build command на `hugo --gc --minify` (только Hugo, без Astro) или откатить коммит в git.
