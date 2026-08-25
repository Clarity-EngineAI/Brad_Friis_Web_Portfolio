import { calendarEntries, pillars, vocabulary } from './calendar-data.js';

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday'
};

const slotLabels = {
  morning: 'Morning',
  afternoon: 'Afternoon'
};

const state = {
  activePillars: new Set(vocabulary.pillars),
  selectedId: null,
  originId: null
};

const grid = document.querySelector('#week-grid');
const agenda = document.querySelector('#agenda');
const filterGroup = document.querySelector('#filter-group');
const filterCount = document.querySelector('#filter-count');
const emptyState = document.querySelector('#empty-state');
const panel = document.querySelector('#detail-panel');
const panelTitle = document.querySelector('#detail-title');
const panelEyebrow = document.querySelector('#detail-eyebrow');
const panelCopy = document.querySelector('#detail-copy');
const panelRelated = document.querySelector('#detail-related');
const panelLinks = document.querySelector('#detail-links');
const panelLinksBlock = document.querySelector('#detail-links-block');
const desktopQuery = window.matchMedia('(min-width: 62rem)');

document.documentElement.classList.add('js-ready');

const byId = new Map(calendarEntries.map((entry) => [entry.id, entry]));

function visibleEntries() {
  return calendarEntries.filter((entry) => state.activePillars.has(entry.pillar));
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
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function entryMarkup(entry, linked) {
  const selected = state.selectedId === entry.id;
  const pillar = pillars[entry.pillar];
  const linkNote = linked ? ' Connected to the open entry.' : '';

  return `
    <button
      class="entry${linked ? ' is-linked' : ''}"
      type="button"
      data-entry="${entry.id}"
      data-pillar="${entry.pillar}"
      aria-expanded="${selected}"
      aria-controls="detail-panel"
      aria-label="${escapeHtml(`${dayLabels[entry.day]} ${entry.displayTime}. ${entry.title}. ${pillar.label}.${linkNote}`)}"
    >
      <span class="entry-slot">${entry.displayTime}</span>
      <span class="entry-pillar">${pillar.shortLabel}</span>
      <span class="entry-title">${escapeHtml(entry.title)}</span>
      <span class="entry-summary">${escapeHtml(entry.summary)}</span>
      <span class="entry-link-note">Connected to the open entry</span>
    </button>
  `;
}

function renderFilters() {
  const allActive = state.activePillars.size === vocabulary.pillars.length;
  filterGroup.innerHTML = `
    ${vocabulary.pillars
      .map(
        (id) => `
      <button
        class="filter-button"
        type="button"
        data-filter="${id}"
        data-pillar="${id}"
        aria-pressed="${state.activePillars.has(id)}"
      >
        <span class="mark" aria-hidden="true"></span>${pillars[id].shortLabel}
      </button>`
      )
      .join('')}
    <button class="filter-button filter-reset" type="button" data-filter="all" ${
      allActive ? 'hidden' : ''
    }>Reset to all three</button>
  `;
}

function render() {
  const entries = visibleEntries();
  const linked = linkedIds();

  filterCount.textContent = `${entries.length} of ${calendarEntries.length} entries shown`;
  emptyState.hidden = entries.length > 0;
  grid.hidden = entries.length === 0;
  agenda.hidden = entries.length === 0;

  // Desktop: a fixed 2 x 5 matrix. Cells stay in place when a pillar is filtered out so the
  // week does not reflow into a different shape each time the reader changes the filter.
  grid.innerHTML = `
    <div class="grid-corner" aria-hidden="true"></div>
    ${vocabulary.days
      .map(
        (day) => `
      <div class="day-head" role="columnheader"><h3>${dayLabels[day]}</h3></div>`
      )
      .join('')}
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

  agenda.innerHTML = vocabulary.days
    .map((day) => {
      const dayEntries = entries.filter((entry) => entry.day === day);
      if (!dayEntries.length) return '';
      return `
      <section class="agenda-day" aria-labelledby="agenda-${day}">
        <header class="agenda-day-head">
          <h3 id="agenda-${day}">${dayLabels[day]}</h3>
          <span>${dayEntries.length} ${dayEntries.length === 1 ? 'entry' : 'entries'}</span>
        </header>
        ${dayEntries.map((entry) => entryMarkup(entry, linked.has(entry.id))).join('')}
      </section>`;
    })
    .join('');
}

function openDetail(id, { focusPanel = true } = {}) {
  const entry = byId.get(id);
  if (!entry) return;
  const pillar = pillars[entry.pillar];

  state.selectedId = id;
  panel.dataset.pillar = entry.pillar;
  panelEyebrow.innerHTML = `<span class="mark" aria-hidden="true"></span>${pillar.shortLabel} · ${
    dayLabels[entry.day]
  } ${entry.displayTime}`;
  panelTitle.textContent = entry.title;
  panelCopy.textContent = entry.detail;

  const related = entry.relatedPillars.map((pillarId) => pillars[pillarId].label);
  panelRelated.textContent = related.length
    ? `This work also ran into ${related.join(' and ')}.`
    : 'Contained entirely within this pillar.';

  const connections = entry.connections.map((connectionId) => byId.get(connectionId)).filter(Boolean);
  panelLinksBlock.hidden = connections.length === 0;
  panelLinks.innerHTML = connections
    .map(
      (connection) =>
        `<button class="detail-link" type="button" data-goto="${connection.id}">${escapeHtml(
          connection.title
        )}</button>`
    )
    .join('');

  panel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('detail-open');
  render();

  if (focusPanel) {
    panel.querySelector('.detail-close')?.focus({ preventScroll: true });
  }
}

function closeDetail({ restoreFocus = true } = {}) {
  const originId = state.selectedId;
  state.selectedId = null;
  panel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('detail-open');
  render();

  if (restoreFocus && originId) {
    requestAnimationFrame(() => {
      const candidates = document.querySelectorAll(`[data-entry="${CSS.escape(originId)}"]`);
      const visible = [...candidates].find((element) => element.offsetParent !== null);
      visible?.focus({ preventScroll: true });
      visible?.scrollIntoView({ block: 'nearest' });
    });
  }
}

function toggleFilter(id) {
  if (id === 'all') {
    state.activePillars = new Set(vocabulary.pillars);
  } else if (state.activePillars.has(id)) {
    state.activePillars.delete(id);
  } else {
    state.activePillars.add(id);
  }

  // An open entry whose pillar has just been hidden would leave the panel describing
  // something no longer on screen.
  if (state.selectedId && !state.activePillars.has(byId.get(state.selectedId).pillar)) {
    closeDetail({ restoreFocus: false });
  }

  renderFilters();
  render();
}

filterGroup.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) toggleFilter(button.dataset.filter);
});

document.addEventListener('click', (event) => {
  const entryButton = event.target.closest('[data-entry]');
  if (entryButton) {
    const id = entryButton.dataset.entry;
    if (id === state.selectedId) closeDetail();
    else openDetail(id);
    return;
  }

  const goto = event.target.closest('[data-goto]');
  if (goto) {
    openDetail(goto.dataset.goto);
    return;
  }

  if (event.target.closest('[data-close]')) {
    closeDetail();
    return;
  }

  if (event.target.closest('[data-reset]')) {
    state.activePillars = new Set(vocabulary.pillars);
    renderFilters();
    render();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.selectedId) {
    event.preventDefault();
    closeDetail();
  }
});

// Focus is trapped inside the panel while it is open. Both the slide-out and the bottom
// sheet sit above the page, so tabbing back into the calendar underneath would leave the
// reader operating a view they cannot see.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || !state.selectedId) return;
  const focusable = panel.querySelectorAll('button');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Crossing the breakpoint swaps a right-hand slide-out for a bottom sheet. Closing rather
// than re-rendering avoids a panel that animates in from the wrong edge mid-transition.
desktopQuery.addEventListener('change', () => {
  if (state.selectedId) closeDetail({ restoreFocus: false });
});

renderFilters();
render();
