# Naming the blog section

**Opened:** Sunday 17 August 2026
**Status:** open — twelve options banked, none chosen, Perplexity prompt written and not yet run
**Governs:** the eyebrow pill above the homepage blog teaser, the `/blog/` page headline, the nav
label, and the "Read the blog" call to action. Four places, one name.

---

## 0. Why this file exists, and what it reverses

`COPY/README.md` records a decision from 15 August 2026:

> `blog/` "replaces the `field-notes/` folder predicted here, **because Brad calls it the blog**."

Brad reversed that on 17 August 2026, verbatim:

> "i want the blog to be a stronger focus - and not called 'blog' - perhaps 'field notes' or somehow
> I like the idea of suggesting the articles are musings or pondering 'from the trenches' type
> suggestion - not sure how to word it short and get that across."

The reversal is recorded here rather than by editing the README's history, per the rule that nothing
in `COPY/` is deleted when it loses a round. **The `COPY/blog/` folder name does not change** — it is
an internal path, not reader-facing copy, and renaming it would break `design/09-blog-voice.md`,
`COPY/blog/README.md` and the two banked posts for no reader benefit. Only the four reader-facing
labels are in scope.

---

## 1. What the name has to carry

From Brad, 17 August 2026:

> "I don't mind it being a little fun and for the site to have some 'realness' to it in the way I
> casually communicate - professional but not straight and vanilla - needs to reflect my personality
> a bit too - so the reader gets a sense of who I am as well as the mechanics of what I have done or
> bring to a role."

From `design/09-blog-voice.md` §1, Brad's ruling of 15 August 2026, which raises the bar rather than
lowering it:

> "want to push people to it to see my intellect and insights — this will help sell the broadness of
> my knowledge and help to generate the goal of seeing me as a thought leader."

And the constraint that follows from it, §1 verbatim: the same hiring reader reads the blog and the
career record **in the same visit**. "There is no audience separation to hide behind." A name that
is funny at the cost of looking unserious is paid for on the career record, not just here.

So the name must clear four bars at once:

1. **Practitioner, not commentator.** The reader should infer these are lessons from doing the work,
   not opinions about the industry.
2. **Personality, at professional strength.** Warm and human. Not zany, not a pun that needs a
   second read.
3. **Short.** It sits in an eyebrow pill and a nav label. Two words is the target, three is the
   ceiling.
4. **It must not compete with the heading beneath it.** See §3.

---

## 2. The twelve options

None of these is chosen. Brad chooses. Grouped by register.

### A. The literal "from the trenches" read

| # | Option | The argument for it | The cost |
|---|---|---|---|
| 1 | **From the Floor** | Sales floor and shop floor at once — both true of Brad's record. Says "earned, not observed" in three words. | Slightly ambiguous out of context; a reader may need the heading beneath to place it. |
| 2 | **Notes from the Floor** | Same, with the "musings" quality made explicit by "notes". | Four words. Long for a nav label. |
| 3 | **The Long Way Round** | Carries the "learned it by doing it wrong first" idea, which is the honest version of a thought-leadership claim. | Could read as self-deprecating about efficiency — a live risk for an account management hire. |
| 4 | **Ground Truth** | What actually happened, as against what the deck claimed. Crisp, confident, faintly technical. | Borrowed from ML/surveying jargon; some readers will hear the borrowing. |

### B. The "musings and pondering" read

| # | Option | The argument for it | The cost |
|---|---|---|---|
| 5 | **Field Notes** | Brad's own suggestion. Clean, credible, immediately understood. | The safe option. Sits on many consultant sites — closest of the twelve to generic. |
| 6 | **Working It Out** | Present tense, in progress, honest about thinking rather than pronouncing. | Mild; does little to signal the trade Brad works in. |
| 7 | **Thinking Aloud** | Directly names the "musing" quality Brad asked for. | Risks sounding unfinished to a hiring reader scanning for substance. |
| 8 | **Loose Threads** | The ideas not yet resolved. Invites a reader in rather than lecturing them. | Suggests incompleteness, which cuts against "thought leader". |

### C. Personality forward

| # | Option | The argument for it | The cost |
|---|---|---|---|
| 9 | **Beetroot & Other Lessons** | The homepage heading already jokes about a beetroot tin. This promotes the joke to the name. Most distinctive of the twelve — no other candidate's site has it. | Commits hard. Meaningless until the reader has read the post. If the beetroot post is ever retired, the name outlives its own joke. |
| 10 | **Things I Learned the Hard Way** | Plain-spoken, warm, unmistakably a person. | Five words — too long for a nav label without shortening elsewhere. Common phrasing. |
| 11 | **Shop Talk** | Trade conversation between people who do the work. Warm, unpretentious, two words, and it flatters the reader by treating them as a peer. | "Shop" may read retail-first to some readers, which undersells the SaaS end of the record. |
| 12 | **Nothing Went to Plan** | Highest personality. Honest about how the work actually goes. | Reads as a confession of failure to a reader scanning quickly. The riskiest option here for a hiring audience. |

---

## 3. The one structural finding

The homepage heading beneath this label is already doing personality work:

> "I write about the work, and occasionally about a beetroot tin." — `src/pages/index.astro:301`

**Two jokes stacked is one too many.** Either the name is plain and the heading is funny, or the name
is funny and the heading goes plain. Choosing option 9 without changing that heading would say
"beetroot" twice in fourteen words.

This is a placement finding, not a copy proposal. The heading is Brad's line and stays untouched
unless he decides otherwise.

---

## 4. The prompt to put to Perplexity

Run as-is. It asks for options, not a decision, and it carries the constraints above so the return
is usable rather than another round of generic candidates.

---

I need a name for the writing section of my personal website. I am not looking for a decision — I
want a range of options with the reasoning behind each, so I can choose.

**Who I am.** Thirty years in sales, account management, delivery, UI/UX and web strategy, across
SaaS and digital businesses. I am hiring-market-facing right now, targeting account management
roles — retention and growth of existing accounts rather than net-new hunting. The site is my
portfolio and my pitch.

**What the section is.** Essays I write myself, in my own voice, about what I have actually learned
doing the work. Not industry commentary, not listicles, not thought-leadership-by-numbers. One
piece is about a childhood cub scouts uniform; another is about plastic bags. They use ordinary
concrete things to get at ideas about business, people and how work really goes. The register is
closer to a good personal essay than to a corporate blog.

**Why the name matters.** The section is linked from my homepage above the fold, deliberately,
because I want readers to see how I think — that is part of what I am selling. The same hiring
manager who reads my career record reads this in the same visit. So the name has to sell substance,
not just charm.

**What I want the name to do.**
- Suggest musings, ponderings, notes — thinking in progress, not pronouncements from on high.
- Carry a "from the trenches" quality: lessons earned by doing the work, including getting it wrong.
- Show some personality. Professional but not vanilla. A reader should get a sense of who I am, not
  just what I have done.
- Be short: two words ideally, three at most. It has to fit a navigation label and a small pill of
  text above a heading.

**Hard constraints.**
- The word "Blog" is out — that is the problem I am solving.
- No pun that needs a second read to land.
- Nothing that implies these pieces are unfinished, low-effort, or unserious. I want to be read as
  someone with genuine insight.
- New Zealand English spelling.
- It must still read well to a conservative hiring manager at a large company. If a name only works
  for a startup audience, say so.

**What to give me.**

Fifteen to twenty options. For each one, give me:
1. The name.
2. One sentence on what it signals about me.
3. The strongest argument against it — the reader who would misread it, and how.

Then group them by register (plainest to boldest), and tell me which three you would shortlist and
why. Be direct about which ones are generic — if a name could sit on any consultant's website
without changing anything, say so plainly rather than being polite about it.

Finally: for your top pick, suggest what the one-line heading underneath it should do — should it
explain the name, or contrast with it? Do not write the heading, just tell me what job it should do.

---

## 5. What happens to the return

Options come back here, into §2, with their arguments — nothing is discarded. Brad chooses one.
Only then does the name go into the four reader-facing places listed at the top of this file, and
`COPY/README.md` gets a line recording that the 15 August "Brad calls it the blog" note has been
superseded.
