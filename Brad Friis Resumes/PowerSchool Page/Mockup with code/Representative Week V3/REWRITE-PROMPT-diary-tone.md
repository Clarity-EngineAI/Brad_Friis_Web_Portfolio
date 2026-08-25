# Task: rewrite all card and dialog copy to diary tone

**Model: Sonnet.** Copy rewrite against a fixed voice spec and a fixed list of
banned constructions — no architecture, no design work.

## What's wrong with the current copy

`calendar-data.js` narrates every entry in the past tense, as if reporting on
work already finished:

- "Prepared the launch material for a new billable feature and planned how
  customers would hear about it." (`feature-launch-media`, summary)
- "Put together the case for a school board deciding whether to renew their
  contract." (`renewal-board-prep`, summary)
- "When a school's contract came up for renewal, the decision often sat with
  their board, and I prepared for that properly..." (`renewal-board-prep`,
  detail)

Brad's instruction: this should read like a real diary entry for the day —
what the entry point is, present tense, task-first. His example:

> "Prepared notes to present to the school board" → **"Prepare notes for
> school board presentation"**

## What to change

Three fields per entry, all thirty entries, in
`calendar-data.js`:

1. **`title`** — already close to noun-phrase form in most entries; check each
   one against the diary-entry test below and fix any that slide into past
   tense or gerund narration.
2. **`summary`** — the one-line card copy (shown under the title on the card,
   per the version Brad just approved). Rewrite every one from retrospective
   narration to a diary-entry line.
3. **`detail`** — the longer dialog paragraph shown when a card is clicked.
   Same tense shift, full rewrite, same length/depth as now (this is not a
   cut, it's a tense and voice change).

## The diary-entry test

Ask: would this be written in a diary or day planner *before or during* the
work, not after it? If a sentence explains what happened, why it mattered, or
how it turned out, it has drifted into retrospective narration and needs
rewriting as a present-tense task line.

- Wrong: "Went through every open opportunity and asked the same question:
  what is the next step, and is it real?"
- Right: "Go through every open opportunity — what's the next step, is it
  real?" (see em-dash rule below before finalising — this example needs a
  colon or semicolon instead)

- Wrong: "Stood in front of a school's board and made the case for another
  term."
- Right: "Present the renewal case to the school board."

Do not lose the specificity that makes these entries feel real (New Zealand
schools, the actual mechanics of the work) — only the tense and the
after-the-fact framing change.

## Hard rule: no em-dashes

Remove every em-dash (—) from `calendar-data.js`. There are 27 currently.
Rewrite around them — a colon, a semicolon, a period splitting two sentences,
or a comma, whichever fits. Do not replace with a hyphen-hyphen or spaced
hyphen as a substitute; restructure the sentence.

## Constraints carried over from the existing copy register

Read the file header comment in `calendar-data.js` (lines 1–46) and the copy
register note at line 13 before starting — it already documents Brad's
standing rules:

- First person, personable, plain.
- No epigram openers, no sales language, no figures.
- No named employer, customer, or school (NZ schools generically, fine —
  a specific named school is not).
- Write it the way Brad would tell a colleague what the work was — just now
  in present/imperative diary form rather than past-tense narration.

## What NOT to touch

- `id`, `day`, `slot`, `displayTime`, `category`, `alsoRanInto`, `connections`
  — structural fields, leave exactly as-is.
- Do not add, remove, or reorder entries.
- Do not touch `pillars` or `categories` metadata blocks.
- Do not touch any file other than `calendar-data.js` unless a title change
  is significant enough to affect card line-wrapping — if so, flag it, don't
  silently adjust CSS.

## Process

1. Read `calendar-data.js` in full first — there are connections between
   entries (`connections` arrays) whose link text elsewhere quotes titles;
   check nothing downstream references the exact old title string.
2. Rewrite all thirty entries' `title`, `summary`, `detail` in place.
3. Grep the finished file for `—` to confirm zero em-dashes remain.
4. Re-read the whole file once more for tense consistency — a mixed file
   (some entries fixed, others not) will look like an inconsistency bug, not
   a style choice.
5. Do not touch the live V3 card CSS/JS — this mockup already renders
   `summary` on the card at the sizes Brad approved. This task is content
   only.

## Files to read first, in order

1. `calendar-data.js` — the file being rewritten, read in full
2. `scope-summary.md` (in `Brad Friis Resumes/PowerSchool Page/`) — Brad's
   original dictated source notes, useful if a rewritten line needs to
   recover a fact that a past-tense sentence had folded in
3. Memory: `rep-week-page-rules`, `never-lead-with-years`

Next: start a new session (Sonnet) to run this prompt.
