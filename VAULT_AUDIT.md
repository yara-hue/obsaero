# AeroSTAR Vault — Complete Audit for AI Analysis

Generated: 01 Jul 2026 (updated 07 Jul 2026)
Path: C:\Users\ehabn\Aerostar-Sustainability-Challenge

This document describes every file in the vault — its purpose, the type of content it holds, and how it connects to other files. Use this as a map for an AI to understand the project structure and generate prompt templates for filling the vault.

---

## 1. PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| Competition | AeroSTAR-Boeing Regional Camp (Jordan) |
| Team | 3 members (Seif, Marwan, Yara) |
| Mission | Redesign aviation sustainability via choice architecture, behavioral systems, design thinking |
| Hard constraint | Zero new hardware — only systems, communication, human habits |
| SDG mandate | Each proposal must advance targets within at least 2 UN SDGs |
| Timeline | 4-week sprint (Week 1: Diverge, Week 2: Converge, Week 3: Blueprint, Week 4: Pitch) |
| Vault philosophy | PARA-style organization with AI assistance |
| Collaboration | Git-synced via obsidian-git plugin. Each teammate edits freely — no per-teammate boxes or markers. |
| Input style | All content files use clear section titles with faint placeholder examples (`var(--text-faint)`). Teammates type directly into plain markdown. |

---

## 2. FOLDER MAP

| # | Folder | Function |
|---|--------|----------|
| 00 | Team Foundation | Team agreements, rubrics, protocols — set up once on Day 1 |
| 10 | Research Library | External data: IATA reports, academic papers, NotebookLM syntheses |
| 20 | Concept Design | Brainstorming to evaluation to blueprint pipeline |
| 30 | Pitch Studio | Presentation assets: narrative, script, visuals, Gamma deck |
| 40 | Team Journey | Process documentation for judges: reflections, thinking log, drafts |
| 50 | Templates | Reusable markdown templates for notes |
| 60 | AI Prompt Engineering | AI Operating Manual (13 files: rules per AI, task prompts, debugging, anti-patterns) |
| 70 | Validation and Evidence | Proof: citations, survey data, interview transcripts |
| 80 | Final Deliverables | Locked submission-ready materials |
| 90 | Winning Strategy | Competitive positioning: ESG alignment, judge analysis, risk register |
| 99 | Archive | Deprecated/completed materials |

---

## 3. FILE-BY-FILE DETAILED DESCRIPTIONS

Each entry includes: (a) what the file is for, (b) what kind of content belongs in it, (c) structure, (d) related files, (e) current status.

---

### ROOT

#### -Home.md
- **Role:** Team command center — first thing everyone sees on startup. Pinned tab via Homepage plugin. Sorts first in file explorer.
- **Content:** Flight status header, sprint tracker table, crew manifest with teammate assignments, contribution bar chart, reading roadmap (prioritized 10 files), stamp usage guide, critical north stars briefing.
- **Structure:** Sections separated by ---. Uses HTML divs for contribution bar widget. Wikilinks to each vault folder.
- **Related:** All folders. Homepage plugin opens this on startup. Role Stamper plugin updates the bar section.


---

### 00_Team_Foundation/ — Team identity and rules

#### 00 - Team Foundation.md
- **Role:** Index/directory map for the foundation folder
- **Content:** Lists what is in this folder, explains the folder role in the project. Navigation guide.
- **Structure:** Short index header with FILE PURPOSE and HOW TO USE sections
- **Related:** All files in 00_Team_Foundation/
- **Status:** Placeholder — needs linking to actual files

#### Team Charter.md
- **Role:** Defines team roles, individual strengths, internal performance goals
- **Content:** Commitment hours per teammate, responsibility assignments, success criteria for the 3-person team
- **Structure:** H1 header, FILE PURPOSE section with usage instructions
- **Related:** Crew Manifest section in -Home.md, Communication Protocols.md
- **Status:** Template — needs to be filled in on Day 1 with actual names and commitments

#### Communication Protocols.md
- **Role:** Team alignment rules document
- **Content:** Meeting schedules, sync links (Google Meet/Zoom), file-naming conventions, Obsidian/Lumina plugin configuration checklist
- **Structure:** H1 header, FILE PURPOSE with HOW TO USE
- **Related:** Team Charter.md
- **Status:** Template — needs actual meeting links and schedules

#### Evaluation Rubric.md
- **Role:** Official grading rulebook from competition organizers
- **Content:** Detailed breakdown of AeroSTAR-Boeing challenge grading criteria, mapped to Boeing operational expectations. The absolute scoring reference.
- **Structure:** H1 header, FILE PURPOSE with usage instructions
- **Related:** Concept Evaluation Matrix.md (apply rubric here), Submission Checklist.md (verify against rubric)
- **Status:** Template — needs actual rubric criteria copied from competition brief

---

### 10_Research_Library/ — Knowledge and data collection

#### 10 - Research Library.md
- **Role:** Index/table of contents for all research notes
- **Content:** Links to sub-topic research notes as they are created. Master map of collective intelligence.
- **Structure:** Short index header with links section
- **Related:** All files in 10_Research_Library/
- **Status:** Placeholder

#### NotebookLM Briefings.md
- **Role:** Landing zone for AI-generated research syntheses from Google NotebookLM
- **Content:** Structural outlines, auto-generated FAQs, core data summaries extracted from NotebookLM chat sessions using uploaded PDFs
- **Structure:** Free-form markdown with extracted data points
- **Related:** Sources Database.md (pull verified statistics from here into the master bibliography)
- **Status:** Placeholder

#### Research Questions.md
- **Role:** Active knowledge gaps log
- **Content:** Per-teammate Questions and Findings sections with faint example questions. Each section has a clear header and faint placeholder text guiding what input goes where.
- **Structure:** Per-teammate sections (`## Seif`, `## Marwan`, `## Yara`) with `### Questions` and `### Findings` subsections. Faint example text guides the user.
- **Related:** Sources Database.md (link answers here)
- **Status:** Template with examples — teammates replace faint text with real content

#### Sources Database.md
- **Role:** Central bibliography and verified data repository
- **Content:** Per-teammate source tables with faint example rows. Each entry as a markdown table row with source name, statistic, URL/citation.
- **Structure:** Per-teammate sections (`## Seif`, `## Marwan`, `## Yara`) with markdown tables: Source | Author | Year | Statistic | SDG | Link
- **Related:** Research Questions.md, NotebookLM Briefings.md, Concept Blueprint.md (feed data into the design)
- **Status:** Template with faint example rows

---

### 20_Concept_Design/ — Brainstorming to blueprint pipeline

#### 20 - Concept Design.md
- **Role:** Index for the concept design folder
- **Content:** Tracks evolution from chaotic idea list to one winning blueprint
- **Structure:** Short index header
- **Related:** All files in 20_Concept_Design/
- **Status:** Placeholder

#### Idea Dump.md
- **Role:** Unfiltered brainstorming sandbox (100+ concepts target)
- **Content:** Ideas categorized by domain (Terminal Operations, Cabin Behavior, Communication Style) with per-teammate subsections. Faint placeholder examples in each section.
- **Structure:** Category headers with per-teammate subsections and faint example ideas
- **Related:** Concept Evaluation Matrix.md (best ideas get evaluated here)
- **Status:** Template — this will be the most active file in Week 1

#### Concept Evaluation Matrix.md
- **Role:** Objective screening filter to pick the winning concept
- **Content:** Weighted scoring table scoring top 5+ ideas on: Friction, Feasibility, Cost, SDG Alignment. Highest scorer becomes the final concept.
- **Structure:** Table with weighted columns and total scores
- **Related:** Idea Dump.md (feed ideas in), Evaluation Rubric.md (align weights to rubric), Concept Blueprint.md (winner documented here)
- **Status:** Placeholder

#### Concept Blueprint.md
- **Role:** Definitive master document for the winning concept
- **Content:** Complete system design split by module per teammate: System Overview & Choice Architecture (Seif), Passenger Flow & Crew Interaction (Marwan), SDG Mapping & Operational Integration (Yara). Faint examples guide each section.
- **Structure:** Module sections with tables, checklists, and faint placeholder answers for every design question
- **Related:** Concept Evaluation Matrix.md (winner comes from here), Pitch Studio files (narrative and script derive from this)
- **Status:** Template with guiding examples

#### AI Prompts Library.md
- **Role:** Shared prompt engineering vault
- **Content:** Exact custom instructions, roleplay matrices, and constraints used across Claude, ChatGPT, and Perplexity. Successful prompts saved for team reuse.
- **Structure:** Categorized prompts with notes on when to use each
- **Related:** 60_AI_Prompt_Engineering/ folder (advanced prompts)
- **Status:** Reference — populated with prompts

---

### 30_Pitch_Studio/ — Presentation production

#### 30 - Pitch Studio.md
- **Role:** Index coordinating narrative structure, graphic assets, slide drafts
- **Content:** Links to all pitch materials, status tracking
- **Structure:** Short index header
- **Related:** All files in 30_Pitch_Studio/
- **Status:** Placeholder

#### Narrative Outline.md
- **Role:** Emotional and structural story arc using Hero's Journey framework
- **Content:** Beat-by-beat outline: Hook, Problem, Solution Reveal, Data Drop, SDG Impact Reveal, Call to Action. Each section has faint example text.
- **Structure:** Timed sections with sub-bullets and faint placeholder content
- **Related:** Pitch Script.md (write script from this), Concept Blueprint.md (source material)
- **Status:** Template with examples

#### Pitch Script.md
- **Role:** Exact word-for-word spoken script for the live pitch
- **Content:** Spoken lines side-by-side with slide transition cues. Table format with faint example lines.
- **Structure:** Table: Time | Slide | Visual | Spoken Lines | Cue
- **Related:** Narrative Outline.md, Final Presentation Script.md (locked copy)
- **Status:** Template with faint example rows

#### Visual Assets Tracker.md
- **Role:** Production pipeline for all visual assets
- **Content:** Journey maps, UI mockups, diagrams tracked from outline to final render. Each asset has faint example entries.
- **Structure:** Table: Asset | Type | Status | Tool | Assigned To | Notes
- **Related:** Gamma Deck Link.md (final deck lives there)
- **Status:** Template with faint example rows

#### Gamma Deck Link.md
- **Role:** Access link and structural placeholder for cloud presentation deck
- **Content:** Live link to Gamma presentation, layout notes, typography choices, slide-by-slide feedback table
- **Structure:** Link section + slide feedback table + typography notes, all with faint examples
- **Related:** Visual Assets Tracker.md
- **Status:** Template with examples

---

### 40_Team_Journey/ — Process documentation for judges

#### 📖 40.md
- **Role:** Index for team journey folder
- **Content:** Historical record of project development over the 4-week sprint
- **Structure:** Short index header
- **Related:** All files in 40_Team_Journey/
- **Status:** Placeholder

#### Individual Reflections.md
- **Role:** Personal weekly journal entries from each of the 3 teammates
- **Content:** Each teammate has their own section with Week 1-4 subsections. Faint guiding questions prompt reflection.
- **Structure:** Per-teammate sections (`## Seif`, `## Marwan`, `## Yara`) with `### Week 1-4` subsections and faint example text
- **Related:** Team Thinking Log.md (team-level complement)
- **Status:** Template with guiding examples

#### Team Thinking Log.md
- **Role:** Chronological journal of idea evolution
- **Content:** Major breakthroughs, dead-ends, pivots documented per sprint week. Faint guiding text per week.
- **Structure:** Week 1-4 sections with faint example prompts
- **Related:** Individual Reflections.md, Process Artifact Draft.md
- **Status:** Template with faint guiding prompts

#### Process Artifact Draft.md
- **Role:** Staging ground for the optional written methodology report
- **Content:** Framework explanation, research methods, interview insights compiled into a polished process document
- **Structure:** Sections: Methodology, Key Findings, Design Process, Conclusion — all with faint example text
- **Related:** All research and design files (evidence of process)
- **Status:** Template with guiding examples

#### Drafts/ (folder)
- **Role:** Personal scratchpads created by Role Stamper plugin
- **Content:** Per-teammate draft notes in clean markdown
- **Structure:** One file per teammate: Draft - Teammate X.md
- **Related:** Role Stamper plugin
- **Status:** Created on demand via Ctrl+Shift+D

---

### 50_Templates/ — Reusable note templates

#### 📖 50.md
- **Role:** Index for the template vault
- **Content:** Lists all available templates
- **Structure:** Short index
- **Related:** All tpl_*.md files

#### tpl_Concept_Evaluation.md
- **Role:** Template for deep-diving into a single concept idea
- **Content:** 1-sentence elevator pitch, psychological mechanism (choice architecture), internal pre-mortem (why crew/CFO would reject it, counter-defense)
- **Structure:** Sections: Pitch, Mechanism, Pre-Mortem
- **Related:** Idea Dump.md, Concept Evaluation Matrix.md

#### tpl_Research_Insight.md
- **Role:** Template for logging a research finding from a paper/document
- **Content:** Core aviation metric extracted, target UN SDG alignment, practical application for pitch, source citation
- **Structure:** Sections: Metric, SDG Alignment, Application, Citation
- **Related:** Sources Database.md, Research Questions.md

#### tpl_Meeting_Note.md
- **Role:** Template for meeting notes
- **Content:** Date, attendees, purpose, notes, action items
- **Structure:** Frontmatter-style fields with free-form sections

#### tpl_Weekly_Reflection.md
- **Role:** Template for weekly individual reflections
- **Content:** Author, what went well, what could be improved, key learnings, next steps
- **Structure:** Sections with prompts

---

### 60_AI_Prompt_Engineering/ — AI Operating Manual (13 files, numbered for order)

Number prefixes ensure correct sort order in Obsidian. This folder is an AI operations manual, not a prompt library.

#### 00 - AI Operating Manual.md
- **Role:** Master SOP — which AI for which job, with master prompts for each
- **Content:** Mission constraints (6 rules), 5-step AI workflow pipeline, per-AI sections with Best For/Don't Use/Master Prompt, Task Matrix (10 tasks), Golden Prompt Rules (10 principles)

#### 01 - NotebookLM Rules.md
- **Role:** Document-grounded research guide
- **Content:** System prompt, extraction workflow, cross-reference workflow, gap analysis

#### 02 - Perplexity Rules.md
- **Role:** Live web search guide (authoritative sources only)
- **Content:** System prompt restricting to IATA/ICAO/FAA/Boeing etc., fact-checking, industry landscape

#### 03 - Claude Rules.md
- **Role:** Reasoning, design, and writing guide
- **Content:** System prompt (Systems Architect), task patterns for concept generation, pre-mortem, SDG audit, writing polish

#### 04 - Napkin Rules.md
- **Role:** Text-to-diagram guide
- **Content:** Input structure rules, passenger journey maps, choice architecture flows

#### 05 - Gamma Rules.md
- **Role:** Presentation builder guide
- **Content:** 8-slide pitch deck system prompt, Claude → Napkin → Gamma pipeline

#### 06 - Devil's Advocate.md
- **Role:** Adversarial stress-testing SOP — 7-person review panel simulation
- **Content:** Universal Devil's Advocate prompt (10 evaluation dimensions, 8 rejection criteria, scored output format), Pre-Mortem prompt, Airline Executive Review, Boeing Judge Review, Red Team Checklist (12 yes/no gates), Golden Rule

#### 07 - Research Prompts.md
- **Role:** Week 1 research phase task prompts
- **Content:** 6 prompts: PDF extraction (NotebookLM), latest data (Perplexity), gap analysis, competitive landscape (Perplexity), behavioral science (Claude), synthesis (Claude)

#### 08 - Design Prompts.md
- **Role:** Weeks 2-3 concept design prompts
- **Content:** 7 prompts: generate 15 concepts, evaluate/score, deep-dive blueprint, pre-mortem, refine, Napkin brief, journey map

#### 09 - Pitch Prompts.md
- **Role:** Weeks 3-4 pitch creation prompts
- **Content:** 7 prompts: narrative arc, hook, script, judge Q&A, one-pager, slide content, rehearsal critique

#### 10 - Validation Prompts.md
- **Role:** Ongoing evidence and verification prompts
- **Content:** 6 prompts: fact-check, SDG audit, gap analysis, expert panel, impact model, interview questions

#### 11 - Prompt Debugging.md
- **Role:** Troubleshooting guide and iteration log
- **Content:** 9 failure modes table, 4 anti-patterns, blank log, pre-prompt checklist

#### 12 - LLM Behaviours to Avoid.md
- **Role:** Anti-patterns guide — what NOT to do when using AI
- **Content:** 12 anti-patterns (single-prompt trap, passive validation, constraint drifting, etc.), team checklist, behaviour-to-fix quick reference table

---

### 70_Validation_and_Evidence/ — Proof and data

#### 70 - Validation and Evidence.md
- **Role:** Index for validation folder
- **Content:** Tracks primary and secondary research data ensuring every claim is backed by proof
- **Structure:** Short index header
- **Related:** All files in 70_Validation_and_Evidence/

#### Academic Citation Index.md
- **Role:** Cross-referenced index linking concept to peer-reviewed papers
- **Content:** Academic references mapping choice architecture choices to verified principles (Nudge Theory, EAST framework, etc.)
- **Structure:** Table: Concept Feature | Principle | Citation
- **Related:** Concept Blueprint.md

#### Quantitative Survey Data.md
- **Role:** Dashboard for numeric metrics and survey data
- **Content:** Charts, statistical sample sizes, percentage data points from any team-run questionnaire. Per-teammate findings sections with faint guiding examples.
- **Structure:** Survey overview section + per-teammate Findings and Statistical Notes subsections
- **Related:** User Interview Transcripts.md

#### User Interview Transcripts.md
- **Role:** Raw notes from real passenger/crew/staff interviews
- **Content:** Transcripts or summaries from real-world interviews organized by teammate. Each interview has structured fields (interviewee, date, method, quotes, insights).
- **Structure:** Per-teammate Interview Log with structured fields and faint example text. Best Quotes section for easy pitch access.
- **Related:** Quantitative Survey Data.md

---

### 80_Final_Deliverables/ — Submission-ready materials

#### 80 - Final Deliverables.md
- **Role:** Index for final deliverables
- **Content:** Lists submission-ready materials for the AeroSTAR-Boeing pitch panel
- **Structure:** Short index header
- **Related:** All files in 80_Final_Deliverables/

#### Executive Summary (One-Pager).md
- **Role:** Standalone executive brief readable in under 60 seconds
- **Content:** Concise overview of sustainability concept, system mechanics, SDG impacts. Structured sections with faint example answers.
- **Structure:** Sections: Concept Name, Problem, Solution, How It Works, Key Metrics, SDG Impact, Why We Win
- **Status:** Template with faint examples

#### Final Presentation Script.md
- **Role:** Master locked copy of presentation script for timed runs
- **Content:** Script formatted for timed delivery per slide. Each slide has faint speaker/time/script placeholders.
- **Structure:** Per-slide sections (Slide 1-6) with Speaker, Time, Script fields
- **Related:** Pitch Script.md (working draft)
- **Status:** Template with faint placeholders

#### Submission Checklist.md
- **Role:** Quality control gatekeeper
- **Content:** File format checks, word limits, criteria requirements, SDG minimum (at least 2 SDGs). Interactive checkbox list.
- **Structure:** Categorized checklist with `[ ]` boxes and faint example notes
- **Related:** Evaluation Rubric.md
- **Status:** Template with faint guiding text

---

### 90_Winning_Strategy/ — Competitive positioning

#### 90 - Winning Strategy.md
- **Role:** Index for strategy folder
- **Content:** Corporate alignment plans and strategic defenses
- **Structure:** Short index header
- **Related:** All files in 90_Winning_Strategy/

#### Boeing ESG Alignment Matrix.md
- **Role:** Reference chart matching concept to Boeing's official sustainability pillars
- **Content:** Concept features mapped to Boeing language with alignment strength rating. Faint example rows guide the format.
- **Structure:** Table: Boeing Priority | Our Feature | Evidence | Alignment Strength
- **Related:** Concept Blueprint.md, Judge Persona Analysis.md
- **Status:** Template with faint example rows

#### Judge Persona Analysis.md
- **Role:** Breakdown of evaluator panel perspectives
- **Content:** Professional backgrounds, values, expectations per judge type (Boeing, Academic, Industry). Faint example answers for each field.
- **Structure:** Per-judge sections with Background, Values, Questions, Tone Tip fields
- **Related:** Boeing ESG Alignment Matrix.md, Pitch Script.md
- **Status:** Template with faint guiding examples

#### Risk Mitigation Register.md
- **Role:** Internal countermeasure tracker
- **Content:** Every potential reason a judge might reject the idea, with a structured defense for each. Faint example risks.
- **Structure:** Table: Risk | Raised By | Severity | Counter-Defense | Status
- **Related:** Judge Persona Analysis.md
- **Status:** Template with faint example rows

---

### 99_Archive/

#### 📖 99.md
- **Role:** Archive index for completed or deprecated materials
- **Content:** Links to archived notes no longer active
- **Structure:** Simple list

---

## 4. PLUGINS

### 4.1 role-stamper (custom-built, v1.0.0)
- **Purpose:** Teammate selection and color-coded inline stamping
- **Key features:** Status bar cycle (click to switch teammate), right-click context menu on selected text, Ctrl+Shift+L to stamp, Ctrl+Shift+D for personal draft, ribbon icon to auto-update Home page bar, auto-stamp on pause (600ms)
- **Commands:** Cycle teammate, Stamp selection/paragraph, Open personal draft, Update contribution bar, Commit & push
- **Current config:** currentRole = t1 (Seif)
- **Tags inline text with:** `::t1:text::` patterns rendered as colored spans in Reading mode. CM6 decorations hide markers in Live Preview. No per-teammate boxes, no HTML divs, no marker pair system.

### 4.2 homepage (v4.4.4)
- **Purpose:** Opens -Home.md on startup
- **Config:** Pinned tab, replaces all open notes, opens on startup. Target file: -Home

### 4.3 lumina (v1.2.19)
- **Purpose:** RAG and MCP agent with multilingual embeddings (IBM Granite model)
- **Config:** RAG disabled, web search disabled, MCP disabled. Quick actions: Summarize, Translate, Explain.
- **Usage:** Highlight text in any note and run Lumina quick action via command palette

### 4.4 fingertip-translation (v1.1.0)
- **Purpose:** Translate selected text with Bing Dictionary, Youdao, or MyMemory
- **Config:** Bing Dictionary, Ctrl+select trigger, TTS pronunciation enabled
- **CSS companion:** vocabulary-highlights.css styles hoverable words

### 4.5 obsidian-dictionary-plugin (v2.22.0)
- **Purpose:** Dictionary lookup for multiple languages
- **Config:** APIs configured for en_US, hi, es, fr, ja, ru, en_GB, de, it, ko, pt_BR, ar, tr, cn

### 4.6 persistent-graph (v0.3.2)
- **Purpose:** Saves and restores global graph node positions
- **Config:** Auto-restore enabled. All 44 notes have saved coordinates for consistent graph layout.

### 4.7 juggl (v1.5.0)
- **Purpose:** Interactive, stylable, expandable graph view alternative
- **Config:** Default (no custom config)

### 4.8 mermaid-themes (v0.1.3)
- **Purpose:** Custom mermaid.js diagram themes
- **Config:** Theme = default

### 4.10 obsidian-git (v2.x)
- **Purpose:** Auto-sync vault with GitHub via git commit/push/pull
- **Config:** Remote: yara-hue/obsaero on GitHub. Token-based auth. Auto-sync configured via plugin settings.

 (v1.3.3)
- **Purpose:** Auto-switches Obsidian theme based on active folder
- **Config:** 00_Team_Foundation folder triggers light mode

---

## 5. CSS SNIPPETS

### aerostar-color-codes.css (505 lines)
- Full vault theme: light mode (aviation blue) and dark mode (deep navy)
- Custom color variables for each vault section (--color-01 through --color-99)
- Color-coded folder/file titles by section in file explorer
- Color-coded left-border indicators on active files
- Color-coded tab headers and graph nodes
- Teammate contribution classes: contrib-t1 (gold), contrib-t2 (blue), contrib-t3 (purple)
- Contribution bar widget styles (bar-container, bar segments, legend, dots)
- Custom callout styles for teammates: callout[data-callout=t1/t2/t3]
- Decorative folder icons using Unicode symbols
- Decorative H1 and HR dividers with aviation theme

### vocabulary-highlights.css (19 lines)
- .vocab class: blue dotted underline, hover background
- mark/==highlight== text: subtle dotted underline for hoverable words
- Works with Fingertip Translation plugin and B1+ vocabulary marking

---

## 6. CONFIGURATION SUMMARY

### community-plugins.json (9 plugins)
persistent-graph, lumina, homepage, theme-by-folder, mermaid-themes, obsidian-dictionary-plugin, fingertip-translation, role-stamper, obsidian-git

### appearance.json
- Theme: obsidian (default)
- Enabled snippets: aerostar-color-codes, vocabulary-highlights
- No custom CSS theme

### core-plugins.json (22 enabled)
file-explorer, global-search, switcher, graph, backlink, canvas, outgoing-link, tag-pane, properties, page-preview, daily-notes, templates, note-composer, command-palette, editor-status, bookmarks, outline, word-count, file-recovery, sync, bases, webviewer

### Disabled core plugins (9)
footnotes, slash-command, markdown-importer, zk-prefixer, random-note, slides, audio-recorder, workspaces, publish

### Workspace layout
- Left sidebar: File Explorer, Global Search, Bookmarks
- Right sidebar: Backlinks, Outgoing Links, Tags, Properties, Outline
- Main area: -Home.md as pinned startup tab

---

## 7. WORKFLOWS

### Contribution Tracking
1. **Mouse:** Select text → right-click → pick a teammate from menu → `::t1:text::` stamp inserted immediately
2. **Keyboard:** Ctrl+Shift+L stamps with current teammate (click status bar to cycle T1→T2→T3 first)
3. Text wrapped in `::t1:text::` — rendered as colored spans in Reading mode, hidden markers in Live Preview
4. Click ribbon icon to auto-count stamps and update Home page bar
5. Bar shows percentage split based on stamp counts

### Personal Drafts
- Ctrl+Shift+D creates/opens Draft - Teammate X.md
- Entire page wrapped in teammate color

### Translation/Vocabulary
- Ctrl+select any word: Bing Dictionary popover
- Mark words with ==highlight== or span.vocab for dotted underline

### AI Assistance
- Highlight text, run Lumina: Summarize, Translate, or Explain
- Use prompts from AI Prompts Library or 60_AI_Prompt_Engineering/

---

## 8. NOTE STATUS

All content files have been restructured from per-teammate marker boxes to clean plain markdown with section titles and faint placeholder examples. The old `<!-- tN:Label-->` marker pair system has been removed entirely — teammates now edit freely without color-coded boxes.

The 60_AI_Prompt_Engineering/ folder has been fully populated with 13 files (AI Operating Manual, 5 AI rules, Devil's Advocate, 4 task prompt sets, LLM anti-patterns, debugging).

File sizes range from small templates to the role-stamper plugin (~500 lines).

