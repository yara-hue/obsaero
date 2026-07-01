# Napkin AI Rules

## When to Use Napkin

Napkin converts text into clean visual diagrams. It works best with highly structured input. Use it for:

- Process workflows and passenger journey maps
- System architecture diagrams
- Decision trees and choice architecture flows
- Before/after comparisons
- Causal loop diagrams

Do NOT use Napkin for:
- General writing (use Claude)
- Data analysis
- Slide decks (use Gamma)

---

## System Prompt

Napkin does not use system prompts in the same way as text AIs. Instead, structure your input as follows:

```
Convert the following process into a clean visual workflow.

Rules:
- Maximum 10 nodes
- Left to right flow
- Flat vector style (Kurzgesagt-inspired)
- No decorative elements
- One action per node
- Keep labels under 4 words
- Use decision diamonds only when necessary
- Optimize for educational diagram style

Process:
[paste step-by-step process here]
```

---

## Workflow Patterns

### Passenger Journey Map
```
Convert this passenger journey into a flow diagram:

Step 1: Passenger books flight online
Step 2: Passenger arrives at airport
Step 3: Passenger checks baggage
Step 4: Passenger passes security
Step 5: Passenger waits at gate
Step 6: Passenger boards
Step 7: In-flight service
Step 8: Passenger deplanes

Highlight intervention points with a different color.
```

### Choice Architecture Flow
```
Diagram this decision process:

Option A (default): [current behavior]
↓ passenger takes default path
Result: [negative outcome]

Intervention: [nudge]
↓ passenger sees choice
Option A vs Option B
↓
If Option A: [modified outcome]
If Option B: [positive outcome]
```

### System Comparison
```
Create a before/after comparison diagram:

BEFORE:
Problem → Current process → Waste

AFTER:
Problem → Our intervention → Reduced waste → SDG impact

Annotate each transition with the behavioral mechanism.
```
