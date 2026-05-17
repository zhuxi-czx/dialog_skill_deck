# sepia-whitepaper

Cream-paper whitepaper aesthetic with sepia anatomical line illustrations (Da Vinci-style etching) paired with cool steel-blue geometric diagrams. For classical, scholarly, humanities-tinged science communication — research reports, deep-dive long-form, life-science long reads.

## Design Aesthetic

Classical academic whitepaper aesthetic that blends Renaissance anatomical illustration with modern editorial typography. Each slide carries a single elegant illustration: either an organic subject in sepia/brown line work (Da Vinci notebook style, fine cross-hatching for shading) OR a precise geometric/data diagram in cool steel-blue. The two illustration families coexist as a deliberate duality — sepia for the natural/organic, steel-blue for the synthetic/analytical. Background is warm off-white with the faintest paper grain. Typography is restrained, well-spaced, and feels like it belongs in a printed monograph or a Nature long-read PDF.

**This style explicitly overrides the base-prompt "hand-drawn quality" instruction in one direction:** sepia organic illustrations may carry a fine-line etching quality (controlled cross-hatching, no sketchiness), and steel-blue diagrams must be precise geometric — never wobbly.

## Background

- Color: Warm Cream (#F4EDDC) or Soft Vellum (#F0E6D2)
- Texture: Very subtle paper grain, optional vignette at corners
- Optional rounded-corner badge top-right with title-format text ("深度科普与系统级总结白皮书") in slim border, sepia text on transparent fill

## Typography

### Primary Font (Headlines)

Sans-serif with humanist warmth, medium-bold weight, near-black ink. Chinese: Source Han Sans SC Medium or PingFang SC Medium. English: Source Sans Pro SemiBold or Inter Medium. Titles longer-form and contemplative, allowed to wrap onto 2 lines. No all-caps.

### Secondary Font (Labels)

Same family, regular weight, smaller. Anatomical labels float in white space with thin sepia (#8B6B3D) leader lines ending in small arrowheads. Geometric diagram labels use steel-blue (#5B7CA8) leader lines instead. No label boxes; labels float on the cream background. Match source content language.

### Body Font

Serif for body paragraphs is welcome (Source Han Serif SC / Source Serif Pro Regular) to reinforce the editorial feel — sans-serif also acceptable when consistency with title is desired. Slightly muted ink (#3A3528) for body, never pure black.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Warm Cream | #F4EDDC | Primary slide |
| Paper Grain | Vellum | #F0E6D2 | Optional subtle texture |
| Primary Ink | Near Black | #2A2620 | Headlines |
| Body Ink | Warm Charcoal | #3A3528 | Body text |
| Muted Ink | Walnut | #6B5D48 | Captions, attribution |
| Sepia Line | Burnt Sienna | #8B6B3D | Anatomical/organic illustration lines, sepia leaders |
| Sepia Deep | Saddle Brown | #5C4A2E | Cross-hatching, shading on organic subjects |
| Sepia Light | Tan | #B89968 | Highlight on organic, secondary anatomical strokes |
| Steel Blue Line | Cool Steel | #5B7CA8 | Geometric/data diagram lines, technical leaders |
| Steel Blue Deep | Slate Blue | #3F5B82 | Diagram fills (translucent), section anchors |
| Steel Blue Light | Powder Blue | #A8BED8 | Diagram secondary fills, region tints |
| Frame Border | Walnut | #6B5D48 | Optional 1px slide border, badge borders |

Avoid: bright/saturated colors, dark backgrounds, glow/gradient effects, more than the two anchor color families (sepia + steel-blue).

## Visual Elements

- **One central illustration per slide**, either sepia organic (anatomical, botanical, organismic) OR steel-blue geometric (process funnel, layered system, comparison schematic, data chart) — not both jammed into one frame, though a slide may juxtapose a sepia subject on left with a steel-blue diagram on right when the content is explicitly comparative
- Sepia organic illustrations rendered in confident fine line work with controlled cross-hatching for volume; Da Vinci notebook reference, not modern infographic
- Steel-blue geometric diagrams: clean strokes, optional translucent fills (#A8BED8 at 50%), no gradient, no glow
- Floating labels with thin sepia or steel-blue leader lines (match the subject family); arrowheads simple and small
- Optional top-right rounded-rectangle badge with subtitle/format-tag in walnut border + transparent fill
- Multi-layer process diagrams (e.g., 3-layer funnel) rendered in axonometric or stacked frontal view, with right-column annotations explaining each layer
- Insight callout at slide bottom: italic walnut text, prefixed with a tag like "临床洞察 /  Clinical insight:" or "核心要义 / Core insight:" — no box

## Density Guidelines

Medium-low. Per slide: 1 central illustration + 4-8 floating labels + 1 bottom insight line + optional top-right badge. Generous margins, lots of cream breathing room. Never wall-of-text.

## Style Rules

### Do

- Render organic subjects in sepia line work with fine cross-hatching
- Render synthetic/analytical subjects in cool steel-blue precise geometry
- Keep the two color families distinct (sepia for organic, steel-blue for technical) — don't mix one subject across both palettes
- Float labels on the cream background with thin colored leader lines (sepia OR steel-blue per subject)
- Use generous white space; never crowd
- Italicize the bottom insight tag line in walnut

### Don't

- Use color fills or modern flat-icon style on organic subjects
- Apply photoreal renders or 3D shading
- Use bright saturated accents (red, green, blue beyond the steel-blue family)
- Box labels with backgrounds or borders (only the optional top-right badge is allowed a frame)
- Crowd the slide with multiple competing illustrations
- Add page numbers, footers, headers, or logos

## Deck Signature

Text placement and styling values used by `scripts/compose-text.ts`. Positions are fractional `[x, y]` on the image (0,0 = top-left).

```yaml
title:
  position: [0.05, 0.10]
  align: left
  font_family: cjk
  font_size: 40
  font_weight: 500
  color: "#2A2620"
  max_lines: 2

subtitle:
  position: [0.05, 0.20]
  align: left
  font_family: cjk
  font_size: 22
  font_weight: 400
  color: "#3A3528"

top_right_badge:
  enabled: true
  position: [0.95, 0.06]
  align: right
  pill:
    fill: transparent
    border: "#6B5D48"
    border_width: 1
    padding: [6, 12]
    border_radius: 14
  font_family: cjk
  font_size: 14
  color: "#6B5D48"

label_text:
  font_family: cjk
  font_size: 16
  font_weight: 400
  color: "#2A2620"

label_leader_organic:
  color: "#8B6B3D"
  width: 1
  end_shape: arrowhead
  anchor_shape: none

label_leader_technical:
  color: "#5B7CA8"
  width: 1
  end_shape: arrowhead
  anchor_shape: none

bottom_insight:
  enabled: true
  position: [0.05, 0.92]
  align: left
  prefix: "Insight: "
  font_family: cjk
  font_size: 16
  font_weight: 400
  color: "#6B5D48"
  style: italic

legend:
  enabled: false

scale_annotation:
  default_position: bottom-right
  font_family: latin
  font_size: 13
  color: "#6B5D48"
```

## Best For

Life science deep-dive whitepapers (biology, medicine, anatomy, neuroscience, evolution), classical-feeling popular-science long reads, humanities-adjacent science writing, history-of-science decks, philosophy of science / philosophy of mind content, scholarly research reports with both organic (specimen) and analytical (model, system, data) components. Output language tracks source content.
