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

Research pages now use a **dashboard layout** built with HTML divs + CSS Grid — like Notion or Linear. Each researcher has a colored card with a two-column layout.

**To enable:** Go to Settings → Appearance → CSS snippets → toggle on `research-dashboard.css`.

**Card HTML structure:**
```html
<div class="research-card" style="--card-color: #hex; --card-rgb: R,G,B;">
  <div class="card-header">✈︎ Name — Research</div>
  <div class="card-body">
    <div class="card-col col-questions">
      <div class="col-header">🔵 Research Questions</div>

      <div class="q-field">
        <!-- tN:Q1:Label-->
        1. Your question here...
        <!-- /tN-->
      </div>

    </div>
    <div class="card-col col-findings">
      <div class="col-header">🟢 Findings / Sources</div>

      <div class="findings-field">
        <!-- tN:Findings-->
        Your findings here...
        <!-- /tN-->
      </div>

    </div>
  </div>
</div>
```

**To add a new researcher (T4/T5):** Copy a `.research-card` block and change:
- `--card-color` — the hex color
- `--card-rgb` — RGB components separated by commas
- Marker prefixes: `t4:`, `t5:`
- Emoji and name in the header

**Researcher colors:**

| Teammate | Color | Inline style |
|---|---|---|
| Seif | Gold `#F4D03F` | `--card-color: #F4D03F; --card-rgb: 244, 208, 63;` |
| Marwan | Blue `#5DADE2` | `--card-color: #5DADE2; --card-rgb: 93, 173, 226;` |
| Yara | Purple `#AF7AC5` | `--card-color: #AF7AC5; --card-rgb: 175, 122, 197;` |

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
