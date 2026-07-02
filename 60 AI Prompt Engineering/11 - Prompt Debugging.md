# Prompt Debugging

## When an AI Gives You Bad Results

Before changing tools, check these common failure modes.

---

## Common Problems and Fixes

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| AI invents statistics | Missing system prompt constraint | Add "Never invent data. If unsure, state uncertainty." |
| Output is too generic | No role assigned | Start with "You are [specific role]." |
| Ignores our constraints | Constraints not in the prompt | Add the Golden Rules from AI Operating Manual |
| Too creative, not practical | No feasibility emphasis | Add "Think like an airline executive before thinking like a designer." |
| Wrong format | No output structure specified | Specify: "Return as a table / bullet list / markdown sections." |
| Too long | No length limit | Add "Maximum [X] words." or "Summarize in 3 bullets." |
| Hallucinating sources | Wrong AI for the task | Switch from Claude to NotebookLM or Perplexity for fact-based tasks |
| Repetitive answers | Prompt too vague | Add examples of what you want. Be more specific. |

---

## Anti-Patterns to Avoid

### The Open-Ended Prompt
```
Tell me about aviation sustainability.
```
**Problem:** Too broad. AI picks random focus.
**Better:**
```
Identify 3 specific behavioral friction points in airline cabin waste disposal. For each: describe the current behavior, why it happens, and one choice architecture fix.
```

### The Hidden Assumption Prompt
```
Design a system for separating waste on planes.
```
**Problem:** Assumes physical separation is the solution. May generate hardware.
**Better:**
```
Design a behavioral system for reducing cabin waste. Zero new hardware. Must use choice architecture within existing workflows.
```

### The No-Constraint Prompt
```
Generate ideas for sustainability.
```
**Problem:** No guardrails. Will generate ideas that violate competition rules.
**Better:**
```
Generate ideas for aviation sustainability that require zero hardware changes and no standalone apps. Must integrate into existing airline operations with zero boarding delay.
```

### The Trust-But-Don't-Verify Prompt
```
What is the current recycling rate for airline cabin waste?
```
**Problem:** AI may guess or use old data. No opportunity to catch bad info.
**Better:**
```
What is the most recent global recycling rate for airline cabin waste? Provide the source, publication date, and confidence level. If data is older than 2022, flag it as potentially outdated.
```

---

## Prompt Iteration Log

Use this space to document what worked and what didn't.

| Date | AI | What I Asked | What Went Wrong | Fixed Version |
|------|----|-------------|-----------------|---------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## Quick Checklist Before Every Prompt

- [ ] Did I choose the right AI for this task? (Check AI Operating Manual)
- [ ] Did I paste the AI's system prompt?
- [ ] Did I include the Golden Rules constraints?
- [ ] Did I specify output format?
- [ ] Did I add a length limit?
- [ ] Did I provide enough context?
- [ ] Did I forbid hallucination?
- [ ] Did I tell it what NOT to do?
