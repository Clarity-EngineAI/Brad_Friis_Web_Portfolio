# Next session — decide what to do with the uncommitted design/copy work

**Model:** Sonnet. Reviewing uncommitted copy/design changes with Brad needs judgement, not a
mechanical check.

**Task:** The Netlify deploy is fully closed out — nothing left to do there. The next open item is
deciding what happens to the uncommitted design-doc and copy-related files that were deliberately
left untouched during the deploy (listed below). This is not urgent and has no deadline; treat it
as "next thing to pick up," not "blocking."

---

## Deploy: done, confirmed live (18 August 2026)

`https://bradfriis.com` is live over HTTPS with a valid cert. Confirmed this session:

- `https://bradfriis.com/` → 200
- `https://www.bradfriis.com/` → 301, redirects to apex (correct — apex is canonical per
  `astro.config.mjs`)
- `/cv/`, `/blog/`, `/letters/` → all 200
- `https://bradfriis.com/robots.txt` → still serving the blanket disallow, gate intact

**The noindex gate is still active and correct.** `public/robots.txt` and the
`<meta name="robots" content="noindex, nofollow">` tag in `src/layouts/SiteLayout.astro` both stay
in place until Brad gives explicit sign-off that the copy is full and complete. Do not remove
either on a judgement call that the copy "looks done" — that call is his, not a future session's.

**Netlify site:** `brad-friis` (site ID `e8cdef6b-0d72-4133-acf5-f2af31df448f`) — GitHub-linked,
auto-deploys `main` on every push. This is the only site; a duplicate (`brad-friis-portfolio`) was
created by mistake earlier in the deploy session and has been deleted. If you ever see a reference
to `brad-friis-portfolio` in old logs or screenshots, it no longer exists — ignore it.

No further deploy verification is needed. Don't re-run the HTTPS checks above "just in case" —
they're confirmed, and repeating them adds nothing.

---

## What's next: uncommitted design/copy work

These files were flagged during the deploy session but deliberately left alone, because the task
was "deploy what exists," not "also fix these." They're all still sitting uncommitted/untracked as
of 18 August 2026:

1. **Uncommitted changes:** `design/00-current-direction.md`, `design/01-positioning-brief.md`.
2. **New untracked files:** `COPY/perplexity-copy-brief.md`, `COPY/section-headings/blog-section-name.md`,
   `design/11-copy-leverage-plan.md`, `design/review/`, `design/wireframes/`, `LLM reviews/`,
   `New approach images/`, plus some resume/logo asset changes under `Brad Friis Resumes/`.

None of these have been reviewed. Before doing anything with them:

- Read what's actually in the two modified design docs and the new copy-leverage/brief files —
  don't assume from filenames what they contain.
- Follow the standing rule: **Brad chooses the copy.** Present what's there and the cost/tradeoff
  of adopting it, let him pick — don't fold it into the site unasked. If any of it looks like a
  fully-worked copy package, verify its source and override intent before treating it as ready
  (a prior session got burned assuming a pasted copy block had already been vetted).
- If Brad wants any of it committed and shipped, that goes through a normal build → verify → deploy
  cycle — the `main` branch auto-deploys to production the moment something lands on it, so review
  before commit matters more now than it did pre-launch.

## Smaller housekeeping, no urgency

- **`.shots/cdp/**` browser-cache noise** is still committed to the repo and still dirty in working
  tree status. Worth a `.gitignore` entry and a cleanup commit at some point — flagged twice now,
  still not touched, still not blocking anything.
- **GitHub App repo access scope** — not verified whether Netlify's GitHub App was granted access to
  just `Brad_Friis_Web_Portfolio` or to all repos in `Clarity-EngineAI`. Worth a quick check in
  GitHub's App settings sometime, not urgent.

---

## Constraints that still apply

- Education employer is never named anywhere including images; the settlement gag covers the
  cancelled-contract wording.
- The Cursor restructure brief (hero option A/B, pill choice) is still unstarted and blocked on
  Brad's decision.
- Sanity CMS is still not installed. Scope is unchanged: Sanity owns blog bodies only, sales copy
  and the publish gate stay in `COPY/` permanently. Adding it later needs only two env vars and a
  build hook — no change to `output: "static"`. Not this session's job either.

---

## Files to read first, in this order

1. This file.
2. `design/00-current-direction.md` and `design/01-positioning-brief.md` — see what actually
   changed before deciding anything.
3. Whatever's in `design/11-copy-leverage-plan.md` and `COPY/perplexity-copy-brief.md`, since those
   are new and unreviewed.
