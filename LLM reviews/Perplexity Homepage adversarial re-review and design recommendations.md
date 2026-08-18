# Homepage adversarial re-review, cross-check against Gemini, and design recommendations

**Written:** 17 August 2026
**Purpose:** stress-test the six-question homepage structure review against a second AI review
(Gemini) received on the same brief, flag anywhere either review drifts from the locked project
constraints, and add concrete visual-design recommendations aimed at making the site memorable
enough to generate an engaged role offer, not just a competent one.

**How to read this:** Part 1 re-argues the original six answers against Gemini's counter-points.
Part 2 lists specific places Gemini's review conflicts with rules already locked in
`perplexity-copy-brief.md` and `COPY-SOURCE-OF-TRUTH-2.md` — these need to be caught before anyone
builds from that document. Part 3 is new design and styling recommendations. Part 4 is a single
combined priority list.

---

## Part 1 — Stress-testing the original six answers

### Q1. Order — capabilities before case studies, or case studies before capabilities

**Original position:** swap stops 3 and 4. A skimmer who just saw four hard numbers wants another
concrete instance next, not four abstract claims; capabilities-first also stacks the five-campus
account into three consecutive tellings (stat figure → capability card 1 → case study 1).

**Gemini's counter:** keep the order as proposed. Its argument is that the stat strip at stop 2
already discharges the "prove it" job, so stop 3's capability cards are no longer naked
self-claims by the time the reader reaches them — the numbers already bought the credibility.

**Where this lands after pressure:** Gemini's counter has real force and I'm partly persuaded. The
stat strip probably does enough proof-of-life work that capability cards don't read as pure
assertion. But that counter doesn't touch the actual problem I raised, which was repetition, not
sequencing — the same account gets told three times in three different registers back to back
regardless of which of stops 3/4 comes first. **Revised position:** the order swap is a genuine
judgement call and I no longer hold it strongly. The higher-leverage fix is cutting the overlap in
capability card 1's body (see Q5/cut 3 below) so the story is told in full once, at the case study,
and only gestured at in the capability card — that fix works under either ordering, which makes it
the safer thing to act on first.

### Q2. Testimonial placement, stop 3 vs stop 5

Both reviews land on stop 5 as correct, for slightly different reasons — mine: stop 2 already
carries the early-trust job, so testimonials at stop 3 are redundant, not decorative as the
blueprint argued. Gemini's: testimonials need "operational context" (what platform, what was at
risk) before they mean anything, which stop 3 doesn't yet have.

Gemini adds a genuinely useful mechanism I didn't specify: **anchor the case-study evidence line
and the later reference quote to the same named person**, so the quote at stop 5 functions as a
callback rather than a fresh claim. Worth flagging that this is *already partly built* — the live
`workCaseStudies[0].evidence` line and `homeQuotes[0].quote` are both attributed to Adrian Pilgrim,
and both use the word "confidence" ("giving us the confidence to invest in the platform further" /
"giving us the confidence... to invest in getting the very best from it"). That's the mechanism
Gemini is asking for, already in place for one of the two homepage quotes. Worth checking whether
the second case study/quote pair (Andrew Bergh) has the same deliberate echo, or whether it should.

### Q3. Does every stop earn its place — the recruiter's ACV/ownership question

Gemini raises a genuinely new gap I missed: a hiring manager qualifying an account-management hire
wants to know contract scale and whether Brad owned the commercial number or supported someone who
did. That's a fair question and a real gap.

**Gemini's proposed fix is a hard constraint violation and should not be built as written** — see
Part 2, item 1. The question is legitimate; the fix Gemini gives for it (inject ACV figures like
"$15k" or "$250k+" into meta lines) requires numbers that do not exist anywhere in the evidence
register. The fixable version of this gap is answering it with facts that are already sourced: the
channel-contract story already establishes that Brad negotiated the right to invoice customers
directly rather than through the vendor, which is the ownership signal a recruiter is actually
asking for. That fact already answers "did he own the number or support someone who did" without
a dollar figure attached to it.

### Q4. Untabbing

Both reviews agree: untab, it's a conversion problem to hide 75% of a cumulative argument behind a
click. My original answer noted the 720-word count almost certainly already includes the hidden tab
panels as DOM text, so untabbing is mostly a *visible-load* cost, not a *total-word* cost, and
recommended writing all four cards at the floor of their character bands to control that visible
load.

Gemini's fix for the same problem — delete the capability card's summary line entirely as
"redundant" — **should not be built as written**; see Part 2, item 2. The four-piece card structure
(heading, summary, body, evidence) is a fixed spec in `perplexity-copy-brief.md` §8b, not an open
choice. If a summary line reads as pure repetition of its heading, the fix is writing a better
summary — a compression, not a restatement, per the brief's own instruction — not deleting the slot.

### Q5. Word cuts — combined list

Both reviews independently pick the same top cut, which is a good confidence signal:

1. **Cut the MySimpleSiteMan paragraph entirely.** Both reviews, independently, rank this first.
   Highest-confidence cut on the page.
2. **De-duplicate the five-campus account across stat strip, capability card 1, and case study 1**
   (mine) — trim the capability card's body to the argument only, let the case study carry the full
   narrative once.
3. **Compress section lead paragraphs to their shortest defensible form** (Gemini's framing,
   compatible with the brief's existing 90–150 character band — this isn't a new cut so much as
   writing toward the floor of a budget that's already specified).
4. **Cut the second sentence of the logo strip's caption** ("Not current clients, and not an
   endorsement.") (mine) — the double disclaimer is defensive text a shorter caption or the eyebrow
   alone can carry.

Gemini's specific cut of the capability summary lines is excluded from this combined list for the
reason given in Q4 — it removes a required component rather than trimming it.

### Q6. Faults in the blueprint — one addition, one validation, one fork to flag

**New fault Gemini caught that I missed — hero scope dilution.** Narrowing the hero to a single
"account management" claim, as the blueprint proposes, risks hiding the actual differentiator: most
account-management candidates don't also run CRM systems, proposal templates, and applied AI work.
If the hero collapses entirely to "keeps and grows accounts," the site's most distinctive evidence
(the AI/systems/UX range covered in stops 3 and 6) has to do all the work of re-introducing that
differentiation later, after the reader has already filed Brad as a conventional AM candidate. This
is a real tension the blueprint doesn't resolve, and it's worth raising with Brad directly rather
than deciding it here — it cuts against the "one claim, said once" instruction he's already
approved, so any change needs his sign-off, not a rewrite in this document.

**Validated, not new — grammatical monotony.** Gemini flags that rewriting all seven career titles
to the identical past-tense-verb-first structure risks the same "eleven of sixteen lines opened
with 'I'" problem the copy brief already documents and explicitly warns against. This is already a
stated rule (§3, "vary the sentence opening across a set"), not a new finding, but it's a useful
check to apply specifically to the career row rewrite once it happens, since that's a seven-item set
sitting down one page and is exactly the pattern the brief's example warns about.

**A fork to flag, not resolve — the logo strip.** My original review recommended cutting it
outright (its own caption disclaims it as "not an endorsement" while being framed as career
evidence). Gemini recommends keeping it but segmenting it into "Software & Enterprise" vs "Media &
Agency" logo groups. Both are legitimate; segmenting adds a small amount of new label text and
visual complexity that cutting avoids entirely. This is Brad's call, not a case where one review is
simply wrong.

---

## Part 2 — Where Gemini's review conflicts with locked constraints

Gemini did not have the full evidence register or the hard-constraints list, so some of its
specific fixes read as good general B2B-positioning advice but would break rules already settled
on this project. Flagging these explicitly so they don't get built as written.

1. **Injecting ACV/contract-value figures ("$15k ACV," "$250k+ ACV") into case study and career
   meta lines violates cite-or-die (brief §4.6).** No dollar-value contract figure exists anywhere
   in the evidence register for any role. If this recruiter question needs answering — and it's a
   fair question — it has to be answered with sourced facts already in evidence (direct invoicing
   rights, national-account scope, licensed-user counts), never with an invented number, however
   plausible-sounding.
2. **Deleting the capability card's summary line contradicts the brief's fixed card structure
   (§8b), which specifies four required pieces — heading, summary, body, evidence — not three.**
   A weak summary line should be rewritten, not removed.
3. **The architecture map's category tags — "(Education SaaS)" on a case study, "Integrated SaaS &
   Enterprise Brand Grid" as a section label — put an industry noun next to display-weight text.**
   The brief's constraint 3 allows a sector name in body copy where factual, but explicitly bars an
   industry noun ("software," "SaaS," "edtech") from a headline or section heading. Depending on how
   these render — small body-level meta vs. an actual heading/tag — they may or may not cross that
   line. Flag for a visual check once built rather than assuming either way.
4. **The "Verified Reference Letter (PDF)" link label asserts a file format that hasn't been
   confirmed.** The letters live at `/letters/` as pages per the current source of truth; whether
   any are also downloadable PDFs isn't established here. Don't promise a file type the build
   doesn't actually deliver.

None of this is a case of Gemini being unhelpful — the underlying instincts (answer the ACV
question, cut summary redundancy, use plain category labels) are sound. The specific execution in
each case just needs to route through what's actually sourced and already specified rather than
around it.

---

## Part 3 — Design and styling recommendations to stand out

### Where both reviews already agree, and why that's a useful signal

Gemini's Part 2 (dual-weight type hierarchy, hairline-grid cells instead of boxed cards, tabular
numerals on the stat strip, terracotta reserved for figures/eyebrows/the one CTA, a static
non-marquee logo grid) converges almost exactly with the ten attributes already adopted in
`08-visual-direction.md`. Two independent reviews reaching the same visual language from different
starting points is a good sign the fundamentals are right — it's not a reason to add more on top of
them, since the explicit design instruction on this project is "measured, restraint everywhere," and
the page is already close to that ceiling.

The one place I'd push back on the converged view: Gemini's proposed background alternation between
two warm tones across every section boundary is a bigger move than anything else already approved,
and it works against the "one oversized moment, restraint everywhere else" discipline Brad
specifically chose over the bolder alternative. Seven alternating bands reads as more segmented and
busier than the current single-ground page. If a boundary needs marking, a hairline rule (which the
palette already has) does that job without adding a second visual system to track.

### New ideas aimed specifically at "stand out" and "get an engaged reply"

These go beyond what either review proposed. Each is flagged for how much it costs against the
"measured" discipline, since that's the actual constraint that has to be respected, not just an
aesthetic preference.

**1. A single quiet growth line, not a chart.** Brad's core evidence — 2,800 to 24,500 licensed
users over ten years — is currently a static number pair in the stat strip. A one-line hairline
sparkline behind or beside that figure (a thin rising stroke, no axis, no gridlines, sized to sit
inside the existing stat cell) turns a number into a shape without adding a single word or
competing with the "one oversized moment" the hero already owns. This is the kind of detail that
signals a systems person built the page, which is the actual differentiator the hero risks losing
per the Q6 note above. *Risk: low — it's a decoration on an existing number, not a new claim.*

**2. Treat "kept the account" as a visual motif, not just a claim.** The single fact that
structurally sets Brad apart from a typical AM hire — direct invoicing rights, contract renewal
ownership — is currently stated only in prose. A small filled-vs-hollow mark next to each career row
that was retained/renewed (a plain dot or short tick, not an icon set, using the existing accent
colour and nothing else) gives the reader something to scan for across all seven rows in the
two seconds a skim actually takes, and it's free to build inside the hairline-grid system already
adopted. *Risk: low, but needs a real, sourced basis for every mark — do not mark a row "retained" if
that isn't explicitly evidenced for that specific row.*

**3. A persistent, minimal contact action.** Once the reader has scrolled past the hero's primary
CTA, nothing currently keeps "start a conversation" within one tap. A single small pill in the
corner of the viewport, matching the existing pill visual language, that appears after the hero and
disappears once the contact section is in view, removes friction at the exact moment a convinced
reader decides to act — which is the entire point of a positioning site. This is a mechanical
conversion fix, not new copy or new visual weight; it reuses an existing component. *Risk: low if
restrained — one small pill, same accent, no animation beyond a simple fade.*

**4. A clean, forward-friendly view.** Hiring decisions are rarely made by one person reading one
page — a recruiter who likes the page often forwards a link or a screenshot to a hiring manager or a
panel. A dedicated print stylesheet that renders the homepage as a tidy single/double-page document
(hides the sticky CTA, the tab/grid interaction collapses to plain stacked text, logo grid becomes a
simple wordmark list) costs no new copy and directly serves "get an engaged role offer" by making
the page survive being forwarded outside a browser. *Risk: none — this is a CSS media query, not a
design change to the page itself.*

**5. Hold the line on restraint for anything animated.** Counting-up numbers, scroll-triggered
reveals, and hover-parallax on the portrait are the standard playbook for "SaaS landing page trying
to look premium," and Brad has already explicitly rejected that register once (the accordion, the
marquee, the dashboard/command-centre language are all in the "explicitly rejected" list). I'd
extend that same rejection to motion for its own sake. The one place I'd allow a deliberate,
single motion cue is the persistent CTA's appearance (item 3) — a one-time fade, not a repeating
animation — because it's functional, not decorative.

### Things not to add

Two ideas that come up often in "make it stand out" briefs but would work against what's already
decided here: a testimonial carousel (references are meant to be still, read-once proof, not a
rotating widget — and a carousel actively hides content the same way the rejected tab pattern does),
and a chatbot or interactive Q&A widget (adds a second voice to a page whose entire brief is "first
person, never second person, never an advertisement register" — a bot answering on Brad's behalf is
the opposite of that).

---

## Part 4 — Combined priority list

In order of confidence, combining both reviews and this stress-test:

1. Cut the MySimpleSiteMan paragraph. (Both reviews agree; highest-confidence cut.)
2. Move testimonials to stop 5, keep the case-study/reference name-echo mechanism, and check
   whether the Andrew Bergh pair has the same deliberate echo as the Adrian Pilgrim pair.
3. Untab the capability grid; write all four cards at the floor of their character bands rather
   than the ceiling, to control the added visible-reading load.
4. De-duplicate the five-campus story across the stat strip, capability card 1, and case study 1 —
   full narrative lives once, at the case study.
5. Answer the "did he own the number" gap with the existing direct-invoicing fact, not an invented
   ACV figure.
6. Resolve the logo-strip fork (cut vs. segment) with Brad directly — flagged, not decided here.
7. Raise the hero-scope-dilution tension with Brad before locking the single-claim hero rewrite —
   flagged, not decided here.
8. Ship the low-risk design additions (sparkline on the growth figure, retained-account tick marks,
   persistent contact pill, print stylesheet) alongside the copy work, since none of them cost new
   words or new visual registers.

---

## Sources referenced in this document

- `perplexity-copy-brief.md` (uploaded to this project) — voice rules, hard constraints, character
  budgets.
- `COPY-SOURCE-OF-TRUTH-2.md` (uploaded to this project) — approved copy, evidence register, career
  entries, reference quotes.
- `homepage-review-paste-4.md` (uploaded to this project) — the live Astro source, the blueprint's
  seven-stop argument, and the six review questions this document stress-tests.
- `Homepage-Journey-Blueprint-3.pdf` (uploaded to this project) — the full nine-page blueprint.
- `08-visual-direction.md` (uploaded to this project) — the ten adopted visual attributes, the
  widow/line-break fixes, and the two items still marked Open (hero/capability wording, logo strip).
- `Gemini-homepage_review_and_design_recommendations.md` (uploaded to this project) — the second AI
  review this document cross-checks against.
