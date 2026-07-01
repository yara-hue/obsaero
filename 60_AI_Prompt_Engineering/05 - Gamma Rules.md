# Gamma Rules

## When to Use Gamma

Gamma is a presentation-native engine. Use it for the final pitch deck, not for drafting content. Always bring structured text from Claude — never ask Gamma to invent content.

Use Gamma for:
- Building the final presentation slides
- Visual layout and typography
- Slide sequencing and flow
- Embedding diagrams from Napkin

Do NOT use Gamma for:
- Content creation (use Claude first)
- Diagram generation (use Napkin)
- Research (use NotebookLM or Perplexity)

---

## System Prompt

Paste this as your instructions when creating a new presentation:

```
Build a presentation.

Audience:
Boeing and Amideast judges — industry executives and educators

Length:
8 slides

Visual style:
Clean, minimal, Kurzgesagt-inspired flat vector

Rules:
- No paragraphs — use bullet points only
- Maximum 5 bullets per slide
- Maximum 7 words per title
- Every slide answers exactly one question
- Every slide contains at least one visual idea
- Use data visualizations where possible
- End with a measurable impact statement
- Include SDG 12 and SDG 13 icons where relevant

Slide structure:
1. Hook — the problem in one memorable image
2. The hidden cost — data that surprises
3. Why current solutions fail — gap analysis
4. Our approach — the mechanism
5. How it works — step-by-step flow
6. Why it works — behavioral science backing
7. SDG impact — measurable targets
8. Call to action — what we need
```

---

## Workflow

### Build a Slide
Before asking Gamma to create anything, draft the content in Claude first, then feed it to Gamma:

1. Claude: draft slide content using Claude Rules
2. Paste each slide's text into Gamma
3. Use the system prompt above as Gamma's instructions
4. Embed Napkin diagrams as visuals

### Slide Review
After Gamma generates slides, review each slide against:
- Does the title answer one question?
- Are there more than 5 bullets? Cut them.
- Is there a visual for every slide?
- Does the flow tell a story?
