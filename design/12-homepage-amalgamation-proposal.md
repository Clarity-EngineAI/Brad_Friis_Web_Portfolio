# 12 — Homepage amalgamation proposal

**Written:** 18 August 2026, at Brad's request, to end the circling between parallel narrative
attempts. Inputs: the whole-career narrative draft (18 August, this project's conventions), the
Gemini package (mockup + "master project context", produced outside this project's rules), the
live site (`src/pages/index.astro`, www.bradfriis.com), `COPY/brad-verified-claims-transcript.md`,
and `design/00-current-direction.md`.

**Status:** proposal, awaiting Brad's rulings in §6. Nothing here is copy. Nothing here is built.

---

## 1. Why this has been going in circles — the honest diagnosis

Three narratives now exist in parallel, each produced by a different session optimising a
different thing:

1. **The whole-career narrative draft** (18 August) — story-first, six sections, written against
   this project's voice spec and claims register. Closest to shippable.
2. **The Gemini package** — a skills-matrix framing ("Strategic Account Executive", four pillars,
   a four-stage engine). Produced outside this project's rules, and it shows: it violates at
   least eight binding constraints (detail in §3).
3. **The live site** — an earlier compliant build, now carrying its own drift (stale hero, and at
   least one set of figures attached to the wrong role — §5).

The project already has an arbitration system — `design/00-current-direction.md`, the claims
register, the §7 voice spec. The circling happens because each new outside session generates a
*fresh narrative* instead of feeding *ideas* into that system. Every new package restarts the
argument. The fix is one decision, made once: **name a base narrative, harvest the other sources
for structure only, and gate every line through the register.**

**Process rule going forward:** output from any outside LLM session gets banked into `COPY/` with
a status (Available / Held / Rejected) like everything else, and never touches the site until it
has passed the register and the voice spec. No more parallel narrative resets.

---

## 2. The recommendation in one paragraph

Use the **whole-career narrative draft as the base** — it is the most recent work Brad has shaped
directly, it is register-compliant by construction, and its moments (108 calls, five-campus,
MySimpleSiteMan) are the strongest proof the record holds. Restructure it around the thing Brad
has now asked for: **a visible spine of the five capabilities a high-performing account manager
needs**, each one proved by a registered fact, with "know the product and the value it brings" as
the fifth. Demote 2000AD to a career-record row. Drop the letters from the homepage's main proof
layer to a single pointer. Keep the entire existing visual system — every section maps onto a
component that already exists in `index.astro`. The change is structure and copy weight, plus one
new information-carrying graphic.

---

## 3. What each source contributes — and what dies

### The whole-career draft — the base (~80% survives)

Keep: the three working moments, the failure moment, the career record rows, the proof strip
concept, the contact block, the age-signal revision (no cumulative tenure number up front —
already Brad's call, and the Gemini package independently reached the same conclusion, which is
good confirmation).

Change, per Brad's new instructions and the register:

- **2000AD comes out of the proof strip and out of the moments.** It stays as the first
  career-record row (as it already is on the live site). Frees one proof-strip slot and one
  moment slot — see §6, decisions 4 and 5.
- **The Tracta row expands.** The register already holds this (Adplus/Tracta section): module
  upsells — image galleries, FAQs, news tickers — sold on monthly recurring fees after site
  builds, from 2001. This is the earliest instance of the recurring-revenue motion that runs
  through the whole career. Wording caution from the register: *sold and held, not built/owned* —
  so the row says he sold website add-on modules on recurring fees, not "my first SaaS venture."
- **The hero is Brad's.** The draft's H1 ("I turn up, find out what's actually happening…") is an
  option he may adopt, but the hero left the generation track on 16 August and that ruling stands.
- **The "What I'm doing now" coda is held pending decision 3** (§6) — it has naming and verb
  problems against the register.

### The Gemini package — structure harvested, copy discarded entirely

Two ideas survive, both as structure:

1. **The capability-pillar framing.** The live site already has a four-cell capability grid; the
   Gemini matrix independently validates that shape. It becomes the five-pillar spine of §4.
2. **The age-bias caution** — already adopted in the draft's revision.

Everything else dies, because the copy violates binding constraints — listed so it is never
re-imported by mistake:

- Names **Sancta Maria College** (register: subject to final consent — not granted) and the
  live-site quotes name **Schoology**; the Gemini text goes further and attaches the 8-year
  renewal to the named school.
- **"0% churn"** stated as a measured retention rate — the register bars stating recalled
  retention as a measured figure.
- **Merges figures across roles**: its "Case 03" folds the education-role $40–50k managed-services
  line into 99 Corporation. Factually wrong.
- **Self-assessment throughout** ("top-tier", "mastery", "high-performing" in Brad's own voice) —
  barred.
- **Jargon and US spelling** (NRR, GRR, LAER framework, "humanizer", "productized") — the §7 voice
  spec and NZ English rule kill all of it. A hiring manager in NZ reads LAER-framework copy as a
  candidate who had an LLM write their website.
- **Second-person sales address** in the footer ("Seeking a Senior Strategic Account
  Executive…?") — the exact fault that killed a whole copy round on 15 August.
- **brad@clarityengine.ai** as the contact address — not the site's address; do not import.
- **"Full-Stack Builder" / "Engineered"** framing for AI work — register constraint 7 governs the
  build verb; see decision 3.

### The live site — the visual system, kept whole

Every proposed section maps to an existing component. No redesign:

| Proposed section | Existing component in `index.astro` |
| --- | --- |
| Hero | `hero shell` + portrait aside (117–145) |
| Proof strip | `stat-band` / `stat-strip` (147–156) |
| Five capabilities | `capability-grid` (158–177) — 4 cells become 5 |
| The moments | `work-cell` grid (179–197) — copy weight grows |
| Career record | `row-list` / `career-row` (241–262) |
| Now coda | new short block, `section-head` styles reused |
| Field-notes teaser | `text-link` pattern inside a career row |
| Letters pointer | `section-link` line (existing) — the full `proof-quotes` section comes out |
| Contact | `ContactPanel` (264–268) |

---

## 4. The five-capability spine — Brad's ask, mapped to registered proof

Each card: capability as a first-person working sentence (per the live cards' idiom), one
registered fact as the body, and a pointer down to the moment or record row that tells it in
full. The capability *names* below are for this table only — the display lines get drafted as
options for Brad to choose from, per the copy convention. "Trusted" and "personable" are never
written as adjectives; they surface as consequences (§7 voice rule).

| # | Capability | Registered proof it points to |
| --- | --- | --- |
| 1 | Strategic thinking — read the business, then build the plan | Five-campus week on the ground → segmentation strategy → account expanded to a sixth campus, two new revenue lines |
| 2 | Creativity — see the offer nobody has priced | Unpriced support → managed services line, ~$40–50k/yr, billed in advance · Xchange referral network, $70k+ over two years · Gold Listings two-tier product at Adplus |
| 3 | Relationships and trust — kept, not claimed | 108 one-to-one lockdown calls · eight consecutive renewals at one college · HB Chamber of Commerce held four years · Harvey Norman held full tenure |
| 4 | Commercial structure — own the terms | 50% deposits and advance billing at 99 Corp · reseller agreement renegotiated personally: buy-as-needed, direct invoicing in local currency, 500-licence minimum removed |
| 5 | **Know the product and its value** — the piece Brad flagged as missing | MySimpleSiteMan's lesson (knowing how to use a tool ≠ the tool working for you) · selling website modules from 2001 · localising US course material for NZ/AU · designing the SIS integration · the week on the ground before any strategy |

Pillar 5 does double duty: it is also the honest justification for the AI year — going deep on
the toolkit is product knowledge, the same habit at a new scale — which keeps AI as an enabler
underneath the account-management story, never the headline.

---

## 5. Live-site faults to fix regardless of everything else

Found while grounding this proposal; all are live today:

1. **`index.astro:84–87` — 99 Corporation's figures sit under the Xplore row.** "Customers up
   around 70 per cent, income up around 120 per cent" plus Rob Nieuwland's corroboration are
   2013–2015 figures attached to "2009 · Business development, Xplore." Wrong role, on the
   public site.
2. **`index.astro:63` — a conflicting figure set.** The 99 Corp work cell says "around 55 per
   cent / around 30 per cent" (from a placeholder awaiting Rob's letter); the register says
   around 70% / around 120% (Brad) and 30% more profit per customer / 70% more clients (Rob).
   Reconcile per the verify-before-locking rule — ask Brad which set is current, don't guess.
3. **The hero is an unruled line** ("Turning customer needs into long-term account growth") —
   already flagged in `00-current-direction.md` §7.1; this rebuild is the natural moment to
   resolve it.
4. **Quotes naming Schoology** in the homepage proof section — resolved by this proposal anyway,
   since the section reduces to a pointer; the letters page is untouched and keeps its own rules.
5. **Draft verification before build:** the draft's "zero customers lost" (2020) is marked [R]
   but does not appear in `brad-verified-claims-transcript.md`, and the register's 108 line reads
   "interviews with teachers," not "client calls." Check `COPY/interviews/` for the source; if it
   isn't registered, the moment ships without the zero-lost claim until it is.

---

## 6. The decisions that end the circling — Brad's list

Seven rulings. Once these are made, one build session finishes the page.

1. **Confirm the base.** The whole-career draft is the narrative spine, amended per this
   proposal. (Everything below assumes yes.)
2. **The hero.** Brad writes or picks it. The draft's H1 is on the table as one option.
3. **What "now" is called.** The register's timeline says Pikle (paused, sweat equity); the
   draft says Clarity Engine AI with hands-on "built" language; the live career row names both.
   Constraints in play: nothing may imply a shipped AI product, Clarity Engine is unregistered,
   and the build-verb rule (constraint 7) — unless Brad confirms the AI-year work genuinely was
   hands-on his, in which case the register should be updated to say so. One ruling covers the
   coda, the career row, and the CV.
4. **The freed proof-strip slot.** 2000AD comes out. Candidates from the register: 178% of
   budget at Canwest (approved as a bare figure), the Adplus 60%-over-three-years growth, or the
   eight consecutive renewals. Brad picks one.
5. **The freed moment slot.** Three moments remain (108 calls, five-campus, MySimpleSiteMan).
   Either run three, or promote a fourth — the reseller renegotiation is the strongest candidate
   (it is already a live work cell and proves pillar 4).
6. **Field-notes teasers.** The Steak Out teaser sits in the Canwest row (caption carries no
   outcome and no punchline, per the blog-link rule). One teaser or two — and if two, which
   second story.
7. **The graphic.** See §7 — option A, option B, or none.

---

## 7. The graphic Brad asked for — two options

Constraint first: §7.1 — every surprise carries information; motion that announces itself is
decoration and is banned. Both options are static, built from the existing hairline/token system,
and deliberately carry **era labels, not a cumulative year count** (the age-signal ruling).

**Option A — "One motion, four eras" (recommended).** A horizontal strip, four nodes on a
hairline: *2001 — website modules on monthly fees · 2009 — SEO retainers and bolt-ons · 2013 —
support made a paid line · 2015 — managed services, then reseller terms owned outright.* One
sentence beneath: the recurring-revenue motion, recurring. It shows the thing the whole page
argues — the same habit compounding across very different businesses — and every node is a
registered fact. Sits naturally between the capabilities and the moments.

**Option B — capability accretion.** Stacked bands showing each era adding a layer (relationships
→ commercial structure → retention at scale → product depth). Riskier: closer to decoration,
harder to keep honest (implies a tidy one-skill-per-era mapping the record doesn't actually
have). Offered because Brad asked for a growth-over-time visual; not recommended over A.

Either is a self-contained addition to `index.astro` with existing CSS custom properties — no new
visual system.

---

## 8. Build plan — one session, after the rulings

1. Apply Brad's seven rulings; bank chosen copy into `COPY/` with statuses.
2. Verify the two figure conflicts (§5 items 1–2, 5) against `COPY/interviews/` and with Brad.
3. Restructure `index.astro`: reorder per the §3 table, five capability cells, moments into the
   work-cell grid at fuller copy weight, expanded Tracta row, letters section to a pointer,
   teaser button in the Canwest row, now-coda, graphic option.
4. Constraint sweep, the full list: no employer name · no settlement reference · hedges verbatim
   · no combined/derived figures · banned words · no self-assessment · no second person · no
   industry noun in display type · sentence-opener variety · NZ English · sentence case ·
   Harvey Norman never in the same sentence as the never-lost phrasing · hero + stats ≤ ~70
   words above the fold.
5. Screenshot review at the real breakpoints, then deploy. (The noindex gate is a separate,
   deliberate decision — removing it is its own ruling once Brad is proud of the page, which is
   the point of all of the above.)

Model for the build session: Sonnet — structured copy application into existing components, with
this document and the register as the rails. Opus only if the graphic needs real design
iteration.

---

## 9. Rulings — Brad, 18 August 2026

Recorded verbatim in intent; where a ruling delegated the call, the recommendation adopted is
named. The build session works from this section.

1. **Base: confirmed.** Brad asked what "confirm the base" meant and then answered decisions
   2–7 against it — the whole-career draft is the spine, amended per this proposal. The Gemini
   package and the live site's copy stop competing with it.
2. **Hero: three options drafted at Brad's request** — see `COPY/hero-lines/hero-lines.md`
   round nine (N1 recommended: *"I win the account, then spend years making it worth
   keeping."*). **Brad still picks; not locked.** Live holding line remains the fallback.
3. **The AI year: confirmed hands-on, capability-first framing.** Brad confirms the work is
   his. Pikle is mentioned as one of several things, never the headline. The year is presented
   as the value of the capability accrued — fluency with the tools, seeing opportunities for
   efficiency and streamlined operations — i.e. pillar 5 at new scale, under the
   account-management story. Clarity Engine AI comes off the career row (unregistered). Brad
   flagged wording uncertainty, so the coda ships as drafted options he approves, and
   "AI literate" is never printed as a self-description — the fluency is shown, not claimed.
   Register addendum recorded (claims transcript, 18 Aug addendum).
4. **Freed proof-strip slot: delegated to this proposal's assessment.** Adopted: **the eight
   consecutive renewals.** Reasoning: it is the single figure closest to what an
   account-management hire is bought for (retention proved over years, recently, in the target
   decade); 178% at Canwest is a 2003 media-sales figure (age signal, hunting proof, and only
   publishable bare), and the Adplus 60% is older still. The Canwest 178% stays Available for
   the CV.
5. **Freed moment slot: the reseller renegotiation.** Four moments run: 108 calls,
   five-campus, MySimpleSiteMan, reseller renegotiation.
6. **Field notes: the Steak Out story is a standalone blog post only — no homepage teaser.**
   The homepage may still carry one teaser from a *different* field-notes story (plastic bags
   or Cubs uniform), chosen at build; if neither sits naturally, the nav's "Field notes &
   stories" label does the work and no teaser ships.
7. **Graphic: Option A** — "One motion, four eras."

**Added scope from the same message — the 2015–2025 commercial breadth.** Brad supplied the
full scope of the education-decade role (sales strategy through channel-contract negotiation —
registered in the claims-transcript 18 Aug addendum) and asked how to leverage it without
pricing himself out or scaring people off. Adopted treatment: **fold it into the existing
structure, not a new section.** The breadth is grouped under the motion the page already
argues — demand (marketing, the two appointment-booking sites, conference stands, email and
direct campaigns), land (sales strategy, implementation), keep (onboarding, live and
self-paced training, support MSAs, retention), grow (channel negotiation, financial
strategy) — and carried in two places: the 2015 career row's detail line, and as proof texture
inside the five capability cards. Framing rule: the breadth argues *he has run every function
that touches the customer, so he is a low-risk pair of hands on an account* — never a claim to
a GM title (which the career row already discloses factually) and never edtech-fenced. This
respects the word budget and Brad's three caveats as registered.

**Still open, carried to the build session:** the hero pick (decision 2); the 99 Corporation
figure conflict at `index.astro:63` (§5 item 2 — Brad has not yet said which set is current);
the teaser story choice (ruling 6).

### Second round of rulings — Brad, later 18 August 2026

- **Rulings 1, 3, 4 confirmed; 5, 6, 7 confirmed enthusiastically.**
- **Hero:** N1's direction is right but "needs more work" — Brad asked for one more wide run.
  **Round ten is drafted: `COPY/hero-lines/hero-lines.md`, options T1–T10** (recommended: T6
  "I turn one-off customers into revenue that comes back every year", which the Option A
  graphic literally illustrates; T4 second; T2 third). Brad still picks.
- **99 Corporation figures: resolved — Rob Nieuwland's set.** Around 30% more profit per
  customer, around 70% more clients. The 55%/30% placeholder at `index.astro:63` dies; Brad's
  70%/120% set stays registered but off the homepage. Recorded in the claims-transcript
  addendum. The Xplore-row misattribution (`index.astro:84–87`) still gets fixed regardless.
- **2015–2025 scope additions:** conference *presenter* under demand (as well as the stands),
  and training expanded — Brad authored and delivered it: live training workshops plus
  self-paced training development. He wants the copy to say he **built and delivered** the
  training material; "built" collides with the build-verb rule (constraint 7), so the build
  session presents both forms (e.g. "created and delivered" vs his verbatim "built and
  delivered" as an explicit constraint override, which is his call to make, as with SaaS in
  the holding hero).
