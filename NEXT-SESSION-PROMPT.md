# Next session — smaller follow-ups, no open decisions blocking

**Model:** Sonnet throughout. Everything left is scoped file maintenance or a quick question —
nothing here needs Opus.

**Written:** 17 August 2026, after the "Field notes & stories" naming was shipped and the
navigation question was resolved.

---

## Status — what's done, this session

**Navigation — resolved, not a live conflict.** Brad ruled: the live site (`/`, `/cv`, `/letters`,
`/blog`) is current; `design/01b-navigation-tone-and-structure.md`'s 11 August spec (`/record`,
`/consulting`, `/field-notes`) is superseded and historical. No `/consulting` route is needed. Also
retired in the same pass: a dead `postMortemHref` field left on `cv.astro`'s role type after the
MySimpleSiteMan removal (nothing set it, nothing linked to it) — removed from the type and the
template.

**"Field notes & stories" naming — implemented, was the real finding of the session.**
`COPY/blog/Naming the blog section.md` §1.1 recorded Brad's 17 August choice of reader-facing name,
with its own §5 listing four places to update. It had sat unshipped for hours — the live site still
read "Blog" everywhere, and this file's previous version didn't mention it as outstanding. Fixed:

- Nav label, both instances (`src/layouts/SiteLayout.astro:42,55`)
- `/blog/` eyebrow pill and `<title>` (`src/pages/blog/index.astro`)
- `COPY/README.md` updated to mark the old "Brad calls it the blog" note superseded
- The decision file itself now records "Implemented 17 August 2026" alongside "Completed"
- Route and `COPY/blog/` folder name left untouched, per the spec
- No homepage CTA exists to update yet (no blog teaser currently on the homepage) — apply
  "Explore field notes & stories" if one gets added back

**Committed.** All of the above, plus the carried-forward positioning-lines restatus and
hero-lines/NEXT-SESSION-PROMPT bookkeeping from the prior session, are in commit `7a3a8aa`.
`npx astro build` and `npx astro check` both clean (0 errors, 0 warnings) after the edits.

**New standing lesson from this session:** a decision file saying "Completed" only means Brad ruled
— it doesn't mean the ruling reached the code. Check the live site directly, not just the decision
record, before telling Brad something is done. (Saved to memory as
`decisions-recorded-not-shipped`.)

---

## What's left, in priority order

### Smaller follow-ups
- ~~Update `design/index.html`'s Framer-era stage links and status chips~~ — **done.** Header now
  states the site is live/built and points to `00-current-direction.md` as the entry point. Stage
  chips re-labelled: 01 Current, 02 Superseded, 03 Decided (points to `08-visual-direction.md`), 06
  Archived (links repointed to `archive/06-hybrid-direction.*`), 04 Superseded/not produced (Stage 4
  was never made — the Astro build shipped straight from the Stage 3 recommendation). The stale
  "Waiting on Brad" table and "Closed since the last update" list were removed (domain, repo-privacy
  and consent items were already resolved elsewhere) and replaced with a pointer to
  `00-current-direction.md` §7/§10 for genuinely open items. Not yet committed — Brad hasn't been
  asked.
- Re-measure the actual current whole-page word count directly from the live site. Existing sources
  disagree by ~40% (`00-current-direction.md` §4 flags 847 vs 1,027). Take a fresh count and record
  it in `design/00-current-direction.md` §4.
- Check whether Rob Nieuwland's letter landed (expected within a week of 17 August) — affects the
  case-study-2 placeholder at `src/pages/index.astro:60-63`. Line numbers may have shifted; re-verify.
- Scope and clear (or commit) the untracked files still sitting around: `design/11-copy-leverage-plan.md`,
  `COPY/perplexity-copy-brief.md`, `COPY/section-headings/blog-section-name.md`, `design/wireframes/`,
  `src/pages/preview/` (`hero-a.astro`, `hero-c.astro`). Nobody has scoped these into a task yet —
  ask Brad or read them first, don't sweep them into a commit blind.
- `.shots/cdp/**`, `Brad Friis Resumes/**`, `LLM reviews/`, `New approach images/` — tooling/asset
  clutter outside the site repo's actual content, not related to any copy or design task. Leave
  alone unless Brad raises it.

---

## Guardrails — still binding, don't re-litigate

- **The hero is Brad's to write, and he has been writing it.** Don't propose new hero copy.
- **The blog is Brad's to write.** `design/09-blog-voice.md`.
- **The 250-word cap**: narrowed 17 August to above-fold only (hero, stats, capabilities), and was
  last recorded as breached by ~70 words there with no cut authorised — re-check this figure if it
  becomes relevant, since the hero copy has changed twice since that count was taken.
- **"Brad chooses."** Propose, don't pick, on any live copy or design decision.
- **Nothing gets committed without being asked first**, except when Brad has already said yes for
  the current session's changes, as he did this session.

---

**Next:** start a new session (Sonnet) to work the smaller follow-ups list above — none of them are
blocked, so pick whichever Brad wants to prioritise, or default to the `design/index.html` stage-chip
cleanup first since it's the most stale.
