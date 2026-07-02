# Design Prompts

## Phase: Convergence and Blueprinting (Weeks 2-3)

Use with Claude unless otherwise specified. Always paste the Claude Rules system prompt first.

---

### 1. Generate Concept Ideas
**AI:** Claude
**Task:**
```
Generate 15 concepts for reducing cabin waste through choice architecture and behavioral design. Each concept must:
- Require zero hardware changes to aircraft or airport
- Integrate into existing passenger and crew workflows
- Create zero boarding delay
- Nudge behavior rather than强制 it
- Target at least SDG 12.3 or SDG 13

Cover these categories (5 each):
- Boarding gate interventions
- In-flight service design
- Post-flight/arrival systems

For each concept: one-line description, behavioral mechanism, expected impact.
```

### 2. Evaluate and Score Concepts
**AI:** Claude
**Task:** Paste your list of concepts:
```
Score each concept on a 1-5 scale for:
- Feasibility (can airlines implement this next quarter?)
- Impact (how much waste would this actually reduce?)
- Cost (low to high)
- SDG alignment (how directly does it advance SDG 12.3 / 13?)
- Passenger acceptance (would travelers resist?)
- Judge appeal (would Boeing find this impressive?)

Provide a total score and rank them. Identify the top 3 and explain why each stands out.
```

### 3. Deep-Dive Winning Concept
**AI:** Claude
**Task:**
```
Take the winning concept and produce a detailed system blueprint:

1. **The Friction Point:** What specific behavior are we changing? Why does the current default lead to waste?
2. **The Intervention:** Exactly what changes at the touchpoint? Step by step.
3. **Passenger Flow:** Describe the experience from the passenger's perspective.
4. **Crew Flow:** Describe what cabin crew do differently.
5. **Behavioral Mechanism:** Which choice architecture principle(s) drive the change?
6. **SDG Proof:** How does this measurably advance SDG 12.3 and SDG 13?
7. **Operational Integration:** How does this fit existing workflows without adding time?
8. **Counter-Arguments:** Pre-empt the top 3 objections from a Boeing engineer.
```

### 4. Pre-Mortem
**AI:** Claude
**Task:**
```
Roleplay as three personas reviewing this concept:
1. A Boeing engineer — focus on operational feasibility
2. An airline CFO — focus on cost and ROI
3. A cabin crew member — focus on practical implementation

Each persona should identify: top 3 concerns, what they would need to approve this, and what would make them reject it.
```

### 5. Refine Based on Feedback
**AI:** Claude
**Task:** Paste pre-mortem results:
```
Address each concern raised in the pre-mortem. For each:
1. Acknowledge the valid concern.
2. Adjust the design or provide a counter-measure.
3. Explain why the improved version still meets our constraints.
```

### 6. Napkin Diagram Brief
**AI:** Claude (for text) → Napkin (for diagram)
**Task:**
```
Write a step-by-step description of our system flow suitable for converting into a Napkin diagram. Use exactly 8 steps. Each step must be under 4 words. Use left-to-right chronological order.
```

### 7. Passenger Journey Map Text
**AI:** Claude
**Task:**
```
Describe the full passenger journey through our system. Break it into: Before (current behavior), During (our intervention), After (new behavior). For each phase: what the passenger sees, what they do, what happens as a result. Write in present tense, second person ("You arrive at the gate...").
```
