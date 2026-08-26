import { categories, pillars } from '../data/repWeekCalendar.js';

export type WorkEntry = {
  id: string;
  day?: string;
  slot?: string;
  displayTime?: string;
  title: string;
  summary: string;
  detail: string;
  category: string;
  alsoRanInto: string[];
  connections: string[];
  themes?: string[];
};

export type GraphNode = {
  id: string;
  title: string;
  category: string;
  pillar: string;
  degree: number;
  radius: number;
  onWeek: boolean;
  themes: string[];
  x: number;
  y: number;
};

export type GraphLink = {
  source: string;
  target: string;
  crossPillar: boolean;
};

const categoriesByKey = categories as Record<string, { pillar: string; shortLabel: string; label: string }>;

export function pillarOf(entry: WorkEntry) {
  return categoriesByKey[entry.category].pillar;
}

export function buildGraph(entries: readonly WorkEntry[]) {
  const ids = new Set(entries.map((entry) => entry.id));
  const degree = new Map<string, number>();
  const linkKeys = new Set<string>();
  const links: GraphLink[] = [];
  const byEntry = new Map(entries.map((entry) => [entry.id, entry]));

  const addLink = (a: string, b: string) => {
    if (a === b || !ids.has(a) || !ids.has(b)) return;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (linkKeys.has(key)) return;
    linkKeys.add(key);
    const source = byEntry.get(a)!;
    const target = byEntry.get(b)!;
    links.push({
      source: a,
      target: b,
      crossPillar: pillarOf(source) !== pillarOf(target)
    });
    degree.set(a, (degree.get(a) ?? 0) + 1);
    degree.set(b, (degree.get(b) ?? 0) + 1);
  };

  for (const entry of entries) {
    for (const connection of entry.connections) addLink(entry.id, connection);
  }

  const nodes: GraphNode[] = entries.map((entry) => {
    const count = degree.get(entry.id) ?? 0;
    return {
      id: entry.id,
      title: entry.title,
      category: entry.category,
      pillar: pillarOf(entry),
      degree: count,
      radius: 5 + Math.min(count, 7),
      onWeek: Boolean(entry.day && entry.slot),
      themes: entry.themes ? [...entry.themes] : [],
      x: 0,
      y: 0
    };
  });

  return { nodes, links };
}

const PILLAR_ANCHORS: Record<string, { x: number; y: number }> = {
  growth: { x: 0.27, y: 0.36 },
  delivery: { x: 0.73, y: 0.36 },
  operations: { x: 0.5, y: 0.74 }
};

function hashAngle(id: string, salt: number) {
  let hash = salt;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 33 + id.charCodeAt(index)) >>> 0;
  return (hash % 360) * (Math.PI / 180);
}

export function layoutGraph(graph: { nodes: GraphNode[]; links: GraphLink[] }, width: number, height: number) {
  const { nodes } = graph;
  const categoryIndex = new Map<string, number>();
  for (const pillar of ['growth', 'delivery', 'operations'] as const) {
    pillars[pillar].categories.forEach((id, index) => categoryIndex.set(id, index));
  }

  for (const node of nodes) {
    const anchor = PILLAR_ANCHORS[node.pillar];
    const catIndex = categoryIndex.get(node.category) ?? 0;
    const catAngle = (catIndex / 4) * Math.PI * 2 - Math.PI / 2;
    const catRadius = Math.min(width, height) * 0.13;
    const cx = anchor.x * width + Math.cos(catAngle) * catRadius;
    const cy = anchor.y * height + Math.sin(catAngle) * catRadius * 0.85;
    const jitter = hashAngle(node.id, 17);
    const ring = 18 + (node.degree % 5) * 7;
    node.x = cx + Math.cos(jitter) * ring;
    node.y = cy + Math.sin(jitter) * ring;
  }

  const padding = 36;
  for (let pass = 0; pass < 18; pass += 1) {
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const min = a.radius + b.radius + 10;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist < min) {
          const push = ((min - dist) / dist) * 0.5;
          a.x -= dx * push;
          a.y -= dy * push;
          b.x += dx * push;
          b.y += dy * push;
        }
      }
    }

    for (const node of nodes) {
      const anchor = PILLAR_ANCHORS[node.pillar];
      node.x += (anchor.x * width - node.x) * 0.02;
      node.y += (anchor.y * height - node.y) * 0.02;
      node.x = Math.min(width - padding, Math.max(padding, node.x));
      node.y = Math.min(height - padding, Math.max(padding, node.y));
    }
  }

  return graph;
}

export { PILLAR_ANCHORS, categoriesByKey };
