# engineer-notebook

Light-paper engineering notebook with hand-drawn ink schematics, colored formula boxes, and annotated graphs. For physics derivations, engineering process explanations, and any teaching content where "the process of figuring it out" is the point.

## Design Aesthetic

Engineer's working notebook aesthetic — looks like a scanned page from a graduate student's lab notebook or a Feynman-style teaching scribble, but cleaner and laid out for slide consumption. Each slide carries a hand-drawn-feel ink schematic (circuit, mechanical, physical, or pure diagram) on a light paper background with a subtle coordinate grid. Annotations, equations, and "aha"-callouts sit in differently-colored compact boxes around the diagram, mimicking the way a real notebook layers multiple notes around a central figure. The mood is intimate, exploratory, and pedagogical — the viewer feels like they're watching someone think on paper.

**This style explicitly engages the base-prompt "hand-drawn quality" instruction in a controlled way:** lines should feel hand-inked but disciplined — no shaky lines, no scribbles, no eraser marks. Think Tufte-quality hand drafting.

## Background

- Color: Warm Notebook Paper (#FAF5E8) or Cool Graph Paper (#F4F4EE)
- Texture: Subtle square or dot grid in #DCD4BE at ~25% opacity (visible but quiet)
- Optional very faint horizontal "rule lines" on warm paper variant; no rules on the cool variant
- No vignettes

## Typography

### Primary Font (Headlines)

Sans-serif, medium-bold weight, dark ink near-black. Chinese: Source Han Sans SC SemiBold. English: Inter Medium / SemiBold. Titles are step-style and active: "建立模型：引入励磁电感", "Step 2: Direct Method (Newton)". Section number prefix optional.

### Secondary Font (Labels & Annotations)

Same family, regular weight, smaller. Annotation callouts sit inside colored rectangular boxes with thin colored borders matching the box's accent role (see palette). Equation snippets in mono (JetBrains Mono / IBM Plex Mono). Label leader lines hand-feel but straight, ~1.5px, in dark ink or accent color.

### Body Font

Same humanist sans-serif, regular. Bullets terse (≤14 Chinese chars). Numbered steps with circled digit prefix in accent ink. Match source content language.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background Warm | Notebook Paper | #FAF5E8 | Primary warm variant |
| Background Cool | Graph Paper | #F4F4EE | Primary cool variant |
| Grid | Tan Faint | #DCD4BE | 25% opacity grid lines |
| Primary Ink | Dark Ink | #1A1A1A | Headlines, primary annotations |
| Body Ink | Soft Charcoal | #3A3528 | Body text |
| Schematic Blue | Ink Blue | #3F5B82 | Primary schematic lines, main circuit, main figure |
| Schematic Coral | Coral Red | #D97757 | Secondary schematic, contrast element, "compare" subject |
| Accent Cyan | Cool Cyan | #4A9DB8 | Formula boxes, equation derivation, math accent |
| Accent Amber | Mustard | #C8943A | "Aha" callouts, key insight box, focal indicators |
| Box Border | Same as accent | — | Border matches box's accent role; thin 1.5px |
| Box Fill | White or Paper-tint | #FFFFFF or #FBF8EE | Inside accent boxes |

Avoid: dark backgrounds, glow effects, more than 3 accent colors per slide, photoreal elements.

## Visual Elements

- **One central schematic per slide** — circuit diagram, free-body diagram, physical apparatus sketch, comparative graph, or formula derivation tree
- Hand-inked line quality: clean confident strokes, no shaky variation, no shadow shading; line weight ~2px for primary, ~1px for secondary
- Colored annotation boxes surround the schematic — each box pairs an accent color (border) with white or pale-paper fill. Common roles:
  - Cyan box → equation / 公式推导
  - Amber box → key insight / 核心物理意义 / 关键洞察
  - Schematic blue box → primary explanation / 模型说明
  - Coral box → contrast / alternative interpretation
- Numbered process steps (1, 2, 3) inside small circled badges in accent ink, lined up vertically or horizontally
- Graphs render axis lines in dark ink with axis labels in soft charcoal; primary curve in ink blue, secondary/dashed curve in coral red
- Equations rendered in clean mono with adequate spacing — never crammed
- Free-body diagrams follow physics convention with cyan and amber vectors
- "Step Δ → Step Δ+1" arrows in dark ink between sub-figures when showing derivation flow

## Density Guidelines

Medium-high. Per slide: 1 central schematic + 2-5 colored annotation boxes + optional left-column numbered process + bottom equation strip. Notebook pages are content-dense by nature — embrace it, but keep each box visually self-contained.

## Style Rules

### Do

- Render schematics with confident hand-inked-feel lines (clean, not shaky)
- Use the paper background as part of the design — don't mask it with white panels
- Pair each annotation box's border color with its semantic role (cyan=equation, amber=insight, blue=explanation, coral=contrast)
- Render equations in mono font with breathing room
- Use circled accent-ink digits for numbered process steps
- Keep the grid subtly visible behind everything

### Don't

- Use photoreal renders, dark backgrounds, or glow effects
- Allow lines to feel shaky, scribbled, or erased
- Crowd the schematic with overlapping annotations — keep boxes separated
- Use more than 3 accent colors simultaneously on one slide
- Add slide numbers, footers, headers, or logos
- Place full sentences inside diagram boxes — keep annotations terse

## Best For

Physics derivations (mechanics, electromagnetism, thermodynamics, statistical physics), engineering teaching (circuits, control theory, signal processing, mechanical analysis), step-by-step problem-solving content, "watch me think on paper" pedagogy, mathematical proofs with diagrams, comparative-case engineering analyses. Especially when the content emphasizes the *process* of arriving at an answer rather than the polished result. Output language tracks source content.
