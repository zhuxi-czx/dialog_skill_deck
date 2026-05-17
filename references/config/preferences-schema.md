# EXTEND.md Schema

`EXTEND.md` configures default behavior for this skill. Place it at any of these paths (first hit wins):

| Path | Scope |
|------|-------|
| `<workdir>/.dialog_skill_deck/EXTEND.md` | Project |
| `${XDG_CONFIG_HOME:-$HOME/.config}/dialog_skill_deck/EXTEND.md` | XDG |
| `$HOME/.dialog_skill_deck/EXTEND.md` | User home |

The file is a YAML document. All fields are optional; omitted fields fall back to defaults.

## Schema

```yaml
# Image generation backend selection.
# auto             — runtime-native tool wins; falls back to only-installed; asks if multiple non-native present
# ask              — prompt every run regardless of available backends
# <backend name>   — pin to a specific backend (e.g. codex-imagegen, baoyu-imagine)
preferred_image_backend: auto

# Default style preset. Omit (or set to ~) to use auto-routing based on content signals.
# Allowed: bio-3d | cinematic-3d | engineering-blueprint | sepia-whitepaper | engineer-notebook
preferred_style: ~

# Default audience
# Allowed: general | beginners | intermediate | experts | executives
preferred_audience: general

# Concurrent image generation batch size. Clamped to [1, 8].
generation_batch_size: 4

# Text rendering mode (NEW in v0.2.0)
# hybrid        — (default) image-gen produces background only; SVG text composited
#                 on top via scripts/compose-text.ts. PPTX and PDF both use composited PNG.
# legacy        — Pre-v0.2.0 behavior. Image-gen renders ALL text directly. Skips
#                 compose-text. Use only if your backend is exceptional at CJK / equations
#                 (very rare; current image-gen models struggle).
# editable      — PLANNED v0.3.0. Will produce native editable PPTX text boxes.
#                 In v0.2.0 this value is accepted but treated as 'hybrid' with a warning.
text_rendering_mode: hybrid

# Font preferences (NEW in v0.2.0) — used by compose-text.ts SVG layer.
# Provide an ordered preference list; first available on the system wins.
fonts:
  cjk: ["PingFang SC", "Source Han Sans SC", "Noto Sans CJK SC", "Microsoft YaHei"]
  latin: ["Inter", "Source Sans Pro", "Helvetica Neue", "system-ui"]
  mono: ["JetBrains Mono", "IBM Plex Mono", "SF Mono", "Consolas"]
```

## Common one-line edits

```yaml
# Always use BioRender-style for everything
preferred_style: bio-3d

# Pin to Codex's built-in imagegen
preferred_image_backend: codex-imagegen

# Force backend prompt every run
preferred_image_backend: ask

# Disable hybrid text composition (back to v0.1.0 behavior)
text_rendering_mode: legacy

# Always bake text (uneditable PPTX, but simpler)
text_rendering_mode: composited
```

## What is NOT configurable here

- **Output language** — always tracks source content
- **Custom dimensions remixing** — this skill keeps the 5 presets atomic
- **Confirmation skipping** — always per-request; use "直接生成" / "skip confirmation"

## Validation

On Step 1.1, the skill prints a one-line summary:

```
EXTEND.md loaded: style=auto, backend=auto, audience=general, batch=4, text=hybrid
```

Invalid values are reported and ignored (default substituted). Malformed YAML errors out with file path and parse error.

## System Font Requirements (v0.2.0+)

`compose-text.ts` uses SVG composition with system fonts. The system running the merge must have at least one font from each `fonts:` family.

| Platform | CJK | Latin | Action |
|---|---|---|---|
| macOS | PingFang SC built-in | Helvetica/SF | works out of the box |
| Linux (most distros) | needs `fonts-noto-cjk` | Inter/Noto Sans | `sudo apt install fonts-noto-cjk fonts-inter` |
| Windows | Microsoft YaHei built-in | Segoe UI / system-ui | works out of the box |

If no CJK font is available and source is Chinese, `compose-text.ts` errors with a clear install hint rather than silently rendering tofu (□□□).
