import {
  PILLAR_ANCHORS,
  buildGraph,
  categoriesByKey,
  layoutGraph,
  type GraphLink,
  type GraphNode,
  type WorkEntry
} from './weekGraph';
import { pillars } from '../data/repWeekCalendar.js';

type MapState = {
  selectedId: string | null;
  activeCategories: Set<string>;
};

type MapOptions = {
  host: SVGSVGElement;
  getEntries: () => readonly WorkEntry[];
  getState: () => MapState;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
};

const PILLAR_LABEL: Record<string, string> = {
  growth: 'Growth',
  delivery: 'Delivery',
  operations: 'Operations'
};

export function createWeekMap(options: MapOptions) {
  const { host, getEntries, getState, onSelect, reducedMotion } = options;

  let width = 800;
  let height = 560;
  let nodes: GraphNode[] = [];
  let links: GraphLink[] = [];
  let hoverId: string | null = null;
  let transform = { x: 0, y: 0, k: 1 };
  let dragging: { x: number; y: number; tx: number; ty: number } | null = null;

  const ns = 'http://www.w3.org/2000/svg';
  host.setAttribute('role', 'group');
  host.setAttribute('aria-label', 'Map of the role');
  host.removeAttribute('aria-hidden');

  const viewport = document.createElementNS(ns, 'g');
  viewport.setAttribute('class', 'map-viewport');
  host.append(viewport);

  const linkLayer = document.createElementNS(ns, 'g');
  linkLayer.setAttribute('class', 'map-links');
  const labelLayer = document.createElementNS(ns, 'g');
  labelLayer.setAttribute('class', 'map-pillar-labels');
  const nodeLayer = document.createElementNS(ns, 'g');
  nodeLayer.setAttribute('class', 'map-nodes');
  const titleLayer = document.createElementNS(ns, 'g');
  titleLayer.setAttribute('class', 'map-titles');
  viewport.append(linkLayer, labelLayer, nodeLayer, titleLayer);

  const applyTransform = () => {
    viewport.setAttribute('transform', `translate(${transform.x} ${transform.y}) scale(${transform.k})`);
  };

  const neighboursOf = (id: string) => {
    const next = new Set<string>();
    for (const link of links) {
      if (link.source === id) next.add(link.target);
      if (link.target === id) next.add(link.source);
    }
    return next;
  };

  const isFaded = (node: GraphNode, state: MapState) =>
    state.activeCategories.size > 0 && !state.activeCategories.has(node.category);

  const shouldShowTitle = (node: GraphNode, state: MapState, neighbours: Set<string>) => {
    if (state.selectedId === node.id || hoverId === node.id || neighbours.has(node.id)) return true;
    if (transform.k >= 1.5) return true;
    if (transform.k >= 1.2 && node.degree >= 2) return true;
    return node.degree >= 4;
  };

  function draw() {
    const state = getState();
    const focus = state.selectedId ?? hoverId;
    const neighbours = focus ? neighboursOf(focus) : new Set<string>();

    linkLayer.replaceChildren(
      ...links.map((link) => {
        const source = nodes.find((node) => node.id === link.source);
        const target = nodes.find((node) => node.id === link.target);
        if (!source || !target) return document.createComment('') as unknown as SVGElement;
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', String(source.x));
        line.setAttribute('y1', String(source.y));
        line.setAttribute('x2', String(target.x));
        line.setAttribute('y2', String(target.y));
        const hot = Boolean(focus && (link.source === focus || link.target === focus));
        const dim = Boolean(focus && !hot);
        line.setAttribute(
          'class',
          `map-link${link.crossPillar ? ' is-cross' : ''}${hot ? ' is-hot' : ''}${dim ? ' is-dim' : ''}`
        );
        return line;
      })
    );

    labelLayer.replaceChildren(
      ...(['growth', 'delivery', 'operations'] as const).map((pillar) => {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('class', 'map-pillar-label');
        text.setAttribute('x', String(PILLAR_ANCHORS[pillar].x * width));
        text.setAttribute('y', String(PILLAR_ANCHORS[pillar].y * height - 72));
        text.setAttribute('text-anchor', 'middle');
        text.textContent = PILLAR_LABEL[pillar];
        text.style.fill = `var(--p-${pillar})`;
        return text;
      })
    );

    nodeLayer.replaceChildren(
      ...nodes.map((node) => {
        const group = document.createElementNS(ns, 'g');
        const faded = isFaded(node, state);
        const selected = state.selectedId === node.id;
        const linked = neighbours.has(node.id);
        group.setAttribute(
          'class',
          `map-node${selected ? ' is-selected' : ''}${linked ? ' is-linked' : ''}${faded ? ' is-faded' : ''}${
            node.themes.includes('relationships') ? ' is-related' : ''
          }`
        );
        group.dataset.entry = node.id;
        group.setAttribute('tabindex', faded ? '-1' : '0');
        group.setAttribute('role', 'button');
        group.setAttribute('aria-label', node.title);
        group.setAttribute('aria-pressed', String(selected));

        if (node.themes.includes('relationships')) {
          const ring = document.createElementNS(ns, 'circle');
          ring.setAttribute('class', 'map-node-ring');
          ring.setAttribute('cx', String(node.x));
          ring.setAttribute('cy', String(node.y));
          ring.setAttribute('r', String(node.radius + 4));
          group.append(ring);
        }

        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('class', 'map-node-dot');
        circle.setAttribute('cx', String(node.x));
        circle.setAttribute('cy', String(node.y));
        circle.setAttribute('r', String(node.radius));
        circle.style.fill = `var(--c-${node.category})`;
        group.append(circle);

        group.addEventListener('pointerenter', () => {
          hoverId = node.id;
          draw();
        });
        group.addEventListener('pointerleave', () => {
          if (hoverId === node.id) hoverId = null;
          draw();
        });
        group.addEventListener('click', (event) => {
          event.stopPropagation();
          onSelect(node.id);
        });
        group.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          onSelect(node.id);
        });

        return group;
      })
    );

    const titled = nodes.filter((node) => shouldShowTitle(node, state, neighbours));

    titleLayer.replaceChildren(
      ...titled.map((node) => {
        const group = document.createElementNS(ns, 'g');
        group.setAttribute('class', 'map-title-group');
        const x = node.x + node.radius + 6;
        const y = node.y + 4;
        const widthGuess = Math.min(220, Math.max(36, node.title.length * 5.6 + 8));
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('class', 'map-title-back');
        rect.setAttribute('x', String(x - 3));
        rect.setAttribute('y', String(y - 10));
        rect.setAttribute('width', String(widthGuess));
        rect.setAttribute('height', '14');
        rect.setAttribute('rx', '2');
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('class', 'map-title');
        text.setAttribute('x', String(x));
        text.setAttribute('y', String(y));
        text.textContent = node.title;
        group.append(rect, text);
        return group;
      })
    );

    applyTransform();
  }

  function relayout() {
    const box = host.getBoundingClientRect();
    width = Math.max(640, Math.round(box.width) || 800);
    height = Math.max(480, Math.round(box.height) || 560);
    host.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const graph = layoutGraph(buildGraph(getEntries()), width, height);
    nodes = graph.nodes;
    links = graph.links;
    draw();
  }

  if (!reducedMotion) {
    host.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        const factor = event.deltaY < 0 ? 1.08 : 0.92;
        const next = Math.min(2.4, Math.max(0.7, transform.k * factor));
        const rect = host.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        const scale = next / transform.k;
        transform.x = px - (px - transform.x) * scale;
        transform.y = py - (py - transform.y) * scale;
        transform.k = next;
        draw();
      },
      { passive: false }
    );
  }

  host.addEventListener('pointerdown', (event) => {
    if ((event.target as Element).closest('.map-node')) return;
    dragging = { x: event.clientX, y: event.clientY, tx: transform.x, ty: transform.y };
    host.setPointerCapture(event.pointerId);
  });

  host.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    transform.x = dragging.tx + (event.clientX - dragging.x);
    transform.y = dragging.ty + (event.clientY - dragging.y);
    applyTransform();
  });

  host.addEventListener('pointerup', () => {
    dragging = null;
  });

  return {
    relayout,
    draw,
    focus() {
      draw();
    }
  };
}

export function explorerMarkup(
  entries: readonly WorkEntry[],
  selectedId: string | null,
  activeCategories: Set<string>
) {
  const visible =
    activeCategories.size === 0
      ? [...entries]
      : entries.filter((entry) => activeCategories.has(entry.category));
  const byId = new Map(visible.map((entry) => [entry.id, entry]));
  const selected = selectedId ? byId.get(selectedId) : undefined;

  if (!selected) {
    return (['growth', 'delivery', 'operations'] as const)
      .map((pillar) => {
        const group = visible.filter((entry) => categoriesByKey[entry.category].pillar === pillar);
        if (!group.length) return '';
        return `<section class="map-explorer-pillar" style="--pillar-color: var(--p-${pillar})">
          <h3>${pillars[pillar].label}</h3>
          <div class="map-explorer-list">
            ${group
              .map(
                (entry) =>
                  `<button class="map-explorer-item" type="button" data-entry="${entry.id}" style="--cat-color: var(--c-${entry.category})">
                    <span class="dot" aria-hidden="true"></span>
                    <span>${escapeExplorer(entry.title)}</span>
                  </button>`
              )
              .join('')}
          </div>
        </section>`;
      })
      .join('');
  }

  const neighbourIds = new Set(selected.connections);
  for (const entry of visible) {
    if (entry.connections.includes(selected.id)) neighbourIds.add(entry.id);
  }
  neighbourIds.delete(selected.id);
  const neighbours = [...neighbourIds].map((id) => byId.get(id)).filter(Boolean) as WorkEntry[];

  return `<section class="map-explorer-focus">
    <button class="map-explorer-back" type="button" data-explorer-back>All areas</button>
    <p class="map-explorer-kicker">${escapeExplorer(categoriesByKey[selected.category].label)}</p>
    <h3>${escapeExplorer(selected.title)}</h3>
    <p>${escapeExplorer(selected.summary)}</p>
    ${
      neighbours.length
        ? `<div class="map-explorer-list">
            <p class="week-t-label">Connected work</p>
            ${neighbours
              .map(
                (entry) =>
                  `<button class="map-explorer-item" type="button" data-entry="${entry.id}" data-from-focus="true" style="--cat-color: var(--c-${entry.category})">
                    <span class="dot" aria-hidden="true"></span>
                    <span>${escapeExplorer(entry.title)}</span>
                  </button>`
              )
              .join('')}
          </div>`
        : ''
    }
  </section>`;
}

function escapeExplorer(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!
  );
}
