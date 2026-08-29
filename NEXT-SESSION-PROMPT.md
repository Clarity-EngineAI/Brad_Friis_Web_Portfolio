# Next session: decide the pillar-key dots, optionally fix the open-menu fill bug

**Model: Sonnet.** Both items are small, bounded CSS/copy decisions. Neither needs Opus.

---

## Status

Direction B ("one sienna, three densities") shipped on `/week` in commit `d700e01`,
30 August 2026. Twelve category hues and three pillar hues are gone; colour is now three
densities of the site `--accent` (`#9c3d1e`), split into rule/border values
(`--p-growth`/`--p-delivery`/`--p-operations`) and separate text-safe values
(`--p-growth-text`/`--p-delivery-text`/`--p-operations-text`) so small type never sits on
a sub-4.5:1 tint. Filter pills fill solid `--accent` with white text when selected, matching
the CTA treatment elsewhere. Build is clean, mobile checked at 390px with device emulation,
and a script-based sweep confirmed no text anywhere resolves to the two non-text-safe rule
colours (`#c58a6f`, `#e0c9bd`).

Two things came out of that session that were explicitly left for Brad or left unfixed.
Nothing else about the colour system is open.

---

## Item 1: the pillar-key dots (Brad's call, not yours)

After repointing every category colour to its pillar, the "three pillars" key at the bottom
of `/week` now shows four identical dots per pillar group (`src/pages/week.astro`, the
`.pillar-key` block, currently around lines 166 to 205). All four `Growth` dots are the same
sienna, all four `Delivery` dots the same mid-tint, all four `Operations` dots the same pale
tint. A key that lists four categories against one repeated dot is arguably no longer a key.

Ask Brad directly: keep the dots as they are (now purely decorative, not encoding anything),
drop them and let the four category names run as plain text under each pillar heading, or
remove the category list entirely and leave just the three pillar descriptions. Do not choose
for him and do not build a variant speculatively before he answers. Whichever he picks is a
small edit to `.pillar-cats` and its `<li>` markup in `week.astro` plus its rule in
`src/styles/week.css` (search `pillar-cats`).

---

## Item 2: pre-existing cascade bug in the filter trigger (found, not fixed)

Not caused by the Direction B work, and not touched this session. While verifying the
selected-pill fill in a browser, opening a pillar's dropdown with all four categories
checked showed the trigger button falling back to the pale pillar-wash background instead
of staying solid `--accent` with white text. Closing the dropdown restores the correct
accent fill immediately.

Cause: in `src/styles/week.css`, `.week-menu-trigger[data-state='all']` (solid fill) and
`.week-menu-item.is-open .week-menu-trigger` (wash fill, for the open state) have equal
specificity, and the open-state rule is declared after the data-state rule, so source order
lets it win whenever both are true at once, i.e. exactly when someone opens a fully-selected
pillar's menu. Search `week-menu-trigger[data-state` and `is-open .week-menu-trigger` in
`week.css` to find both rules.

This is cosmetic (only visible while that one dropdown is open) and pre-dates this session,
so it was not fixed under the Direction B task's scope. Worth a five-minute fix next time
anyone is in this file: give the `[data-state='all']` rule higher priority when the item is
also open, e.g. add `.week-menu-item.is-open .week-menu-trigger[data-state='all']` as its own
rule after the open-state rule, restoring the solid accent fill in that combined state.

---

## Standing constraints (unchanged)

- NZ English throughout: colour, not color, in comments and copy.
- No em dashes anywhere. Commas, full stops or parentheses.
- No emojis in code, UI or documentation.
- One task per session. Item 1 needs Brad's answer before any code changes; get that answer
  first, implement it, then stop. Do not also fix Item 2 in the same session unless Brad asks
  for both.
- The working tree may again carry unrelated changes by the time this is picked up. Check
  `git status` and `git diff --stat` before assuming these two files are clean.
