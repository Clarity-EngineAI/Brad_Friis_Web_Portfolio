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
2. **One oversized moment: Brad's name in the hero.** Fluid, roughly `clamp(3.5rem, 11vw, 9rem)`,
   weight 650–700, tracking −0.045em, line-height 0.95. It may approach the margins but must never
   clip or cause horizontal scroll at 390px. Nothing else on the site competes with it.
3. **Segmented pill selector for capabilities.** A horizontal row of rounded-full pills — selected pill
   is an ink fill with white text, the rest hairline-outlined — above a detail panel. Replaces the
   two-column list/detail workspace. Lighter, collapses to a wrapping row on mobile with no separate
   grouped-list treatment, and matches the hero tag pills.
4. **Numbered enumeration on every set.** Capabilities 01–04, work 01–04, references 01–06, career
   01–07. Small, wide positive tracking, accent-coloured. Makes a group read as deliberate rather than
   as a pile.
5. **Eyebrows are small bordered pills**, not plain text labels.
6. **Hairline grid cells, not floating cards.** Sets of four share continuous divider lines so the group
   reads as one considered table. Two border strengths only: 10% ink for containers, 6% for dividers
   between siblings.
7. **Two-tier captions.** Name or year in a slightly larger cut, then a smaller, greyer meta line
   beneath. Never on one line. Applies to references and career entries.
8. **Accent on small marks only** — enumeration numbers, eyebrow pills, links, focus rings. Never a
   fill, never a heading, never a large area. A warm accent that belongs to the stone palette: deep
   terracotta near `#9C3D1E` or deep ink-teal near `#1F5D5B`. The previous `#0b57d0` is gone; Brad
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

- The real portrait. A placeholder slot is built; the image swaps in when Brad supplies one.
- Whether the logo strip survives review. It skews to the media and agency years and may pull the
  story away from SaaS. It sits below Work and is framed by date range to limit that. Cut it if it
  still pulls focus.
