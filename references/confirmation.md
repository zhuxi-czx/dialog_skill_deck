# Confirmation Questions

Verbatim option copy for the confirmation steps. SKILL.md lists which questions to ask; this file gives the wording. Adapt to the runtime's native user-input tool when needed.

## Step 2: Generation Confirmation (Always)

Batch five questions in one `AskUserQuestion` call (or the runtime equivalent). Display this summary block before the questions:

```
- Content type: <detected>
- Topic: <topic>
- Detected language: <lang>
- Recommended style: <auto-selected preset> (signals: <matched keywords>)
- Recommended slides: <N> (based on <X> words)
```

### Q1: Style

```yaml
header: Style
question: Which visual style for this deck?
options:
  - label: "{recommended_preset} (Recommended)"
    description: Best match based on content signals
  - label: "{alternative_preset_1}"
    description: "{alternative_1_description}"
  - label: "{alternative_preset_2}"
    description: "{alternative_2_description}"
  - label: "Other — I'll specify"
    description: Free text; must be one of bio-3d / cinematic-3d / engineering-blueprint / sepia-whitepaper / engineer-notebook
```

The two alternatives should be the next-best presets given the content signals. If signals are weak, default alternatives to `bio-3d` and `engineering-blueprint`.

### Q2: Audience

```yaml
header: Audience
question: Who is the primary reader?
options:
  - label: General readers (Recommended)
    description: Broad appeal, accessible content
  - label: Beginners/learners
    description: Educational focus, clear explanations
  - label: Experts/professionals
    description: Technical depth, domain knowledge
  - label: Executives
    description: High-level insights, minimal detail
```

### Q3: Slide Count

```yaml
header: Slides
question: How many slides?
options:
  - label: "{N} slides (Recommended)"
    description: Based on content length
  - label: "Fewer ({N-3} slides)"
    description: More condensed, less detail
  - label: "More ({N+3} slides)"
    description: More detailed breakdown
```

### Q4: Review Outline

```yaml
header: Outline
question: Review outline before generating prompts?
options:
  - label: Yes, review outline (Recommended)
    description: Review slide titles and structure first
  - label: No, skip outline review
    description: Proceed directly to prompt generation
```

### Q5: Review Prompts

```yaml
header: Prompts
question: Review prompts before generating images?
options:
  - label: Yes, review prompts (Recommended)
    description: Inspect image-generation prompts first
  - label: No, skip prompt review
    description: Proceed directly to image generation
```

## Outline Review (Step 4)

```yaml
header: Confirm
question: Ready to generate prompts?
options:
  - label: Yes, proceed (Recommended)
    description: Generate image prompts
  - label: Edit outline first
    description: I'll modify outline.md before continuing
  - label: Regenerate outline
    description: Create new outline with different approach
```

## Prompt Review (Step 6)

```yaml
header: Confirm
question: Ready to generate slide images?
options:
  - label: Yes, proceed (Recommended)
    description: Generate all slide images
  - label: Edit prompts first
    description: I'll modify prompts before continuing
  - label: Regenerate prompts
    description: Create new prompts with different approach
```

## Existing Content (Step 1.3)

```yaml
header: Existing
question: Existing content found at slide-deck/{slug}/. How to proceed?
options:
  - label: Regenerate outline
    description: Keep images, regenerate outline only
  - label: Regenerate images
    description: Keep outline, regenerate images only
  - label: Backup and regenerate
    description: Backup to {slug}-backup-{timestamp}, then regenerate all
  - label: Exit
    description: Cancel, keep existing content unchanged
```

## Note: language is never asked

There is no language question. Output language always tracks the source content (detected in Step 1.2).
