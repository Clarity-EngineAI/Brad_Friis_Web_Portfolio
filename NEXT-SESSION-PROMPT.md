# Next session: mobile filter-row above-fold P1 (week.astro)

Model: Sonnet

## Status

Both prior open items are resolved and committed (2026-08-31):
- `2563321` feat(week): pillarKeyNote copy for the pillar-key section
- `ee1bb1e` fix(week): mobile filter panel no longer covers adjacent trigger (also included
  undocumented-in-prior-handoff ARIA cleanup, a live filter-result summary line, and an
  aria-label reorder that were already in the working tree — confirmed with Brad before
  committing, folded into the CSS/behavioural commit rather than split further)

Working tree is clean, nothing uncommitted.

## Exact next task

The carried-forward P1 from the 2026-08-30T23-43-51Z `/impeccable critique`: on mobile, the
filter row (pillar triggers + panels) eats the full above-fold viewport before any calendar
card is visible. This tensions with the site's "calendar-first" rule for this page. Not yet
scoped or designed — start fresh.

## Read first, in order

1. `.impeccable/critique/2026-08-30T23-43-51Z__src-pages-week-astro.md` — original finding.
2. `src/pages/week.astro` and `src/styles/week.css` mobile media query — current filter-row
   markup/layout to design against.
