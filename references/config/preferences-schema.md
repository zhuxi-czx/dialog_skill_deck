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
# auto             — runtime-native tool wins; falls back to only-installed; asks if multiple non-native are present
# ask              — prompt every run regardless of available backends
# <backend name>   — pin to a specific backend (e.g. codex-imagegen, baoyu-imagine)
preferred_image_backend: auto

# Default style preset. Omit (or set to ~) to use auto-routing based on content signals.
# Allowed values: bio-3d | cinematic-3d | engineering-blueprint | sepia-whitepaper | engineer-notebook
preferred_style: ~

# Default audience. Used as the recommended option in Step 2 Q2.
# Allowed values: general | beginners | intermediate | experts | executives
preferred_audience: general

# Concurrent image generation batch size. Clamped to [1, 8].
# Applies when the backend supports native batch or the runtime supports parallel tool calls.
generation_batch_size: 4
```

## Common one-line edits

```yaml
# Always use BioRender-style for everything
preferred_style: bio-3d

# Pin to Codex's built-in imagegen
preferred_image_backend: codex-imagegen

# Force backend prompt every run
preferred_image_backend: ask

# Bump parallelism for fast backends
generation_batch_size: 8
```

## What is NOT configurable here

- **Output language** — always tracks the source content; cannot be overridden globally
- **Custom dimensions** — this skill does not expose a custom-dimensions remix mode; pick one of the 5 presets
- **Confirmation skipping** — always per-request; use "直接生成" / "skip confirmation" in the current message

## Validation

On Step 1.1, the skill reads EXTEND.md, validates each field against the schema, and prints a one-line summary:

```
EXTEND.md loaded: style=auto, backend=auto, audience=general, batch=4
```

Invalid values are reported and ignored (default substituted). Malformed YAML errors out with the file path and parse error.
