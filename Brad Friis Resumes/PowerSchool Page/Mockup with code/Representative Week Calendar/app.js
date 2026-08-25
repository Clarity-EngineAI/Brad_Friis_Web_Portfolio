import { calendarEntries, categories, vocabulary } from './calendar-data.js';

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday'
};

const modeLabels = {
  strategy: 'Strategy',
  analysis: 'Analysis',
  leadership: 'Leadership',
  coordination: 'Coordination',
  'system-design': 'System design',
  writing: 'Writing',
  'hands-on': 'Hands-on production',
  preparation: 'Preparation',
  delivery: 'Delivery',
  'commercial-judgement': 'Commercial judgement',
  'project-coordination': 'Project coordination',
  advisory: 'Advisory',
  facilitation: 'Facilitation',
  'learning-design': 'Learning design',
  production: 'Production',
  'problem-solving': 'Problem-solving',
  communication: 'Communication',
  'technical-coordination': 'Technical coordination',
  documentation: 'Documentation',
  'continuous-improvement': 'Continuous improvement',
  'relationship-management': 'Relationship management',
  'financial-modelling': 'Financial modelling',
  negotiation: 'Negotiation',
  'risk-management': 'Risk management',
  governance: 'Governance',
  'people-management': 'People management',
  'user-advocacy': 'User advocacy'
};

const state = {
  activeCategories: new Set(vocabulary.categories),
  selectedId: null,
  origin: null,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};

const weekView = document.querySelector('#week-view');
const agendaView = document.querySelector('#agenda-view');
const filters = document.querySelector('#filters');
const resultSummary = document.querySelector('#result-summary');
const emptyState = document.querySelector('#empty-state');
const detailPanel = document.querySelector('#detail-panel');
const detailTitle = document.querySelector('#detail-title');
const detailPeriod = document.querySelector('#detail-period');
const detailCategory = document.querySelector('#detail-category');
const detailCopy = document.querySelector('#detail-copy');
const detailRelated = document.querySelector('#detail-related');
const detailModes = document.querySelector('#detail-modes');
const detailConnection = document.querySelector('#detail-connection');
const themeToggle = document.querySelector('[data-theme-toggle]');

document.documentElement.classList.add('js-ready');
document.documentElement.dataset.theme = state.theme;

function sortEntries(entries) {
  return [...entries].sort((a, b) =>
    a.dayOrder - b.dayOrder ||
    vocabulary.slots.indexOf(a.slot) - vocabulary.slots.indexOf(b.slot) ||
    a.slotOrder - b.slotOrder
  );
}

function getCategoryVars(categoryId) {
  return `--category-color: var(--category-${categoryId}); --category-tint: var(--category-${categoryId}-tint);`;
}

function firstDetailSentence(detail) {
  return detail.split(/(?<=[.!?])\s/)[0];
}

function getEntry(id) {
  return calendarEntries.find((entry) => entry.id === id);
}

function isRelated(entry) {
  if (!state.selectedId || entry.id === state.selectedId) return false;
  const selected = getEntry(state.selectedId);
  return selected.connections.includes(entry.id) || entry.connections.includes(selected.id);
}

function cardMarkup(entry, mobile = false) {
  const selected = state.selectedId === entry.id;
  const related = isRelated(entry);
  const category = categories[entry.primaryCategory];
  const relatedText = related ? ' Related to the selected entry.' : '';
  const inlineId = `inline-${entry.id}`;

  return `
    <div class="entry-wrap" data-entry-wrap="${entry.id}">
      <button
        class="calendar-card${related ? ' is-related' : ''}"
        type="button"
        data-entry-id="${entry.id}"
        style="${getCategoryVars(entry.primaryCategory)}"
        aria-expanded="${selected}"
        aria-controls="${mobile ? inlineId : 'detail-panel'}"
        aria-label="${entry.displayTime}. ${entry.title}. ${category.label}.${relatedText}"
      >
        <span class="card-period">${entry.displayTime}</span>
        <span class="card-title">${entry.title}</span>
        <span class="card-category">${category.shortLabel}</span>
        <span class="card-summary">${entry.summary}</span>
        <span class="related-label">Related to selected entry</span>
        <span class="hover-preview" role="tooltip">${firstDetailSentence(entry.detail)}</span>
      </button>
      ${mobile && selected ? inlineDetailMarkup(entry, inlineId) : ''}
    </div>
  `;
}

function tagsMarkup(labels) {
  if (!labels.length) return '<span class="tag">None specified</span>';
  return labels.map((label) => `<span class="tag">${label}</span>`).join('');
}

function connectionNames(entry) {
  return entry.connections.map((id) => getEntry(id)?.title).filter(Boolean);
}

function inlineDetailMarkup(entry, id) {
  const related = entry.relatedCategories.map((categoryId) => categories[categoryId].shortLabel);
  const modes = entry.modes.map((mode) => modeLabels[mode]);
  const connections = connectionNames(entry);
  return `
    <div class="inline-detail" id="${id}" tabindex="-1">
      <p class="inline-detail-copy">${entry.detail}</p>
      <div class="inline-detail-meta">
        <strong>Related responsibilities</strong>
        <div class="tag-list">${tagsMarkup(related)}</div>
      </div>
      <div class="inline-detail-meta">
        <strong>Operating modes</strong>
        <div class="tag-list">${tagsMarkup(modes)}</div>
      </div>
      ${connections.length ? `<p class="detail-connection">Connected in this view to: ${connections.join('; ')}.</p>` : ''}
      <button class="inline-close" type="button" data-inline-close="${entry.id}">Close detail</button>
    </div>
  `;
}

function visibleEntries() {
  return sortEntries(calendarEntries.filter((entry) => state.activeCategories.has(entry.primaryCategory)));
}

function renderFilters() {
  const allActive = state.activeCategories.size === vocabulary.categories.length;
  filters.innerHTML = `
    <button class="filter-button" type="button" data-filter="all" aria-pressed="${allActive}">
      All
    </button>
    ${vocabulary.categories.map((id) => `
      <button
        class="filter-button"
        type="button"
        data-filter="${id}"
        aria-pressed="${state.activeCategories.has(id)}"
        style="--category-color: var(--category-${id})"
      >
        ${categories[id].shortLabel}
      </button>
    `).join('')}
  `;
}

function renderViews() {
  const entries = visibleEntries();
  const hasEntries = entries.length > 0;
  emptyState.hidden = hasEntries;
  weekView.hidden = !hasEntries;
  agendaView.hidden = !hasEntries;

  const noun = entries.length === 1 ? 'entry' : 'entries';
  resultSummary.textContent = `Showing ${entries.length} of ${calendarEntries.length} ${noun}`;

  weekView.innerHTML = vocabulary.days.map((day) => {
    const dayEntries = entries.filter((entry) => entry.day === day);
    if (!dayEntries.length) return '';
    return `
      <section class="day-column" aria-labelledby="desktop-${day}">
        <header class="day-header">
          <h3 id="desktop-${day}">${dayLabels[day]}</h3>
          <p>${dayEntries.length} ${dayEntries.length === 1 ? 'entry' : 'entries'}</p>
        </header>
        <div class="day-entries">${dayEntries.map((entry) => cardMarkup(entry)).join('')}</div>
      </section>
    `;
  }).join('');

  agendaView.innerHTML = vocabulary.days.map((day) => {
    const dayEntries = entries.filter((entry) => entry.day === day);
    if (!dayEntries.length) return '';
    return `
      <section class="agenda-day" aria-labelledby="mobile-${day}">
        <header class="day-header">
          <h3 id="mobile-${day}">${dayLabels[day]}</h3>
          <p>${dayEntries.length} ${dayEntries.length === 1 ? 'entry' : 'entries'}</p>
        </header>
        <div class="day-entries">${dayEntries.map((entry) => cardMarkup(entry, true)).join('')}</div>
      </section>
    `;
  }).join('');

  if (state.selectedId) updateDesktopDetail(getEntry(state.selectedId));
}

function updateDesktopDetail(entry) {
  if (!entry) return;
  const category = categories[entry.primaryCategory];
  const related = entry.relatedCategories.map((categoryId) => categories[categoryId].shortLabel);
  const modes = entry.modes.map((mode) => modeLabels[mode]);
  const connections = connectionNames(entry);

  detailPanel.style.setProperty('--detail-category-color', `var(--category-${entry.primaryCategory})`);
  detailPeriod.textContent = `${dayLabels[entry.day]} · ${entry.displayTime}`;
  detailTitle.textContent = entry.title;
  detailCategory.textContent = category.label;
  detailCopy.textContent = entry.detail;
  detailRelated.innerHTML = tagsMarkup(related);
  detailModes.innerHTML = tagsMarkup(modes);
  detailConnection.hidden = connections.length === 0;
  detailConnection.textContent = connections.length
    ? `Connected in this view to: ${connections.join('; ')}. Those entries are marked with a dashed border and a text label.`
    : '';
  detailPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('detail-open');
}

function selectEntry(id, origin) {
  state.selectedId = id;
  state.origin = origin;
  renderViews();

  if (window.matchMedia('(max-width: 47.99rem)').matches) {
    const inline = document.querySelector(`#inline-${CSS.escape(id)}`);
    inline?.focus({ preventScroll: true });
    inline?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  } else {
    detailPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('detail-open');
    document.querySelector('[data-detail-close]')?.focus({ preventScroll: true });
  }
}

function closeDetail({ restoreFocus = true } = {}) {
  const originId = state.selectedId;
  state.selectedId = null;
  detailPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('detail-open');
  renderViews();

  if (restoreFocus && originId) {
    requestAnimationFrame(() => {
      const candidates = document.querySelectorAll(`[data-entry-id="${CSS.escape(originId)}"]`);
      const visible = [...candidates].find((element) => element.offsetParent !== null);
      visible?.focus();
    });
  }
}

function toggleCategory(categoryId) {
  closeDetail({ restoreFocus: false });
  if (categoryId === 'all') {
    state.activeCategories = new Set(vocabulary.categories);
  } else if (state.activeCategories.has(categoryId)) {
    state.activeCategories.delete(categoryId);
  } else {
    state.activeCategories.add(categoryId);
  }
  renderFilters();
  renderViews();
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) toggleCategory(button.dataset.filter);
});

document.addEventListener('click', (event) => {
  const card = event.target.closest('[data-entry-id]');
  if (card) {
    selectEntry(card.dataset.entryId, card);
    return;
  }

  const inlineClose = event.target.closest('[data-inline-close]');
  if (inlineClose) {
    closeDetail();
    return;
  }

  if (event.target.closest('[data-detail-close]')) {
    closeDetail();
    return;
  }

  if (event.target.closest('[data-reset-filters]')) {
    state.activeCategories = new Set(vocabulary.categories);
    renderFilters();
    renderViews();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.selectedId) {
    event.preventDefault();
    closeDetail();
  }
});

themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = state.theme;
  themeToggle.setAttribute('aria-label', `Switch to ${state.theme === 'dark' ? 'light' : 'dark'} theme`);
});

renderFilters();
renderViews();

