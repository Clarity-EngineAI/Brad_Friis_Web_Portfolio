/* Populates every mock filter bar on the decision sheet with real, working
   controls, so each option can be clicked rather than imagined.

   Deliberately a classic script, not a module: this file must work when the
   page is opened straight off the disk. A module would be blocked by CORS on
   file:// and every mock would render empty — which is the exact fault that
   made the V3 page look broken. */

var PILLARS = [
  { id: 'growth', label: 'Growth', colorVar: '--p-growth', washVar: '--wash-growth' },
  { id: 'delivery', label: 'Delivery', colorVar: '--p-delivery', washVar: '--wash-delivery' },
  { id: 'operations', label: 'Operations', colorVar: '--p-operations', washVar: '--wash-operations' }
];

var CATS = [
  { id: 'pipeline', chip: 'Pipeline', pillar: 'growth' },
  { id: 'targeting', chip: 'Targeting', pillar: 'growth' },
  { id: 'campaigns', chip: 'Campaigns', pillar: 'growth' },
  { id: 'measurement', chip: 'Measurement', pillar: 'growth' },
  { id: 'implementation', chip: 'Implementation', pillar: 'delivery' },
  { id: 'enablement', chip: 'Enablement', pillar: 'delivery' },
  { id: 'learning-design', chip: 'Learning design', pillar: 'delivery' },
  { id: 'support', chip: 'Support', pillar: 'delivery' },
  { id: 'commercial', chip: 'Commercial', pillar: 'operations' },
  { id: 'partnerships', chip: 'Partnerships', pillar: 'operations' },
  { id: 'people', chip: 'People', pillar: 'operations' },
  { id: 'systems', chip: 'Systems', pillar: 'operations' }
];

/* Full labels for the sheet, where there is room for the real name. */
var SHEET_LABELS = {
  pipeline: 'Pipeline and qualification',
  targeting: 'Data and targeting',
  campaigns: 'Campaigns and events',
  measurement: 'Measurement and attribution',
  implementation: 'Technical implementation',
  enablement: 'Customer enablement',
  'learning-design': 'Learning design and facilitation',
  support: 'Support and service design',
  commercial: 'Commercial and finance',
  partnerships: 'Partnerships and suppliers',
  people: 'People and resourcing',
  systems: 'Systems and governance'
};

function catVars(cat) {
  return '--cat-color: var(--c-' + cat.id + '); --cat-wash: var(--wash-' + cat.pillar + ');';
}

function pillarVars(p) {
  return '--pillar-color: var(' + p.colorVar + '); --pillar-wash: var(' + p.washVar + ');';
}

function buildPillars(host) {
  PILLARS.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pillar-toggle';
    b.setAttribute('style', pillarVars(p));
    b.setAttribute('data-state', 'all');
    b.innerHTML = p.label + ' <span class="pillar-toggle-count">10</span>';
    b.addEventListener('click', function () {
      b.setAttribute('data-state', b.getAttribute('data-state') === 'all' ? 'none' : 'all');
    });
    host.appendChild(b);
  });
}

function buildCats(host) {
  PILLARS.forEach(function (p) {
    var group = document.createElement('div');
    group.className = 'cat-group';
    CATS.filter(function (c) { return c.pillar === p.id; }).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-chip';
      b.setAttribute('style', catVars(c));
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="dot" aria-hidden="true"></span>' + c.chip;
      b.addEventListener('click', function () {
        b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      });
      group.appendChild(b);
    });
    host.appendChild(group);
  });
}

/* The three sample cards under each pill option — one per pillar, so the
   chips are always judged against the surface they sit above. */
var SAMPLE_CARDS = [
  {
    cat: CATS[0],
    slot: 'Monday · Morning',
    eyebrow: 'Pipeline and qualification',
    title: 'Weekly pipeline review against the territory plan',
    summary: 'Worked the list down to the schools that had a live reason to move this term.'
  },
  {
    cat: CATS[4],
    slot: 'Tuesday · Afternoon',
    eyebrow: 'Technical implementation',
    title: 'Data migration checkpoint with a mid-size college',
    summary: 'Signed off the field mapping before the first load ran against live records.'
  },
  {
    cat: CATS[8],
    slot: 'Thursday · Morning',
    eyebrow: 'Commercial and finance',
    title: 'Quarterly reforecast against signed contracts',
    summary: 'Reconciled committed revenue to the delivery calendar and flagged the gap.'
  }
];

function buildMockBar(host) {
  var bar = document.createElement('div');
  bar.className = 'mock-bar';

  var head = document.createElement('div');
  head.className = 'mock-bar-head';
  head.innerHTML = '<span class="t-label">Filter by pillar, or by the work itself</span>';

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'state-toggle';
  toggle.textContent = 'Show all selected';
  head.appendChild(toggle);
  bar.appendChild(head);

  var pillars = document.createElement('div');
  pillars.className = 'filter-pillars';
  buildPillars(pillars);
  bar.appendChild(pillars);

  var cats = document.createElement('div');
  cats.className = 'filter-cats';
  buildCats(cats);
  bar.appendChild(cats);

  toggle.addEventListener('click', function () {
    var chips = bar.querySelectorAll('.cat-chip');
    var anyOff = bar.querySelector('.cat-chip[aria-pressed="false"]') !== null;
    Array.prototype.forEach.call(chips, function (c) {
      c.setAttribute('aria-pressed', anyOff ? 'true' : 'false');
    });
    toggle.textContent = anyOff ? 'Show resting state' : 'Show all selected';
  });

  host.appendChild(bar);

  var entries = document.createElement('div');
  entries.className = 'mock-entries';
  SAMPLE_CARDS.forEach(function (card) {
    var el = document.createElement('div');
    el.className = 'entry';
    el.setAttribute('style', catVars(card.cat));
    el.innerHTML =
      '<span class="entry-slot">' + card.slot + '</span>' +
      '<span class="entry-cat">' + card.eyebrow + '</span>' +
      '<span class="entry-title">' + card.title + '</span>' +
      '<span class="entry-summary">' + card.summary + '</span>';
    entries.appendChild(el);
  });
  host.appendChild(entries);
}

function buildSheet(host) {
  var handle = document.createElement('div');
  handle.className = 'sheet-handle-mock';
  host.appendChild(handle);

  PILLARS.forEach(function (p) {
    var group = document.createElement('div');
    group.className = 'sheet-group';
    group.setAttribute('style', pillarVars(p));

    var gh = document.createElement('div');
    gh.className = 'sheet-group-head';
    gh.innerHTML = '<span class="t-label">' + p.label + '</span>';
    group.appendChild(gh);

    var rows = document.createElement('div');
    rows.className = 'sheet-rows';

    CATS.filter(function (c) { return c.pillar === p.id; }).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sheet-row';
      b.setAttribute('style', catVars(c));
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = SHEET_LABELS[c.id] +
        '<svg class="tick" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
        '<path d="M2 7.5L5.5 11L12 3.5" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>';
      b.addEventListener('click', function () {
        b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      });
      rows.appendChild(b);
    });

    group.appendChild(rows);
    host.appendChild(group);
  });
}

Array.prototype.forEach.call(document.querySelectorAll('[data-mock-bar]'), buildMockBar);
Array.prototype.forEach.call(document.querySelectorAll('[data-pillars-only]'), buildPillars);
Array.prototype.forEach.call(document.querySelectorAll('[data-cats-only]'), buildCats);
Array.prototype.forEach.call(document.querySelectorAll('[data-sheet]'), buildSheet);
