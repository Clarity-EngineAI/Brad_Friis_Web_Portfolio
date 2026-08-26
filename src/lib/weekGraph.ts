import { categories } from '../data/repWeekCalendar.js';

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
  word: string;
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

/** One-word map labels. Full titles arrive only once the viewer has zoomed in. */
const MAP_WORDS: Record<string, string> = {
  'schools-database-segmentation': 'Contacts',
  'sales-strategy-pipeline-review': 'Pipeline',
  'feature-launch-media': 'Launch',
  'network-building-partner-calls': 'Network',
  'renewal-board-prep': 'Renewal',
  'proposals-and-eulas': 'Proposals',
  'lead-generation-hooks-assets': 'Assets',
  'marketing-automation-review': 'Automation',
  'renewal-board-presentation': 'Board',
  'growth-metrics-conversion-tracking': 'Metrics',
  'funded-programme-facilitation': 'Funded',
  'technical-implementation-new-accounts': 'Implementation',
  'feature-training-design': 'Sessions',
  'customer-onboarding-sessions': 'Onboarding',
  'support-team-briefing': 'Briefing',
  'support-materials-updates': 'Materials',
  'moe-integration-tool': 'Integration',
  'bespoke-onboarding-design': 'Path',
  'implementation-blockers-qa': 'Blockers',
  'delivery-capacity-planning': 'Capacity',
  'sla-billing-strategy': 'Billing',
  'financial-strategy-forecasting': 'Forecast',
  'feature-billing-plan': 'Comms',
  'national-conference': 'Conference',
  'international-reseller-sync': 'Vendor',
  'vendor-supplier-management': 'Suppliers',
  'operational-workflows-tooling': 'Workflows',
  'resource-allocation': 'Resourcing',
  'board-reporting-compilation': 'Reporting',
  'annual-uplift-planning': 'Uplift',
  'partnership-contract': 'Contract',
  'direct-nz-invoicing': 'Invoicing',
  'buy-price-own-sell': 'Licensing',
  'no-licence-minimum': 'Minimum',
  'per-product-nz-gtm': 'Market',
  'product-range-workshop': 'Workshop',
  'nz-product-training': 'Training',
  'nz-print-user-guides': 'Guides',
  'powerschool-team-liaison': 'Liaison',
  'usa-onsite-training': 'Travel',
  'customer-visits-nz-au': 'Visits',
  'train-the-trainer': 'Champions',
  'conference-programme': 'Programme',
  'schoology-event-app': 'Event',
  'speaker-edmond-otis': 'Speaker',
  'nerf-conference-stand': 'Stand',
  'two-product-websites': 'Websites',
  'school-contact-database': 'Database',
  'direct-marketing-list': 'Mail',
  'nz-rebuild-us-design': 'Design',
  'sold-nz-au-courses': 'Courses',
  'business-rebrand': 'Rebrand',
  'self-serve-videos': 'Videos',
  'schoology-educators-group': 'Educators',
  'covid-training-delivery': 'COVID',
  'self-paced-course-library': 'Library',
  'nz-referral-network': 'Referrals',
  'ecoco-school-finance': 'Ecoco',
  'educators-who-moved': 'Movers',
  'nz-education-social-groups': 'Groups',
  'email-sequences-lists': 'Sequences',
  'conference-concept-stand': 'Concept',
  'conference-lead-capture': 'Capture',
  'sis-for-new-zealand': 'SIS',
  'au-products-into-nz': 'Australia',
  'phone-prospecting': 'Prospecting',
  'problem-first-presentations': 'Pitch',
  'powerbuddy-campaign': 'PowerBuddy',
  'amazon-education-oceania': 'Amazon',
  'au-school-tech-licensing': 'Accreditation',
  'sales-system-from-nothing': 'Funnel',
  'managed-services-agreement': 'MSA',
  'implementation-fee': 'Fee',
  'digital-circus-facilitator': 'Facilitator',
  'department-training': 'Departments',
  'edtech-nz-referrals': 'EdTech',
  'social-media-strategy': 'Social',
  'corporate-government-lms': 'Corporate',
  'onboarding-sequence': 'Sequence',
  'support-framework-triage': 'Triage',
  'itslearning-partnership': 'itslearning',
  'powerschool-return': 'Return',
  'workshop-feedback-loop': 'Feedback'
};

export function pillarOf(entry: WorkEntry) {
  return categoriesByKey[entry.category].pillar;
}

export function wordFor(entry: WorkEntry) {
  return MAP_WORDS[entry.id] ?? entry.title.split(/\s+/)[0] ?? entry.title;
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
      word: wordFor(entry),
      category: entry.category,
      pillar: pillarOf(entry),
      degree: count,
      radius: 3.2 + Math.min(count, 9) * 0.95,
      onWeek: Boolean(entry.day && entry.slot),
      themes: entry.themes ? [...entry.themes] : [],
      x: 0,
      y: 0
    };
  });

  return { nodes, links };
}

const PILLAR_ANCHORS: Record<string, { x: number; y: number }> = {
  growth: { x: 0.3, y: 0.32 },
  delivery: { x: 0.7, y: 0.32 },
  operations: { x: 0.5, y: 0.7 }
};

function hashAngle(id: string, salt: number) {
  let hash = salt;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 33 + id.charCodeAt(index)) >>> 0;
  return (hash % 360) * (Math.PI / 180);
}

export function layoutGraph(graph: { nodes: GraphNode[]; links: GraphLink[] }, width: number, height: number) {
  const { nodes, links } = graph;
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const span = Math.min(width, height);

  for (const node of nodes) {
    const anchor = PILLAR_ANCHORS[node.pillar];
    const jitter = hashAngle(node.id, 17);
    const radius = span * (0.08 + (hashAngle(node.id, 41) / (Math.PI * 2)) * 0.1);
    node.x = anchor.x * width + Math.cos(jitter) * radius;
    node.y = anchor.y * height + Math.sin(jitter) * radius * 0.88;
  }

  const padding = 40;
  for (let pass = 0; pass < 28; pass += 1) {
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const min = a.radius + b.radius + 14;
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

    for (const link of links) {
      const a = byId.get(link.source);
      const b = byId.get(link.target);
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.01;
      const rest = link.crossPillar ? span * 0.3 : span * 0.13;
      const pull = ((dist - rest) / dist) * (link.crossPillar ? 0.008 : 0.02);
      a.x += dx * pull;
      a.y += dy * pull;
      b.x -= dx * pull;
      b.y -= dy * pull;
    }

    for (const node of nodes) {
      const anchor = PILLAR_ANCHORS[node.pillar];
      node.x += (anchor.x * width - node.x) * 0.05;
      node.y += (anchor.y * height - node.y) * 0.05;
      node.x = Math.min(width - padding, Math.max(padding, node.x));
      node.y = Math.min(height - padding, Math.max(padding, node.y));
    }
  }

  return graph;
}

export { PILLAR_ANCHORS, categoriesByKey };
