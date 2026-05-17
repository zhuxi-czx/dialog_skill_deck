# Modifying an Existing Deck

The `prompts/` directory is the **source of truth** for every slide. Image files (`NN-slide-*.png`) are derivative — regenerate them from prompts, never edit them in place.

## Action Cookbook

| Action | Steps |
|--------|-------|
| **Edit content of slide N** | 1. Update `prompts/NN-slide-{slug}.md`<br>2. `--regenerate N` |
| **Change visual style** | 1. Edit `outline.md` — replace the `STYLE_INSTRUCTIONS` block with content from a different preset<br>2. Regenerate all per-slide prompts (Step 5)<br>3. Regenerate all images (Step 7)<br>4. Re-merge PPTX + PDF |
| **Add a new slide at position K** | 1. Renumber existing slides ≥K (NN only; slugs unchanged)<br>2. Create new prompt at `prompts/KK-slide-{new-slug}.md`<br>3. Update `outline.md` to include the new slide<br>4. Generate the new image only<br>5. Re-merge PPTX + PDF |
| **Delete slide N** | 1. Remove `NN-slide-{slug}.png` and `prompts/NN-slide-{slug}.md`<br>2. Renumber subsequent slides<br>3. Update `outline.md`<br>4. Re-merge PPTX + PDF |
| **Reorder slides** | 1. Renumber NN prefixes in both prompts/ and image filenames<br>2. Update `outline.md` to match the new order<br>3. Re-merge PPTX + PDF (no image regeneration needed) |
| **Fix a single label or element** | Same as "Edit content of slide N" — edit prompt, regenerate that one slide |

## Rules

1. **Always update the prompt file BEFORE regenerating the image.** Prompts are the reproducibility record.
2. **Only NN changes on renumber; slugs stay stable.** External references to a slug (notes, links) remain valid.
3. **Backup rule applies everywhere.** Any file about to be overwritten is renamed to `<name>-backup-YYYYMMDD-HHMMSS.<ext>` first.
4. **Don't manually edit PNG files.** If you need a visual edit, change the prompt and regenerate.
5. **Re-merge PPTX + PDF after any image change**, even a single-slide regeneration. The merged files are not auto-synced.

## Common Pitfalls

- **Editing the image, not the prompt** — the next regeneration overwrites your edits silently.
- **Forgetting to renumber after add/delete** — merge will skip or duplicate slides.
- **Changing slugs on rename** — breaks references; rename NN prefix only.
- **Not re-merging after image change** — PPTX/PDF stay stale.
