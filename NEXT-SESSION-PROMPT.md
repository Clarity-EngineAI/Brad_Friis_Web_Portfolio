# Next session: deploy the Studio, then decide how far the CMS goes

**Model: Opus.** Task A is mechanical and could run on Sonnet, but Task B is a
source-of-truth architecture decision with a standing convention pulling against it, and
Task C is schema design. Run the whole session on Opus rather than switching mid-way.

---

## Current status

The blog CMS is **built, wired and verified publishing end to end.** A webhook fired
unprompted on 19 August 2026 and the deploy went green. That part is done and is not the
subject of this session.

**What the CMS owns today:** blog posts only. Six fields — title, slug, standfirst
(`dek`), publication date, category, and a body built from three block types (heading,
paragraph, section break). Schema at `studio/schemas/post.ts` and
`studio/schemas/blockContent.ts`.

**What the CMS does not own:** every other word on the site. The homepage hero, the CV,
the contact panel, the letters and the logos are all hardcoded — inline in the `.astro`
pages, or in `src/data/*.ts`. See `memory/homepage-cv-copy-is-inline.md`.

**The one thing that is broken:** the Studio is local-only. There is no hosted URL.

### The Studio, precisely

- **Local URL:** `http://localhost:3333`, after `cd studio && npm run dev`.
- **Hosted URL, once deployed:** `https://bradfriis.sanity.studio` — the hostname
  `bradfriis` is already reserved in `studio/sanity.cli.ts:7` as `studioHost`.
- **Project:** `ao34shul`, dataset `production`. Same IDs in `studio/sanity.config.ts`
  and `src/lib/sanity.ts:5-6`.
- A previous `sanity deploy` **failed on a login 404** and has not been retried.

---

## Task A — deploy the Studio (do this first, roughly 10 minutes)

**Why it is first:** local-only means Brad cannot edit the blog from his phone, or from
any machine that is not this Mac. Every later task in this file assumes a Studio he can
actually reach. Do not design new schema for a CMS that only opens on one laptop.

```bash
cd "/Users/admin/Developer/Brad Personal Website/studio"
npx sanity login     # this is the step that 404'd last time
npm run deploy
```

**If the login 404 recurs**, do not spend the session fighting it. Record the exact error
and move to Task B — the schema work is independent of hosting. Options if it persists:
check whether the Sanity account email matches `getholdofbrad@gmail.com`, try
`npx sanity login --provider google`, or deploy the Studio to Netlify as a second site
from `studio/` (`sanity build` outputs to `studio/dist`).

**Verify it properly.** A green CLI message is not proof. Open
`https://bradfriis.sanity.studio` in a browser, log in, confirm the existing posts are
listed, and confirm an edit saves. Report what you actually saw.

---

## Task B — the decision, before any schema is written

**Do not write a single new schema field until this is settled with Brad.**

### The conflict, stated plainly

`COPY/` is the governed source of record for every line on this site. Each line carries a
status and an argument, and nothing rejected is ever deleted. That convention is load
bearing — it is what has kept the positioning coherent across a Framer build, a rewrite
and an Astro rebuild. See `memory/brad-site-copy-library.md`.

Putting homepage or CV copy into Sanity creates a **second place the same sentence
lives.** Brad edits the hero in the Studio at 9pm, `COPY/` still holds the old line, and
six weeks later a session reads `COPY/` as the record and reverts him. That failure mode
has already happened once in this project in a different form — see
`memory/decisions-recorded-not-shipped.md`, where "Completed" in a decision file did not
mean the words had reached the site.

The standing rule from `memory/sanity-owns-blog-bodies-only.md` is that **`COPY/` never
migrates into Sanity.** That rule was written when Sanity was blog-only. Extending the
CMS does not automatically overturn it, but it does force the question.

### The three options — present these, do not pick one

**Option 1 — Blog only. Stop here.**
The CMS stays as it is. All other copy stays inline, changed via a session against
`COPY/`.
*Cost:* Brad cannot fix a typo in his own hero without a coding session.
*Benefit:* one source of truth, permanently. Zero divergence risk.

**Option 2 — CMS owns the volatile, `COPY/` owns the argued.**
Sanity takes the fields that change often and carry no positioning argument: contact
details, the booking link, logos, letters/testimonials, page metadata. The hero, the
positioning lines and the CV narrative stay in `COPY/` and inline.
*Cost:* Brad has to remember which surface owns what. A boundary he cannot see is a
boundary he will cross.
*Benefit:* he gets self-service on the things he actually wants to change, and the
argued copy keeps its single record.
**This is the option to argue for unless Brad says otherwise** — it matches what the
CMS is for without dismantling the copy library.

**Option 3 — CMS owns everything, `COPY/` becomes the archive.**
Full migration. `COPY/` stops being the live record and becomes the history of how the
copy was arrived at.
*Cost:* large one-off migration, and it overturns a standing convention that has held
through three rebuilds. The statuses and arguments do not survive the move — a Sanity
field holds a sentence, not the case for the sentence.
*Benefit:* Brad edits every word himself, from anywhere.

### How to run this

Put the three options to Brad with the costs above. **Do not recommend Option 3 without
him raising it first.** If he picks Option 2, the boundary must be written down in
`design/` as a rule, not left implicit — otherwise it erodes.

---

## Task C — build the schema Brad picked

Only after Task B is answered. Sketches follow for Option 2, since that is the likely
pick. Adjust to whatever he actually chose.

### The pattern to follow

Read `studio/schemas/post.ts` before writing anything. It establishes conventions that
every new schema must match:

1. **Guardrails on every free-text field.** `checkGuardrails` from
   `studio/schemas/guardrails.ts`, applied via `.custom(checkGuardrails)`, plus
   `GUARDRAIL_NOTE` in the field `description`. This is the mechanism that stops the
   barred terms reaching production from a keyboard that bypasses review. **A new text
   field without a guardrail is a hole in that fence.**
2. **Descriptions written for Brad, not for a developer.** Look at the `slug` field's
   description — it explains the consequence ("breaks any existing link"), not the type.
3. **Constrain the shape at the schema, not in the renderer.** `blockContent.ts` models
   three discrete block types rather than Portable Text, deliberately, so it is
   impossible to author formatting the site's typography cannot express. Keep that
   principle: if the site cannot render it, the CMS must not offer it.
4. **Singletons need a structure customisation.** `sanity.config.ts` currently uses a
   default `structureTool()`. A "Site settings" document that should exist exactly once
   needs the structure builder configured so Brad cannot create a second one. This is the
   main new piece of Studio work.

### Likely documents for Option 2

- **`siteSettings`** (singleton) — contact email, booking link, the meta description,
  social links. Would replace parts of `src/data/contact.ts`.
- **`letter`** (collection) — the testimonials currently in `src/data/letters.ts`. These
  are third-party quotes, so guardrails matter especially: barred names could appear in a
  quotation.
- **`logo`** (collection) — currently `src/data/logos.ts`. Note this one needs images,
  which collides with a known constraint, below.

### The fetch layer

Follow `src/lib/sanity.ts` exactly. Two things in it are not optional:

- **An explicit `order()` clause in every GROQ query.** The comment at line 30 explains
  why — without it document order is arbitrary and the site silently features the wrong
  content.
- **A fallback to the existing `src/data/*.ts` file on fetch failure or empty result,
  announced on stderr.** A silent fallback hides a broken pipeline. Every new fetch
  function must do the same, which means the `src/data/*.ts` files stay in the repo as
  fallbacks even after the CMS owns the content.

---

## Hard constraints

These have each been enforced before and are not negotiable.

1. **`COPY/` does not migrate into Sanity** unless Brad explicitly chooses Option 3 in
   this session. Even then, `COPY/` is archived, never deleted.
2. **Never name the 2015–2025 education sector employer**, and never reference the
   dispute beyond "the role ended in September 2025". Settlement gag. See
   `memory/gct-never-named.md`.
3. **Deane Jessep, 95bFM and the Canwest sales figures are permanently unpublishable.**
   The first two are already enforced in `studio/schemas/guardrails.ts:11-20`; if new
   text fields are added, they must carry the same validation.
4. **Nothing may imply an AI product has shipped.** Clarity Engine is unregistered,
   Pikle is paused.
5. **Images are a trade, not a field.** Every image on the site is a local Astro import
   and goes through Astro's optimisation pipeline. A Sanity image field means leaving that
   pipeline for the Sanity CDN — different performance characteristics, different
   caching. See `memory/astro-assets-vs-sanity-cdn.md`. **Present it as a decision; do not
   silently add an image field.** This applies to the `logo` document above.
6. **Do not run `npm audit fix --force` in `studio/`.** It has broken the Sanity
   dependency tree before.
7. **Do not add a CSP** as part of this work.
8. **Brad chooses the copy.** Never swap a line in unasked.

---

## Read first, in this order

1. `studio/schemas/post.ts` — the schema conventions to match.
2. `studio/schemas/guardrails.ts` — the validation mechanism, and why it exists.
3. `src/lib/sanity.ts` — the fetch pattern, the ordering rule and the fallback rule.
4. `src/data/contact.ts` and `src/data/letters.ts` — the data most likely to move.
5. `design/09-blog-voice.md` §2 — the rules that survive into any CMS-authored copy.

---

## Also outstanding — do not start these

Each wants its own session.

- **Blog images via the Sanity asset store** (Opus) — blocked on constraint 5 above being
  decided.
- **The hero body copy rewrite** (Opus) — three options to be drafted against the
  positioning brief, with the homepage word budget already breached at roughly 860 words
  against a 250 cap. Brad picks; nothing gets applied unasked.
- **The Cal.com booking button** — verified working on the live site 19 August 2026
  (Brad confirmed by hand; Chrome DevTools MCP could not attach on this machine to
  automate the check). Hero wrap at 390px still worth a device-emulation pass if not
  already done — see `memory/mobile-viewport-check-needs-emulation.md`.
- **Brad's Cal.com profile bio** (Sonnet) — three options offered, none picked. Goes in
  Cal.com → Settings → Profile → About, not in site code.
- **The plastic-bags voice edit** (Opus) — twelve proposed changes sitting in
  `COPY/blog/plastic-bags.voice-edit.md`, awaiting Brad's ruling. The approved draft at
  `COPY/blog/plastic-bags.md` is untouched. Three factual gaps were raised as questions
  and not filled; the order book question is the one worth answering.

## Standing notes

- `LLM reviews/` at the repo root is a **live source** Brad uses, not clutter.
- The `memoir-voice-edit` skill now exists at `.claude/skills/memoir-voice-edit/SKILL.md`,
  with EDIT and CONSTRUCT modes. It edits; `design/09-blog-voice.md` §4 flags. Run the
  skill first, §4 as the publication gate.
