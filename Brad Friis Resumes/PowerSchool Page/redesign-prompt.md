# Prompt for redesigning the calendar mockup (paste into a NEW session)

Status: ready to use. This supersedes the flat 8-category structure built in
`Mockup with code/Representative Week Calendar/` — that build came from
`Perp_Composite Week Calendar Mockup Prompt.md` and is now the input to clean up,
not the target structure. Do not add this page to the live site until Brad has
seen and approved the redesign output.

Paste everything in the fenced block below into a new Claude Code session (or
another coding assistant) with this project open.

---

```
TASK

You're redesigning an existing mockup, not building from scratch. The folder
"Brad Friis Resumes/PowerSchool Page/Mockup with code/Representative Week Calendar/"
contains a working prototype: a filterable weekly calendar (desktop grid /
mobile agenda) showing composite illustrative work from a 10-year senior
edtech operating role. Read its files first — index.html, style.css, base.css,
tokens.css, app.js, calendar-data.js, and "Representative Week Implementation
Note.md" — to understand what's already built (accessibility work, theming,
detail-panel interaction, reduced-motion handling) before changing anything.

THE PROBLEM

The visual design reads as generic AI-generated output — default spacing,
default card styling, no relationship to the actual site's design language.
It needs to look like it belongs on bradfriis.com, not like a prototype
bolted on next to it. Polish this to production quality: typography,
spacing, colour use, motion, and detail should all match a real,
considered design system — not look like a first draft.

MATCH THE LIVE SITE'S DESIGN SYSTEM

Read "src/styles/global.css" in this project — it's the source of truth.
Specifically:

- The token block at the top of the file (:root): --ground, --surface,
  --surface-alt, --paper, --recessed, --ink, --ink-secondary, --ink-tertiary,
  --line, --line-soft, --line-hover, --accent (#9c3d1e burnt sienna),
  --accent-strong, --accent-on-dark, --stat-ground.
- The radius scale: --r-sm through --r-portrait, plus --r-pill for pills.
- The type scale: --text-enum through --text-h3, plus the fluid clamp()
  steps --text-hero down to --text-hero-lead.
- The spacing ladder comment at the top of the file: 4 6 8 10 12 14 16 18 22
  26 28 40 48 56 72 — nothing between these values. Follow this discipline
  in the redesign; don't invent arbitrary spacing.
- The dark-band pattern in .band-invert (~line 249) — if any part of this
  calendar needs a dark surface, reuse this token-override pattern rather
  than hardcoding a separate dark palette.
- --sans: Inter, with the existing fallback stack.

Do not introduce new colours, fonts, or a competing design language. If the
existing calendar CSS conflicts with these tokens, replace it — don't layer
a second system on top.

RESTRUCTURE: THREE TOP-LEVEL PILLARS, NOT EIGHT FLAT CATEGORIES

The current mockup filters across 8 flat categories. Replace this with a
three-pillar structure. Every calendar entry belongs to exactly one pillar:

1. GROWTH — sales strategy, lead generation hooks, pre-conference outreach,
   conference communications strategy, stand concept and design, and the
   NZ schools database (segmented by roll count, region and school type).
2. DELIVERY — customer onboarding, technical implementation, support
   materials, government-funded facilitation, and the end-to-end creation
   and delivery of conference workshops.
3. OPERATIONS — financial strategy (billing, SLAs), conference logistics
   (stand build and physical setup), international reseller management,
   board reporting, and team management.

UI/UX STRUCTURE

- Global navigation (the filter): a sticky top bar with three toggle
  buttons — Growth, Delivery, Operations. Selecting one dynamically filters
  the calendar below. Support "all three visible" as the default/reset
  state, consistent with how filtering already works in the current build.
- Desktop grid: five columns (Monday–Friday), rows as time blocks (Morning,
  Midday, Afternoon — reuse the existing slot vocabulary in
  calendar-data.js if it already fits). Event blocks show a punchy title
  and a subtle category colour indicator — colour as a supporting cue, not
  the only cue, per the existing accessibility approach.
- Mobile agenda: vertical, scrollable, grouped by day (Monday top, Friday
  bottom). No horizontal scrolling. Sticky day headings are already in the
  current build — keep that pattern.
- Detail reveal: clicking/tapping an event block opens a detail view.
  Desktop: a slide-out side panel or clean modal (the current build already
  has a fixed side panel — evaluate whether to keep that or move to a
  slide-out treatment, your call, but justify it). Mobile: a bottom sheet
  that slides up, replacing the current build's "expand inline beneath the
  card" mobile pattern — this is a deliberate change, make sure it still
  respects the 44x44px touch target minimum and existing focus/escape/
  reduced-motion handling.

CONTENT TO USE

Replace calendar-data.js's 20 entries with the following 15, grouped by
pillar. Keep the existing data shape (stable kebab-case id, day, slot,
short title, one/two-sentence detail, primary category, connections) —
just repoint category to one of the three pillars and swap in this content.

GROWTH — the pipeline & audience week
- Mon AM: NZ Schools Database: Roll & Region Segmentation
- Mon PM: Sales Strategy & Pipeline Review
- Tue AM: Conference Concept & Stand Design
- Tue PM: Network Building & Key Partner Calls
- Wed AM: Conference Communications Strategy
- Wed PM: Targeted Pre-Event Outreach (Stand Visits)
- Thu AM: Lead Generation Hooks & Asset Review
- Thu PM: Marketing Automation Review
- Fri AM: Post-Conference Lead Follow-Up Workflows
- Fri PM: Growth Metrics & Conversion Tracking

DELIVERY — the customer & content week
- Mon AM: Government-Funded Facilitation
- Mon PM: Technical Implementation: New Accounts
- Tue AM: Conference Workshop Design & Writing
- Tue PM: Customer Onboarding Sessions
- Wed AM: Bespoke Workshop Rehearsals
- Wed PM: Support Materials & Resource Updates
- Thu AM: Conference Workshop Presentation
- Thu PM: Post-Workshop Q&A & Client Discovery
- Fri AM: Implementation Blockers & QA
- Fri PM: Delivery Capacity Planning

OPERATIONS — the systems & governance week
- Mon AM: SLA & Billing Strategy Review
- Mon PM: Financial Strategy & Forecasting
- Tue AM: Conference Logistics & Stand Build Setup
- Tue PM: Staff Management 1:1s
- Wed AM: International Reseller Sync
- Wed PM: Vendor & Supplier Management
- Thu AM: Operational Workflows & Tooling
- Thu PM: Resource Allocation
- Fri AM: Board Reporting Compilation
- Fri PM: Weekly Operations Review

Three of these need expanded detail-panel copy — use this text as-is (it's
already been drafted and approved), don't rewrite it:

Growth — "NZ Schools Database: Roll & Region Segmentation": "I required a
precise lead generation engine, not a generic mailing list. I built and
maintained a comprehensive database of New Zealand school principals,
segmenting the data tightly by school roll count, geographic region, and
school type. This architecture allowed us to tailor our commercial
messaging to specific school profiles, equipping the sales team with
high-context leads and clear entry points rather than relying on cold,
unsegmented outreach."

Delivery — "Conference Workshop Design & Presentation": "A successful
conference requires bridging the gap between high-level strategy and
on-the-ground value. I wrote, designed, and presented our core conference
workshops. Rather than delivering a standard product pitch, I structured
the content to solve immediate educational challenges while embedding
targeted lead generation hooks. This approach equipped attendees with
actionable insights while simultaneously qualifying them for our sales
pipeline."

Operations — "Conference Logistics & Stand Build Setup": "Physical event
presence requires strict logistical control to ensure a return on
investment. I managed the end-to-end operational execution of our national
conference stand, from the initial build and physical setup to the
breakdown. By standardising our event logistics and vendor timelines, I
equipped the on-site team with a frictionless environment, allowing them
to focus entirely on customer interactions and lead generation rather than
troubleshooting operational delays."

For the remaining 12 entries, write concise one-sentence details in the
same voice — direct, systems-level, no generic "this demonstrates my
skills" closers (the existing calendar-data.js entries are a good model
for tone; match them).

MANDATORY SAFETY CHECK BEFORE YOU WRITE ANY OF THIS

I cannot name my employer for the education technology company this role
was at (settlement gag, unrelated to the work itself) — I can name the
vendor whose platform I resold (PowerSchool/Schoology) but not my employer.
None of the content above should be published if it risks identifying the
employer indirectly through specific enough detail. Before finalising:

- Do not attach any real customer/school name, real financial figure, real
  attendance number, or real conference name to any entry. Every figure
  above (roll counts, conversion tracking, etc.) must stay at the level of
  describing a *capability*, never a specific real result with a number
  attached, unless I've explicitly told you the number is cleared for
  publication.
- The "roughly 650 teachers" network figure is the one number that has
  already been cleared for publication elsewhere on the site — reuse that
  exact hedge ("roughly 650") if this figure appears, don't state it as
  exact.
- Flag anything in this content list that you think risks identifying the
  employer even without naming them, and tell me before finalising, rather
  than silently softening or silently publishing it.

OUTPUT

1. Show me the redesigned mockup (working HTML/CSS/JS I can open locally)
   before touching the live site's src/ directory at all. Do not add a new
   route or page to the actual Astro site in this session.
2. Write a short design-decision note: what you changed and why, specifically
   on the "generic AI slop" problem — what looked default/generated before,
   and what specific choice fixed it (type pairing, spacing rhythm, motion,
   whatever it was). I want to be able to tell you understood the problem,
   not just applied a different template.
3. Separately, give me a detailed write-up on how this page should be
   surfaced on the live site — not just "add a nav link." Think through:
   where a reader would naturally encounter this (homepage? CV page? its own
   nav item?), what a reader needs to already know before landing on this
   page for it to make sense, what the page's URL/slug should be, and what
   the user journey looks like end to end — i.e. what does someone do right
   after they've explored this calendar (contact link? book-a-meeting link?
   back to CV?). I have not decided the audience for this page yet
   (fractional/consulting work vs a permanent role vs both) — factor that
   uncertainty into your recommendation rather than assuming one.

Do not modify anything in src/ or add this page to the live site in this
session. This is a redesign-and-recommend session only.
```
