# V2 design decisions

Written 25 August 2026. V1 is untouched and still sits in
`Mockup with code/Representative Week Calendar/`. This is a standalone rebuild in
`Mockup with code/Representative Week V2/`.

---

## What actually made V1 read as generated

"Generic AI output" is a symptom. Five specific causes, each with the fix.

### 1. It carried a second, competing design system

V1 shipped its own `tokens.css` with sixteen bespoke category hues, two full themes, a
`--focus` colour (`#1c5f78`, a blue that appears nowhere on bradfriis.com), a `--shadow`
token, and Manrope as the typeface. The live site uses Inter, one accent, no shadow tokens,
and focus rings drawn in the accent.

So the page did not look like a prototype of the site. It looked like a well-made artefact
from a different site, which is worse, because the mismatch is legible at a glance without
being attributable to any one element.

**Fix:** `tokens.css` in V2 is a verbatim copy of the live site's `:root` block, with a
comment saying it is replaced wholesale rather than patched if the site's tokens move. Every
colour, radius, type step and the font stack now come from there. The only additions are the
three pillar variables, and two of those three are aliases of existing site tokens.

### 2. Eight hues on a page whose design language has one accent

The eight-hue palette was the single loudest generated tell. It is what an assistant does
when asked to distinguish categories — reach for a colour wheel — and it is the opposite of
what this site does. The live site spends its accent in exactly three places (stat figures,
eyebrow pills, one pill CTA) and draws everything else in a two-strength hairline and three
ink weights.

**Fix:** three pillars, three marks, no new hue. Growth takes the existing accent, because
commercial action is the one thing the site's accent already stands for. Delivery takes
primary ink. Operations takes a light warm grey at the site's `--line-hover` weight. The
useful side effect: two of three marks are greys, so colour physically cannot be the only
cue — which is the accessibility position V1's implementation note argued for and then
undermined by shipping eight saturated hues plus tints.

The mark itself is a 3px vertical stem, not a dot. At 3px a circle reads as decoration and a
square reads as a checkbox; a vertical stem reads as an index mark, and it is already the
site's vocabulary — `.career-quote` and `.career-aside` both use a left rule as their
signature.

### 3. Cards floating in gaps, which is the universal template shape

V1 rendered day columns of separately-bordered cards with gaps between them. That
gap-and-card arrangement is the default output of every dashboard template, and it is not
what this site does anywhere. The site's signature container is `.hairline-grid`: one outer
1px border, one radius, and interior cells divided by `--line-soft` rules with no gaps at
all — used for work cells, capability cells and quote cells.

**Fix:** the desktop calendar is `.hairline-grid` taken from two columns to six. One outer
hairline, `--r-card`, interior rules only. The calendar now reads as the same physical object
as the homepage cards rather than as a widget dropped beside them. The three pillar
standfirsts above the filter use the same grid at three columns, which is what teaches the
marks before the reader meets them — so the calendar needs no legend.

### 4. Spacing that was on a different ladder

V1 used rem values throughout (`0.75rem`, `1.25rem`, `1.5rem`) which land on 12/20/24px — a
different rhythm from the site's 4 6 8 10 12 14 16 18 22 26 28 40 48 56 72. Two rhythms in
one page is a texture difference the eye reads before it reads any content.

**Fix:** every spacing value in `style.css` is on the site's ladder. Section padding is
`72px / 48px`, cells are `26px 22px`, cards are `12px 14px`, gaps are 6/8/10/12/18/22/26/28.

### 5. The permanently-mounted empty panel

V1's desktop detail was a fixed side panel always present in the layout. Before the reader
chooses anything it is either blank or showing stale content, and an empty container
occupying a third of the viewport is one of the strongest "unfinished template" signals
there is.

**Fix (and the justification the prompt asked for):** a slide-out that is only in the
viewport when it is open, with a scrim. Reasons for the slide-out over a modal:

- The reader's task is comparative — "what else was in that week?" A centred modal covers the
  grid it is being compared against. A right-hand panel leaves Monday through Wednesday
  visible.
- Connections. The panel lists connected work as followable buttons; following one from a
  modal would mean the reader never sees the grid change underneath. From a slide-out, the
  connected card is visibly there when the panel closes.
- The mobile bottom sheet is the same object entering from a different edge, so the two
  breakpoints are one component, not two.

The trade accepted: a slide-out costs a focus trap and an inert background, which a
persistent panel does not need. Both are implemented (`Tab` cycles inside the panel,
`Escape` closes, focus returns to the originating card, breakpoint changes close rather than
re-animate from the wrong edge).

---

## The three-pillar restructure

Eight flat categories asked the reader to hold eight things in mind before the calendar meant
anything, and several of them overlapped in ways only the author could see — "Marketing and
community" against "Commercial and sales", "Support and service design" against
"Implementation and technical delivery".

Three pillars is the number a reader can hold without a legend, and it maps onto the argument
the CV already makes: found the work, did the work, ran the business that let both happen.

Where a piece of work genuinely spanned two pillars, that is recorded as text in the detail
panel ("This work also ran into Operations") rather than as a second colour. A card carries
one mark. This is the thing V1's `relatedCategories` got wrong by rendering as a row of
neutral chips on every card, which put six to eight small objects on a card whose job was to
carry a title.

Content note: the prompt listed ten entries per pillar (thirty total) while the surrounding
text said fifteen. I built all thirty, since dropping half would have meant choosing which of
your work to cut. Two slots per day (Morning, Afternoon) rather than V1's three, because
thirty entries over three slots leaves gaps and a gappy grid reads as broken data.

---

## Other specific choices

**"Reset to all three" is not a fourth toggle.** V1 had an `All` button pressed at the same
time as all eight category buttons, so on load nine controls looked selected and none read as
a choice. In V2 the three pillar buttons are the set; the reset is an underlined text control
that is hidden while it would be a no-op.

**Selected card inverts to ink, not accent.** The site bars the accent from large fills; its
one sanctioned exception is a single pill CTA. A selected card takes `--stat-ground`, which
is the inversion the site already uses. The pillar stem lifts to `--accent-on-dark` so the
mark survives the inversion — that token exists for exactly this reason.

**Grid cells hold position when filtered.** Filtering renders into a fixed 2×5 matrix rather
than reflowing to only populated columns. V1 dropped empty day columns entirely, so the
week's shape changed on every filter click and the reader lost their place. The cost is
whitespace in a filtered view; the benefit is that Wednesday stays where Wednesday was.

**Motion.** One transition curve (`cubic-bezier(0.32, 0.72, 0, 1)`, 280ms) for the panel;
180ms linear-ish eases on hover states. No entrance animations, no staggered reveals — the
site has none, and staggered card reveals are themselves a generated-template tell.

**Header at 390px.** Ported verbatim from the live site's 640px block rather than invented:
the site solved this exact wrap on 19 August 2026 by stacking the wordmark above the nav.
Copying it keeps the two headers identical instead of near-identical.

---

## Safety review — three items I want your call on

Per the mandatory check, no customer, school, contract, financial figure, attendance number
or conference name appears anywhere in the thirty entries. No figures at all appear, and the
cleared "roughly 650" figure was not needed by any entry, so it is not used.

Three items I softened, and would rather you overrule than have me publish silently:

1. **"International reseller management" → "International partner sync".** "Reseller
   management" plus PowerSchool/Schoology plus New Zealand describes a very small set of
   companies. The entry now says the role operated between a platform partner's roadmap and a
   local market, which carries the capability without the org-chart detail.

2. **"Government-funded facilitation" → "Funded programme facilitation".** In NZ edtech,
   naming the funding channel plus the vendor is a second narrowing axis. The capability
   (facilitating under external funding obligations) survives intact.

3. **"Conference" left generic, "national" removed.** The title stays "Conference concept and
   stand design" but no entry calls it national or annual. "The annual national NZ schools
   conference where the PowerSchool reseller had a stand" is close to an identifier for anyone
   in the sector.

The residual risk I cannot design away: the *combination* of NZ + edtech + reselling a named
US platform + running a conference stand + managing international partners is itself fairly
identifying to a sector insider, even with every proper noun removed. If the page names
PowerSchool/Schoology anywhere (it currently does not — that decision is open), that risk goes
up materially. My recommendation is that the page describes the platform category and lets the
CV carry the vendor name, but that is your call and not mine.

---

## Files

- `index.html` — page shell, hero, pillar keys, filter bar, calendar mount, close section
- `style.css` — all layout and component CSS, commented where a rule reuses a site pattern
- `tokens.css` — verbatim copy of the site `:root` plus three pillar variables
- `calendar-data.js` — thirty entries, three pillars, same object shape as V1
- `app.js` — render, filter, detail panel, focus management

Open with a local server (ES modules will not load from `file://`):

```
cd "Mockup with code/Representative Week V2" && python3 -m http.server 8899
```

Then http://localhost:8899/index.html
