/**
 * Representative week: V3 data model.
 *
 * Two-level taxonomy. Three pillars are the top-level grouping; twelve sub-categories sit
 * beneath them and are what an entry actually displays. A reader filters at either level:
 * click a pillar to take everything under it, or toggle individual sub-categories in any
 * combination.
 *
 * Colour is carried by the SUB-CATEGORY, not the pillar. Each pillar owns a hue family and
 * its children are steps within that family, so the palette reads as three groups of related
 * colours rather than twelve unrelated ones. See tokens.css for the derivation.
 *
 * Copy register (set 25 August 2026 after Brad rejected the previous pass): first person,
 * personable, plain. No epigram openers, no sales language, no figures, no named employer,
 * customer or school. Write it the way Brad would tell a colleague what the work was.
 *
 * @typedef {'monday'|'tuesday'|'wednesday'|'thursday'|'friday'} CalendarDay
 * @typedef {'morning'|'afternoon'} CalendarSlot
 * @typedef {'growth'|'delivery'|'operations'} PillarId
 *
 * @typedef {Object} PillarMeta
 * @property {string} label
 * @property {string} standfirst
 * @property {string} pillarKeyNote  Second line for the pillar-key section further down the
 *                                   page. Deliberately distinct from standfirst (which the
 *                                   filter panel also shows) so the two sections don't repeat
 *                                   each other verbatim.
 * @property {string[]} categories   Ordered child sub-category ids.
 *
 * @typedef {Object} CategoryMeta
 * @property {string} label          Full label, used in the filter tray and detail panel.
 * @property {string} shortLabel     Used on the card eyebrow where width is tight.
 * @property {string} chipLabel      Shortest form, for the filter tray. Twelve of these
 *                                   must fit one row at 1280px or the last four options
 *                                   are hidden from anyone who does not drag the row.
 * @property {PillarId} pillar
 *
 * @typedef {Object} CalendarEntry
 * @property {string} id
 * @property {CalendarDay} day
 * @property {CalendarSlot} slot
 * @property {string} displayTime
 * @property {string} title
 * @property {string} summary
 * @property {string} detail
 * @property {string} category       Sub-category id. Pillar is derived from it, never stored
 *                                   twice; a second copy is a second thing to keep in sync.
 * @property {string[]} alsoRanInto  Other pillars this work touched. Text in the panel only.
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
    standfirst: 'Finding the right schools, winning them, and keeping them at renewal time.',
    pillarKeyNote: 'Shows up as renewal conversations, the campaigns that feed the pipeline, and the reporting that tells us whether either is working.',
    categories: Object.freeze(['pipeline', 'targeting', 'campaigns', 'measurement'])
  },
  delivery: {
    label: 'Delivery',
    standfirst: 'Getting schools set up, trained and confident enough that the platform actually got used.',
    pillarKeyNote: 'Shows up as the technical setup, the training that follows it, and the support tickets that come after both.',
    categories: Object.freeze(['implementation', 'enablement', 'learning-design', 'support'])
  },
  operations: {
    label: 'Operations',
    standfirst: 'The money, the contracts, the vendor relationship and the team behind all of it.',
    pillarKeyNote: 'Mostly commercial work this week, contracts and pricing, plus the partner and internal-systems admin that sits behind the scenes.',
    categories: Object.freeze(['commercial', 'partnerships', 'people', 'systems'])
  }
});

/** @type {Record<string, CategoryMeta>} */
export const categories = Object.freeze({
  /* --- Growth ---------------------------------------------------------- */
  pipeline: {
    label: 'Pipeline and renewals',
    shortLabel: 'Pipeline',
    chipLabel: 'Pipeline',
    pillar: 'growth'
  },
  targeting: {
    label: 'Data and targeting',
    shortLabel: 'Targeting',
    chipLabel: 'Targeting',
    pillar: 'growth'
  },
  campaigns: {
    label: 'Campaigns and launches',
    shortLabel: 'Campaigns',
    chipLabel: 'Campaigns',
    pillar: 'growth'
  },
  measurement: {
    label: 'Measurement and attribution',
    shortLabel: 'Measurement',
    chipLabel: 'Metrics',
    pillar: 'growth'
  },

  /* --- Delivery -------------------------------------------------------- */
  implementation: {
    label: 'Technical implementation',
    shortLabel: 'Implementation',
    chipLabel: 'Technical',
    pillar: 'delivery'
  },
  enablement: {
    label: 'Customer enablement',
    shortLabel: 'Enablement',
    chipLabel: 'Enablement',
    pillar: 'delivery'
  },
  'learning-design': {
    label: 'Learning design and facilitation',
    shortLabel: 'Learning design',
    chipLabel: 'Learning',
    pillar: 'delivery'
  },
  support: {
    label: 'Support and service design',
    shortLabel: 'Support',
    chipLabel: 'Support',
    pillar: 'delivery'
  },

  /* --- Operations ------------------------------------------------------ */
  commercial: {
    label: 'Commercial and finance',
    shortLabel: 'Commercial',
    chipLabel: 'Commercial',
    pillar: 'operations'
  },
  partnerships: {
    label: 'Partnerships and suppliers',
    shortLabel: 'Partnerships',
    chipLabel: 'Partners',
    pillar: 'operations'
  },
  people: {
    label: 'People and resourcing',
    shortLabel: 'People',
    chipLabel: 'People',
    pillar: 'operations'
  },
  systems: {
    label: 'Systems and governance',
    shortLabel: 'Systems',
    chipLabel: 'Systems',
    pillar: 'operations'
  }
});

/** Flat ordered list, pillar order preserved. Used to build the filter tray. */
export const categoryOrder = Object.freeze(
  vocabulary.pillars.flatMap((pillar) => pillars[pillar].categories)
);

/** @type {CalendarEntry[]} */
export const calendarEntries = Object.freeze([
  /* ---------------------------------------------------------------- GROWTH */
  {
    id: 'schools-database-segmentation',
    day: 'monday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Schools database: update key contacts',
    summary: 'Update the database of New Zealand schools that tells us who to talk to, and about what.',
    detail:
      'Keep the database of schools across New Zealand current: principals, roll size, region, school type. Whenever we plan outreach or a launch, it starts here. Which schools does this actually suit, and who at those schools should hear about it first? Done properly, a school hears from us about something relevant to them, not another generic vendor email.',
    category: 'targeting',
    alsoRanInto: ['operations'],
    connections: ['sales-strategy-pipeline-review', 'feature-launch-media']
  },
  {
    id: 'sales-strategy-pipeline-review',
    day: 'monday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Sales pipeline review',
    summary: 'Go through every open opportunity and check the next step is real.',
    detail:
      'Sit down with the pipeline once a week and be honest about it. Some opportunities need a call, some need a proposal, some need to be parked because the school is not going to move this year. Doing that every week keeps the pipeline something I can plan the business around, not a list of hopeful names.',
    category: 'pipeline',
    alsoRanInto: ['operations'],
    connections: ['schools-database-segmentation', 'proposals-and-eulas', 'growth-metrics-conversion-tracking']
  },
  {
    id: 'feature-launch-media',
    day: 'tuesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'New feature launch: media and promotion plan',
    summary: 'Prepare the launch material for a new billable feature and plan how customers will hear about it.',
    detail:
      'The platform has a new feature we can bill for, so shape the launch around it: a one-pager, an email sequence, a short video showing what the feature does in a real school context, and a plan for which customers hear about it first. A feature only becomes revenue when schools understand what it does for them, so plan the promotion, the training and the pricing together as one piece of work.',
    category: 'campaigns',
    alsoRanInto: ['delivery', 'operations'],
    connections: ['feature-training-design', 'feature-billing-plan', 'marketing-automation-review']
  },
  {
    id: 'network-building-partner-calls',
    day: 'tuesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Teacher network and partner calls',
    summary: 'Keep up the nationwide network of teachers and school leaders that most of our referrals come through.',
    detail:
      'Run calls with the network of teachers and school leaders across the country who use it to share resources and ideas with each other. Keep the relationships genuine: help people with things that have nothing to sell attached. Most of our best introductions come from someone in that network mentioning us to a colleague, and that only happens if I am useful to people between sales.',
    category: 'pipeline',
    alsoRanInto: ['delivery'],
    connections: ['sales-strategy-pipeline-review', 'funded-programme-facilitation']
  },
  {
    id: 'renewal-board-prep',
    day: 'wednesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Contract renewal: prepare for a school board',
    summary: 'Put together the case for a school board deciding whether to renew their contract.',
    detail:
      'This school’s contract is up for renewal and the decision sits with their board, so prepare for it properly. What has the school actually used? What has changed since they signed? What will the renewal cost, and why? A board deserves a clear, honest account, and renewals are where a business like this lives or dies. Never treat one as a formality.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['renewal-board-presentation', 'annual-uplift-planning']
  },
  {
    id: 'proposals-and-eulas',
    day: 'wednesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Proposals and licence agreements',
    summary: 'Write the proposal and agreement that turn a good conversation into a signed customer.',
    detail:
      'Write our proposals and end-user licence agreements myself. Shape each proposal to the school it is going to: their size, their situation, what they told me they are trying to fix, not something assembled from a template. The agreement side matters just as much. Clear terms up front mean fewer surprises later, for the school and for us.',
    category: 'pipeline',
    alsoRanInto: ['operations'],
    connections: ['sales-strategy-pipeline-review', 'sla-billing-strategy']
  },
  {
    id: 'lead-generation-hooks-assets',
    day: 'thursday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Sales assets and lead generation review',
    summary: 'Check which of our materials are starting real conversations, and fix the ones that are not.',
    detail:
      'I make all of our sales material: presentations, demos, phone scripts, email sequences. Once it is in use, pay attention to what it actually produces. An asset generating downloads but no conversations gets rewritten or retired. The test is always the same: does this start a conversation with a school we genuinely suit?',
    category: 'measurement',
    alsoRanInto: ['delivery'],
    connections: ['marketing-automation-review', 'feature-launch-media', 'ai-feature-website-content']
  },
  {
    id: 'marketing-automation-review',
    day: 'thursday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Email marketing and automation',
    summary: 'Keep the automated email sequences matched to the schools they were written for.',
    detail:
      'Our email sequences are written for particular school profiles, and they drift out of date quietly as those profiles change. Review the triggers, the timing and the hand-off points, so a principal gets messaging that fits their school and a real person picks up the conversation at the moment interest is highest.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['lead-generation-hooks-assets', 'feature-launch-media']
  },
  {
    id: 'renewal-board-presentation',
    day: 'friday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Present a renewal to a school board',
    summary: 'Stand in front of a school’s board and make the case for another term.',
    detail:
      'A board meeting is a different room from a staffroom. Governors want to know what the school got, what it costs, and why it is still the right choice, and they ask direct questions. Present the renewal case in person and answer plainly. In the end a renewal is won by everything the school experienced over the term, but it still has to be presented well in that room.',
    category: 'pipeline',
    alsoRanInto: ['operations'],
    connections: ['renewal-board-prep', 'customer-onboarding-sessions']
  },
  {
    id: 'growth-metrics-conversion-tracking',
    day: 'friday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Growth metrics and conversion tracking',
    summary: 'Track which kinds of schools become customers who stay, and put the effort there.',
    detail:
      'The useful question is never how many leads came in; it is which kinds of schools become customers who stay. Track that from first contact through to renewal. It tells us where to put effort next and what to stop spending time on, and it means that when I report to the board, the numbers have a story I can stand behind.',
    category: 'measurement',
    alsoRanInto: ['operations'],
    connections: ['sales-strategy-pipeline-review', 'board-reporting-compilation']
  },

  /* -------------------------------------------------------------- DELIVERY */
  {
    id: 'funded-programme-facilitation',
    day: 'monday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'MoE funded leadership training',
    summary: 'Deliver Ministry of Education funded training and strategic guidance in schools.',
    detail:
      'I am an accredited Ministry of Education facilitator, so schools can use Ministry funding to bring me in for training and digital strategy work. Deliver those sessions myself and keep the programme to what the funding requires: genuinely useful help for the school, with the reporting side kept clean without taking over the room.',
    category: 'learning-design',
    alsoRanInto: ['operations'],
    connections: ['customer-onboarding-sessions', 'moe-integration-tool']
  },
  {
    id: 'technical-implementation-new-accounts',
    day: 'monday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Technical implementation update: new schools',
    summary: 'Plan and run the technical setup that turns a signed agreement into a working platform.',
    detail:
      'A new school signing up starts the real work. Plan the implementation sequence, agree who owns which decision on the school’s side, and make sure the technical configuration matches how the school actually intends to use the platform. Getting this right up front is the difference between a school that adopts and a school that stalls.',
    category: 'implementation',
    alsoRanInto: ['operations'],
    connections: ['customer-onboarding-sessions', 'implementation-blockers-qa']
  },
  {
    id: 'feature-training-design',
    day: 'tuesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'New feature: design the training',
    summary: 'Shape the training that goes out with the new billable feature: video, self-paced material, workshops.',
    detail:
      'Design the training to go with the feature we are launching: short videos, self-paced material and workshop content, depending on who the audience is. Schools do not keep paying for a feature they cannot confidently use, so the training is part of the product, not an afterthought. Have it ready before the first customer hears the announcement.',
    category: 'learning-design',
    alsoRanInto: ['growth', 'operations'],
    connections: ['feature-launch-media', 'feature-billing-plan', 'support-team-briefing']
  },
  {
    id: 'customer-onboarding-sessions',
    day: 'tuesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Customer onboarding sessions',
    summary: 'Run onboarding across every group in a school: leadership, staff, students, parents, support staff.',
    detail:
      'Onboarding a school means onboarding everyone in it, and each group needs something different. Leadership needs to make the decisions a rollout depends on; staff need to see what will change day to day; students, parents and support staff each have their own path. Run these sessions myself. The schools where this gets done properly are the schools that renew without drama.',
    category: 'enablement',
    alsoRanInto: ['operations'],
    connections: ['technical-implementation-new-accounts', 'bespoke-onboarding-design', 'support-materials-updates']
  },
  {
    id: 'support-team-briefing',
    day: 'wednesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Support team briefing: the new feature',
    summary: 'Walk the support team through the new feature and agree how we will support it.',
    detail:
      'Before the new feature reaches customers, sit down with the support team and go through it properly: what it does, what schools are likely to ask, what can go wrong, and how we will handle each of those. Support finding out about a feature from a confused customer is a failure you can prevent with one meeting, so the support plan ships with the feature, not after it.',
    category: 'support',
    alsoRanInto: ['operations'],
    connections: ['feature-training-design', 'support-materials-updates']
  },
  {
    id: 'support-materials-updates',
    day: 'wednesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Support materials and resources',
    summary: 'Keep the help material current so the same question stops arriving as a ticket.',
    detail:
      'Design and write our support materials, then keep them honest. When the same question keeps coming through as a ticket, that is the material failing, not the customer, so rewrite the piece that did not answer it and keep everything aligned with the platform as it changes. Good support material is the cheapest support person you will ever hire.',
    category: 'support',
    alsoRanInto: ['operations'],
    connections: ['support-team-briefing', 'customer-onboarding-sessions', 'implementation-blockers-qa']
  },
  {
    id: 'moe-integration-tool',
    day: 'thursday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Ministry integration tool: design and support',
    summary: 'Design and support a tool that takes days of manual database work off every school that uses it.',
    detail:
      'Schools are losing days of manual database work getting their student data where it needs to be. Design an integration tool that connects the platform to the Ministry of Education’s systems and does that work for them, and provide the technical support behind it. Nobody asked for this one. I noticed the problem, got the fix made, and every school that uses it gets days of their year back.',
    category: 'implementation',
    alsoRanInto: ['operations'],
    connections: ['funded-programme-facilitation', 'technical-implementation-new-accounts', 'implementation-blockers-qa']
  },
  {
    id: 'bespoke-onboarding-design',
    day: 'thursday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Design a bespoke onboarding path',
    summary: 'Shape an onboarding plan around a particular school, rather than run a standard rollout.',
    detail:
      'No two schools adopt a platform the same way. A small rural school and a large city college need different first steps, different pacing and different training formats. Design each customer’s onboarding path around their size, their staff’s confidence and what they want the platform to do first. It is slower to prepare than a standard rollout, and much faster to succeed.',
    category: 'enablement',
    alsoRanInto: ['operations'],
    connections: ['customer-onboarding-sessions', 'feature-training-design']
  },
  {
    id: 'implementation-blockers-qa',
    day: 'friday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Implementation blockers and QA',
    summary: 'Clear what is holding live implementations up, and fix the causes, not just the cases.',
    detail:
      'Every week some implementations have something stuck: a data issue, a configuration question, a decision waiting on someone. Work through the open ones and clear what can be cleared. Just as important is spotting when the same blocker shows up twice, because that means the process needs fixing so the next school never meets it.',
    category: 'support',
    alsoRanInto: ['operations'],
    connections: ['technical-implementation-new-accounts', 'moe-integration-tool', 'support-materials-updates']
  },
  {
    id: 'delivery-capacity-planning',
    day: 'friday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Delivery capacity planning',
    summary: 'Match what sales is about to close against what we can actually deliver well.',
    detail:
      'Selling past your ability to deliver is the fastest way to lose the customers you already have. Map the committed implementations and training against the time we actually have, and feed the honest answer back into the sales side. Sometimes that means slowing a deal down so the school’s experience holds up. It always pays for itself at renewal.',
    category: 'implementation',
    alsoRanInto: ['growth', 'operations'],
    connections: ['sales-strategy-pipeline-review', 'resource-allocation']
  },

  /* ------------------------------------------------------------ OPERATIONS */
  {
    id: 'sla-billing-strategy',
    day: 'monday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Service agreements and billing review',
    summary: 'Keep what we promise in writing lined up with what we can actually deliver.',
    detail:
      'I design our service agreements, billing and invoicing, and review them regularly against reality. A service level agreement is a promise with a signature on it, so check what we have committed to against what we are resourced to provide, and adjust the billing structure as the customer base grows. Keeping the paperwork honest means renewals never turn into arguments.',
    category: 'commercial',
    alsoRanInto: ['delivery'],
    connections: ['financial-strategy-forecasting', 'proposals-and-eulas', 'delivery-capacity-planning']
  },
  {
    id: 'financial-strategy-forecasting',
    day: 'monday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Financial strategy and forecasting',
    summary: 'Model the year around the school funding cycle rather than a straight line.',
    detail:
      'School budgets run on their own calendar, and it does not look like a standard sales year. Shape our financial projections around when schools can actually commit money. That changes when we invest in pipeline and how we staff delivery through the quieter months. The forecasting is mine end to end: modelling, projections and the decisions that come out of them.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['sla-billing-strategy', 'annual-uplift-planning', 'board-reporting-compilation']
  },
  {
    id: 'feature-billing-plan',
    day: 'tuesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'New feature: billing and outbound comms',
    summary: 'Work out what the new feature will cost customers and how it will be billed.',
    detail:
      'The last piece of the feature launch is the money: what schools will pay, how it will sit on their invoice, and how it will roll into their renewal. Set the pricing so it is fair for a small school and a large one, and make sure the promotion, the training and the billing land as one coherent experience, so a customer hears about the feature, learns it, and pays for it without any part feeling bolted on.',
    category: 'commercial',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['feature-launch-media', 'feature-training-design', 'annual-uplift-planning']
  },
  {
    id: 'ai-feature-website-content',
    day: 'tuesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Website content for a new AI feature',
    summary: 'Write the copy and source the imagery that make a new AI feature land as a benefit, not a buzzword.',
    detail:
      'The platform is shipping a new AI feature and the website page announcing it is mine: the copy, the imagery, the whole argument for why a school should care. "AI" on its own means nothing to a principal, so the page has to earn its place by naming the actual problem it removes and showing, not claiming, what changes for a teacher who uses it. That is the difference between a feature page and a hype page.',
    category: 'campaigns',
    alsoRanInto: ['delivery'],
    connections: ['feature-launch-media', 'lead-generation-hooks-assets']
  },
  {
    id: 'international-reseller-sync',
    day: 'wednesday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'International vendor relationship',
    summary: 'Work directly with the platform’s international vendor: roadmap, licensing, reseller terms.',
    detail:
      'We resell an international platform, so part of every week is working with the vendor: what is on their roadmap, what needs adapting for New Zealand schools, and what our licensing and reseller terms need to be. I am the single point of contact across their sales, technical, support and leadership teams, and I negotiate and renew the partnership contract itself.',
    category: 'partnerships',
    alsoRanInto: ['delivery', 'growth'],
    connections: ['operational-workflows-tooling', 'annual-uplift-planning', 'board-reporting-compilation']
  },
  {
    id: 'vendor-supplier-management',
    day: 'wednesday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Suppliers and contractors',
    summary: 'Hold our suppliers and contractors to dates and standards, so their slippage never reaches a customer.',
    detail:
      'Beyond the platform vendor there is a ring of suppliers and contractors: production, print, technical contractors, service providers. A supplier missing a deadline becomes my missed deadline in the customer’s eyes, so keep timelines explicit, review the work against what was agreed, and replace relationships that repeatedly cost us. Referral partners sit in this mix too, and those I invest in.',
    category: 'partnerships',
    alsoRanInto: ['delivery'],
    connections: ['international-reseller-sync', 'operational-workflows-tooling']
  },
  {
    id: 'operational-workflows-tooling',
    day: 'thursday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Operational workflows and tooling',
    summary: 'Turn the processes that run on memory into processes that run on a system.',
    detail:
      'Any process that only works because a particular person remembers it is a risk waiting for someone’s leave to fall due. Document and rebuild the recurring workflows: onboarding, renewals, handover, so they run off a system rather than off recall. Unglamorous work, but it is why the operation can scale without me becoming the bottleneck.',
    category: 'systems',
    alsoRanInto: ['delivery'],
    connections: ['international-reseller-sync', 'resource-allocation']
  },
  {
    id: 'resource-allocation',
    day: 'thursday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Resource allocation',
    summary: 'Set the week’s priorities against real availability, and say out loud what we will not do.',
    detail:
      'Allocation is mostly the discipline of naming what gets dropped. Set the week’s commitments against the time we actually have, and make the trade-offs visible, so nobody is quietly holding three things that have each been called the priority. A visible plan gives the team something to push back on. An assumption does not.',
    category: 'people',
    alsoRanInto: ['delivery'],
    connections: ['delivery-capacity-planning']
  },
  {
    id: 'board-reporting-compilation',
    day: 'friday',
    slot: 'morning',
    displayTime: 'Morning',
    title: 'Board reporting',
    summary: 'Write the regular report to the board, including the parts that are not going well.',
    detail:
      'Report regularly to the board, and write those reports to be acted on, not admired. Performance, pipeline, delivery and finances go in as they are, including the problems, while they are still small enough to fix. A report that requires no response from the board is a report that was not worth writing.',
    category: 'systems',
    alsoRanInto: ['growth'],
    connections: ['financial-strategy-forecasting', 'growth-metrics-conversion-tracking']
  },
  {
    id: 'annual-uplift-planning',
    day: 'friday',
    slot: 'afternoon',
    displayTime: 'Afternoon',
    title: 'Annual uplift and exchange-rate planning',
    summary: 'Plan the annual price uplift so exchange-rate movement does not quietly eat the margin.',
    detail:
      'Our licensing costs are in a foreign currency and our customers pay in New Zealand dollars, so exchange-rate movement goes straight to the margin unless it is planned for. Each year work through the uplift: what our costs have actually done, what increase customers need to see to hold our margin, and how to communicate it so a school understands the reason, rather than just receiving a bigger invoice with no explanation.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['financial-strategy-forecasting', 'feature-billing-plan', 'renewal-board-prep']
  }
]);
