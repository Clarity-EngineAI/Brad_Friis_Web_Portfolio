# Project status (source of truth — read this first, every session)

Rule: update ONLY the section you touched this session. Never rewrite the whole file.
Each section: State / Last updated / Blocked on / Next action / Model.

---

## 1. Blog + Sanity CMS

State: Shipped, live, webhook verified end to end (19 Aug 2026). Studio is local-only;
hosted Studio deploy blocked on a login 404 (not investigated further, not urgent).
Blog bodies live in Sanity; images are local Astro imports (`src/assets/blog`), Sanity
holds a key only, not the file. Homepage/CV copy is NOT in Sanity — stays inline in
`.astro` pages by design.
Last updated: 2026-08-19
Blocked on: nothing active
Next action: none queued — dormant until Brad has a new blog post to write
Model: Sonnet (routine post authoring), Haiku (metadata/typo fixes)

## 2. Fit diagnostic (`/fit/`)

State: Complete and shipped, all 9 build-sequence steps done including homepage/CV entry
points (29 Aug 2026). Build verified clean (0 errors/warnings/hints).

"I don't know" skip logic DONE this session (29 Aug 2026), scope grew beyond the original
Q2/Q3-only backlog item: every one of the 6 scored questions (q1-q6, q8) now has a skip
option, not just Q2/Q3. Reason: the deferred floor rule (`sum(D) < DEMAND_FLOOR`, set to 8)
was mathematically unreachable with only 2 skippable questions — the other 4 always summed to
16+ on their own. Extending skips to all 6 was Brad's explicit call once the enumeration
proved this. New `insufficientBand` ("Not enough to go on") returned by `scoreFit()` when
total demand is between 1 and `DEMAND_FLOOR`; a fully-blank form (demand 0) still falls
through to the pre-existing zero-score Weak path, unchanged. `check-fit-model.mjs` now
enumerates 194,400 paths (up from 50,000), tracks the insufficient band alongside the 4 real
bands, and fails the build if that band never fires (was silently dropping 148 paths off the
printed count before this was added — caught in this session, not shipped). Print-view fallback
for an empty "Where it overlaps" section also fixed; it was dead code before since no path
could reach zero raised capabilities. Gaps-trigger threshold resolved this session (29 Aug):
`GAP_MAX_CEILING` raised from 0.60 to 0.70, restoring two trigger routes (`new-logo-hunting`
0.30, `demand` 0.70). A related contradiction was also found and closed: `PLAN-fit-diagnostic.md`
and `DECISIONS.md` still described a 28 Aug decision to split into nine dimensions
(`customer-base`/`cold-outbound`) that was never implemented and was reversed same day. Both
docs updated to match the shipped eight-dimension model; see `DECISIONS.md`.

Tone pass DONE this session (29 Aug 2026). Q1's prompt ("Where is the revenue actually
leaking?") presupposed a problem the visitor had not confirmed; rewritten to "What matters
most to you in the person filling this role?" with its five options reframed from problems to
priorities (e.g. "Customers leave at renewal, or threaten to" -> "Keeping the customers we
already have happy and renewing"). Demand vectors on every option are unchanged, so the scoring
model did not move. Q4 had the same defect ("How much of what you sell actually gets used?")
and was reworded to "How would you describe adoption of what you sell?" with options softened
from accusation to description (weights unchanged). Q2, Q3, Q5, Q6, Q8 were audited against the
same pattern and found already neutral: their prompts ask about facts or priorities rather than
asserting an unconfirmed problem, so they were left as-is. Also added a permanent banned-words
check to `check-fit-claims.mjs` (word list currently just "actually") since that word was the
tell for presuppositional framing in both Q1 and Q4; it also caught two other live uses (a
dimension label and an evidence-card claim) that were reworded to "genuinely" to pass. Re-ran
`check-fit-model.mjs`: 194,400 paths, distribution unchanged (median 71.7, same band shares) —
confirms the copy edit did not touch scoring. Full build clean, 22 pages.
Last updated: 2026-08-29
Blocked on: nothing — backlog only, none pre-selected
Next action: pick one of 3 remaining backlog items (nav restructure, fit report print polish
beyond the fallback just fixed, letters count decision) — none urgent
Model: Sonnet (all remaining items are copy/UI polish, not architecture)

## 3. CV rebuild (multi-variant, targeted by role)

State: SCOPE CHANGED 29 Aug 2026, Brad's call: multi-variant approach abandoned in favour
of ONE CV. The live page `src/pages/cv.astro` is the single source of truth. The five
standalone `.md` files in `Brad Friis Resumes/` are SUPERSEDED, not maintained, and must
not be edited or treated as current; the live page is fuller (7 roles vs 5), claims-audited
inline, and already carries the GCT-safe framing.

Done this session:
- Added the 7th role, Founder and Director, MySimpleSiteMan 2006-2009, closing the
  2006-2009 gap that contradicted LinkedIn. E48-E50, all publishable.
- Added "Hastings Boys High School" and renamed the heading to "Education and professional
  development" so ATS parsers find the education field. No dates, Brad's call.
- Added a stated target to the Profile ("looking for an account management seat where
  retaining and growing the customers already won is the number, not new logos alone").
  The retention concession sentence was kept: it is what makes the claim credible.
- Re-tightened the print budget (8.7pt / 1.24) to hold TWO A4 pages with the 7th role.
  Verified: `pdfinfo` reports 2 pages, `pdftotext` extraction order is clean.

IMPORTANT print finding, do not undo: a three-column closing row was tried to buy space
and DOES fit, but `pdftotext` proved it interleaves columns on extraction, dropping
"Hastings Boys High School" into the middle of the tools sentence. An ATS reads that order.
The closing sections stay STACKED. Comment in `global.css` records this.

Last updated: 2026-08-29
Blocked on: Brad - LinkedIn corrections below are his to make, not in the repo.
Next action: LinkedIn alignment pass (SEPARATE workstream, see section 6).
Model: Sonnet (copy edits), Opus (if the print budget needs rework)

## 6. LinkedIn alignment (NEW, 29 Aug 2026)

State: Not started. Brad asked for suggestions to align LinkedIn to the site, improve
recruiter impact, and consider SEO/keywords. Scoped but deliberately NOT folded into the
CV task.

THREE CLAIMS CURRENTLY LIVE ON LINKEDIN THAT THE CLAIMS REGISTER BARS:
1. "Grew agency headcount from 5 to 12 (140%)" (Xplore). E28 bars this outright: headcount
   is the company's number, never Brad's, and never an implied growth multiple. Approved
   replacement form: "the sales he brought in required the agency to add delivery capacity."
2. "Increased advertisers from 42 to 86 for the Gold Pages/Gold Listings two-tier product"
   (Adplus). E32 explicitly records that NO uptake figure was ever given. Either Brad
   sources it (new register row) or it comes down.
3. Naming the five-campus account's location as Queensland. A4 permits it, but D4 (the
   school-naming rule) is unresolved, and the site publishes that account anonymously.

Also noted: LinkedIn dates split the education decade into three entries starting Aug 2017,
while the CV runs it as one 2015-2025 role. Not a conflict (channel partner restructures),
but a recruiter comparing the two will notice. Worth a consistent framing.

Last updated: 2026-08-29
Blocked on: nothing - ready to start when Brad wants it
Next action: draft the corrected LinkedIn headline, summary and role bullets, keyword-aware
Model: Sonnet

## 4. Client questionnaire (suitability assessment for a possible role)

State: UNTRACKED — Brad mentioned this thread exists (29 Aug 2026) but no detail has been
given yet: which client, what the questionnaire asked, what's been submitted, deadline, or
what (if anything) needs building/writing in this project as a result.
Last updated: 2026-08-29
Blocked on: Brad briefing this thread's actual content and scope
Next action: get a briefing from Brad — what was asked, what's been answered, whether any
site content (CV variant, evidence citation) needs to feed into it
Model: TBD once scoped
