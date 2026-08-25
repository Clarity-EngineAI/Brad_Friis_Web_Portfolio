Model: Sonnet

# Status
Task closed this session: filter-bar layout fix on `/week/` (second correction round).

The `/week/` hero + filter-bar + pillar section redesign (originally scoped as its own task) is
now functionally complete after several rounds of user-driven correction:

1. Hero/filter-tray/pillar section redesigned earlier this session under `/impeccable layout`.
2. First correction round (5 items from a screenshot): testimonial quote added to the filter-bar
   dead space, All/Reset repositioned, "Filter the week" renamed to "Filters", `.grid-corner`
   white-square bug fixed, Morning/Afternoon slot labels centred.
3. **This round** — Brad rejected round 2's execution of the quote/All-Reset placement (screenshot
   showed a hairline separator he didn't ask for, and All/Reset sitting to the right of a still
   two-column body rather than in the card's top-right corner). Fixed by:
   - `src/pages/week.astro` — `.filter-bar-head` (title + All/Reset) now spans the full card width
     as its own row above `.filter-bar-body`, not nested inside a `.filter-bar-main` column.
   - `src/styles/week.css` — removed `.filter-bar-main` wrapper entirely; removed the
     `border-bottom` under the head row and the mobile `border-top` above the stacked quote (Brad
     explicitly said "not red line separator or thin grey line"); `.filter-bar-body` is now a
     2-column grid (`1.3fr / 1fr`) with `align-items: center` so the quote sits vertically balanced
     in the dead space next to the filter groups.
   - Verified with `astro check` (0 errors/warnings) and chrome-devtools screenshots at 1440×900
     and 768×1024 — both match Brad's reference screenshot.

**Nothing in this feature has been committed.** `src/pages/week.astro`, `src/styles/week.css`,
`src/data/weekLogos.ts`, `src/data/repWeekCalendar.js`, and `src/assets/week-logos/` are all still
untracked (`git status` confirms). A large number of unrelated files are also dirty/untracked in
the working tree (resume PDFs/DOCX, letter logos, `.claude/`, `.impeccable/`, `DESIGN.md`,
`PRODUCT.md`, README/package.json changes) — do not assume any of that is this session's doing;
review before staging anything.

# Next task
No open task from Brad — the last message in this session was his correction, and it has been
addressed but **not yet seen/confirmed by him**. The natural next step is either:
- Brad reviews the live page and either approves or gives another correction round, or
- If approved, this is a good point to commit the whole `/week/` feature (hero redesign + all
  correction rounds) as a coherent unit, since nothing has been committed yet.

Do not commit unprompted — ask first, and stage only the `/week/`-related files listed above plus
anything else Brad confirms is intentional, not the full dirty tree.

# Files to read first
1. This file.
2. `src/pages/week.astro:24-46` — current filter-bar/quote markup (small, safe to read in full).
3. `src/styles/week.css` — search `.filter-bar`, `.filter-bar-head`, `.filter-bar-body`,
   `.filter-bar-quote`, `.grid-corner`, `.slot-head` for all the layout rules touched across both
   correction rounds.
4. `git status` — confirm what's actually staged/unstaged before touching git at all.

Next: start a new session (Sonnet) once Brad has reviewed http://localhost:4321/week/ against his
reference screenshot — either to apply another correction round, or to commit the completed
`/week/` feature if he approves.
