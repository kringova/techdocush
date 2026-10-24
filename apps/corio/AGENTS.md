# Corio prototype

- User-authorized destination: `https://ringova.com/play/corio/`. Preserve `/play/` and the existing Sudoku/nonogram app.
- User expanded the game to 50 box-puzzle levels, a storefront and the next prototype (shelf sorting). Root is the storefront; `/boxes/` and `/shelves/` are separate games. This is not a Yandex Games submission. The user has requested per-game cheap permanent calm-mode unlocks and voluntary rewarded moves. The ringova prototype keeps both modes free and labels +5 as a test: no actual ads/payments. Live Yandex catalogue/account setup remains a separate task.
- White Kurilian Bobtail, blue eyes, tiny grey curled bobtail. Graphic direction C stays primary; latest user instruction permits domestic softness from A. Evening at home before bedtime: navy shadows, local warm lamplight, muted ivory/ochre/sage. Preserve versioned generated cat assets.
- Game snapshot lives in `dist/`; original development and visual provenance are in the `yandex-games-factory` project. Copy via that project's `tools/sync-corio-to-site.mjs`.
- `build.sh` runs the game tests, then adds this app after the existing puzzle app sync. The latter clears `static/play`; keep Corio sync after it.
- Test: `node --test apps/corio/tests/*.test.mjs`. Full site check: `./build.sh`. Generated `static/play/corio` is not a source directory.
- Keep room definitions solvable and collision footprints consistent with the drawing. Validate keyboard and mobile controls before deployment.
- Keep all 50 levels solvable. Interior map sizes grow from 5×5 to 9×9. Canvas buffers and cached backgrounds use CSS size × devicePixelRatio; never revert to stretched low-resolution rendering.

- Shared top mixer on every page: kalimba, soft bells, soft keys, rain, wind, real-cat purr, independent toggles and volumes plus master. Kalimba/bells/keys/rain/wind are original procedural synthesis. Purr v1/v2 were rejected (weak, then moped-like); current v3 is a real cat recording by Joseph SARDIN / BigSoundBank under verified CC0-1.0. User approved purr v3; preserve its exact bytes. Bells are a separate optional layer with independent volume. Source, license and processing are in assets/provenance.json; this is not the user’s cat. No autoplay before gesture; pause on hidden/blur, gameplay pause and platform pause.
- Both games have calm and move-limited modes. Separate permanent product per game; never consume permanent unlocks. Reward only onRewarded, not onClose. Actual price must come from SDK catalogue in platform currency. Current web profile never initializes SDK or charges money.
- Every game includes direct links to the other available games. Yandex release needs platform app links and configured SDK initialization/events; current ringova build is not that release.
