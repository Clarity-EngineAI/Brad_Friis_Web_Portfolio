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

type LabelMode = 'none' | 'word' | 'title';

const PILLAR_LABEL: Record<string, string> = {
  growth: 'Growth',
  delivery: 'Delivery',
  operations: 'Operations'
};

export function createWeekMap(options: MapOptions) {
  const { host, getEntries, getState, onSelect, reducedMotion } = options;

  let width = 800;
  let height = 640;
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
  viewport.append(linkLayer, labelLayer, nodeLayer);

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

  const labelMode = (): LabelMode => {
    if (transform.k >= 2.1) return 'title';
    if (transform.k >= 1.45) return 'word';
    return 'none';
  };

  const nodeClass = (node: GraphNode, state: MapState, neighbours: Set<string>) =>
    `map-node${state.selectedId === node.id ? ' is-selected' : ''}${
      neighbours.has(node.id) ? ' is-linked' : ''
    }${isFaded(node, state) ? ' is-faded' : ''}${
      node.themes.includes('relationships') ? ' is-related' : ''
    }`;

  function paint() {
    const state = getState();
    const focus = state.selectedId ?? hoverId;
    const neighbours = focus ? neighboursOf(focus) : new Set<string>();
    const mode = labelMode();
    const labelScale = 1 / transform.k;
    const placed: Array<{ x: number; y: number; w: number; h: number }> = [];

    const overlaps = (box: { x: number; y: number; w: number; h: number }) =>
      placed.some(
        (other) =>
          box.x < other.x + other.w &&
          box.x + box.w > other.x &&
          box.y < other.y + other.h &&
          box.y + box.h > other.y
      );

    const screenBox = (node: GraphNode, text: string) => {
      const originX = (node.x + node.radius + 5) * transform.k + transform.x;
      const originY = (node.y + 3) * transform.k + transform.y;
      return {
        x: originX,
        y: originY - 9,
        w: text.length * 7.4 + 10,
        h: 16
      };
    };

    for (const line of linkLayer.querySelectorAll('line')) {
      const source = line.getAttribute('data-source');
      const target = line.getAttribute('data-target');
      const cross = line.getAttribute('data-cross') === 'true';
      const hot = Boolean(focus && (source === focus || target === focus));
      const dim = Boolean(focus && !hot);
      line.setAttribute(
        'class',
        `map-link${cross ? ' is-cross' : ''}${hot ? ' is-hot' : ''}${dim ? ' is-dim' : ''}`
      );
    }

    const ranked = [...nodes].sort((a, b) => {
      const aFocus = Number(a.id === state.selectedId || a.id === hoverId);
      const bFocus = Number(b.id === state.selectedId || b.id === hoverId);
      if (aFocus !== bFocus) return bFocus - aFocus;
      return b.degree - a.degree;
    });
    const allowed = new Set<string>();
    for (const node of ranked) {
      const focused = node.id === state.selectedId || node.id === hoverId;
      const text = focused && mode === 'title' ? node.title : node.word;
      if (focused) {
        placed.push(screenBox(node, text));
        allowed.add(node.id);
        continue;
      }
      if (mode === 'none') continue;
      const box = screenBox(node, node.word);
      if (overlaps(box)) continue;
      placed.push(box);
      allowed.add(node.id);
    }

    for (const group of nodeLayer.querySelectorAll<SVGGElement>('.map-node')) {
      const node = nodes.find((item) => item.id === group.dataset.entry);
      if (!node) continue;
      group.setAttribute('class', nodeClass(node, state, neighbours));
      group.setAttribute('tabindex', isFaded(node, state) ? '-1' : '0');
      group.setAttribute('aria-pressed', String(state.selectedId === node.id));

      const focused = state.selectedId === node.id || hoverId === node.id;
      const label = group.querySelector('.map-label');
      if (label) {
        label.textContent = focused && mode === 'title' ? node.title : node.word;
        const x = node.x + node.radius + 5;
        const y = node.y + 3;
        label.setAttribute('transform', `translate(${x} ${y}) scale(${labelScale})`);
        label.setAttribute('visibility', allowed.has(node.id) ? 'visible' : 'hidden');
      }
    }

    const pillarOpacity = mode === 'none' ? '0.72' : mode === 'word' ? '0.28' : '0.1';
    for (const text of labelLayer.querySelectorAll('text')) {
      text.setAttribute('opacity', pillarOpacity);
    }

    applyTransform();
  }

  function rebuild() {
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
        line.setAttribute('data-source', link.source);
        line.setAttribute('data-target', link.target);
        line.setAttribute('data-cross', String(link.crossPillar));
        line.setAttribute('class', 'map-link');
        return line;
      })
    );

    labelLayer.replaceChildren(
      ...(['growth', 'delivery', 'operations'] as const).map((pillar) => {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('class', 'map-pillar-label');
        text.setAttribute('x', String(PILLAR_ANCHORS[pillar].x * width));
        text.setAttribute('y', String(PILLAR_ANCHORS[pillar].y * height - (pillar === 'operations' ? 72 : 54)));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.textContent = PILLAR_LABEL[pillar];
        text.style.fill = `var(--p-${pillar})`;
        return text;
      })
    );

    nodeLayer.replaceChildren(
      ...nodes.map((node) => {
        const group = document.createElementNS(ns, 'g');
        group.setAttribute('class', nodeClass(node, state, neighbours));
        group.dataset.entry = node.id;
        group.setAttribute('tabindex', isFaded(node, state) ? '-1' : '0');
        group.setAttribute('role', 'button');
        group.setAttribute('aria-label', node.title);
        group.setAttribute('aria-pressed', String(state.selectedId === node.id));

        const hit = document.createElementNS(ns, 'circle');
        hit.setAttribute('class', 'map-node-hit');
        hit.setAttribute('cx', String(node.x));
        hit.setAttribute('cy', String(node.y));
        hit.setAttribute('r', String(Math.max(14, node.radius + 8)));
        group.append(hit);

        if (node.themes.includes('relationships')) {
          const ring = document.createElementNS(ns, 'circle');
          ring.setAttribute('class', 'map-node-ring');
          ring.setAttribute('cx', String(node.x));
          ring.setAttribute('cy', String(node.y));
          ring.setAttribute('r', String(node.radius + 3.5));
          group.append(ring);
        }

        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('class', 'map-node-dot');
        circle.setAttribute('cx', String(node.x));
        circle.setAttribute('cy', String(node.y));
        circle.setAttribute('r', String(node.radius));
        circle.style.fill = `var(--c-${node.category})`;
        group.append(circle);

        const label = document.createElementNS(ns, 'text');
        label.setAttribute('class', 'map-label');
        label.setAttribute('visibility', 'hidden');
        label.setAttribute('dominant-baseline', 'middle');
        group.append(label);

        group.addEventListener('pointerenter', () => {
          hoverId = node.id;
          paint();
        });
        group.addEventListener('pointerleave', () => {
          if (hoverId === node.id) hoverId = null;
          paint();
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

    applyTransform();
    paint();
  }

  function relayout() {
    transform = { x: 0, y: 0, k: 1 };
    const box = host.getBoundingClientRect();
    width = Math.max(640, Math.round(box.width) || 800);
    height = Math.max(520, Math.round(box.height) || 640);
    host.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const graph = layoutGraph(buildGraph(getEntries()), width, height);
    nodes = graph.nodes;
    links = graph.links;
    rebuild();
  }

  function zoomToward(next: number, px: number, py: number) {
    const bounded = Math.min(2.8, Math.max(0.65, next));
    const scale = bounded / transform.k;
    transform.x = px - (px - transform.x) * scale;
    transform.y = py - (py - transform.y) * scale;
    transform.k = bounded;
    paint();
  }

  function zoomBy(direction: 1 | -1) {
    const rect = host.getBoundingClientRect();
    zoomToward(transform.k * (direction > 0 ? 1.28 : 0.78), rect.width / 2, rect.height / 2);
  }

  if (!reducedMotion) {
    host.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
        const rect = host.getBoundingClientRect();
        zoomToward(
          transform.k * (event.deltaY < 0 ? 1.1 : 0.9),
          event.clientX - rect.left,
          event.clientY - rect.top
        );
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
    draw: paint,
    zoomBy,
    focus() {
      paint();
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
