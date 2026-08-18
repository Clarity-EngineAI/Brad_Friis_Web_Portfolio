# Next session — finish the Sanity connection, then extend beyond the blog

**Model:** Sonnet for step 1 (following a written checklist, verifying a deploy). Opus for
step 2 (schema design across hero/career/capabilities, and a rewrite of two pages whose
copy is inline rather than in data files).

## Where things stand

Sanity is installed and the whole pipeline is built and committed. The blog reads from
Sanity with a verified fallback, and the Netlify build hook is live and tested. What
remains is three one-off steps that need Brad's Sanity login, which a session cannot do
for him.

Read `studio/README.md` first. It carries the full setup checklist, the guardrail rules,
and the reasoning behind the body model and the ordering. Most of what a next session
needs is in there rather than here.

## Step 1 — finish the connection (about 15 minutes, Sonnet)

Follow `studio/README.md` § "Setup — remaining one-off steps", in order:

1. `cd studio && npm install && npx sanity login && npx sanity deploy`
2. Import the two existing posts with `scripts/import-posts.mjs` and a write token.
3. Create the Sanity webhook pointing at the Netlify build hook (URL is in the README).
4. Verify end to end: edit a standfirst, Publish, watch the deploy, confirm on the site.

**Until step 4 passes, the CMS is not installed.** A CMS that silently does not publish is
worse than no CMS. Do not report this as done on the strength of the code being committed.

## Step 2 — extend past the blog (Opus)

Brad's decision, unchanged and not to be reopened: Sanity owns every editable string, not
just blog bodies. Blog-first was chosen as the staged route to that end state, not as the
destination.

**The obstacle found this session, which the previous handoff did not know about:** the
homepage and CV copy is not in `src/data/*.ts` at all. It is written inline in
`src/pages/index.astro` (417 lines) and `src/pages/cv.astro` (279 lines). Extending Sanity
to cover hero, career rows and capabilities is therefore a rewrite of both pages, not a
data migration. Budget accordingly — this is materially larger than the blog step was.

Suggested order, smallest genuine surface first:

- `src/data/letters.ts` — already list-shaped, 349 lines, closest analogue to the blog.
  Note its `LetterBlock` union has five kinds to the blog's three, and it carries
  `ImageMetadata` imports for scans, which Sanity cannot own without moving those images
  into Sanity's asset store. Decide that deliberately.
- `src/data/logos.ts` and `contact.ts` — same image-asset question, much smaller.
- Then the inline page copy, which is the real work.

## What Sanity does not own

`COPY/` is the argument record — every line with a status and a for/against case,
including rejected lines, which are never deleted. Sanity replaces the delivery layer, not
the reasoning layer. Do not migrate `COPY/` into Sanity and do not propose it.

## Repo state

- Branch `main`, clean, pushed. The two previously-unpushed commits went up this session.
- The untracked 99 Corporation folder is now gitignored — Brad's call, 19 August 2026.
  Raw `.ai`/`.psd` design sources stay local. Settled; stop raising it.
- Build: clean, 15 pages, `astro check` reports 0 errors.
- `src/pages/preview/hero-a.astro` and `hero-c.astro` still import the static post array
  directly. That is deliberate — they are design mockups, not live routes, and do not need
  live content.

## Still open

- **Mobile PDF panning (cosmetic, not a blocker).** The 99 Corporation brand guide dialog
  was verified at 390×844 with device emulation on 19 August 2026 — dialog goes full
  screen, no page overflow, close button and `src`-clear-on-close both work. The embedded
  PDF is wider than a phone screen, so Chrome's own viewer pans horizontally inside the
  iframe. Fix, if Brad wants one, is an "open in new tab" fallback on small screens, not a
  CSS change. Check breakpoints with **device emulation**, never `resize_page`, which has
  given a false 390px overflow reading on this site before.
