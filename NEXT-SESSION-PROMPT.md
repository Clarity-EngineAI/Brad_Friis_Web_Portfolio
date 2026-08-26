Model: inherit from the session; copy work, not layout invention.

# Status

Copy review is done. Implementation is **not started**. Working tree was clean on `main` (`a78e376`) when this prompt was written, 26 August 2026.

Brad landed a long recruiter-facing manifesto and asked for feedback against the live homepage. Verdict: **do not put the manifesto on the site.** The live page already does the job (evidence first, forty-second recruiter read). He then approved three things together:

1. Leave the homepage as it is — hero, stats, five method cards, work, career, letters, contact stay verbatim.
2. Add **one mandate sentence** (Option B, no A/B/C theatre).
3. Rewrite the manifesto into site voice as a short **how I operate** block (~80–120 words), scored against the claims register, then place it.

Placement ruling (this session, not re-litigate): **How I work**, not under the hero. Hero plus stats is the ~70-word first viewport. The mandate answers hunter-versus-farmer after the numbers. The existing How I work lead stays; it is already at the section-lead character budget.

The previous contents of this file (uncommitted `/week/` filter-bar work) are stale. `main` is clean; week prototype work was archived in `5c651e2`.

# Next task

Implement the two How I work additions exactly as scored below. Do not rewrite the manifesto. Do not edit the hero.

## Copy to place — use this wording

**Mandate** (16 words), as a `standfirst` under the existing lead:

> I take over key accounts, hold them, and grow what they spend.

**How I operate** (~93 words), two `standfirst` paragraphs after the mandate:

> The billing, the contract and the renewal stay with the person who won the account. Licence prices rose every year, and accounts renewed through those increases. Some still left, on total cost against Google Classroom or Microsoft 365. I name a price that will not hold, a gap in the product, or a renewal at risk, while there is still a next step.
>
> I moved out of outbound direct marketing into consultative work and stayed there for the following decade. New business sits inside that work. It is not the whole job.

Word counts: mandate 16; operate block 15+11+10+25+13+6+6 ≈ 93 with “for the following decade” included. Combined insertion ~110 words. Inside the 80–120 operate target if you count operate alone; do not pad.

## Markup

In `src/pages/index.astro`, How I work header is currently:

```html
<header class="section-head">
  <p class="eyebrow-pill">How I work</p>
  <h2 id="capabilities-heading">Five parts to my method.</h2>
  <p class="lead">Read the business, find the priced-wrong offer, keep what I win, own the terms, and know the product well enough to trust the pitch.</p>
</header>
```

Change to:

```html
<header class="section-head section-head-left">
  <p class="eyebrow-pill">How I work</p>
  <h2 id="capabilities-heading">Five parts to my method.</h2>
  <p class="lead">Read the business, find the priced-wrong offer, keep what I win, own the terms, and know the product well enough to trust the pitch.</p>
  <p class="standfirst">I take over key accounts, hold them, and grow what they spend.</p>
  <p class="standfirst">The billing, the contract and the renewal stay with the person who won the account. Licence prices rose every year, and accounts renewed through those increases. Some still left, on total cost against Google Classroom or Microsoft 365. I name a price that will not hold, a gap in the product, or a renewal at risk, while there is still a next step.</p>
  <p class="standfirst">I moved out of outbound direct marketing into consultative work and stayed there for the following decade. New business sits inside that work. It is not the whole job.</p>
</header>
```

Keep the lead. Do not fold the mandate into it — `.lead` is 90–150 / hard 180 characters; the current lead is already ~140.

**Left-align this header** (`section-head-left`) so ~90 words do not tower in the centred 55ch stack. Work and Career already use that treatment. `.section-head-left .standfirst` is already 62ch in `src/styles/global.css`. Add CSS only if two extra `standfirst` paragraphs need a tighter gap after a browser pass. Do not invent a new component.

Page rhythm becomes How I work / Work / Career left; motion, now, letters centred.

## Claims register score — already done, do not re-draft from scratch

Source of truth for facts: `COPY/brad-verified-claims-transcript.md`. `COPY/interviews/_claims-register.md` is cited in older docs and **is not in the repo**; use the transcript.

| Sentence | Source | Verdict |
| --- | --- | --- |
| Mandate: take over / hold / grow what they spend | Seat-seeking, not a figure. Aligns with governing finding (land-keep-grow from 2001) and “retention and expansion as the number, not new logos alone.” | Pass. Does not claim 100% retention. Adplus mixed-book concession stays on Career. |
| Billing, contract and renewal stay with the person who won the account | Transcript lines 54–59, governing finding | Pass as present-tense restatement. Does not say every account. |
| Licence prices rose every year, and accounts renewed through those increases | Education-sector row: per-student licence pricing rose annually; accounts renewed through the increases | Pass. No % or dollar (confidential). `Accounts` not `all schools`. |
| Some still left, on total cost against Google Classroom or Microsoft 365 | Same row: occasional losses on overall cost vs government-subsidised alternatives, named | Pass. Concession travels with the price-rise claim. `Some` = occasional. |
| I name a price that will not hold, a gap in the product, or a renewal at risk… | No single row. Inferred from the price/cost distinction plus the Industry School evaluation already on the page | **Borderline.** Operating consequence of the two sentences above. If it reads as unfalsifiable self-assessment in the browser pass, **cut this sentence only**. Do not replace it with a new invention. |
| Moved out of outbound direct marketing into consultative work and stayed there for the following decade | 99 Corporation row, approved publishable form almost verbatim | Pass. Do not name the cold-calling dislike or the ethical discomfort. |
| New business sits inside that work. It is not the whole job. | Positioning, not a figure | Pass. Required so Option B does not revive the voided line *ran on renewals rather than new logos* (`design/01-positioning-brief.md` §3.1 — that line was never true). The hero still says `win`. |

## Do not reintroduce from the manifesto

Second person (`you`, `your open headcount`). Labelled psychology (reciprocity / pratfall / compromise). Self-adjectives (`fiercely protective`, `radically honest`). Comparison to other candidates. `Get in touch` (already a rejected CTA). `Vanity metrics`. `Bulletproof`. `NRR`. `Zero-to-one`. A/B/C packages. Any teaser that withholds the method the five cards already publish.

Do not recap the five cards in the operate block. Do not repeat the Career standfirst (`I kept the bulk of the accounts I won…`).

`Hold` is the site’s verb, not `stabilise`. NZ English: `licence` is the noun in “Licence prices”. Sentence case. No em-dash-heavy rhythm. No colon-then-punchline beyond what is already in the scored text.

## COPY library

In `COPY/section-headings/section-headings.md` add a **How I work** section:

- Existing lead: **In use** (already live; may not be recorded there yet — record it).
- Mandate and operate block: **In use**, with argument for (hunter/farmer answered below the fold, register-scored) and against (adds ~110 words before the cards; one inferred sentence).
- Original manifesto: **Rejected**, kept so the same ground is not drafted twice. Paste it under that heading; it is in the previous user message of the review session, opening “Let’s Skip the Pitch…”

Status key is in `COPY/README.md`. Date the status 26 August 2026.

## Files to touch

- `src/pages/index.astro` — How I work `<header>` only
- `src/styles/global.css` — only if the left-aligned stack needs a gap tweak after looking at it
- `COPY/section-headings/section-headings.md` — bank and status
- This file — rewrite as “task closed” once placed and checked

Do not touch: hero, stats, capability card bodies, work, career, letters, contact, CTAs.

## Test

Copy and layout only. After place:

1. `ASTRO_TELEMETRY_DISABLED=1 npm run build` — zero errors, warnings, hints.
2. Homepage desktop and ~390px width. First viewport unchanged (hero `I win, grow and renew accounts.` plus the four stats).
3. How I work reads: eyebrow, heading, existing lead, mandate, operate paragraphs, then the **same five cards**.
4. No stranded last word. No second-person leak. `Licence` not `License` in the new copy.

No new automated tests; there is no copy test suite. Walkthrough: screenshot of How I work on desktop and phone is enough; this is not a flow.

# Files to read first

1. This file.
2. `design/00-current-direction.md` — voice and hard constraints.
3. `COPY/perplexity-copy-brief.md` — character budgets, no-second-person, cite-or-die.
4. `COPY/brad-verified-claims-transcript.md` — the register. Confirm the scored sentences still match before placing.
5. `src/pages/index.astro` around the How I work header (~line 264).
6. `src/styles/global.css` — `.section-head`, `.section-head-left`, `.standfirst`.
7. `COPY/section-headings/section-headings.md` — where to bank.

# What this session already decided — do not reopen

- Manifesto does not replace the homepage.
- Mandate lives in How I work, not under the hero.
- Existing How I work lead stays.
- Header goes left-aligned.
- Copy is the scored text above, not a fresh generation.
- The inferred “I name a price…” sentence is the only optional cut, and only after seeing it on the page.

Next: start a new session and implement. Ask Brad only if you want to change the scored wording, not to relitigate placement.
