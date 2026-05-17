# Content Analysis Framework

Before outline generation, analyze the source content to extract structure, audience signals, style routing, AND a narrative arc. Save findings to `analysis.md`.

## 1. Message Hierarchy

- **Core message** (≤15 words): the single most important takeaway.
- **Supporting points** (3-5): evidence that backs the core message.
- **Call-to-action** (optional): what the audience should do after viewing.

Order by audience relevance, not source order.

## 2. Audience Fit

| Audience | Content Focus | Visual Treatment |
|---|---|---|
| Executives | Outcomes, strategic impact, ROI | High-level, clean, data highlights |
| Technical | Architecture, implementation, specs | Detailed diagrams, schematics, code |
| General | Benefits, stories, relatability | Visual metaphors, simple charts |
| Learners | Step-by-step, examples, practice | Progressive reveals, exercises |
| Investors | Market, traction, team | Growth charts, milestones |

## 3. Topic Signals (Style Routing)

Scan the source for keywords that match the Auto-Selection table in `SKILL.md`. Record matched signals and the routed preset.

Routing priority:
1. Explicit `--style` flag in current request
2. `preferred_style` in `EXTEND.md`
3. First Auto-Selection row whose signals match
4. Fall back to `bio-3d` (safe default for science content)

When signals match multiple presets, pick the first match in table order.

## 4. Language Detection

Detect the source's primary language. Output language tracks this — no translation.

Mixed-language sources: pick the dominant language; treat occasional foreign terms as terminology to preserve verbatim.

## 5. Slide Count from Length

| Source length | Recommended slides |
|---|---|
| <1000 words | 5-10 |
| 1000-3000 words | 10-18 |
| 3000-5000 words | 15-25 |
| >5000 words | 20-30 (consider splitting) |

## 6. Narrative Arc (NEW v0.2.0)

A deck is a story. Assign each slide a **narrative beat** that drives composition density (see `references/base-prompt.md` for how beats modulate visuals).

| Beat | Purpose | Composition Energy |
|---|---|---|
| `hook` | Grab attention, set stakes | Highest drama, single bold focal point |
| `setup` | Establish context, frame the problem | Balanced, calm, informative |
| `development` | Deliver evidence, explanations, examples | Standard preset density |
| `climax` | The key insight / "so what" moment | Maximum density allowed by preset |
| `resolution` | Synthesize, close, hand off | Quieter, more negative space |

### Default Beat Distribution

For an N-slide deck:

| Slide | Beat |
|---|---|
| 01 (Cover) | `hook` |
| 02 | `setup` |
| 03 to N-3 | `development` (with `setup` or `climax` insertions per content) |
| N-2 (or earlier "the so what" slide) | `climax` |
| N-1 | `resolution` (lead-in) |
| N (Back Cover) | `resolution` |

### Assignment Heuristic

Reading the content section by section:

- **Beginning sections** (context, history, why this matters) → `setup`
- **Middle sections** (mechanisms, examples, data) → `development`
- **The "aha" or main insight section** → `climax` (usually one slide, occasionally two)
- **Conclusion / takeaways / next steps** → `resolution`

If no clear climax exists in the content, mark the densest evidence slide as `climax`.

## 7. Visual Opportunity Map

For each piece of content, identify the right visual treatment:

| Content type | Visual treatment | Default Layout |
|---|---|---|
| Comparison | Side-by-side, before/after | `split-comparison` |
| Process | Flow diagram, numbered steps | `stacked-process` |
| Hierarchy | Tree, pyramid, layered diagram | `centered-hero` |
| Timeline | Horizontal/vertical timeline | `centered-hero` |
| Statistics | Highlighted number, simple chart | `annotated-graph` |
| Concept | Metaphor, central illustration | `centered-hero` |
| Relationship | Network, Venn diagram | `centered-hero` |
| Enumeration | Grid of thumbnails, icon row | `grid-thumbnails` |
| Dense reference | Single complex diagram + callouts | `diagram-with-callouts` |

## 8. Keep / Simplify / Visualize / Omit

For each section of source content:

- **Keep**: Core arguments, unique insights, audience-relevant examples, memorable quotes
- **Simplify**: Long explanations → 3-bullet summary; multiple examples → best 1-2
- **Visualize**: Data tables → highlighted numbers; process descriptions → flow diagrams; comparisons → side-by-side
- **Omit**: Tangents, redundant examples, excessive caveats, background the audience already knows

## 9. Analysis Output

Save to `analysis.md`:

```yaml
topic: <topic>
slug: <topic-slug>
language: <detected>
source_length_words: <N>
recommended_slide_count: <N>
recommended_style: <preset>
matched_signals: [<keyword1>, <keyword2>, ...]
audience: <recommended audience>
core_message: <≤15 words>
supporting_points:
  - <point 1>
  - <point 2>
  - <point 3>
call_to_action: <optional>
narrative_arc:
  - slide: 01
    beat: hook
    content_section: "<source section title>"
  - slide: 02
    beat: setup
    content_section: "..."
  # ... one entry per slide
visual_opportunities:
  - section: <section title>
    treatment: comparison | process | ...
    layout: <recommended layout>
```

This file is the input to Step 2 confirmation, Step 3 outline generation, and Step 5 prompt generation.
