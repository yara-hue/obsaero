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

### 🎛️ Research Board (native UI)

Open any collaborative file and press **`Ctrl+Shift+B`** to launch the **Research Board** — a native Obsidian ItemView that replaces the markdown editor with a Linear/Notion-style UI.

Each researcher gets a **colored card** with:
- **Questions panel** (left, 40%) — titled inputs with status chips (Todo/Researching/Complete/Blocked) and priority
- **Findings panel** (right, 60%) — large rich-text area
- **Sources section** (full width) — add, edit, delete source entries

The Board reads `<!-- tN:Label-->...<!-- /tN-->` markers from any file. Label keywords control layout:
- `Question` in label → question list
- `Findings` / `Answer` → findings panel
- `Source` → source list

**Researcher colors:**

| Teammate | Color | Markers |
|---|---|---|
| Seif | Gold | `<!-- t1:Questions-->`, `<!-- t1:Findings-->` |
| Marwan | Blue | `<!-- t2:Questions-->`, `<!-- t2:Findings-->` |
| Yara | Purple | `<!-- t3:Questions-->`, `<!-- t3:Findings-->` |

**Add T4/T5:** Add entry to `COLORS` in `main.js`, then use `t4:`/`t5:` markers in files.

**To go back to markdown:** Close the Board tab, or open a fresh editor leaf via the File Explorer.

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
