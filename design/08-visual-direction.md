# Visual direction — adopted attributes

**Written:** Thursday 13 August 2026, 3:30 PM NZST
**Status:** Approved by Brad. Supersedes the visual guidance in `07-framer-feasibility.md` §"Fallback: materials-only graft", which remains valid for its token values (spacing ladder, radius ladder, border alphas).
**Delivery path:** bespoke Astro static site. Framer and the Prolens template are abandoned.

## Where this came from

Brad supplied six reference images and asked for their attributes to be assessed, explicitly excluding
their fonts and background colours.

- `design/Fresh Designs/typography styling example.png` — editorial café page. Source of the scale-contrast idea.
- `design/Fresh Designs/{Typography layout and whitespace, typography and layout, font styling and layout, fonts styling whitespace and sizing} example.png` — four views of one dark AI product site. Source of enumeration, hairline grid and accent discipline.
- The Eleken screenshot (warm off-white, centred hero, pill selector) — the composition and hierarchy model, and the closest of the six to this site's existing palette.

Brad approved every attribute below and chose **measured** over bold: one oversized moment, restraint
everywhere else. His words: "we can always rewind if it's too much."

## The ten adopted attributes

1. **Hierarchy uses three signals at once.** Size, weight and colour all shift together between heading
   and body — roughly a 2.4:1 size jump, bold against regular, near-black against mid-grey. The old
   build varied size alone, which is why hierarchy read as mushy. The fix is mostly making body copy
   lighter and greyer, not making headings bigger.
2. ~~**One oversized moment: Brad's name in the hero.**~~ **Re-pointed 13 August 2026, Phase 1.**
   The oversized moment is now **the first-person claim**, not the name. Brad rejected the previous
   hero for saying "Brad" three times in one viewport; a name only matters after someone cares.
   The name now appears once above the fold, in the nav wordmark only.

   The claim carries `clamp(2.25rem, 4.2vw, 3.25rem)` capped at a 19ch measure, dropping to
   `1.875rem` at 640px — a sentence cannot carry the 9rem name scale without running to eight
   lines and pushing the portrait off the first screen. It remains the largest type on the site and
   nothing competes with it. Verified clean at true 390px with no clipping or horizontal scroll.
3. **Segmented pill selector for capabilities.** A horizontal row of rounded-full pills — selected pill
   is an ink fill with white text, the rest hairline-outlined — above a detail panel. Replaces the
   two-column list/detail workspace. Lighter, collapses to a wrapping row on mobile with no separate
   grouped-list treatment, and matches the hero tag pills.
4. ~~**Numbered enumeration on every set.**~~ **Withdrawn by Brad, 13 August 2026**, after seeing the
   built site: "they mean nothing. It also allows content to be lifted up and reduces the amount of
   content." Numbers are gone from capabilities, work, references and career, and from `/letters/`. The
   `.enum` class survives only for the "Newer"/"Older" pager labels on a letter page. Sets are still
   made to read as deliberate — by the hairline grid of attribute 6 and the two-tier captions of
   attribute 7, which carry that load without the numerals.
5. **Eyebrows are small bordered pills**, not plain text labels.
6. **Hairline grid cells, not floating cards.** Sets of four share continuous divider lines so the group
   reads as one considered table. Two border strengths only: 10% ink for containers, 6% for dividers
   between siblings.
7. **Two-tier captions.** Name or year in a slightly larger cut, then a smaller, greyer meta line
   beneath. Never on one line. Applies to references and career entries.
8. **Accent on small marks, plus three functional jobs.** **Amended 13 August 2026, Phase 1.** The
   palette was never the problem — `#9C3D1E` was defined and barely used, which is why the site read
   as monochrome. The accent now does three consistent jobs and no others: **the stat-band figures,
   the section eyebrow pills, and the single primary CTA.** Links and focus rings keep it as before.

   The CTA fill is a deliberate exception to the old "never a fill" rule: one pill-sized button is
   what makes the primary action findable, and it is the only fill permitted. Still never a heading,
   never a large area, never scattered.

   On near-black grounds `#9C3D1E` measures **2.71:1 and fails**, so the stat band uses
   `--accent-on-dark: #e8935f` at **7.67:1**. Both are tokens; no raw colour literals.

   The accent value itself is unchanged and stays Brad's call. The previous `#0b57d0` is gone; Brad
   called it ugly, and a cold Google-blue on warm parchment is the reason it jarred.
9. **Section headings are statement sentences with a full stop.** "Sell, Build, Enable" and "The
   Commercial System" and "Commercial Range" were noun phrases. Borrow the form from the references,
   never their adversarial tone.
10. **Short blunt fragments, then a turn**, in section intros. This is Brad's "more to the point"
    request expressed as a copy rhythm.

## Line breaking and the fluid type ladder — added 15 August 2026, design sweep

Brad, on seeing the built site: *"look out for places where the text is wrapped earlier than it
should be... Never start a sentence with one word then continue on the next line."* Measured before
changing anything: **21 single-word last lines across the 13 built pages**, and no horizontal
overflow at any width.

**11. No line ends on a stranded word.** Two causes, two fixes, both in `global.css`:

- **`text-wrap` was never set on running copy.** Headings had `balance`; paragraphs, list items and
  blockquotes had nothing. `pretty` is now set on `p, li, dd, dt, blockquote, figcaption` at the base
  layer, so a new block inherits it instead of needing a per-component patch. Verified: homepage went
  from 7 widows to 0 with this rule alone.
- **`ch` caps throttling lines short of their column.** A prose measure applied to something that is
  not prose. The contact discipline list (`Sales Growth · SaaS · … · AI`) was capped at `44ch` inside
  a much wider column and stranded "AI" at 3 per cent line fill. A keyword run has no reading-measure
  argument, so `.contact-disciplines` opts out of the cap.

**Result: 21 widows → 0 at 1440px, 1 at 390px, no overflow at 1440/1024/390.** The remaining one is
`/letters/hawkes-bay-tourism/`, whose verbatim text ends on `www.hawkesbaynz.com` — an unbreakable
20-character token that cannot share a line on a phone. `overflow-wrap: break-word` is set on letter
bodies; beyond that the only fixes are hyphenating a quoted URL or shrinking the type, and **the
letters are published verbatim, so the wrap gives way, never the words.**

Two more at 1024px are short trailing words in the four-up stat band's 185px columns, not
sentence-opening orphans. Fixing them means changing the band's grid; left alone deliberately.

**12. Fluid sizes are named tokens, not inline clamps.** Seven ad-hoc `clamp()` expressions sat
beside the fixed token block, three byte-identical, which is how the scale drifted. Now
`--text-hero`, `--text-page-hero`, `--text-section`, `--text-hero-lead`, declared in hierarchy order
so a new section cannot invent an eighth value.

`.stat-figure` is the one deliberate exception and keeps its own clamp. Reason, previously unrecorded:
the figures are `nowrap` in a four-up band and `2,800 → 24,500` is the widest string on the site — at
the section step's `3.4vw` middle term it overruns its column between 900px and 1100px. Same floor and
ceiling, slower middle term.

**13. Interior headings sit below the homepage hero.** `.page-hero h1` rendered at **56px against the
hero's 52px** at 1440px, so an interior page outranked the front door. Now `clamp(2rem, 4.4vw,
2.875rem)`, above the section step and clear of the hero. Its `16ch` cap also forced "A few things
that / happened." to strand a word; `22ch` lets the short page titles hold one line.

**Still open: the hero ratio itself.** The hero is only **1.3×** its own section headings and 3.47×
body, and 52/40/37px sit within 28 per cent of each other at three heavy weights — that flatness is
what reads as busy, not the hero's absolute size. Attribute 2 is Brad's approved decision and the
headline is now a sentence, so the old 9.6× ratio is not available as written. **Brad's call, not
taken in this sweep.**

## Explicitly rejected

- **No accordion on the career section.** Career is proof and must be visible, not hidden behind
  clicks. The accordion pattern is acceptable for capability detail on mobile only.
- **No auto-scrolling logo marquee.** A static wrapping grid is calmer and does not fight the
  editorial tone.
- **No adoption of the dark references' palette, fonts or voice.** Brad excluded fonts and backgrounds,
  and that site's combative marketing tone is wrong for a hiring site.
- **No window chrome, dock, dashboard widgets or command-centre naming.** Unchanged from earlier
  non-negotiables.

## Open

- **Hero and capability-label wording.** Revised 13 August 2026 after Brad rejected the Phase 1
  proposal as "strange" and "too abstract". The label now reads "Account management · retention &
  growth"; the claim reads "I keep the accounts other people would have lost, and I grow them."

  The rejected pair argued net-new cold-market entry, which is the wrong job: Brad's stated target
  is a **high-value account management role with commission on both retention and upsell**. It was
  also fenced to SaaS, discarding the media and agency years. Both replacements are interim —
  Phase 3 rewrites the page against the target and may revise them again.
- Whether the logo strip survives review. It skews to the media and agency years and may pull the
  story away from SaaS. It sits below Work and is framed by date range to limit that. Cut it if it
  still pulls focus.

## Closed in Phase 1

- **The real portrait.** Live in the hero, `src/assets/brad-friis.jpg`, served through
  `astro:assets`. The monogram placeholder and its CSS are gone. The studio ground is brighter than
  the paper surface, so the image carries `mix-blend-mode: multiply` over `--surface-alt` to settle
  it without touching the pixels. The availability chip overlays the foot of the frame.
- **The capability panel at 1440px.** The `62ch` text measure was correct and is unchanged; the
  container was the fault. `.capability-stack` now caps at `74ch` and centres, so the panel sits
  just clear of its own measure instead of stretching the full 1180px shell.
