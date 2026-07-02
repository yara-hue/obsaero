# LLM Behaviours to Avoid — Team Guide

> **Golden Rule:** Treat an LLM like a highly knowledgeable intern with zero judgment—not an oracle, not a search engine, and not a replacement for human thinking.  
> **The Fluency Fallacy:** Fluent, confident text is not the same as accurate text. Your job is to be the skeptical editor, not the passive recipient.

---

## 1. The "Single‑Prompt" Trap (Lack of Iteration)

| Behaviour | Expecting a perfect final output from one massive prompt. |
|-----------|------------------------------------------------------------|
| Consequence | Generic, middle‑of‑the‑road answers with no substance. |
| **Fix** | **Use multi‑turn dialogue.** <br>1. Outline the mechanics.<br>2. Draft the operational steps.<br>3. Polish formatting only after content is locked. |

---

## 2. "Passive Validation" (Blind Trust in AI Statistics)

| Behaviour | Taking AI‑generated numbers (e.g., waste per flight) directly into your pitch. |
|-----------|--------------------------------------------------------------------------------|
| Consequence | Hallucinated metrics destroy credibility with any expert. |
| **Fix** | **Never use a standard LLM for raw facts.** <br>• Use **NotebookLM** (uploaded PDFs) for document‑locked data.<br>• Use **Perplexity Pro** for current, sourced statistics.<br>• Always verify against primary sources. |

---

## 3. "Constraint Drifting" (Forgetting Your Hard Rules)

| Behaviour | Brainstorming without repeating your project constraints in every prompt. |
|-----------|----------------------------------------------------------------------------|
| Consequence | The model drifts toward solutions that violate your rules (new hardware, standalone apps, delays). |
| **Fix** | **End every prompt with a hard anchor block.** <br>Example: *"Remember: Zero new hardware, no standalone apps, integrate into existing flows, zero boarding delay, support SDG 12 & 13."* |

---

## 4. "The Wall‑of‑Text Copy‑Paste" (Over‑Generic Output)

| Behaviour | Copying AI‑written paragraphs verbatim into slides or documents. |
|-----------|-------------------------------------------------------------------|
| Consequence | Boring, cluttered presentations that read like whitepapers. |
| **Fix** | **Enforce structural layout rules.** <br>• Titles ≤7 words.<br>• Bullet points, not paragraphs.<br>• One idea per slide.<br>• Use **Gamma** for layout, **Claude** for content. |

---

## 5. "The Homogenous Tone" (One Voice Fits All)

| Behaviour | Using the same prompt style for research, design, and pitching. |
|-----------|-----------------------------------------------------------------|
| Consequence | Everything sounds like the same robotic corporate voice. |
| **Fix** | **Force specific personas** for each phase:<br>• Cynical CFO for cost audits.<br>• Engaging storyteller for the hook.<br>• Brutal engineer for stress‑testing.<br>(See *06 - Devil's Advocate* for role‑playing prompts.) |

---

## 6. "Leading the Witness" (Confirmation Bias)

| Behaviour | Asking "Why is this the best solution?" |
|-----------|------------------------------------------|
| Consequence | The AI amplifies your bias and becomes sycophantic. |
| **Fix** | **Ask neutrally for trade‑offs.** <br>• "What are the risks and trade‑offs?"<br>• "Why might this fail?"<br>• "Compare 5 approaches and rank them." |

---

## 7. "Multitasking" (One Prompt, Many Jobs)

| Behaviour | Cramming research, writing, evaluation, and design into one message. |
|-----------|-----------------------------------------------------------------------|
| Consequence | The model loses context; outputs are shallow and confused. |
| **Fix** | **One objective per prompt.** Use separate prompts for separate steps (see your workflow chains in *00 - AI Operating Manual*). |

---

## 8. "The Overcomplication Fallacy" (Longer ≠ Better)

| Behaviour | Writing extremely long prompts hoping for better results. |
|-----------|-----------------------------------------------------------|
| Consequence | The model loses focus and misses key instructions. |
| **Fix** | **Structure, don't bloat.** Include: <br>• Objective<br>• Context<br>• Constraints<br>• Output format<br>Example: See the master prompts in your *01–05* files. |

---

## 9. "Ignoring the Context Window"

| Behaviour | Feeding entire 500‑page documents when you only need a chapter. |
|-----------|-----------------------------------------------------------------|
| Consequence | Higher cost, slower generation, and "lost in the middle" forgetting. |
| **Fix** | **Load only relevant excerpts.** For long documents, use **NotebookLM**'s source‑grounded retrieval rather than dumping everything into Claude. |

---

## 10. "Blank Slate Syndrome" (No Threading)

| Behaviour | Starting a new chat for every follow‑up question. |
|-----------|---------------------------------------------------|
| Consequence | The AI forgets all previous constraints and examples. |
| **Fix** | **Keep conversations in threads.** If you must start fresh, repaste the system prompt and key constraints. |

---

## 11. "Security Slip‑Ups" (Sharing Sensitive Data)

| Behaviour | Pasting PII, passwords, internal code, or proprietary strategies. |
|-----------|-------------------------------------------------------------------|
| Consequence | Data may be stored or used for training—assume everything is public. |
| **Fix** | **Never input sensitive information.** For high‑stakes work, use enterprise‑grade private instances if available. |

---

## 12. "The Cross‑Model Neglect" (Using One Model for Everything)

| Behaviour | Asking one LLM to do all tasks (research, design, fact‑checking). |
|-----------|--------------------------------------------------------------------|
| Consequence | You miss the strengths of specialised tools and get uncorroborated outputs. |
| **Fix** | **Follow your AI Workflow (00)**:<br>• NotebookLM for documents.<br>• Perplexity for current data.<br>• Claude for reasoning.<br>• Napkin for diagrams.<br>• Gamma for slides.<br>• **Cross‑audit** with different models (e.g., Claude writes, GPT critiques, Perplexity fact‑checks). |

---

## Team Checklist Before Accepting Any AI Output

- [ ] **Verified** – Sources are real and cited.
- [ ] **Constrained** – Fits all your hard rules (hardware, apps, delays, SDGs).
- [ ] **Audience‑focused** – Tailored to Boeing judges or the specific stakeholder.
- [ ] **Operationally feasible** – It works in real airport/airline conditions.
- [ ] **Specific** – Could not apply to any other project.
- [ ] **Balanced** – Includes trade‑offs and risks, not just cheerleading.
- [ ] **Comprehensible** – Can be explained in under one minute.

---

## Quick Reference: Behaviour → Fix

| If you notice... | ...apply this fix |
|------------------|-------------------|
| First answer is mediocre | Ask for 3 alternatives and compare them. |
| AI invents statistics | Switch to NotebookLM (uploaded docs) or Perplexity (with sources). |
| Output drifts from constraints | Repaste the hard anchor block at the end of your prompt. |
| Slides are cluttered | Enforce ≤7‑word titles, ≤5 bullets, one idea per slide. |
| All outputs sound the same | Change the persona using role‑playing prompts. |
| AI agrees with everything | Ask "What are the counterarguments?" or run a Devil's Advocate. |
| You get one long blob | Split into separate prompts for each subtask. |
| AI uses outdated info | Use Perplexity with a "2024–2026" recency filter. |

---

## Remember

> **"The goal is not to prove our idea is good. The goal is to discover why it might fail before the judges do."**  
> — *06 - Devil's Advocate*

Use this guide alongside your *11 - Prompt Debugging* file to quickly correct any missteps.  
**Your AI is a thinking partner, not a decision maker.** You are the human‑in‑the‑loop—stay sceptical, stay structured, and always verify.
