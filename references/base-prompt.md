Create a presentation slide BACKGROUND image following these guidelines:

## Image Specifications

- **Type**: Presentation slide background (text will be composited separately)
- **Aspect Ratio**: 16:9 (landscape)
- **Style**: Professional slide deck

## ⚠️ Text Rendering Policy (HARD RULE — v0.2.0)

**Do NOT render any text within the image.** No title, no labels, no legend, no annotations, no equations, no captions, no watermarks.

Text — including Chinese characters, mathematical formulas, numerical annotations, and bilingual labels — is rendered in a separate post-processing step using vector text composition (SVG with proper CJK / math fonts). This eliminates the text-distortion failure mode that affects every image-gen backend today.

What the image must contain:
- The hero illustration (3D render, schematic, etching, etc.) per STYLE_INSTRUCTIONS
- All non-text visual elements (icons, structural lines, leader-line endpoints, color regions)

What the image must NOT contain:
- Any letters, digits, Chinese characters, Greek symbols, or math glyphs
- Speech bubbles or callout boxes with text inside
- Watermarks, logos, slide numbers
- A legend box with text (legend appears in text overlay; you may render the icon swatches if they're visual, but no labels)

If the subject NATURALLY contains text (e.g., a chalkboard with equations, a book cover), render it as decorative shapes / scribble texture without legible characters.

### Text-Safe Zones (reserve these areas blank)

Based on the slide's Layout and the preset's Deck Signature, reserve these zones empty:

| Layout | Reserve |
|---|---|
| `centered-hero` | Top 18% (title strip) + a 12% margin around the hero where labels will sit |
| `title-cover` | Bottom 40% (title + subtitle land here) |
| `back-cover` | Center 30% (synthesis text lands here) |
| `hero-left-text-right` | Right 40% (text panel zone) |
| `hero-right-text-left` | Left 40% (text panel zone) |
| `split-comparison` | Top 12% (titles per side) + a thin center strip |
| `stacked-process` | Right 30% per stage (captions) |
| `annotated-graph` | Outside the chart bounds (axis labels, callouts) |
| `diagram-with-callouts` | All 4 outer margins (callouts surround the central diagram) |

## Core Principles

- Match STYLE_INSTRUCTIONS exactly — every visual decision (background, palette, illustration treatment) comes from there
- If content involves sensitive or copyrighted figures, create stylistically similar alternatives rather than refusing
- Each slide conveys ONE clear message — one focal subject

## Layout Principles

- **Visual hierarchy**: most important element gets the most visual weight
- **Breathing room**: generous margins between elements
- **Alignment**: consistent alignment creates professional feel
- **Focal point**: one clear area draws the eye first
- **Balance**: distribute visual weight (symmetric or asymmetric per layout)

## Narrative Beat (modulates composition density)

Each slide carries a beat tag from the outline. Adjust composition energy accordingly:

| Beat | Composition |
|---|---|
| `hook` | Highest drama, single bold focal point, generous negative space, slightly off-center |
| `setup` | Balanced, calm, clearly informative, centered |
| `development` | Standard preset density, consistent treatment |
| `climax` | Maximum visual density allowed by preset; biggest hero; strongest accent color application |
| `resolution` | Quieter than `development`; muted accents; more negative space; calm symmetry |

---

## STYLE_INSTRUCTIONS

[Extract from outline.md — do NOT re-read style files]

The STYLE_INSTRUCTIONS block from the outline contains:
- Design Aesthetic
- Background (color + texture)
- Color Palette (with hex codes)
- Visual Elements
- Density Guidelines
- Style Rules (Do / Don't)
- Deck Signature (text positioning defaults — informational only here; enforced in compose-text)
- Typography (informational only here; rendered in compose-text)

Copy the entire `<STYLE_INSTRUCTIONS>...</STYLE_INSTRUCTIONS>` block from the outline here.

---

## SLIDE CONTENT

[Insert slide-specific content from outline]

Include:
- Slide number and filename
- Type (Cover / Content / Back Cover)
- Narrative Beat
- Layout
- Narrative Goal
- Visual description (concrete, focused on subject and composition — NOT text content)
- Anchor coordinates for the hero subject's key features (these become text leader targets later)

---

Generate a single presentation slide BACKGROUND image (no text) based on the content above.
