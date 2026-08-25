# Representative week calendar

This prototype presents a composite illustrative week from a senior education technology operating role. It is not a record of a particular week and contains no named employer, customer, confidential project, reproduced work or commercial value.

## Data schema

`calendar-data.js` is the single content source for both layouts. It exports:

- `vocabulary`, which controls valid days, slots, categories and operating modes
- `categories`, which holds labels plus light and dark presentation metadata
- `calendarEntries`, an ordered set of 20 JSON-compatible objects

Each entry has a stable kebab-case ID, explicit day and slot order, a scannable summary, a two-sentence detail, one primary category, optional related categories, operating modes, a featured flag and a small number of explicit connections. JSDoc typedefs make the object shape portable to TypeScript, Astro or React without putting styling classes into the content.

## Category logic

The eight requested responsibility areas remain separate:

1. Commercial and sales
2. Implementation and technical delivery
3. Customer enablement and training
4. Marketing and community
5. Support and service design
6. Finance, contracts and renewals
7. Leadership and governance
8. Partnerships and public sector

The approved muted multi-hue palette sits on the live site’s warm ivory and near-black foundation. Colour appears in small markers, category text and selected tints rather than saturated card backgrounds. The category name is always visible, so colour is a supporting cue rather than the only cue. Related categories are neutral text tags.

Filtering is additive. Each category button can be toggled, while All restores the complete week. Non-matching entries are hidden cleanly so the remaining day columns or agenda groups can reflow. Clearing all categories produces an intentional empty state. Result-count changes are announced through a polite live region.

## Interaction model

- **Default:** period, title, primary category and a concise summary are visible. At narrower desktop widths the summary is suppressed to preserve reading space, but it remains available in the hover preview and persistent detail.
- **Hover:** pointer users see the first detail sentence in a small preview. The card lifts without changing its dimensions.
- **Focus:** native buttons provide logical tab order. The visible focus treatment uses a three-pixel outline rather than colour alone.
- **Selected:** click, Enter or Space opens persistent detail. Desktop uses a fixed side panel that cannot be clipped by the calendar container. Mobile expands the detail directly beneath the selected card.
- **Close:** the close control or Escape closes detail and returns focus to the visible originating card.
- **Related:** explicitly connected entries use a dashed border plus the visible text “Related to selected entry”. The detail explains what that state means.
- **Touch:** the first tap opens detail. No information depends on hover and interactive targets meet the 44 by 44 CSS pixel minimum.
- **Theme:** system preference is respected and the header control allows a session-level override without local storage.
- **Motion:** transitions are brief and functional. `prefers-reduced-motion` reduces them to effectively instantaneous changes.
- **Failure:** a visible JavaScript fallback and a `<noscript>` list preserve the entry titles if scripting fails.

## Desktop-to-mobile transformation

At 768 pixels and above, entries render in five working-day columns. The periods are broad labels rather than a minute grid, keeping the view illustrative rather than historical.

Below 768 pixels, the same ordered entries become a vertical agenda grouped by day. Day headings remain sticky while scrolling and selected detail opens inline, avoiding a narrow modal or compressed five-column view.

## Accessibility decisions

- Semantic sections, headings and native buttons establish the document and control structure.
- Entry buttons expose `aria-expanded` and `aria-controls`.
- The desktop panel has an accessible title and explicit close button.
- Filter state uses `aria-pressed`, and the live region announces the visible count.
- Selected, focused and related states use shape, outline, border style and text in addition to colour.
- Light and dark tokens were designed for WCAG AA text contrast, with category hues reserved for labels and markers rather than body copy.
- A skip link, visible focus rings, keyboard close behaviour and reduced-motion handling are included.

## Editorial decisions

All 20 source areas remain because each carries a distinct operating responsibility. Overlap is reduced through the wording and connections rather than by removing an area:

- Pipeline review is the decision point; the sales sequence is the hands-on system that follows.
- Training programme design sets the pathway; resource production turns it into usable material.
- Support escalation handles an immediate customer issue; support-system improvement changes the recurring process.
- Commercial modelling tests the agreement; proposal and licence work records the commitments.
- Weekly priorities and board reporting bookend the week as operating and governance views of the same system.

The community entry retains the supplied hedge “roughly 650”. No other figures were introduced. The integration entry omits the unverified time-saving claim. Titles were made action-specific, sentence structures were varied and no expanded note ends with a generic statement about what the work demonstrates.
