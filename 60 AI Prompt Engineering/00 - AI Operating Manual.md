::t1:# AI Operating Manual --- AeroSTAR Boeing Challenge::

> Version 1.1 --- Team Standard Operating Procedure

## Pipeline Pivot (read first)

The core concept (AeroMind AI) is LOCKED — submitted before the brief was released. All AI prompts in this manual that reference "generating concepts" or "choosing between ideas" should be read as "generating/choosing FEATURES around the locked concept." The Devil's Advocate prompts are now the highest-priority prompt set, since we cannot pivot away from weaknesses — we must find and mitigate every one.

See [[01 Understand Challenge/C - Locked Core Concept]] for the locked concept and its Brief Alignment Strategy.

## Mission

Use the right AI for the right job. Every prompt must obey:

-  Zero new aircraft hardware
-  No standalone mobile apps
-  Integrate into existing airline workflows
-  Zero boarding or operational delays (10-Second Rule)
-  Explicitly support SDG 12 and SDG 13
-  Think like Boeing and an airline operator first

---

# AI Workflow

1. **NotebookLM** → Extract evidence from uploaded PDFs only.
2. **Perplexity Pro** → Find current facts, statistics, and external validation.
3. **Claude Pro** → Design systems, blueprints, scripts, and strategy.
4. **Napkin AI** → Convert systems into clean workflow diagrams.
5. **Gamma** → Build the presentation deck.

Never skip verification before design.

---

# Task-to-AI Reference

| Task                       | Best AI                 | Why                                    |
| -------------------------- | ----------------------- | -------------------------------------- |
| Read and analyze PDFs      | NotebookLM              | Zero hallucinations, document-locked   |
| Find latest statistics     | Perplexity              | Live web search, authoritative sources |
| Verify evidence            | NotebookLM              | Evidence-only mode                     |
| Build system blueprint     | Claude                  | Best reasoning, multi-step logic       |
| Write scripts              | Claude                  | Strong structural editing              |
| Judge simulation           | Claude                  | Multi-role persona reasoning           |
| Generate diagrams          | Napkin                  | Automatic text-to-diagram              |
| Build slides               | Gamma                   | Presentation-native engine             |
| Fact-check claims          | Perplexity              | Current web sources                    |
| Identify research gaps     | NotebookLM + Perplexity | Internal then external sweep           |
| SDG alignment audit        | Claude                  | Constraint checking across targets     |
| Find weaknesses in concept | Claude                  | Long-context multi-role reasoning      |
| Pitch deck final pass      | Gamma                   | Slide-level optimization               |

---

# Workflow Chains

### Research Chain
NotebookLM (extract from PDFs) → Perplexity (verify with current data) → Claude (synthesize findings) → Sources Database (log results)

### Concept Chain
Claude (generate features from research) → Feature Evaluation Matrix (score) → Claude (refine enriched concept) → Concept Blueprint (document)

### Pitch Chain
Claude (draft narrative) → Napkin (create diagrams) → Gamma (build slides) → Devil's Advocate (stress-test) → Gamma (final polish)

### Validation Chain
Perplexity (find supporting sources) → NotebookLM (verify against docs) → Claude (audit SDG alignment) → Validation folder (log proof)

---

# NotebookLM — Research Librarian

## Best For
- Reading PDFs
- Aviation reports
- Academic papers
- Source verification

## Don't Use For
- Current events
- Latest statistics
- Creative brainstorming

## Master Prompt
```
You are my aviation research librarian.

Only answer using information contained inside the uploaded documents.
Never use outside knowledge.

If the answer cannot be found, say:
"The uploaded documents do not contain enough evidence."

For every response include:
1. Direct answer
2. Supporting evidence
3. Source document
4. Confidence (High/Medium/Low)
5. Research gaps

Never speculate.
```

---

# Perplexity Pro — Intelligence Analyst

## Best For
- Current statistics
- Boeing ESG
- IATA / ICAO
- Behavioral economics case studies

## Master Prompt
```
You are my aviation intelligence analyst.

Prioritize:
- Boeing, ICAO, IATA, FAA, EASA, ACI
- United Nations, OECD, World Bank
- Peer-reviewed journals

Avoid blogs unless absolutely necessary.

Return:
- Executive summary
- Latest statistics with year
- Publication dates
- Source links
- Contradicting findings
- Confidence level
```

---

# Claude Pro — Systems Architect

## Best For
- System design
- Writing and strategy
- Behavioral economics
- Judge simulations
- Blueprint creation

## Master Prompt
```
You are the Systems Architect for an AeroSTAR Boeing Challenge team.

Always obey:
- Zero aircraft hardware
- No standalone apps
- Existing airline integration only
- Zero operational delay
- SDG 12 + SDG 13 required
- Passenger-first but airline-feasible

When answering:
1. Challenge assumptions.
2. Identify operational risks.
3. Suggest improvements.
4. Reject unrealistic ideas.
5. Use structured markdown.
6. Separate facts from assumptions.
7. Explain why behavioral change occurs.
8. Optimize for Boeing judges.
```

---

# Napkin AI — Visual Designer

## Best For
- Flowcharts
- System maps
- User journeys
- Decision trees

## Master Prompt
```
Convert the following process into a visual workflow.

Rules:
- Maximum 10 nodes
- One action per node
- Left-to-right layout
- Kurzgesagt-style
- Labels under four words
- No decoration
- Use decision diamonds only if necessary

Process:
[paste process]
```

---

# Gamma — Presentation Builder

## Best For
- Pitch decks
- Slide layouts
- Speaker flow

## Master Prompt
```
Build an 8-slide presentation.

Audience: Boeing judges
Style: Kurzgesagt

Rules:
- Maximum 7-word titles
- No paragraphs
- Maximum 5 bullets
- One idea per slide
- One visual recommendation per slide
- Finish with measurable impact
```

---

# Golden Prompt Rules

Add these principles before any major prompt:

1. Think step-by-step.
2. Challenge weak assumptions.
3. Prefer systems over features.
4. Explain reasoning.
5. Cite evidence whenever possible.
6. State uncertainty.
7. Optimize for airline feasibility.
8. Keep outputs structured.
9. Minimize passenger friction.
10. Prioritize measurable sustainability outcomes.
