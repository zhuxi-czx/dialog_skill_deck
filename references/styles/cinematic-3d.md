# cinematic-3d

Cinematic dark-mode popular-science deck — photoreal-ish 3D renders on deep navy with glow accents, dramatic lighting, and gradient-bordered insight cards. Designed for high-impact public lectures and keynote-style science communication.

## Design Aesthetic

Dramatic, high-production-value science communication aesthetic. Each slide is built around a large stylized 3D rendering (close to ray-traced quality without crossing into uncanny photoreal) sitting on a deep navy stage with subtle isometric grid. Industrial materials (brushed steel, glass, ceramic), flowing energy (curved light trails, particle systems), and volumetric glow are routinely used to convey scale and force. Bold sans-serif Chinese headlines anchor each slide; one prominent gradient-bordered card per slide holds the "insight". The mood is closer to a Nature Video / WIRED-style explainer or a top-tier conference keynote than a textbook.

**This style explicitly overrides the base-prompt "hand-drawn quality" instruction.** Cinematic 3D rendering with stylized photorealism is intended — neither sketch nor flat illustration.

## Background

- Color: Deep Navy (#0B1530) primary; gradient acceptable: #0B1530 → #0E2244 vertical
- Texture: Faint isometric grid in #1A2A4A at ~5% opacity; optional subtle vignette
- Optional credentials banner at top-left in pill shape (e.g., source institution + topic + format tag) using #1A2A4A fill with white text

## Typography

### Primary Font (Headlines)

Heavy/Black-weight modern sans-serif in pure white #FFFFFF. Chinese: Source Han Sans SC Heavy or PingFang SC Semibold. English: Inter Black or Helvetica Now Display Black. Slide titles are short, declarative, and may use a colon pattern: "Concept: Insight" / "概念：洞察". No all-caps for Chinese; English subtitles may use small caps.

### Secondary Font (Labels)

Same family, regular weight, smaller. Bilingual format on technical callouts is welcome but not required — match source content's language. Labels connect via thin (~1.5px) cyan or warm-white leader lines, optionally with a small filled circle marker at the subject end.

### Body Font

Same family, regular. Insight-card body text in slightly muted #D8E4F0 against the card background. Numeric data and units in mono-spaced accent font (e.g., JetBrains Mono) where precision matters.

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Deep Navy | #0B1530 | Primary stage |
| Background Deep | Navy Gradient End | #0E2244 | Optional gradient bottom |
| Grid Lines | Muted Navy | #1A2A4A | 5% opacity isometric grid |
| Primary Text | Pure White | #FFFFFF | Headlines, key labels |
| Body Text | Soft White | #D8E4F0 | Card body, secondary annotations |
| Muted Text | Slate | #7A8AA8 | Captions, attribution, watermarks |
| Tech Accent | Electric Cyan | #4DD0E1 | Leader lines, energy, info highlights |
| Warm Accent | Amber Glow | #FFB74D | Particles, energy hotspots, warnings |
| Material Cool | Steel Blue | #5B7CA8 | Industrial surfaces, structural elements |
| Material Warm | Burnt Orange | #D97757 | Reactive elements, "force" visualizations |
| Card Border Start | Gold | #C9A24C | Insight card gradient border (top) |
| Card Border End | Cyan | #4DD0E1 | Insight card gradient border (bottom) |
| Card Fill | Translucent Navy | #15264A | 90% opacity over background |

Avoid: pastel hues, flat icon colors, neon saturation, light backgrounds.

## Visual Elements

- **One hero 3D rendering per slide**, occupying 50-70% of canvas — either full-bleed behind text or in a defined zone
- Stylized photorealism: ray-traced reflections / refractions allowed; volumetric light shafts; bloom on emissive elements
- Particle systems and curved energy trails to convey motion, flux, or interaction
- Glowing nodes / connection points on technical structures (cyan or amber)
- Insight cards: rounded-corner rectangles with thin gold→cyan gradient border, translucent navy fill, holding the slide's key takeaway in 1-2 sentences
- Subtle scale references and dimension annotations where applicable
- Credentials banner pill at top-left (optional, e.g., "MIT | Biochemistry Essentials | Visual Doc")
- Watermark area reserved bottom-right (small, low-opacity)

## Density Guidelines

Medium-low. One hero 3D + 1 insight card + 3-6 floating labels + optional comparison frame. Avoid bullet lists; prefer compact insight cards. White space is intentional — let the 3D breathe.

## Style Rules

### Do

- Render hero subjects with stylized ray-traced quality on the deep navy stage
- Use cyan + amber as the two anchor accents; reserve other accent hues for clearly different semantic roles
- Place exactly one insight card per slide with gradient border + translucent navy fill
- Use thin leader lines to connect labels to subject features
- Keep headline-to-image proportion dramatic — 3D dominates visually
- Add subtle volumetric lighting and bloom on emissive elements for atmosphere

### Don't

- Use flat icon-style illustrations or pastel/light backgrounds
- Render in fully uncanny-valley photoreal (think Pixar/Apple keynote, not stock photography)
- Cram more than one hero subject per slide
- Use bullet lists, paragraph body copy, or table layouts as the main content carrier
- Apply hand-drawn aesthetics (no pencil, no watercolor, no sketch lines)
- Add slide numbers, footers, headers, page logos (insight card replaces "key takeaway box")

## Best For

High-end popular-science deep dives, keynote-style technical lectures, public science communication targeting general audiences, conference visualization documents, "wow-factor" pitches that need to convey scientific gravitas without being a textbook. Topics: molecular/quantum scale phenomena, energy systems, frontier physics/biology/AI, cosmology, materials science. Output language tracks source content.
