Model: inherit from the session.

# Status

Task closed 26 August 2026: land the approved open work and place the How I work copy.

The constellation / node map (PR #6) was dumped and the PR closed. The remaining approved work is
on `cursor/land-approved-work-56c6`:

1. Cloud Agent environment config and Cloudflare-only README correction (from PR #1).
2. CV and homepage entry points to `/week/` (from PR #5).
3. Combined week stack: graphic filter menus, earth palette, click-outside dismiss, **Show the
   full week**, bound card fills, and the plus / Open key (PR #3 base + PR #4 unique commit).
   PRs #2, #3 and #4 are superseded — do not merge them separately.
4. How I work mandate and operate block placed in `src/pages/index.astro`. Manifesto banked as
   Rejected in `COPY/section-headings/section-headings.md`.

# Next task

No open implementation task from this round. Natural next steps if Brad wants them:

- Review the live How I work block. The inferred sentence (“I name a price that will not hold…”)
  is the only optional cut, and only after seeing it on the page.
- Merge this branch once the browser pass is accepted.
- Delete the dumped node-map branch `cursor/edtech-node-map-fb3a` if it is still on the remote.

Do not reopen the manifesto. Do not put nodes back on `/week/`. Do not edit the hero.

# Files to read first

1. This file.
2. `src/pages/index.astro` — How I work header.
3. `COPY/section-headings/section-headings.md` — How I work section.
4. `src/pages/week.astro` / `src/styles/week.css` — combined week stack.
5. `src/pages/cv.astro` — General Manager `pageLink` pill.

Next: start a new session only after Brad has reviewed the homepage How I work block and `/week/`
against this branch, either to cut the inferred sentence or to merge.
