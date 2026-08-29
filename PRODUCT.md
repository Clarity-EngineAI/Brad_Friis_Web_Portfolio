# Product

<!-- impeccable:product-schema 1 -->

**Updated:** Thursday 27 August 2026, 2:33 PM NZST

## Platform

web

## Stack

Astro 7, TypeScript strict, static output, no framework integrations, no CMS for homepage/CV copy (Sanity is used for blog post bodies only). Deploys to Cloudflare (moved from Netlify — Netlify stopped building after exceeded credit; headers were carried into `public/_headers`. The Sanity publish webhook must target a Cloudflare Deploy Hook — see `studio/README.md`).

## Users

**Primary: a hiring manager or internal recruiter**, forty seconds, one question — is this person going to hit a retention and expansion number. Hiring for account management, customer success, or a commercial seat in a NZ or AU software business. Needs, in order: a number they can repeat to their own boss; evidence the number is real; evidence a customer would say the same thing unprompted; a way to get the CV without filling in a form. Loses them: adjectives, a homepage that asks them to choose before they know anything, a resume only available as a web page they can't forward.

**Secondary — channel/partner lead:** a software vendor looking for someone to run a NZ/AU territory. Needs exclusivity, territory ownership, forecasting, the reporting line back to the vendor, and evidence a relationship survived ten years and an acquisition.

**Secondary — early-stage NZ software founder considering consulting:** buying judgement, not a CV. Needs a sample of how Brad reasons (the blog) and a low-friction way to start a conversation, not an application form.

**Secondary — cold blog reader:** arrives via LinkedIn/newsletter/search with no prior context on Brad. Needs the article to be good and exactly one obvious next action (follow/subscribe) — not a hiring pitch.

## Product Purpose

A standout resume/positioning site that wins Brad Friis account management, customer success, and channel/partnership roles, plus a blog that supports a thought-leader presence in AI for business. Success is a hiring manager reaching the CV and reference letters convinced within the first viewport, and secondarily a consulting or channel conversation started from the blog.

## Positioning

> Brad Friis keeps software customers, and grows them, for a decade at a time.

The three-second proposition the whole site supports. It contradicts the category (most commercial CVs claim to win; few can evidence that they keep and grow accounts), it is the seat he wants (an account management role where retention/expansion is the number, not net-new hunting alone), and it is evidenced four separate ways — including a customer saying it unprompted in a reference letter. *Software* is a market scope note, never a display-copy fence — the site targets software roles but breadth is proven by the reference archive, never announced in headline copy.

The through-line across thirty years is capability, not a hunting record: reading a business's needs and building measurable solutions for it.

## Operating Context

- Reference letters and a scanned-document redaction pipeline (`scripts/prepare-scans.py`) are core to the evidence model — quotes publish beside the source letter so every claim is checkable in one click.
- The CV is a separate, forwardable artifact (not just a web page).
- The blog runs on Sanity CMS for post bodies (Studio deployed, posts in `production`). The publish webhook still needs pointing at a Cloudflare Deploy Hook after the Netlify move — until that is done, Publish does not rebuild the live site. Homepage/CV copy stays inline in `.astro` files, not in the CMS.
- Copy is governed by a versioned library (`COPY/`) — every line has a status (In use / Available / Held / Rejected) and nothing rejected is deleted.

## Capabilities and Constraints

- **The 2015–2025 employer is never named**, anywhere, in any form (text, image, logo, letterhead) — described only by role (PowerSchool, Schoology). This is the one binding non-disclosure; PowerSchool, Schoology, itslearning, and the customer schools may all be named freely.
- **The dispute that ended that role is under a settlement gag** — no oblique reference, not Brad's to waive unilaterally.
- **Reference quotes are verbatim single sentences** — never spliced, never softened-hedges-removed, never "one of" promoted to "the".
- **Named individuals' contact details are destroyed (pixel-level), not boxed over**, on every published scan.
- **Only seven approved references may be published** (see `Brad Friis Resumes/References/README.md`); Deane Jessep, 95bFM, and the Canwest sales figures are permanently barred (the latter exposes former colleagues' performance data).
- **MySimpleSiteMan reference letter stays unpublished; the story is published** as a blog post — the restriction covers the letter only.
- **No invented figures; nothing implies an AI product has shipped.** Clarity Engine is unregistered/not a live offering. Pikle is paused, not current active consulting evidence.
- **No composite/derived figures** — never combine, divide, annualise, or compound two separately-given figures into a third. Hedged figures survive verbatim, unrounded.
- CanWest and Adplus publish no years (reference letters contradict the available ranges).
- itslearning is always lower case.
- NZ English throughout (organise, colour, centre, licence/license, analyse, recognise).
- This repository is private (holds resumes, reference letters, the barred employer name) and must stay private.

## Brand Commitments

**Voice** (binding on everything except the blog, which runs its own register — see `design/09-blog-voice.md`):
- First person; present tense for a capability claim, past tense for a finished record.
- Specific over impressive — state numbers once, plainly; let customers do the praising.
- No second person — the reader is never addressed as "you". **One documented exemption: `/fit/`.** The diagnostic asks a hiring manager about their own business, so its questions, its option labels and the printed intro letter address the reader directly. Everything the page says back in Brad's own voice — verdict lines, evidence cards, concessions, gaps and the "what I would need from you" section — stays first person. The exemption exists because a question that cannot say "your" is not a question; it does not extend to any other route, and it does not license second person in the report's own claims.
- No industry noun in display type (headings, hero) — "software"/"SaaS"/"edtech" stay out of headlines; body copy may name a sector where factual.
- No advertising device — no two-part withheld-clause rhythm, no reversal, no colon-then-punchline. Plain declarative sentences.
- Vary sentence openings across any set of headings/lines.
- Sentence case everywhere except the eyebrow pill (CSS-transformed).
- Never lead with a year count.
- "Build" is never Brad's verb for his own work — use originate/shape/get it made/get it to market.
- Relationships appear as a consequence (evidence), never as a self-adjective ("a very close working relationship" is banned; the underlying fact is not).
- Banned words: passionate, results-driven, proven track record, journey, thrilled, excited to share, leveraged, synergy, "I'm not just X, I'm Y", and anything a hundred other candidates could have written.

## Evidence on Hand

- **Seven approved reference letters**, scanned and redacted, quotes checkable against source.
- **Career record spanning two bosses and four customers, 2003–2025** (not "four industries" — advertising and tourism overlap via the same fifteen months seen from opposite sides of the same desk).
- **CV** as a separate downloadable/forwardable document.
- **Blog** with published posts including the MySimpleSiteMan story.
- **Absences that must not be fabricated:** no confirmed Hawke's Bay Visitor Guide growth figure, no confirmed "400 per cent" result, no shipped AI product, no active Pikle engagement to point to as current proof.

## Product Principles

1. Evidence over adjective — every claim of character or relationship is shown as a fact or a customer's own words, never asserted about oneself.
2. Durability over hunting — retention and expansion framing beats net-new-logo framing throughout.
3. Checkability — a reader should be able to verify any quoted claim in one click against its source document.
4. Say it once, plainly — no repeated figures, no compounding, no rounding up.
5. Software is the target market, not a fence — breadth is proven by the archive, never announced in headline copy.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
