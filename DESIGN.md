---
name: Brad Friis — Personal Website
description: An evidence-first commercial CV site — cool neutral paper, one burnt-sienna accent, hairline-bordered record cards instead of shadows.
colors:
  ground: "#fbfbfd"
  surface: "#ffffff"
  surface-alt: "#f5f5f7"
  paper: "#ffffff"
  recessed: "#f5f5f7"
  ink: "#1c1917"
  ink-secondary: "#565049"
  ink-tertiary: "#6e675f"
  line: "rgba(28, 25, 23, 0.1)"
  line-soft: "rgba(28, 25, 23, 0.06)"
  line-hover: "rgba(28, 25, 23, 0.24)"
  accent: "#9c3d1e"
  accent-strong: "#7f3018"
  accent-on-dark: "#e8935f"
  stat-ground: "#17140f"
typography:
  hero:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(2.5rem, 5.6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.1
  page-hero:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 2.875rem)"
    fontWeight: 700
  section:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)"
    fontWeight: 700
  title:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
  body:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
  label:
    fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "0.6875rem"
    letterSpacing: "0.06em"
rounded:
  inner-xs: "4px"
  inner-sm: "6px"
  sm: "10px"
  md: "12px"
  card: "14px"
  panel: "16px"
  shell: "18px"
  portrait: "22px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
  xl: "40px"
  xxl: "56px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-alt}"
  eyebrow-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  card-hairline:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
  status-chip:
    backgroundColor: "rgba(255, 255, 255, 0.92)"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
---

# Design System: Brad Friis — Personal Website

## Overview

**Creative North Star: "The Quiet Ledger"**

This site presents a commercial track record the way a well-kept ledger presents a decade of accounts: plainly, in order, with every figure traceable to its source. The palette is cool neutral paper and warm near-black ink — grounds and surfaces sit in a near-white Apple-system family (#fbfbfd → #ffffff → #f5f5f7) while the ink and the accent stay warm, so nothing competes with the one deliberate hue in the system: a single burnt-sienna accent, spent sparingly on links, the primary button, the eyebrow pill, and the rule beside a pull-quote. The grounds were a warm parchment family (#e6e4df / #f3f1ec / #ece9e2) until 27 August 2026, when they were taken to these values to match a reference prototype; the warm ink and sienna accent were deliberately kept, and that warm-on-cool tension is now the system's signature rather than an inconsistency to resolve. Structure carries the credibility, not embellishment — reference-letter quotes sit inside bordered cards a click away from their scanned source, and the signature `.hairline-grid` pattern (a shared 1px divider grid, refined over several documented iterations to fix optical-balance bugs) is the clearest expression of the whole system: cards that read as filed records, not marketing tiles.

There is effectively no shadow system. Depth is drawn from hairline borders (`--line`, `--line-soft`) and background-tone steps (`--ground` → `--surface` → `--paper` → `--recessed`), not elevation. The one true `box-shadow` in the codebase belongs to a genuine floating overlay (the portfolio embed dialog); everything else stays flat at rest. This is a considered constraint, not an oversight — a site making an evidence argument should not feel like it is trying to sell anything.

Typography runs on Inter, self-hosted via `@fontsource-variable/inter` and imported in `SiteLayout.astro` so it loads on every page. The `--sans` token stays declared as Inter-first because that is the intended type character (a clean, humanist grotesque suited to a ledger-like density of numbers and short labels).

**Key Characteristics:**
- Cool near-white grounds under warm near-black ink; one burnt-sienna accent used on well under 10% of any screen
- Flat by default — depth from hairline borders and tone steps, not shadows
- A single fixed content shell (1180px) and one explicit spacing ladder (4/6/8/10/12/14/16/18/22/26/28/40/48/56/72px) — nothing between these values
- Shared-divider bordered-card grids (`.hairline-grid`, `.row-list`) as the signature record-keeping motif
- A fully separate, self-contained dark palette scoped to `.band-invert` and the stat band, plus a hard-reset black/white print stylesheet for the CV — three coherent sub-systems, not one leaking into another

## Colors

A low-saturation neutral system in two temperatures — cool near-white grounds and surfaces, warm beige-brown inks — interrupted by exactly one true hue.

### Primary
- **Burnt Sienna** (`#9c3d1e`): the system's one accent. Link color, primary `.button` fill, eyebrow-pill and letter-pill text, focus-ring outline, the motion-track node dot, and the left rule beside every pull-quote (`.career-quote`, `.quote-cell blockquote`). Its rarity is deliberate — see the One Accent Rule below.
- **Burnt Sienna Deep** (`#7f3018`, `accent-strong`): hover/active state for the accent — link hover, button hover, and the large numeral color on `.career-year` / `.motion-year`.
- **Burnt Sienna Lifted** (`#e8935f`, `accent-on-dark`): a contrast-corrected accent variant used only for `.stat-figure` text on the near-black stat band. The base accent reads 2.4:1 there and fails contrast; this lifted variant clears 7:1. Never substitute the base accent on a dark ground — use this token instead.

### Neutral
- **Ground** (`#fbfbfd`): the outermost `<html>` background, visible only as a sliver behind `--surface`, and the base tone of the translucent sticky header (at 82% alpha).
- **Surface** (`#ffffff`): the default section/band background. Identical in value to `--paper` — see the Hairline Boundary Rule.
- **Surface Alt** (`#f5f5f7`): alternating band background (`.band-alt`) and the hover fill on secondary buttons. Carries the only visible tonal step in the light palette.
- **Paper** (`#ffffff`): card and panel fill — hairline-grid cells, row-list items, the contact panel, the letter transcription, the portfolio dialog.
- **Recessed** (`#f5f5f7`): sunken/inset fill for content nested inside a card — evidence blocks, the contact form, the letter context card — and the hover fill on calendar cards.
- **Ink** (`#1c1917`): primary heading and text color.
- **Ink Secondary** (`#565049`): the default body-copy color, set once on the `body` element.
- **Ink Tertiary** (`#6e675f`): muted meta text — captions, dates, labels, footer copy.
- **Stat Ground** (`#17140f`): the one true near-black, used solely for the homepage stat band.

### Named Rules
**The One Accent Rule.** Burnt Sienna is the only hue in the system. It appears on links, the primary button, pills, the focus ring, and pull-quote rules — never as a background fill larger than a pill or button, never doubled up with a second accent color. If a screen needs a second signal color, that is a sign the layout needs restructuring, not a second hue.

**The Tone-Step Rule.** Depth between nested surfaces is expressed as a step along `--ground → --surface → --paper → --recessed`, never as a shadow. A card sits on `--paper` inside a `--surface` band; content nested inside that card that needs to read as "inset" drops to `--recessed`. Never invent a fifth tone — reuse this ladder.

**The Hairline Boundary Rule.** *(Supersedes part of the Tone-Step Rule as of 27 August 2026.)* `--surface` and `--paper` are now the same value (`#ffffff`), so the middle step of the tone ladder carries no contrast: a white card on a white band is separated by its 1px `--line` hairline alone, not by tone. Every card, panel and container must therefore declare its own hairline border — a component that relied on the tone step to define its bounds will read as edgeless. When a surface looks unbounded, add the hairline; never darken the ground back to recreate the step. The ladder still holds at its ends (`--ground` behind, `--recessed` within), and `--surface-alt` remains the one visible band contrast.

## Typography

**Display/Body Font:** Inter (with `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` fallback)

**Character:** A clean, humanist grotesque intended to carry both large numerals (stat figures, career years) and dense small-label text (eyebrow pills, metadata) with equal confidence — legible at ledger-entry sizes, not just headline sizes.

Inter loads via the self-hosted `@fontsource-variable/inter` package, imported once in `SiteLayout.astro`. No external font request; no FOUC-prone `<link>` to a third-party CDN.

### Hierarchy
- **Hero** (700, `clamp(2.5rem, 5.6vw, 4.25rem)` / 40–68px, line-height 1.1): the homepage `<h1>` only.
- **Page Hero** (700, `clamp(2rem, 4.4vw, 2.875rem)` / 32–46px): interior page `<h1>`s (letters, CV, blog).
- **Section** (700, `clamp(1.75rem, 3.4vw, 2.5rem)` / 28–40px): `.section-head h2`.
- **Title** (700, 1.25rem / 20px): card and entry titles — capability-cell, work-cell, cv-entry, letter-row blockquote.
- **H3** (700, 1.375rem / 22px): sub-headings — transcription `h2`, motion-year, blog-post `h2`.
- **Lead** (400, 1.0625rem / 17px): lead paragraphs and `.tier-name`.
- **Body** (400, 0.9375rem / 15px, line-height 1.55): the default paragraph size, set once on `body`.
- **Nav** (400, 0.84375rem / 13.5px): nav links, letter-pill text.
- **Meta** (400, 0.78125rem / 12.5px): the most common secondary size — metadata, captions.
- **Eyebrow / Enum** (400, 0.6875rem / 11px, uppercase where used): eyebrow pills and enumeration labels (`.enum`, pager).

### Named Rules
**The Fluid-Above-Fixed Rule.** Only the four largest roles (hero, page-hero, section, hero-lead) use `clamp()`. Every role at Title size and below is a fixed rem value — fluid scaling is reserved for headline-scale type where viewport-driven scaling actually matters; small labels stay put so layouts stay predictable.

## Layout

A single fixed-width content shell with one explicit spacing ladder: **4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 26 · 28 · 40 · 48 · 56 · 72px** — nothing between these values, ever.

**Shell:** `.shell` is the only container: `width: min(1180px, calc(100% - 56px))`, centered. Max content width is 1180px, with a 28px minimum side margin (14px on mobile).

**Gutter:** the header and footer use a fluid `--gutter` (`max(28px, calc((100vw - 1180px) / 2))`) so they center against the 1180px shell on large screens while guaranteeing a 28px floor; this is hard-fixed to 14px at ≤640px.

**Section rhythm:** `.section` uses 72px vertical padding by default — the top of the spacing ladder — dropping to 48px at ≤640px. Bands alternate `--surface` / `--surface-alt` / `--band-invert` to create tonal rhythm without varying the spacing itself.

**Breakpoints:** the base CSS is written desktop-first (unprefixed rules describe the large-screen layout), with two collapse points handling the responsive behavior — 900px (two-column layouts to one column: hero, contact panel, letter layout, CV layout, blog teaser) and 640px (the main mobile breakpoint: gutter to 14px, header nav restacks below the wordmark, section padding to 48px, hero to a fixed 1.875rem, stat-strip to one column, hairline-grid to one column, motion-track to vertical). A dedicated `@media print` block reflows the CV to exactly two A4 pages with its own point-based type scale.

**Grid patterns:** two-column sidebar+content pairs (`.career-row`, `.letter-row`, `.cv-layout`, `.letter-layout`, `.contact-panel`) use fixed-ratio `minmax()` pairs; card collections use `.hairline-grid` (2-up bordered grid) or `.row-list` (1-up bordered list); the homepage stats use a 4-column grid degrading to 2 then 1.

## Elevation & Depth

This system is flat by default. There is no shadow-based elevation scale — depth comes from hairline borders (`--line`, `--line-soft`) separating flat surfaces, and from background-tone steps (`--ground → --surface → --paper → --recessed`) signaling nesting. A surface at rest never casts a shadow.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);`): reserved exclusively for the portfolio embed dialog — the only genuine floating element in the site. Do not reuse this for cards or buttons.
- **Inset border** (`box-shadow: inset 0 0 0 1px var(--line-hover);`): a fake-border technique on `.button-secondary`, used to add a 1px outline without triggering layout shift. This is a border substitute, not elevation.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The only true shadow in the system belongs to a real floating overlay (a modal/dialog). If a new component wants a shadow to look "lifted," that is a sign it should be expressed as a tone step or a hairline border instead.

## Shapes

Corners scale with the size and formality of the container, on a fixed radius ladder: 10px (form fields, skip-link) → 12px (chips, scan images, small cards) → 14px (hairline-grid, row-list) → 16px (panels — contact panel, transcription, portfolio dialog) → 18–22px (the hero portrait well, largest and softest corner in the system) → 999px (full pill — every button, tag, and label-chip in the site). Borders are exclusively 1px hairlines at low opacity (`--line` at 10%, `--line-soft` at 6%, `--line-hover` at 24% for hover-only emphasis) — never a solid saturated border color. The one true circle in the system is the small accent dot on the career/motion timeline track (`border-radius: 50%`), deliberately distinct from the pill token.

**Nested and inner elements below 10px.** The ladder above governs *containers*. Elements that sit inside a container and are smaller than roughly 32px — checkboxes, icon swatches, indicator tiles, inner panel heads — sit below the ladder's floor, because a 10px radius on a 16px square is very nearly a circle and reads as a mistake rather than as a corner. These take one of two forms, and no others:

- **A proportional radius of 4–6px** (`rounded.inner-xs` / `rounded.inner-sm`), chosen so the corner is visually the same softness as its parent at the smaller size. Use 4px below 20px square, 6px from 20px to 32px.
- **`calc(<parent radius> - <gap>)`** where the element sits flush inside a rounded parent, so the two corners stay concentric — e.g. `calc(var(--r-md) - 3px)` for an element inset 3px from an `--r-md` container.

Anything at or above 32px returns to the ladder. This rule exists because the ladder's silence below 10px was being read as a prohibition, and each new swatch or checkbox was being handled as a one-off exception instead of by a stated convention.

## Components

Every component is restrained and documentary: nothing announces itself, states change quietly, and structure — not ornament — is what makes a card feel trustworthy.

### Buttons
- **Shape:** full pill (`--r-pill`, 999px), `12px 22px` padding.
- **Primary:** `--accent` fill, white text; hover moves to `--accent-strong`. Used for the one clear action per section (booking, primary CTA).
- **Secondary:** transparent fill, `--ink` text, `inset 0 0 0 1px var(--line-hover)` in place of a real border; hover fills with `--surface-alt`. No button in the system uses a real `box-shadow`.

### Chips / Pills
- **Eyebrow pill:** `--paper` background, `--accent` text, pill radius, uppercase small label — the section-opening marker used throughout (`.eyebrow-pill`, `.letter-pill`).
- **Status chip:** frosted `rgba(255,255,255,0.92)` fill with `backdrop-filter: blur(8px)`, `--r-md` (12px) radius, not a full pill — the one component that deliberately breaks the pill-for-labels convention because it overlays a photo, not a flat band.
- **Tag / chip list:** pill radius, hairline border, used for skill/keyword lists.

### Cards / Containers
- **Corner style:** 14px (`.hairline-grid`, `.row-list`) or 16px (panels).
- **Background:** `--paper`, occasionally stepping to `--recessed` for nested inset content.
- **Shadow strategy:** none — see Elevation & Depth.
- **Border:** a single outer 1px `--line` border with internal 1px `--line-soft` dividers shared between adjacent cells (not doubled) — this shared-divider technique is the site's signature grid pattern and should be reused rather than reinvented for any new bordered grid.
- **Internal padding:** follows the spacing ladder; card content commonly sits at 26–28px padding.

### Inputs / Fields
- **Style:** `--r-sm` (10px) radius, hairline border, `--recessed` or `--paper` background depending on context (the contact form sits on `--recessed` with a left `--line` divider separating it from the contact details column).
- **Focus:** `2px solid var(--accent)` outline at 3px offset — the same focus treatment used site-wide via `:focus-visible`, not a component-specific override.

### Navigation
- Nav links use the Nav type role (13.5px), `--ink-secondary` default, `--accent` on hover/active. The header-contact link is styled as a filled pill, distinct from plain text nav links. Mobile restacks nav below the wordmark at ≤640px rather than collapsing into a hamburger menu — the nav is short enough to stay fully visible.

### Hairline Grid (signature component)
A 2-column bordered card grid built from a single outer border plus shared internal dividers (each cell takes a top+left border, zeroed on the first row and left column so no divider is ever doubled). An odd trailing cell spans both columns. This pattern — refined over several documented rounds to fix optical-balance bugs — is the clearest visual expression of "The Quiet Ledger": cards that read as adjacent entries in one record, not as separate floating tiles.

## Do's and Don'ts

### Do:
- **Do** keep the accent to under 10% of any screen — links, one primary button, pills, focus rings, and pull-quote rules only.
- **Do** express nesting/depth as a step along `--ground → --surface → --paper → --recessed`, never as a shadow.
- **Do** reuse the shared-divider `.hairline-grid` pattern for any new bordered card grid rather than giving every cell its own full border.
- **Do** use `--accent-on-dark` (never the base `--accent`) for accent-colored text on the stat band or any near-black ground — the base accent fails contrast there.
- **Do** stay on the fixed spacing ladder (4/6/8/10/12/14/16/18/22/26/28/40/48/56/72px) — no arbitrary in-between values.

### Don't:
- **Don't** add a second accent hue. One hue, spent sparingly, is the point.
- **Don't** add a drop shadow to a card, button, or any at-rest surface — the only legitimate shadow in the system belongs to the portfolio dialog overlay.
- **Don't** add a second font-loading mechanism (Google Fonts link, a different `@fontsource` package, a manual `@font-face`) — `@fontsource-variable/inter` imported in `SiteLayout.astro` is the only one this site should carry.
- **Don't** style a new bordered grid with individually-bordered cells — use the shared-divider technique so borders never double up.
- **Don't** carry the `.band-invert` dark-mode token overrides or the print stylesheet's black/white reset into the default light-mode system — they are separate, self-contained sub-systems scoped to their own contexts, not a base to build on.
