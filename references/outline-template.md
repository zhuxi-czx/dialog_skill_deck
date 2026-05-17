# Outline Template

Save the deck outline to `outline.md` using this structure. The outline is the **single source of truth** for subsequent prompt generation — it contains the verbatim `STYLE_INSTRUCTIONS` block so Step 5 never re-reads style files.

---

## Metadata

```yaml
topic: <topic>
slug: <topic-slug>
style: <preset name>
audience: <audience>
language: <detected ISO code, e.g. zh / en>
slide_count: <N>
generated_at: <ISO timestamp>
```

## STYLE_INSTRUCTIONS

Wrap the entire content of `references/styles/<preset>.md` in this block, verbatim:

```
<STYLE_INSTRUCTIONS>

# <preset name>

<full content of the preset .md file>

</STYLE_INSTRUCTIONS>
```

## Slides

Repeat the following block for each slide:

```markdown
### Slide N: NN-slide-<slide-slug>

- **Type**: Cover | Content | Back Cover
- **Title**: <headline in source language>
- **Sub-headline**: <optional secondary headline>
- **Narrative Goal**: <one sentence — what the audience should take away>
- **Key Content**:
  - <bullet 1>
  - <bullet 2>
  - <bullet 3>
- **Visual Description**: <what the hero image depicts, in concrete terms>
- **Layout**: <from layouts.md, e.g. centered-hero / hero-left-text-right / split-comparison; omit for default>
- **References**: <list of ref files if applicable; omit otherwise>
```

## Conventions

- **Slide numbering**: 2-digit zero-padded (`01`, `02`, …) — sortable in shells
- **Slide slugs**: 2-4 words, kebab-case, stable across renumbering
- **First slide**: always type `Cover`
- **Last slide**: always type `Back Cover` (synthesis + close)
- **Slides between**: type `Content`
- All text in the outline (titles, body, visual descriptions) is in the source content's language. Internal field labels (Type / Title / etc.) stay in English for stability.
