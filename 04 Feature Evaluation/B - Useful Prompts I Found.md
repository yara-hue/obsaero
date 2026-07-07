# Useful Prompts I Found

> Prompts that actually worked — saved so I do not forget them.

---

## Claude

### Generate concept ideas
_Tell it the problem, get back 10+ solutions with pros and cons._

```
You are a systems designer for a major airline. Given the problem below,
generate 10 creative solutions. For each, list the pros, cons, and
feasibility score out of 10.
```

### Pre-mortem an idea
_Stress-test a concept before presenting it._

```
Assume this idea failed completely at the competition finals.
Explain exactly why — be specific about operational, cost, and
behavioral reasons.
```

---

## Perplexity

### Find latest aviation data
_Gets current stats from IATA, ICAO, Boeing reports._

```
Search for the most recent data on [topic] from IATA or ICAO reports.
Include year, source, and exact numbers.
```

---

## NotebookLM

### Extract key facts from a PDF
_Paste a PDF and pull out everything useful._

```
Extract all statistics, dates, organizations, and key findings from this
document. Format as a bullet list with source page numbers.
```

---

## Tips that saved time

- **Be specific about year/data source** with Perplexity — "IATA 2024" gets better results than "recent"
- **Claude needs constraints** — tell it what NOT to do (no new hardware, no apps) or it goes wild
- **NotebookLM only reads what you upload** — it does not search the web
- **Save prompts that worked** here so you do not have to re-engineer them

---

[[04 Feature Evaluation/What Is This For|04 Feature Evaluation]] | [[_Project Roadmap]]



# EXECUTION PROMPT — AeroSTAR Vault Replan (Locked-Concept Pivot)

Execute the following changes in order:

You are editing an Obsidian vault at `C:\Users\ehabn\Aerostar-Sustainability-Challenge`. All paths below are relative to that root. The team's core idea is **locked** (submitted before the brief arrived). The vault must pivot from a divergent→convergent pipeline ("find the winner") to an enrichment pipeline ("we have the winner — enrich and bulletproof it").

**The locked concept is AeroMind AI** — a fleet-level "cognitive digital twin" predictive-maintenance platform (NASA CMAPSS benchmark + synthetic fleet data, causal natural-language queries, not certified for airworthiness decisions). Full text is embedded in Phase 2 below.

**Design principles governing every edit:** 0. **The Reframe rules everything.** The brief discourages "engineering solutions" and asks for behavior/systems/communication/design — AeroMind is technology. Since the concept can't change, the framing must: present AeroMind vault-wide as a _decision-support and communication system that changes how airlines think, choose, and act_ (organizational behavior change, waste reduction/SDG 12, fuel/climate impact/SDG 13, storytelling via its natural-language interface). Never describe it vault-wide as "an AI maintenance tool" without this framing.

1. Every stage description must assume a single, locked core concept. No language about "choosing", "narrowing", "selecting a winner", or "idea generation from scratch."
2. Stages 03–04 shift from _idea generation/selection_ to _feature expansion/feature evaluation_ — divergence now happens **around** the locked concept (add-on features, refinements, delivery mechanisms), and convergence selects which _features_ survive, not which _concept_.
3. Stage 05 (Devil's Advocate) is now the single most important quality gate: since the concept can't be swapped, every weakness must be found and mitigated, not avoided by pivoting.
4. The official challenge brief must live inside the vault verbatim, and every stage should trace back to it.
5. Preserve the existing "What Is This For" template structure (Purpose → Inputs → Process → Outputs → Files → Next Stage → Navigation) — rewrite content, keep the skeleton.
6. Hard constraints to reiterate wherever relevant: zero new aircraft hardware, no standalone apps, existing airline integration only, zero boarding delay, SDG 12+13 alignment required.

---

## PHASE 0 — Junk Cleanup (do first; no dependencies)

### File: `_SETUP.md`

**Action:** edit **Details:**

- Delete the blank line and the line containing only `hello` at the very top of the file, so the file starts with its real first heading/content.
- Delete the 4 "simulated peer edit" lines at the bottom of the file (they are the last 4 non-empty lines; each references a simulated peer edit). Remove any trailing blank lines they leave behind.

### File: `_Home.md`

**Action:** edit **Details:** Fix the double-space heading artifact: replace `## Contributions` (two spaces) with `## Contributions` (one space). Do NOT make other _Home.md changes yet — the full table update happens in Phase 5.

---

## PHASE 1 — Folder & File Renames (before any link fixing)

### Rename: `03 Idea Dump` → `03 Feature Expansion`

### Rename: `03 Feature Expansion/A - Idea Pool.md` → `03 Feature Expansion/A - Feature Pool.md`

### Rename: `04 Concept Evaluation` → `04 Feature Evaluation`

### Rename: `04 Feature Evaluation/A - Concept Evaluation Matrix.md` → `04 Feature Evaluation/A - Feature Evaluation Matrix.md`

(If Obsidian is not doing the renames for you, remember these renames will break any `[[Idea Pool]]` / `[[Concept Evaluation Matrix]]` style links — those are caught in Phase 4.)

---

## PHASE 2 — New Files (brief + locked concept anchor)

### File: `01 Understand Challenge/B - Official Challenge Brief.md`

**Action:** create (rewrite if it somehow exists) **Details:** Create with exactly this content:

```markdown
# Official Challenge Brief (verbatim)

> [!important] This is the source of truth. Every feature, research question, and pitch claim must trace back to this brief.

## Making Flight More Sustainable – Beyond the Aircraft

**The Challenge:**
Aviation connects the world—but it also has an environmental impact.
Your challenge is to explore: How can flight become more sustainable
without inventing new aircraft or technology?
Instead of engineering solutions, focus on behavior, systems,
communication, and design.

**What to Focus On:**
- Passenger behavior and awareness
- Waste reduction and reuse
- Smarter travel habits
- Sustainability communication and storytelling
- How airlines or airports encourage greener choices

**What to Create:**
- A sustainability concept or program
- Clear explanation of how it works
- Simple visuals or infographics
- A persuasive pitch presentation

**Key Skills:**
- Critical thinking and systems thinking
- Communication and persuasion
- Creativity and collaboration
- Connecting ideas to real-world impact

**Guiding Question:**
How might we make flight more sustainable by changing how people
think, choose, and act?

---

## Our constraints (from AI Operating Manual)
- Zero new aircraft hardware
- No standalone apps
- Existing airline integration only
- Zero boarding delay
- SDG 12 + SDG 13 alignment required

## Navigation
← [[01 Understand Challenge/What Is This For|Stage Overview]] · [[01 Understand Challenge/A - Evaluation Rubric|Evaluation Rubric]] · [[_Home]]
```

### File: `01 Understand Challenge/C - Locked Core Concept.md`

**Action:** create **Details:** Create with exactly this content:

```markdown
# Locked Core Concept

> [!warning] LOCKED — submitted before the brief was released. This concept CANNOT be changed. We may only: add/remove features around it, refine and enrich it, and research within its topic area.

## The Concept (as submitted)
**AeroMind AI — a cognitive digital twin for aircraft fleets.**
A fleet-level intelligence platform that ingests maintenance, sensor, and operational data across an entire fleet, builds a knowledge graph + predictive models (trained on the NASA CMAPSS benchmark plus clearly labeled synthetic fleet data), and lets operators ask causal, natural-language questions like *"What happens if we delay inspections by 30 days?"* Core thesis: **"the fleet knows more about an aircraft than the aircraft does"** — cross-fleet learning surfaces patterns no single aircraft's data can (e.g., aircraft past 25,000 flight cycles showing a 2.8× higher hydraulic failure rate after corrosion events, p < 0.01, n = 412). Roadmap: reproduce the benchmark paper → make the model causally consistent → build the demo. Explicitly a research/demonstration platform, **not certified for operational airworthiness decisions**.

## ⚠️ Brief Alignment Strategy (READ FIRST — this shapes every stage)
The brief says: *"without inventing new aircraft or technology… instead of engineering solutions, focus on behavior, systems, communication, and design."* AeroMind is a technology platform. Since we cannot change the concept, we must change the **framing**. Our locked concept survives the brief through these lenses — every feature, research question, and pitch line must reinforce them:
1. **Systems thinking, not engineering:** AeroMind is a *decision-support system* that changes how airlines think, choose, and act — the brief's own guiding question. The aircraft and its sensors already exist; we change the *decisions made around them*.
2. **Waste reduction & reuse (SDG 12):** predictive maintenance = fewer prematurely scrapped parts, less unnecessary preventive-maintenance waste, longer component life, smarter parts reuse.
3. **Smarter operational habits:** the "behavior" we change is *organizational* behavior — maintenance planners, fleet managers, and airline decision-makers replacing calendar-driven habits with evidence-driven ones.
4. **Communication & storytelling:** the natural-language interface IS the communication layer — it translates fleet data into narratives that persuade humans to make greener choices. Lean into this hard in the pitch.
5. **Climate impact (SDG 13):** healthier engines burn less fuel; fewer AOG events mean fewer ferry flights and disrupted, inefficient re-routings.
6. **Constraint fit:** no new aircraft hardware ✅ (software on existing data), existing airline integration ✅ (integrates into current MRO/ops systems — never pitch it as a standalone app), zero boarding delay ✅ (back-office, not passenger-facing).

## What "locked" means for our workflow
- ✅ Allowed: new features, refinements, better framing, supporting research, evidence, visuals
- ❌ Not allowed: replacing the concept, changing its core mechanism, drifting outside its topic area

## Brief-fit check
- **Passenger behavior and awareness:** weakest fit — candidate feature territory (e.g., surfacing fleet-health/sustainability stats to passengers as transparency storytelling). Flag for Stage 03.
- **Waste reduction and reuse:** strongest fit — fewer scrapped parts, extended component life, reduced maintenance-material waste (SDG 12).
- **Smarter travel habits:** reframed as smarter *operational* habits — evidence-driven maintenance decisions replacing calendar-driven routines.
- **Sustainability communication and storytelling:** the natural-language interface turns fleet data into persuasive narratives for decision-makers; the pitch should present AeroMind as a communication system as much as a prediction system.
- **Airline/airport encouragement of greener choices:** AeroMind gives airlines the evidence and language to justify greener maintenance and operations choices internally and publicly.

## Navigation
← [[01 Understand Challenge/B - Official Challenge Brief|Challenge Brief]] · [[_Home]]
```

### File: `40 Team Journey/Pivot Note - Locked Concept.md`

**Action:** create **Details:** Create with this content (this is process-artifact gold for judges):

```markdown
# Pivot Note — From "Find the Winner" to "Bulletproof the Winner"

**Date:** {{fill in}}

We submitted our core concept before the official brief was released. That concept is now locked. Instead of treating this as a limitation, we restructured our entire workflow:

- **Old pipeline:** brainstorm widely → evaluate concepts → pick one → develop it
- **New pipeline:** locked concept → expand features around it → evaluate features → stress-test hard (Devil's Advocate) → blueprint → validate → pitch

Key mindset shift: divergent thinking still happens, but at the **feature level**, not the concept level. The Devil's Advocate stage is now our most important quality gate — since we can't pivot away from weaknesses, we must find and mitigate every one.

Biggest challenge we identified: the brief asks for behavior/systems/communication solutions "without inventing new technology" — and AeroMind is a tech platform. Our answer is the Brief Alignment Strategy: frame AeroMind as a decision-support and communication system that changes how airlines think, choose, and act, with SDG 12 (waste from maintenance) and SDG 13 (fuel/CO₂) impact. Turning that constraint collision into a systems-thinking story is itself evidence of the critical thinking the brief rewards.

## Navigation
← [[40 Team Journey/Team Thinking Log|Team Thinking Log]] · [[_Home]]
```

---

## PHASE 3 — Rewrite Stage Overview Files ("What Is This For.md")

Keep the existing template skeleton (Purpose / Inputs / Process / Outputs / Files / Next Stage / Navigation). Rewrite the content as specified. Where a section isn't specified, adapt the existing text minimally so it's consistent with the locked-concept framing.

### File: `01 Understand Challenge/What Is This For.md`

**Action:** edit **Details:**

- **Purpose:** rewrite to: understand the official brief AND map our locked concept against it — identify where the concept already scores well and where it has gaps the enrichment stages must fill.
- **Files:** add `B - Official Challenge Brief.md` and `C - Locked Core Concept.md` to the file list with one-line descriptions.
- **Next Stage:** point to `[[02 Research/What Is This For|02 Research]]` with a note: research is scoped to the locked concept's topic area only.

### File: `02 Research/What Is This For.md`

**Action:** edit **Details:** Rewrite **Purpose** to: targeted research _within the locked concept's topic area_ — evidence, statistics, case studies, and precedents that strengthen the concept and its candidate features. Add one explicit sentence: "We are NOT researching alternative concepts. Every research question must serve the locked concept (see [[01 Understand Challenge/C - Locked Core Concept]])." Update **Outputs** to say outputs feed Feature Expansion (03) and Validation Evidence (07). Update **Next Stage** link text to the renamed `[[03 Feature Expansion/What Is This For|03 Feature Expansion]]`.

### File: `03 Feature Expansion/What Is This For.md`

**Action:** rewrite **Details:** Full rewrite using the standard template:

- **Purpose:** Generate the widest possible pool of _features, refinements, and delivery mechanisms_ that could be added to (or removed from) the locked core concept. This is where divergent thinking now lives — around the concept, not instead of it.
- **Inputs:** Locked Core Concept (01/C), Challenge Brief (01/B), Research findings (02).
- **Process:** Each member (Seif/Marwan/Yara) adds feature ideas to the Feature Pool under their section; every feature must state which brief focus area it serves and which constraint risks it carries (hardware? app? boarding delay?).
- **Outputs:** A populated Feature Pool ready for scoring in Stage 04.
- **Files:** `A - Feature Pool.md`.
- **Next Stage:** `[[04 Feature Evaluation/What Is This For|04 Feature Evaluation]]`.

### File: `04 Feature Evaluation/What Is This For.md`

**Action:** rewrite **Details:** Full rewrite using the standard template:

- **Purpose:** Converge — score every candidate feature and decide what makes it into the final concept. We are selecting _features_, never re-selecting the concept.
- **Inputs:** Feature Pool (03/A), Evaluation Rubric (01/A), constraints list.
- **Process:** Score each feature in the Feature Evaluation Matrix on: brief alignment, feasibility within constraints, impact (SDG 12/13), pitch/storytelling value, and effort. Keep / park / kill each feature.
- **Outputs:** A ranked feature shortlist feeding the Devil's Advocate gauntlet (05) and the Concept Blueprint (06).
- **Files:** `A - Feature Evaluation Matrix.md`, `B - Useful Prompts I Found.md`.
- **Next Stage:** `[[05 Devils Advocate/What Is This For|05 Devils Advocate]]`.

### File: `05 Devils Advocate/What Is This For.md`

**Action:** rewrite **Details:** Full rewrite. Frame this as **the most critical stage in the pipeline**:

- **Purpose:** Since the concept is locked, we cannot dodge weaknesses by pivoting — we must find every flaw a judge could find, first, and mitigate it. This stage is the quality gate everything must pass before Blueprint (06) and Pitch (08).
- **Inputs:** Locked concept + surviving features (04), Rubric (01/A), Judge Persona Analysis (10/A).
- **Process:** Run the Devil's Advocate prompts against the enriched concept; log every objection in the Risk Mitigation Register with a mitigation or an honest "accepted risk"; re-run until no new fatal objections surface. **Objection #1 to pre-load into the register:** _"The brief explicitly says 'without inventing new technology' and 'instead of engineering solutions' — AeroMind is a technology platform."_ Mitigation = the Brief Alignment Strategy in [[01 Understand Challenge/C - Locked Core Concept]] (systems/behavior/communication framing); this objection must have a rehearsed, one-breath answer before the pitch. Other pre-loaded objections: "not passenger-facing at all", "not certified for real decisions — is this just a demo?", "sounds like a standalone app" (answer: it integrates into existing airline MRO/ops systems).
- **Outputs:** A bulletproofed concept + Risk Mitigation Register that doubles as pitch Q&A prep.
- **Files:** `A - Devil's Advocate Prompts.md`, `B - Risk Mitigation Register.md`.
- **Next Stage:** `[[06 Concept Blueprint/What Is This For|06 Concept Blueprint]]`.

### File: `06 Concept Blueprint/What Is This For.md`

**Action:** edit **Details:** Update **Purpose** to: assemble the locked concept + surviving features + mitigations into one coherent program design, with per-module ownership (Seif/Marwan/Yara). Remove any language implying the concept was "chosen" in earlier stages; replace with "locked concept enriched through stages 03–05."

### File: `07 Validation Evidence/What Is This For.md`

**Action:** edit **Details:** Update **Purpose** to make clear validation targets the _enriched locked concept_: surveys/interviews test whether the features and framing resonate, and produce evidence for the pitch. Fix Next Stage link to `[[08 Pitch Studio/What Is This For|08 Pitch Studio]]`.

### Files: `08 Pitch Studio/What Is This For.md`, `09 Final Deliverables/What Is This For.md`, `10 Winning Strategy/What Is This For.md`, `40 Team Journey/What Is This For.md`, `50 Templates/What Is This For.md`, `99 Archive/What Is This For.md`

**Action:** edit (light) **Details:** In each, scan for and replace any phrases like "chosen concept", "winning idea selection", "narrow down ideas", "pick the best concept" with locked-concept framing ("our locked, enriched concept"). Fix any `[[ XX]]` double-space links per Phase 4 rules. In `40 Team Journey/What Is This For.md`, add `Pivot Note - Locked Concept.md` to the Files list.

---

## PHASE 4 — Vault-Wide Link Repair

Search **every `.md` file in the vault** for the broken double-space link pattern and fix:

1. **Pattern:** `[[ NN]]` or `[[ NN Something]]` (note leading double space after `[[` — an emoji-stripping artifact). These originally pointed to `📖 NN.md` files that were renamed to `What Is This For.md`.
2. **Replacement rule:** any link intended to point to a stage folder's overview becomes `[[NN Folder Name/What Is This For|NN Folder Name]]`. Concretely:
    - `[[ 01]]` → `[[01 Understand Challenge/What Is This For|01 Understand Challenge]]`
    - `[[ 02]]` → `[[02 Research/What Is This For|02 Research]]`
    - `[[ 03]]` → `[[03 Feature Expansion/What Is This For|03 Feature Expansion]]`
    - `[[ 04]]` → `[[04 Feature Evaluation/What Is This For|04 Feature Evaluation]]`
    - `[[ 05]]` → `[[05 Devils Advocate/What Is This For|05 Devils Advocate]]`
    - `[[ 06]]` → `[[06 Concept Blueprint/What Is This For|06 Concept Blueprint]]`
    - `[[ 07]]` → `[[07 Validation Evidence/What Is This For|07 Validation Evidence]]`
    - `[[ 08]]` → `[[08 Pitch Studio/What Is This For|08 Pitch Studio]]`
    - `[[ 09]]` → `[[09 Final Deliverables/What Is This For|09 Final Deliverables]]`
    - `[[ 10]]` → `[[10 Winning Strategy/What Is This For|10 Winning Strategy]]`
    - `[[ 40]]` → `[[40 Team Journey/What Is This For|40 Team Journey]]`
    - `[[ 50]]` → `[[50 Templates/What Is This For|50 Templates]]`
    - `[[ 60]]` → `[[60 AI Prompt Engineering/00 - AI Operating Manual|60 AI Prompt Engineering]]` (this folder has no What Is This For)
    - `[[ 99]]` → `[[99 Archive/What Is This For|99 Archive]]`
3. Also fix links referencing the **old names**: any `[[03 Idea Dump...]]` → `[[03 Feature Expansion...]]`; `[[04 Concept Evaluation...]]` → `[[04 Feature Evaluation...]]`; `[[A - Idea Pool]]` / `[[Idea Pool]]` → `[[03 Feature Expansion/A - Feature Pool|Feature Pool]]`; `[[A - Concept Evaluation Matrix]]` / `[[Concept Evaluation Matrix]]` → `[[04 Feature Evaluation/A - Feature Evaluation Matrix|Feature Evaluation Matrix]]`.
4. While scanning, fix any other double-space artifacts inside headings (`##` → `##` ).

---

## PHASE 5 — Content Rewrites in Working Files

### File: `03 Feature Expansion/A - Feature Pool.md`

**Action:** rewrite **Details:** Replace the placeholder gray-text idea examples with a feature-brainstorm structure. Keep per-person sections (Seif t1, Marwan t2, Yara t3). For each feature entry use this row/entry template:

```markdown
### Feature: {name}
- **What it adds to the core concept:** 
- **Brief focus area served:** (behavior / waste / habits / storytelling / airline-airport incentives)
- **Constraint check:** hardware ❌? app ❌? boarding delay ❌? airline integration ✅?
- **Rough effort:** S / M / L
- **Status:** proposed → scored (04) → kept / parked / killed
```

Add a callout at the top: `> [!info] Divergence lives here now — but around the LOCKED concept, AeroMind AI ([[01 Understand Challenge/C - Locked Core Concept]]). Quantity first, judgment in Stage 04. Features that strengthen the brief's weak spots (passenger-facing angle, storytelling, waste metrics) are especially valuable.` Seed each person's section with one example feature to set the pattern, e.g.: "Sustainability Impact Dashboard — AeroMind auto-generates plain-language reports of parts saved from scrap, fuel saved, and CO₂ avoided, for airline ESG communication and even passenger-facing transparency displays."

### File: `04 Feature Evaluation/A - Feature Evaluation Matrix.md`

**Action:** rewrite **Details:** Replace the concept-comparison matrix with a **feature** scoring table. Columns: Feature | Brief Alignment (1–5) | Constraint Fit (pass/fail) | SDG 12/13 Impact (1–5) | Pitch Value (1–5) | Effort (S/M/L) | Verdict (Keep/Park/Kill) | Owner (t1/t2/t3). Add note at top: "We score features, never the core concept — the concept is locked."

### File: `05 Devils Advocate/B - Risk Mitigation Register.md`

**Action:** edit **Details:** Add a callout at the top: `> [!important] This register is our #1 quality gate AND our judge-Q&A prep sheet. Because the concept is locked, every risk must end in a mitigation or a documented accepted risk — "pivot" is not an option.` Keep existing table structure; if the table lacks a "Source (which DA prompt found it)" column, add one.

### File: `01 Understand Challenge/A - Evaluation Rubric.md`

**Action:** edit **Details:** Keep the matrix structure, but add a row/section titled "Locked-concept fit" reminding the team to score the _enriched concept_ against each criterion, and remove or replace any gray placeholder line that says the rubric will be used to compare multiple concepts.

### File: `02 Research/A - Research Questions.md`

**Action:** edit **Details:** Above the per-person sections, add: `> [!info] Scope rule: every question must serve the locked concept's topic area. If a question would only matter for a different concept, delete it.` Replace placeholder example questions with 2–3 seeded examples per person that are generic but concept-serving in shape, e.g. "What evidence exists that {mechanism in our concept} changes passenger behavior?", "Which airlines have run similar programs and what were the measured results?", "What SDG 12/13 metrics can we cite for impact claims?"

### File: `06 Concept Blueprint/A - Concept Blueprint.md`

**Action:** edit **Details:** Keep per-module Seif/Marwan/Yara assignments. Change any header/intro text describing the blueprint as "the concept we selected" to "our locked core concept, enriched with the features that survived Stages 03–05." Add a link to `[[01 Understand Challenge/C - Locked Core Concept]]` and `[[05 Devils Advocate/B - Risk Mitigation Register]]` in the intro.

### File: `60 AI Prompt Engineering/00 - AI Operating Manual.md`

**Action:** edit **Details:** Add a short section near the top titled `## Pipeline Pivot (read first)` stating: the concept is locked; all AI prompts that reference "generating concepts" or "choosing between ideas" should be read as "generating/choosing FEATURES around the locked concept"; Devil's Advocate prompts are now the highest-priority prompt set. Do not rewrite the individual 01–12 prompt files unless one explicitly instructs concept replacement — if one does, add a one-line locked-concept caveat at its top rather than rewriting.

---

## PHASE 6 — Navigation Hubs (last, after all renames/links settle)

### File: `_Home.md`

**Action:** edit **Details:**

- Update the pipeline table: rename rows for stages 03 and 04 to "03 Feature Expansion" and "04 Feature Evaluation"; update all stage links to the Phase-4 link format; update each stage's one-line description to the locked-concept framing (03 = "diverge on features around the locked concept", 04 = "score & select features", 05 = "critical quality gate — bulletproof the concept").
- Add a prominent callout near the top: `> [!important] Core concept is LOCKED → [[01 Understand Challenge/C - Locked Core Concept]]. Pipeline mode: enrich & bulletproof, not search & select.`

### File: `_Project Roadmap.md`

**Action:** edit **Details:**

- Update the Mermaid flowchart node labels: rename "Idea Dump" → "Feature Expansion", "Concept Evaluation" → "Feature Evaluation". Insert a starting node "Locked Core Concept" feeding into Research/Feature Expansion. Visually emphasize Devil's Advocate as the gate (e.g., style the node or label it "05 Devil's Advocate ⛔ QUALITY GATE").
- Update the stage overview text below the chart to match the new stage purposes (copy the one-line Purposes from Phase 3).
- Fix all `[[ XX]]` links per Phase 4.

---

## VERIFICATION CHECKLIST

Run through this after all phases:

- [ ] `_SETUP.md` no longer contains "hello" at top or any "simulated peer edit" lines at bottom
- [ ] Folders `03 Feature Expansion` and `04 Feature Evaluation` exist; `03 Idea Dump` and `04 Concept Evaluation` do not
- [ ] `03 Feature Expansion/A - Feature Pool.md` and `04 Feature Evaluation/A - Feature Evaluation Matrix.md` exist under their new names
- [ ] `01 Understand Challenge/B - Official Challenge Brief.md` exists and contains the brief verbatim
- [ ] `01 Understand Challenge/C - Locked Core Concept.md` exists, contains the full AeroMind AI description AND the Brief Alignment Strategy section (the reframe)
- [ ] `40 Team Journey/Pivot Note - Locked Concept.md` exists
- [ ] Vault-wide search for `[[` (bracket-bracket-double-space) returns **zero** results
- [ ] Vault-wide search for `Idea Dump`, `Idea Pool`, `Concept Evaluation Matrix`, `03 Idea` and `04 Concept` returns zero results outside `99 Archive` and the Pivot Note (historical mentions there are acceptable)
- [ ] Vault-wide search for `##` (heading with double space) returns zero results
- [ ] All 12 `What Is This For.md` files open with the standard template intact and locked-concept framing
- [ ] `_Home.md` table links all resolve (no unresolved links in Obsidian), and the LOCKED callout is present
- [ ] `_Project Roadmap.md` Mermaid chart renders with the renamed stages and the Devil's Advocate gate emphasized
- [ ] No file references the old `📖 NN.md` naming anywhere
-::t1:- [ ] Commit and push (Obsidian Git will auto-sync within 10 min, but do a manual commit with message: `refactor: pivot vault to locked-concept enrichment pipeline`)::