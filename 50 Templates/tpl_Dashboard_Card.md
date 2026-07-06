# Dashboard Card Template

Copy-paste the format below to add a teammate card to any collaborative file.

## Single-Column Card (for reflections, notes, etc.)

> [!card-t1]- ✈︎ Seif's Section Title
>
> <!-- t1:Label-->
> _Your content here..._
> <!-- /t1-->

Replace `t1` / `Seif` with your teammate (`t2`/`Marwan`, `t3`/`Yara`).

## Two-Column Grid Card (for questions + findings, etc.)

> [!card-t1-grid]- ✈︎ Seif's Section Title
>
> <div class="rq-col">
>
> ### 🔵 Questions / Content
>
> <!-- t1:Questions-->
> _Left column content here..._
> <!-- /t1-->
>
> </div>
>
> <div class="rq-col rq-col-findings">
>
> ### 🟢 Findings / Answer
>
> <!-- t1:Findings-->
> _Right column content here..._
> <!-- /t1-->
>
> </div>

## Adding T4/T5

1. Add RGB variables in `:root` in `.obsidian/snippets/research-dashboard.css`:
   ```css
   --card-t4:     #E74C3C;
   --card-t4-rgb: 231, 76, 60;
   ```
2. Add `.callout[data-callout="card-t4"]` and `.callout[data-callout="card-t4-grid"]` rules (copy from an existing T1-T3 rule and change the names).
3. Use `[!card-t4]` or `[!card-t4-grid]` in your markdown files.
