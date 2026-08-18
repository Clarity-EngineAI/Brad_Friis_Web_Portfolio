# Next session — housekeeping, then Brad's sign-off pass

**Model:** Sonnet for what remains below (housekeeping, review, no architecture).

## Status: all three open copy decisions closed, plus one bug fixed outside scope

Working tree has uncommitted changes in `src/pages/index.astro`, `src/pages/cv.astro`,
`src/styles/global.css` and `src/layouts/SiteLayout.astro`. Nothing committed, nothing pushed,
noindex gate untouched.

## What was applied this session

**CV em-dashes fixed (found mid-session, not in original scope)** — Brad reported em-dashes
throughout `/cv/` while this session was in progress. The prior session's em-dash sweep only
touched the homepage; the CV page was never done. All 8 occurrences in `cv.astro` rewritten
(commas, colons, restructures — same approach as the homepage sweep), plus the browser-tab
title `"CV — Brad Friis"` → `"CV: Brad Friis"`. Verified 0 rendered in the live DOM at `/cv/`.

**Decision 1 — the five capability-card evidence lines** (`index.astro:23,30,37,44,51`). Brad
supplied a batch of additional verbatim quotes from the reference letters (Bergh, Lad, Lemon,
Walker, Lowry) and said they should go "into the mix throughout the site." Every quote was
checked against `src/data/letters.ts` before use — all confirmed verbatim.
- **#2** ("Find the offer nobody has priced yet") — written line replaced with Philip Lemon's
  verbatim quote: "quickly became known for thinking outside of the square and for creating new
  and untapped opportunities for his clients."
- **#3** ("Keep accounts, not just win them") — fixed a factual drift, not a swap: this card said
  "hesitant **teachers**," but the actual Bergh letter (and the correct version used elsewhere on
  the same page at what's now line ~74) says "hesitant **team members**." Corrected to match the
  source.
- **#5** ("Know the product, not just the pitch") — written line replaced with Pranesh Lad's
  verbatim quote: "your deep knowledge has been key to solving every issue we've thrown your way."
- **Also placed on Brad's instruction** ("also place one or two on the homepage now"): the fourth
  work-case-study evidence line ("The contract that made the decade possible") was a written line
  with no quote behind it — replaced with AR Walker's verbatim pull-quote: "he was always pleasant
  but somehow managed to obtain an extraordinarily high strike rate from which many clients were
  converted."
- **Not yet placed**: Bergh's doctoral-candidate line, Pilgrim's "game-changer" and "brings ideas
  to the table" lines, and Lowry's two lines are still unused. Brad said the full batch should go
  "throughout the site" — this session scoped to the capability cards plus one more homepage slot,
  per his own choice when asked to narrow it. The `/letters` page and any other quote-bearing
  sections are still open for a dedicated placement pass.

**Decision 2 — the four `graphicEras` timeline labels** (`index.astro:55-60`). Two drafting passes
were rejected before landing: a "mechanism-named" set (too flat), then a "sharpest specific
detail" set including a $70k-in-two-years referral-network figure Brad said "is not actually
impressive." Third pass pulled real growth figures per era from
`COPY/brad-verified-claims-transcript.md`, confirmed against Brad's picks:
- 2001 → "Ad revenue up 60% in 3 years" (Adplus/HB Tourism, register-confirmed)
- 2009 → "$70k site, agency's biggest yet" (Xplore/Rembrandt Fine Arts — no comparable percentage
  exists for this era in the register, so a deal-size figure was used instead; flagged to Brad
  before use, no objection)
- 2013 → "30% more profit per customer" (99 Corporation, Rob Nieuwland's own independently
  corroborated framing — Brad chose this over the alternative 70%-clients/120%-income framing)
- 2015 → "2,800 users to 24,500" (PowerSchool channel, register-confirmed)

**This changed the section's claim, not just its labels.** The old heading/lead ("The same habit,
compounding" / "Recurring revenue from work already being done: sold and held, not built") was
written for a sold-and-held-not-built motion. The new labels are growth figures, a different
claim. Flagged to Brad, who chose to reframe rather than re-draft the labels again. New copy:
eyebrow "Four businesses, four eras", heading "Growth in every era.", lead "Four different
businesses, four different products. The same result each time."

**Decision 3 — capability section header** (`index.astro:231`). Brad's own rewrite applied
directly: "Five parts of one method." → "Five parts to my method." Lead line below it
("Read the business, find the priced-wrong offer...") untouched — Brad didn't flag it this round.

## Verification done this session

- All em-dash and quote changes checked against source files
  (`src/data/letters.ts`, `COPY/brad-verified-claims-transcript.md`) before being written, not
  after — every attributed quote is verbatim.
- Live DOM checked at `/` and `/cv/`: 0 rendered em-dashes on both pages.
- Layout checked at true 390px mobile viewport (via proper device emulation, not just a resized
  window — a plain browser resize does not reliably match a real mobile viewport and gave a false
  overflow reading mid-session). No horizontal overflow anywhere on the homepage at 390px. The
  motion-strip grid correctly collapses to a single column under the existing 720px breakpoint.
- The previously-flagged header-wrap-at-390px issue (wordmark breaks to two lines, Contact drops
  to a second row) is still present and still out of scope — confirmed still a wrap issue, not
  overflow.

## Still open, not yet asked

- **Leftover quote batch placement.** Bergh (doctoral candidate), Pilgrim ("game-changer",
  "brings ideas to the table"), Lowry (x2) are verified-verbatim and ready to use, but have no
  assigned slot yet. Natural candidates: `/letters` page itself, or a future homepage section.
  Ask Brad where before placing — don't default to cramming them into existing slots.
- **Housekeeping still open, still not blocking**: `.shots/cdp/**` noise needs a `.gitignore`
  entry and cleanup commit. `.shots/` also picked up several review screenshots this session
  (`review-motion-final.png` and earlier `review-*.png` files from the prior session).

## Standing constraints carried forward

- Noindex gate stays until Brad explicitly signs off the copy.
- `main` auto-deploys to production on push (Netlify site `brad-friis`,
  ID `e8cdef6b-0d72-4133-acf5-f2af31df448f`) — review before commit. Nothing pushed this session.
- Education employer never named; settlement gag; hedges verbatim; no combined/derived figures —
  in particular, never combine the 120%/70% (Brad's own 99 Corp figures) with Nieuwland's
  independently-scoped 30%/70% figures, they measure different things.
- Brad chooses the copy — present options, never swap unasked. This held throughout: every
  wording change this session was either Brad's own dictated text or a set of options he picked
  from.
