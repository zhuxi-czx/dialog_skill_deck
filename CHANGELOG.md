# Changelog

## v0.2.0 — 2026-05-17

### Added — Hybrid Text Rendering (resolves CJK / equation / numeral breakage)
- **`scripts/compose-text.ts`** — composites SVG text overlay onto background PNGs using system fonts (PingFang SC / Inter / JetBrains Mono via per-platform stacks). Eliminates the broken-text failure mode common to image-gen backends.
- **Step 7.5** inserted between Step 7 (Generate Backgrounds) and Step 8 (Merge).
- Image-gen now targets `NN-slide-{slug}-bg.png` (text-free). Composited output → `NN-slide-{slug}.png`.
- `references/base-prompt.md` rewritten with a hard "no text in image" rule plus per-layout text-safe-zone reservations.

### Added — Deck Signature (cross-slide visual consistency)
- Every preset (`bio-3d`, `cinematic-3d`, `engineering-blueprint`, `sepia-whitepaper`, `engineer-notebook`) now has a `## Deck Signature` section with YAML defining title placement, label leader styles, legend frame, scale annotation, insight cards, etc.
- `compose-text.ts` reads these signatures to render the text overlay; per-slide overrides allowed.

### Added — Narrative Beats (composition energy modulation)
- Each slide carries one of: `hook | setup | development | climax | resolution`.
- `analysis-framework.md` adds beat assignment methodology; `outline-template.md` adds the field per slide; `base-prompt.md` documents how each beat shifts composition density.

### Added — Configuration
- `text_rendering_mode: hybrid | legacy | editable` in `EXTEND.md` (default `hybrid`). `editable` is reserved for v0.3.0.
- `fonts:` block in `EXTEND.md` lets users override the font preference lists for CJK / Latin / mono.

### Changed
- `package.json`: added `sharp` (^0.33.0) and `yaml` (^2.4.0).
- `outline-template.md`: per-slide `slide_data` YAML block (machine-readable schema for `text_layer`).
- `merge-to-pptx.ts` / `merge-to-pdf.ts`: auto-detect — prefer composited `*.png`, fall back to `*-bg.png` if compose-text wasn't run.
- `analysis-framework.md`: adds narrative arc output to `analysis.md`.

### Deferred to v0.3.0
- **Editable PPTX with native text boxes** — `text_rendering_mode: editable` is accepted but treated as `hybrid`. Full implementation requires two image variants per slide (bg + bg-with-decor) and structural shape mapping.

## v0.1.0 — 2026-05-16

Initial release. Five curated visual styles, 9-step pipeline, PPTX + PDF output.
