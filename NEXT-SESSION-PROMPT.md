# Next session — get Brad's read on the nav conflict, then work the smaller follow-ups

**Model:** Sonnet throughout. Everything left is a conversation with Brad plus scoped file
maintenance — nothing here needs Opus.

**Written:** 17 August 2026, after the hero-line discovery was confirmed already resolved and the
positioning-lines restatus was completed.

---

## Status — what's done, this session

**The hero-line question is resolved — it turned out to already be answered.** The previous handoff
expected this session to surface the discovery (that the live hero traces to
`COPY/resume-website-positioning-lines.md`, not to any scored option in `hero-lines.md`) and ask
Brad whether it changed his hero-writing timeline. Checking `COPY/hero-lines/hero-lines.md`'s
uncommitted working-tree diff showed **Brad had already ruled on this in a prior session**: he
confirmed the SaaS-industry-noun conflict knowingly and directed a further copy-package swap
(recorded in the file's own "Second metadata correction, 17 August 2026" section). Nothing here
required re-asking him. Fixed as part of this: the metadata correction's own line-number references
had drifted stale again (said `:129-130`/`:128`, actual is `:121-122`/`:120` after the
MySimpleSiteMan removal commit shifted the file) — corrected in `COPY/hero-lines/hero-lines.md`.
**This file has uncommitted changes** — not committed this session, per standing instruction not to
commit without being asked.

**`COPY/resume-website-positioning-lines.md` restatused and moved — the next priority item, done.**
Per Brad's 17 August ruling ("in the right direction but should not all start with 'I'"):
- Re-cut from 74 lines to 44, cutting near-duplicates and value-test failures. **Words are Brad's
  original phrasing throughout** — this pass cut and re-sequenced, it did not rewrite.
- Verified programmatically: no section has more than two lines sharing an opening word (the
  `perplexity-copy-brief.md` §3 rule). One section ("For a business owner") needed one line's opener
  changed to comply; fixed.
- Given a status (**Available**) and moved to a proper category folder:
  `COPY/positioning/positioning-lines.md`. New folder added to `COPY/README.md`'s structure table
  and origin note.
- The old loose file at `COPY/resume-website-positioning-lines.md` (repo root, untracked, never
  committed) is **deleted** — its content is fully preserved in the new file, including a marked
  historical section quoting verbatim the exact heading/support-statement pair that became the
  origin of the live hero line, so the provenance trail stays intact.
- `design/00-current-direction.md` updated: §7 item 2 marked done, the copy-tracking table points at
  the new location, the closing "Previous/Next" note updated.
- **Not yet presented to Brad as options to choose from** — the file is re-cut and restatused, but
  nobody has picked a line from it for any actual placement. That is a separate future decision, not
  implied by this cleanup.

**Working tree state:** `COPY/README.md`, `COPY/hero-lines/hero-lines.md`,
`design/00-current-direction.md` are modified but uncommitted. `COPY/positioning/` is new and
untracked. None of this session's work has been committed — ask Brad before committing, per the
standing rule, since a commit is a visible/durable action.

---

## The actual next task: the navigation conflict

`design/00-current-direction.md` §7 item 3, still open. `design/01b-navigation-tone-and-structure.md`
specifies a 4-route nav (`/record`, `/letters`, `/consulting`, `/field-notes`), dated 11 August. The
live site is `/`, `/cv`, `/letters`, `/blog`. Brad's answer when last asked: "not sure, flag it."

Bring him the two shapes side by side — what `01b` specifies vs what is actually live and built —
and ask directly which is current. **Don't build toward either without an answer.** This is a
decision only Brad can make; there's no default to fall back on here since the two shapes imply
different missing pages (`/consulting` and a dedicated `/record` vs neither).

---

## After that, in priority order (carried forward, still pending)

### Smaller follow-ups, lower priority
- Update `design/index.html`'s Framer-era stage links and status chips to reflect the archive moves
  from the 17 August consolidation (commit `f06710a`).
- Re-measure the actual current whole-page word count directly from the live site. Existing sources
  disagree by ~40% (`00-current-direction.md` §4 flags 847 vs 1,027). Take a fresh count and record
  it in `design/00-current-direction.md` §4.
- Check whether Rob Nieuwland's letter landed (expected within a week of 17 August) — affects the
  case-study-2 placeholder at `src/pages/index.astro:60-63`. Line numbers may have shifted; re-verify.
- Scope and clear (or commit) the untracked files still sitting around:
  `design/11-copy-leverage-plan.md`, `COPY/perplexity-copy-brief.md`,
  `COPY/blog/Naming the blog section.md`, `COPY/section-headings/blog-section-name.md`,
  `design/wireframes/`, `src/pages/preview/` (`hero-a.astro`, `hero-c.astro`). Nobody has scoped
  these into a task yet — ask Brad or read them first, don't sweep them into a commit blind.
- `.shots/cdp/**`, `Brad Friis Resumes/**`, `LLM reviews/`, `New approach images/` — tooling/asset
  clutter outside the site repo's actual content, not related to any copy or design task. Leave
  alone unless Brad raises it.

---

## Guardrails — still binding, don't re-litigate

- **The hero is Brad's to write, and he has been writing it.** Don't propose new hero copy — the
  file now correctly tracks what he's already done; the job is bookkeeping, not drafting.
- **The blog is Brad's to write.** `design/09-blog-voice.md`.
- **The 250-word cap**: narrowed 17 August to above-fold only (hero, stats, capabilities), and was
  last recorded as breached by ~70 words there with no cut authorised — re-check this figure if it
  becomes relevant, since the hero copy has changed twice since that count was taken.
- **"Brad chooses."** Propose, don't pick, on any live copy or design decision. The positioning-lines
  re-cut kept all surviving lines as raw material with no lines promoted to "recommended" — that
  framing was deliberate, not an oversight.
- **Nothing gets committed without being asked first.** This session's changes are sitting
  uncommitted; the next session should check with Brad before committing them alongside whatever
  else it produces.

---

**Next:** start a new session (Sonnet) to bring Brad the nav-route conflict as a two-shapes-side-by-
side question, then ask whether this session's uncommitted changes should be committed.
