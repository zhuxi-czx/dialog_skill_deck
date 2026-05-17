# Layout Options

Reusable slide layouts a prompt can reference. Most slides default to `centered-hero` — specify a different layout only when content calls for it.

## centered-hero (Default)

Single hero illustration centered. Title above (or below for cover slides). Labels float around the hero with leader lines per preset rules. Use for: general explanation, single-concept slides.

## hero-left-text-right

Hero occupies left 60% of canvas; structured body text or bullet column occupies right 40%. Use for: slides where the visual needs adjacent explanation (mechanism + description, before/after with notes).

## hero-right-text-left

Mirror of `hero-left-text-right`. Useful for visual rhythm across a deck (alternate sides).

## split-comparison

Two equal-weight subjects side by side, separated by a thin divider or whitespace. Often comparing "before / after", "concept A / concept B", "expected / actual". Each side has its own labels.

## stacked-process

3-5 vertically (or horizontally) stacked stages showing a process or workflow. Each stage is a small illustration + caption. Use for: pipelines, multi-step procedures, signaling cascades, ETL flows.

## title-cover

Large title + subtitle + small decorative hero. Used exclusively for Slide 01 (Cover). Background may extend slightly differently than content slides per preset rules.

## back-cover

Synthesis text (1-2 sentences capturing the core takeaway) + small recap visual + optional call-to-action. Used exclusively for the final slide. Quieter than the cover.

## grid-thumbnails

3x2 or 2x3 grid of small subject thumbnails with short captions under each. Use for: enumerating cases, listing components, showing variety of examples.

## annotated-graph

Single chart or graph centered with axis labels, curves, and inline annotations pointing at specific features (peaks, asymptotes, regions). Use for: data-driven slides, derivation results.

## diagram-with-callouts

Single complex diagram (circuit, anatomy, system topology) centered, surrounded by 4-8 callout boxes/labels. Use for: dense technical reference slides.

---

## Choosing a Layout

| Content nature | Suggested layout |
|---|---|
| Single concept, single hero | `centered-hero` |
| Concept + explanation | `hero-left-text-right` |
| Two-way comparison | `split-comparison` |
| Multi-step process | `stacked-process` |
| Data visualization | `annotated-graph` |
| Technical reference | `diagram-with-callouts` |
| Enumerated examples | `grid-thumbnails` |
| Opening slide | `title-cover` |
| Closing slide | `back-cover` |

Layout choice does not override preset rules — the preset's palette, typography, and illustration treatment still apply regardless of layout.
