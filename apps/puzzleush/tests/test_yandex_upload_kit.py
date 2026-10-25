import copy
import importlib.util
import json
from pathlib import Path
import struct
import tempfile
import unittest
import zipfile
import zlib

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("upload_kit", ROOT / "scripts/build-yandex-upload-kit.py")
kit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kit)


class UploadKitChecks(unittest.TestCase):
    def test_current_catalog_fields_fit_actual_console_limits(self):
        catalog = (ROOT / "docs/yandex-catalog.md").read_text()
        for heading in kit.GAME_NAMES.values():
            fields = kit.catalog_fields(catalog, heading)
            self.assertEqual(len(fields), 7)
            fields["title"] = "Я" * 51
            with self.assertRaises(ValueError):
                kit.validate_fields(fields)

    def test_rejects_lost_keywords_or_long_description(self):
        fields = kit.catalog_fields((ROOT / "docs/yandex-catalog.md").read_text(), "Судоку")
        for name, value in [("keywords", ""), ("about", "т" * 1001), ("seo", "Коротко")]:
            bad = {**fields, name: value}
            with self.assertRaises(ValueError):
                kit.validate_fields(bad)

    def test_detects_corrupt_and_outdated_game_archives(self):
        with tempfile.TemporaryDirectory() as tmp:
            file = Path(tmp) / "game.zip"
            release = {"profile": "yandex-sudoku", "version": "1.5.0", "hashes": {"index.html": kit.digest(b"game")}}
            with zipfile.ZipFile(file, "w") as archive:
                archive.writestr("index.html", b"game")
                archive.writestr("release.json", json.dumps(release))
            kit.validate_archive(file, release, "sudoku")
            with self.assertRaises(ValueError):
                kit.validate_archive(file, {**release, "version": "1.4.2"}, "sudoku")
            with self.assertRaises(ValueError):
                kit.validate_archive(file, release, "wordsearch")
            file.write_bytes(b"UEsDBA==")
            with self.assertRaises(zipfile.BadZipFile):
                kit.validate_archive(file, release, "sudoku")

    def test_rejects_game_with_tampered_content(self):
        with tempfile.TemporaryDirectory() as tmp:
            file = Path(tmp) / "game.zip"
            release = {"profile": "yandex-sudoku", "hashes": {"index.html": kit.digest(b"expected")}}
            with zipfile.ZipFile(file, "w") as archive:
                archive.writestr("index.html", b"changed")
                archive.writestr("release.json", json.dumps(release))
            with self.assertRaises(ValueError):
                kit.validate_archive(file, release, "sudoku")

    def test_rgb_screenshot_shape_and_crc(self):
        def chunk(kind, data):
            return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))
        with tempfile.TemporaryDirectory() as tmp:
            p = Path(tmp) / "mobile-1.png"
            def png(w, h, color):
                return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, color, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(b"")) + chunk(b"IEND", b"")
            p.write_bytes(png(720, 1280, 2))
            self.assertEqual(kit.validate_image(p)["width"], 720)
            for w, h, color in [(390, 844, 2), (720, 1280, 6), (1280, 720, 2)]:
                p.write_bytes(png(w, h, color))
                with self.assertRaises(ValueError):
                    kit.validate_image(p)
            p.write_bytes(png(720, 1280, 2)[:-2])
            with self.assertRaises(ValueError):
                kit.validate_image(p)

    def test_required_horizontal_video_limits(self):
        good = {"streams": [{"codec_type": "video", "codec_name": "h264", "pix_fmt": "yuv420p", "width": 1280, "height": 720}], "format": {"duration": "9.92", "size": "222066"}}
        self.assertEqual(kit.validate_video_data(good)["duration"], 9.92)
        for group, key, value in [("format", "duration", "28.1"), ("format", "size", str(101*1024*1024)), ("stream", "width", 720), ("stream", "height", 300)]:
            bad = copy.deepcopy(good)
            (bad["streams"][0] if group == "stream" else bad["format"])[key] = value
            with self.assertRaises(ValueError):
                kit.validate_video_data(bad)


if __name__ == "__main__":
    unittest.main()
