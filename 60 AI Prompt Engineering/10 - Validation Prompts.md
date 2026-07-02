# Validation Prompts

## Phase: Ongoing (Weeks 1-4)

Use these to strengthen evidence, verify claims, and prepare for judge scrutiny.

---

### 1. Fact-Check Our Claims
**AI:** Perplexity
**Task:**
```
Fact-check the following claims from our concept. For each: find supporting or contradicting evidence from authoritative sources (IATA, ICAO, FAA, Boeing, peer-reviewed journals). Rate each claim as: Supported / Partially Supported / Unsupported / Contradicted.

Claims:
[Paste your concept's key statistics and assertions]
```

### 2. SDG Alignment Deep-Dive
**AI:** Claude
**Task:**
```
Perform a detailed SDG audit of our concept.

For SDG 12.3 (halve food waste):
- How does our concept directly reduce waste?
- What measurable reduction is realistic?
- What is the mechanism? (prevention, redistribution, recycling?)
- What benchmark do we compare against?

For SDG 13 (climate action):
- What is the CO2 equivalent reduction?
- How do we calculate this?
- What assumptions are we making?

Identify the weakest link in our SDG logic and suggest how to strengthen it.
```

### 3. Evidence Gap Analysis
**AI:** NotebookLM + Perplexity
**Task:**
```
We have evidence for [claim A] and [claim B]. We lack evidence for [claim C].
1. NotebookLM: Search uploaded documents for any support for claim C.
2. Perplexity: Search the web for authoritative sources supporting claim C.
3. Claude: Synthesize findings. If gap remains, suggest how to fill it (survey, interview, proxy data).
```

### 4. Expert Panel Simulation
**AI:** Claude
**Task:**
```
Simulate a Q&A panel with three experts:
1. A behavioral economist — questions our mechanism and nudge validity
2. An airline operations director — questions our integration and timeline
3. An SDG verification specialist — questions our impact measurement

Each expert asks 3 questions. Provide our strongest answer for each.
```

### 5. Quantitative Impact Model
**AI:** Claude
**Task:**
```
Build a simple quantitative model for our concept's impact.

Given:
- [X] passengers per flight
- [Y] flights per day
- [Z] current waste per passenger

Assuming our intervention reduces waste by [A]%:
1. What is daily waste reduction?
2. What is annual CO2 equivalent reduction?
3. What assumptions have the biggest impact on these numbers?
4. What is the range (best case / worst case / most likely)?

State all assumptions clearly. Flag any assumptions that need verification.
```

### 6. Interview Question Generator
**AI:** Claude
**Task:**
```
Generate 10 questions for a semi-structured passenger interview about [topic]. Questions should:
- Be open-ended (not yes/no)
- Reveal current behavior patterns
- Uncover friction points
- Test receptiveness to our intervention type
- Avoid leading the interviewee

Categorize as: behavior, attitudes, barriers, openness to change.
```
