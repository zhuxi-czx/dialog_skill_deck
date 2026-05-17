# engineering-blueprint

Dark-navy engineering blueprint with crisp white line art, isometric grid, and bilingual boxed callouts. For mechanical, physical, and structural-system teaching where every component must be visible, named, and dimensioned.

## Design Aesthetic

Modern industrial blueprint aesthetic that reads like a CAD drawing converted into a teaching slide. Each slide centers on a precise, mechanically-accurate line drawing of a real-world system (machine, apparatus, free-body model, circuit topology, geometric solid) rendered in crisp white strokes on deep navy stage. Information is delivered through dense bilingual callouts in clean rectangular boxes — every visible component is labeled and connected via thin leader lines. Cyan and warm orange accents mark vectors, forces, or specific highlights. The mood is "engineer's poster" — disciplined, dense, technical, but never decorative.

**This style explicitly overrides the base-prompt "hand-drawn quality" instruction.** Crisp CAD-style line work with consistent stroke weight is intended — no wobbly lines, no sketchy shading.

## Background

- Color: Deep Navy (#0F1B2E)
- Texture: Subtle isometric or square grid in #1F2D44 at ~10% opacity, evenly tiled across full slide
- No vignettes, no gradients beyond the flat navy + grid

## Typography

### Primary Font (Headlines)

Modern sans-serif, medium-bold weight, pure white. Chinese: Source Han Sans SC Bold or PingFang SC Semibold. English: Inter SemiBold. Titles short and structural: "Section: Subsystem name" / "右翼支撑系统：尾架的稳定作用". Optional section number prefix in muted style.

### Secondary Font (Labels)

Same family, regular weight, smaller. **Bilingual format mandatory when source contains technical terminology**: "中文术语 (English Term)" inline, with English in parentheses. When source content is single-language, follow source. Each callout sits inside a thin-bordered rectangular box (#3B5070 border, transparent or slightly darker navy fill).

### Body Font

Same family, regular. Bullet body lives inside boxed sections — never floating directly on navy. Numeric labels, equations, axis values in light mono (e.g., JetBrains Mono Light) in white or cyan.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Deep Navy | #0F1B2E | Primary stage |
| Grid | Muted Navy | #1F2D44 | Isometric/square grid at 10% opacity |
| Line Art | Pure White | #FFFFFF | All technical drawing strokes, primary diagram lines |
| Primary Text | Pure White | #FFFFFF | Headlines, label text |
| Box Border | Slate Blue | #3B5070 | Boxed callout borders, section frame borders |
| Box Fill | Translucent Navy | #14243A | 70% opacity inside boxed callouts |
| Vector Cyan | Electric Cyan | #4DD0E1 | Vector arrows (velocity, current, signal), key callout leader lines |
| Vector Amber | Warm Orange | #F2A654 | Force vectors, deflection arrows, "after" state, anomalies |
| Highlight Red | Coral Red | #E57373 | Critical-point indicators, alert |
| Muted Text | Slate | #7A8AA8 | Footnotes, scale captions, unit annotations |

Avoid: pastel hues, paper textures, hand-drawn line variation, more than 4 simultaneous accent colors.

## Visual Elements

- **One hero technical drawing per slide**, dominantly white-stroke line art with consistent ~2px weight
- Boxed bilingual callouts surrounding the drawing — each box on a thin slate-blue border, transparent navy fill
- Thin leader lines (~1px white or cyan) connecting each callout to its target feature, ending in a small open circle or arrowhead
- Vector arrows in cyan (motion, signal) and amber (force, deflection) per physics convention
- Section headers in boxed pill style at top-left
- Optional left-column or right-column text panel for "Core function / 核心功能与作用" lists; multi-bullet but each bullet ≤12 Chinese characters
- Dimension lines with double-arrows for size annotations where relevant
- Free-body diagram conventions when applicable: sign convention boxed, equation derivations stepped 1→2→3 with cyan numbered circles

## Density Guidelines

Medium-high. Per slide: 1 hero drawing + 4-10 boxed callouts + optional left/right text panel + section header. Information density is a feature, but every element must align to an invisible grid. No floating decoration.

## Style Rules

### Do

- Render technical drawings in crisp CAD-style white line art on deep navy
- Box every callout — never float raw text directly on the navy stage
- Use cyan exclusively for motion/signal vectors and amber for force/deflection vectors
- Apply bilingual labels (Chinese primary, English in parentheses) for technical terminology when source has it
- Maintain consistent line weight (~2px for primary drawing, ~1px for leader lines)
- Number multi-step derivations with cyan circled digits (1, 2, 3…)

### Don't

- Use photoreal renders, color fills inside the line drawing, or gradient shading
- Apply pastel palettes, paper textures, or hand-drawn line variation
- Allow callout text to float without a containing box
- Mix more than the defined accent palette (cyan + amber + occasional coral red)
- Place decorative icons, badges, or watermarks
- Use slide numbers, footers, headers, or logos

## Best For

Mechanical engineering teaching (machines, mechanisms, structural systems), physics modeling (free-body diagrams, force analysis, dynamics, kinematics), electrical schematics (when technical-blueprint mode preferred over notebook sketch), CS systems architecture diagrams, controls/signal-flow diagrams, any topic where component-by-component bilingual labeling and dimensional precision matter more than artistic atmosphere. Output language tracks source content; technical terminology gets bilingual treatment per the source.
