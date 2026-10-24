<!-- Audience: агент сопровождения; Purpose: выпустить или откатить статические игры на действующем хостинге ringova.com. -->
# Размещение

Игры находятся в `apps/puzzleush` репозитория techdocush. Путь в проде — `https://ringova.com/play/`. DNS, VPS, пароли и существующие приложения для этого размещения не меняются.

`build.sh` основного сайта запускает `node --test apps/puzzleush/tests/*.test.mjs` и `node apps/puzzleush/scripts/sync-to-site.mjs --site-directory .` перед Hugo/Astro. Генерируемая `static/play/` исключена из Git; исходники находятся в приложении.

Обычный push в main запускает `.github/workflows/pages.yaml` и публикует весь гибридный сайт на действующем GitHub Pages. Дождаться job success; затем получить `/play/release.json`, сверить `source_commit` с опубликованным SHA и hashes ресурсов, открыть обе игры в браузере. Корневые страницы, `/docs` и витрину `/projects/` проверить отдельно.

Для отката вернуть конкретное изменение обычным `git revert` и дождаться Pages-deploy. Не менять origin, localStorage key и уровни v1: иначе сохранение на телефоне перестанет соответствовать задачам. Серверных пользовательских данных нет.

Результаты браузерного прогона сохраняются локально в `test-results/` (игнорируется Git). Для запуска нужны Playwright/Chromium из среды: `PLAYWRIGHT_MODULE` и `BROWSER_EXECUTABLE` задают их пути без изменения приложения.
