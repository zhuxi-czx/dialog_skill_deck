# bio-3d

Semi-realistic 3D scientific illustration with cel-shaded volume and bilingual labels — BioRender / Nature graphical-abstract aesthetic for popular-science teaching slides

## Design Aesthetic

Stylized 3D scientific illustration for biology, chemistry, anatomy, and life-science concepts. Each slide centers on a single 3D hero structure (cell, organelle, molecule, tissue cross-section, organ system, etc.) rendered with thin charcoal outlines and soft cel-shaded volume. Educational clarity through stylized form, muted pastel palette, and precise leader-line labeling. Think BioRender illustrations, Nature graphical abstracts, and high-end biology textbook figures.

**This style explicitly overrides the base-prompt "hand-drawn quality" instruction.** Stylized 3D illustration with consistent outline weight is intended — neither sketch-style hand-drawn nor photoreal/PBR rendering.

## Background

- Color: Warm Off-White (#FAFAF6) as default; Pure White (#FFFFFF) acceptable
- Texture: None — clean flat background
- Optional: a 1px rounded outer frame in #E5E7EB at slide edge; no inner panels, no patterns, no gradients

## Typography

### Primary Font (Headlines)

Humanist sans-serif, semibold. Suggested: Nunito Semibold, Source Sans Pro Semibold, or Inter. For Chinese: Noto Sans SC Semibold / Source Han Sans SC Medium. Title centered or top-aligned; no all-caps; no decorative brackets.

### Secondary Font (Labels)

Same family, regular weight, smaller size. **Label language must match the source content's language** — English source → English labels only; Chinese source → 中文 labels only; mixed source → mirror the source's mixing pattern. Do not auto-translate or auto-bilingualize. Labels connect to subjects with thin charcoal leader lines ending in a small arrowhead. NO label boxes, NO speech bubbles, NO highlight backgrounds behind label text.

### Body Font

Same humanist sans-serif, regular. Use only for scale annotations (e.g., "400 nm"), caption footnotes, and the legend box contents. No paragraph body copy on slides.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Warm Off-White | #FAFAF6 | Primary slide background |
| Outline | Charcoal | #2D2D2D | All element outlines, label leader lines, dimension arrows |
| Primary Text | Near Black | #1A1A1A | Titles, labels |
| Muted Text | Slate Gray | #6B7280 | Scale captions, secondary annotations |
| Structure Cool | Slate Blue-Gray | #9BA8B8 | Membrane heads, structural shells, bone |
| Structure Cream | Soft Cream | #E8D88A | Lipid tails, internal fibers, soft cores |
| Accent Coral | Coral Pink | #E8B0B5 | Globular proteins, soft tissue, surface markers |
| Accent Sage | Sage Green | #A6C291 | Glycolipids, carbohydrates, plant components |
| Accent Terracotta | Muted Red | #D88B7A | α-helix transmembrane proteins, alert elements |
| Accent Peach | Pale Orange | #F0B673 | Peripheral proteins, enzymes, secondary actors |
| Accent Sky | Soft Sky Blue | #A6C8D8 | Channels, water/aqueous regions, ions |
| Legend Box Fill | Pale Blue Tint | #EEF3F8 | Bottom-right legend background |
| Legend Box Border | Soft Blue | #C7D7E5 | 1px rounded border around legend |

**Avoid**: pure saturated primaries (#FF0000, #00FF00, #0000FF), neon glow, dark backgrounds, more than 6 accent hues per slide.

## Visual Elements

- **One hero 3D structure per slide**, centered or slightly off-center; cover slide may use a smaller hero with title above
- Thin (~2px equivalent) charcoal outlines on every solid form, consistent across the slide
- Soft cel-shaded volume — single top-left light source, no harsh cast shadows, no ambient occlusion noise, no ray-traced reflections
- Floating labels in white space with charcoal leader-line arrows pointing to features (small arrowhead, no boxed callouts)
- All text — title, labels, legend, callouts, scale captions — uses the source content's language (do not translate or bilingualize)
- Bottom-right rounded-corner legend box (pale blue tint fill, soft blue 1px border) summarizing key components: tiny iconic swatch + term
- Scale annotation in bottom-left corner where applicable (e.g., "400 nm" / "10 μm") with a thin double-headed dimension arrow
- Subtle structural brackets (`}` or `{`) to annotate regions (e.g., "Lipid bilayer" / "脂双层" — language matches source)
- Optional spatial labels in top-left and bottom-left to set context (e.g., "Extracellular Space" / "细胞外" — language matches source)

## Density Guidelines

Medium. Per slide: 1 hero diagram + 4-8 labels + 1 legend + 0-1 scale annotation + 0-2 spatial-context labels. No body text blocks, no bullet lists, no multi-panel comparison grids overlapping the hero.

## Style Rules

### Do

- Render every subject as stylized 3D with consistent line weight
- Use only colors from the palette above; reserve specific accents for specific structural roles for cross-slide consistency
- Label every key component in the source content's language
- Reserve bottom-right for the legend box and bottom-left for scale annotation
- Keep exactly one focal subject per slide
- Maintain visual consistency across slides — same outline weight, same lighting direction, same palette discipline

### Don't

- Render photorealistically (no PBR materials, no ray-traced reflections, no realistic skin/cell textures)
- Use hand-drawn sketch aesthetics (no wobbly lines, no pencil shading, no watercolor wash)
- Flatten to 2D icon style — every hero must have cel-shaded volume
- Apply saturated primary colors, neon, glow, or dark backgrounds
- Produce text-only slides — every slide carries the 3D hero
- Add slide numbers, footers, headers, watermarks, or logos
- Place more than one competing 3D subject on a single slide
- Box label text with frames or bubbles (legend is the only allowed boxed element)

## Deck Signature

Text placement and styling values used by `scripts/compose-text.ts` when rendering the text overlay. Positions are fractional `[x, y]` on the image (0,0 = top-left, 1,1 = bottom-right).

```yaml
title:
  position: [0.5, 0.10]
  align: center
  font_family: cjk
  font_size: 40
  font_weight: 600
  color: "#1A1A1A"

subtitle:
  position: [0.5, 0.17]
  align: center
  font_family: cjk
  font_size: 22
  font_weight: 400
  color: "#6B7280"

label_text:
  font_family: cjk
  font_size: 18
  font_weight: 400
  color: "#1A1A1A"

label_leader:
  color: "#2D2D2D"
  width: 1.5
  end_shape: arrowhead
  anchor_shape: none

legend:
  default_position: bottom-right
  padding: 16
  fill: "#EEF3F8"
  border: "#C7D7E5"
  border_width: 1
  border_radius: 8
  item_height: 28
  item_text_font_size: 14
  item_icon_radius: 6

scale_annotation:
  default_position: bottom-left
  font_family: latin
  font_size: 14
  color: "#6B7280"
  arrow: double_headed

frame:
  enabled: false
  color: "#E5E7EB"
  width: 1
  radius: 12

spatial_context_label:
  enabled: true
  font_family: cjk
  font_size: 16
  color: "#6B7280"
  positions: [[0.05, 0.10], [0.05, 0.90]]
```

## Best For

Biology, chemistry, biochemistry, anatomy, microbiology, pharmacology, cell biology, molecular biology, and general life-science popular-science / classroom teaching. Especially: cell structure, organelle anatomy, molecular mechanisms, signaling cascades, anatomical cross-sections, physiological processes. Output language tracks source content (English source → English deck; Chinese source → Chinese deck).
