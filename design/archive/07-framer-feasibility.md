> **Archived 17 August 2026.** The site is a bespoke Astro build; Framer and the Prolens template are abandoned. Read `design/00-current-direction.md` first. The reasoning here still stands where it is about positioning, copy or layout logic — ignore anything about Framer as a delivery path.

# Framer feasibility — list/detail workspace and iOS grouped lists

**Written:** Thursday 13 August 2026, 2:07 PM NZST  
**Status:** Feasibility assessment for Option A. Does not change the paste sheet, the 06 direction files or the live build.  
**Tests:** `design/06-hybrid-direction.html` (Desktop and Mobile)  
**Copy source of truth:** `COPY-SOURCE-OF-TRUTH.md` — unchanged by this document.

All Framer behaviour below was checked against Framer's live documentation on 13 August 2026, not from memory. Links are in the Findings section.

---

## Verdict

**Framer can build the list/detail workspace natively, without a custom code component — but not by editing a Prolens section.** Two native routes exist. The better one uses the CMS Dynamic Filters feature Framer shipped on 19 February 2026: a Tabs filter writes to a page variable on click, and a Collection List bound to the same variable swaps its contents, all on one page with no navigation. The filter control is an ordinary canvas layer that can be placed anywhere, so the tabs sit in the left column and the list renders in the right panel. The second route uses Events and parent-component variants, which works but duplicates the row list once per selectable item. The honest catch is architectural rather than technical: **Collection Lists cannot live inside a component**, so the workspace has to be assembled directly on the homepage next to Prolens's sections, not built as a tidy reusable block and not grafted into the template's existing About or Projects components. In practice that means Option A is not "adapt Prolens lightly" — it is "delete two Prolens sections and hand-build one new section in their place, twice". That is a half-day to a day of careful work per workspace, plus breakpoint testing, and it leaves Brad maintaining a section the template author never wrote. The mobile grouped list, by contrast, is trivially native and carries almost no risk.

**Recommendation: build one workspace (Capabilities) using the CMS route, ship it, and judge it live before touching Work. If the first one costs more than a day or destabilises the phone breakpoint, fall back to the materials-only graft in section 4 and keep the cards.**

---

## Findings

### Q1. Can Framer build list/detail without a custom code component?

Yes. Here is what each primitive actually does today.

| Primitive | Verdict | What the documentation says |
| --- | --- | --- |
| Variants | Works | A component holds multiple states; transitions animate between any two. Variants are the only real state machine Framer exposes on the canvas. ([Component Variant](https://www.framer.com/dictionary/component-variant)) |
| Interactions → Set Variable | **Does not exist** | There is no "Set Variable" or "Change Variable" action in the Interactions panel. The panel offers New Transition, New Event and Choose Event only. Events are triggers; they do not carry or assign values. ([Framer community, 2026](https://www.framer.community/c/support/can-t-change-variable-value-on-click)) |
| Event variables | Works | An interaction inside a child component fires a named event; the parent listens for that event and transitions to a chosen variant. This is Framer's sanctioned way to make a clicked row change something outside itself. ([Using event variables](https://www.framer.com/help/articles/using-event-variables/), [Framer Academy](https://www.framer.com/academy/lessons/framer-animations-component-events)) |
| CMS Dynamic Filters | Works, and is the best route | Select a Collection List → Content → Filter → choose a field → under **Dynamic**, choose a filter type. Tabs, dropdowns, checkboxes, toggles and search fields are available. Framer creates a page variable per filter. The control is added as a regular canvas layer, so it can be moved and styled independently of the list. ([How to add dynamic filters](https://www.framer.com/help/articles/how-to-add-dynamic-filters/), [release note, 19 Feb 2026](https://www.framer.com/updates/cms-dynamic-filters)) |
| Tabs filter, specifically | Works, with a field-type constraint | The Tabs filter type is only offered for **Collection Reference** and **Multi Collection Reference** fields. Each tab is a component instance with default and active variants, and an interaction that sets the category variable on click. So the tab row is fully restylable — it does not have to look like tabs. |
| Collection List inside a component | **Not allowed** | Framer rejects the connection with "Make sure the Collection List isn't inside of any other layers or components when connecting it." The workspace therefore cannot be packaged as a component. ([Framer community](https://www.framer.community/c/support/error-on-blog-page-the-layer-that-s-connected-isn-t-a-collection-list-make-sure-the-collection-list-isn-t-inside-of-any-other-layers-or-components-when-connecting-it)) |
| Overlays ("Show On" event) | Works, but not per breakpoint | An overlay can be triggered by an event from a nested component. Overlay settings are shared across all breakpoints — you cannot have a hover trigger on desktop and a tap trigger on mobile on the same layer. The documented workaround is duplicating the trigger and hiding one per breakpoint. ([Framer community](https://www.framer.community/c/support/is-it-possible-to-make-overlay-trigger-interactions-hover-click-undependable-on-the-primary-variant)) |
| Breakpoint variants | Works | Component variants named Desktop, Tablet and Phone are picked up automatically for each breakpoint. ([Component library best practices](https://www.framer.com/help/articles/best-practices-for-setting-up-a-component-library/), updated 15 June 2026) |
| Workshop | Out of scope by definition | Framer's Workshop generates a React code component from a prompt, and tabbed content switching is one of its advertised examples. It is no-code to *author* but it is still a code component to *maintain*, so it fails the brief's test. Noted, not recommended. |
| CMS ceilings | Not a constraint here | 10 collections per project, 10,000 items per collection. This build needs three or four collections at most. |

#### Route A — CMS collection plus a Tabs dynamic filter (recommended)

Structure:

- **Collection 1, "Capability".** Four items: Sales Growth, Product Adoption, AI & Product, Product & UX. This collection exists only to supply the tab labels.
- **Collection 2, "Capability detail".** Four items, each with a Reference field pointing at one Capability item, plus fields for body, proof line, proof attribution and a link to the letters page.
- On the homepage, place a Collection List bound to Collection 2. Add a Dynamic filter of type **Tabs** on the Reference field. Framer drops the tab control onto the canvas as a normal layer; drag it into the left column of a two-column stack and put the Collection List in the right column.
- Style the tab component's default and active variants to match the mock's row treatment (see the values table in section 4).

What this buys: zero content duplication, one editable place per capability, and content a non-developer can change from the CMS table without opening the canvas. Framer's CMS 3.0 table (April 2026) supports inline editing on every cell, so Brad can edit a capability body the way he would edit a spreadsheet.

Two things to verify in the editor before committing, because the documentation does not state them:

1. **Default state.** With no tab selected, the list will render all four items stacked. Set the Collection List limit to 1 so the unfiltered state shows a single sensible default (Sales Growth, per the 06 risk list). If the limit setting fights the filter, the fallback is an "All" tab that reads as a summary panel.
2. **Row subtitles.** The mock's left column shows a title plus a small subtitle per row. The tab component is generated from the referenced collection; whether a second field can be bound into the tab instance needs checking on the canvas. If it cannot, drop the subtitles. They are decoration, not proof.

#### Route B — Events plus parent variants (fallback if Route A's defaults misbehave)

Build one component, "Capability workspace", with four variants: Sales, Adoption, AI, UX. Each variant contains the full four-row list plus the detail panel for that capability. Each row is a nested component that fires a named event on tap; the parent listens and transitions to the matching variant.

This is deterministic and needs no CMS. The cost is duplication: the four-row list is drawn four times, so a label change is a four-place edit. That is mitigable — bind the row labels to **component text variables** so they are edited once on the instance and inherited by every variant. The detail bodies must stay per-variant, which is correct, because they are genuinely different content.

Route B *can* be a component, so it can carry Desktop/Tablet/Phone variants and be reused. That is its one real advantage over Route A.

#### What neither route can do

Nothing here reads a clicked row's identity and passes it as data. There is no dynamic per-item filtering on the canvas — Framer's own limitation is that a Collection List's filter is set at design time unless a page variable drives it. Route A works precisely because Dynamic Filters supply that page variable; anything more sophisticated (a detail panel that composes fields from an arbitrary clicked item) needs code.

### Q2. Can Framer build an iOS-style grouped list on mobile natively?

Yes, completely, and it is the cheapest thing in this document.

- **Group container.** A vertical stack with corner radius 14px, a 1px border at `rgba(28, 25, 23, 0.10)`, white fill, and **Overflow: Clip** so the child cells are masked by the corners. Clip became Framer's default overflow value in the August 2025 update and is the recommended setting; it avoids the scroll-container side effects the old Hidden value caused. ([Overflow and Clip](https://www.framer.com/help/articles/overflow-clip/))
- **Hairline dividers.** Framer's border control supports a different thickness per side, so each cell carries a 1px top border at `rgba(28, 25, 23, 0.06)` and the first cell carries none. No divider component, no code.
- **Section headers.** A text layer above the first cell, 13px, weight 600, uppercase, 0.04em tracking, in the tertiary ink colour.
- **Corner radius.** Framer supports per-corner radii via the split control, if the first and last cells ever need it. In practice the container's Clip setting makes that unnecessary.

The one honest caveat is behavioural, not visual: **tapping a cell to reveal detail on mobile is where the cost sits.** Options, in order of preference:

1. Accept scan-only cells on the phone, exactly as the mock draws them, and let the detail live further down the page. Cheapest, zero risk, and consistent with the 06 note that mobile "shows the scan pattern, not every expanded state".
2. Make each cell an accordion — a small component with Collapsed and Expanded variants and a tap transition. Fully native, no events needed, and it keeps unread rows unread, which is what the word-count risk in 06 asks for.
3. Use an overlay triggered by an event. This works but overlay settings are not per-breakpoint, so a desktop and a phone version of the trigger must be duplicated and hidden against each other. Avoid unless the detail genuinely needs a full-screen sheet.

Recommendation: option 2. An accordion cell is the closest native equivalent of the iOS push-and-return, costs one small component, and does not touch the CMS.

### Q3. Honest effort and risk profile

| Question | Capability workspace (Route A) | Capability workspace (Route B) | Mobile grouped list |
| --- | --- | --- | --- |
| Does it break out of the Prolens template? | Yes. The template's About/skills section must be deleted and replaced with a hand-built two-column section on the page. The Collection List cannot be nested, so it cannot be tucked inside a template component. | Yes, but less so. The workspace is a self-contained component that replaces the card grid in the same slot. | No. Cells and groups drop into the existing sections. |
| Does it risk the responsive breakpoints? | Yes, moderately. Two-column list/detail must collapse on the phone breakpoint, and the tab control is a separate layer from the list, so both need repositioning at each breakpoint independently. Prolens's own breakpoint rules do not cover a section it never had. | Lower. Desktop/Tablet/Phone variants inside one component are the pattern Framer documents and auto-selects. | Low. Stacks reflow; nothing is absolutely positioned. |
| Maintainable by a non-developer later? | Yes — best of the three. Content lives in the CMS table with inline editing. Brad never opens the canvas to change a capability body. | Partly. Row labels can be bound to component text variables and edited once; detail bodies must be edited per variant on the canvas. | Yes. Plain text layers. |
| Rough effort | Half a day to a day for the first one, including CMS setup and breakpoint work. The second workspace (Work) is faster, perhaps two hours, because the pattern is proven. | Two to four hours, plus a re-edit every time the copy changes. | Under an hour. |
| Blast radius if it goes wrong | The homepage section is bespoke. If it breaks after a Framer update, nobody else's template maintains it. | Contained to one component; delete it and the cards come back. | Negligible. |

The blunt read: **the mobile grouped list is worth doing regardless of what Brad decides about the workspace.** The desktop workspace is worth exactly one experiment. If the first one is not clearly better than the cards when viewed live on a phone and a laptop, stop and take the materials only.

### Q4. If the workspace is not worth it — what to take instead

It is worth it in the sense that Framer can do it; it may not be worth it in the sense that it costs a bespoke section. So the materials-only graft below is written as a genuine parallel option, not a consolation prize. Everything in it can be applied to the existing Prolens equal-card layout in an hour or two, with no structural change and no breakpoint risk. Values are extracted directly from `design/06-hybrid-direction.html`.

---

## Recommended build path

Do these in order. Stop at step 5 and look at the result before going further.

1. **Close the launch blockers first.** Hide the Insights section, confirm the contact form fields, and align the Visitor Guide figures. None of this document justifies delaying those; a live URL is worth more than a workspace.
2. **Apply the materials-only graft** (section below) to the existing cards, the section labels and the contact panel. This is the highest ratio of visual gain to risk in the whole project, and it is reversible.
3. **Build the mobile grouped lists.** Convert the About cards and the Work tiles to grouped cells on the phone breakpoint only, using the container/cell recipe in Q2. Add the accordion variant to the cells so a tap reveals the proof line. Leave desktop alone at this stage.
4. **Publish and read it on an actual phone.** If steps 2 and 3 already remove the "template" feeling, the workspace may be unnecessary. Judge before building.
5. **If the desktop still feels generic, build one workspace — Capabilities only.** In order:
   a. Create the Capability collection (four items: the four card titles from the paste sheet, section 3).
   b. Create the Capability detail collection with a Reference field to Capability, plus Body, Proof, Proof source and Letter link.
   c. Paste the four card bodies from `COPY-SOURCE-OF-TRUTH.md` section 3 into Body. Do not rewrite them.
   d. On the homepage, delete the Prolens four-card grid and place a Collection List bound to Capability detail. Set the limit to 1.
   e. Add the Dynamic Tabs filter on the Reference field. Drag the generated tab control into the left column.
   f. Style the tab default and active variants, then the detail panel, using the values table below.
   g. Set the phone breakpoint: tabs above, detail below, or fall back to the grouped list from step 3 and hide the two-column version.
6. **Only then consider the Work workspace.** Same pattern, second collection pair. If the Capabilities one took longer than a day, do not build this one.
7. **Never put window chrome above the fold.** The traffic-light dots in the mock are decoration and are the fastest way to make the site read as a fake app. If they are used at all, use them once, on the Capabilities panel, and only after the rest is right. Skipping them entirely costs nothing.

---

## Fallback: materials-only graft

Concrete values from `design/06-hybrid-direction.html`, ready to type into Framer's style panels. The mock's palette is a warm stone/parchment set. **Do not replace Prolens's palette wholesale** — map the greys onto whatever neutral the template already uses, and take the hairline alphas, radii, spacing and type discipline, which is where the premium feel actually comes from.

### Type

| Token | Value in the mock | What to do in Framer |
| --- | --- | --- |
| UI/body stack | `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif` | **Not directly available.** Framer removed SF Pro from the font picker because it is not web-safe, and Apple's licence makes uploading it for web use a problem. Use **Inter** (built in). It is the closest legitimate match at UI sizes and is what most system-feeling web work uses. |
| Display stack | Same, with `"SF Pro Display"` | Inter, with the tracking values below. The tight negative tracking is what reads as "system", more than the typeface does. |
| Mono | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` | Only used for the mock's own judge chrome. Not needed on the site. Skip it. |

### Type scale and tracking

| Role | Size | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| Hero H1 (desktop) | 44–72px fluid | 650 | −0.045em | 0.95 |
| Hero H1 (phone) | 40px | 650 | −0.045em | 0.95 |
| Subhead | 20px (17px phone) | 400 | −0.02em | 1.35 |
| Section H2 | 28px | 600 | −0.035em | default |
| Detail H3 | 22px | 600 | −0.03em | default |
| Body | 15px | 400 | 0 | 1.5 |
| Card/row title | 14px | 600 | 0 | 1.2 |
| Cell title (phone) | 15px | 600 | 0 | 1.25 |
| Row subtitle / meta | 12–12.5px | 400 | 0 | default |
| Eyebrow / section label | 11.5–12px | 600 | +0.08em, uppercase | default |
| Group header (phone) | 13px | 600 | +0.04em, uppercase | default |
| Stat figure | 18px | 600 | −0.03em | default |
| Tag / chip | 11.5–12.5px | 400 | 0 | default |
| Nav link | 13.5px | 400 | 0 | default |

The single most transferable idea here: **negative tracking on everything above 18px, zero tracking on body, positive tracking only on uppercase labels.** Prolens almost certainly ships with default tracking throughout. Changing that alone will do more than any border.

### Colour

| Token | Value | Where it applies |
| --- | --- | --- |
| Page ground | `#E6E4DF` | Body background behind the content shell |
| Surface, warm | `#F3F1EC` | Section background inside the shell |
| Surface, white | `#FFFFFF` | Cards, panels, detail area, mobile cells |
| Surface, recessed | `#FAF9F6` | List column, proof box, form column — the "sunken" side of a two-pane layout |
| Surface, chrome | `#F6F4EF` | Panel title bar, if window chrome is used at all |
| Phone screen ground | `#F2F1ED` | Phone breakpoint background |
| Ink, primary | `#1C1917` | Headings, buttons, cell titles |
| Ink, secondary | `#4A4540` | Body copy |
| Ink, tertiary | `#7A746C` | Labels, meta, subtitles, captions |
| Rule, structural | `rgba(28, 25, 23, 0.10)` | Every card, panel and container border; section top/bottom rules |
| Rule, internal | `rgba(28, 25, 23, 0.06)` | Dividers *between* cells inside a group |
| Link / accent | `#0B57D0` | Text links and ghost buttons only. Never a fill. |
| Portrait placeholder | `#D9D4CC` | Image well before the real portrait is supplied |

Two rules that matter more than the hex values:

- **Borders are never a grey; they are black at 6–10% alpha.** That is the whole hairline effect. A solid `#E5E5E5` border will not read the same over a warm ground.
- **There are exactly two border strengths.** 10% for anything that contains something, 6% for anything that separates siblings inside a container. Do not introduce a third.

### Corner radii

| Value | Applies to |
| --- | --- |
| 999px | Tags, pills, chips, primary buttons, nav CTA |
| 10px | Form inputs, list rows |
| 12px | Small tiles, proof boxes, status chips |
| 14px | Letter/testimonial cards, mobile group containers |
| 16px | Panels, the contact two-pane block |
| 18px | Outer shell, mobile tab bar |
| 22px | Portrait well (desktop); 18px on phone |

Prolens's existing radius is whatever it is; the point is the **ladder**. Small things get 10–12px, cards get 14px, containers get 16–18px, and anything pill-shaped goes fully round. Three or four steps, never a continuum.

### Spacing rhythm

Base unit 2px, but in practice the mock uses a short, disciplined ladder. Use these and nothing between them:

`4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 26 · 28 · 40 · 48 · 56`

| Context | Padding in the mock |
| --- | --- |
| Nav bar | 16px vertical, 28px horizontal |
| Hero | 56px top, 40px sides, 40px bottom; 48px column gap |
| Section block | 28px sides, 28px bottom |
| Panel title bar | 11px vertical, 14px horizontal |
| Panel intro | 22px sides and top, 8px bottom |
| Detail pane | 24px top, 26px sides, 28px bottom |
| Recessed list column | 10px all round; rows 11px vertical, 12px horizontal |
| Stat cell | 18px vertical, 24px horizontal |
| Proof box | 14px vertical, 16px horizontal |
| Letter card | 18px top, 16px sides and bottom; 12px grid gap |
| Career tile | 12px vertical, 10px horizontal; 8px grid gap |
| Mobile group | 12px vertical / 14px horizontal outer margin |
| Mobile cell | 12px vertical, 14px horizontal |
| Mobile group header | 12px top, 14px sides, 4px bottom |
| Tag | 6px vertical, 10px horizontal |
| Button | 11px vertical, 18px horizontal |
| Chip | 4px vertical, 8px horizontal |

### Elevation and other details

| Detail | Value | Note |
| --- | --- | --- |
| Container shadow | `0 18px 50px rgba(28, 25, 23, 0.08)` | One shadow, on the outermost shell only. Cards get borders, not shadows. |
| Selected row | White fill plus a 1px `rgba(28, 25, 23, 0.10)` border | The mock uses a 0-blur box-shadow ring; in Framer use a border, the result is identical. |
| Translucent bars | `rgba(243, 241, 236, 0.82)` with 16px background blur (nav); `rgba(255, 255, 255, 0.92)` with 16px blur (mobile tab bar) | Framer supports background blur natively. Use it on the sticky nav only. |
| Divider strip | 1px grid gap over a rule-coloured background | Framer equivalent: a stack with 1px gap and the rule colour as the stack fill. |
| Minimum heights | Letter card 210px; career tile 108px; list/detail pane 280px; left list column 240px wide | Keeps the grid honest when copy lengths differ. |

### Mapping to the existing Prolens layout

| Prolens element | Graft |
| --- | --- |
| Four equal About cards | White fill, 14px radius, 1px `rgba(28,25,23,0.10)` border, no shadow. Title 14px/600, body 15px in secondary ink. |
| Section eyebrows | 11.5px, weight 600, uppercase, +0.08em, tertiary ink. |
| Section headings | 28px, −0.035em tracking. This one change carries most of the effect. |
| Project tiles | Same card treatment; add the 11.5px chip row at 999px radius for tags. |
| Testimonial cards | 14px radius, 210px minimum height, quote at 14px/1.45, attribution pushed to the bottom at 12px tertiary. |
| Career timeline | Convert to the 108px tile grid if the timeline runs long on mobile; otherwise leave it. |
| Contact block | 16px radius, split fill — white on the copy side, `#FAF9F6` on the form side, 1px rule between them. Inputs at 10px radius. |
| Buttons | Primary: ink fill, white text, 999px, 11/18px padding. Secondary: no fill, `#0B57D0` text, weight 600. |
| Phone breakpoint | Grouped containers at 14px radius with 6% internal dividers, per Q2. |

---

## Risks

**The bespoke section has no owner.** Anything hand-built beside Prolens is not covered by the template author's updates. If Framer changes Dynamic Filters, or the template ships a revision, the workspace is Brad's to repair. The cards are not.

**Collection Lists cannot be componentised.** This is the load-bearing constraint. It means the workspace lives loose on the homepage, its breakpoint behaviour is page-level rather than component-level, and it cannot be duplicated cleanly for the Work section — the second workspace is a second hand-build, not a reuse.

**The phone breakpoint is where two-column layouts die.** The tab control and the Collection List are separate layers, so each needs its own position and size at every breakpoint. Prolens's responsive rules were written for a card grid. A section it has never seen can look correct at 1440px and collapse at 390px without warning. Test at 390px before anything else.

**Overlays are not breakpoint-aware.** If the mobile detail is built as an overlay, expect to duplicate triggers and hide them against each other. This is documented behaviour, not a bug, and it will not be fixed by trying harder. Prefer the accordion.

**The default state can leak.** An unfiltered Collection List shows every item. If the limit-of-1 approach does not hold, the first thing a reader sees is four detail panels stacked, which is worse than the cards it replaced. Verify this in Preview before publishing, not after.

**Chrome creep.** The traffic-light dots, the title bar and the translucent blur are the parts most likely to multiply. One panel with chrome reads as a considered choice. Three read as a fake desktop, which the 06 risk list and the non-negotiables both rule out. The safest version of this graft uses no window chrome at all — just the hairlines, radii and type.

**Word-count creep.** A detail panel that renders fully expanded is a longer page, not a shorter one. The pattern only pays off if unselected rows stay unread. If the CMS route ends up showing all four bodies by default, it has actively made the page worse.

**Type substitution.** The mock's system font stack is not available in Framer and Apple's licensing makes uploading SF Pro for web use inadvisable. Inter with the tracking values above is the correct substitute. Do not spend time chasing the exact stack; the tracking and the hairlines do the work, not the typeface.

**Opportunity cost.** Every hour spent on the workspace is an hour not spent on the two blocked paste-sheet items and a live URL. The site converts because a hiring manager can read the proof and reach the CV, not because the capabilities panel swaps in place.

---

## What this does not change

- Never name the education employer.
- No invented figures, and no implication that an AI product has shipped.
- No fabricated testimonials.
- No dock, fake desktop, dashboard widgets or command-centre naming on the first screen.
- The paste-sheet first screen stays exactly as specified. Everything in this document applies below the fold.
- `COPY-SOURCE-OF-TRUTH.md` remains the copy source of truth and is unchanged.
