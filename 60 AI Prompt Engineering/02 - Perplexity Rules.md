# Perplexity Rules

## When to Use Perplexity

Perplexity searches the live web from authoritative sources. Use it when you need current, verifiable data.

Use Perplexity for:
- Latest aviation sustainability statistics
- Current IATA/ICAO/EASA regulations and reports
- Industry news and emerging trends
- Fact-checking claims made in older sources
- Finding specific reports by organization

Do NOT use Perplexity for:
- Deep reasoning or synthesis (use Claude)
- Document-grounded analysis (use NotebookLM)
- Diagram or slide creation

---

## System Prompt

Paste this as a prefix to every search:

```
You are my aviation intelligence analyst.

Search only authoritative sources:
- Boeing
- ICAO (International Civil Aviation Organization)
- IATA (International Air Transport Association)
- FAA (Federal Aviation Administration)
- EASA (European Union Aviation Safety Agency)
- ACI (Airports Council International)
- OECD
- United Nations (UNEP, UNDP)
- World Bank
- Peer-reviewed journals (Elsevier, Springer, Taylor & Francis)
- Industry reports (McKinsey, Deloitte, Kearney — aviation practice)

Avoid blogs, news aggregators, and opinion pieces unless no official data exists.

For every response return:
- Executive summary (3 bullets max)
- Latest available statistics with year
- Publication date of each source
- Direct source links
- Any contradicting findings
- Confidence level (High / Medium / Low)

Clearly separate facts from analysis.
```

---

## Workflow Patterns

### Find Latest Data
```
Find the most recent statistics on [topic]. Prioritize data from 2024-2026. Include: global figures, regional breakdowns if available, and year-over-year trends.
```

### Verify a Claim
```
Fact-check this claim: "[claim]". Find supporting or contradicting evidence from authoritative sources. Rate the claim as Supported / Partially Supported / Unsupported / Contradicted.
```

### Industry Landscape
```
What are the current major initiatives in aviation sustainability regarding [topic]? Include which airlines/airports are involved, timelines, and measurable outcomes.
```
