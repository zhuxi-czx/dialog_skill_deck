---
name: dialog_skill_deck
description: Generates professional slide deck images (PNG + PPTX + PDF) from content using 5 curated visual styles for science, engineering, and scholarly topics. Use when the user asks to "create slides", "make a presentation", "generate deck", "slide deck", or "PPT".
version: 0.1.0
metadata:
  homepage: https://github.com/zhuxi-czx/dialog_skill_deck
  requires:
    anyBins:
      - bun
      - npx
---

# Dialog Slide Deck Generator

Transform content into a slide deck (PNG slides + merged PPTX + PDF). Five curated visual styles cover science, engineering, and scholarly content. No style remixing — pick one of the five.

## What This Skill Is Not

- Not a remix engine — no "custom dimensions" mode
- Not a multilingual tool — output language always tracks source content (no translation)
- Not a general-purpose template — presets are tuned for educational / technical / scholarly content

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., `AskUserQuestion`, `request_user_input`, `clarify`, `ask_user`.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number for each question.
3. **Batching**: if the tool supports multiple questions per call, batch related questions in one call; otherwise ask in priority order.

## Image Generation Tools

When this skill needs to render an image, resolve the backend in this order:

1. **Current-request override** — if the user names a specific backend in the current message, use it.
2. **Saved preference** — if `EXTEND.md` sets `preferred_image_backend` to an available backend, use it.
3. **Auto-select** (when preference is `auto`, unset, or the pinned backend isn't available):
   - **Runtime-native** — if a skill like `imagegen` (Codex) or `image_generate` (Hermes) is in your tool inventory, invoke it via the `Skill` tool, passing the saved prompt file's content (plus output path and aspect ratio).
   - Otherwise, if exactly one non-native backend is installed, use it.
   - Otherwise (multiple non-native backends with no runtime-native tool), ask the user once.
4. **None available** — tell the user and ask how to proceed.

**⛔ Never substitute SVG, HTML, canvas, or other code-based rendering for raster image generation.** If you cannot resolve a raster backend, fall through to step 4 and ask the user — do **not** silently emit SVG, write inline `<svg>` markup, or produce HTML/CSS art as a substitute.

Setting `preferred_image_backend: ask` forces the step-3 prompt every run.

**Prompt file requirement (hard)**: write each image's full, final prompt to a standalone file under `prompts/` (naming: `NN-slide-{slug}.md`) BEFORE invoking any backend. The file is the reproducibility record and lets you switch backends without regenerating prompts.

## Batch Generation Policy

After every prompt file for the current generation group has been saved and verified, generate slide images in batches by default.

Priority order:
1. Use the backend's native batch / multi-task interface if it exists.
2. If no native batch exists but the runtime can issue parallel tool calls, dispatch up to `generation_batch_size` slide images at a time (default 4, clamp [1,8]). Explicit user request like `--batch-size 4` overrides EXTEND.md.
3. Otherwise, sequential.

Rules:
- Never start the first batch until all selected slide prompt files exist on disk.
- Retry failed items once without regenerating successful items.
- Do not use subagents merely to parallelize image rendering. Subagents are for separate prompt iteration or creative exploration.
- Merge PPTX/PDF only after all selected slide images are generated.

## Confirmation Policy

Default behavior: **confirm before generation**.

- Treat explicit skill invocation, a file path, matched signals, and `EXTEND.md` defaults as **recommendation inputs only** — none authorize skipping confirmation.
- Do **not** start Step 3 or later until the user completes Step 2.
- Skip confirmation only when the current request explicitly says so: "直接生成", "不用确认", "跳过确认", "skip confirmation", or equivalent.
- If confirmation is skipped, state the assumed style / audience / slide-count / language / backend in the next user-facing update before generating.

## Language

**Output language always tracks the source content** — English source → English deck; Chinese source → Chinese deck. Do not auto-translate or auto-bilingualize.

Per-preset bilingual rule: only `engineering-blueprint` enforces bilingual labels ("中文 (English)") for technical terminology. All other presets follow source language strictly.

Respond to the user in their language across questions, progress reports, errors, and summaries. Keep technical tokens (style names, file paths, code) in English.

## Script Directory

`{baseDir}` = this SKILL.md's directory. Resolve `${BUN_X}`: prefer `bun`; else `npx -y bun`; else suggest `brew install oven-sh/bun/bun`.

| Script | Purpose |
|--------|---------|
| `scripts/merge-to-pptx.ts` | Merge PNG slides into PowerPoint |
| `scripts/merge-to-pdf.ts` | Merge PNG slides into PDF |

First-time setup: `(cd {baseDir} && ${BUN_X} install)` — fetches `pptxgenjs` and `pdf-lib`.

## Options

| Option | Description |
|--------|-------------|
| `--style <name>` | One of: `bio-3d`, `cinematic-3d`, `engineering-blueprint`, `sepia-whitepaper`, `engineer-notebook` |
| `--audience <type>` | general / beginners / intermediate / experts / executives |
| `--slides <N>` | Target slide count (8-25 recommended, max 30) |
| `--ref <files...>` | Reference images applied per slide (usage: direct / style / palette) |
| `--batch-size <n>` | Temporary batch size for this run. Default from EXTEND.md, otherwise 4. Clamp [1,8]. |
| `--outline-only` | Stop after outline |
| `--prompts-only` | Stop after prompts (skip image generation) |
| `--images-only` | Skip to Step 7; requires existing `prompts/` |
| `--regenerate <N>` | Regenerate specific slide(s): `3` or `2,5,8` |

There is no `--lang` option — language always follows the source content.

## Style System

5 presets covering science / engineering / scholarly content. Each preset is a complete style spec (no remixing).

### Presets

| Preset | Visual Signature | Best For |
|--------|------------------|----------|
| `bio-3d` | Pastel 3D + soft outlines (BioRender aesthetic) | Cell, molecule, anatomy, biology, biochemistry |
| `cinematic-3d` | Deep navy + photoreal-ish 3D + glow accents | Keynote-style popular science, frontier topics |
| `engineering-blueprint` | Navy + crisp white CAD lines + bilingual callouts | Mechanical, physics, structural systems |
| `sepia-whitepaper` | Cream + sepia anatomical etching + steel-blue diagrams | Classical scholarly long-form, life-science whitepapers |
| `engineer-notebook` | Notebook paper + hand-inked schematics + colored formula boxes | Derivations, physics/engineering teaching |

Per-preset full specs: `references/styles/<preset>.md`.

### Auto-Selection

Scan source content. Pick the first row whose signal keywords appear; fall back to `bio-3d` if nothing matches (safest default for science content).

| Signals in source | Preset |
|-------------------|--------|
| cell, molecule, biology, chemistry, biochemistry, anatomy, medical, organism, dna, protein, neuron, 细胞, 分子, 生物, 生化, 解剖, 神经, 蛋白, 基因 | `bio-3d` |
| popular science, public lecture, keynote, frontier, quantum, cosmology, deep dive, 深度科普, 公开课, 前沿, 量子, 宇宙, 大众科普 | `cinematic-3d` |
| mechanical, engineering, machine, schematic, free-body, dynamics, structural, cad, kinematics, 机械, 工程, 机器, 结构, 受力, 动力学, 物理建模 | `engineering-blueprint` |
| whitepaper, monograph, scholarly, long-read, classical, philosophy, history of science, neuroscience, 白皮书, 长篇, 专著, 学院派, 哲学, 科学史 | `sepia-whitepaper` |
| derivation, problem-solving, proof, formula, circuit, step-by-step, 推导, 证明, 公式, 电路, 解题, 原理推导 | `engineer-notebook` |

### Slide Count Heuristic

| Source length | Recommended slides |
|---|---|
| <1000 words | 5-10 |
| 1000-3000 words | 10-18 |
| 3000-5000 words | 15-25 |
| >5000 words | 20-30 (consider splitting) |

## Reference Images

Users may supply reference images to guide style, palette, layout, or subject.

**Intake**: `--ref <files...>` or file paths / pasted images in conversation.
- File path → copy to `{slide-deck-dir}/refs/NN-ref-{slug}.{ext}`
- Pasted with no path → ask for the path, or extract style traits verbally as a text fallback

**Usage modes** (per reference):

| Usage | Effect |
|-------|--------|
| `direct` | Pass the file to the backend as a reference image for each slide |
| `style` | Extract style traits (line treatment, texture, mood) and append to every slide's prompt body |
| `palette` | Extract hex colors and append to every slide's prompt body |

Record refs in each slide's prompt frontmatter:

```yaml
references:
  - ref_id: 01
    filename: 01-ref-brand.png
    usage: direct
```

## File Layout

```
slide-deck/{topic-slug}/
├── source-{slug}.{ext}
├── analysis.md
├── outline.md
├── prompts/NN-slide-{slug}.md
├── NN-slide-{slug}.png
├── refs/NN-ref-{slug}.{ext}      (optional)
├── {topic-slug}.pptx
└── {topic-slug}.pdf
```

**Slug**: 2-4 words, kebab-case, extracted from topic.

**Backup rule** (applies across all steps): if a file about to be written already exists, rename it to `<name>-backup-YYYYMMDD-HHMMSS.<ext>` before writing the new one. This protects user edits and enables rollback.

## Workflow

Copy this checklist and check items off:

```
- [ ] Step 1: Setup & analyze
- [ ] Step 2: Confirmation ⚠️ REQUIRED
- [ ] Step 3: Generate outline
- [ ] Step 4: Review outline (conditional)
- [ ] Step 5: Generate prompts
- [ ] Step 6: Review prompts (conditional)
- [ ] Step 7: Generate images
- [ ] Step 8: Merge to PPTX/PDF
- [ ] Step 9: Output summary
```

### Step 1: Setup & Analyze

**1.1 Load EXTEND.md** — check paths in order; first hit wins:

| Path | Scope |
|------|-------|
| `<workdir>/.dialog_skill_deck/EXTEND.md` | Project |
| `${XDG_CONFIG_HOME:-$HOME/.config}/dialog_skill_deck/EXTEND.md` | XDG |
| `$HOME/.dialog_skill_deck/EXTEND.md` | User home |

Schema: `references/config/preferences-schema.md`. If not found, use defaults — first-time setup is not blocking.

**1.2 Analyze content** — follow `references/analysis-framework.md`: classify content, detect language, note style signals, estimate slide count from length, generate topic slug. Save source as `source.md` (backup rule applies).

**1.3 Check existing output** ⚠️ REQUIRED before Step 2. If `slide-deck/{topic-slug}/` exists, ask how to proceed (regenerate outline / regenerate images / backup and regenerate / exit — verbatim in `references/confirmation.md`).

Save findings to `analysis.md`: topic, audience, signals, recommended style + slide count, language detection.

### Step 2: Confirmation ⚠️ REQUIRED

**Hard gate**: per Confirmation Policy. Steps 3+ cannot start until the user confirms here (or explicitly opts out in the current request).

Batch five questions in one `AskUserQuestion` call: style, audience, slide count, review-outline?, review-prompts?. Verbatim options in `references/confirmation.md`.

Summary shown before the questions:
- Content type + topic
- Detected language
- Recommended style (based on signals)
- Recommended slide count (based on length)

**After confirmation**: update `analysis.md` with final choices and store `skip_outline_review` / `skip_prompt_review` flags from Q4/Q5.

### Step 3: Generate Outline

Resolve the preset: read `references/styles/{preset}.md` verbatim into `STYLE_INSTRUCTIONS`. Apply confirmed audience + language + slide count. Follow `references/outline-template.md`. Save as `outline.md` (backup rule applies).

Stop if `--outline-only`. Skip Step 4 if `skip_outline_review`.

### Step 4: Review Outline (Conditional)

Display a slide-by-slide table (`# | Title | Type | Layout`) with total count and resolved style. Ask: proceed / edit outline first / regenerate — verbatim in `references/confirmation.md`.

On "Edit outline first", tell the user to edit `outline.md` and ask again when ready. On "Regenerate outline", return to Step 3.

### Step 5: Generate Prompts

For each slide in outline:
1. Read `references/base-prompt.md`
2. Extract `STYLE_INSTRUCTIONS` from the outline (don't re-read style files)
3. Add slide-specific content
4. If `Layout:` is specified, include guidance from `references/layouts.md`
5. Save to `prompts/NN-slide-{slug}.md` (backup rule applies)

Stop if `--prompts-only`. Skip Step 6 if `skip_prompt_review`.

### Step 6: Review Prompts (Conditional)

Display the prompts index (`# | Filename | Slide Title`) and ask: proceed / edit prompts first / regenerate. Branches mirror Step 4.

### Step 7: Generate Images

1. Resolve the image backend via the Image Generation Tools rule.
2. Confirm every `prompts/NN-slide-{slug}.md` exists (hard requirement).
3. Session ID: `slides-{topic-slug}-{timestamp}` — pass to the backend if it supports sessions.
4. Build a task list with each slide's prompt file, output PNG path, aspect ratio (16:9), session ID, and verified direct references.
5. Dispatch per the Batch Generation Policy. Backup rule applies to PNG files before dispatch. Report progress (`Generated X/N`). Retry failed items once.

`--regenerate N` jumps to this step for the named slides only. `--images-only` starts here with existing prompts.

### Step 8: Merge

```bash
${BUN_X} {baseDir}/scripts/merge-to-pptx.ts <slide-deck-dir>
${BUN_X} {baseDir}/scripts/merge-to-pdf.ts <slide-deck-dir>
```

First time only: `(cd {baseDir} && ${BUN_X} install)` to fetch dependencies.

### Step 9: Summary

```
Slide Deck Complete!
Topic: [topic]
Style: [preset]
Location: [directory]
Slides: N

- 01-slide-cover.png
- ...
- NN-slide-back-cover.png

Outline: outline.md
PPTX: {topic-slug}.pptx
PDF: {topic-slug}.pdf
```

## Slide Modification

| Action | How |
|--------|-----|
| Edit | Update `prompts/NN-slide-{slug}.md` first, then `--regenerate N` |
| Add | Create new prompt at position, generate image, renumber subsequent NN (slugs unchanged), update `outline.md`, re-merge |
| Delete | Remove PNG + prompt, renumber subsequent, update `outline.md`, re-merge |
| Reorder | Renumber NN prefixes in both prompts/ and images, update outline.md, re-merge (no image regen needed) |
| Style change | Edit STYLE_INSTRUCTIONS in `outline.md`, regenerate all prompts (Step 5), regenerate all images (Step 7), re-merge |

Always update the prompt file BEFORE regenerating the image — `prompts/` is the source of truth. See `references/modification-guide.md`.

## References

| File | Content |
|------|---------|
| `references/confirmation.md` | Verbatim AskUserQuestion option copy |
| `references/analysis-framework.md` | Content analysis methodology |
| `references/outline-template.md` | Outline structure |
| `references/base-prompt.md` | Base prompt body for image generation |
| `references/layouts.md` | Layout options |
| `references/modification-guide.md` | Edit/add/delete workflows |
| `references/styles/<preset>.md` | Per-preset specs |
| `references/config/preferences-schema.md` | EXTEND.md schema |

## Notes

- Image generation: ~10-30s per slide depending on backend.
- Maintain visual consistency via session ID when supported.
- For sensitive public figures, prefer stylized alternatives to avoid likeness issues.

## Changing Preferences

EXTEND.md lives at the first matching path listed in Step 1.1. Two ways to change it:

- **Edit directly** — full schema: `references/config/preferences-schema.md`.
- **Common one-liners**:
  - `preferred_style: bio-3d` (or any of the 5)
  - `preferred_image_backend: auto` (default)
  - `preferred_image_backend: ask` (confirm every run)
  - `generation_batch_size: 4`

## Attribution

Pipeline structure inspired by [JimLiu/baoyu-skills/baoyu-slide-deck](https://github.com/JimLiu/baoyu-skills). The five visual styles in `references/styles/` are original to this skill, derived from analysis of NotebookLM-generated reference decks.
