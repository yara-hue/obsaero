::t2:> [!success]+ **✅ Vault is ready!**::
> Everything is pre-configured. Just follow the steps below.

## ⚡ Setup

1. **Trust the author** when Obsidian asks → enables all plugins
2. That's it. Seriously.

### 📝 How to contribute (important!)

Every file has **colored textarea boxes** for each teammate:

| Color | Teammate | Symbol | Write ONLY in your box |
|-------|----------|--------|------------------------|
| 🟡 Gold | Seif | ✈︎ | `<!-- t1:label -->` boxes |
| 🔵 Blue | Marwan | ⌕ | `<!-- t2:label -->` boxes |
| 🟣 Purple | Yara | ✧ | `<!-- t3:label -->` boxes |

**Rule:** Never edit a box that isn't your color. Git auto-merges your changes with no conflicts because you're on different lines.

**In Reading mode**, each box renders as an editable `<textarea>`. Type your content and click **Update** to save it back to the file. The marker code is hidden in Live Preview mode.

### 📊 Dashboard Cards

Many pages now use **dashboard-style cards** instead of plain boxes. Each card has a per-teammate color, rounded corners, subtle shadow, and hover animation.

| Callout type | Layout | Example file |
|---|---|---|
| `[!card-t1]` / `[!card-t2]` / `[!card-t3]` | Single column — content stacks vertically | Individual Reflections, Idea Pool |
| `[!card-t1-grid]` / `[!card-t2-grid]` / `[!card-t3-grid]` | Two-column grid — Questions (🔵 left) / Findings (🟢 right) | Research Questions |

**To enable:** Go to Settings → Appearance → CSS snippets → toggle on `research-dashboard.css`.

**Card markdown structure (single column):**
```markdown
> [!card-t1]- ✈︎ Seif's Title
> 
> <!-- t1:Label-->
> _Your content here..._
> <!-- /t1-->
```

**Card markdown structure (grid):**
```markdown
> [!card-t1-grid]- ✈︎ Seif's Title
> 
> <div class="rq-col">
> 
> ### 🔵 Questions
> 
> <!-- t1:Questions-->
> _Your questions here..._
> <!-- /t1-->
> 
> </div>
> 
> <div class="rq-col rq-col-findings">
> 
> ### 🟢 Findings
> 
> <!-- t1:Findings-->
> _Your findings here..._
> <!-- /t1-->
> 
> </div>
```

**Adding T4/T5:** Add a new callout rule to `research-dashboard.css`:
```css
:root {
  --card-t4:     #E74C3C;
  --card-t4-rgb: 231, 76, 60;
}
.callout[data-callout="card-t4"],
.callout[data-callout="card-t4-grid"] {
  --card-color: var(--card-t4);
  --card-color-rgb: var(--card-t4-rgb);
  background: rgba(var(--card-t4-rgb), 0.05);
  border: 1px solid rgba(var(--card-t4-rgb), 0.2);
  box-shadow: 0 4px 24px rgba(var(--card-t4-rgb), 0.08);
}
.callout[data-callout="card-t4"]:hover,
.callout[data-callout="card-t4-grid"]:hover {
  box-shadow: 0 8px 36px rgba(var(--card-t4-rgb), 0.16);
}
```

### How sync works

- **Auto-pull** on every startup (you get the latest)
- **Auto-commit + push** every 10 minutes (your changes go up)
- **Auto-pull** every 10 minutes (teammates' changes come down)
- **Manual commit** — click the Git icon in the left ribbon or press `Ctrl+Shift+G` to commit & push immediately

### Troubleshooting

| Problem | Fix |
|---------|------|
| Git not found | Install Git from https://git-scm.com and restart Obsidian |
| Plugins not loading | Close vault → reopen → click "Trust author" |
| Something broken | Just ask the team |

---

> [!tip] Close this tab and open **[[_Home]]** to start exploring the vault.
