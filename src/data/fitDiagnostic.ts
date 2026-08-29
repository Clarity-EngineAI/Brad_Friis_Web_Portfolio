/**
 * The fit diagnostic model.
 *
 * A visitor answers eight questions about their own situation. Each answer carries a demand
 * vector over the eight dimensions below. Demands are normalised into shares, weighted against
 * fixed ceilings, and rescaled against the evidence floor and roof to produce a 0-100 score.
 *
 * DO NOT replace these dimensions with the twelve `repWeekCalendar.js` categories, and do not
 * replace them with the Demand/Land/Keep/Grow lifecycle. Both were considered and rejected:
 * four of the twelve categories have no evidence behind them and nobody has a business problem
 * called "measurement and attribution"; the lifecycle hands everyone 75% because Brad is strong
 * on three of its four stages. The lifecycle survives here as `stage`, a colour and grouping
 * label only, never as the scoring axis.
 *
 * Ceilings are the honesty valve. They are fixed in advance from `COPY/interviews/_claims-register.md`
 * and no answer can raise one. Every ceiling carries the register rows that justify it and the
 * date it was last reviewed by Brad.
 *
 * Ceilings signed off by Brad 28 August 2026. Two moved from the planned values at that sign-off:
 * `demand` 0.60 -> 0.70 and `new-logo-hunting` 0.25 -> 0.30. Both are recorded against their rows.
 */

export type DimensionId =
  | "adoption"
  | "retention"
  | "expansion"
  | "pricing-cash"
  | "commercial-terms"
  | "full-cycle"
  | "demand"
  | "new-logo-hunting";

export type Stage = "demand" | "land" | "keep" | "grow";

export interface Dimension {
  id: DimensionId;
  /** Visitor-facing label. Describes the problem, never the capability. */
  label: string;
  /** Fixed upper bound on what the evidence supports. Never moved by an answer. */
  ceiling: number;
  /** Date Brad last reviewed this ceiling. Shown on the method disclosure. */
  reviewed: string;
  stage: Stage;
  /** Why the ceiling is where it is, in Brad's first person. Shown on the report. */
  bound: string;
  /** Claims-register rows justifying the ceiling. Audit trail, never displayed. */
  source: string;
}

/**
 * The floor and roof the raw weighted score is rescaled against.
 *
 * A raw convex combination of ceilings is trapped inside their hull: six of the eight sit at or
 * above 0.85, so the weighted mean lands near 0.87 for almost everybody and no amount of question
 * tuning escapes it. The first version of this model was enumerated and produced a median of 81
 * with 97.7% of paths at 65 or above. Rescaling against the actual floor and roof of the evidence
 * spreads the distribution and is describable in one defensible sentence:
 *
 *   100 means every problem raised is one I have my strongest evidence for.
 *   0 means every problem raised is the one I have least.
 *
 * These MUST track the lowest and highest ceilings above. When Brad raised `new-logo-hunting`
 * from 0.25 to 0.30 the floor moved with it; leaving it at 0.25 would have inflated every score.
 */
export const SCORE_FLOOR = 0.3;
export const SCORE_ROOF = 0.95;

export const dimensions: Dimension[] = [
  {
    id: "adoption",
    label: "Getting non-technical users to genuinely use the product",
    ceiling: 0.95,
    reviewed: "2026-08-28",
    stage: "land",
    bound:
      "The strongest evidence I have. One school went from signing to 100% of its teachers using the platform daily in a single term. I ran 108 one-to-one interviews with teachers through the lockdowns, and built a teacher network that reached around 600 people. Teachers who had been actively against it ended up advocating for it.",
    source: "A2, A6, A7, A11, A12, A13, A14, A15",
  },
  {
    id: "retention",
    label: "Keeping accounts that are at risk of leaving",
    ceiling: 0.92,
    reviewed: "2026-08-28",
    stage: "keep",
    bound:
      "One documented save, at a five-campus account, and eight consecutive renewals at another. Not full marks, and the reason is printed with it: I did lose the occasional school on total cost against government-subsidised alternatives.",
    source: "A3, A4, A5, A16, A17, A18, A24, E19, E30, E41",
  },
  {
    id: "expansion",
    label: "Growing revenue inside accounts already held",
    ceiling: 0.9,
    reviewed: "2026-08-28",
    stage: "grow",
    bound:
      "Licences grew from 2,800 to 29,784 across the book. One account added a sixth campus and bought two revenue lines that had not existed there before. The composition of that growth is documented; its total value is not, so this cannot claim full marks.",
    source: "A9, A16, A17, A18, A20, A33, E23, E34",
  },
  {
    id: "pricing-cash",
    label: "Pricing structure and cash cycle",
    ceiling: 0.9,
    reviewed: "2026-08-28",
    stage: "grow",
    bound:
      "Managed services structured monthly and billed annually in advance, so the year's cash came in up front. Licensing moved to buy-as-needed with no upfront cost. At an earlier role I introduced a 50% deposit on all work where there had been none. The price-rise concession travels with this one too.",
    source: "A21, A22, A23, A32, A33, A38, E6, E7, E8, E9, E10, E52",
  },
  {
    id: "commercial-terms",
    label: "Contracts, licensing and vendor terms",
    ceiling: 0.88,
    reviewed: "2026-08-28",
    stage: "grow",
    bound:
      "I negotiated a whole reseller agreement: buy price, terms and the licensing framework. I moved billing to direct invoicing in local currency, and held firm to remove a 500-licence minimum that would have shut out much of the New Zealand market. One vendor, one contract family, which is what bounds it.",
    source: "A36, A37, A38, A39, A40, A41, A42",
  },
  {
    id: "full-cycle",
    label: "Owning the whole cycle solo, prospect to invoice",
    ceiling: 0.85,
    reviewed: "2026-08-28",
    stage: "land",
    bound:
      "At Xplore I prospected, interviewed, wrote the strategy into a proposal, briefed the delivery team and then held the billing and the relationship. The education decade ran the same way. An enterprise motion with sales operations behind it is a different animal.",
    source: "E17, E18, E22, A34, A35",
  },
  {
    id: "demand",
    label: "Generating new demand: campaigns, partnerships, marketing",
    ceiling: 0.7,
    reviewed: "2026-08-28",
    stage: "demand",
    bound:
      "Ad revenue up 60% and advertiser volume up 40% over three years on a regional guide and web portal. Across the education decade I ran the marketing myself: direct marketing, email, two sites with booking functions, the conference stands, and presenting at the conferences. I also partnered with an accredited company to become a Ministry of Education approved facilitator, which opened access to government training funds.",
    // Raised from the planned 0.60 at Brad's sign-off, 28 Aug 2026. The plan justified this on
    // Canwest and Adplus alone and called it "not a decade of it". The register's 18 August
    // addendum records a decade of it: marketing strategy, direct marketing, email, conference
    // stands and conference presenting across 2015-2025.
    source: "E37, A10, A25, A26, A27, addendum 18 Aug 2026",
  },
  {
    id: "new-logo-hunting",
    label: "High-volume net-new acquisition, cold outbound",
    ceiling: 0.3,
    reviewed: "2026-08-28",
    stage: "demand",
    bound:
      "This is the one I have least. The record from 2001 is land, keep and grow. I did grow a client base substantially at 99 Corporation, and I built a referral network that brought in over $70,000 of business across two years, but neither is the high-volume cold outbound this asks about, and I left that role partly because I did not enjoy the cold calling.",
    // Restored to 0.30 at Brad's sign-off, 28 Aug 2026, on the 99 Corporation client growth
    // (owner-vouched by Rob Nieuwland: around 70% more business clients) and the Xchange
    // referral network. Brad confirmed in the same exchange that "doubled the clientele" was a
    // misspeak and that the register's around-70% figure stands.
    source: "E51, E12, E18, E21, E15",
  },
];

export const dimensionById: Record<DimensionId, Dimension> = Object.fromEntries(
  dimensions.map((d) => [d.id, d]),
) as Record<DimensionId, Dimension>;

export type DemandVector = Partial<Record<DimensionId, number>>;

export interface Option {
  /** Stable id. Used in the share URL, so never reorder or renumber existing options. */
  id: string;
  label: string;
  demand: DemandVector;
}

export interface Question {
  id: string;
  prompt: string;
  /** Q7 selects the sector caveat and the lead example. It scores nothing. */
  scored: boolean;
  note?: string;
  options: Option[];
}

/**
 * Authoring rules, enforced by `scripts/check-fit-model.mjs`:
 *
 *   1. Ask about their reality, never about a capability.
 *   2. Every option is a real, respectable business situation. No option is an admission
 *      of failure.
 *   3. Every scored question must contain at least one route to a low-ceiling dimension.
 *      The first draft wrote this rule and then broke it on Q2 and Q4, which is why it is
 *      now a build check rather than a note.
 *   4. No option is labelled with its dimension.
 */
export const questions: Question[] = [
  {
    id: "q1",
    prompt: "What matters most to you in the person filling this role?",
    scored: true,
    options: [
      {
        id: "a",
        label: "Keeping the customers we already have happy and renewing",
        demand: { retention: 3, adoption: 1 },
      },
      {
        id: "b",
        label: "Growing what our existing accounts spend with us",
        demand: { expansion: 3, "pricing-cash": 1 },
      },
      {
        id: "c",
        label: "Bringing in new customers, not just growing old ones",
        demand: { "new-logo-hunting": 3, demand: 2 },
      },
      {
        id: "d",
        label: "Making sure what we sell gets used and adopted",
        demand: { adoption: 3, "full-cycle": 1 },
      },
      {
        id: "e",
        label: "Getting our margins and commercial terms in better shape",
        demand: { "commercial-terms": 2, "pricing-cash": 3 },
      },
      {
        id: "f",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q2",
    prompt: "When an account has been with you two years, what happens to what it spends?",
    scored: true,
    options: [
      { id: "a", label: "It goes up, and we know why", demand: { expansion: 1 } },
      { id: "b", label: "It goes up, and we do not really know why", demand: { expansion: 2, "pricing-cash": 1 } },
      { id: "c", label: "It stays flat", demand: { expansion: 3, "pricing-cash": 2 } },
      { id: "d", label: "It goes down", demand: { retention: 3, expansion: 2 } },
      {
        id: "e",
        label: "We do not have accounts two years old. We are too young.",
        demand: { "new-logo-hunting": 3, demand: 2 },
      },
      {
        id: "f",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q3",
    prompt: "Which of these is closest to true about your pricing?",
    scored: true,
    options: [
      {
        id: "a",
        label: "We have not changed it in years and are nervous about doing so",
        demand: { "pricing-cash": 3, retention: 2 },
      },
      {
        id: "b",
        label: "We charge for the product and give away a lot of service around it",
        demand: { "pricing-cash": 3, expansion: 2 },
      },
      {
        id: "c",
        label: "Our price is set by someone else: a vendor, a parent company, a rate card",
        demand: { "commercial-terms": 3, "pricing-cash": 1 },
      },
      {
        id: "d",
        label: "Cash comes in too late relative to when we do the work",
        demand: { "pricing-cash": 3, "commercial-terms": 1 },
      },
      { id: "e", label: "Pricing is not the problem. Volume is.", demand: { "new-logo-hunting": 3, demand: 2 } },
      {
        id: "f",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q4",
    prompt: "How would you describe adoption of what you sell?",
    scored: true,
    options: [
      { id: "a", label: "Bought, then barely touched", demand: { adoption: 3, retention: 2 } },
      { id: "b", label: "The technical people use it, everybody else avoids it", demand: { adoption: 3 } },
      {
        id: "c",
        label: "Used, but only with constant hand-holding from us",
        demand: { adoption: 2, "pricing-cash": 2, "full-cycle": 1 },
      },
      {
        id: "d",
        label: "Used well. What we need is more people hearing about us.",
        demand: { demand: 3, "new-logo-hunting": 2 },
      },
      {
        id: "e",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q5",
    prompt: "How is this role's number set?",
    scored: true,
    options: [
      {
        id: "a",
        label: "Retention or renewal rate, or net revenue retention",
        demand: { retention: 3, expansion: 2 },
      },
      { id: "b", label: "Growth within existing accounts", demand: { expansion: 3, retention: 1 } },
      { id: "c", label: "New logos or new ARR", demand: { "new-logo-hunting": 4, demand: 1 } },
      { id: "d", label: "Total revenue, however it arrives", demand: { "full-cycle": 2, expansion: 1 } },
      { id: "e", label: "Activity and pipeline coverage", demand: { "new-logo-hunting": 3, demand: 2 } },
      {
        id: "f",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q6",
    prompt: "How do your customers reach you?",
    scored: true,
    options: [
      { id: "a", label: "Direct, we sell to them ourselves", demand: { demand: 2, "new-logo-hunting": 2 } },
      {
        id: "b",
        label: "Through partners, resellers or a channel",
        demand: { "commercial-terms": 2, expansion: 1 },
      },
      {
        id: "c",
        label: "We are the partner; someone else owns the product",
        demand: { "commercial-terms": 2, expansion: 1, retention: 1 },
      },
      { id: "d", label: "Self-serve, they arrive and buy", demand: { demand: 3, "new-logo-hunting": 3 } },
      {
        id: "e",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
  {
    id: "q7",
    prompt: "What sector are you in?",
    scored: false,
    note: "This does not affect the score. It selects which example leads and which caveat applies.",
    options: [
      { id: "a", label: "Education or edtech", demand: {} },
      { id: "b", label: "SaaS or software", demand: {} },
      { id: "c", label: "Agency or services", demand: {} },
      { id: "d", label: "Media or publishing", demand: {} },
      { id: "e", label: "Industrial, trade or primary", demand: {} },
      { id: "f", label: "Something else", demand: {} },
    ],
  },
  {
    id: "q8",
    prompt: "If you filled this role, what has to be true in the first six months?",
    scored: true,
    options: [
      { id: "a", label: "Named at-risk accounts are still here", demand: { retention: 3 } },
      { id: "b", label: "The existing book is spending more", demand: { expansion: 3 } },
      {
        id: "c",
        label: "The pipeline is full of names that were not there before",
        demand: { "new-logo-hunting": 4, demand: 2 },
      },
      { id: "d", label: "The thing we sold last year is finally in daily use", demand: { adoption: 3 } },
      {
        id: "e",
        label: "The commercials are on a better footing: terms, price, cash",
        demand: { "commercial-terms": 2, "pricing-cash": 2 },
      },
      {
        id: "f",
        label: "I don't know. I'm assessing this for someone else.",
        demand: {},
      },
    ],
  },
];

export const scoredQuestions = questions.filter((q) => q.scored);

export type BandId = "strong" | "substantial" | "partial" | "weak" | "insufficient";

export interface Band {
  id: BandId;
  label: string;
  /** Inclusive lower bound, tested against the unrounded score. */
  min: number;
  verdict: string;
}

/**
 * Bands are computed from the unrounded score; the number shown to the visitor is rounded to
 * the nearest 5. An eight-click instrument cannot justify two significant figures, and computing
 * the band from the raw value stops two visitors 0.4 points apart getting different verdict words.
 */
export const bands: Band[] = [
  {
    id: "strong",
    label: "Strong",
    min: 80,
    verdict: "This is close to the job I have done for the last twenty-five years.",
  },
  {
    id: "substantial",
    label: "Substantial",
    min: 65,
    verdict: "Most of what you described, with real gaps named below.",
  },
  {
    id: "partial",
    label: "Partial",
    min: 50,
    verdict: "Some overlap. Read the gaps first, they are the deciding part.",
  },
  {
    id: "weak",
    label: "Weak",
    min: 0,
    verdict: "Not a good match. The main things you raised are the things I have least evidence for.",
  },
];

/**
 * Returned in place of a real band when `sum(D) < DEMAND_FLOOR`: too many "I don't know" answers
 * (Q2, Q3) for the model to say anything about fit. Distinct from "weak", which is a measured
 * verdict. This is a refusal to measure, not a measurement.
 */
export const insufficientBand: Band = {
  id: "insufficient",
  label: "Not enough to go on",
  min: 0,
  verdict:
    "Too much of this came back \"I don't know\" for me to score it honestly. Answer the ones you can, or come back when you know the account's numbers.",
};

/**
 * The three permanent caveats. These render under their own heading, "Standing limitations,
 * shown on every result", separately from dimension-triggered gaps. Conflating the two turns a
 * finding about this visitor into boilerplate.
 */
export const standingGaps: string[] = [
  "The save evidence is the education decade's only. At the four roles before it, no account was recalled as having been saved from leaving.",
  "Accounts were lost on total cost against government-subsidised alternatives, Google Classroom and Microsoft 365.",
  "I founded a self-serve CMS for small businesses, put over $400,000 into it, and closed it. The misjudgement was assuming small-business owners knew how to build a site that converted.",
];

export const sectorCaveats: Record<string, string> = {
  a: "",
  b: "Most of my evidence is from selling software into schools rather than into software companies. The motion is the same; the buying committee is not.",
  c: "My agency years are the earlier part of the record. The deepest evidence is from the software decade that followed.",
  d: "My media years are 2001 to 2006. The commercial mechanics travel; the channel has changed underneath them.",
  e: "I have not sold into this sector. What travels is the account motion, not the domain knowledge, and you should discount accordingly.",
  f: "I have not sold into your sector. What travels is the account motion, not the domain knowledge, and you should discount accordingly.",
};

export interface NeedFromYou {
  /** Question id plus option id that triggers this, e.g. "q6:b". */
  trigger: string;
  text: string;
}

/**
 * Reverse mode. Without it the visitor answers questions and Brad is still the only one being
 * graded. Capped at three on the report. First person throughout.
 */
export const needsFromYou: NeedFromYou[] = [
  {
    trigger: "q6:b",
    text: "I would need the vendor relationship and a clear reporting line into it. Every retention number I have depends on owning the billing and the renewal conversation directly, and where I have not had that, the number was someone else's.",
  },
  {
    trigger: "q6:c",
    text: "I would need to know what you control and what the product owner controls, in writing. The terms I have negotiated were possible because I was the one at the table, not because I was passed the outcome.",
  },
  {
    trigger: "q3:a",
    text: "I would need the authority to move price, or an agreed date when that conversation happens. Holding accounts through an increase is evidenced. Holding them while nobody is allowed to raise the question is not the same job.",
  },
  {
    trigger: "q3:d",
    text: "I would need to be allowed to change payment terms, not just chase them. The cash-cycle work I can evidence was structural: deposits up front, annual billing in advance, buy-as-needed licensing.",
  },
  {
    trigger: "q5:c",
    text: "I would need to know who is generating the top of the funnel, because it will not be me at the volume this implies.",
  },
  {
    trigger: "q5:e",
    text: "I would need to understand what the activity target is protecting. I can evidence held and grown accounts; I cannot evidence a career measured on call volume.",
  },
  {
    trigger: "q2:e",
    text: "I would need to be honest that a company without two-year-old accounts is not where my evidence sits. Ask me again when the first cohort comes up for renewal, or hire me to build what happens when it does.",
  },
  {
    trigger: "q4:d",
    text: "I would need a marketing function, or the budget to be one. I have run demand generation, but the deepest evidence I have is about what happens after someone has heard of you.",
  },
  {
    trigger: "q1:c",
    text: "I would need to see where the existing book sits before agreeing that new customers are the only route. That is the question I would ask in the first week, and I might disagree with the answer.",
  },
  {
    trigger: "q8:c",
    text: "I would need a realistic first-quarter number and an honest account of what the pipeline looks like today. A pipeline of new names in six months is the thing I would be slowest to deliver.",
  },
];

export interface DimensionResult {
  id: DimensionId;
  label: string;
  stage: Stage;
  ceiling: number;
  /** Raw summed demand across all answers. */
  demand: number;
  /** demand / total demand, 0..1. This is what the bar plots. */
  share: number;
  /** True when demand >= 2 and ceiling <= 0.70: a real need Brad cannot meet. */
  isGap: boolean;
}

export interface FitResult {
  /** Unrounded 0-100. Bands are computed from this. */
  raw: number;
  /** Rounded to the nearest 5. This is what is shown. */
  display: number;
  band: Band;
  /** Only dimensions the answers actually raised, sorted by share descending. */
  raised: DimensionResult[];
  /** Dimensions never raised. Rendered as "You did not raise this", never scored. */
  notRaised: DimensionId[];
  gaps: DimensionResult[];
  needs: string[];
  sectorCaveat: string;
}

/**
 * The gap trigger. A dimension enters "Where I am not your person" when the visitor raised it
 * meaningfully and the ceiling cannot meet it. At the signed-off ceilings only `demand` (0.70)
 * and `new-logo-hunting` (0.30) can trip this.
 */
export const GAP_MIN_DEMAND = 2;
export const GAP_MAX_CEILING = 0.7;

/**
 * Minimum reachable sum(D) is 17 with every question answered with a scoring option. Below 8,
 * too many answers were "I don't know" or left unanswered for the score to mean anything.
 * Reinstated from the first draft now that every scored question carries an "I don't know"
 * option, making a low sum(D) reachable; see PLAN-fit-diagnostic.md §2, "Deferred: I don't know
 * skips".
 */
export const DEMAND_FLOOR = 8;

/**
 * Pure. No DOM, no side effects, no clock. `answers` maps question id to option id; unanswered
 * or unknown questions are ignored rather than throwing, so a corrupt share URL degrades to a
 * partial result instead of an exception.
 */
export function scoreFit(answers: Record<string, string>): FitResult {
  const demandTotals = new Map<DimensionId, number>();

  for (const question of scoredQuestions) {
    const chosen = question.options.find((o) => o.id === answers[question.id]);
    if (!chosen) continue;
    for (const [dimensionId, weight] of Object.entries(chosen.demand)) {
      const id = dimensionId as DimensionId;
      demandTotals.set(id, (demandTotals.get(id) ?? 0) + (weight ?? 0));
    }
  }

  const totalDemand = [...demandTotals.values()].reduce((sum, n) => sum + n, 0);

  if (totalDemand < DEMAND_FLOOR) {
    return {
      raw: 0,
      display: 0,
      band: insufficientBand,
      raised: [],
      // Empty, not every dimension: "not raised" is a finding about a real answer set, and this
      // one was not real enough to draw any conclusion from, including that one.
      notRaised: [],
      gaps: [],
      needs: [],
      sectorCaveat: "",
    };
  }

  const raised: DimensionResult[] = [];
  const notRaised: DimensionId[] = [];

  for (const dimension of dimensions) {
    const demand = demandTotals.get(dimension.id) ?? 0;
    if (demand <= 0) {
      notRaised.push(dimension.id);
      continue;
    }
    const share = totalDemand > 0 ? demand / totalDemand : 0;
    raised.push({
      id: dimension.id,
      label: dimension.label,
      stage: dimension.stage,
      ceiling: dimension.ceiling,
      demand,
      share,
      isGap: demand >= GAP_MIN_DEMAND && dimension.ceiling <= GAP_MAX_CEILING,
    });
  }

  raised.sort((a, b) => b.share - a.share || a.id.localeCompare(b.id));

  // Dimensions never raised are excluded entirely. Brad is never credited for a strength that
  // was not asked for.
  const achieved = raised.reduce((sum, r) => sum + r.share * r.ceiling, 0);

  const raw =
    totalDemand > 0
      ? Math.max(0, Math.min(100, (100 * (achieved - SCORE_FLOOR)) / (SCORE_ROOF - SCORE_FLOOR)))
      : 0;

  const band = bands.find((b) => raw >= b.min) ?? bands[bands.length - 1]!;

  const needs = needsFromYou
    .filter((need) => {
      const [questionId, optionId] = need.trigger.split(":");
      return questionId !== undefined && answers[questionId] === optionId;
    })
    .map((need) => need.text)
    .slice(0, 3);

  const sectorAnswer = answers["q7"];
  const sectorCaveat = sectorAnswer ? (sectorCaveats[sectorAnswer] ?? "") : "";

  return {
    raw,
    display: Math.round(raw / 5) * 5,
    band,
    raised,
    notRaised,
    gaps: raised.filter((r) => r.isGap),
    needs,
    sectorCaveat,
  };
}
