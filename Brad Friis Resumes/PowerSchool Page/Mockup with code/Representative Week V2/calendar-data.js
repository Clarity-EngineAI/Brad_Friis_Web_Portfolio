/**
 * Representative week — V2 data model.
 *
 * Same shape as the V1 file so the content stays portable to Astro or React: stable
 * kebab-case id, explicit day and slot ordering, a scannable summary, an expanded detail,
 * one primary pillar and a small set of explicit connections.
 *
 * The eight flat categories of V1 are replaced by three pillars. Every entry belongs to
 * exactly one. `relatedPillars` records where a piece of work touched the other two —
 * it is shown as text in the detail panel, never as a second colour.
 *
 * @typedef {'monday'|'tuesday'|'wednesday'|'thursday'|'friday'} CalendarDay
 * @typedef {'morning'|'afternoon'} CalendarSlot
 * @typedef {'growth'|'delivery'|'operations'} PillarId
 *
 * @typedef {Object} PillarMeta
 * @property {string} label
 * @property {string} shortLabel
 * @property {string} standfirst
 *
 * @typedef {Object} CalendarEntry
 * @property {string} id
 * @property {CalendarDay} day
 * @property {number} dayOrder
 * @property {CalendarSlot} slot
 * @property {string} displayTime
 * @property {string} title
 * @property {string} summary
 * @property {string} detail
 * @property {PillarId} pillar
 * @property {PillarId[]} relatedPillars
 * @property {string[]} connections
 */

export const vocabulary = Object.freeze({
  days: Object.freeze(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
  slots: Object.freeze(['morning', 'afternoon']),
  pillars: Object.freeze(['growth', 'delivery', 'operations'])
});

/** @type {Record<PillarId, PillarMeta>} */
export const pillars = Object.freeze({
  growth: {
    label: 'Growth',
    shortLabel: 'Growth',
    standfirst: 'Where the pipeline came from, and how it was qualified before anyone picked up a phone.'
  },
  delivery: {
    label: 'Delivery',
    shortLabel: 'Delivery',
    standfirst: 'What a customer actually received: implementation, enablement and the material behind it.'
  },
  operations: {
    label: 'Operations',
    shortLabel: 'Operations',
    standfirst: 'The commercial and logistical systems that let the other two run without supervision.'
  }
});

/** @type {CalendarEntry[]} */
export const calendarEntries = Object.freeze([
  /* ---------------------------------------------------------------- GROWTH */
  {
    id: 'schools-database-segmentation',
    day: 'monday',
    dayOrder: 1,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Schools database: roll and region segmentation',
    summary: 'Built and maintained the segmentation that turned a contact list into a targeting system.',
    detail:
      'I required a precise lead generation engine, not a generic mailing list. I built and maintained a comprehensive database of New Zealand school principals, segmenting the data tightly by school roll count, geographic region, and school type. This architecture allowed us to tailor our commercial messaging to specific school profiles, equipping the sales team with high-context leads and clear entry points rather than relying on cold, unsegmented outreach.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['sales-strategy-pipeline-review', 'targeted-pre-event-outreach']
  },
  {
    id: 'sales-strategy-pipeline-review',
    day: 'monday',
    dayOrder: 1,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Sales strategy and pipeline review',
    summary: 'Tested each open opportunity for a credible next step and set the action that would produce one.',
    detail:
      'Pipeline volume mattered less than whether an opportunity had a defensible next step. The review separated real intent from activity, identified where follow-up had stalled, and assigned the outreach or supporting material needed to move each conversation forward.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['schools-database-segmentation', 'growth-metrics-conversion-tracking']
  },
  {
    id: 'national-conference',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'National conference',
    summary: 'Planned the stand and the message around it for the one event where most of the sector is in one building.',
    detail:
      'Once a year the sector turns up in one place, which makes the stand a filter before it is a display. I set the concept, layout and messaging so the space drew in the school profiles we had segmented for, then sequenced the pre-event, on-site and post-event messaging as one campaign so a delegate met the same argument at each point rather than three disconnected ones.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['conference-logistics-stand-build', 'targeted-pre-event-outreach', 'post-conference-follow-up-workflows']
  },
  {
    id: 'network-building-partner-calls',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Network building and key partner calls',
    summary: 'Kept the relationships that generate referrals warm in the months when nothing was being sold.',
    detail:
      'Referral flow is a function of who remembers you when a decision comes up. These calls maintained the sector relationships that produced introductions, and fed back what schools were about to face before it reached a tender document.',
    pillar: 'growth',
    relatedPillars: ['delivery'],
    connections: ['sales-strategy-pipeline-review']
  },
  {
    id: 'targeted-pre-event-outreach',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Targeted pre-event outreach',
    summary: 'Booked stand conversations in advance against the segmented list instead of waiting on foot traffic.',
    detail:
      'Walk-up traffic is the least efficient part of an event. I ran outreach against the segmented database ahead of time so the highest-value profiles arrived with a reason to visit and a time to do it, which changed the stand from a display into a schedule.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['schools-database-segmentation', 'national-conference']
  },
  {
    id: 'lead-generation-hooks-assets',
    day: 'thursday',
    dayOrder: 4,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Lead generation hooks and asset review',
    summary: 'Audited which assets were producing qualified enquiries and which were producing downloads.',
    detail:
      'A hook that generates volume without intent costs more than it returns. I reviewed each asset against the quality of the conversation it started, retired the ones that only produced list growth, and rewrote the entry points that were attracting the wrong school profile.',
    pillar: 'growth',
    relatedPillars: ['delivery'],
    connections: ['marketing-automation-review', 'workshop-design-and-writing']
  },
  {
    id: 'marketing-automation-review',
    day: 'thursday',
    dayOrder: 4,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Marketing automation review',
    summary: 'Checked that the automated sequences were still matched to the segments they were written for.',
    detail:
      'Automation drifts out of alignment quietly as segments change. I reviewed the triggers, timing and hand-off points so a principal received messaging that matched their school profile and reached a person at the moment interest was highest.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['lead-generation-hooks-assets', 'post-conference-follow-up-workflows']
  },
  {
    id: 'post-conference-follow-up-workflows',
    day: 'friday',
    dayOrder: 5,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Post-event lead follow-up workflows',
    summary: 'Built the routing that turned event conversations into owned, dated next actions.',
    detail:
      'Most event pipeline is lost in the fortnight afterwards. I set the workflow that captured each conversation with its context, routed it to an owner, and put a dated next step against it before the team returned to normal operations.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['national-conference', 'post-workshop-discovery']
  },
  {
    id: 'growth-metrics-conversion-tracking',
    day: 'friday',
    dayOrder: 5,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Growth metrics and conversion tracking',
    summary: 'Traced conversion back to the segment and the entry point, so spend could be argued rather than defended.',
    detail:
      'The useful question was not how many leads arrived but which segment and which entry point produced customers who stayed. Tracking that end to end told us where to concentrate effort the following quarter and what to stop paying for.',
    pillar: 'growth',
    relatedPillars: ['operations'],
    connections: ['sales-strategy-pipeline-review', 'board-reporting-compilation']
  },

  /* -------------------------------------------------------------- DELIVERY */
  {
    id: 'funded-programme-facilitation',
    day: 'monday',
    dayOrder: 1,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Funded programme facilitation',
    summary: 'Facilitated externally funded professional learning inside the constraints the funding set.',
    detail:
      'Funded work carries obligations the customer did not choose. I facilitated the sessions and held the programme to what the funding required, so schools got usable practice change and the reporting obligations were met without becoming the point of the session.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['customer-onboarding-sessions']
  },
  {
    id: 'technical-implementation-new-accounts',
    day: 'monday',
    dayOrder: 1,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Technical implementation: new accounts',
    summary: 'Turned a signed agreement into a staged configuration plan with named owners and dependencies.',
    detail:
      'A signature is the start of the risk, not the end of it. I set the implementation sequence, clarified who owned each decision on the school side, and linked the technical configuration to the onboarding and support readiness that had to follow it.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['customer-onboarding-sessions', 'implementation-blockers-qa']
  },
  {
    id: 'workshop-design-and-writing',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Conference workshop design and writing',
    summary: 'Wrote the workshop to solve a real classroom problem and qualify the room at the same time.',
    detail:
      'A successful conference requires bridging the gap between high-level strategy and on-the-ground value. I wrote, designed, and presented our core conference workshops. Rather than delivering a standard product pitch, I structured the content to solve immediate educational challenges while embedding targeted lead generation hooks. This approach equipped attendees with actionable insights while simultaneously qualifying them for our sales pipeline.',
    pillar: 'delivery',
    relatedPillars: ['growth'],
    connections: ['workshop-rehearsals', 'workshop-presentation', 'lead-generation-hooks-assets']
  },
  {
    id: 'customer-onboarding-sessions',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Customer onboarding sessions',
    summary: 'Worked leadership through the decisions that had to be made before wider rollout could hold.',
    detail:
      'Onboarding fails on ownership, not on features. The sessions worked leadership through who owned which decision, what would change for staff, and what adoption would realistically look like in their school before anyone was asked to use the platform.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['technical-implementation-new-accounts', 'support-materials-updates']
  },
  {
    id: 'workshop-rehearsals',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Bespoke workshop rehearsals',
    summary: 'Rehearsed the sessions against the room they would actually be delivered in.',
    detail:
      'Rehearsal is where a workshop stops being a document. I ran the material against the constraints of the venue and the audience mix, cut what did not survive being said aloud, and made sure the timing held when the questions ran long.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['workshop-design-and-writing', 'workshop-presentation']
  },
  {
    id: 'support-materials-updates',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Support materials and resource updates',
    summary: 'Kept the self-serve material current so the same question stopped arriving as a ticket.',
    detail:
      'Recurring tickets are a documentation problem wearing a support costume. I tracked what people were asking, rewrote the material that had failed to answer it, and kept the resources aligned with the platform as it changed underneath them.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['customer-onboarding-sessions', 'implementation-blockers-qa']
  },
  {
    id: 'workshop-presentation',
    day: 'thursday',
    dayOrder: 4,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Conference workshop presentation',
    summary: 'Presented to a room of practitioners, with the sales conversation earned rather than inserted.',
    detail:
      'Delivering to a room of practitioners means the credibility is won in the first five minutes or not at all. I presented the material as a working session on a problem they already had, which made the commercial conversation afterwards a continuation rather than an interruption.',
    pillar: 'delivery',
    relatedPillars: ['growth'],
    connections: ['workshop-design-and-writing', 'post-workshop-discovery']
  },
  {
    id: 'post-workshop-discovery',
    day: 'thursday',
    dayOrder: 4,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Post-workshop Q&A and client discovery',
    summary: 'Used the questions the room asked as the discovery for what those schools actually needed.',
    detail:
      'The questions asked immediately after a session are the least filtered signal available. I treated the Q and A as discovery, captured what each school was actually trying to solve, and passed it into follow-up with the context intact rather than as a name on a list.',
    pillar: 'delivery',
    relatedPillars: ['growth'],
    connections: ['workshop-presentation', 'post-conference-follow-up-workflows']
  },
  {
    id: 'implementation-blockers-qa',
    day: 'friday',
    dayOrder: 5,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Implementation blockers and QA',
    summary: 'Cleared what was holding live implementations up and separated one-off faults from patterns.',
    detail:
      'Every blocked implementation is either an isolated fault or the first visible instance of a pattern. I worked through the open ones, resolved what could be resolved that week, and sent the patterns back into the configuration process so the next school did not meet them.',
    pillar: 'delivery',
    relatedPillars: ['operations'],
    connections: ['technical-implementation-new-accounts', 'support-materials-updates']
  },
  {
    id: 'delivery-capacity-planning',
    day: 'friday',
    dayOrder: 5,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Delivery capacity planning',
    summary: 'Matched what sales was about to close against what delivery could actually absorb.',
    detail:
      'Selling past your delivery capacity is the fastest way to lose the customers you already have. I mapped committed implementations and training against available time, and fed the honest limit back into the pipeline rather than discovering it after the contracts were signed.',
    pillar: 'delivery',
    relatedPillars: ['growth', 'operations'],
    connections: ['sales-strategy-pipeline-review', 'resource-allocation']
  },

  /* ------------------------------------------------------------ OPERATIONS */
  {
    id: 'sla-billing-strategy',
    day: 'monday',
    dayOrder: 1,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'SLA and billing strategy review',
    summary: 'Kept what we promised in writing aligned with what delivery could sustain.',
    detail:
      'A service level agreement is a delivery commitment written in commercial language. I reviewed what we had promised against what we were actually resourced to provide, and adjusted the billing structure so the terms stayed honest as the customer base grew.',
    pillar: 'operations',
    relatedPillars: ['delivery'],
    connections: ['financial-strategy-forecasting', 'delivery-capacity-planning']
  },
  {
    id: 'financial-strategy-forecasting',
    day: 'monday',
    dayOrder: 1,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Financial strategy and forecasting',
    summary: 'Modelled the year against the school funding cycle rather than against a straight line.',
    detail:
      'Education buying runs on a calendar that does not match a standard sales year. Forecasting had to account for when schools could actually commit budget, which changed both when we invested in pipeline and how we staffed delivery through the quieter months.',
    pillar: 'operations',
    relatedPillars: ['growth'],
    connections: ['sla-billing-strategy', 'board-reporting-compilation']
  },
  {
    id: 'conference-logistics-stand-build',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Conference logistics and stand build setup',
    summary: 'Ran the physical build end to end so the team on the day only had to talk to people.',
    detail:
      'Physical event presence requires strict logistical control to ensure a return on investment. I managed the end-to-end operational execution of our conference stand, from the initial build and physical setup to the breakdown. By standardising our event logistics and vendor timelines, I equipped the on-site team with a frictionless environment, allowing them to focus entirely on customer interactions and lead generation rather than troubleshooting operational delays.',
    pillar: 'operations',
    relatedPillars: ['growth'],
    connections: ['national-conference', 'vendor-supplier-management']
  },
  {
    id: 'staff-management-one-to-ones',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Staff management one-to-ones',
    summary: 'Held the individual conversations that keep a small team from absorbing problems silently.',
    detail:
      'In a team small enough that everyone is load-bearing, the one-to-one is the early warning system. These sessions surfaced where someone was carrying more than was visible, and what they needed to be able to make decisions without waiting on me.',
    pillar: 'operations',
    relatedPillars: ['delivery'],
    connections: ['resource-allocation', 'weekly-operations-review']
  },
  {
    id: 'international-reseller-sync',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'International partner sync',
    summary: 'Reconciled what the platform partner was planning with what the local market could absorb.',
    detail:
      'Reselling means operating between a product roadmap set elsewhere and a market with its own regulatory and calendar realities. These sessions reconciled the two: what was coming, what needed local adaptation, and what had to be renegotiated before it reached a customer.',
    pillar: 'operations',
    relatedPillars: ['delivery', 'growth'],
    connections: ['operational-workflows-tooling', 'board-reporting-compilation']
  },
  {
    id: 'vendor-supplier-management',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Vendor and supplier management',
    summary: 'Held suppliers to dates and standards so their slippage did not become our failure.',
    detail:
      'A supplier missing a deadline becomes your missed deadline in the customer\'s account of it. I kept the vendor timelines explicit and reviewed performance against them, so print, build and logistics arrived when the plan assumed they would.',
    pillar: 'operations',
    relatedPillars: ['growth'],
    connections: ['conference-logistics-stand-build']
  },
  {
    id: 'operational-workflows-tooling',
    day: 'thursday',
    dayOrder: 4,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Operational workflows and tooling',
    summary: 'Rebuilt the recurring processes that were still running on memory and goodwill.',
    detail:
      'Any process that only works because a particular person remembers it is a process that will fail while they are on leave. I documented and rebuilt the recurring workflows so handover, onboarding and renewals ran off a system rather than off individual recall.',
    pillar: 'operations',
    relatedPillars: ['delivery'],
    connections: ['international-reseller-sync', 'weekly-operations-review']
  },
  {
    id: 'resource-allocation',
    day: 'thursday',
    dayOrder: 4,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Resource allocation',
    summary: 'Decided what the team would not do that week, and said so explicitly.',
    detail:
      'Allocation is mostly the discipline of naming what gets dropped. I set the week\'s commitments against real availability and made the trade-offs visible, so nobody was quietly holding three priorities that had each been described as the priority.',
    pillar: 'operations',
    relatedPillars: ['delivery'],
    connections: ['delivery-capacity-planning', 'staff-management-one-to-ones']
  },
  {
    id: 'board-reporting-compilation',
    day: 'friday',
    dayOrder: 5,
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Board reporting compilation',
    summary: 'Wrote the report the board could act on, including the parts that were not going well.',
    detail:
      'Board reporting is an exercise in deciding what the reader needs to be able to decide. I compiled performance, pipeline and delivery into an account that named the problems while they were still small enough to be solved, rather than presenting a version that required no response.',
    pillar: 'operations',
    relatedPillars: ['growth'],
    connections: ['financial-strategy-forecasting', 'growth-metrics-conversion-tracking']
  },
  {
    id: 'weekly-operations-review',
    day: 'friday',
    dayOrder: 5,
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Weekly operations review',
    summary: 'Closed the week by testing whether the systems had held, not whether the tasks were done.',
    detail:
      'The task list closing out tells you very little. The review asked which processes had needed manual rescue that week, because those were the ones about to fail properly, and what the following week had to start with as a result.',
    pillar: 'operations',
    relatedPillars: ['growth', 'delivery'],
    connections: ['operational-workflows-tooling', 'staff-management-one-to-ones']
  }
]);
