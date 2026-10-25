#!/usr/bin/env python3
"""Build a checked, offline upload desk from the matching games and media."""
import argparse
import hashlib
import html
import json
import os
from pathlib import Path, PurePosixPath
import shutil
import struct
import subprocess
import tempfile
from datetime import datetime, timezone
import zipfile
import zlib

ROOT = Path(__file__).resolve().parent.parent
GAME_NAMES = {"sudoku": "Судоку", "nonogram": "Японские кроссворды", "wordsearch": "Поиск слов"}
TAGS = {
    "sudoku": ["Судоку", "Логические", "С числами", "Для одного игрока"],
    "nonogram": ["Японские кроссворды", "Нонограммы", "Логические", "Для одного игрока"],
    "wordsearch": ["Поиск слов", "Слова", "Логические", "Для одного игрока"],
}
FIELDS = [
    ("keywords", "Ключевые слова", 1, 100),
    ("developer-comment", "Комментарий разработчика", 1, 2048),
    ("title", "Название", 1, 50),
    ("seo", "Описание для SEO", 50, 160),
    ("about", "Об игре", 100, 1000),
    ("short-description", "Короткое описание", 1, 70),
    ("how-to-play", "Как играть", 100, 1000),
]
MEDIA = {
    "icon-512.png": "Иконка",
    "cover-800x470.png": "Обложка",
    "gameplay-16x9.mp4": "Горизонтальное видео геймплея (обязательно)",
    "desktop-1.png": "Скриншоты → Десктопные → Альбомная: первый",
    "desktop-2.png": "Скриншоты → Десктопные → Альбомная: второй",
    "mobile-1.png": "Скриншоты → Мобильные → Портретная: первый",
    "mobile-2.png": "Скриншоты → Мобильные → Портретная: второй",
}
COMMON = [
    ("Поддерживаемые платформы", "Десктоп; Мобильные → Android и iOS"),
    ("Ориентация", "Портретная"),
    ("Игра переведена на", "Русский"),
    ("Возрастной рейтинг", "0+ — по нейтральному содержимому этих игр"),
    ("Категории", "Головоломки"),
    ("Игра использует облачные сохранения", "Выключено: сохранения в браузере"),
    ("Отсроченная публикация", "Выключено: после успешной модерации публикация автоматическая"),
    ("Хочу подключить AI-описания", "Выключено"),
    ("Описание и продвижение", "Оставить вкладку «Русский», удалить «Английский» крестиком"),
    ("Вход и инап-покупки", "Не требуются; товаров за деньги в этих играх нет"),
    ("Sticky-баннеры", "Включить в разделе «Реклама»: справа на десктопе, снизу на телефоне; показом управляет платформа"),
]
GUIDE = """КЛЕТОЧКИ — ПОЛНЫЙ КОМПЛЕКТ ДЛЯ ЯНДЕКС ИГР

Кабинет Яндекс Игр: https://games.yandex.ru/console/

Открой START-HERE.html двойным кликом: там готовые ответы, кнопки «Скопировать» и ссылки на файлы.
Страница работает локально, не подключается к аккаунтам и не отправляет данные в сеть.
У каждой игры отдельная папка. В кабинет загружать игровой ZIP из её папки.
Большой ZIP комплекта сначала распаковать; его целиком в поле «Архив» не загружать.

1. Судоку — продолжить существующий черновик; не создавать дубликат.
2. Для японских кроссвордов и поиска слов создать по отдельной карточке.
3. Взять параметры из страницы/answers.txt, вставить тексты. Теги выбирать только из существующего списка.
4. Загрузить ZIP, иконку, обложку и обязательное горизонтальное видео в соответствующие поля.
5. Все иконки, обложки, видео и скриншоты трёх игр находятся в одной общей папке media. Выбрать файлы с началом имени sudoku-, nonogram- или wordsearch-. Для «Десктопные → Альбомная» — desktop-16x9; для «Мобильные → Портретная» — mobile-9x16. Мобильные9:16 не загружаются в альбомное поле16:9.
6. Вертикальное видео, GIF, рекламные видео, maskable-иконка и обложка на витрину необязательны; оставить пустыми.
7. Выключить AI-описания. В описании удалить английскую вкладку, оставить русский. Нажать «Сохранить».
8. В разделе «Реклама» включить штатный sticky-баннер: справа на десктопе, снизу на телефоне. Автоматический показ платформой; опцию управления баннером через API не включать.
9. Открыть тестовый запуск с debug-панелью, проверить настоящий SDK, рекламу и сохранения, появление/скрытие баннера; на iPhone — управление и поворот.
10. После успешной проверки отправить на модерацию. При новом аккаунте Яндекс может разрешать только одну заявку новой игры за раз.

Банковские реквизиты и договор заполняются непосредственно у Яндекса. Их в комплекте нет.
Счётчик Метрики выбран в игровых сборках; настройка целей через OAuth — отдельный шаг и загрузке не мешает.
Сам комплект и локальные SDK-фикстуры не подтверждают настоящую рекламу, модерацию или совместимость iPhone.
Дополнительный onboarding-preview находится в extras: это демонстрация обучения, не один из двух скриншотов геймплея.
"""
CHECKS = """ПЕРЕД ОТПРАВКОЙ НА МОДЕРАЦИЮ
Все игры: настоящий SDK/Game Ready, загрузка без ошибок, сохранение после перезагрузки,
экран/касания/поворот на Android и iPhone, отсутствие браузерной прокрутки и меню на поле.
Штатный sticky-баннер справа на десктопе/снизу на телефоне: при появлении/скрытии
поле и кнопки помещаются в игровое окно и не перекрываются рекламой.
Названия проверить на уникальность в Консоли. Договор и монетизация должны быть оформлены.

Судоку: обучение/двойной тап, добровольная реклама для кандидатов и +3 подсказок,
раннее закрытие без награды, 3 ошибки/пауза на четвёртой, восстановление/завершение,
«Заполнить всё» только для всего остатка из одиночных заметок, одна отмена, сохранение.
Японские: клик/ПКМ, касания и автокрестики, поле 10/15/20 целиком, отмена/масштаб,
реклама только при явном переходе после победы; неудавшийся показ не блокирует переход.
Слова: выделение/два касания, раскрытие слова/все его начальные буквы, +3 подсказки за просмотр,
раннее закрытие без награды, реклама по переходу после победы, сохранение помощи и находок.

Локальные видео показывают настоящий игровой интерфейс с тестовыми ответами SDK;
тесты не записывают реальные рекламные показы и блокируют внешнюю Метрику.
"""
SOURCES = ["https://yandex.ru/dev/games/doc/ru/console/add-new-game/draft",
           "https://yandex.ru/dev/games/doc/ru/console/add-new-game",
           "https://yandex.ru/dev/games/doc/ru/requirements/2/7",
           "https://yandex.ru/dev/games/doc/ru/console/adv-monetization"]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def catalog_fields(catalog, heading):
    section = catalog.split(f"## {heading}\n", 1)[1].split("\n## ", 1)[0]
    labels = ["Название", "Короткое описание", "Описание для SEO", "Об игре", "Как играть", "Ключевые слова", "Комментарий модератору"]
    values = {}
    for i, label in enumerate(labels):
        start = section.index(label + ":") + len(label) + 1
        end = section.index(labels[i + 1] + ":", start) if i + 1 < len(labels) else len(section)
        values[label] = section[start:end].strip()
    result = {key: values["Комментарий модератору" if key == "developer-comment" else label]
              for key, label, _, _ in FIELDS}
    validate_fields(result)
    return result


def validate_fields(fields):
    for key, label, minimum, maximum in FIELDS:
        size = len(fields.get(key, ""))
        if not minimum <= size <= maximum:
            raise ValueError(f"{label}: {size} символов, нужно {minimum}–{maximum}")
    if fields["keywords"] != fields["keywords"].lower():
        raise ValueError("Ключевые слова должны быть в нижнем регистре")


def png_info(file):
    data = file.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError(f"Не PNG: {file}")
    offset, chunks = 8, []
    while offset < len(data):
        length = struct.unpack(">I", data[offset:offset + 4])[0]
        kind = data[offset + 4:offset + 8]
        content = data[offset + 8:offset + 8 + length]
        crc = data[offset + 8 + length:offset + 12 + length]
        if len(crc) != 4 or struct.unpack(">I", crc)[0] != zlib.crc32(kind + content):
            raise ValueError(f"Повреждён PNG: {file}")
        chunks.append(kind)
        offset += length + 12
    if chunks[0] != b"IHDR" or chunks[-1] != b"IEND" or b"IDAT" not in chunks:
        raise ValueError(f"Неполный PNG: {file}")
    width, height, depth, color = struct.unpack(">IIBB", data[16:26])
    return {"width": width, "height": height, "bitDepth": depth, "colorType": color}


def validate_image(file):
    meta = png_info(file)
    w, h = meta["width"], meta["height"]
    expected = {"icon-512.png": (512, 512), "cover-800x470.png": (800, 470)}.get(file.name)
    if expected and (w, h) != expected:
        raise ValueError(f"Неверный размер {file.name}: {w}×{h}")
    if file.name.startswith(("mobile-", "desktop-")):
        if meta["bitDepth"] != 8 or meta["colorType"] != 2:
            raise ValueError(f"Скриншот должен быть 24-bit RGB PNG: {file}")
        if not 1280 <= max(w, h) <= 2560:
            raise ValueError(f"Неверная длинная сторона: {file}")
        if (file.name.startswith("desktop-") and w * 9 != h * 16) or (file.name.startswith("mobile-") and w * 16 != h * 9):
            raise ValueError(f"Неверные пропорции: {file}")
    return meta


def validate_video_data(data):
    stream = next(s for s in data["streams"] if s.get("codec_type") == "video")
    w, h = stream["width"], stream["height"]
    duration, size = float(data["format"]["duration"]), int(data["format"]["size"])
    if w * 9 != h * 16 or h < 400 or not 0 < duration <= 28 or size > 100 * 1024 * 1024:
        raise ValueError("Видео не соответствует 16:9 / высота≥400 / до28с / до100МБ")
    if stream["codec_name"] != "h264" or stream["pix_fmt"] != "yuv420p":
        raise ValueError("Для совместимости требуется H264/yuv420p")
    return {"width": w, "height": h, "duration": duration, "bytes": size, "codec": stream["codec_name"]}


def validate_archive(file, release, game):
    with zipfile.ZipFile(file) as archive:
        if archive.testzip() or "index.html" not in archive.namelist() or "sdk.js" in archive.namelist():
            raise ValueError(f"Некорректный игровой ZIP: {file}")
        if sum(f.file_size for f in archive.infolist()) > 100 * 1024 * 1024:
            raise ValueError("Распакованная игра больше100МБ")
        for name in archive.namelist():
            path = PurePosixPath(name)
            if path.is_absolute() or ".." in path.parts or not all(c.isascii() and (c.isalnum() or c in "_./-") for c in name):
                raise ValueError(f"Недопустимый путь в ZIP: {name}")
        manifest = json.loads(archive.read("release.json"))
        if manifest != release or release["profile"] != f"yandex-{game}":
            raise ValueError("ZIP и исходная сборка не совпадают")
        if set(archive.namelist()) != set(release["hashes"]) | {"release.json"}:
            raise ValueError("Состав ZIP не совпадает с манифестом")
        for name, expected in release["hashes"].items():
            if digest(archive.read(name)) != expected:
                raise ValueError(f"ZIP SHA256 не совпал: {name}")


def media_path(name, game):
    names = {
        "icon-512.png": "01-icon-512.png",
        "cover-800x470.png": "02-cover-800x470.png",
        "gameplay-16x9.mp4": "03-gameplay-16x9.mp4",
        "desktop-1.png": "04-desktop-16x9-1.png",
        "desktop-2.png": "05-desktop-16x9-2.png",
        "mobile-1.png": "06-mobile-9x16-1.png",
        "mobile-2.png": "07-mobile-9x16-2.png",
    }
    return f"media/{game}-{names[name]}"


def ordered_answers(game, version):
    fields, settings = game["fields"], dict(COMMON)
    pairs = [("Версия", version), *COMMON[:5],
             ("Теги — выбрать существующие, остальные пропустить", ", ".join(TAGS[game["game"]])),
             ("Ключевые слова", fields["keywords"]),
             *COMMON[5:7], ("Комментарий разработчика", fields["developer-comment"]),
             ("Описание и продвижение", settings["Описание и продвижение"])]
    pairs += [(label, fields[key]) for key, label, _, _ in FIELDS if key not in ("keywords", "developer-comment")]
    return pairs


def html_page(games, version, checked_at):
    esc = html.escape
    sections = []
    for game in games:
        folder, fields = game["folder"], game["fields"]
        def rows(values):
            return "<table>" + "".join(f"<tr><th>{esc(k)}</th><td>{esc(v)}</td></tr>" for k, v in values) + "</table>"
        def card(key):
            _, label, _, maximum = next(f for f in FIELDS if f[0] == key)
            value = fields[key]
            field_id = f"{game['game']}-{key}"
            return f'<div class="field" data-console-field="{key}"><label for="{field_id}">{esc(label)} <small>{len(value)}/{maximum}</small></label><textarea id="{field_id}" readonly rows="{max(2, min(8, len(value)//80+1))}">{esc(value)}</textarea><button data-copy="{field_id}">Скопировать</button></div>'
        def file_card(name, label):
            return f'<div class="file-field"><strong>{esc(label)}</strong><p><a href="{media_path(name, game["game"])}" download>{Path(media_path(name, game["game"])).name}</a></p></div>'
        def screenshots(kind):
            desktop = kind == "desktop"
            ratio, platform, orientation = ("16:9", "Десктопные", "Альбомная") if desktop else ("9:16", "Мобильные", "Портретная")
            names = [f"{kind}-1.png", f"{kind}-2.png"]
            links = "".join(f'<li><a href="{media_path(n, game["game"])}" download>{Path(media_path(n, game["game"])).name}</a></li>' for n in names)
            previews = "".join(f'<img loading="lazy" src="{media_path(n, game["game"])}" alt="{platform}, {ratio}">' for n in names)
            return f'<div class="screenshot-group" data-ratio="{ratio}"><h4>{platform} — {ratio}</h4><p>В Яндексе: <b>«{platform}» → «{orientation}»</b>. Загрузить только эти два файла:</p><ul>{links}</ul><div class="previews">{previews}</div></div>'
        basic = [("Версия", version), *COMMON[:5], ("Теги", ", ".join(TAGS[game["game"]]) + ". Выбрать существующие; если таких нет — пропустить.")]
        descriptions = "".join(card(key) for key, _, _, _ in FIELDS if key not in ("keywords", "developer-comment"))
        sections.append(f'''<section id="{game['game']}"><h2>{esc(fields['title'])}</h2>
<p class="archive"><a href="{folder}/{game['archive']}" download>Архив игры: {game['archive']}</a> — ZIP не распаковывать.</p>
<h3>Общее</h3>{rows(basic)}{card('keywords')}{rows(COMMON[5:7])}{card('developer-comment')}
<h3>Описание и продвижение</h3><p>Вкладка <b>«Русский»</b>. «Английский» удалить крестиком.</p>{descriptions}
<h3>Иконка и обложка</h3>{file_card('icon-512.png', 'Иконка — PNG 512×512')}{file_card('cover-800x470.png', 'Обложка — PNG 800×470')}
<h3>Видео геймплея</h3><p><b>Вертикальное видео:</b> оставить пустым, необязательно.</p>{file_card('gameplay-16x9.mp4', 'Горизонтальное видео геймплея — обязательно, MP4 16:9')}
<h3>Скриншоты</h3>{screenshots('desktop')}{screenshots('mobile')}
<h3>Рекламные видео</h3><p>Оставить пустым. Обязательное горизонтальное видео уже указано выше, в «Видео геймплея».</p>
<p class="note"><b>Внизу формы:</b> «Хочу подключить AI-описания» — выключить. Затем «Сохранить».</p>
<h3>После сохранения — раздел «Реклама»</h3><p><b>Sticky-баннеры включить:</b> справа на десктопе, снизу на телефоне. Показом управляет платформа; опцию управления баннером через API оставить выключенной.</p>
<details><summary>Дополнительные разделы и все ответы</summary><p>Maskable-иконку, обложку на витрину и GIF можно оставить пустыми. Вход и покупки не требуются. extras/onboarding-preview.png не загружать вместо скриншота геймплея.</p><a href="{folder}/answers.txt">Все ответы одним текстом</a></details></section>''')
    return f'''<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Клеточки — загрузка в Яндекс {esc(version)}</title>
<style>body{{margin:0;background:#f5f3ed;color:#303b31;font:16px/1.6 system-ui,sans-serif}}main{{max-width:1000px;margin:auto;padding:28px 18px}}h1{{line-height:1.25}}section{{margin:36px 0;padding:24px;background:#fff;border-radius:16px}}table{{border-collapse:collapse;width:100%}}th,td{{text-align:left;vertical-align:top;border-bottom:1px solid #ddd;padding:10px;overflow-wrap:anywhere}}th{{width:42%}}a{{color:#3c5c45}}nav{{display:flex;gap:18px;flex-wrap:wrap;align-items:center}}.console-link{{display:inline-block;padding:10px 16px;border-radius:8px;background:#4b5c43;color:#fff;text-decoration:none;font-weight:600}}textarea{{box-sizing:border-box;width:100%;padding:12px;font:inherit;background:#f8f8f2;border:1px solid #bbc6b1;border-radius:6px}}label{{display:block;font-weight:600}}small{{color:#68755e;font-weight:400}}button{{margin:6px 0 18px;padding:9px 16px;cursor:pointer;background:#4b5c43;color:white;border:0;border-radius:6px;font:inherit}}.previews{{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap}}.previews img{{max-width:210px;max-height:310px;border:1px solid #ddd}}.note{{padding:16px;background:#e6ecdf;border-radius:10px}}.field{{margin-top:20px}}.screenshot-group,.file-field{{padding:16px;border:1px solid #bbc6b1;border-radius:8px;margin:14px 0}}h3{{margin-top:36px}}h4{{margin:0}}@media(max-width:600px){{section{{padding:14px}}th,td{{display:block;width:auto}}th{{border-bottom:0;padding-bottom:0}}}}</style>
<main><h1>Клеточки — всё для загрузки в Яндекс</h1><p>Игровая версия {esc(version)}. Выбери игру, копируй значения и загружай указанные файлы. Каждая игра — отдельная карточка.</p><nav><a class="console-link" href="https://games.yandex.ru/console/" target="_blank" rel="noopener noreferrer">Открыть кабинет Яндекс Игр ↗</a><a href="#sudoku">Судоку</a><a href="#nonogram">Японские</a><a href="#wordsearch">Поиск слов</a><a href="media/" target="_blank">Все картинки и видео — одна папка</a><a href="START-HERE.txt">Порядок действий</a><a href="CHECK-BEFORE-MODERATION.txt">Перед модерацией</a></nav><p class="note">Все картинки и видео трёх игр лежат в одной папке <b>media</b>. Начало имени указывает игру: <b>sudoku</b>, <b>nonogram</b> или <b>wordsearch</b>; дальше — назначение и пропорции. Большой ZIP комплекта сначала распаковать. В поле «Архив» нужен игровой ZIP из папки выбранной игры. Десктоп, Android и iOS — целевые платформы; настоящий запуск на телефонах и рекламу проверить перед модерацией. Эта локальная страница никуда не отправляет данные.</p>{''.join(sections)}<p>Требования сверены 25.10.2026: <a href="{SOURCES[0]}">официальная форма Яндекса</a>. Для следующего выпуска агент проверяет их заново.</p></main>
<script>document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{{const area=document.getElementById(button.dataset.copy);let ok=false;try{{await navigator.clipboard.writeText(area.value);ok=true;}}catch{{area.focus();area.select();ok=document.execCommand('copy');}}button.textContent=ok?'Скопировано':'Нажми Ctrl/Cmd+C';setTimeout(()=>button.textContent='Скопировать',1800);}}));</script></html>'''.replace('25.10.2026:', checked_at + ':')


def build(output, ffprobe, checked_at):
    if datetime.strptime(checked_at, "%Y-%m-%d").date() > datetime.now(timezone.utc).date():
        raise ValueError("Дата проверки требований не может быть в будущем")
    version = json.loads((ROOT / "package.json").read_text())["version"]
    outer = output.with_name(output.name + ".zip")
    if output.exists() or outer.exists():
        raise ValueError("Комплект уже существует. Выбери новую папку через --output; старый комплект сохранён.")
    catalog = (ROOT / "docs/yandex-catalog.md").read_text()
    games, hashes = [], set()
    for i, (game, heading) in enumerate(GAME_NAMES.items(), 1):
        release = json.loads((ROOT / f"build/yandex/{game}/release.json").read_text())
        if release["version"] != version:
            raise ValueError("Сначала пересобери игровые ZIP текущей версии")
        for name, expected in release["sourceHashes"].items():
            if digest((ROOT / "dist" / name).read_bytes()) != expected:
                raise ValueError(f"Устаревшая сборка: {name}")
        hashes.add(release["sharedHash"])
        archive = f"kletochki-{game}-{version}.zip"
        validate_archive(ROOT / "build/yandex" / archive, release, game)
        media_dir = ROOT / f"build/yandex-media/{game}"
        receipt = json.loads((media_dir / "media-release.json").read_text())
        if (receipt["version"], receipt["game"], receipt["sharedHash"]) != (version, game, release["sharedHash"]):
            raise ValueError("Медиа не относятся к текущей сборке. Запусти yandex-media.mjs")
        media_checks = {}
        for name in [*MEDIA, "onboarding-preview.png"]:
            file = media_dir / name
            if digest(file.read_bytes()) != receipt["hashes"][name]:
                raise ValueError(f"Медиа SHA256 не совпал: {game}/{name}")
            if name.endswith(".png"):
                media_checks[name] = validate_image(file)
            else:
                data = json.loads(subprocess.check_output([ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(file)]))
                media_checks[name] = validate_video_data(data)
        games.append({"game": game, "folder": f"{i}-{game}", "archive": archive,
                      "fields": catalog_fields(catalog, heading), "mediaChecks": media_checks,
                      "mediaGeneratedAt": receipt["generatedAt"]})
    if len(hashes) != 1:
        raise ValueError("Три игры собраны из разных исходников")
    output.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix=".yandex-upload-", dir=output.parent))
    try:
        (staging / "START-HERE.html").write_text(html_page(games, version, checked_at))
        (staging / "START-HERE.txt").write_text(GUIDE)
        (staging / "CHECK-BEFORE-MODERATION.txt").write_text(CHECKS)
        for game in games:
            folder = staging / game["folder"]
            (folder / "fields").mkdir(parents=True)
            (folder / "extras").mkdir()
            shutil.copy2(ROOT / "build/yandex" / game["archive"], folder / game["archive"])
            for name in MEDIA:
                target = staging / media_path(name, game["game"])
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(ROOT / f"build/yandex-media/{game['game']}" / name, target)
            shutil.copy2(ROOT / f"build/yandex-media/{game['game']}/onboarding-preview.png", folder / "extras/onboarding-preview.png")
            answers = [f"{game['fields']['title']} — версия {version}"]
            for label, value in ordered_answers(game, version):
                answers += ["", label.upper(), value]
            for n, (key, label, _, _) in enumerate(FIELDS, 1):
                value = game["fields"][key]
                (folder / "fields" / f"{n:02}-{key}.txt").write_text(value + "\n")
            answers += ["", "ФАЙЛЫ ДЛЯ ЗАГРУЗКИ", "Архив: " + game["archive"], *[f"{label}: ../{media_path(name, game["game"])}" for name, label in MEDIA.items()], "", "ХОЧУ ПОДКЛЮЧИТЬ AI-ОПИСАНИЯ", "Выключено", "", "ПОСЛЕ СОХРАНЕНИЯ — РАЗДЕЛ РЕКЛАМА", dict(COMMON)["Sticky-баннеры"], "Управление баннером через API: выключено"]
            (folder / "answers.txt").write_text("\n".join(answers) + "\n")
            (folder / "form.json").write_text(json.dumps({"version": version, "settings": COMMON, "tagSuggestions": TAGS[game["game"]], "fields": game["fields"]}, ensure_ascii=False, indent=2) + "\n")
        manifest = {"version": version, "preparedAt": datetime.now(timezone.utc).isoformat(), "requirementsCheckedAt": checked_at,
                    "sharedHash": hashes.pop(), "liveYandexVerified": False, "iPhoneVerified": False, "sources": SOURCES, "games": games}
        manifest["sha256"] = {p.relative_to(staging).as_posix(): digest(p.read_bytes()) for p in sorted(staging.rglob("*")) if p.is_file()}
        (staging / "MANIFEST.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
        os.rename(staging, output)
    finally:
        if staging.exists():
            shutil.rmtree(staging)
    with zipfile.ZipFile(outer, "w", zipfile.ZIP_DEFLATED) as archive:
        for file in sorted(output.rglob("*")):
            if file.is_file():
                archive.write(file, file.relative_to(output).as_posix())
    with zipfile.ZipFile(outer) as archive:
        if archive.testzip():
            raise ValueError("Не прошла CRC-проверка комплекта")
        for name, expected in manifest["sha256"].items():
            if digest(archive.read(name)) != expected:
                raise ValueError("Не совпал SHA256 финального комплекта")
    return {"folder": str(output), "zip": str(outer), "filesVerified": len(manifest["sha256"]), "games": len(games), "sha256": digest(outer.read_bytes())}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--ffprobe", default=os.environ.get("FFPROBE", "ffprobe"))
    parser.add_argument("--requirements-checked", required=True, help="Дата фактической сверки официальной формы, YYYY-MM-DD")
    args = parser.parse_args()
    current = json.loads((ROOT / "package.json").read_text())["version"]
    print(json.dumps(build((args.output or ROOT / f"build/yandex-upload-{current}").resolve(), args.ffprobe, args.requirements_checked), ensure_ascii=False, indent=2))
