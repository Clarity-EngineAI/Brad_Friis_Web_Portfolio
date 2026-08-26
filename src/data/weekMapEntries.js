/**
 * Map-only work from the August 2026 dictation. Not a representative week: these
 * entries have no day or slot. Copy register matches the calendar: first person,
 * personable, plain. No gated figures. No named employer.
 *
 * @typedef {import('./repWeekCalendar.js').CalendarEntry} CalendarEntry
 */

/** @type {CalendarEntry[]} */
export const mapEntries = Object.freeze([
  {
    id: 'partnership-contract',
    title: 'Partnership contract',
    summary: 'Nine months with the vendor’s Southeast Asian channel director: products, buy prices, New Zealand reseller terms.',
    detail:
      'The partnership contract was the job before the job. I sat with PowerSchool’s Southeast Asian channel director over about nine months until the products in the agreement, the buy prices, and the New Zealand reseller terms were something we could actually operate. The weekly vendor call is the residue of that. This is the negotiation itself.',
    category: 'partnerships',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['international-reseller-sync', 'buy-price-own-sell', 'direct-nz-invoicing', 'per-product-nz-gtm', 'powerschool-team-liaison', 'no-licence-minimum'],
    themes: ['relationships']
  },
  {
    id: 'direct-nz-invoicing',
    title: 'Direct New Zealand invoicing',
    summary: 'Customers billed here, in New Zealand dollars, so the relationship stayed local.',
    detail:
      'I held to invoicing customers in New Zealand rather than having the US bill them in US dollars. We were the only channel partner in PowerSchool’s programme allowed to do that. The point was the relationship: billing, renewals, new products, onboarding and training all stayed with the same contact, instead of a disjointed experience from a US invoice.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['partnership-contract', 'sla-billing-strategy', 'proposals-and-eulas', 'buy-price-own-sell'],
    themes: ['relationships']
  },
  {
    id: 'buy-price-own-sell',
    title: 'Own-sell licensing model',
    summary: 'Renegotiated the PowerSchool buy price and the right to set the New Zealand sell price.',
    detail:
      'When I started, the licensing model was the usual one: a buy price, PowerSchool billed the school, and the partner took a rebate. I renegotiated the buy price down and won the right to set the New Zealand sell price and invoice ourselves. Other partners in the programme stayed on vendor billing. This was the start of the role, not the later post-COVID contract.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['partnership-contract', 'direct-nz-invoicing', 'no-licence-minimum', 'international-reseller-sync']
  },
  {
    id: 'no-licence-minimum',
    title: 'No 500-licence minimum',
    summary: 'The vendor’s 500-licence floor would have locked out most New Zealand and Australian schools.',
    detail:
      'The US rule was a 500-licence minimum. A great many New Zealand and Australian schools sit well under that. I negotiated the floor away entirely, so a small school could buy what it actually needed. One school went on the books with 50 licences. A school of 180 students was never going to buy 500.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['buy-price-own-sell', 'partnership-contract', 'ecoco-school-finance', 'sales-strategy-pipeline-review']
  },
  {
    id: 'per-product-nz-gtm',
    title: 'Per-product New Zealand go-to-market',
    summary: 'Marketing, New Zealand sales billing, and how each product was presented here.',
    detail:
      'Each product in the agreement needed its own New Zealand go-to-market: the marketing, the sales billing, and the communication strategy for presenting it here. I treated those as one piece of work per product, not a US pack with a local logo stuck on.',
    category: 'campaigns',
    alsoRanInto: ['delivery', 'operations'],
    connections: ['partnership-contract', 'product-range-workshop', 'nz-product-training', 'nz-print-user-guides', 'nz-rebuild-us-design', 'feature-launch-media']
  },
  {
    id: 'product-range-workshop',
    title: 'Customer workshop on the product range',
    summary: 'One workshop for all customers, to present the different products in the agreement.',
    detail:
      'I ran a workshop for all of our customers to present the different products in the partnership. The job was to make the range legible in a New Zealand school context, not to walk through a vendor catalogue.',
    category: 'learning-design',
    alsoRanInto: ['growth'],
    connections: ['per-product-nz-gtm', 'nz-product-training', 'workshop-feedback-loop']
  },
  {
    id: 'nz-product-training',
    title: 'New Zealand training per product',
    summary: 'Training material around each product, written for New Zealand schools.',
    detail:
      'I designed training around each product and tailored it to New Zealand. That is a different job from training for a new billable feature launch. Each product in the range needed material a local school could actually use.',
    category: 'learning-design',
    alsoRanInto: ['growth'],
    connections: ['per-product-nz-gtm', 'product-range-workshop', 'nz-print-user-guides', 'feature-training-design', 'self-paced-course-library']
  },
  {
    id: 'nz-print-user-guides',
    title: 'Print media and user guides',
    summary: 'Print and user guides for each product, written for New Zealand.',
    detail:
      'Alongside the training, I originated print media and user guides for each product, again tailored to New Zealand rather than shipped from the US pack. Schools keep a printed guide long after a workshop slide has gone.',
    category: 'enablement',
    alsoRanInto: ['growth'],
    connections: ['nz-product-training', 'per-product-nz-gtm', 'support-materials-updates']
  },
  {
    id: 'powerschool-team-liaison',
    title: 'PowerSchool team liaison',
    summary: 'The ongoing work across their technical, marketing, enablement, sales and renewals teams.',
    detail:
      'The contract was one job. The ongoing work was sitting across PowerSchool’s technical, marketing, enablement, sales and renewals teams. I was the single point of contact on our side for all of those groups, not a ticket into one of them.',
    category: 'partnerships',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['partnership-contract', 'international-reseller-sync', 'usa-onsite-training', 'powerbuddy-campaign'],
    themes: ['relationships']
  },
  {
    id: 'usa-onsite-training',
    title: 'United States conferences and onsite training',
    summary: 'Four trips: New York twice, Seattle, Orlando. Face to face with the international team, the US teams, and other channel partners.',
    detail:
      'I travelled to the United States four times for conferences and onsite training: New York twice, Seattle, and Orlando. The work was relationships in the room — the international team, the US teams across departments, and other channel partners — not a Zoom that could have been an email.',
    category: 'partnerships',
    alsoRanInto: ['growth'],
    connections: ['powerschool-team-liaison', 'international-reseller-sync', 'conference-programme'],
    themes: ['relationships']
  },
  {
    id: 'customer-visits-nz-au',
    title: 'Customer visits, New Zealand and Australia',
    summary: 'On-site: how they used the products, training, and closer work with key staff and leadership.',
    detail:
      'I travelled several times around New Zealand and to Australia to sit with customers: how they were actually using the products, what they needed, training, and closer work with key staff and leadership. That is a different visit from the one five-campus week that saved a renewing account. This was the ongoing pattern.',
    category: 'enablement',
    alsoRanInto: ['growth'],
    connections: ['train-the-trainer', 'customer-onboarding-sessions', 'educators-who-moved', 'onboarding-sequence'],
    themes: ['relationships']
  },
  {
    id: 'train-the-trainer',
    title: 'Train the trainer',
    summary: 'A core group of educators in each organisation as the people new work went through.',
    detail:
      'I set up a train-the-trainer model: a core group of educators in each organisation as key contacts. Feature updates, training materials, technical support, and work with their IT teams on deeper integrations all went through that group, so the school could roll the platform out without me standing in every classroom.',
    category: 'enablement',
    alsoRanInto: ['operations'],
    connections: ['customer-visits-nz-au', 'onboarding-sequence', 'department-training', 'customer-onboarding-sessions', 'network-building-partner-calls'],
    themes: ['relationships']
  },
  {
    id: 'conference-programme',
    title: 'Conference programme',
    summary: 'Years as major sponsor, exhibitor, and presenter running workshops.',
    detail:
      'I attended multiple conferences as major sponsor, exhibitor, and presenter — running workshops for attendees, not only standing on a stand. The week’s “national conference” card is three days in one building. This is the programme across years.',
    category: 'campaigns',
    alsoRanInto: ['delivery'],
    connections: ['national-conference', 'nerf-conference-stand', 'schoology-event-app', 'speaker-edmond-otis', 'conference-concept-stand', 'conference-lead-capture'],
    themes: ['relationships']
  },
  {
    id: 'schoology-event-app',
    title: 'Schoology as the event app',
    summary: 'Over 1000 attendees used Schoology to book workshops and communicate during the event.',
    detail:
      'One year I negotiated for the Schoology app to be used by over 1000 attendees to book the workshops they wanted and to communicate during the event. That put the product in their hands for three days, in exchange for top-tier sponsorship and speaking rights on the main stage.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['conference-programme', 'national-conference', 'network-building-partner-calls']
  },
  {
    id: 'speaker-edmond-otis',
    title: 'Conference speaker: Edmond Otis',
    summary: 'Negotiated Edmond Otis onto a conference programme — 7th dan, sports psychologist.',
    detail:
      'I negotiated to have Edmond Otis speak at a conference. He is a 7th dan shotokan karate instructor and a sports psychologist, and he weaves the samurai and karate narrative into business performance and resilience. It sat on the same programme as the rest of the conference work, not as a novelty side booking.',
    category: 'campaigns',
    alsoRanInto: [],
    connections: ['conference-programme']
  },
  {
    id: 'nerf-conference-stand',
    title: 'Conference stand: Nerf range',
    summary: 'Pedagogical targets, Nerf guns, Raspberry Pi, a live leaderboard, and a final shootout.',
    detail:
      'I designed a conference stand as a Nerf range. Each target sat over a skull labelled with something schools actually care about — personal learning, student agency. The guns were wired with LEDs and electronics on a Raspberry Pi: points, a live leaderboard, teachers lining up to shoot. At the end of the conference the top two had a shootout with a crowd around it. The winner took an iPad for their school. When someone cleared every target, an audio file went “Winner, winner, chicken dinner!” and a light above it with that line started flashing.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['conference-programme', 'national-conference', 'conference-concept-stand', 'two-product-websites']
  },
  {
    id: 'two-product-websites',
    title: 'Two product websites',
    summary: 'Design, copy, and user journey end to end, with Calendly booking, updated as features changed.',
    detail:
      'I originated two websites: the design, the copy, and the user journey through them. Each let someone book a meeting with me in Calendly, and I kept them current as software features changed or landed. They did the job — leads and inquiries came in through them.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['direct-marketing-list', 'email-sequences-lists', 'problem-first-presentations', 'nerf-conference-stand', 'nz-rebuild-us-design']
  },
  {
    id: 'school-contact-database',
    title: 'School contact database',
    summary: 'Ministry of Education schools data, conference attendees, then a telemarketer for the names that actually matter.',
    detail:
      'I put the school list together from the Ministry of Education’s schools database — roll size, location, type of school — plus attendees from conferences. Then I hired a telemarketer to call schools and get the e-learning decision maker, the principal, and the office administrator, including extensions. The office administrator is the gatekeeper; knowing that name, and the name of the person you are trying to reach, is how a call gets put through. The week’s “update the database” card is keeping that list current. This is how it was made.',
    category: 'targeting',
    alsoRanInto: ['operations'],
    connections: ['schools-database-segmentation', 'direct-marketing-list', 'email-sequences-lists', 'phone-prospecting']
  },
  {
    id: 'direct-marketing-list',
    title: 'Direct marketing to the list',
    summary: 'Campaigns to the school contacts, always pushing for a discovery appointment.',
    detail:
      'I designed a direct marketing campaign against that list, always aimed at an appointment for a discovery call. The list was only useful if it turned into a conversation with the right person at a school we actually suited.',
    category: 'campaigns',
    alsoRanInto: [],
    connections: ['school-contact-database', 'two-product-websites', 'email-sequences-lists', 'problem-first-presentations']
  },
  {
    id: 'nz-rebuild-us-design',
    title: 'New Zealand rebuild of US marketing',
    summary: 'Take the vendor’s design and marketing material and remake it for New Zealand, as Schoology changed.',
    detail:
      'I took the material PowerSchool’s design and marketing department produced and remade it in a New Zealand context. It was ongoing: Schoology has a lot of facets, and staying current with features and changes as they came in was a large part of the job. A US pack does not speak to a New Zealand school until someone does that work.',
    category: 'campaigns',
    alsoRanInto: ['delivery'],
    connections: ['per-product-nz-gtm', 'two-product-websites', 'sold-nz-au-courses', 'feature-launch-media']
  },
  {
    id: 'sold-nz-au-courses',
    title: 'Sold New Zealand and Australian training courses',
    summary: 'Bought a US training module, remade it for NZ and AU schools, and sold it as another revenue line.',
    detail:
      'I bought a training module from the US that covered many aspects of the software, then reworked the self-paced and instructor-led courses — imagery, graphics, and copy — so they faced New Zealand and Australian schools and aligned to those curricula. Then I sold those courses into schools. That is a commercial line, not only enablement, and it is not the same artefact as training I wrote from scratch.',
    category: 'learning-design',
    alsoRanInto: ['growth', 'operations'],
    connections: ['nz-rebuild-us-design', 'nz-product-training', 'self-paced-course-library', 'feature-billing-plan']
  },
  {
    id: 'business-rebrand',
    title: 'Rebrand',
    summary: 'A full rebrand of the local business.',
    detail:
      'I led a total rebrand of the business: the identity the New Zealand and Australian operation showed to schools. It sat with the rest of the marketing and design work, not as a side project.',
    category: 'campaigns',
    alsoRanInto: [],
    connections: ['two-product-websites', 'nz-rebuild-us-design']
  },
  {
    id: 'self-serve-videos',
    title: 'Self-serve training videos',
    summary: 'Multiple tutorials, hosted on a private YouTube channel.',
    detail:
      'I originated a set of self-serve training video tutorials and hosted them on a private YouTube channel. Schools could send a teacher to a specific piece without waiting for the next workshop.',
    category: 'enablement',
    alsoRanInto: [],
    connections: ['nz-product-training', 'support-materials-updates', 'self-paced-course-library']
  },
  {
    id: 'schoology-educators-group',
    title: 'Schoology educators group',
    summary: 'An online group where teachers shared resources, tools, and pedagogical approaches.',
    detail:
      'I set up a Schoology educators group online where resources, teaching tools, and pedagogical approaches were shared among teachers. The week’s teacher-network card is the calls. This is the room those calls sat inside.',
    category: 'pipeline',
    alsoRanInto: ['delivery'],
    connections: ['network-building-partner-calls', 'nz-education-social-groups', 'social-media-strategy'],
    themes: ['relationships']
  },
  {
    id: 'covid-training-delivery',
    title: 'COVID on-site and webinar training',
    summary: 'Face-to-face and webinar training through lockdown, including one-to-one sessions with teachers who needed the platform for remote teaching.',
    detail:
      'I delivered on-site training and webinar sessions, particularly during COVID-19, including one-to-one sessions with teachers across New Zealand and Australia who needed the platform so they could keep teaching when students were at home. I designed the materials and then delivered them — in the room and on the webinar.',
    category: 'learning-design',
    alsoRanInto: ['growth'],
    connections: ['self-paced-course-library', 'funded-programme-facilitation', 'workshop-feedback-loop', 'customer-onboarding-sessions']
  },
  {
    id: 'self-paced-course-library',
    title: 'Self-paced course library',
    summary: 'Beginner, intermediate, and advanced for each topic, with graphics and copy aligned to NZ and AU curricula.',
    detail:
      'I designed a library of self-paced courses with beginner, intermediate, and advanced levels for each topic. The graphics and the copy are mine, written for New Zealand and Australian schools and aligned to those curriculum learning objectives. That is a different artefact from the US module I bought, remade, and sold.',
    category: 'learning-design',
    alsoRanInto: ['growth'],
    connections: ['covid-training-delivery', 'nz-product-training', 'sold-nz-au-courses', 'workshop-feedback-loop', 'feature-training-design']
  },
  {
    id: 'nz-referral-network',
    title: 'New Zealand referral network',
    summary: 'School facilitators and businesses that deal with schools, with leads moving both ways.',
    detail:
      'I set up a referral network across New Zealand of school facilitators and businesses that deal with schools. Those sources produced discovery meetings. I sent leads back the other way into the schools they worked with. This is not the Xchange network from an earlier decade. It is this role’s reciprocal web.',
    category: 'pipeline',
    alsoRanInto: ['operations'],
    connections: ['ecoco-school-finance', 'educators-who-moved', 'vendor-supplier-management', 'network-building-partner-calls'],
    themes: ['relationships']
  },
  {
    id: 'ecoco-school-finance',
    title: 'Ecoco school finance',
    summary: 'A deal with Ecoco so a school that could not buy outright could finance the product.',
    detail:
      'One of the referral partners was Ecoco, a finance company that finances schools. I set up a deal: if a school could not buy the product outright, they could finance it through Ecoco. That sat next to the small-school licensing work. A school that cannot write a cheque in one go is not the same as a school that does not want the product.',
    category: 'commercial',
    alsoRanInto: ['growth'],
    connections: ['nz-referral-network', 'no-licence-minimum', 'proposals-and-eulas']
  },
  {
    id: 'educators-who-moved',
    title: 'Educators who moved schools',
    summary: 'People I had already worked with took me to the next leadership team. On some occasions the product went in.',
    detail:
      'A number of educators I had worked with moved to other schools. When they did, they pulled me in to meet their leadership teams and present the product. On some occasions the product went into those schools on the back of that. Not a pattern I would dress up as a win rate — some occasions, which is still how a lot of this work actually moves.',
    category: 'pipeline',
    alsoRanInto: ['delivery'],
    connections: ['nz-referral-network', 'customer-visits-nz-au', 'train-the-trainer', 'problem-first-presentations'],
    themes: ['relationships']
  },
  {
    id: 'nz-education-social-groups',
    title: 'New Zealand education social groups',
    summary: 'In the sector’s own online rooms, then into meetings already informed.',
    detail:
      'I spent time in online social media groups for New Zealand education and used them to read the mood, the tone, and what was actually happening. That went into the pitch, so a meeting started from the sector as it was, not from a generic deck. These are rooms I joined. The Schoology educators group is one I set up.',
    category: 'targeting',
    alsoRanInto: ['growth'],
    connections: ['social-media-strategy', 'schoology-educators-group', 'problem-first-presentations', 'conference-concept-stand'],
    themes: ['relationships']
  },
  {
    id: 'email-sequences-lists',
    title: 'Email sequences to the lists',
    summary: 'Automation against conference attendees and the Ministry schools database, aimed at discovery meetings.',
    detail:
      'I designed email automation sequences that ran against conference attendee lists and the Ministry of Education schools database, looking for initial discovery meetings. The week’s automation card is keeping those sequences honest as school profiles change. This is what they were for.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['school-contact-database', 'direct-marketing-list', 'marketing-automation-review', 'two-product-websites', 'sales-system-from-nothing']
  },
  {
    id: 'conference-concept-stand',
    title: 'Conference concept and stand',
    summary: 'Concept from the current landscape, then the stand designed with printers and hire companies, plus the questions we asked on it.',
    detail:
      'For each conference I shaped a concept around the latest features and the values that would land given the education landscape at the time. Then I organised the stand itself with screen printers and hire companies, and the communication strategy on it: the key questions for anyone who stopped, and the what / why / how narrative we were there to pitch. The Nerf range is one stand. This is how every stand got designed.',
    category: 'campaigns',
    alsoRanInto: ['operations'],
    connections: ['conference-programme', 'nerf-conference-stand', 'conference-lead-capture', 'nz-education-social-groups']
  },
  {
    id: 'conference-lead-capture',
    title: 'Conference lead capture',
    summary: 'A follow-up a couple of weeks later, then a video meeting, starting from a laptop questionnaire on the stand.',
    detail:
      'The lead strategy was to agree, on the stand, that we would get in touch a couple of weeks after the conference — schools are busy the minute they get back — then call anyone interested and set up a video meeting. On the stand I ran questionnaires on our laptops: Google school or Office 365, student information system, staff numbers, pedagogical approach, whether they already had an LMS, e-learning contact, IT contact. The next meeting started from who they were, not from a blank page.',
    category: 'targeting',
    alsoRanInto: ['growth'],
    connections: ['conference-concept-stand', 'conference-programme', 'problem-first-presentations', 'email-sequences-lists']
  },
  {
    id: 'sis-for-new-zealand',
    title: 'Student information system for New Zealand',
    summary: 'A year of full business plan and Ministry meetings. The product was not brought in.',
    detail:
      'I had several meetings with the Ministry of Education about bringing a new student information system into New Zealand, and over a year I put together the whole business plan: strategy, financial projections, marketing, onboarding, training, and deep technical work with PowerSchool in the US. Those meetings did not arrive at bringing the product in. The work still got done. This is not the Ministry integration tool that did ship.',
    category: 'partnerships',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['powerschool-team-liaison', 'moe-integration-tool', 'au-products-into-nz', 'financial-strategy-forecasting']
  },
  {
    id: 'au-products-into-nz',
    title: 'Two Australian products into New Zealand',
    summary: 'Channel agreements, buy price, and the backend to take two providers’ products to market here. It did not launch.',
    detail:
      'I travelled to Australia several times, met other education-technology providers, and negotiated with two of them to bring their products to New Zealand: channel partnership agreements, buy price, and the technical, sales, and promotional work behind that. I set up a vehicle for it. It did not launch. The PowerSchool partnership that did run is a different agreement.',
    category: 'partnerships',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['sis-for-new-zealand', 'partnership-contract', 'usa-onsite-training']
  },
  {
    id: 'phone-prospecting',
    title: 'Phone prospecting',
    summary: 'Calling schools for the e-learning decision maker and booking presentation appointments.',
    detail:
      'I spent a great many hours on the phone calling schools and asking for the e-learning decision maker, to get appointments for presentations. The database and the extensions were what made that possible. The call was the work, not a leftover after the email sequence.',
    category: 'pipeline',
    alsoRanInto: [],
    connections: ['school-contact-database', 'problem-first-presentations', 'sales-strategy-pipeline-review', 'lead-generation-hooks-assets']
  },
  {
    id: 'problem-first-presentations',
    title: 'Problem-first presentations',
    summary: 'Start from the largest problem the product can solve, tailored from intel gathered up front.',
    detail:
      'An online sales presentation is not a show-and-tell. I start with the largest potential problem the product solves and work backwards, asking questions, rather than walking the same deck every time. Information gathered up front — parent communication, faculty communication, teacher collaboration, a new digital rollout, a new pedagogical approach — is what lets that presentation match the school in the room. Private, high, integrated, religious, intermediate, and primary schools do not buy the same way, and the pitch has to know which one it is in.',
    category: 'pipeline',
    alsoRanInto: ['delivery'],
    connections: ['phone-prospecting', 'conference-lead-capture', 'two-product-websites', 'nz-education-social-groups', 'educators-who-moved', 'sales-system-from-nothing']
  },
  {
    id: 'powerbuddy-campaign',
    title: 'PowerBuddy campaign',
    summary: 'PowerSchool’s AI tool on the LMS: campaign, pricing, onboarding, and training, presented to customers.',
    detail:
      'I worked with the US channel partner to bring in products that sit on the learning management system. One of those was PowerBuddy, an AI tool of theirs. I put together the promotional plan and marketing campaign, and delivered that presentation to our customers with the pricing, the onboarding, and the training materials in the sessions. It is their product. The job was taking it to this market.',
    category: 'campaigns',
    alsoRanInto: ['delivery', 'operations'],
    connections: ['powerschool-team-liaison', 'per-product-nz-gtm', 'feature-training-design', 'feature-billing-plan']
  },
  {
    id: 'amazon-education-oceania',
    title: 'Amazon for Education, Oceania',
    summary: 'A working relationship with Amazon for Education in this region.',
    detail:
      'I worked with Amazon for Education in Oceania. It sat with the other work of getting products into this territory: who holds the door, and how a vendor is supposed to walk through it.',
    category: 'partnerships',
    alsoRanInto: ['growth'],
    connections: ['au-school-tech-licensing', 'powerschool-team-liaison'],
    themes: ['relationships']
  },
  {
    id: 'au-school-tech-licensing',
    title: 'Australian school-tech licensing',
    summary: 'State rules for SaaS products approved into schools, and the safety accreditation path providers now need.',
    detail:
      'I worked the Australian state rules and licensing for SaaS products approved to go into schools, and the accreditation system education-technology providers now need in order to be deemed safe for schools. Getting products into that market is partly a government path, not only a sales path.',
    category: 'partnerships',
    alsoRanInto: ['growth'],
    connections: ['amazon-education-oceania', 'partnership-contract'],
    themes: ['relationships']
  },
  {
    id: 'sales-system-from-nothing',
    title: 'Sales system from nothing',
    summary: 'There was no sales strategy when I started. I originated the funnel: communication, sequences, pitch, discovery, follow-up, proposals.',
    detail:
      'When I took the role on, there was no sales strategy. I originated the communication, the email sequences, the sales pitch, the media that went out after the first call, the discovery-meeting strategy and its media, the follow-up media, and the proposals. The later cards on this map are pieces of that system, not a list that already existed.',
    category: 'pipeline',
    alsoRanInto: ['operations'],
    connections: ['email-sequences-lists', 'problem-first-presentations', 'proposals-and-eulas', 'lead-generation-hooks-assets', 'two-product-websites']
  },
  {
    id: 'managed-services-agreement',
    title: 'Managed services agreement',
    summary: 'Support had been given away inside the licence. I turned it into a paid line, around $40,000 to $50,000 a year, billed in advance.',
    detail:
      'Customer support was unpriced inside the software licence. I added a managed services agreement that had not existed: a paid line, billed annually in advance, worth around $40,000 to $50,000 a year. That is the commercial wrapper. How support actually ran is the triage framework sitting next to it.',
    category: 'commercial',
    alsoRanInto: ['delivery'],
    connections: ['sla-billing-strategy', 'support-framework-triage', 'implementation-fee', 'moe-integration-tool']
  },
  {
    id: 'implementation-fee',
    title: 'Implementation fee',
    summary: 'A one-off implementation fee of $3,750, the same for any school size, that had not been charged.',
    detail:
      'Implementation was not being charged. I added a one-off implementation fee of $3,750, flat, the same for any school size. It sits on the onboarding sequence as the commercial end of getting a school live.',
    category: 'commercial',
    alsoRanInto: ['delivery'],
    connections: ['managed-services-agreement', 'onboarding-sequence', 'technical-implementation-new-accounts', 'sla-billing-strategy']
  },
  {
    id: 'digital-circus-facilitator',
    title: 'Ministry facilitator via Digital Circus',
    summary: 'Accredited under Digital Circus so schools could use Ministry-funded hours to bring me in.',
    detail:
      'Becoming an accredited Ministry of Education facilitator was not a form I filled in. I worked with Digital Circus and sat under their umbrella. That accreditation meant a school could use Ministry-funded hours to bring me in for training when they could not have paid for it themselves. The week’s funded-programme card is delivering those sessions. This is how that accreditation existed.',
    category: 'learning-design',
    alsoRanInto: ['operations'],
    connections: ['funded-programme-facilitation', 'department-training', 'covid-training-delivery']
  },
  {
    id: 'department-training',
    title: 'Department-by-department training',
    summary: 'Chargeable on-site work with champions, then English, maths, science over a few days, then subject-specific materials.',
    detail:
      'Alongside the funded sessions I ran chargeable bespoke training on site: first the train-the-trainer group, the platform champions, then often each department over a few days — English, maths, science. The nuances between those subject-matter experts is what the later subject-specific training materials had to know.',
    category: 'learning-design',
    alsoRanInto: ['growth'],
    connections: ['train-the-trainer', 'digital-circus-facilitator', 'self-paced-course-library', 'workshop-feedback-loop']
  },
  {
    id: 'edtech-nz-referrals',
    title: 'EdTech New Zealand referrals',
    summary: 'Referrals from EdTech New Zealand to advise companies coming into this landscape.',
    detail:
      'Work with EdTech New Zealand, including their chair and leadership team, led to referrals: other education-technology companies looking to come into New Zealand who wanted to understand the landscape. That consulting sat inside this role. It is not a current offering under another name.',
    category: 'partnerships',
    alsoRanInto: ['growth'],
    connections: ['nz-education-social-groups', 'au-school-tech-licensing', 'nz-referral-network'],
    themes: ['relationships']
  },
  {
    id: 'social-media-strategy',
    title: 'Social media strategy',
    summary: 'The business present in multiple online educator groups, on purpose.',
    detail:
      'I put a social media strategy in place so we were actively present in multiple online educator groups. Listening in those rooms is a different card. This is the decision that we should be in them at all.',
    category: 'campaigns',
    alsoRanInto: [],
    connections: ['nz-education-social-groups', 'schoology-educators-group']
  },
  {
    id: 'corporate-government-lms',
    title: 'Corporate and government LMS',
    summary: 'Government agencies and private companies as customers, not only schools.',
    detail:
      'I took the platform into the corporate sector as well: government agencies and private companies that needed a learning management system. The client type widened. Delivery was still implementation, onboarding, and training — the buyer was not a school.',
    category: 'pipeline',
    alsoRanInto: ['delivery'],
    connections: ['onboarding-sequence', 'sales-system-from-nothing', 'technical-implementation-new-accounts']
  },
  {
    id: 'onboarding-sequence',
    title: 'Onboarding sequence',
    summary: 'Technical setup, curriculum in the platform, in-platform training, train-the-trainer, then shadow the rollout until the school runs on its own.',
    detail:
      'I designed the whole implementation and onboarding sequence: technical setup; populating the platform with learning objectives from the New Zealand or Australian curriculum; training materials inside the platform for them to deliver to teachers; on-site train-the-trainer with the core group; then shadowing the rollout and staying with support and advice until the school was operating cleanly on its own. The week’s implementation and onboarding cards are days in that sequence. This is the sequence.',
    category: 'enablement',
    alsoRanInto: ['operations', 'growth'],
    connections: ['technical-implementation-new-accounts', 'customer-onboarding-sessions', 'bespoke-onboarding-design', 'train-the-trainer', 'implementation-fee', 'support-framework-triage']
  },
  {
    id: 'support-framework-triage',
    title: 'Support framework and triage',
    summary: 'The operating design of managed support: expected reaction times, and the system that ran them.',
    detail:
      'I designed the managed support agreement framework and the triage system for expected reaction times, and the way that work actually ran. Hours were banded by school size, and escalation sat by urgency and issue type. That is how support ran. The paid managed-services line is the commercial wrapper on the same work.',
    category: 'support',
    alsoRanInto: ['operations'],
    connections: ['managed-services-agreement', 'sla-billing-strategy', 'support-materials-updates', 'onboarding-sequence']
  },
  {
    id: 'itslearning-partnership',
    title: 'itslearning partnership',
    summary: 'When COVID server load led the US vendor to cancel this channel contract, I took itslearning to New Zealand instead.',
    detail:
      'During COVID-19, server load in the US led PowerSchool to cancel this reseller contract. I started a channel partnership with itslearning, a Norwegian company: the agreement, the terms, the costs, and the onboarding, technical work, and delivery into schools, and began selling that into New Zealand instead of Schoology.',
    category: 'partnerships',
    alsoRanInto: ['growth', 'delivery'],
    connections: ['international-reseller-sync', 'powerschool-return', 'partnership-contract', 'onboarding-sequence']
  },
  {
    id: 'powerschool-return',
    title: 'PowerSchool’s return',
    summary: 'A year later PowerSchool approached to resume, with an apology. A new contract. PowerSchool products again.',
    detail:
      'Once the interruption had passed, PowerSchool had a new director of international. They approached to resume, with an apology, and asked to work together again. That began renegotiation of a new contract, and we continued to sell PowerSchool products. It is a second agreement, not a rewind of the first one.',
    category: 'partnerships',
    alsoRanInto: ['growth'],
    connections: ['itslearning-partnership', 'partnership-contract', 'international-reseller-sync', 'buy-price-own-sell']
  },
  {
    id: 'workshop-feedback-loop',
    title: 'Workshop feedback loop',
    summary: 'Satisfaction scoring after workshops, used to change the next one where it was weak.',
    detail:
      'I put customer satisfaction scoring in place after workshops and used it to tailor the next session in any area that needed improvement. The score is a working tool, not a trophy. What matters is that a weak section does not get delivered the same way the following week.',
    category: 'learning-design',
    alsoRanInto: [],
    connections: ['covid-training-delivery', 'product-range-workshop', 'department-training', 'self-paced-course-library', 'conference-programme']
  }
]);
