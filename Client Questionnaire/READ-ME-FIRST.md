# Read me first

Two files in this folder:

- **`READ-ME-FIRST.md`** (this one). Plain English, about ten minutes.
- **`PLAN-fit-diagnostic.md`**. The full build plan, engineering detail: data shapes,
  accessibility, print layout, build sequence.

**This is now a status readout, not a decision brief.** The model is built and shipped, in
`src/data/fitDiagnostic.ts`. There is no open decision left in this file.

---

## 1. What the thing is

A page on your site at `/fit/`.

A hiring manager or recruiter lands on it and answers **eight multiple-choice questions about
their own business**, not about you. Where is revenue leaking. What happens to an account's spend
after two years. How much of what they sell actually gets used. How this role's number is set.

Two minutes later they get a report that scores **how well your evidenced record overlaps the
situation they just described**, including, explicitly, where it does not. Plus a section saying
what you would need from them in the first ninety days.

Then they get a link they can paste into an email or an ATS note and forward to a colleague.

## 2. Why it is worth having

Every other page on the site argues your case at the reader. This one makes them describe their
own problem first, then tells them honestly whether you are the answer to it.

Three things follow from that:

- **It can say no.** An outbound-led manager path scores 25 out of 100 and is told not to bother.
  That is the feature, not a bug. An instrument that flatters everyone persuades no one.
- **It is not gameable.** The questions are fixed in advance, the ceilings are fixed in advance,
  and nothing the visitor clicks can raise your score above what your evidence supports.
- **It publishes its own distribution.** The page states, in plain text, the real numbers below.
  No candidate publishes the odds their own assessment tool gives them. It is unfakeable, and it
  is only publishable because the model genuinely can say no.

It runs entirely in the browser. Nothing is sent anywhere, nothing is stored, there is no AI at
runtime. Their answers about their own business never leave their machine.

## 3. The eight ceilings, as shipped

**Eight capabilities. Each has a ceiling: the highest score your evidence can support in that
area, fixed in advance and un-raisable by any answer.**

A ceiling is not "how good are you at this". It is **how much you can prove, from the letters,
the interviews and the claims register**, if a hiring manager pushed back hard in an interview.

| # | The capability, as the visitor sees it | Ceiling | What bounds it |
|---|---|---|---|
| 1 | Getting non-technical users to actually use the product | **0.95** | 100% of one school's teachers to daily use in one term. 108 one-to-one interviews. ~600-teacher network. Negative teachers turned into advocates. Highest on the board and earned. |
| 2 | Keeping accounts that are at risk of leaving | **0.92** | One documented save, eight consecutive renewals at one account. But schools were lost on total cost, and that concession travels with it. Not 100. |
| 3 | Growing revenue inside accounts already held | **0.90** | 2,800 to 29,784 licences. Sixth campus added. Two new revenue lines at one account. The dollar magnitude is unsized in the register, so it cannot claim full marks. |
| 4 | Pricing structure and cash cycle | **0.90** | Managed services billed annually in advance. Buy-as-needed licensing. 50% deposit at 99 Corporation. The price-rise concession travels with it. |
| 5 | Contracts, licensing and vendor terms | **0.88** | Whole reseller agreement renegotiated, direct billing in local currency, 500-licence minimum removed. But: one vendor, one contract family. |
| 6 | Owning the whole cycle solo, prospect to invoice | **0.85** | Evidenced at Xplore and across the education decade. A sales-ops-supported enterprise motion is a different animal, and you have not run one. |
| 7 | Generating new demand: campaigns, partnerships, marketing | **0.70** | Ad revenue +60% and advertiser volume +40% over three years. Gold Pages two-tier product. Conference sponsorship. Grouped advertiser campaigns and live-to-air promotions. The Ministry facilitator partnership. |
| 8 | High-volume net-new acquisition, cold outbound | **0.30** | The record from 2001 is land, keep and grow, not high-volume cold outbound. He did grow a client base substantially at 99 Corporation and built a referral network worth over $70,000 across two years, but neither is high-volume cold outbound, and he left 99 Corporation partly because he did not enjoy the cold calling. |

### The nine-dimension split, proposed and reversed

On 28 August 2026 Brad challenged dimension 8, arguing that his 99 Corporation, Hawke's Bay
Tourism, Xchange and Canwest record showed real customer-base growth, not just weak cold outbound.
A nine-dimension split was drafted the same day: `customer-base` at 0.85, `cold-outbound` at 0.35.

**It was never implemented.** On 29 August 2026 Brad reversed it once the contradiction between
the drafted split and the shipped code was surfaced. The live model kept eight dimensions,
restored `new-logo-hunting` to 0.30, and raised `demand` to 0.70 (the one part of the 28 August
revision that did ship). No `customer-base` dimension exists in code, and the question set was
never reworked for one.

**Do not reopen the split** without a fresh decision from Brad — full detail and the challenge
evidence table are in `DECISIONS.md`, "the nine-dimension split is reversed, eight dimensions
stand".

## 4. The shipped enumeration

`scripts/check-fit-model.mjs` enumerates all 194,400 reachable answer paths against the live
eight-dimension model and passes as a build check. Current output:

- **min 0, max 98.8, mean 71.5, median 71.7, sd 14.2**
- p5 47.7 · p25 61.9 · p50 71.7 · p75 80.6 · p95 93.8
- Strong 27.5% · Substantial 40.8% · Partial 24.9% · Weak 6.7% · Not enough to go on 0.1%
- **31.7% of paths score below Substantial**
- Mean single-answer swing: 5.1 points

Worked examples from the live model:

- **Retention-led manager** (churn at renewal, spend flat, pricing untouched for years, product
  bought and unused, measured on renewal rate, they are the channel partner): **95, Strong.**
- **Outbound-led manager** (cannot get new logos, high-volume cold motion, pipeline activity,
  direct sales): **25, Weak.** Gaps triggered on `new-logo-hunting` and `demand`.

The report shows a band word plus a number rounded to the nearest 5, never a traffic light. 65 and
95 must not read as the same thing.

## 5. What the report shows them

1. **The band and the number**, with a verdict line in your voice.
2. **A bar chart.** One bar per capability they raised, plotting *how much they need it*, against
   a fixed reference line showing *how far your evidence reaches*. Where the bar overshoots the
   line, you are visibly not their person. Nothing they clicked can move the line.
3. **"Where I am not your person".** Triggers when a raised dimension's demand is high and its
   ceiling is low.
4. **"Standing limitations, shown on every result".** A separate heading, so a real finding does
   not get mistaken for boilerplate. Three permanent items: the save evidence is the education
   decade's only; accounts were lost on total cost against Google Classroom and Microsoft 365;
   MySimpleSiteMan, over $400,000 invested, closed, and the misjudgement named.
5. **"What I would need from you".** The flip. If they are a channel partner, you need the vendor
   relationship and a reporting line into it. If pricing has been static for years, you need the
   authority to move it or an agreed date when that conversation happens. Capped at three.
6. **Evidence cards**, each quoted sentence linking in one click to the actual letter scan.
7. **How this is scored**, including the published distribution.

Anything they did not raise is excluded entirely and shown as "You did not raise this". You are
never credited for a strength nobody asked about.

## 6. Things already decided, so you know they are not open

- Static scoring in the browser. No backend, no AI at runtime. Auditable before it ships.
- Eight dimensions, not nine. See §3 above and `DECISIONS.md`.
- Ceilings fixed, never raised by answers.
- Gaps shown explicitly, under a heading separate from the standing limitations.
- The full score distribution published on the page, matching §4 above.
- The share link is the main way to save it. `?print=1` shows the print layout on screen.
- `/fit/` is the one page allowed to say "you". Questions and the printed letter address the
  reader; your verdict lines, evidence and gaps stay first person.
- Not in version one: nav restructure, "I don't know" answers, per-question notes.

## 7. The 99 Corporation reference: resolved, not open

This file previously carried an open question about whether the Nieuwland reference could be
scanned and linked like the site's other seven letters. **It is resolved, and the decision was to
leave it as is.**

`Brad Friis Resumes/Brad Friis 99 Corporation Reference.docx` is a complete, signed reference from
Rob Nieuwland, Managing Director, 99 Corporation. It exists and was checked on 28 August 2026. It
is **not going into `letters.ts`**, because its headline sentence ("more than doubled our customer
base and billable income") is the register's superseded, barred figure. The live, naming-approved
figure is the milder owner-sourced one from a 14 August phone call: around 70% more business
clients, 30% more profit per customer.

Brad's call, made twice on 28 August with the document in hand: **keep it as is.** The evidence
card for this claim carries no letter link and attributes the figure as owner-confirmed by name.
That asymmetry against the other seven letters is visible on the page rather than hidden.

**Do not reopen this** — not to re-rank the letter's figure against the phone figure, not to add
the letter to `letters.ts`, not to re-export the PDF. Full detail in `DECISIONS.md`, "the 99
Corporation letter is found, and left unpublished".

If the letter's other material is ever wanted (four owner-attested pricing and cash-cycle
interventions, a new licensing revenue stream, four named accounts, a plain-words full-cycle
sentence), none of it requires publishing the barred sentence. Brad has not asked for this.
