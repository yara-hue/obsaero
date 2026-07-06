# Dashboard Card Template

Copy-paste the format below to add a teammate card to any collaborative file.

## Standard Card (two-column: questions + findings)

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

      <div class="q-field">
        <!-- tN:Q2:Label-->
        2. Another question...
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

## Researcher colors

| Teammate | Inline style |
|---|---|
| Seif | `--card-color: #F4D03F; --card-rgb: 244, 208, 63;` |
| Marwan | `--card-color: #5DADE2; --card-rgb: 93, 173, 226;` |
| Yara | `--card-color: #AF7AC5; --card-rgb: 175, 122, 197;` |

## Adding T4/T5

Copy a `.research-card` div, pick a hex color, and set:
- `--card-color: #HexColor; --card-rgb: R, G, B;`
- Marker prefixes: `t4:`, `t5:`
- Emoji + name in `.card-header`

No CSS changes needed — the inline `--card-*` variables style the card automatically.
