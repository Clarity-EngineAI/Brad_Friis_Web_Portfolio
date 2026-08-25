import { calendarEntries, categories, pillars, vocabulary } from './calendar-data.js';

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday'
};

const slotLabels = { morning: 'Morning', afternoon: 'Afternoon' };

/* ADDITIVE selection, not subtractive.
   Every sub-category loads OFF. The empty set is the page's resting default:
   no choice has been made, so the whole week is shown rather than an empty
   calendar. A reader builds a view up by turning individual areas ON.

   Two explicit controls sit on top of that:
   - ALL fills the set — every one of the twelve areas switched on, visibly.
     Its grid happens to match the resting view, but it is a different state:
     a choice that includes everything, not the absence of a choice.
   - RESET clears the set — back to the default, entirely-off state.

   State is held at the SUB-CATEGORY level only. A pillar's state is always
   derived from its four children, never stored — storing both would create
   two sources of truth that drift the first time a chip is toggled. */
const state = {
  activeCategories: new Set(),
  selectedId: null,
  /* Where the reader came FROM, deepest last. Following a connected-work link
     pushes; the back affordance pops. A stack rather than a single previous id
     because the connections are a graph — A to B to C is reachable in two
     clicks and "back" from C has to mean B, not A. Cleared on every fresh
     open from the grid, which is where a journey starts. */
  trail: []
};

const allCategoryIds = Object.keys(categories);
const noSelection = () => state.activeCategories.size === 0;
const everythingSelected = () => state.activeCategories.size === allCategoryIds.length;

const el = {
  grid: document.querySelector('#week-grid'),
  agenda: document.querySelector('#agenda'),
  filterGroups: document.querySelector('#filter-groups'),
  selectAllButton: document.querySelector('[data-select-all]'),
  resetButton: document.querySelector('[data-reset]'),
  dialog: document.querySelector('#detail-dialog'),
  panelTitle: document.querySelector('#detail-title'),
  panelEyebrow: document.querySelector('#detail-eyebrow'),
  panelCopy: document.querySelector('#detail-copy'),
  panelRelated: document.querySelector('#detail-related'),
  panelLinks: document.querySelector('#detail-links'),
  panelLinksBlock: document.querySelector('#detail-links-block'),
  backButton: document.querySelector('#detail-back'),
  backLabel: document.querySelector('#detail-back-label')
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const desktopQuery = window.matchMedia('(min-width: 62rem)');
const byId = new Map(calendarEntries.map((entry) => [entry.id, entry]));

document.documentElement.classList.add('js-ready');

const pillarOf = (entry) => categories[entry.category].pillar;

function pillarState(pillarId) {
  const children = pillars[pillarId].categories;
  const on = children.filter((id) => state.activeCategories.has(id)).length;
  if (on === 0) return 'none';
  if (on === children.length) return 'all';
  return 'some';
}

/* No selection means the whole week, so the reader never has to switch
   something on to see anything. There is no reachable empty-calendar state. */
function visibleEntries() {
  if (noSelection()) return calendarEntries;
  return calendarEntries.filter((entry) => state.activeCategories.has(entry.category));
}

function linkedIds() {
  if (!state.selectedId) return new Set();
  const selected = byId.get(state.selectedId);
  const ids = new Set(selected.connections);
  for (const entry of calendarEntries) {
    if (entry.connections.includes(selected.id)) ids.add(entry.id);
  }
  ids.delete(selected.id);
  return ids;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]
  );
}

/* Colour is passed down as a custom property on the element rather than as a
   class per category. Twelve classes x every coloured part would be a large
   generated stylesheet; one variable per element is one declaration. */
function catVars(categoryId) {
  return `--cat-color: var(--c-${categoryId}); --cat-wash: var(--wash-${categories[categoryId].pillar});`;
}

function entryMarkup(entry, linked, { showSlot = false } = {}) {
  const selected = state.selectedId === entry.id;
  const category = categories[entry.category];
  const pillar = pillarOf(entry);
  const linkNote = linked ? ' Connected to the open entry.' : '';

  return `
    <button
      class="entry${linked ? ' is-linked' : ''}"
      type="button"
      style="${catVars(entry.category)} --pillar-on-dark: var(--p-${pillar}-on-dark);"
      data-entry="${entry.id}"
      aria-expanded="${selected}"
      aria-controls="detail-dialog"
      aria-label="${escapeHtml(
        `${dayLabels[entry.day]} ${entry.displayTime}. ${entry.title}. ${category.label}, under ${pillars[pillar].label}.${linkNote}`
      )}"
    >
      <span class="entry-cat">${escapeHtml(category.shortLabel)}${
        showSlot ? `<span class="entry-slot">${entry.displayTime}</span>` : ''
      }</span>
      <span class="entry-title">${escapeHtml(entry.title)}</span>
      <span class="entry-summary">${escapeHtml(entry.summary)}</span>
    </button>
  `;
}

function renderFilters() {
  /* All and Reset are quiet text actions, not a fourth and fifth pill: they
     operate on state rather than on a pillar, and dressed as toggles they
     entered the reader's scan of the vocabulary. Each disables when it would
     change nothing, which is also the only visible difference between the two
     look-alike full-grid states — resting, and everything explicitly on. */
  el.selectAllButton.disabled = everythingSelected();
  el.resetButton.disabled = noSelection();

  /* ONE ROW PER PILLAR: the pillar button, then its own four areas, all in
     that pillar's hue family. V3.2 stacked three pillars in one row above
     twelve chips in another, which stated the two-level relationship in the
     markup and hid it from the eye — a reader could not tell which four of
     the twelve a pillar button governed without clicking one and watching.
     Adjacency and shared colour say it without a word, which is what let the
     "Filter by pillar, or by the work itself" label be deleted.

     No counts anywhere — Brad's rule (25 August 2026). */
  el.filterGroups.innerHTML = vocabulary.pillars
    .map((pillarId) => {
      const status = pillarState(pillarId);
      const chips = pillars[pillarId].categories
        .map((catId) => {
          const on = state.activeCategories.has(catId);
          return `
        <button
          class="cat-chip"
          type="button"
          data-cat-toggle="${catId}"
          style="${catVars(catId)}"
          aria-pressed="${on}"
          aria-label="${escapeHtml(
            `${categories[catId].label}. ${on ? 'Selected.' : 'Select to add to the view.'}`
          )}"
        ><span class="dot" aria-hidden="true"></span>${escapeHtml(categories[catId].chipLabel)}</button>`;
        })
        .join('');

      return `
      <div class="filter-group" role="group"
           aria-label="${escapeHtml(pillars[pillarId].label)}"
           style="--pillar-color: var(--p-${pillarId}); --pillar-wash: var(--wash-${pillarId});">
        <button
          class="pillar-toggle"
          type="button"
          data-pillar-toggle="${pillarId}"
          data-state="${status}"
          aria-pressed="${status !== 'none'}"
          aria-label="${escapeHtml(
            `${pillars[pillarId].label}. ${
              status === 'all'
                ? 'All four areas selected. Select to clear them.'
                : `Select to show all four ${pillars[pillarId].label} areas.`
            }`
          )}"
        >${pillars[pillarId].label}</button>
        <div class="filter-group-cats">${chips}</div>
      </div>`;
    })
    .join('');
}

function render() {
  const entries = visibleEntries();
  const linked = linkedIds();

  /* No empty state exists: every one of the twelve areas has entries, and
     Reset returns to the full week rather than to nothing. There is no
     reachable path to a zero-entry view. */

  // A fixed 2 x 5 matrix. Cells hold position when a category is filtered out,
  // so Wednesday stays where Wednesday was rather than the week reflowing on
  // every click and costing the reader their place.
  el.grid.innerHTML = `
    <div class="grid-corner" aria-hidden="true"></div>
    ${vocabulary.days.map((day) => `<div class="day-head"><h3>${dayLabels[day]}</h3></div>`).join('')}
    ${vocabulary.slots
      .map(
        (slot) => `
      <div class="slot-head"><span>${slotLabels[slot]}</span></div>
      ${vocabulary.days
        .map((day) => {
          const cell = entries.filter((entry) => entry.day === day && entry.slot === slot);
          return `<div class="grid-cell">${cell
            .map((entry) => entryMarkup(entry, linked.has(entry.id)))
            .join('')}</div>`;
        })
        .join('')}`
      )
      .join('')}
  `;

  el.agenda.innerHTML = vocabulary.days
    .map((day) => {
      const dayEntries = entries.filter((entry) => entry.day === day);
      if (!dayEntries.length) return '';
      return `
      <section class="agenda-day" aria-labelledby="agenda-${day}">
        <header class="agenda-day-head">
          <h3 id="agenda-${day}">${dayLabels[day]}</h3>
        </header>
        ${dayEntries.map((entry) => entryMarkup(entry, linked.has(entry.id), { showSlot: true })).join('')}
      </section>`;
    })
    .join('');
}

/* `from` carries the id the reader followed a link FROM. Present means this
   open is a step in a journey and pushes onto the trail; absent means a fresh
   open from the grid, which starts a new one. */
function openDetail(id, { focusPanel = true, from = null } = {}) {
  const entry = byId.get(id);
  if (!entry) return;

  if (from) state.trail.push(from);
  else state.trail.length = 0;
  const category = categories[entry.category];
  const pillar = pillarOf(entry);

  state.selectedId = id;
  el.dialog.setAttribute(
    'style',
    `${catVars(entry.category)} --pillar-on-dark: var(--p-${pillar}-on-dark);`
  );

  el.panelEyebrow.innerHTML = `<span class="dot" aria-hidden="true"></span>${escapeHtml(
    category.label
  )}<span class="detail-pillar-tag">${escapeHtml(pillars[pillar].label)} · ${
    dayLabels[entry.day]
  } ${entry.displayTime}</span>`;
  el.panelTitle.textContent = entry.title;
  el.panelCopy.textContent = entry.detail;

  const related = entry.alsoRanInto.map((pillarId) => pillars[pillarId].label);
  el.panelRelated.textContent = related.length
    ? `This work also ran into ${related.join(' and ')}.`
    : 'Contained entirely within this pillar.';

  /* Where the reader came from. A named "back to X" beats a bare arrow: the
     browser-history metaphor is wrong inside a dialog that never changed URL,
     and an unlabelled back control gives no reason to press it. */
  const cameFrom = state.trail.length ? byId.get(state.trail[state.trail.length - 1]) : null;
  el.backButton.hidden = !cameFrom;
  /* Cleared, not merely hidden, when the trail is empty. `hidden` keeps the
     stale label out of the render but not necessarily out of an assistive
     tree, and "Back to X" pointing nowhere is worse than no control at all. */
  el.backLabel.textContent = cameFrom ? `Back to ${cameFrom.title}` : '';
  if (cameFrom) el.backButton.setAttribute('aria-label', `Back to ${cameFrom.title}`);
  else el.backButton.removeAttribute('aria-label');

  /* Each connection says WHERE it sits, not just what it is called. On a
     calendar, "Friday afternoon" is the whole point of the entry being on a
     calendar — without it a connected-work list is just a list. */
  const connections = entry.connections.map((cid) => byId.get(cid)).filter(Boolean);
  el.panelLinksBlock.hidden = connections.length === 0;
  el.panelLinks.innerHTML = connections
    .map(
      (connection) =>
        `<button class="detail-link" type="button" data-goto="${connection.id}"
           style="--link-color: var(--c-${connection.category});">
           <span class="dot" aria-hidden="true"></span>
           <span class="detail-link-text">
             <span class="detail-link-title">${escapeHtml(connection.title)}</span>
             <span class="detail-link-where">${dayLabels[connection.day]} ${
               connection.displayTime.toLowerCase()
             } · ${escapeHtml(categories[connection.category].shortLabel)}</span>
           </span></button>`
    )
    .join('');

  // showModal() puts the dialog in the top layer, renders ::backdrop, makes
  // everything behind it inert and traps focus. Calling it while already open
  // throws, so a re-open from a connected-work link just swaps the content.
  if (!el.dialog.open) el.dialog.showModal();
  render();

  /* Focus the dialog itself, not the close button. showModal() already moves
     focus into the dialog and traps it there; explicitly focusing Close made
     a screen reader announce "Close, button" before the entry title, and put
     a focus ring on the loudest control on every single open. The dialog
     carries tabindex="-1" so it can receive focus without entering the tab
     order, and aria-labelledby means focusing it reads the title. */
  if (focusPanel) el.dialog.focus({ preventScroll: true });
}

function closeDetail({ restoreFocus = true } = {}) {
  const originId = state.selectedId;
  if (!originId) return;
  state.selectedId = null;
  state.trail.length = 0;
  if (el.dialog.open) el.dialog.close();
  render();

  /* The reader may have walked two or three connected entries deep, and the
     card they end on is not the card they opened. Closing therefore returns
     them to where they ACTUALLY ended up — focused, scrolled into view and
     briefly marked — rather than silently dropping them back on a grid with
     no indication of which of thirty cards they were just reading. */
  if (restoreFocus && originId) {
    requestAnimationFrame(() => {
      const candidates = document.querySelectorAll(`[data-entry="${CSS.escape(originId)}"]`);
      const visible = [...candidates].find((element) => element.offsetParent !== null);
      if (!visible) return;
      visible.focus({ preventScroll: true });
      visible.scrollIntoView({
        block: 'nearest',
        behavior: reducedMotion.matches ? 'auto' : 'smooth'
      });
      /* The highlight is the only thing that survives a screenshot, so it is
         a real class with a real duration rather than a transition the reader
         might blink past. Cleared on animation end, not on a timer, so a
         reduced-motion user (whose animation is ~0ms) is not left marked. */
      visible.classList.remove('just-visited');
      void visible.offsetWidth;
      visible.classList.add('just-visited');
      visible.addEventListener(
        'animationend',
        () => visible.classList.remove('just-visited'),
        { once: true }
      );
    });
  }
}

/* Closing the panel when its entry has just been filtered out — otherwise the
   panel describes something no longer on screen. */
function reconcileSelection() {
  if (noSelection() || !state.selectedId) return;
  if (!state.activeCategories.has(byId.get(state.selectedId).category)) {
    closeDetail({ restoreFocus: false });
  }
}

function togglePillar(pillarId) {
  const children = pillars[pillarId].categories;
  // 'some' resolves upward to 'all four'. Partial -> empty would discard the
  // reader's sub-selection on a click most likely meant to broaden it.
  const turnOn = pillarState(pillarId) !== 'all';
  children.forEach((id) => {
    if (turnOn) state.activeCategories.add(id);
    else state.activeCategories.delete(id);
  });
  commit();
}

function toggleCategory(catId) {
  if (state.activeCategories.has(catId)) state.activeCategories.delete(catId);
  else state.activeCategories.add(catId);
  commit();
}

/* ALL fills the set: every sub-category explicitly ON, every chip lit. The
   grid it produces matches the resting view, but the states are distinct —
   this one is a choice that includes everything, and every subsequent chip
   click narrows it subtractively, which is exactly what a reader who pressed
   All expects to happen next. */
function selectAll() {
  allCategoryIds.forEach((id) => state.activeCategories.add(id));
  commit();
}

/* RESET clears the set: back to the default, entirely-off state the page
   loaded with. The full week returns because no selection means no filter,
   never because everything got switched on behind the reader's back. */
function reset() {
  state.activeCategories.clear();
  commit();
}

function commit() {
  reconcileSelection();
  renderFilters();
  render();
}

document.addEventListener('click', (event) => {
  const pillarButton = event.target.closest('[data-pillar-toggle]');
  if (pillarButton) return togglePillar(pillarButton.dataset.pillarToggle);

  const catButton = event.target.closest('[data-cat-toggle]');
  if (catButton) return toggleCategory(catButton.dataset.catToggle);

  if (event.target.closest('[data-select-all]')) return selectAll();

  if (event.target.closest('[data-reset]')) return reset();

  const entryButton = event.target.closest('[data-entry]');
  if (entryButton) {
    const id = entryButton.dataset.entry;
    return id === state.selectedId ? closeDetail() : openDetail(id);
  }

  if (event.target.closest('#detail-back')) {
    const previous = state.trail.pop();
    if (previous) openDetail(previous);
    return;
  }

  const goto = event.target.closest('[data-goto]');
  if (goto) return openDetail(goto.dataset.goto, { from: state.selectedId });

  if (event.target.closest('[data-close]')) return closeDetail();
});

/* Escape, the focus trap and background inertness all come from the platform
   now. The one thing <dialog> does not give us is our own bookkeeping, so we
   listen for its close event rather than assuming every close came through
   closeDetail() — Escape and the backdrop both bypass it. */
el.dialog.addEventListener('close', () => {
  if (state.selectedId) closeDetail();
});

/* Click outside to dismiss. The dialog element's own box covers only the
   panel, so a click whose target IS the dialog landed on the backdrop. */
el.dialog.addEventListener('click', (event) => {
  if (event.target === el.dialog) el.dialog.close();
});

// Crossing the breakpoint swaps a centred dialog for a bottom sheet. Closing
// avoids a dialog that finishes an entrance animation from the wrong edge.
desktopQuery.addEventListener('change', () => {
  if (state.selectedId) closeDetail({ restoreFocus: false });
});

/* Only ONE sticky offset survives V3.3.

   Desktop no longer sticks anything below the site header: the whole grid is
   sized to fit a single viewport, so day headings that follow the reader down
   were solving a scroll that no longer happens, and the filter bar could stop
   floating over the cards it filters. The measured --chrome-h that fed both
   is gone with them.

   Mobile still scrolls — an agenda of thirty entries cannot do otherwise —
   so its day headings stay sticky and still need the header height, which
   changes when the header stacks. That one value is still measured rather
   than hardcoded, because hardcoding it is what buried the headings in V2. */
function syncStickyOffsets() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  document.documentElement.style.setProperty(
    '--header-h',
    `${Math.round(header.getBoundingClientRect().height)}px`
  );
}

renderFilters();
render();
syncStickyOffsets();

let resizeFrame = null;
window.addEventListener('resize', () => {
  if (resizeFrame) cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(syncStickyOffsets);
});
