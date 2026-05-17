# dialog_skill_deck

A focused slide-deck generation skill for science, engineering, and scholarly content. Drop-in for any Claude Code, Claude Agent SDK, or compatible runtime that supports skills. Produces presentation-ready PNG slides, PPTX, and PDF.

## Five curated styles

Each preset is a complete style spec (palette, typography, layout rules, do/don't list) — no custom-dimensions remixing.

| Preset | Visual Signature | Best For |
|--------|------------------|----------|
| `bio-3d` | Pastel 3D + soft outlines (BioRender aesthetic) | Cell, molecule, anatomy, biology, biochemistry |
| `cinematic-3d` | Deep navy + photoreal-ish 3D + glow accents | Keynote-style popular science, frontier topics |
| `engineering-blueprint` | Navy + crisp white CAD lines + bilingual callouts | Mechanical, physics, structural systems |
| `sepia-whitepaper` | Cream + sepia anatomical etching + steel-blue diagrams | Classical scholarly long-form, life-science whitepapers |
| `engineer-notebook` | Notebook paper + hand-inked schematics + colored formula boxes | Derivations, physics/engineering teaching |

## Install

```bash
# Via Claude Code skills installer (if supported in your runtime)
npx skills add zhuxi-czx/dialog_skill_deck

# Or clone manually
git clone https://github.com/zhuxi-czx/dialog_skill_deck.git \
  ~/.claude/skills/dialog_skill_deck

# First-time setup (installs pptxgenjs + pdf-lib)
cd ~/.claude/skills/dialog_skill_deck && bun install
# or: npx -y bun install
```

## Use

In any Claude runtime supporting skills:

> "Create a slide deck from this article about cell membranes"

The skill detects "cell membrane" → routes to `bio-3d` → generates outline → per-slide prompts → renders images → merges to PPTX + PDF.

Manual style override:

> "Use `engineering-blueprint` for a deck about lathe components"

Skip confirmation for fast runs:

> "直接生成 — 用 cinematic-3d 风格"

## Pipeline

1. Analyze source content (topic, language, length, signals)
2. Confirm style + audience + slide count (skippable)
3. Generate outline with embedded `STYLE_INSTRUCTIONS`
4. (Optional) Review outline
5. Generate per-slide image prompts
6. (Optional) Review prompts
7. Render slide images (parallel batches)
8. Merge to PPTX + PDF
9. Output summary

**Output language always tracks source content.** No translation. Bilingual labels are a per-preset rule (only `engineering-blueprint` enforces "中文 (English)" for technical terminology).

## Image backend

Resolution order:
1. Current-request override (user names a backend)
2. `EXTEND.md` `preferred_image_backend`
3. Auto-select: runtime-native tool (Codex `imagegen`, Hermes `image_generate`) → only-installed → ask
4. If nothing available: tell the user

**Never** substitutes SVG, HTML, or canvas rendering for raster image generation.

## Configuration

Place `EXTEND.md` at any of (first hit wins):

| Path | Scope |
|------|-------|
| `<project>/.dialog_skill_deck/EXTEND.md` | Project |
| `~/.config/dialog_skill_deck/EXTEND.md` | XDG |
| `~/.dialog_skill_deck/EXTEND.md` | User home |

```yaml
preferred_image_backend: auto
preferred_style: ~                 # omit for auto-routing
preferred_audience: general
generation_batch_size: 4
```

Full schema: `references/config/preferences-schema.md`.

## Adding your own preset

Drop a new file into `references/styles/<your-preset>.md` following the format of any existing preset (Design Aesthetic / Background / Typography / Color Palette / Visual Elements / Density Guidelines / Style Rules / Best For). Add a row to the Auto-Selection table in `SKILL.md`.

## Attribution

Pipeline structure inspired by [JimLiu/baoyu-skills/baoyu-slide-deck](https://github.com/JimLiu/baoyu-skills). The five visual styles in `references/styles/` are original to this skill, derived from analysis of NotebookLM-generated reference decks.

## License

MIT — see `LICENSE`.
