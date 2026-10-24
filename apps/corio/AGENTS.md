# Corio prototype

- User-authorized destination: `https://ringova.com/play/corio/`. Preserve `/play/` and the existing Sudoku/nonogram app.
- User expanded the game to 50 box-puzzle levels, a storefront and the next prototype (shelf sorting). Root is the storefront; `/boxes/` and `/shelves/` are separate games. This is not a Yandex Games submission. Do not add ads, accounts or payments without a task.
- White Kurilian Bobtail, blue eyes, tiny grey curled bobtail. Graphic direction C: ink-blue contours, warm ivory, ochre wood and muted green. Preserve versioned generated cat assets.
- Game snapshot lives in `dist/`; original development and visual provenance are in the `yandex-games-factory` project. Copy via that project's `tools/sync-corio-to-site.mjs`.
- `build.sh` runs the game tests, then adds this app after the existing puzzle app sync. The latter clears `static/play`; keep Corio sync after it.
- Test: `node --test apps/corio/tests/*.test.mjs`. Full site check: `./build.sh`. Generated `static/play/corio` is not a source directory.
- Keep room definitions solvable and collision footprints consistent with the drawing. Validate keyboard and mobile controls before deployment.
- Keep all 50 levels solvable. Interior map sizes grow from 5×5 to 9×9. Canvas buffers and cached backgrounds use CSS size × devicePixelRatio; never revert to stretched low-resolution rendering.
