/**
 * @typedef {'monday'|'tuesday'|'wednesday'|'thursday'|'friday'} CalendarDay
 * @typedef {'morning'|'midday'|'afternoon'} CalendarSlot
 * @typedef {'commercial'|'implementation'|'enablement'|'marketing'|'support'|'finance'|'leadership'|'partnerships'} CategoryId
 * @typedef {'strategy'|'analysis'|'leadership'|'coordination'|'system-design'|'writing'|'hands-on'|'preparation'|'delivery'|'commercial-judgement'|'project-coordination'|'advisory'|'facilitation'|'learning-design'|'production'|'problem-solving'|'communication'|'technical-coordination'|'documentation'|'continuous-improvement'|'relationship-management'|'financial-modelling'|'negotiation'|'risk-management'|'governance'|'people-management'|'user-advocacy'} OperatingMode
 *
 * @typedef {Object} CategoryMeta
 * @property {string} label
 * @property {string} shortLabel
 * @property {string} color
 * @property {string} tint
 * @property {string} darkColor
 * @property {string} darkTint
 *
 * @typedef {Object} CalendarEntry
 * @property {string} id
 * @property {CalendarDay} day
 * @property {number} dayOrder
 * @property {CalendarSlot} slot
 * @property {number} slotOrder
 * @property {string} displayTime
 * @property {string} title
 * @property {string} summary
 * @property {string} detail
 * @property {CategoryId} primaryCategory
 * @property {CategoryId[]} relatedCategories
 * @property {OperatingMode[]} modes
 * @property {boolean} featured
 * @property {string[]} connections
 */

export const vocabulary = Object.freeze({
  days: Object.freeze(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
  slots: Object.freeze(['morning', 'midday', 'afternoon']),
  categories: Object.freeze([
    'commercial',
    'implementation',
    'enablement',
    'marketing',
    'support',
    'finance',
    'leadership',
    'partnerships'
  ]),
  modes: Object.freeze([
    'strategy',
    'analysis',
    'leadership',
    'coordination',
    'system-design',
    'writing',
    'hands-on',
    'preparation',
    'delivery',
    'commercial-judgement',
    'project-coordination',
    'advisory',
    'facilitation',
    'learning-design',
    'production',
    'problem-solving',
    'communication',
    'technical-coordination',
    'documentation',
    'continuous-improvement',
    'relationship-management',
    'financial-modelling',
    'negotiation',
    'risk-management',
    'governance',
    'people-management',
    'user-advocacy'
  ])
});

/** @type {Record<CategoryId, CategoryMeta>} */
export const categories = Object.freeze({
  commercial: {
    label: 'Commercial and sales',
    shortLabel: 'Commercial',
    color: '#9F3F22',
    tint: '#F4E5DE',
    darkColor: '#F19A75',
    darkTint: '#38251E'
  },
  implementation: {
    label: 'Implementation and technical delivery',
    shortLabel: 'Implementation',
    color: '#35657A',
    tint: '#E2EBEE',
    darkColor: '#85B5C7',
    darkTint: '#1D2E35'
  },
  enablement: {
    label: 'Customer enablement and training',
    shortLabel: 'Enablement',
    color: '#2F6E68',
    tint: '#DFECE9',
    darkColor: '#81BEB5',
    darkTint: '#1C302D'
  },
  marketing: {
    label: 'Marketing and community',
    shortLabel: 'Marketing',
    color: '#76526D',
    tint: '#EDE5EB',
    darkColor: '#C7A0BD',
    darkTint: '#30252E'
  },
  support: {
    label: 'Support and service design',
    shortLabel: 'Support',
    color: '#765713',
    tint: '#F0E9D8',
    darkColor: '#D5B564',
    darkTint: '#332D1E'
  },
  finance: {
    label: 'Finance, contracts and renewals',
    shortLabel: 'Finance',
    color: '#486844',
    tint: '#E4EBE1',
    darkColor: '#94BA8A',
    darkTint: '#243025'
  },
  leadership: {
    label: 'Leadership and governance',
    shortLabel: 'Leadership',
    color: '#555B61',
    tint: '#E7E8E9',
    darkColor: '#ADB4BA',
    darkTint: '#292C2E'
  },
  partnerships: {
    label: 'Partnerships and public sector',
    shortLabel: 'Partnerships',
    color: '#8A4A45',
    tint: '#F0E3E1',
    darkColor: '#D99A92',
    darkTint: '#352321'
  }
});

/** @type {CalendarEntry[]} */
export const calendarEntries = [
  {
    id: 'set-weekly-operating-priorities',
    day: 'monday',
    dayOrder: 1,
    slot: 'morning',
    slotOrder: 1,
    displayTime: 'Morning',
    title: 'Set the week’s operating priorities',
    summary: 'Read across pipeline, delivery, support, renewals and partner commitments before deciding where attention was needed.',
    detail: 'The week started with the whole operation in view, not a sales list in isolation. I compared movement, constraints and commitments across teams, then set the priorities and owners for the work that could not drift.',
    primaryCategory: 'leadership',
    relatedCategories: ['commercial', 'support', 'finance', 'partnerships'],
    modes: ['strategy', 'leadership', 'coordination'],
    featured: true,
    connections: ['consolidate-board-and-team-review']
  },
  {
    id: 'review-commercial-pipeline',
    day: 'monday',
    dayOrder: 1,
    slot: 'morning',
    slotOrder: 2,
    displayTime: 'Morning',
    title: 'Review the commercial pipeline',
    summary: 'Tested the quality of active opportunities and chose the next action for each one.',
    detail: 'Pipeline volume mattered less than whether an opportunity had a credible next step. The review separated promising work from noise, identified gaps in follow-up and set the outreach or supporting material needed to move a conversation forward.',
    primaryCategory: 'commercial',
    relatedCategories: ['marketing'],
    modes: ['strategy', 'analysis', 'coordination'],
    featured: false,
    connections: ['design-sales-follow-up-sequence']
  },
  {
    id: 'design-sales-follow-up-sequence',
    day: 'monday',
    dayOrder: 1,
    slot: 'midday',
    slotOrder: 1,
    displayTime: 'Midday',
    title: 'Design a sales follow-up sequence',
    summary: 'Wrote the call and email sequence, including timing, hand-offs and the material needed at each stage.',
    detail: 'This was part messaging and part operating system. I wrote the scripts and emails, mapped what should happen after each response and connected the sequence to demonstrations, presentations and proposals.',
    primaryCategory: 'commercial',
    relatedCategories: ['marketing'],
    modes: ['system-design', 'writing', 'hands-on'],
    featured: false,
    connections: ['review-commercial-pipeline', 'prepare-and-run-platform-demonstration']
  },
  {
    id: 'prepare-and-run-platform-demonstration',
    day: 'monday',
    dayOrder: 1,
    slot: 'afternoon',
    slotOrder: 1,
    displayTime: 'Afternoon',
    title: 'Prepare and run a platform demonstration',
    summary: 'Shaped the session around the prospect’s operating context rather than giving a standard product tour.',
    detail: 'Preparation covered more than the screens I would show. The demonstration connected the prospect’s priorities with implementation, onboarding, support and the commercial shape of a workable engagement.',
    primaryCategory: 'commercial',
    relatedCategories: ['implementation', 'enablement'],
    modes: ['preparation', 'delivery', 'commercial-judgement'],
    featured: false,
    connections: ['plan-new-customer-implementation']
  },
  {
    id: 'plan-new-customer-implementation',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'morning',
    slotOrder: 1,
    displayTime: 'Morning',
    title: 'Plan a new customer implementation',
    summary: 'Turned customer requirements into a staged delivery plan with clear responsibilities, dependencies and risks.',
    detail: 'A signed agreement still had to become a workable change programme. I set the sequence, clarified who owned each decision and linked technical delivery with leadership communication, onboarding and support readiness.',
    primaryCategory: 'implementation',
    relatedCategories: ['enablement', 'support', 'leadership'],
    modes: ['strategy', 'system-design', 'project-coordination'],
    featured: true,
    connections: ['guide-customer-leadership-onboarding', 'design-training-programme']
  },
  {
    id: 'guide-customer-leadership-onboarding',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'morning',
    slotOrder: 2,
    displayTime: 'Morning',
    title: 'Guide customer leadership onboarding',
    summary: 'Worked through the organisational choices leaders needed to make before wider adoption could succeed.',
    detail: 'The session focused on decisions, not feature coverage. Leaders worked through ownership, expectations and adoption priorities, while I adapted the discussion to the way their organisation actually operated.',
    primaryCategory: 'enablement',
    relatedCategories: ['implementation', 'leadership'],
    modes: ['advisory', 'facilitation', 'delivery'],
    featured: false,
    connections: ['plan-new-customer-implementation']
  },
  {
    id: 'design-training-programme',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'midday',
    slotOrder: 1,
    displayTime: 'Midday',
    title: 'Design the training programme',
    summary: 'Mapped different audiences to the right mix of workshops, webinars, video and self-directed learning.',
    detail: 'One course would not serve leaders, staff, students, parents and support teams equally well. The programme set a useful learning path for each audience and chose the format that best suited the decision or skill involved.',
    primaryCategory: 'enablement',
    relatedCategories: ['implementation', 'support'],
    modes: ['learning-design', 'strategy', 'production'],
    featured: false,
    connections: ['produce-workshop-and-learning-resources']
  },
  {
    id: 'produce-workshop-and-learning-resources',
    day: 'tuesday',
    dayOrder: 2,
    slot: 'afternoon',
    slotOrder: 1,
    displayTime: 'Afternoon',
    title: 'Produce workshop and learning resources',
    summary: 'Made the practical material needed for a live workshop and the learning that continued afterwards.',
    detail: 'The programme only became useful once the resources were clear enough to work without me in the room. I structured the workshop, wrote the supporting material and produced assets people could return to in their own time.',
    primaryCategory: 'enablement',
    relatedCategories: ['marketing'],
    modes: ['hands-on', 'writing', 'production'],
    featured: false,
    connections: ['design-training-programme']
  },
  {
    id: 'resolve-customer-support-escalation',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'morning',
    slotOrder: 1,
    displayTime: 'Morning',
    title: 'Resolve a customer support escalation',
    summary: 'Coordinated the immediate response while keeping communication, technical resolution and prevention in view.',
    detail: 'The first job was to understand the effect on the customer and establish a clear line of communication. From there, I coordinated the technical response, kept the customer informed and captured what needed to change after the issue was closed.',
    primaryCategory: 'support',
    relatedCategories: ['implementation'],
    modes: ['problem-solving', 'communication', 'technical-coordination'],
    featured: true,
    connections: ['improve-support-system']
  },
  {
    id: 'improve-support-system',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'midday',
    slotOrder: 1,
    displayTime: 'Midday',
    title: 'Improve the support system',
    summary: 'Turned recurring customer questions into clearer guidance, response standards and service expectations.',
    detail: 'Repeated enquiries pointed to a system problem, not a need to answer the same question faster. I updated the guidance and response approach so customers had a clearer path and the team had a more consistent way to help.',
    primaryCategory: 'support',
    relatedCategories: ['enablement', 'leadership'],
    modes: ['system-design', 'documentation', 'continuous-improvement'],
    featured: false,
    connections: ['resolve-customer-support-escalation']
  },
  {
    id: 'create-customer-communications-asset',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'midday',
    slotOrder: 2,
    displayTime: 'Midday',
    title: 'Create a customer communications asset',
    summary: 'Translated a technical capability into a concise resource people could understand and use.',
    detail: 'Product knowledge was only the starting point. The work involved deciding what the audience needed to know, removing technical clutter and producing the copy and visual structure hands-on.',
    primaryCategory: 'marketing',
    relatedCategories: ['enablement', 'implementation'],
    modes: ['communication', 'writing', 'hands-on'],
    featured: false,
    connections: []
  },
  {
    id: 'plan-professional-community-engagement',
    day: 'wednesday',
    dayOrder: 3,
    slot: 'afternoon',
    slotOrder: 1,
    displayTime: 'Afternoon',
    title: 'Plan professional community engagement',
    summary: 'Set the rhythm for a nationwide network of roughly 650 teachers and school leaders.',
    detail: 'The community needed to be useful without becoming another broadcast channel. I balanced practical resources, peer connection and facilitated discussion with the longer-term work of adoption, customer value and relationship continuity.',
    primaryCategory: 'marketing',
    relatedCategories: ['enablement', 'partnerships'],
    modes: ['strategy', 'communication', 'facilitation'],
    featured: false,
    connections: []
  },
  {
    id: 'model-prospective-agreement',
    day: 'thursday',
    dayOrder: 4,
    slot: 'morning',
    slotOrder: 1,
    displayTime: 'Morning',
    title: 'Model a prospective agreement',
    summary: 'Tested how the proposed commercial structure would affect delivery, licensing and longer-term customer value.',
    detail: 'A proposal had to work after it was signed, not only look attractive during the sale. I modelled the commercial implications, checked the delivery assumptions and used the result to shape the structure of the offer.',
    primaryCategory: 'finance',
    relatedCategories: ['commercial', 'implementation'],
    modes: ['financial-modelling', 'strategy', 'commercial-judgement'],
    featured: true,
    connections: ['shape-proposal-and-licence-terms']
  },
  {
    id: 'shape-proposal-and-licence-terms',
    day: 'thursday',
    dayOrder: 4,
    slot: 'morning',
    slotOrder: 2,
    displayTime: 'Morning',
    title: 'Shape proposal and licence terms',
    summary: 'Set out the offer, responsibilities and licence requirements without promising more than the operation could support.',
    detail: 'The documentation joined commercial intent to operational reality. I wrote the proposal structure, defined responsibilities and prepared the end-user licence requirements, checking each commitment against delivery, billing and renewal.',
    primaryCategory: 'commercial',
    relatedCategories: ['finance', 'implementation'],
    modes: ['writing', 'negotiation', 'risk-management'],
    featured: false,
    connections: ['model-prospective-agreement']
  },
  {
    id: 'plan-annual-renewal-cycle',
    day: 'thursday',
    dayOrder: 4,
    slot: 'midday',
    slotOrder: 1,
    displayTime: 'Midday',
    title: 'Plan the annual renewal cycle',
    summary: 'Reviewed adoption, support history, relationships, billing and future needs before setting the renewal approach.',
    detail: 'Renewal planning started well before a commercial conversation. The account view brought together how the service was being used, where friction remained and what the next period needed to account for.',
    primaryCategory: 'finance',
    relatedCategories: ['commercial', 'support'],
    modes: ['analysis', 'relationship-management', 'commercial-judgement'],
    featured: false,
    connections: ['review-billing-and-referral-systems']
  },
  {
    id: 'review-billing-and-referral-systems',
    day: 'thursday',
    dayOrder: 4,
    slot: 'afternoon',
    slotOrder: 1,
    displayTime: 'Afternoon',
    title: 'Review billing and referral systems',
    summary: 'Kept invoicing, payment follow-up and reciprocal referral activity aligned with customer and partner communication.',
    detail: 'Administration and relationship management met in the same operating system. I reviewed invoice and payment activity, followed exceptions through and kept reciprocal referral commitments moving with the partners involved.',
    primaryCategory: 'finance',
    relatedCategories: ['partnerships', 'commercial'],
    modes: ['system-design', 'hands-on', 'relationship-management'],
    featured: false,
    connections: ['plan-annual-renewal-cycle']
  },
  {
    id: 'coordinate-international-reseller-priorities',
    day: 'friday',
    dayOrder: 5,
    slot: 'morning',
    slotOrder: 1,
    displayTime: 'Morning',
    title: 'Coordinate international reseller priorities',
    summary: 'Aligned commercial, technical, marketing, support and renewal priorities with the international platform partner.',
    detail: 'The reseller relationship crossed several teams and could not be managed as a single commercial contact. I brought the relevant priorities into one conversation, negotiated points of difference and translated the outcome into local actions.',
    primaryCategory: 'partnerships',
    relatedCategories: ['commercial', 'implementation', 'support'],
    modes: ['relationship-management', 'negotiation', 'coordination'],
    featured: true,
    connections: ['set-weekly-operating-priorities']
  },
  {
    id: 'facilitate-government-funded-programme',
    day: 'friday',
    dayOrder: 5,
    slot: 'midday',
    slotOrder: 1,
    displayTime: 'Midday',
    title: 'Facilitate a government-funded programme',
    summary: 'Helped school leaders connect technology choices with teaching, learning and organisational priorities.',
    detail: 'The work sat between public programme requirements and the decisions a school needed to make for itself. As an accredited facilitator, I guided the discussion and delivered professional learning without reducing the session to product instruction.',
    primaryCategory: 'partnerships',
    relatedCategories: ['enablement', 'leadership'],
    modes: ['facilitation', 'advisory', 'delivery'],
    featured: false,
    connections: []
  },
  {
    id: 'review-integration-workflow',
    day: 'friday',
    dayOrder: 5,
    slot: 'midday',
    slotOrder: 2,
    displayTime: 'Midday',
    title: 'Review an integration workflow',
    summary: 'Refined a tool intended to reduce school database administration by tracing the work from user need to support.',
    detail: 'The review followed the full workflow rather than treating the integration as a technical object on its own. I brought user needs, data processes, implementation steps and likely support questions into the design discussion.',
    primaryCategory: 'implementation',
    relatedCategories: ['support', 'partnerships'],
    modes: ['system-design', 'technical-coordination', 'user-advocacy'],
    featured: false,
    connections: []
  },
  {
    id: 'consolidate-board-and-team-review',
    day: 'friday',
    dayOrder: 5,
    slot: 'afternoon',
    slotOrder: 1,
    displayTime: 'Afternoon',
    title: 'Consolidate the board and team review',
    summary: 'Brought performance, risks, priorities and resourcing into one view for leadership and the people doing the work.',
    detail: 'Reporting drew together commercial activity, customer delivery, financial position, operational risk and partner priorities. I prepared the leadership view, then used the same evidence to review workload and decisions across staff and external contractors.',
    primaryCategory: 'leadership',
    relatedCategories: ['finance', 'commercial', 'partnerships'],
    modes: ['governance', 'analysis', 'people-management'],
    featured: true,
    connections: ['set-weekly-operating-priorities']
  }
];
