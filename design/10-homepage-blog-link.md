# 10 — The homepage blog link

**Written:** Saturday 15 August 2026
**Resolves:** `design/09-blog-voice.md` §5, which named the problem and explicitly declined to solve
it — *"This is a design problem, not a copy problem, and it is not solved in this document."*
**Governs:** the homepage entry point to the blog, and nothing else. The posts themselves are
governed by `09-blog-voice.md`; this document never touches them.
**Binding on this document:** §7 and §7.1 of `design/01-positioning-brief.md`. §5 is explicit that
the link is homepage copy, so the homepage rules apply in full.

---

## 1. What was found before designing anything

Three findings changed the shape of the answer. All three were discovered by reading the build, not
the specs, and two of them contradict what §5 assumes.

### 1.1 The blog is already built, routed and live — and completely unreachable

`design/09-blog-voice.md` §5 reads as though the blog is a future thing being linked to. It is not.
The following already exist and work:

- `src/pages/blog/index.astro` — the index, with an intro and a row list
- `src/pages/blog/[slug].astro` — the post template, with prev/next paging
- `src/data/blog.ts` — both row-four posts, full bodies, ~1,800 words
- `src/components/BlogBody.astro` — the block renderer

**And nothing anywhere on the site links to any of it.** Not the header nav, not the footer, not the
homepage. `grep -rn "blog" src/layouts/ src/components/` returns exactly one hit, and it is a type
import. The header nav runs Work / Letters / CV / Contact. The footer runs CV / Letters / email /
phone / LinkedIn.

**This reframes the task.** §5 is written as a copy-and-placement question about one homepage
element. The actual state is that two approved posts are sitting behind a URL no reader can find.
The homepage link is the headline fix, but it is not the whole fix — see §5 below.

### 1.2 The 250-word homepage cap is already breached, roughly threefold

§7.1 caps the homepage at **under 250 words**. Measured, 15 August 2026:

| Source | Words |
| --- | ---: |
| Markup of `src/pages/index.astro` (headings, leads, links, notes) | ~247 |
| Inline frontmatter data in the same file (capabilities, work cells, career rows, stats, aside) | ~476 |
| **Total reader-visible homepage copy** | **~720** |

The markup alone consumes the entire budget before a single capability panel or career row renders.

**Why this is stated rather than quietly ignored.** The honest reading is that the cap was written
at Stage 1 for a much shorter page than the one that got built, and the page outgrew it during
Stages 2–8 without anyone reconciling the two. That is a legitimate thing to have happened. What is
not legitimate is designing a new element, noticing the cap, and saying nothing.

**The consequence for this design:** the blog link cannot be argued for on the grounds that it is
"only a few words". That argument is unavailable — the budget is gone. It has to earn its place on
its own merits, and it should cost as close to nothing as a section can cost. **This is the single
strongest argument for the recommendation in §3.**

**Not resolved here, and it is Brad's call:** whether the cap moves to a realistic number or copy
comes out of the homepage. Flagged in §6.

> **Resolved in part, 17 August 2026.** Brad narrowed the cap's scope rather than its number: 250
> now governs the above-fold block only — hero, stats and capabilities — and everything below is
> uncapped. See `design/01-positioning-brief.md` §7.1. The measurement above stays on the record as
> the whole-page figure, but it is no longer the number being enforced. **No copy was cut**; the
> above-fold block is still ~70 words over its own budget, and whether the whole-page weight is
> acceptable was deferred, not decided.

### 1.3 The existing mock is a different page, not a homepage section

`COPY/Blog-Insights-Shared-Wisdom.png` — the artefact §5 says to reconcile against — is a **full
blog index page**, not a homepage module. It runs a `Blog` eyebrow pill, a *What I Share* display
heading, a two-line intro, a pull quote, and a four-row list with a thumbnail and date per row.

What it is worth keeping:

- **The two-column split** — a held left column against a scrolling right-hand list. That is a real
  structural idea and §3 uses a compressed version of it.
- **The row list with a date** — already how `/letters/` and `/blog/` work on this site.

What it must not carry across:

- **"What I Share"** and the intro *"Here you can read my news, business insights, and other
  experiences."* Both fail §7.1's information test — a reader knows nothing afterwards they did not
  know before. §5 names this class of label directly.
- **The pull quote** — *"It's incredibly important to share knowledge with those who have chosen the
  same path as you."* This is a self-adjective in quote clothing and a platitude on its own terms.
  §7's *let the customers do the praising* and §2.1's ban on universal claims both bite.
- **The stock thumbnails.** A CBS camera crew, a sports car, a perfume splash. The posts they would
  sit against are about a beetroot tin and a box of freezer bags. Decorative imagery with no relation
  to the content is exactly §7.1's *decoration* ban.
- **US date format** — `Oct 12, 2025`. NZ English, `12 October 2025`.

**Ruling: the mock is reconciled with and largely rejected.** Its two-column instinct survives; its
copy, its imagery and its date format do not.

---

## 2. What the link has to do, and the test it must pass

Brad's stated reason for wanting it, 15 August 2026:

> "want to push people to it to see my intellect and insights — this will help sell the broadness of
> my knowledge and help to generate the goal of seeing me as a thought leader."

Two jobs, and they pull in different directions:

1. **Sell range** — the blog spans four categories, and range is the stated point.
2. **Get the click** — a link nobody clicks sells nothing.

And one constraint from §1.2: **it must be cheap in words.**

The test any candidate has to pass is §7.1's, applied to the module as a whole: **what does the
reader know afterwards that they did not know before?** A label class — *Read my blog*, *Insights*,
*Thoughts*, *What I Share* — teaches nothing and fails on its own terms. §5 already rules on that
and this document does not reopen it.

**The second test, and it is the one that actually separates the candidates:** the homepage reader is
the hiring manager of §2.1 with forty seconds. Does the module cost them time they were spending on
the retention argument? A blog module that reads as a detour *before* the proof lands is a net loss,
however well written.

---

## 3. The three candidates from §5, evaluated

§5 named three, in ascending word cost. Each is evaluated against sell-range / get-the-click /
word-cost, and against the forty-second reader.

### Candidate A — a real post title, doing real work, updated as posts publish

One live post title as the link, refreshed when new posts go up.

- **Sells range:** poorly. One title is one category. With both current posts being row four, a
  single title advertises the blog as a childhood-anecdote collection, which is the narrowest
  possible reading of a four-category blog and the opposite of Brad's stated purpose.
- **Gets the click:** well. A real title with a real hook beats any label.
- **Word cost:** lowest — under 15.
- **Verdict:** rejected on the range failure alone, and it also carries a maintenance trap: it is
  the one candidate that goes stale silently, because a title hard-coded on the homepage and a post
  list in `src/data/blog.ts` drift the moment Brad publishes without editing the homepage.

### Candidate B — a title plus a one-line standfirst

As A, with the post's `dek` beneath it.

- **Sells range:** no better than A. Two lines about one post is still one category.
- **Gets the click:** best of the three. The dek is written to hook.
- **Word cost:** ~35 words.
- **Verdict:** rejected. It doubles A's word cost without fixing A's actual defect.

### Candidate C — a named topic list, the four rows as four words

*Web strategy · Communications · AI · The odd story* as a compact set, linking through to the index.

- **Sells range:** best of the three, and directly. Four named topics is the argument for breadth,
  made in four words rather than asserted in a sentence.
- **Gets the click:** weaker than A or B in isolation — a topic name has less pull than a title.
- **Word cost:** lowest of all, ~10 words for the list itself.
- **Verdict:** strongest on Brad's stated reason, weakest on pull. **Honest defect: two of the four
  categories have no posts yet.** Naming *Web strategy* and *AI* as topics when neither has a
  published post advertises rooms with nothing in them — and if a reader clicks through expecting
  the AI thinking and finds two childhood stories, the module has actively misled them. That is
  worse than a label.

### 3.1 The recommendation — C's structure carrying A's content, and neither alone

None of the three passes on its own. **A sells no range. C promises range that does not yet exist.**
The resolution is not to pick one but to note that they fail in opposite directions and combine
accordingly.

**Recommended: a two-column module — the range argument held on the left, the real posts listed on
the right.** This is the mock's surviving structural idea (§1.3), compressed to homepage scale.

- **The left column** carries the range claim, made the only way §7 permits — *concretely, and
  without adjectives.* It names what the blog covers, without asserting that Brad is insightful.
- **The right column** lists the **actual posts, generated from `src/data/blog.ts`.** Not a
  hard-coded title. This kills Candidate A's staleness trap outright: the homepage updates itself
  when Brad publishes, because it reads the same array the blog index reads.

**Why this beats each candidate.** It gets C's range argument and A's real-title pull. It never
promises a category that has no posts, because the right column shows only what exists. And it costs
about 25 words of new fixed copy, because the post titles and deks are already written and already
paid for in the data file — the module borrows copy rather than adding it, which is the only way to
add a section to a page that is already 3x over its budget.

**Word cost, counted honestly:** **35 words** of new homepage copy — measured after implementation,
not estimated (eyebrow, heading, lead, link label). The two post titles, categories, dates and deks
are existing strings from `src/data/blog.ts`, not new writing. Against a page already at ~720 words
this is a 5 per cent addition, which does not fix the breach in §1.2 and is not claimed to.

### 3.2 Placement — and this is the load-bearing decision

Brad asked for the link **above the fold**. `09-blog-voice.md` §1 records it: *"a link Brad has
asked to put above the fold."*

**Recommendation: put a text link in the header nav and in the hero, and the full module low on the
page, after the career section.** The reasoning, and it is the one place this document argues against
Brad's stated instruction:

The homepage has one job in the first forty seconds — the retention argument, per §2.1 of the
positioning brief. The hero states it, the stat band proves it, the letters corroborate it. A blog
module dropped above the fold interrupts that sequence with a detour *before the argument has
landed*. The reader who leaves to read a childhood story at second five never reads the stat band.
**That costs Brad the hire to win the click, which inverts his own priority** — he wants the blog
read *in addition to* being hired, not instead of it.

**But the instruction is honoured, and cheaply.** *Above the fold* is satisfied by a link, not a
section. Adding **Blog** to the header nav puts it above the fold on every page of the site, at a
cost of one word, and it is where readers look for a blog. That is a better read on the instruction
than a section, and it does not spend the forty seconds.

**If Brad wants the module itself above the fold after reading this, that is his call and it is a
one-line move.** The recommendation is recorded, not enforced. See §6.

---

## 4. The specified module

**Placement:** after the career section, before the contact panel. Band: `band-alt`, so it separates
from the career band above it.

**Structure**, reusing the site's existing vocabulary — `eyebrow-pill`, `section-head`, `row-list`,
`text-link`, `section-link` — with no new visual idiom introduced:

```text
[eyebrow pill]  Blog
[h2]            I write about the work, and occasionally about a beetroot tin.
[lead]          Web strategy, communications, AI, and the odd true story.
                Two of them are already up.

[row list, generated from src/data/blog.ts — most recent first, capped at two]
   The plastic bags        A story · 15 August 2026
   Eleven years old, a school fundraiser, and a lawns-based theory of who to knock on.

   The Cubs uniform        A story · 15 August 2026
   Seven years old, a beetroot tin, and a lesson about which way the asking runs.

[section link]  Read the blog →
```

**Copy notes, against §7:**

- **The heading** does the range job and the tone job at once. It names the serious categories and
  then undercuts itself with the tin — which is the one dry line per page §7 permits, and it is
  spent here rather than elsewhere. It is also true to what is actually published, which the
  four-topic list alone would not be.
- **"Two of them are already up"** is the honest disclosure that fixes Candidate C's defect. It
  tells the reader the blog is new without apologising for it, and it stops the AI and web-strategy
  names from reading as promises. **It is a sentence that needs review when the third post
  publishes** — see §6.
- **No adjectives about Brad.** No *insights*, no *thought leadership*, no *intellect*. The range is
  shown by naming the topics; the quality is shown by the posts. §7's *let the customers do the
  praising*, applied to the self-assessment case.
- **Banned-word check:** clean. No *journey*, *passionate*, *insights*-as-noun-label, *deep dive*,
  *thoughts*.
- **NZ English:** dates as *15 August 2026*, already correct in `src/data/blog.ts`.

**Behaviour:**

- **Capped at two rows.** The homepage is not the index. When post three publishes, the module shows
  the two most recent and the index carries the rest.
- **No thumbnails.** Per §1.3 — the posts have no images, and stock imagery is banned decoration.
- **No motion, no reveal, no carousel.** §7.1. The module is static and the rows are ordinary links.
- **Generated, never hard-coded.** The module imports `posts` from `src/data/blog.ts` and slices.
  Publishing a post updates the homepage with no homepage edit.

---

## 5. The rest of the fix — the blog is unreachable from everywhere, not just the homepage

Per §1.1. The homepage module alone leaves the blog invisible to a reader who lands on `/letters/`
or `/cv/`. Three additions, all one line each:

1. **Header nav** — add `Blog` between `Work` and `Letters`, with `aria-current` on `/blog` paths to
   match the existing pattern. **This is what satisfies Brad's above-the-fold instruction**, per
   §3.2.
2. **Footer** — add `Blog` alongside CV and Letters.
3. **Blog index intro** — currently *"Stories, published as written. Nothing here is a pitch."* That
   is accurate for two row-four posts and becomes wrong the moment a web-strategy post lands, since
   that post *is* adjacent to the pitch. Flagged, not changed — it is copy, and copy is Brad's.

---

## 6. Open — Brad's call, not resolved here

1. **The 250-word cap (§1.2).** The homepage is ~720 words against a 250 cap. Either the cap moves
   to a number the built page can meet, or copy comes out. **Not resolved here, and it should not be
   resolved by quietly forgetting the cap exists.**
2. **Module placement (§3.2).** The recommendation puts the nav link above the fold and the module
   low. Brad asked for the link above the fold; if he means the module, that is a one-line move and
   his call.
3. **The heading and lead.** Per the standing rule, copy is Brad's to choose. The §4 lines are a
   proposal with the argument attached, not a fait accompli. In particular *"I write about the work,
   and occasionally about a beetroot tin"* spends the page's one dry line — if Brad would rather
   spend it elsewhere, the heading changes.
4. **"Two of them are already up."** True on 15 August 2026, stale at post three. Either it is
   maintained, or it is cut once the blog has posts in more than one category.
5. **The blog index intro (§5.3).** Wrong as soon as a non-story post publishes.

---

## 7. Change log

| Date | Change |
| --- | --- |
| 15 August 2026 | Written. Resolves `09-blog-voice.md` §5. Found the blog already built and unlinked from the entire site (§1.1) and the homepage 3x over its word cap (§1.2). Rejected the existing mock's copy, imagery and date format while keeping its two-column structure (§1.3). Recommended a generated two-column module low on the page plus a nav link above the fold (§3.1, §3.2). |
| 15 August 2026 | **Implemented and verified.** `src/pages/index.astro` (module, generated from `posts.slice(0, 2)`), `src/layouts/SiteLayout.astro` (nav and footer links), `src/styles/global.css` (`.blog-teaser` block plus the 900px stack). Build clean at 13 pages; nav link renders on all four page types with `aria-current` correct; no horizontal overflow. **Module moved off `band-alt` to a plain `band` with a hairline top border** — it would otherwise have merged into one untinted block with the contact panel below it. Word cost measured at 35, correcting the ~25 estimate in §3.1. |
