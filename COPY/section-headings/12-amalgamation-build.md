# The amalgamation build — homepage rewrite, 18 August 2026

**Status: In use.** Shipped to `src/pages/index.astro` the same day, against Brad's rulings in
`design/12-homepage-amalgamation-proposal.md` §9. This file is the record of what was written and
why — not a draft awaiting a decision.

Two open items were resolved directly with Brad during the build (not delegated or assumed):

- **Training verb:** "created and delivered" ships, not Brad's verbatim "built and delivered" —
  his call, choosing the constraint-7-compliant form over the override.
- **Field-notes teaser:** the plastic-bags story, placed in the Canwest career row (2003). Steak
  Out stays a standalone blog post with no homepage teaser, per ruling 6.

---

## Five capability cards (`capabilities` array)

Grouped per the proposal §4 table — strategic, creative, retention, commercial, product (pillar 5,
the piece Brad flagged as missing). Titles deliberately vary their opener after a first draft had
all five start with "I" (caught in the constraint sweep, matching the exact fault Brad already
corrected once in `COPY/positioning/positioning-lines.md`): *Read the business…*, *Find the
offer…*, *Keep accounts…*, *Own the terms…*, *Know the product…*.

Card 2 (creative) originally read "The same instinct **built** a $70k referral network at Xplore
and a two-tier product at Adplus, twenty years apart" — banned verb on Brad's own work, and a
dollar-figure adjacency that invited mental stacking. Fixed to "founded a referral network... and
shaped a two-tier product," with the year-gap claim dropped rather than sourced.

## One motion, four eras (`graphicEras`, `.motion-strip`/`.motion-track`)

Option A from the proposal, built as a static horizontal hairline with four nodes (2001, 2009,
2013, 2015), each an era label plus registered fact — no cumulative year count. New CSS in
`src/styles/global.css` (`.motion-track`, `.motion-node`, mobile stacks to a left-rail list under
640px). No scroll-trigger, no reveal animation — the constraint (§7.1, motion that announces itself
is decoration) ruled that out from the start.

## Four moments (`workCaseStudies`)

108 calls, five-campus, MySimpleSiteMan, reseller renegotiation — per ruling 5. The MySimpleSiteMan
moment carries no link (register: withheld as a published reference) and stays framed as "the one
time I've failed," matching the register's "singular, human, not a pattern" instruction.

## Proof strip (`stats`)

2000AD's slot replaced with **8 years** / "Consecutive renewals, one account" — the eight
consecutive renewals at the anonymous school, per ruling 4. School not named (Sancta Maria College
consent is not granted for the homepage).

## Career rows (`careers`)

- 2001 (Adplus/Tracta) row expanded with the module-upsell detail and the 60%/40% three-year
  Visitor Guide figures.
- 2003 (Canwest) row keeps the Harvey Norman line but **split into two sentences** — the register
  explicitly bars pairing the Harvey Norman name with "never lost an account" phrasing in one
  sentence; a first draft did this and the constraint sweep caught it.
- 2015 row rewritten as "Ran every function that touches the customer," carrying the newly
  registered commercial breadth grouped demand/land/keep/grow, per the proposal's added-scope
  ruling. No GM-title claim, no edtech fencing — matches Brad's three caveats.
- 2013 (99 Corporation) row and the matching moment both use **Rob Nieuwland's figure set** (around
  30% more profit per customer, around 70% more clients) — the ruled homepage set. Brad's own
  70%/120% set is deliberately absent from the homepage, staying registered but off it.
- 2025 row renamed off "Clarity Engine AI" (unregistered) to "Take AI fluency into the account, not
  the headline" — Pikle named once, demoted.

## Letters section reduced to a pointer

Per the proposal's component-mapping table: the two 2025 quote cells stay, but the heading and lead
were rewritten off the "customers who nearly left" framing (which duplicated the moments section)
to a plain pointer — "Six reference letters, published in full" — and the footer link now says
"Read all six," matching the site's approved span language.

## Now-coda

New section, capability-first framing per ruling 3 and the 18 August register addendum: fluency and
efficiency-spotting as the claim, Pikle mentioned once and demoted, no "AI literate" self-label,
nothing implying a shipped product.

## Fixed regardless

The Xplore-row 99-Corp figure misattribution (§5 item 1 of the proposal) is resolved by this
rewrite — the 99 Corp figures now sit only under the 2013 row and the matching moment, not under
Xplore.
