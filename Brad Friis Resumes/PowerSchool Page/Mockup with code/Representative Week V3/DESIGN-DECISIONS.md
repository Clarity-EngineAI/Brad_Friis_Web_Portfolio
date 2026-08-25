# V3 design decisions

Written 25 August 2026. V1 and V2 are both untouched and still sit in
`Mockup with code/Representative Week Calendar/` and `Representative Week V2/`.
This is a third standalone build.

V3 exists because of feedback on V2 and then on V3's own first pass. Every point was correct,
and two of them — the filter direction and the Delivery/Operations colour distance — were
errors of reasoning on my part rather than matters of taste. Both are shown with the working
below.

---

## 1. The taxonomy was flattened when it should have been nested

**What V2 got wrong.** V2 read "restructure to three pillars" as "replace the eight categories
with three", so it deleted the layer that actually described the work. Every card then carried
the word OPERATIONS or DELIVERY or GROWTH, thirty times over, which told a reader almost
nothing — those three words are the section headings, and repeating a section heading on every
item inside it is pure redundancy. The specificity that made V1's calendar interesting
("Support and service design", "Finance, contracts and renewals") had been thrown away to buy
a simplification nobody asked for.

**What V3 does.** Three pillars at the top, twelve sub-categories beneath them, four per
pillar. The sub-category is what a card displays. The pillar is what groups them.

| Growth | Delivery | Operations |
|---|---|---|
| Pipeline and qualification | Technical implementation | Commercial and finance |
| Data and targeting | Customer enablement | Partnerships and suppliers |
| Campaigns and events | Learning design and facilitation | People and resourcing |
| Measurement and attribution | Support and service design | Systems and governance |

Twelve rather than V1's eight, because four per pillar divides evenly and because V1's set had
real overlaps — "Marketing and community" against "Commercial and sales", "Support and service
design" against "Implementation and technical delivery". The revised set separates cleanly:
every one of the thirty entries has exactly one obvious home, which was not true of V1's eight.

**Filtering works at both levels, which is the point.** A pillar button takes all four of its
children at once. A chip toggles one sub-category. Any combination is reachable, so a reader
hiring for an account role can take Growth whole, or narrow to Pipeline and Measurement alone
and ignore the campaign work.

**The pillar button therefore has three states, not two.** All four children on, some on, none
on. This is the detail most implementations get wrong — they treat a group control as a
checkbox and it lies about the state underneath it. Here: filled with the pillar's own colour
when all four are on, a coloured ring over a wash when some are, plain when none are, and the
button carries its own count (`2/4`) so the state is legible as a number and not only as a
colour. Clicking a partial pillar resolves *upward* to all four — a click on a partly-selected
group almost always means "give me the rest", and resolving downward would silently discard the
sub-selection the reader just made.

---

## 2. The colour was lifeless, and that was V2's fault, not colour's

**What V2 got wrong, precisely.** V2 correctly diagnosed that V1's eight hues were a
generated-output tell, then drew exactly the wrong conclusion: that the page should have almost
no colour. It shipped three marks, two of which were greys, on a warm-white ground. The result
was defensible on every individual axis — token-pure, contrast-passing, restrained — and dead
on the page. V2's own design note argued itself into this, and the argument was wrong.

The actual fault in V1 was never *that* it used colour. It was that the eight hues were
**unrelated to each other** — a colour-wheel spread with no system behind it, so the palette
read as arbitrary, which is what makes a page look generated. Twelve arbitrary colours would be
worse. Twelve *systematic* colours are not.

**What V3 does: three hue families, four steps each.**

- **Growth** is built on the site's own accent `#9c3d1e` and walks toward amber across four
  steps (H45° → H81°), holding chroma roughly constant. It is the warmest, loudest family
  because commercial action is the one thing the site's accent already stands for.
- **Delivery** runs deep teal to green (H199° → H144°). It is deliberately fenced at H144: any
  further toward yellow-green and it starts closing on Growth's amber end.
- **Operations** runs violet to magenta (H304° → H350°) at C*40.

**The Delivery/Operations correction (your third point, and it was measurable).** The first V3
palette ran Operations as slate-to-plum at C*17–26 and Delivery as blue-teal-to-green starting
at H224. Measured as CIELAB ΔE between the nearest members of each family:

| pair | first attempt | now |
|---|---|---|
| Growth / Delivery | 43.0 | 48.9 |
| Growth / Operations | 50.9 | 45.1 |
| **Delivery / Operations** | **17.0** | **52.7** |

Delivery and Operations were less than half as separated as any other pair. The cause was
visible in the numbers rather than a matter of taste: both families started at low chroma
(C*20.6 and C*17.4), near-identical lightness (L*37 and L*35), and only 52° of hue apart — two
desaturated dark blues. The fix was to move Operations off blue entirely and lift it to C*40,
and to pull Delivery's start from H224 to H199. All three pairs now sit in a tight 45–53 band,
so no pair is the weak one.

**It also survives colour blindness, which the first attempt would not have.** Simulating all
three dichromacies, the worst-case separation between pillar heads is ΔE 23.0 (deuteranopia),
against a ~15 threshold for reliable discrimination. At the original ΔE 17 for normal vision,
Delivery and Operations would have been effectively identical to a deuteranope — and roughly
one in twelve men has some form of the condition, which for a page aimed at hiring managers is
not an edge case.

This is why twelve works where eight failed. A reader does not learn twelve colours; they learn
three families, and the fourth colour in a family is legible as "another Growth" before it is
legible as itself. The same reason a type scale beats twelve arbitrary sizes.

**Contrast was checked, not assumed.** All twelve category colours clear 4.5:1 as text on
`--paper` (range 5.32:1 to 7.52:1), and all three on-dark variants clear 4.5:1 on
`--stat-ground` (7.67:1, 8.67:1, 7.98:1).

**Colour arrives at three strengths, never one.** Full strength on the 3px left rule and on the
sub-category eyebrow; 5% as a wash on the card ground. The card *title* stays `--ink`. A
coloured title would put thirty competing objects on the page, and the title is what a reader
actually scans.

**Nothing here is a new brand colour.** Every hue is a warm-half, low-to-mid chroma value in
the same register as the site's existing palette, and Growth's first step is the site accent
unmodified. The site's own restraint is preserved; what changed is that the page now has
something to be restrained *about*.

---

## 3. The typography had no hierarchy

**What V2 got wrong.** Almost everything was set at `--text-body` or `--text-meta` in weights
400–600. Sizes differed slightly, but no element had a *role*. That is what "undesigned" means
in practice: not that the type is ugly, but that no decision is visible in it.

**What V3 does: six named roles, used everywhere and nowhere else.**

| Role | Spec | Where |
|---|---|---|
| **Display** | `--text-page-hero` / 640 / −0.03em | The H1 only |
| **Lead** | `--text-hero-lead` / 400 / −0.01em / secondary ink / 62ch | Hero and standfirsts |
| **Label** | `--text-enum` / 620 / +0.14em / uppercase / **in hue** | Eyebrows, slot names, tray headings |
| **Title** | 15px / 600 / −0.011em / primary ink | Card titles |
| **Body** | `--text-meta` / 400 / secondary ink / 1.5 | Summaries, panel copy |
| **Numeral** | `--text-enum` / 600 / tabular-nums | Counts |

Three decisions inside that worth naming:

**Negative tracking scales with size.** −0.03em on the display, −0.022em on the panel title,
−0.011em on card titles, 0 on body. Large type set at default tracking is the single most
reliable signal that type was scaled rather than set. This is most of why V2's hero looked
untouched.

**Positive tracking on the labels, and colour lives there.** +0.14em uppercase at 11px is
unreadable as prose and perfectly readable as a tag. That is exactly what makes it the right
carrier for the category colour — it is doing a job no other text on the page is doing.

**Four weights, not "some bold things".** 400 body, 600 titles and controls, 620 labels, 640
display. 620 exists because uppercase tracked labels need slightly more weight than titles to
hold at 11px; 640 because the display needs slightly more than titles to survive −0.03em.

---

## 4. The filter ran backwards

You were right, and this was an interaction-design error rather than a preference. V3's first
pass loaded with all twelve sub-categories switched **on** and asked the reader to switch things
off. Three things are wrong with that:

1. It is subtractive. To narrow to one area you must first understand all twelve, then decide
   which eleven to remove. The additive version asks one question: which of these do I want?
2. Every click makes the page emptier. The reader's actions are rewarded with less content,
   which is exactly backwards for a page whose job is to show range.
3. The resting state was indistinguishable from a deliberate select-everything. "All twelve on
   because I have not chosen" and "all twelve on because I chose them" looked identical.

**What V3 does now.** The page rests with an empty selection, which renders as the whole week —
"All 30". An **All** control sits first in both rows: as a peer of the three pillar buttons in
row one, and as the leading chip in row two. Every sub-category starts off, and the reader turns
them on. Turning the last one off returns to All rather than to an empty page, so a reader
cannot strand themselves on a blank calendar.

Two consequences worth stating:

- **Selection is global, not scoped to a pillar.** Turning on "Pipeline" (Growth) and "Systems"
  (Operations) shows six entries from two pillars. Any other rule makes the count untruthful the
  moment a second pillar is involved.
- **The empty state was deleted, not restyled.** Under this model no reachable path produces a
  zero-entry view: every one of the twelve areas has at least two entries, and clearing returns
  to All. Shipping markup that can never render is how dead code starts.

**The pillar button has three states and its count changes meaning in each.** Off, it shows how
many entries selecting it would add (`Growth 10`). Partially on, it shows which of the four
areas are active (`Growth 3/4`). Fully on, it shows what it is contributing (`Growth 10 shown`).
The first pass showed the same string for off and fully-on, so the number stopped being
informative in the one state where the reader had acted. Clicking a partial pillar resolves
upward to all four — a click on a partly-on group almost always means "give me the rest".

**Amended in the V3.1 visual pass (25 August 2026).** The additive model stands, but the All
affordance moved and gained a partner. All is no longer a fourth pill in the pillar row or a
leading chip in the area row — dressed as a toggle it read as a fourth category, and it occupied
the reader's scan of the vocabulary. All and **Reset** now sit as quiet uppercase text actions in
the bar's head, beside the count. All *fills* the selection (every one of the twelve areas
explicitly on, every chip lit); Reset *clears* it back to the default, entirely-off state. Both
full-grid states still exist and are finally visually distinct: each button disables when it
would change nothing, so the disabled side of the pair tells you which state you are in. The
resting empty selection still renders the whole week — no reachable empty calendar.

---

## 5. The detail panel is a native `<dialog>`

You asked for the popup pattern from the Gemini reference, said you thought it was friendlier
and better on mobile, and invited me to disagree. **I agree, and V2's argument for the slide-out
does not survive checking against the actual layout.**

V2 argued that the reader's task is comparative, so a panel that leaves the grid visible beats a
modal that covers it. Measured: at 1440px the grid is six columns, and the slide-out was
`min(460px, 42vw)` — it covered two of them. What stayed visible was Monday to Wednesday of a
five-day week, so the comparison the panel was defending was already half gone. The argument was
plausible and I did not check it.

The mobile case is not close. The bottom sheet is the better object outright, and the platform
gives it for free.

**What `showModal()` provides that was hand-written before:** the backdrop, the top layer, an
inert background, the focus trap, and Escape-to-close. That is roughly forty lines of script
deleted, including a `Tab`-cycling trap that had to be kept correct by hand. What remains in
`app.js` is bookkeeping the platform cannot know about: a `close` listener, because Escape and
backdrop clicks bypass our own close path, and a re-open guard, because calling `showModal()` on
an open dialog throws — which is what following a connected-work link does.

**What is given up, honestly.** The grid is fully covered while the dialog is open. The
connected-work list inside the dialog is the replacement, and it is the better affordance
anyway: it names the related entries and makes them clickable rather than asking the reader to
spot two highlighted cards in a thirty-card grid.

**Three things the platform does not give you, all now handled:**

- **Scroll lock.** `showModal()` makes the background inert but leaves it scrollable — a wheel
  gesture over the backdrop still moves the page behind the dialog. `html:has(dialog[open])`
  takes `overflow: hidden`, and `scrollbar-gutter: stable` is reserved *permanently* on `<html>`
  so locking does not shift the layout sideways by the scrollbar width as the modal opens.
- **Focus target.** Focus goes to the dialog itself, not to the close button. Focusing Close made
  a screen reader announce "Close, button" before the entry title, and put a focus ring on the
  loudest control on every single open. The dialog carries `tabindex="-1"` and
  `aria-labelledby`, so focusing it reads the title instead.
- **A reachable close on mobile.** The corner X sits ~600px up a bottom sheet, which is the
  least reachable point on a one-handed phone, and a phone has neither Escape nor a comfortable
  backdrop tap. A full-width Close sits at the foot of the sheet, 28px from the bottom edge,
  mobile only.

**The bottom sheet needs `margin: auto 0 0`, not `align-self: end`.** A top-layer dialog is not
a flex item; it is centred by the UA's own `margin: auto`. This cost one debugging cycle and is
recorded because it will recur in the Astro port.

---

## 6. Cards are stretched to a common height

Titles run 19–46 characters and summaries 69–105, so left to size themselves a row of five cards
steps up and down by up to two lines and the grid reads as ragged.

Each card's title reserves two lines and its summary three — the maximum each can need — so
cards align across columns, not merely within one. The cell uses a fixed `grid-auto-rows`
rather than `1fr`: `1fr` divides the cell height by however many cards are in it, so a filtered
cell holding one card rendered it taller than a cell holding two. Verified at 183px for all
thirty cards, and still 183px for all of them under five different filter combinations, with
zero content overflow.

**The reservations are scoped to `.week-grid`, not to the card.** The mobile agenda is a single
column with nothing to align to, so there the same rule produced a visible hole between a
one-line title and its summary. Mobile cards size to their content (131–150px).

---

## Other decisions

**The filter tray is the legend.** An unselected chip keeps its own hue at 62% strength rather
than dropping to grey, so the tray tells a reader which colour controls what even when
everything is off. That is why the page needs no separate colour key — one fewer component,
and the legend is the control.

**Sticky offsets are measured, not hardcoded.** The header and filter bar both change height
with viewport width. V2-style hardcoded offsets buried the day headings the moment the chip row
wrapped, which is exactly what happened during this build. `app.js` measures both and publishes
`--header-h` and `--chrome-h`, re-measuring on resize and after every filter re-render.

**The sticky stack was cut from 37% of a phone screen to 25%.** The heading row is
desktop-only, the pillar buttons share the row equally as a segmented control, and the twelve
chips scroll horizontally rather than wrapping to three lines. A wrapped tray costs every
reader a third of their screen permanently; a scrolling one costs one gesture from the readers
who want the last four options.

**The slot label appears once per row, not once per card.** On desktop the row already says
Morning, so a card repeating it is the same fault as V2's repeated pillar name. On mobile the
agenda groups by day only, so there the slot *is* information and it is shown. One template,
one flag.

**Grid cells hold position when filtered.** A fixed 2×5 matrix, verified holding its shape
filtered down to three entries. Wednesday stays where Wednesday was.

---

## Safety review — Brad's call, 25 August 2026

Brad reviewed the three softenings directly:

1. **"International partner sync" confirmed.** Kept as-is.
2. **Funded training title changed to "MoE funded leadership training"** (was "MoE funded
   training and facilitation"), his direct instruction. Live in `calendar-data.js`
   (`funded-programme-facilitation`).
3. **Conference softening overruled — he wants it more specific ("National conference"), not
   generic.** But V3's `calendar-data.js` carries no conference entry at all — the whole
   conference thread (concept/stand design, logistics, workshop, communications, follow-up)
   that existed in V2 was cut when V3 restructured to twelve sub-categories. This line was
   carried forward from V2 without a live entry to apply to. Brad's call: add a conference
   entry back into V3, titled "National conference." **Not yet built** — needs a day/slot
   placement in an already-full 30-card week, a category assignment, connections, and copy in
   diary tone. Next task, not done this session.

Residual risk: the combination of NZ + edtech + reselling a major international schools
platform + a conference stand + international partners is fairly identifying to a sector
insider even with every proper noun removed. The page currently does not name PowerSchool or
Schoology anywhere; naming them would raise that risk materially. Brad confirmed 25 August
2026: keep the vendor name off the page, platform category only. CV remains the only place the
vendor name appears.

**One new flag specific to V3.** Twelve named sub-categories describe the shape of the business
more precisely than three did. "Partnerships and suppliers" plus "Learning design and
facilitation" plus "Systems and governance" in one small NZ company is a more distinctive
fingerprint than the V2 version was. I judge this still well short of identifying, and the
gain in credibility is large — but it moves in that direction and you should know it does.

---

## Files

- `index.html` — page shell, hero, pillar key, two-level filter tray, calendar mount, close
- `style.css` — type roles, layout, components; commented where a rule reuses a site pattern
- `tokens.css` — verbatim site `:root`, then the three hue families with their construction
- `calendar-data.js` — thirty entries, twelve sub-categories, three pillars
- `app.js` — render, additive two-level filter, tri-state pillar logic, dialog, sticky measurement

Open with a local server (ES modules will not load from `file://`):

```
cd "Mockup with code/Representative Week V3" && python3 -m http.server 8901
```

Then http://localhost:8901/index.html

---

## V3.2 — Brad's correction pass (25 August 2026)

Brad rejected four things in V3.1, and each produced a standing rule:

1. **No purple, ever.** The Operations violet-magenta family is gone. Operations now
   holds one deep blue (~H207) and walks lightness dark-to-light (#1b4a75, #235a8a,
   #2c699e, #3273ab) — four steps from lightness, not hue, so it cannot drift toward
   violet. All four clear 5:1 on paper.
2. **No numbers anywhere.** Pillar numerals (01–03), the "All 30 / N of 30" count and
   the per-pillar toggle counts are all removed. The reader does not care how many
   entries there are. All/Reset disabled states alone now distinguish the two
   full-grid states.
3. **The calendar is the page.** Hero cut to eyebrow + one-line H1 (at page-hero
   scale, not display scale) + three plain sentences. The pillar key and disclosure
   note moved BELOW the grid. Filter bar and calendar now start above the fold.
4. **Copy register: personable first person.** Every summary and detail rewritten as
   Brad telling a colleague what the work was. No epigram openers, no sales language.

Content rebuilt from `scope-summary.md` (Brad's own dictated notes): all nine
conference entries removed, replaced by the feature-launch thread (media/promotion →
training design → support briefing → billing plan), the school-board renewal pair
(preparation → presentation), annual uplift and exchange-rate planning, the Ministry
integration tool, proposals/EULAs, and bespoke onboarding design. Category labels
updated: "Pipeline and renewals", "Campaigns and launches".

---

## V3.3 — the interaction pass (25 August 2026)

Your verdict on V3.2: the scrolling and disappearing cards under the sticky header
"kills the whole effect of seeing it all at once"; too many fonts and sizes "competing
for hierarchy"; "there should be zero need to tell a user to filter by pillar or the
work itself if it is well enough designed"; the post-click journey needs to guide the
reader. All five are addressed below.

### 1. The whole week now reads as one object

**The measurement that changed the target.** You asked what a standard laptop screen
is. A 13-inch MacBook has a 900px screen, but Chrome spends 143px of it on tabs and
address bar — measured in this browser, not estimated — so the page gets ~760px. A
common Windows laptop at 125% scaling gets ~745px. A 16-inch gets ~995px. A desktop
monitor gets ~1300px. There is no single number to design to, which is why a grid
tuned to any one of them is wrong on the other three.

**So the grid is sized in viewport units, not pixels.** The calendar owns one screen
(`min-height: calc(100dvh - header)`) and its card rows divide that space between
them. On a 13-inch laptop the cards are compact; on a desktop they are generous; on
both, all thirty entries are visible at once, which is the actual requirement. A
`max(76px, ...)` floor stops it becoming clever-and-broken: below that the cards
could not hold their content, so the page scrolls a little instead. A too-small card
is worse than a short scroll.

**What paid for it, in order of how much each returned:**

- **Card summaries moved into the dialog**, which already repeated them verbatim.
  Your lever, and by far the biggest: it halved card height.
- **All desktop stickiness deleted.** Day headings and the filter bar both existed to
  survive a scroll that no longer happens. They were also the literal thing you
  described as killing the effect — the filter bar floated a translucent blur over
  the top row of the cards it filters. The JS-measured `--chrome-h` that positioned
  them is gone with them; `syncStickyOffsets` now measures one value, for the mobile
  agenda's day headings, which do still scroll and do still need it.
- **The filter moved into the hero's empty space.** The H1 is four words in a 450px
  column, so ~150px sat empty directly beneath it while the filter bar below cost a
  further 134px. Two blocks now cost one block's height.
- **The eyebrow and the "The week" zone label are gone.** Your call on the eyebrow;
  the zone label was a type voice spent telling the reader that a grid of five day
  columns is a week.

**What was tried and rejected.** Fitting the hero AND the grid on one 760px screen
was built and measured: it forces 54px cards, which cannot hold a category label plus
two lines of title. Even after dropping the site header entirely it was still 34px
short with cards at their floor. That build is not what shipped — the hero scrolls
past and the calendar gets a whole screen instead, which is the honest resolution.
No copy was cut to achieve any of this.

### 2. Typography — six roles down to five, one tracking value

The roles were sound; the page was not spending them. Three faults:

- **NUMERAL is deleted, not merely unused.** Its only user was the agenda's per-day
  entry count, and counts are banned. A role with no legitimate user is a size
  waiting to be misapplied.
- **The card carried four voices** — slot, category, title, summary — inside a 189px
  box. It now carries exactly two: category label and title.
- **LABEL had drifted into four near-copies:** `.t-label` at 0.14em, `.entry-cat` at
  0.12em, `.slot-head` at 0.14em, `.entry-slot` at 0.1em. Four tracking values doing
  one job is precisely the clash you saw. One value now, 0.12em, everywhere.

The click affordance is an icon rather than a word for the same reason: an arrow
carries no size, weight, case or tracking, so it cannot become a third voice.

### 3. The controls explain themselves

The instruction sentence is deleted. In its place the bar is **one row per pillar**:
the pillar button, then its own four areas, bracketed by a rule in that pillar's hue.
V3.2 stacked three pillars in one row above twelve chips in another, which stated the
two-level relationship in the markup and hid it from the eye — a reader could not tell
which four of the twelve a pillar governed without clicking one and watching. Adjacency
and shared colour say it without a word. All and Reset ride the first row as quiet text
actions, each disabled when it would change nothing, which is still the only visible
difference between "resting" and "everything explicitly on".

### 4. The arrow

Bottom-right, your call after I put the convention argument to you. Tertiary ink at
rest, the card's own hue on hover, so pointer users get two signals (arrow plus lift)
and touch users get one. Card padding reserves its corner so a long title never runs
underneath it.

### 5. The connected-work journey

- **Each connection says where it sits** — "Wednesday afternoon · Pipeline" — not just
  its title. On a calendar that placement is the whole reason the work is on a
  calendar; a list of bare titles would be indistinguishable from a related-links
  widget.
- **A labelled way back.** "Back to [previous title]", not a bare chevron: the browser
  history metaphor is wrong inside a dialog that never changed URL, and an unlabelled
  back control gives no reason to press it. It is backed by a trail stack, not a single
  previous id, because the connections are a graph — A to B to C is two clicks and
  "back" from C has to mean B.
- **Close returns the reader to where they ended up.** After a two-step journey the card
  they close on is not the card they opened, so that card is scrolled to, focused and
  briefly ringed. Verified: opening card 1, following a link, then closing lands focus
  on the *connected* card with the highlight applied.
- The `is-linked` grid ring is invisible on mobile because the sheet covers the grid;
  the day/slot line inside the dialog does that work there.

### 6. Interaction standard — verified, not assumed

Checked in the browser at 1440x760 and device-emulated 390x844:

- Filter state machine correct at every transition: rest 30 entries (Reset disabled) /
  All 30 (All disabled, three pillars "all") / minus one chip 26 (that pillar "some") /
  Reset 30 / single pillar 10.
- Focus: opens on the dialog itself (not the close button), returns to the correct card
  on close, tab order matches visual order across all 30 cards, Escape closes.
- Touch targets: All and Reset were 25px and are now padded to 44px with a negative
  block margin, so the target grows without the layout moving. The remaining sub-44px
  controls are the site header's nav links, ported verbatim from the live site and out
  of scope for this page.
- `prefers-reduced-motion`: the blanket rule applies to everything, with one carve-out —
  `.just-visited` becomes a static ring instead of a pulse. Killing it outright would
  silently delete the answer to "where did I end up" for those readers, which is
  information, not decoration. An earlier draft wrote `*:not(.entry)` to achieve this
  and was wrong in the other direction: it exempted the card's hover transform too.
- No layout shift on any toggle: chips keep the transparent-border trick.
- Console clean. `node --check` passes on both JS files. No horizontal overflow at 390px.

**One real bug found and fixed during verification:** at 390px the `.filter-group` rows
overflowed the page to 432px instead of scrolling their chips. Cause was the flexbox
`min-width: auto` default — and fixing only the inner chip strip left the overflow
exactly where it was, because the parent row needed the override too.

**A second:** the back button's label was hidden but not cleared when the trail emptied,
leaving "Back to X" pointing nowhere in the accessibility tree.

### Still yours to decide

The hero lead's last sentence — "This is what a typical week looked like — click any
card to see what the work involved" — is an instruction, and section 3's whole argument
is that a well-designed page needs none. Every card now carries an arrow. I have left
the copy exactly as you wrote it; removing that clause is your call, not mine.
