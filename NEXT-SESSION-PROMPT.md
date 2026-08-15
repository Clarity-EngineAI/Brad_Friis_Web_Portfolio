# Next session — record the Sanity decision, then the open copy calls

**Updated:** Saturday 15 August 2026
**Model:** **Sonnet.** The architecture call is made; what remains is recording it in two files and
clearing the copy items. No Opus needed unless item 4 turns into a copy cut.

---

## The Sanity ownership boundary — decided this session

**Sanity owns nothing yet. When it is installed, it owns the body of blog posts only.**

That is narrower than the "likely split" this file predicted last session, and narrower on purpose.
Nothing was installed, and nothing should be until the trigger in §3 below fires.

### The three-way split

| Layer | Owner | Why |
| --- | --- | --- |
| Sales surfaces — hero, career rows, capabilities, letters, nav, CV | **`COPY/` permanently** | Every line carries a status and an argument. That is what makes the copy defensible. |
| Blog **approval** — does this post publish, in this voice | **`COPY/blog/` permanently** | The §4 review gate and the overrule record. Not a storage function. |
| Blog **body text** — the words inside an approved post | **Sanity, eventually** | The only layer where Brad editing live costs nothing. |

### Why the predicted two-way split was wrong

The prediction was "Sanity owns blog posts, `COPY/` keeps every sales surface." The second half is
right. The first half contradicts `COPY/blog/README.md:9-11`, written 15 August:

> For every other folder in `COPY/`, an agent drafts and Brad chooses. **For the blog, Brad writes
> and §4 of the voice spec checks afterwards.**

Plus `COPY/blog/README.md:38-40`: nothing publishes until §4 runs, and overrules get recorded as
arguments-against.

**A CMS with a publish button removes that gate by construction.** The value in `COPY/blog/` is not
that it stores text — `src/data/blog.ts` already does that — it is that a post cannot reach the site
without passing a check and leaving a record. Handing publishing to Sanity does not move the gate,
it deletes it, and the deletion is invisible until the first post goes up unchecked.

### Why `COPY/` keeps every sales surface — not a close call

- `COPY/README.md:56-60` requires every entry to carry an argument **for and against**, and the
  status key requires rejected lines to survive. A CMS text field records the current value and
  nothing else. The first edit destroys the argument silently — no diff on a rejected line, no dated
  status change, no record of what was chosen over what.
- **The standing constraints are enforced by copy passing through a session that has them in
  context.** A live CMS field routes around every one of them. Brad would not violate them
  deliberately; he would retype a figure from memory, and `$70k annualised` is barred precisely
  because it is the natural thing to write.

### The trigger for installing Sanity — has not fired

Brad's stated need is *"I'll edit these posts there later."* Two posts, and the realistic edit is
fixing a word. That costs one string change in `src/data/blog.ts` today; Netlify rebuilds.

Sanity would add a schema, a Studio deploy, a client library, and — because the site is
`output: "static"` on Netlify — a rebuild-on-publish webhook that does not exist today.

**The trigger is Brad wanting to write a post start-to-finish without a session.** Editing a typo is
not that. **This is the one genuinely open question and it is Brad's:** does he want to write posts
unaided, or only edit existing ones? His wording reads like the second, in which case the answer is
no CMS at all for now.

### Constraint on any future install

`src/data/blog.ts:1-14` — the `BlogPost` and `BlogBlock` types — **is the boundary.** Sanity may
replace what fills the `posts` array. It may not change the shape, and it may not reach into the
three consuming pages.

Three consumers read that array: `src/pages/index.astro:12` (`posts.slice(0, 2)`),
`src/pages/blog/index.astro:4`, `src/pages/blog/[slug].astro:4`. Two assumptions live inside the
contract — **newest-first ordering** and **exactly two homepage rows**. Ordering is currently held by
a comment at `src/data/blog.ts:16` on a hand-maintained array. **A Sanity query does not inherit
that; it needs an explicit `order(date desc)`.** Without it the homepage silently shows the wrong two
posts — nothing breaks, nothing fails the build, the page is just wrong.

If Sanity's block format is not a clean map onto the `BlogBlock` union, that is a signal the
migration costs more than it looks, **not** a reason to loosen the types.

---

## Next up

**1. Mark the two stale Sanity references superseded. Sonnet, ten minutes.**
Both describe a Next.js + Sanity Studio build that no longer exists. Anyone reading them cold will
install against an abandoned architecture. **Mark superseded, do not edit the originals** — matches
how the Framer pivot was handled.
- `design/01-positioning-brief.md:334` — names "a Sanity `lens` reference on `role` and
  `achievement`, which the content model already anticipates." There is no content model.
- `design/04-stage-4-prompt.md:130-131` — "Next.js 15 App Router, Tailwind v4, Sanity Studio embedded
  at `/studio`, Vercel." The build is Astro, static, on Netlify.

**2. Record the decision in `COPY/blog/README.md`. Sonnet.**
Lines 53-55 hold "What Sanity owns" under **Not yet decided**. Move it out, record the three-way
split and the trigger, date it.

**3. The 250-word homepage cap. Brad's call, Opus only if it becomes a copy cut.**
~720 words against §7.1's 250. Either the cap moves to a number the built page can meet, or copy
comes out. Not resolved by forgetting the cap exists. `design/10-homepage-blog-link.md` §1.2, §6.1.

**4. The About Me Cubs paragraph — still Brad's call.** `design/09-blog-voice.md` §6. Both pages are
live and linked, so he can see the About Me paragraph's stated moral against the blog post that
refuses one, side by side.

**5. Two copy lines that go stale, flagged not changed.** `design/10-homepage-blog-link.md` §6.4-6.5.
- Homepage lead says **"Two of them are already up"** — wrong at post three.
- Blog index intro says **"Nothing here is a pitch"** — wrong the moment a web-strategy post lands.

**6. The homepage blog module placement — Brad's call, one-line move.**
It sits low on the page; he asked for above the fold. The nav link honours that for one word.
Argument in `design/10-homepage-blog-link.md` §3.2.

---

## Read first, in this order

1. This file's Sanity section above — the decision and the boundary constraint.
2. `COPY/blog/README.md` — status of both posts, and the gate at §"Before any post publishes".
3. `design/10-homepage-blog-link.md` §6 — the five open items.

---

## Standing constraints — unchanged

- **The education employer is never named in site output.**
- **The dispute that ended the 2015–2025 role is under a settlement gag.** Do not steer there.
- **Never publish Deane Jessep, 95bFM, or the Canwest Sales Figures.** MySimpleSiteMan is usable as
  **the one example of failing and being human — singular, not a pattern.**
- **No invented figures. Never combine, divide or compound two separately-given figures into a
  third.** 120 ÷ 70, $70k + $30k + $25k, 5 → 12, $70k annualised, the 60/40 reconciliation, and the
  bags story's "over 100 sales" are all barred by row.
- **The 400 per cent (Canwest sales) is dead and does not revive.** Not to be confused with the $400k
  MySimpleSiteMan figure — different row, different topic, both contain "400".
- **Nothing implying an AI product has shipped.** Bites hardest on row-three blog posts.
- **itslearning is lower case, always.**
- **Brad chooses the copy. Never swap a line in unasked.**
- **Ask every question as plain text, never AskUserQuestion.** Brad answers by voice/microphone
  dictation — expect mishearings and self-corrections, read charitably, quote verbatim, read any
  dictated figure back before locking it in.
- **Not publishable by default:** the achilles injury that ended 99 Corporation; the founder's
  personal issue pausing Pikle.

## Outstanding — Brad's call, unchanged

Confirm Andy Walker is AR Walker (D13); decide whether to ask Rick Hopkinson (D14); establish whether
Xchange still exists (D12). Three references incoming — Nieuwland, Naicker, Curda (D1, D16, D17); the
bars for each are written in the register before the documents arrive.

## Split out — do not spend a design session on these

| Task | Model |
| --- | --- |
| **D10** — fix contradiction 4.1: the site publishes the understated LinkedIn Visitor Guide figure when Brad ruled the CV's "over 30 per cent a year, three years running" is right | **Sonnet** |
| **D11 (re-run)** — verify the ten unshipped names before any goes live: Rembrandt Fine Arts, Heritage Hardware, NZ Law, NZCA, LexisNexis, Nielsen, Promax, Curda/Coast Design, Naicker, Martins. Harvey Norman and Nieuwland are already checked and live | **Sonnet** |
| **A fresh §4 pass over both blog posts** before they are considered final — the last session reasoned the small changes inline rather than re-running the full check. Both posts are short | **Sonnet** |

---

Next: start a new session (Sonnet) to mark the two stale Sanity references superseded and record the decision in COPY/blog/README.md.
