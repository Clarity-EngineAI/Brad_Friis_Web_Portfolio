# Next session

**Model:** Opus for step 1 (the scoring model and the ceiling values are the product, and the
first attempt at them was measurably wrong). Sonnet for steps 2 to 4 once the model is signed off.

## Start here

Read the approved plan at `/Users/admin/.claude/plans/which-on-my-website-encapsulated-eagle.md`
in full before touching anything. It is long, and the length is load-bearing: the maths section
records a failure that was found by enumeration and the fix that was verified the same way.

**Then get Brad's sign-off on the eight ceiling values in §1 before writing a line of code.** They
are the numbers a hiring manager will argue with, and they need to be numbers Brad would defend
out loud in an interview. Note that `demand` moved 0.65 to 0.60 and `new-logo-hunting` 0.30 to
0.25 during tuning; both are defensible against the evidence but they are his call, not the
model's.

## What this is

A new page at `/fit/`. A hiring manager answers eight questions about the problems their own
account base has right now, and gets a report scoring how well Brad's evidenced capabilities
overlap their stated situation, including where they do not, plus what Brad would need from them
in the first ninety days. It flips the script: they self-diagnose rather than being pitched at.

Static deterministic scoring in vanilla JS. No backend, no API, no LLM at runtime. Everything
authored at build time from `COPY/interviews/_claims-register.md` so it can be audited against the
barred-claims list before it ships.

## Where things stand

Planning only. No code written, no files created or modified. The plan has been through one
adversarial review that found a fatal flaw, and the flaw and its fix have both been verified by
enumerating all possible answer paths.

**What the review found, and why it matters for how you approach this:** the first version of the
scoring model was a flatterer. Enumerated across all 40,000 reachable paths it produced a mean of
80.1, a median of 81, and 97.7% of paths scoring 65 or above. Five paths in forty thousand
returned "Weak". Two of eight questions had no route to a low score at all, breaking the plan's
own stated authoring rule. The worked example that supposedly proved the model could say no was
computed from a demand vector the questions cannot produce.

The corrected model was enumerated the same way: min 20, max 96, median 70, 31.4% of paths below
Substantial. The retention-led manager scores 95; the outbound-team manager scores 21.

**The lesson to carry in:** on this feature, do not trust a scoring model that has not been
enumerated. The plan makes that a build test for exactly this reason.

## Decisions already taken with Brad (do not re-open)

- Static scoring, not an API call. Auditable, offline, deterministic.
- Gaps shown explicitly, under a heading separate from the standing limitations.
- Band word plus a number rounded to the nearest 5, not traffic lights. 65 and 95 must not read
  as the same thing.
- Ceilings are fixed and cannot be raised by answers.
- The full score distribution is published on the page. This is the single strongest thing on it.
- `/fit/` is an explicit exemption to the no-second-person voice rule, recorded in `PRODUCT.md`
  and `AGENTS.md` in the same commit as the page.
- The share URL is the primary save artefact; `?print=1` renders the print layout on screen.
- In for v1: reverse mode, one-click evidence links to the letter scans, Q5 replaced with "how is
  this role measured".
- Out of v1: nav restructure, `?v=1` versioning, per-question note accordions, noscript question
  dump, SVG hatch patterns.

## The exact next task

Steps 1 to 4 of the plan's build sequence, in order:

1. `src/data/fitDiagnostic.ts` — dimensions with ceilings, review dates and claims-register
   sources; questions with demand vectors; bands; standing gaps; `needsFromYou`; a pure exported
   `scoreFit()`.
2. The two build checks in `scripts/`, written before the page so neither is optional: the
   enumeration test (fails if the median rises above 74, if the sub-65 share drops below 25%, or
   if any question loses its low-ceiling route) and the barred-string check. Re-run the
   enumeration and confirm it reproduces min 20 / max 96 / median 70 / 31.4% below Substantial.
3. `src/data/fitEvidence.ts` — evidence, concessions and letter links, audited line by line
   against the claims register.
4. `PRODUCT.md` and `AGENTS.md` — record the voice exemption.

The page itself is the session after.

## Files to read first, in order

1. `/Users/admin/.claude/plans/which-on-my-website-encapsulated-eagle.md` — the plan
2. `COPY/interviews/_claims-register.md` — the authority for every evidence string and every
   ceiling. Row-level provenance and per-row publishability flags.
3. `COPY/brad-verified-claims-transcript.md` — the pre-cleaned version, with the hard constraints
   and the barred list at the end
4. `src/pages/week.astro` — the state/commit/URL idiom the fit page must mirror
5. `src/data/letters.ts` — the seven letters, for the one-click evidence links
6. `AGENTS.md` and `PRODUCT.md` — the voice rule being exempted, and the verifiability principle
   the evidence links exist to honour

## Not blocked on anything

Except Brad's sign-off on the ceilings, which is step zero.

---

# Closed: blog diagram image

Resolved 28 August 2026. Brad's call: keep v3, revisit only if it proves ineffective in place.
Committed in `feat(blog): ship the flat-background diagram, stop chasing the accent`.
Do not reopen this to chase the accent colour.

**What shipped.** The v3 generation of `agentic-ecommerce-intent-model`. Flat off-white ground,
six crisp correctly spelled labels ("behaviour", NZ English), and the closed-chain against
branching-chain contrast reads clearly.

**Defects accepted knowingly**, all visible in the shipped file:

- the accent renders orange (about `#e2673a`) rather than the site's `#9c3d1e`
- the lower row fans to two output shapes, not the four the prompt asks for
- "Predetermined experience" is labelled inside its box while the other five sit below
- the two rows do not share a column grid

**What was learned, so it is not re-derived.** Six generations across four sessions, about
USD 1.02. They sort by ONE variable, prompt length, specifically the label-typography block:

- terse label instruction (v1, v3): flat background, clean glyphs
- expanded typography paragraph (v2, v4 x2, v5 x2, ~698-word prompts): olive gradient, glow
  haloes, garbled glyphs

The earlier adjective-bleed theory (accent adjectives capturing the background) was tested
directly in v5 with a three-word accent clause and the strongest background clause of any
attempt. Both samples still failed. It is falsified, not merely unproven.

Likely mechanism: the typography paragraph asks for "crisp", "professionally typeset", "small UI
element", "layout grid". That is screenshot vocabulary, so the model answers with rendering
effects. Asking harder for crisp type makes the type worse. The label paragraph has been pruned
back in `scripts/blog-image-theme.mjs`, with a comment saying not to re-expand it.

Garbled text is downstream of the background, never a separate bug. Judge the background first
and discard the run if it is not flat.

**If a future image genuinely needs the brand accent:** recolour the PNG after generation, or
draw it as SVG. Do not prompt for it.

# Also noted, for later sessions

1. **The CV print output needs a major polish.** Currently poor: it fights a two-page budget at
   9pt, hides its own visual identity (the eyebrow pill is `display: none`), inherits a screen
   layout, and does not print link URLs. Own session. Brad raised this directly on 28 August.
2. **Nav restructure.** Fold CV, Letters and EdTech behind an "Evidence" dropdown, freeing a slot
   for Fit. `global.css:2185` records that five items plus the wordmark already do not fit at
   362px, so a seventh is not viable. Requires extracting `NavMenu.astro` from week.astro's menu.
3. **"I don't know" skips on Q2 and Q3** of the fit diagnostic, for recruiters answering on behalf
   of a client they do not know well. Also resurrects the floor rule. Requires re-running the
   enumeration.
4. **Two-page print polish for the fit report**, once `?print=1` has been used in anger.
