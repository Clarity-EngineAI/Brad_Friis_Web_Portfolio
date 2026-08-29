# Fit diagnostic — a self-service reference check, run in reverse

## Context

Every page on the site currently argues Brad's case at the reader. This flips it: a hiring
manager or recruiter answers eight questions about the problems their own account base has right
now, and gets back a designed report showing where Brad's evidenced capabilities overlap their
stated situation, **including where they do not** — plus what Brad would need from them in the
first ninety days.

It is a sales tool. Its credibility depends entirely on being an honest instrument, which means
the scoring must be capable of telling a visitor not to bother.

**The first version of this plan failed that test and the failure was measured, not argued.** The
original model was enumerated across all 40,000 reachable answer paths: mean 80.1, median 81,
97.7% of paths scoring 65 or above, and five paths in forty thousand returning "Weak". Two of the
eight questions had no route to a low score at all, violating the plan's own authoring rule. The
worked example that proved the model could say no was computed from a demand vector the question
set cannot produce. Everything below is the corrected model, enumerated and verified.

Outcome wanted: a two-minute diagnostic at `/fit/`, a report with a real graphic and a shareable
link, and a save format a hiring manager can forward to a colleague.

---

## Decisions taken (do not re-open)

| Decision | Ruling |
|---|---|
| Engine | Static deterministic scoring, vanilla JS, no backend, no LLM at runtime. Auditable before it ships, works offline, deterministic artefact. |
| Honesty | Gaps shown explicitly, and the score distribution across every possible path is published on the page. |
| Result format | Band word plus number. Individual bars show **their demand** against a fixed ceiling reference line. Not traffic lights: 65 and 95 must not read as the same thing. |
| Ceilings | Fixed per capability, set from the claims register, never moved by answers. Brad signs off the numbers before any UI is built. |
| Free text | One note field on the report, after the result. Quoted back verbatim, never interpreted, never scored. |
| Voice | `/fit/` is an explicit documented exemption to the no-second-person rule. Questions and the printed letter address the reader; report verdict lines, evidence and gaps cards stay first person. **The exemption is written into PRODUCT.md and AGENTS.md in the same commit.** |
| Save format | The share URL is the primary artefact. `?print=1` renders the print layout on screen. Two-page print polish is a later pass. |
| v1 additions | Reverse mode ("what I would need from you"), one-click evidence links to the letter scans, Q5 replaced with "how is this role measured". |
| v1 cuts | Nav restructure, `?v=1` versioning, per-question note accordions, noscript question dump, SVG hatch patterns. |

---

## 1. The scoring model

### Dimensions: nine, purpose-built

> **Revised 28 August 2026, by Brad.** This was eight dimensions. The single `new-logo-hunting`
> dimension at 0.25 was measuring cold outbound as a daily motion while carrying evidence that is
> really about growing a customer base, which is a different capability evidenced at four
> employers. It has been split into `customer-base` (0.85) and `cold-outbound` (0.35), and `demand`
> raised 0.60 to 0.70. See `Client Questionnaire/DECISIONS.md` for the full reasoning and the
> register rows.
>
> **Consequence: the enumerated distribution below is stale.** It was computed on eight dimensions
> with a question set that has no route to `customer-base`. Both the question set and the
> enumeration must be reworked before step 1 of the build sequence.

Not the twelve `repWeekCalendar.js` categories (four have no evidence behind them, and nobody has
a business problem called "measurement and attribution"). Not the Demand/Land/Keep/Grow lifecycle
either, because Brad is strong on three of four and any scoring against it hands everyone 75%. The
lifecycle survives as a colour and grouping label, not as the scoring axis.

| id | Visitor-facing label | Ceiling | Stage | What bounds it |
|---|---|---|---|---|
| `adoption` | Getting non-technical users to actually use the product | 0.95 | Land | 100% of one school's teachers to daily use in one term; 108 one-to-one interviews; ~600-teacher network; negative teachers converted to advocates. Highest on the board and earned. |
| `retention` | Keeping accounts that are at risk of leaving | 0.92 | Keep | One documented save, eight consecutive renewals at one account, and a stated concession that schools were lost on total cost. Not 100. |
| `expansion` | Growing revenue inside accounts already held | 0.90 | Grow | 2,800 to 29,784 licences; sixth campus added; two new revenue lines at one account. The magnitude is unsized in the register, so it cannot claim full marks. |
| `pricing-cash` | Pricing structure and cash cycle | 0.90 | Grow | Managed services billed annually in advance; buy-as-needed licensing; 50% deposit at 99 Corporation. The price-rise concession travels with it. |
| `commercial-terms` | Contracts, licensing and vendor terms | 0.88 | Grow | Whole reseller agreement renegotiated, direct billing in local currency, 500-licence minimum removed. One vendor, one contract family. |
| `full-cycle` | Owning the whole cycle solo, prospect to invoice | 0.85 | Land | Evidenced at Xplore and through the education decade. A sales-ops-supported enterprise motion is a different animal. |
| `customer-base` | Growing the size of a customer base | 0.85 | Demand | **Added 28 August 2026.** 99 Corporation customers +~70% and income +~120%, owner-confirmed by Rob Nieuwland (E12, E51). Hawke's Bay Tourism advertisers +40%, revenue +60% over three years (E37). Xchange, 25-business referral network, over $70,000 across two years (E21). Canwest 10 to 20% account growth against a 10% minimum, every year (E45). Four employers. Bounded below `adoption` because none of it is sized in dollars across the whole book. |
| `demand` | Generating new demand: campaigns, partnerships, marketing | 0.70 | Demand | Ad revenue +60% and advertiser volume +40% over three years, Gold Pages two-tier product (E32), the advertiser member-value bundle (E35), grouped advertiser campaigns and live-to-air promotions at Canwest (E42, E43), conference sponsorship, the Ministry facilitator partnership. Raised from 0.60 on 28 August: the campaign and packaging work was not counted anywhere. |
| `cold-outbound` | High-volume cold outbound as the daily motion | 0.35 | Demand | Done at 99 Corporation, but E15 records he left partly because he did not enjoy it, and **no dial, meeting or call volume exists anywhere in the register**. Hard-capped, but no longer carrying evidence that belongs to `customer-base`. |

Ceilings live in data with a comment naming the claims-register row that justifies each, plus the
date last reviewed. **A visitor cannot argue a ceiling up.**

### The arithmetic

Each answer carries a **demand vector**, `dimensionId -> 0..4`. Demands sum into `D[d]`.

```
share[d]   = D[d] / sum(D)
achieved   = Σ share[d] × ceiling[d]
overallFit = round( 100 × (achieved − 0.25) / (0.95 − 0.25) )
```

**The rescaling is the fix that matters.** A raw convex combination of ceilings is trapped in
their hull: six of eight ceilings sit at or above 0.85, so the weighted mean lands near 0.87 for
almost everybody, and no amount of question tuning escapes it. Rebalancing the questions alone was
tested and still left 93% of paths at Substantial or above. Rescaling against the actual floor and
ceiling of the evidence spreads the distribution across the full band range and, unlike the raw
version, is describable in one defensible sentence:

> 100 means every problem raised is one I have my strongest evidence for. 0 means every problem
> raised is the one I have least.

**Dimensions never raised are excluded from the arithmetic entirely** and render as "You did not
raise this". Brad is never credited for a strength that was not asked for. Say this on the page.

### The verified distribution

> **STALE as of 28 August 2026.** Computed on the eight-dimension model. Retained because the
> method and the thresholds still stand, and because the failure it records is the reason the
> enumeration is a build test. **Re-run it on nine dimensions before writing `fitDiagnostic.ts`.**
> Expect the floor to rise: splitting a 0.25 into a 0.85 and a 0.35 lifts every path that raised
> new-business demand. If the sub-65 share falls below 25%, sharpen the low-ceiling routes in the
> questions rather than pushing the ceilings back down.

Enumerated across all 50,000 reachable paths with the question set in §2:

```
min 20   max 96   mean 70.1   median 70   sd 13.3
p5 = 48   p25 = 60   p50 = 70   p75 = 81   p95 = 94

Strong      80-100:  15,172   30.3%
Substantial  65-79:  19,130   38.3%
Partial      50-64:  12,031   24.1%
Weak          0-49:   3,667    7.3%
```

31.4% of all possible answer sets score below Substantial, against 2.3% in the broken version.
Mean single-answer swing is 4.7 points, up from 2.3, so changing one honest answer visibly moves
the needle.

Canonical paths, both verified by enumeration:

- **Retention-led manager** (churn at renewal, spend going down, static pricing they are nervous
  to touch, product bought and unused, measured on renewal rate, they are the channel partner,
  at-risk accounts must still be there in six months): `sum(D)` = 31 → **95, Strong.**
- **SDR-led manager** (cannot get new logos, too young to have two-year accounts, volume not
  pricing, nobody has heard of them, measured on pipeline activity, direct sales, pipeline full of
  new names in six months): `sum(D)` = 35 → **21, Weak.**

That 21 is the page working.

### Bands

| Band | Range | Verdict line (first person, draft) |
|---|---|---|
| Strong | 80–100 | "This is close to the job I have done for the last twenty-five years." |
| Substantial | 65–79 | "Most of what you described, with real gaps named below." |
| Partial | 50–64 | "Some overlap. Read the gaps first, they are the deciding part." |
| Weak | 0–49 | "Not a good match. The main things you raised are the things I have least evidence for." |

**Display the number rounded to the nearest 5, compute the band from the unrounded value.** An
eight-click instrument with 4.7-point single-answer sensitivity cannot justify two significant
figures; "Substantial, around 75" is defensible where "74" is not. Computing the band from the
raw value stops two visitors 0.4 points apart getting different verdict words.

The `sum(D) < 8` floor rule from the first draft is **deleted**. Minimum reachable `sum(D)` is 17,
so it was dead code. It only becomes meaningful if "I don't know" skips are added (see §2), and
should be reinstated then, not before.

### Gaps trigger

A dimension enters "Where I am not your person" when `D[d] >= 2 AND ceiling[d] <= 0.60`.

> **Revised 28 August 2026.** Under the nine-dimension model only `cold-outbound` (0.35) sits at or
> below 0.60, so **only one dimension can now trip this**, where two could before. `demand` at 0.70
> no longer trips. Decide when re-tuning whether the threshold rises to 0.70 (restoring two
> trigger routes) or whether one honest gap is enough. Do not leave it at 0.60 by default without
> ruling on it: a gaps section that can only ever name one thing is close to no gaps section.

**Two headings, not one.** When a dimension genuinely trips, it renders under "Where I am not your
person". The three permanent caveats render separately under **"Standing limitations, shown on
every result"**, so a visitor can tell what is about them from what is always there. Conflating
them turns a finding into boilerplate:

1. The save evidence is the education decade's only. At the four pre-education roles no account
   was recalled as having been saved from leaving.
2. Accounts were lost on total cost against government-subsidised alternatives, Google Classroom
   and Microsoft 365.
3. MySimpleSiteMan: founded a self-serve CMS for small businesses, over $400,000 invested, closed
   it. The misjudgement was assuming small-business owners knew how to build a site that converted.

A sector caveat renders whenever Q7 is not education.

---

## 2. The question set

Eight scored questions plus one context question. Authoring rules, and **this time they are
enforced by the enumeration test**:

- Ask about their reality, never about a capability.
- Every option is a real, respectable business situation. No option is an admission of failure.
- **Every question must contain at least one route to a low-ceiling dimension.** The first draft
  wrote this rule and broke it on Q2 and Q4. The build test now checks it.
- No option is labelled with its dimension.

> **Revised 28 August 2026: this question set is incomplete.** It was authored against eight
> dimensions and **has no route to `customer-base` at all**, because that dimension did not exist.
> Every `new-logo-hunting` vector below now needs splitting between `customer-base` and
> `cold-outbound`, deliberately rather than mechanically: "we need more customers" is
> `customer-base`, whereas "we need an outbound machine" is `cold-outbound`. Q2's fifth option and
> Q8's third are the clearest cases. Rework before enumerating.

**Q1. Where is the revenue actually leaking?**
- Customers leave at renewal, or threaten to → `retention:3, adoption:1`
- Customers stay, but never spend more than they did on day one → `expansion:3, pricing-cash:1`
- Our growth has to come from new customers, not existing ones → `new-logo-hunting:3, demand:2`
- We win them, then implementation drags and the relationship sours → `adoption:3, full-cycle:1`
- The margin on each deal is thinner than it should be → `commercial-terms:2, pricing-cash:3`

Option c is deliberately rephrased from the first draft's "We cannot get enough new logos in the
door", which was the only option in the set phrased as an admission rather than a situation.

**Q2. When an account has been with you two years, what happens to what it spends?**
- It goes up, and we know why → `expansion:1`
- It goes up, and we do not really know why → `expansion:2, pricing-cash:1`
- It stays flat → `expansion:3, pricing-cash:2`
- It goes down → `retention:3, expansion:2`
- **We do not have accounts two years old. We are too young.** → `new-logo-hunting:3, demand:2`

The fifth option is new and it is what fixes this question. Previously all five options pushed
upward, making the plan's self-described "best question" pure inflation. A Series A company is a
real, common, respectable answer that correctly says: the problem is volume of new names.

**Q3. Which of these is closest to true about your pricing?**
- We have not changed it in years and are nervous about doing so → `pricing-cash:3, retention:2`
- We charge for the product and give away a lot of service around it → `pricing-cash:3, expansion:2`
- Our price is set by someone else: a vendor, a parent company, a rate card → `commercial-terms:3, pricing-cash:1`
- Cash comes in too late relative to when we do the work → `pricing-cash:3, commercial-terms:1`
- Pricing is not the problem. Volume is. → `new-logo-hunting:3, demand:2`

**Q4. How much of what you sell actually gets used?**
- It is bought and then barely touched → `adoption:3, retention:2`
- The technical people use it, everybody else avoids it → `adoption:3`
- It gets used, but only because we hold their hand constantly → `adoption:2, pricing-cash:2, full-cycle:1`
- **Usage is fine. Our problem is that nobody has heard of us.** → `demand:3, new-logo-hunting:2`

The first draft's empty-vector option was justified as essential honesty but measured at −1.6
points off an 80: clicking the honest answer barely moved the needle. Replacing it with a real
low-ceiling route is both more honest and more sensitive.

**Q5. How is this role's number set?** *(replaces "who owns the account end to end")*
- Retention or renewal rate, or net revenue retention → `retention:3, expansion:2`
- Growth within existing accounts → `expansion:3, retention:1`
- New logos or new ARR → `new-logo-hunting:4, demand:1`
- Total revenue, however it arrives → `full-cycle:2, expansion:1`
- Activity and pipeline coverage → `new-logo-hunting:3, demand:2`

The old Q5 asked about the job spec rather than their business, breaking the first authoring rule,
and was transparently leading — two options were Brad, two were not-Brad, readable in two seconds.
This replacement is the question good candidates ask, it adds two low-ceiling routes, and it
surfaces the thing Brad most needs to know: whether the seat actually pays on retention and
upsell. Its `full-cycle` signal is already carried by Q1d and Q4c.

**Q6. How do your customers reach you?**
- Direct, we sell to them ourselves → `demand:2, new-logo-hunting:2`
- Through partners, resellers or a channel → `commercial-terms:2, expansion:1`
- We are the partner; someone else owns the product → `commercial-terms:2, expansion:1, retention:1`
- Self-serve, they arrive and buy → `demand:3, new-logo-hunting:3`

`commercial-terms` downgraded from 3 to 2: being a reseller does not mean the problem is contracts,
and 3 was too strong an inference from a weak signal.

**Q7. What sector?** Education/edtech · SaaS or software · Agency or services · Media or
publishing · Industrial, trade or primary · Other. Scores nothing; selects the sector caveat and
decides which evidence example leads. **Say on the page that it does not affect the score.**

**Q8. If you filled this role, what has to be true in the first six months?**
- Named at-risk accounts are still here → `retention:3`
- The existing book is spending more → `expansion:3`
- The pipeline is full of names that were not there before → `new-logo-hunting:4, demand:2`
- The thing we sold last year is finally in daily use → `adoption:3`
- The commercials are on a better footing: terms, price, cash → `commercial-terms:2, pricing-cash:2`

Q8 is the sentence quoted back at the top of the report.

### Deferred: "I don't know" skips

Internal recruiters are a named primary user in PRODUCT.md and frequently cannot answer Q2 or Q3
about a client's business. A non-scoring "I don't know" on those two is the right fix, and it also
resurrects the floor rule by making a low `sum(D)` reachable. **Deferred to v2** because it
changes the distribution and the enumeration would need re-running. Note it; do not ship it
unmeasured.

---

## 3. Files

**New (4):**

| Path | Purpose |
|---|---|
| `src/data/fitDiagnostic.ts` | The model, typed: `dimensions`, `questions`, `bands`, `standingGaps`, `sectorCaveats`, `needsFromYou`, and a pure exported `scoreFit()`. Every entry carries a `// claims-register: A24, footnote 14` comment and a review date. |
| `src/data/fitEvidence.ts` | Evidence strings, concessions, and the letter slug plus quoted sentence each links to. Audited line by line against `COPY/interviews/_claims-register.md`. |
| `src/pages/fit.astro` | Follows `src/pages/week.astro`'s shape: frontmatter imports data, markup renders static shells, one `<script>` holds state and rendering. |
| `src/styles/fit.css` | Page-scoped, imported only by `fit.astro`, as `src/styles/week.css` is. |

**Modified (4):**

| Path | Change |
|---|---|
| `src/pages/index.astro` | One CTA in the hero action row as `.button-secondary`. No new homepage section; the page is already over its word budget. |
| `src/pages/cv.astro` | One link in the closing area. The CV is where a recruiter stands when "does he match my brief" is live. |
| `PRODUCT.md` | Record the `/fit/` second-person exemption, with its reason. Same commit as the page. |
| `AGENTS.md` | Same exemption noted against the voice rule. |

**No changes to `src/styles/global.css`** (2640 lines, with a documented print budget for the CV).
**No nav changes in v1** — see §7.

### Data shape

```ts
export interface Dimension {
  id: DimensionId;
  label: string;
  ceiling: number;        // fixed, the honesty valve
  reviewed: string;       // "2026-08-28" — shown on the method disclosure
  stage: "demand" | "land" | "keep" | "grow";
  claim: string;
  evidence: string[];
  concession?: string;    // required on retention and pricing-cash, asserted at runtime
  letterSlug?: string;    // links to the scan in src/data/letters.ts
  letterQuote?: string;   // the exact sentence surfaced
  source: string;         // "A24, A32, footnote 14" — audit, not display
}
```

`scoreFit(answers)` is pure and exported: testable without a DOM, auditable by reading it.

---

## 4. Interaction

**One question per screen.** A single-page form shows the whole answer key at once and invites
reverse-engineering, which is fatal to an instrument whose value is that it cannot be gamed.

State mirrors `week.astro`'s idiom:

```ts
const state = {
  step: 0,
  answers: [] as (string | null)[],
  note: "" as string,          // one note, on the report
  view: "intro" as "intro" | "questions" | "report",
};
```

- **Progress:** hairline rail of eight segments, `Question 3 of 8` in text, and an
  `aria-live="polite"` announcement per advance. Same single-status-element pattern as
  week.astro's `[data-filter-status]`.
- **Auto-advance on pointer selection after 150ms**, but **never on a keyboard arrow key** —
  arrowing a radio group changes the selection, so auto-advance would trap a screen reader user.
  Keyboard users get a Next button once an option is chosen. Under `prefers-reduced-motion`, remove
  the *animation*, keep the 150ms *delay*: instant advance on click means a mis-click has already
  lost the screen. Reduced motion means less motion, not less time.
- **Back** is persistent from step 1, re-renders with the previous answer selected, and does not
  wipe forward answers. No branching.
- **Every answer editable from the report.** The "Your situation" block lists each question with
  its answer as a button; clicking jumps back to that step.
- **URL state:** `/fit/?a=bcadabca` — one character per question, the option index. Parsed and
  validated on load; invalid input falls back to the intro silently, never throws. `replaceState`
  per answer; one `pushState` when the report is reached so browser Back returns to the last
  question. No `?v=1` in v1.

---

## 5. The report

### 5.1 The graphic: their demand, against a fixed ceiling line

**This inverts the first draft's meter, and the reason is measured.** In the original design the
bar length was the ceiling, so bar *values* never changed — only which bars appeared. Across
40,000 paths there were just 36 distinct visible-dimension sets, and **35% of visitors saw a
byte-identical meter at 95/92/90/90/88/85/65/30**. A "personalised report" whose central graphic
is one of thirty-six posters fails the moment two people compare notes.

So: **the bar plots their demand share. The ceiling is a vertical reference rule the bar either
clears or overshoots.**

```
Keeping accounts at risk of leaving          KEEP
████████████████████████░░░░░░░░░░░│              you: high · my evidence reaches 92
                                    ▲ my ceiling

High-volume net-new acquisition              DEMAND
████████████████████████████████████████████░│    you: highest · my evidence reaches 25
                          ▲ my ceiling
```

- Bar length is their demand share, so it genuinely differs per visitor.
- The ceiling rule is the fixed honesty device, now a reference rather than a claim.
- **A gap is visually obvious as a bar overshooting its rule.** Nothing else needs to signal it.
- The failure mode of the original ("bars grow when the visitor cares more, which reads as
  flattery") is structurally impossible, because the bar is not a capability claim at all.
- Gap rows draw identically to strength rows. No red, no warning icon. A separate treatment for
  weak items reads as apology; identical treatment reads as measurement.
- Hue by lifecycle stage, redeclared in `fit.css` rather than importing week.css for three custom
  properties: Demand `#c05621`, Land `#319795`, Keep `--accent` `#9c3d1e`, Grow `#4a5568`. Stage
  hues are for bars only — `week.css` already records that `#319795` is 3.1:1 on white; use its
  darker category steps for any text.

Rejected: radar chart (unreadable in print, implies an area nobody computed, and is the single most
recognisable gimmicky-assessment signal on the internet), dot matrix (reads as a game health bar,
loses 88 vs 90), stacked segments (implies a composition that does not exist).

Above the meter: the band word and the rounded number at `--text-hero` in `--ink`, not the accent.
Verdict line beneath at `--text-lead` in `--ink-tertiary`.

### 5.2 The method disclosure, with the distribution

At the foot of the report, always expanded in print:

> **How this is scored.** Eight capabilities, each with a ceiling fixed in advance from documented
> evidence, last reviewed 28 August 2026. The answers decide which capabilities are scored and how
> heavily each weighs. They cannot raise a ceiling. Nothing that was not raised is counted.
>
> Across all 50,000 possible sets of answers, this scores between 20 and 96. The median is 70.
> Roughly 31 in every 100 answer sets score below 65. The route through these questions that a
> hiring manager building an outbound team would take scores 21.

**No candidate has ever published the distribution of their own self-assessment tool.** It is
unfakeable, it is more persuasive than the graphic, and it is impossible to publish unless the
model is genuinely sound — which is exactly why it works. It also converts the first draft's
biggest unidentified risk (a published method that exposes the rigging) into the page's strongest
asset.

The first draft's "Try the third option on question one" invitation is **deleted**. It was
measured: of the 8,000 paths starting there, the mean was 73.6 and only 8.6% fell below 65. It
invited an audit it would have failed. The distribution paragraph replaces it and survives the same
audit.

### 5.3 Reverse mode: what I would need from you

A section after the gaps, generated from their answers. This is the actual flip — without it the
visitor answers questions but Brad is still the only one being graded. A candidate who states
conditions reads as having options.

Keyed off the same demand vectors, so it costs one more data structure. Examples:

- They answered channel or partner on Q6 → *"I would need the vendor relationship and a clear
  reporting line into it. Every retention number I have depends on owning the billing and the
  renewal conversation directly, and where I have not had that, the number was someone else's."*
- Pricing static for years on Q3 → *"I would need the authority to move price, or an agreed date
  when that conversation happens. Holding accounts through an increase is evidenced. Holding them
  while nobody is allowed to raise the question is not the same job."*
- Measured on new ARR on Q5 → *"I would need to know who is generating the top of the funnel,
  because it will not be me at the volume this implies."*

Cap at three. First person throughout.

### 5.4 Evidence, verifiable in one click

One card per matched capability with `ceiling >= 0.85`, capped at **four** (six is a brochure;
four is the site's own chunking pattern). Each carries the claim, one or two evidence sentences,
the concession where set, and an `.evidence` pull-out with the named third party.

**Every quoted sentence links to its specific letter scan in `src/data/letters.ts`, not to a
page.** PRODUCT.md principle 3 requires that any quoted claim be verifiable in one click against
its source document. This page honours it or it is weaker than the rest of the site.

### 5.5 Save and share

**The share URL is the primary artefact.** Copy button with confirmed feedback and one line: *"This
link restores the answers and the result."* It pastes into an ATS note, a Slack message, an email
or a calendar invite, which is what a hiring manager in 2026 actually does. The note is not carried
in the URL (too long, and a URL containing someone's business problems is a privacy issue) — say
so where the link is offered.

**`?print=1` renders the report in the print layout on screen**, with all evidence expanded and the
letterhead visible. This does two useful things: the recipient of a forwarded link sees the
artefact, and the layout gets reviewed on screen where review is cheap. `window.print()` is then
one media query away rather than a bespoke design job.

The print layout carries what the screen does not:

1. **Letterhead** — "Brad Friis" plus contact details inline, sourced from `src/data/contact.ts`,
   never hardcoded.
2. **Title and date** via `toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })`.
3. **The intro letter, four to five sentences, second person** (draft):

   > This was generated from eight answers about your situation, on a fixed set of questions I
   > wrote in advance. Nothing in it is written to order. The scores are ceilings on what I can
   > evidence, not a rating of how well I would do the job, and the areas where those ceilings are
   > low are printed here with everything else. If the parts that matter to you are the strong ones,
   > I would be glad to talk through them properly. If they are the weak ones, this page has done
   > its job and cost you two minutes.

4. **Every question printed with its answer**, not answers alone. A colleague who receives this has
   not seen the questions and cannot otherwise tell they were fixed in advance.
5. **The note, verbatim.**
6. **The share URL as printed text.**
7. **The method disclosure including the distribution.**

Print specifics: 10pt body (not the CV's 9pt), `break-inside: avoid` on every row and card, and
`a[href^="http"]::after { content: " (" attr(href) ")" }` scoped to the print block. **Do not build
SVG hatch patterns in v1** — a 1px stroked outline plus the tabular numeral means no information is
lost when `printBackground` is off, only the fill. Avoid `<details>`; use a class-toggled button so
print can force-expand. Collapsed content in a print-out is the most common print failure.

Two-page print polish is a **later pass**, not a v1 build step.

---

## 6. What is cut from v1, and why

- **The nav restructure and `NavMenu.astro` extraction.** A site-wide IA change riding inside a
  feature that does not need it. It touches every page, risks the documented 362px nav constraint,
  and sat at step 7 of 9 where it could block shipping. v1 reaches `/fit/` from the homepage and the
  CV. The Evidence-dropdown proposal is recorded in the handoff as its own session.
- **`?v=1` versioning.** Protects shared links against a question-set change that has not happened
  yet. Add it the day the questions first change.
- **Per-question note accordions.** Eight interaction targets and eight bits of state for text that
  is never scored and never shared. One note on the report, at the moment they actually have
  something to say and are closest to making contact.
- **The noscript question dump.** The first draft justified it as credibility, but that argument, if
  true, argues for showing the question set to everyone — which contradicts the anti-reverse-
  engineering rationale for one-question-per-screen. v1 ships a noscript block that says the page
  needs JavaScript and links to the CV.

---

## 7. Accessibility

- **Real `<input type="radio">` with `<label>`** styled as cards, in a `<fieldset>` with the
  question as `<legend>`. Native radios give arrow-key navigation, roving tabindex and group
  semantics for free.
- **Auto-advance only on pointer selection**, never on an arrow key (§4).
- **One `aria-live="polite"` `.visually-hidden` element** for all announcements. On the report,
  announce *and* move focus to the heading: the live region says something happened, the focus move
  says where you now are.
- **The number is never graphic-only.** Three routes: a `role="img"` label per row carrying the
  full sentence, the printed numeral, and a visible one-line text summary at the foot of the meter.
  Not `role="progressbar"` — this is not progress.
- **`prefers-reduced-motion`:** remove animation, keep the delay. Read the query once with
  `matchMedia` and store it, as week.astro does.

---

## 8. Risks

1. **It reads as a quiz.** No progress gamification, no numbers animating upward, no countdown
   ("you have 90 seconds" was considered and rejected — a timer is the most quiz-like element
   available), no emoji, no archetype result. The intro states the mechanism in the first two
   sentences, because naming the machinery is the difference between an instrument and a trick.
2. **The number is not believed.** The distribution paragraph (§5.2) is the answer, and it is only
   publishable because the model now survives it.
3. **A barred claim leaks.** A build check greps the two data files for `400%`, `5→12`, `130%`,
   `$10`, `$23`, `never lost an account`, the employer name, `hugely successful`, em dashes and US
   spellings, failing the build on a hit. Extract string literals via the TypeScript AST rather than
   hand-rolling a comment stripper — the files are required to carry `// claims-register:` comments,
   so a naive grep fails on its own provenance notes.
4. **The model drifts.** *(New, and more important than 3.)* A build test re-runs the full
   enumeration and fails if the median rises above 74, if the sub-65 share drops below 25%, or if
   any question loses its low-ceiling route. The barred-string check protects the copy; nothing
   protected the model, which is what actually broke the first time.
5. **The visitor answers aspirationally.** Q5 and Q8 invite the answer a manager wishes were true.
   One line in the intro: *"Answer for the business you have, not the one you are building. A
   flattering answer here only wastes your own time."*
6. **The gaps section reads as apology.** Every card ends with judgement, not a shrug: *"someone
   whose last three years were that is a better fit than I am."*
7. **A later editor restores the 12-category or lifecycle taxonomy.** Write the rejection into the
   top of `fitDiagnostic.ts`.
8. **It reads as a demand for a bigger title** — Brad's own recorded caveat. All eight dimensions
   are operator dimensions; none is team leadership, P&L or strategy. State it in the intro: *"This
   scores account and commercial work. It does not score management."*
9. **Privacy.** `<meta name="robots" content="noindex">` unconditionally on this route regardless of
   the site-wide gate. And say plainly: *"Nothing answered here is sent anywhere or stored. It is
   worked out in the browser, and the only record is the link."*

---

## 9. Build sequence

0. **Rework the question set for nine dimensions, then re-run the enumeration.** Added 28 August
   2026. The ceilings are signed off; the question vectors and the distribution are not. Nothing
   in step 1 can be written until `customer-base` has answer routes and the distribution has been
   remeasured. Rule on the gaps threshold in the same pass.
1. **`src/data/fitDiagnostic.ts`** — dimensions with ceilings, review dates and sources; questions
   with demand vectors; bands; standing gaps; `needsFromYou`; `scoreFit()`. **Brad signs off the
   ceilings and the gaps copy before any UI exists.** The model is the product.
2. **The enumeration test** (risk 4) and **the barred-string check** (risk 3), in `scripts/`, before
   the page so neither is optional. Re-run the enumeration and confirm it reproduces min 20 / max 96
   / median 70 / 31.4% below Substantial.
3. **`src/data/fitEvidence.ts`** — evidence, concessions and letter links, audited line by line
   against `COPY/interviews/_claims-register.md`.
4. **PRODUCT.md and AGENTS.md** — record the second-person exemption. Same commit as the page.
5. **`fit.astro` + `fit.css`** — intro and question flow, no report. Verify keyboard, screen reader,
   URL state, back navigation.
6. **Report** — band, number, demand-vs-ceiling meter, gaps under two headings, reverse mode,
   evidence cards with letter links, method disclosure with distribution, note field, share button.
7. **`?print=1`** view and the print media query.
8. **Homepage and CV entry points.**
9. `ASTRO_TELEMETRY_DISABLED=1 npm run build` at zero errors, warnings and hints.

Steps 1 to 4 are one session. Steps 5 to 7 are one session. Step 8 to 9 close it out.

---

## 10. Verification

- Build clean, including both new checks.
- **The enumeration test is the primary verification.** Re-run it and confirm the published
  distribution matches the disclosure text exactly. If the numbers on the page and the numbers from
  the test ever disagree, the page is lying.
- Walk the retention path: expect **95, Strong**, standing limitations under their own heading, no
  dimension-triggered gap.
- Walk the SDR path: expect **21, Weak**, both `demand` and `new-logo-hunting` in the gaps section,
  and a reverse-mode card about who generates the top of the funnel. **If this path does not produce
  a low number, the tool is broken** regardless of how the rest looks.
- Confirm two different answer sets produce visibly different meters. This was the failure of the
  first design and it needs eyes on it, not just a passing test.
- Copy the report URL into a fresh tab; confirm it restores. Corrupt the `a=` parameter; confirm a
  silent fall back to the intro.
- Keyboard-only pass: arrow through all options, confirm no auto-advance, confirm Next appears.
  Screen reader pass on advance and report announcements.
- `?print=1` in Chrome and Safari, `printBackground` off: all bars legible, nothing collapsed,
  contact details and the note present, every question printed with its answer.
- 375px device emulation.

---

## Noted for later sessions, not this one

1. **The CV print output needs a major polish.** Currently poor: it fights a two-page budget at
   9pt, hides its own visual identity (the eyebrow pill is `display: none`), inherits a screen
   layout, and does not print link URLs. Own session.
2. **The nav restructure.** Fold CV, Letters and EdTech behind an "Evidence" dropdown, freeing a
   slot for Fit. Requires extracting `NavMenu.astro` from week.astro's menu. Own session, own
   review.
3. **"I don't know" skips on Q2 and Q3** for recruiters answering on behalf of a client, which also
   resurrects the floor rule. Requires re-running the enumeration.
4. **Two-page print polish** once `?print=1` has been used in anger.

---

## Open item for Brad before step 1

**CLOSED 28 August 2026.** Brad reviewed the ceilings and rejected the eight-dimension shape. He
did not accept that cold outbound is a poor skill and named Adplus, Hawke's Bay Tourism, Canwest
and 99 Corporation as roles where he significantly increased the business base. The register backs
that: E12, E51, E37, E21 and E45. Dimension 8 was split; nine ceilings now stand as listed in §1.

**One item remains open, and it is evidence rather than scoring.** The 99 Corporation numbers are
the strongest evidence behind `customer-base`, and there is no letter scan for them.
`src/data/letters.ts` holds seven letters; none is 99 Corporation or Nieuwland. The register
records E51 as a phone call on 14 August 2026, not a document. Brad says he has the reference; what
form it is in decides whether the strongest evidence card on the page can carry a one-click link
like every other card, or has to stand as an owner-confirmed statement without one.
