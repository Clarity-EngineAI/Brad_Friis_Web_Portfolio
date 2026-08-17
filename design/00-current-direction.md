# 00 — Current direction

**Written:** 17 August 2026, consolidating eleven `design/*.md` files and `COPY/README.md`.
**Purpose:** the one document a session reads first. States what is live and binding, points to
where each category of copy lives, and marks everything else as archive. Supersedes nothing on its
own authority — every ruling below is quoted or paraphrased from an existing decision, with its
source, so it can be checked.

**If this document and an archived one disagree, this document wins**, because it is the most
recent reconciliation. If this document and a *non-archived* design file disagree, that is a bug in
this document — flag it, don't silently pick one.

---

## 1. What the site is, for whom

Bespoke Astro static site (Framer and the Prolens template are abandoned — see §5). Personal
positioning site for Brad Friis: a standout resume that wins account management, customer success
and channel partnership roles, plus a blog that supports a thought-leader presence in AI for
business.

**Primary reader: a hiring manager or internal recruiter**, forty seconds, one question — *is this
person going to hit a retention and expansion number*. Three secondary audiences (channel/partner
lead, early-stage founder buying consulting, cold blog reader) are named in
`design/01-positioning-brief.md` §2 and unchanged.

**The three-second proposition**, unchanged since Stage 1. **Not yet re-tested** —
`01-positioning-brief.md` §11.6 lists this proposition explicitly as something the 12 August
interview did *not* settle: "tested, not assumed, in the next session." Treat it as a working
draft, not a confirmed line:

> Brad Friis keeps software customers, and grows them, for a decade at a time.

*Software* is a scope note for the target market, not a display-copy fence — decision 11 below.

---

## 2. Voice — binding on everything except the blog

Full spec: `design/01-positioning-brief.md` §7 and §7.1. Restated here because it is the
single most-cited section in the project.

- First person, present tense for a capability claim, past tense for a finished record.
- NZ English throughout — organise, colour, centre, licence (noun) / license (verb), dates as
  17 August 2026.
- **Banned:** passionate, results-driven, proven track record, journey, thrilled, excited to share,
  leveraged, synergy, "I'm not just X, I'm Y", and any sentence a hundred other candidates could
  have written.
- **Specific over impressive. State numbers once, plainly.** Let the customers do the praising —
  Brad never writes that he is patient or trusted.
- **No second person.** The reader is never addressed as "you". A whole round of copy was rejected
  15 August for addressing a buyer of services rather than an employer (`COPY/perplexity-copy-brief.md`
  §2).
- **No industry noun in display type** (headings, hero) — not *software*, not *SaaS*, not *edtech*.
  Body copy may name a sector where it is factual. Source: `COPY/hero-lines/hero-lines.md`
  constraint 4, restated in `perplexity-copy-brief.md` §4.3.
- **No device.** No two-part rhythm with a withheld second clause, no reversal, no colon-then-punchline.
  Brad, 16 August: *"you are writing as if it is an advertisement instead of a value proposition."*
  Plain declarative sentences beat slogans on this site. Source: `hero-lines.md` round 8 outcome
  (line 1755, "Round eight outcome, and the end of hero generation — 16 August 2026").
- **Vary the sentence opening across a set.** Don't start more than two of N section headings or
  card lines with the same word. Source: `perplexity-copy-brief.md` §3.
- **Sentence case everywhere, never Title Case**, except the eyebrow pill, which CSS uppercases —
  write it sentence case and let CSS transform it.
- **Every surprise carries information.** Motion or reveal that delivers a fact is allowed; motion
  that announces itself is decoration and is banned. No scroll-jacked or fixed side frames. Source:
  §7.1.
- **Do not use *build* as Brad's verb** — "it suggests I build software or apps, I don't." Use
  *originate*, *shape*, *get it made*, *get it to market*.
- **The relationship must be present as a consequence, never as a self-adjective.** "A very close
  working relationship" is banned; the fact underneath it (a vendor comparing terms across partners)
  is not. Publish the evidence, never the adjective.

**The blog runs a different register.** `design/09-blog-voice.md` governs blog posts specifically
and several of the rules above are explicitly dropped there (past tense narration, humour density,
the 250-word cap). The banned-word list, NZ English, and the no-invented-figures rule survive into
the blog unchanged and bind *harder* there. See §6 below.

---

## 3. Hard constraints — never re-litigate these

Source: `design/01-positioning-brief.md` §11, `COPY/perplexity-copy-brief.md` §4, `hero-lines.md`.

1. **The employer (2015–2025) is never named**, on the site or the CV, in text or in any image,
   logo or letterhead. Described by what the role was, never by who it was for.
2. **The dispute that ended that role is under a settlement gag.** Do not steer toward it, do not
   permit an oblique reference. Not Brad's to waive unilaterally in a draft — raise with him.
3. **Never publish:** Deane Jessep, 95bFM, or any Canwest sales figures/imagery, by name or by
   description. The "172%" and "400 per cent" (Canwest) figures are dead and do not revive. (The
   *different* $400k MySimpleSiteMan figure is not barred — check which "400" is present before
   flagging.)
4. **MySimpleSiteMan is withheld** as a published reference; the employment is a plain career-record
   line with no letter behind it. It is the one failure story — singular, human, not a pattern.
5. **Nothing implies an AI product has shipped.** Clarity Engine is unregistered, Pikle is paused.
6. **Six reference letters publish, in full, newest first: Bergh, Lad, Pilgrim, Lemon, Walker,
   Lowry.** All six have consented. No copy anywhere may imply the archive is complete — ten
   documents exist, six are shown.
7. **No composite/derived figures.** Never combine, divide, annualise or compound two
   separately-given figures into a third. Hedges ("around 70", "around 120") survive verbatim,
   never tightened or rounded.
8. **Concessions travel with their claims**, same sentence or the next one (e.g. the Xplore
   retention finding travels with the mixed-book qualification).
9. **No universal quantifiers, no unfalsifiable self-assessment**, no comparison to other people
   (predecessors, competitors, colleagues).
10. **Never write "four industries."** `01d-reference-archive-audit.md`'s own header banner overturns
    its §9: Walker was Brad's managing director at Adplus and Lowry ran Hawke's Bay Tourism, an
    Adplus account, so advertising and tourism are the same fifteen months seen from opposite sides
    of the desk — "four industries" doesn't survive that check. **The correct, currently-live span
    claim is *"two bosses and four customers, 2003 to 2025"*** (see the file's header banner and
    `COPY/letters/letters-page.md` §2). Do not say twenty-five years about the letters; that figure
    is the career's, not the archive's.
11. **The site targets software; breadth is proven by the archive, never announced in display
    copy.** Decided 12 August 2026 (`01-positioning-brief.md` §11.5, decision 11). This is the
    ruling that the current live hero headline conflicts with — see §7 below.
12. **itslearning is always lower case.**

---

## 4. The word cap — exact current scope, and what's still open

Source: `design/01-positioning-brief.md` §7.1, amended by `10-homepage-blog-link.md`.

- **Original ruling (12 August):** under 250 words on the homepage.
- **Scope narrowed (17 August, by Brad):** the cap now governs the **above-fold block only — hero,
  stats and capabilities.** Everything below that is uncapped, on the reasoning that a reader who
  scrolls past it has already chosen to keep reading.
- **Currently breached.** Hero 47 + stats 28 = 75 words, leaving 175 for capabilities, which
  measured at 223 — roughly 70 words over. No cut has been authorised.
- **Standing question, unanswered, do not treat as settled either way:** if the original 250-word
  instinct was about the *whole page* feeling heavy, narrowing the cap to above-the-fold doesn't fix
  that. **Whole-page word count is not settled across this project's own documents** — three sources
  disagree by roughly 40%: `10-homepage-blog-link.md` §1.2 gives ~720–780, `01-positioning-brief.md`
  §7.1 gives ~847, and `11-copy-leverage-plan.md` §1 gives 1,027. None is dated later than the
  others in a way that resolves the disagreement. This needs a fresh, single re-measurement against
  the current live page as part of any future copy pass — treat all three existing figures as
  unreliable until then — and Brad needs to rule on whether the whole-page weight is acceptable.

---

## 5. Delivery vehicle and navigation

**Delivery: bespoke Astro static site.** Framer and the Prolens template are abandoned
(`08-visual-direction.md`, `design/index.html` intro banners). Every Framer-specific document is
archived — §8 below.

**Live routes, as built:** `/`, `/cv`, `/letters`, `/blog` (`src/pages/`).

**Design-doc-specified routes** (`design/01b-navigation-tone-and-structure.md` §8, 11 August):
`/record`, `/letters`, `/consulting`, `/field-notes`, plus `/cv` and `/contact`. This is a **live
conflict, flagged, not resolved here** — see §7, item 2.

---

## 6. Where each category of copy lives

Per `COPY/README.md`, confirmed current 17 August 2026:

| Category | Folder | Notes |
| --- | --- | --- |
| Hero / display lines | `COPY/hero-lines/hero-lines.md` | **Blocked — Brad writes it himself.** See §7, item 1. |
| Blog posts | `COPY/blog/` | Governed by `design/09-blog-voice.md`, not §7 above. Brad writes; the doc supplies a review prompt, not a draft. |
| Career record | `COPY/career/` | Past tense for finished roles; present tense for the two most recent. Row titles are the hireable capability, not the job title. |
| Letters page | `COPY/letters/letters-page.md` | Six-letter set, §3 item 6 above. |
| Navigation | `COPY/navigation/navigation.md` | Nav labels, glosses, CV button. Cross-check against §5's route conflict before treating as final. |
| Section headings | `COPY/section-headings/section-headings.md` | Eyebrows, captions, CTAs. |
| Interview record + claims register | `COPY/interviews/` | Raw record. **Nothing in it is pre-approved for the site** — it is the source Phase 3 drafts from, not copy itself. |
| Copy-generation briefs | `COPY/perplexity-copy-brief.md` | Current as of 16 August — character budgets measured from live CSS. Use this over any older brief when generating options. |
| Positioning brainstorm | `COPY/positioning/positioning-lines.md` | **Available**, restatused and re-cut 17 Aug — see §7, item 2. Moved from the loose root-level `resume-website-positioning-lines.md`, sentence-openers varied, 74 lines cut to 44. Not scored against the claims register. |

Every entry in COPY/ carries one of four statuses — In use / Available / Held / Rejected — per
`COPY/README.md`. Nothing rejected is ever deleted.

---

## 7. Genuine conflicts — flagged 17 August 2026, ruled where Brad has ruled

### 1. The hero line — open, and `hero-lines.md` itself is stale about what's live

There is no decided hero line: round eight was rejected on two faults (second-person audience
error, and writing as advertisement rather than value proposition — `hero-lines.md` line 1755,
"Round eight outcome," 16 August) and Brad took the hero off the generation track entirely — he is
writing it himself. **But `hero-lines.md`'s own claim about what is currently live is wrong.** It
says "Option J remains live on the site" (lines 1751, 1815). The actual live headline, checked
directly against `src/pages/index.astro:129`, is *"Helping SaaS and digital businesses turn
customer needs into growth"* — not Option J. That exact line traces to
`COPY/resume-website-positioning-lines.md:113`, a different, undated brainstorm file (see item 2
below) that was never part of the hero-lines.md generation rounds at all. So the live site is
running an unruled line from a file `hero-lines.md` doesn't even reference, while `hero-lines.md`
believes something else is live. **Action for a future session:** correct `hero-lines.md`'s own
stale live-line references (it also cites stale code line numbers, `index.astro:132`/`:134`), and
flag to Brad that the live hero is not the holding position he thinks it is.

### 2. `COPY/positioning/positioning-lines.md` — done, 17 August

Brad's ruling, 17 August: *"these lines are in the right direction but should not all start with
'I'."* This is not a second-person objection (the file is first person throughout, e.g. "I help you
win better-fit customers") — it's the sentence-opener repetition rule in
`perplexity-copy-brief.md` §3 ("do not start more than two of N lines with the same word"), which
the original file violated at scale (43 of 74 bullet lines, 58%, open with "I"). **Done:** re-cut to
44 lines (words are Brad's throughout, cuts only — no rewriting), no set has more than two lines
sharing an opener, moved to `COPY/positioning/` with an **Available** status, and the
`resume-website-positioning-lines.md` origin of the current live hero line is preserved verbatim in
a marked historical section. The original untracked file at repo root is deleted — its content
survives in the new file's historical section and it was never committed, so nothing is lost.

### 3. Navigation — flagged, not resolved

`design/01b-navigation-tone-and-structure.md` specifies a 4-route nav (`/record`, `/letters`,
`/consulting`, `/field-notes`) dated 11 August. The live site has `/`, `/cv`, `/letters`, `/blog` —
simpler, and missing `/consulting` and any career/about page entirely (that content currently lives
inline on the homepage's career section instead of a dedicated `/record`). Brad has not ruled on
which is the current target. **Do not build toward 01b's route map without checking with Brad
first** — it may be superseded by the simpler shape that actually got built, or it may still be the
plan and the site is mid-build toward it.

### 4. Two more stale "authority" files, found outside the `design/` folder

Not in the original handoff's file table, because they sit at repo root, not in `design/`. The root
`README.md`'s own "Where the authority lives" table pointed at `COPY-SOURCE-OF-TRUTH.md` and
`POSITIONING-BRIEF.md` as the current copy and positioning sources — both are 13 August, pre-pivot,
Framer-era documents that predate the 14 August `COPY/` restructure and the 12 August interview
corrections (§11 of `design/01-positioning-brief.md`). Neither carried a supersession banner; a
reader following the README would have been sent to dead material with no warning. **Fixed as part
of this consolidation:** both moved to `design/archive/` with banners added, and the root
`README.md`'s authority table rewritten to point here and at `COPY/`. This is exactly the kind of
silent drift Brad flagged — worth naming explicitly rather than fixing quietly, since a future
session should know to check root-level files too, not just `design/`.

---

## 8. Archive — superseded, kept for record, not current direction

Moved to `design/archive/` as part of this consolidation (17 August 2026). Each file already
self-flags as historical in its own header; nothing in the reasoning is deleted, only marked
non-authoritative for delivery decisions:

| File | Why archived |
| --- | --- |
| `04-stage-4-prompt.md` | Framer-era Stage 4 handoff prompt. Names a dead hero line and the old Framer route set. |
| `05-younger-years-edit-prompt.md` | A copy-editing prompt for the Framer-era "Life's Journey" timeline section, never run. |
| `06-hybrid-direction.md` / `06-hybrid-direction.html` | A Framer/iPort visual-direction test, explicitly "does not replace the current paste sheet or Stage 3." |
| `07-framer-feasibility.md` | Framer CMS/component feasibility research. Entirely dead now Framer is abandoned; token values (spacing, radius, border alpha ladders) were carried forward into `08-visual-direction.md` before archiving. |
| `COPY-SOURCE-OF-TRUTH.md` (moved from repo root) | Framer-era copy master, superseded by `COPY/`. See §7 item 4. |
| `POSITIONING-BRIEF.md` (moved from repo root) | Framer-era strategy doc, superseded by `design/01-positioning-brief.md`. See §7 item 4. |

**Not archived, still current:**

- `01-positioning-brief.md` — backbone document, self-annotating, §11 is the live interview record.
- `01b-navigation-tone-and-structure.md` — current except the route map, which is flagged in §7.
- `01d-reference-archive-audit.md` — "still current and authoritative," per its own header.
- `08-visual-direction.md` — current Astro visual spec.
- `09-blog-voice.md` — current, governs all blog posts.
- `10-homepage-blog-link.md` — current, implemented and verified.
- `11-copy-leverage-plan.md` — current, governs the Phase 3 copy rebuild plan.
- `index.html` — the contact-sheet hub. **Needs a pass to update its Framer-era stage links and
  status chips once this consolidation is reviewed** — not done as part of this pass; flagged as a
  follow-up.

---

## 9. Duplication resolved by this document

The following facts were previously stated near-verbatim in three to five files each. They agree
with each other (no conflict), so this document is now the single citable source; the originals are
left in place as detailed reasoning, not restated or edited.

- The employer-never-named rule (§3.1) — was in `01-positioning-brief.md` §11.1/§11.5,
  `01b-navigation-tone-and-structure.md` §8, `07-framer-feasibility.md`, `perplexity-copy-brief.md`.
- The settlement gag (§3.2) — `01-positioning-brief.md` §11.1, `perplexity-copy-brief.md`.
- The six-letters decision (§3.6) — `01-positioning-brief.md` §4/§11, `01b-navigation-tone-and-structure.md`
  §1, `01d-reference-archive-audit.md` §11.
- The banned-words list (§2) — `01-positioning-brief.md` §7, `09-blog-voice.md` §2.1,
  `perplexity-copy-brief.md` §4.
- The 250-word cap (§4) — `01-positioning-brief.md` §7.1/§11.2, `10-homepage-blog-link.md` §1.2/§6,
  `11-copy-leverage-plan.md` §7.

---

## 10. What this document does not do

It does not rule on any of the open items in §7 beyond what Brad has already said — items 1, 2 and 3
need a future session's action, not further guessing. It does not touch live copy or code.
It does not update `design/index.html`'s stage chips (flagged in §8 as a follow-up). It does not
re-measure the current whole-page word count (flagged in §4). Those are the next tasks, in a new
session, once this document itself is confirmed accurate.

---

*Previous: eleven separate `design/*.md` files. Next: Brad confirms this document is accurate, then
a future session (a) gets a ruling on the nav/route conflict, (b) updates `design/index.html`'s
stage chips, (c) re-measures the live homepage word count. `resume-website-positioning-lines.md`'s
restatus is done — see §7, item 2.*
