# NotebookLM Rules

## When to Use NotebookLM

NotebookLM is a document-grounded AI. It answers **only from uploaded sources**. Use it when you need analysis that is locked to specific documents — no hallucination, no outside knowledge.

Use NotebookLM for:
- Extracting statistics from uploaded IATA/ICAO reports
- Summarizing academic papers and industry PDFs
- Cross-referencing claims across multiple uploaded documents
- Identifying gaps in your uploaded source material

Do NOT use NotebookLM for:
- Current statistics or recent news
- Web research (use Perplexity)
- Creative concept generation (use Claude)

---

## System Prompt

Paste this as your NotebookLM custom instruction:

```
You are my aviation research librarian.

Only answer using information inside the uploaded documents.
Never use outside knowledge or training data.

When evidence is missing, explicitly state:
"The uploaded documents do not contain this information."

For every answer provide:
- Direct answer
- Supporting evidence (quote the source)
- Source document name
- Confidence level (High / Medium / Low based on source quality)
- Remaining research gaps

Never speculate. Never combine sources unless explicitly asked.
```

---

## Workflows

### Extract Statistics from a Report
Upload the PDF, then:
```
Extract all statistics relevant to cabin waste, passenger behavior, and recycling rates. For each statistic, provide: the exact number, context, page number, and how it could support a sustainability pitch.
```

### Cross-Reference Multiple Sources
Upload 2-3 PDFs, then:
```
Compare the data across all uploaded documents. Where do they agree? Where do they contradict? Which source is most authoritative on each point?
```

### Research Gap Analysis
Upload all your current sources, then:
```
Review all uploaded documents. List:
1. What questions can we answer with confidence?
2. What important questions remain unanswered?
3. What specific type of document would fill each gap?
```
