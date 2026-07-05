# AeroSTAR Vault — Complete Audit for AI Analysis

Generated: 01 Jul 2026 (updated 02 Jul 2026)
Path: C:\Users\ehabn\Aerostar-Sustainability-Challenge

This document describes every file in the vault — its purpose, the type of content it holds, and how it connects to other files. Use this as a map for an AI to understand the project structure and generate prompt templates for filling the vault.

---

## 1. PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| Competition | AeroSTAR-Boeing Regional Camp (Jordan) |
| Team | 3 members (Teammate 1 / 2 / 3 — roles TBD) |
| Mission | Redesign aviation sustainability via choice architecture, behavioral systems, design thinking |
| Hard constraint | Zero new hardware — only systems, communication, human habits |
| SDG mandate | Each proposal must advance targets within at least 2 UN SDGs |
| Timeline | 4-week sprint (Week 1: Diverge, Week 2: Converge, Week 3: Blueprint, Week 4: Pitch) |
| Vault philosophy | PARA-style organization with AI assistance via Lumina plugin |

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
- **Content:** Specific operational, psychological, and environmental questions that need answering. Each question should link to its answer in Sources Database once found.
- **Structure:** Bullet list or table of questions with status fields
- **Related:** Sources Database.md (link answers here)
- **Status:** Placeholder

#### Sources Database.md
- **Role:** Central bibliography and verified data repository
- **Content:** Every real-world statistic, IATA report, academic paper, and industrial reference. Each entry as a markdown table row with source name, statistic, URL/citation.
- **Structure:** Markdown table: Source | Statistic | SDG Relevance | Link
- **Related:** Research Questions.md, NotebookLM Briefings.md, Concept Blueprint.md (feed data into the design)
- **Status:** Placeholder

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
- **Content:** Every concept generated by the team or AI, categorized broadly: terminal operations, cabin behavior, or communication style. No bad ideas during Week 1.
- **Structure:** Categorized bullet lists or tables
- **Related:** Concept Evaluation Matrix.md (best ideas get evaluated here)
- **Status:** Placeholder — this will be the most active file in Week 1

#### Concept Evaluation Matrix.md
- **Role:** Objective screening filter to pick the winning concept
- **Content:** Weighted scoring table scoring top 5+ ideas on: Friction, Feasibility, Cost, SDG Alignment. Highest scorer becomes the final concept.
- **Structure:** Table with weighted columns and total scores
- **Related:** Idea Dump.md (feed ideas in), Evaluation Rubric.md (align weights to rubric), Concept Blueprint.md (winner documented here)
- **Status:** Placeholder

#### Concept Blueprint.md
- **Role:** Definitive master document for the winning concept
- **Content:** Complete system design: choice architecture explanation, step-by-step passenger/crew touchpoint flow, UN SDG target alignment, operational integration details
- **Structure:** Structured document with sub-sections for mechanism, passenger flow, crew flow, SDG proof
- **Related:** Concept Evaluation Matrix.md (winner comes from here), Pitch Studio files (narrative and script derive from this)
- **Status:** Placeholder — this is the most important content file

#### AI Prompts Library.md
- **Role:** Shared prompt engineering vault
- **Content:** Exact custom instructions, roleplay matrices, and constraints used across Claude, ChatGPT, and Perplexity. Successful prompts saved for team reuse.
- **Structure:** Categorized prompts with notes on when to use each
- **Related:** 60_AI_Prompt_Engineering/ folder (advanced prompts), Lumina plugin
- **Status:** Placeholder

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
- **Content:** Story arc: hook, data drops, SDG impact reveal, call to action. Drafted before individual slides.
- **Structure:** Beat-by-beat outline with timing notes
- **Related:** Pitch Script.md (write script from this), Concept Blueprint.md (source material)
- **Status:** Placeholder

#### Pitch Script.md
- **Role:** Exact word-for-word spoken script for the live pitch
- **Content:** Spoken lines side-by-side with slide transition cues. Punchy headlines under 7 words.
- **Structure:** Two-column: slide cue | spoken lines. Timed sections.
- **Related:** Narrative Outline.md, Final Presentation Script.md (locked copy)
- **Status:** Placeholder

#### Visual Assets Tracker.md
- **Role:** Production pipeline for all visual assets
- **Content:** Journey maps, UI mockups, diagrams generated via Napkin AI or Canva. Each asset tracked from outline to final render.
- **Structure:** Table: Asset | Status | Tools | Assigned To
- **Related:** Gamma Deck Link.md (final deck lives there)
- **Status:** Placeholder

#### Gamma Deck Link.md
- **Role:** Access link and structural placeholder for cloud presentation deck
- **Content:** Live link to Gamma presentation, layout notes, typography choices, slide-by-slide feedback
- **Structure:** Link + notes
- **Related:** Visual Assets Tracker.md
- **Status:** Placeholder

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
- **Content:** Each teammate writes a quick paragraph every Friday: what they learned, what challenged them, how they solved it
- **Structure:** Weekly sections with author attribution
- **Related:** Team Thinking Log.md (team-level complement)
- **Status:** Placeholder

#### Team Thinking Log.md
- **Role:** Chronological journal of idea evolution
- **Content:** Major breakthroughs, dead-ends, pivots documented at the end of each sprint week
- **Structure:** Dated entries per week
- **Related:** Individual Reflections.md, Process Artifact Draft.md
- **Status:** Placeholder

#### Process Artifact Draft.md
- **Role:** Staging ground for the optional written methodology report
- **Content:** Framework explanation, research methods, interview insights compiled into a polished process document
- **Structure:** Structured report format
- **Related:** All research and design files (evidence of process)
- **Status:** Placeholder

#### Drafts/ (folder)
- **Role:** Personal scratchpads created by Role Stamper plugin
- **Content:** Per-teammate draft notes wrapped in color-coded divs
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
- **Content:** Charts, statistical sample sizes, percentage data points from any team-run questionnaire
- **Structure:** Tables and charts
- **Related:** User Interview Transcripts.md

#### User Interview Transcripts.md
- **Role:** Raw notes from real passenger/crew/staff interviews
- **Content:** Transcripts or summaries from real-world interviews. Direct quotes to add credibility to pitch slides.
- **Structure:** Per-interview sections with quotes
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
- **Content:** Concise overview of sustainability concept, system mechanics, SDG impacts
- **Structure:** One-page format with key sections

#### Final Presentation Script.md
- **Role:** Master locked copy of presentation script for timed runs
- **Content:** Script formatted for timed delivery. No further edits allowed once finalized.
- **Structure:** Timed sections with slide cues
- **Related:** Pitch Script.md (working draft)

#### Submission Checklist.md
- **Role:** Quality control gatekeeper
- **Content:** File format checks, word limits, criteria requirements, SDG minimum (at least 2 SDGs). Final verification list.
- **Structure:** Checklist with checkboxes
- **Related:** Evaluation Rubric.md

---

### 90_Winning_Strategy/ — Competitive positioning

#### 90 - Winning Strategy.md
- **Role:** Index for strategy folder
- **Content:** Corporate alignment plans and strategic defenses
- **Structure:** Short index header
- **Related:** All files in 90_Winning_Strategy/

#### Boeing ESG Alignment Matrix.md
- **Role:** Reference chart matching concept to Boeing's official sustainability pillars
- **Content:** Concept features mapped to Boeing language: ecoDemonstrator priorities, circular supply paths, etc.
- **Structure:** Table: Concept Feature | Boeing Pillar | How It Aligns
- **Related:** Concept Blueprint.md, Judge Persona Analysis.md

#### Judge Persona Analysis.md
- **Role:** Breakdown of evaluator panel perspectives
- **Content:** Professional backgrounds, values, secret expectations of Boeing and Amideast judges. Ensures tone speaks to business and educational goals.
- **Structure:** Per-judge persona profiles
- **Related:** Boeing ESG Alignment Matrix.md, Pitch Script.md

#### Risk Mitigation Register.md
- **Role:** Internal countermeasure tracker
- **Content:** Every potential reason a judge might reject the idea, with a structured defense for each. Operational risks, passenger friction challenges.
- **Structure:** Table: Risk | Impact | Mitigation
- **Related:** Judge Persona Analysis.md

---

### 99_Archive/

#### 📖 99.md
- **Role:** Archive index for completed or deprecated materials
- **Content:** Links to archived notes no longer active
- **Structure:** Simple list

---

## 4. PLUGINS

### 4.1 role-stamper (custom-built, v1.0.0)
- **Purpose:** Teammate selection and color-coded contribution stamping
- **Key features:** Status bar cycle (click to switch teammate), right-click context menu on selected text, Ctrl+Shift+L to stamp, Ctrl+Shift+D for personal draft, ribbon icon to auto-update Home page bar
- **Commands:** Cycle teammate, Stamp selection/paragraph, Open personal draft, Update contribution bar
- **Current config:** currentRole = t2 (Teammate 2)
- **Tags files with:** HTML divs with class contrib-t1, contrib-t2, or contrib-t3

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
- Custom color variables for each vault section (--color-00 through --color-99)
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
1. **Mouse:** Select text → right-click → pick a teammate from menu → stamped immediately
2. **Keyboard:** Ctrl+Shift+L stamps with current teammate (click status bar to cycle T1→T2→T3 first)
3. Text wrapped in contrib-tX div with colored left border
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

All content notes were placeholder files — 36 of 55 markdown files still have FILE PURPOSE headers (empty templates). The 60_AI_Prompt_Engineering/ folder has been fully populated with 13 files (AI Operating Manual, 5 AI rules, Devil's Advocate, 4 task prompt sets, LLM anti-patterns, debugging). Numbered prefixes keep them in logical order in Obsidian's file explorer. The only exception is -Home.md which has the dashboard structure with real metadata.

File sizes: 87 bytes (📖 99.md) to ~720 KB (obsidian-git/main.js).

