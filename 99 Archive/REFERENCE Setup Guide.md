#  Vault Setup Guide

## First-time setup

1. **Install Git** → https://git-scm.com/downloads
2. **Clone the vault**  
   `git clone https://github.com/yara-hue/obsaero.git`
3. **Open in Obsidian** → "Open folder as vault" → select `obsaero`
4. **Trust the author** → click "Trust author and enable plugins"

That's it. The vault will auto-sync via Git.

## How sync works

- **Auto-pull** on every Obsidian startup
- **Auto-commit + push** every 10 minutes (when changes exist)
- **Auto-pull** every 10 minutes (fetches teammates' changes)
- All plugins + settings are already in the repo — nothing to configure

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Git not found" | Install Git and restart Obsidian |
| Push fails | You might not have write access — that's OK, you'll still get updates |
| Plugins not loading | You didn't trust the author — close vault, reopen, click "Trust" |
| Merge conflict | Normal! Git auto-merges most of the time. See `conflict-files-obsidian-git.md` for any files needing manual fix |

## Tips

- Don't manually edit anything in `.obsidian/` unless you know what you're doing
- Don't change the Git remote URL
- If Obsidian feels slow, the auto-sync is running — wait a few seconds
