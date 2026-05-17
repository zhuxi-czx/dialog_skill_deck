# Content Analysis Framework

Before outline generation, analyze the source content to extract structure, audience signals, and style routing. Save findings to `analysis.md`.

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

When signals match multiple presets, pick the one whose row matched first in the SKILL.md table (table order = priority).

## 4. Language Detection

Detect the source's primary language. The deck's output language tracks this — no translation.

Mixed-language sources: pick the dominant language; treat occasional foreign terms as terminology to preserve verbatim.

## 5. Slide Count from Length

| Source length | Recommended slides |
|---|---|
| <1000 words | 5-10 |
| 1000-3000 words | 10-18 |
| 3000-5000 words | 15-25 |
| >5000 words | 20-30 (consider splitting into multiple decks) |

Override via `--slides <N>` or by user choice in Step 2.

## 6. Visual Opportunity Map

For each piece of content, identify the right visual treatment:

| Content type | Visual treatment |
|---|---|
| Comparison | Side-by-side, before/after |
| Process | Flow diagram, numbered steps |
| Hierarchy | Tree, pyramid, layered diagram |
| Timeline | Horizontal/vertical timeline |
| Statistics | Highlighted number, simple chart |
| Concept | Metaphor, central illustration |
| Relationship | Network, Venn diagram |
| Enumeration | Grid of thumbnails, icon row |

## 7. Keep / Simplify / Visualize / Omit

For each section of source content:

- **Keep**: Core arguments, unique insights, audience-relevant examples, memorable quotes
- **Simplify**: Long explanations → 3-bullet summary; multiple examples → best 1-2
- **Visualize**: Data tables → highlighted numbers; process descriptions → flow diagrams; comparisons → side-by-side
- **Omit**: Tangents, redundant examples, excessive caveats, background the audience already knows

## 8. Analysis Output

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
visual_opportunities:
  - section: <section title>
    treatment: <comparison|process|...>
```

This file is the input to Step 2 confirmation and Step 3 outline generation.
