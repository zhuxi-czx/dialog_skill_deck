# Outline Template

Save the deck outline to `outline.md`. The outline is the **single source of truth** for downstream prompt generation, image generation, and text composition.

---

## Metadata

```yaml
topic: <topic>
slug: <topic-slug>
style: <preset name>
audience: <audience>
language: <detected ISO code, e.g. zh / en>
slide_count: <N>
narrative_arc: hook → setup → development → climax → resolution
generated_at: <ISO timestamp>
```

## STYLE_INSTRUCTIONS

Wrap the entire content of `references/styles/<preset>.md` (including its Deck Signature section) in this block, verbatim:

```
<STYLE_INSTRUCTIONS>

# <preset name>

<full content of the preset .md file>

</STYLE_INSTRUCTIONS>
```

## Slides

Repeat this block for each slide. The block has TWO parts: a human-readable Markdown body, plus a `slide_data` YAML structure that drives Step 5 and Step 7.5 deterministically.

```markdown
### Slide N: NN-slide-<slide-slug>

- **Type**: Cover | Content | Back Cover
- **Narrative Beat**: hook | setup | development | climax | resolution
- **Layout**: centered-hero | hero-left-text-right | split-comparison | stacked-process | title-cover | back-cover | grid-thumbnails | annotated-graph | diagram-with-callouts
- **Title**: <headline in source language>
- **Sub-headline**: <optional>
- **Narrative Goal**: <one sentence — what the audience takes away>
- **Key Content**:
  - <bullet 1>
  - <bullet 2>
- **Visual Description**: <what the hero image depicts, in concrete terms>

```yaml slide_data
narrative_beat: setup
layout: centered-hero

text_layer:
  title:
    content: "<headline>"
    # position auto-derived from preset Deck Signature; override only if needed
  subtitle:
    content: "<optional subtitle>"
  labels:
    - content: "<label text>"
      anchor: [0.30, 0.45]      # fractional [x, y] on image (0-1)
      leader_to: [0.40, 0.55]   # where leader arrow points (subject feature)
      side: left                 # left | right | top | bottom — which side of anchor the text sits
    - content: "<another label>"
      anchor: [0.70, 0.30]
      leader_to: [0.60, 0.40]
      side: right
  legend:
    enabled: true
    items:
      - color: "#9BA8B8"
        shape: circle
        text: "<legend entry>"
      - color: "#E8B0B5"
        shape: circle
        text: "<legend entry>"
  scale_annotation:
    content: "400 nm"
  insight_card:                  # used by cinematic-3d, sepia-whitepaper (italic insight)
    enabled: false
    content: ""
    position: bottom-center
```
```

## Conventions

- **Slide numbering**: 2-digit zero-padded (`01`, `02`, …) — sortable in shells
- **Slide slugs**: 2-4 words, kebab-case, stable across renumbering
- **First slide**: always type `Cover`, beat `hook`
- **Last slide**: always type `Back Cover`, beat `resolution`
- **Middle slides**: typically `setup → development → climax → resolution` distributed roughly 20/50/15/15

### Layout × Narrative Beat heuristic

| Beat | Common Layout Choices |
|---|---|
| hook | `title-cover` (for cover) or `centered-hero` (for mid-deck hook) |
| setup | `centered-hero`, `hero-left-text-right` |
| development | `centered-hero`, `split-comparison`, `stacked-process`, `annotated-graph` |
| climax | `centered-hero` with maximum density, `diagram-with-callouts` |
| resolution | `back-cover`, `centered-hero` (quiet) |

### Anchor coordinate guidelines

Anchor `[x, y]` is the position of the LABEL TEXT in fractional image coordinates (0-1, with 0,0 at top-left). `leader_to` is where the leader line ARROW points — usually a feature on the hero subject. The Step 5 prompt generator infers these from the visual description; if uncertain, place labels in the text-safe zones defined per layout (see `references/base-prompt.md`).

All text content in the outline is in the source content's language. Internal field labels (Type / Title / etc.) and the `slide_data` YAML keys stay in English.
