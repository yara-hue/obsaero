# Research Board Template

The vault now uses a **native UI board** instead of markdown/HTML cards. Open any collaborative file and press `Ctrl+Shift+B` to launch the Research Board.

## How it works

The Board reads `<!-- tN:Label-->...<!-- /tN-->` marker pairs from any file and renders:

- One **colored card per researcher**
- **Questions panel** (left, 40%) — each question has title, status chip, priority, notes
- **Findings panel** (right, 60%) — large rich-text area
- **Sources section** (full width) — add/edit/delete source entries

## Marker format

The Board auto-detects marker pairs. Label keywords control layout:
- `Question` in label → renders as question list
- `Findings` / `Answer` in label → renders as findings panel
- `Source` in label → renders as source list
- Any other label → renders as notes block

### Questions format (between markers):
```
## Question title here
Status: researching
Priority: high
Notes: optional notes
```

### Findings format (between markers):
Plain text or structured notes.

### Sources format (between markers):
```
## Source title
URL: https://...
Type: report|paper|interview|dataset|other
Notes: optional
```

## Researcher colors

| Teammate | Color | Default labels |
|---|---|---|
| Seif | Gold `#F4D03F` | `t1:Questions`, `t1:Findings`, `t1:Sources` |
| Marwan | Blue `#5DADE2` | `t2:Questions`, `t2:Findings`, `t2:Sources` |
| Yara | Purple `#AF7AC5` | `t3:Questions`, `t3:Findings`, `t3:Sources` |

## Adding T4/T5

Copy any marker pair block, change `tN:` prefix, and use labels matching the patterns above. The Board dynamically assigns card colors from `COLORS` in `main.js` — add an entry there for new roles.

No CSS changes needed. No HTML/markdown wrappers needed.
