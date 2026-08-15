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
