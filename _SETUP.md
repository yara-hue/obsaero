::t2:> [!success]+ **✅ Vault is ready!**::
> Everything is pre-configured. Just follow the steps below.

## ⚡ Setup

1. **Trust the author** when Obsidian asks → enables all plugins
2. That's it. Seriously.

### 📝 How to contribute (important!)

Files are split into **colored bordered boxes** — one per teammate per section:

| Color | Teammate | Symbol | Your markers |
|-------|----------|--------|-------------|
| 🟡 Gold | Seif | ✈︎ | `<!-- t1:Questions-->` / `<!-- t1:Findings-->` |
| 🔵 Blue | Marwan | ⌕ | `<!-- t2:Questions-->` / `<!-- t2:Findings-->` |
| 🟣 Purple | Yara | ✧ | `<!-- t3:Questions-->` / `<!-- t3:Findings-->` |

**How to edit:** Open the file in **Live Preview** (editing mode) — you'll see the markers as greyed-out comments. Type your text between the opening `<!-- tN:Label-->` and closing `<!-- /tN-->` markers. Switch to **Reading mode** to see your content inside a bordered box with a colored left border matching your teammate color.

**Rule:** Never edit inside another teammate's markers. Git auto-merges with no conflicts because you're on different lines.


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
