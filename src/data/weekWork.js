/**
 * Combined work inventory: the representative week plus map-only entries.
 * Week view is `weekEntries` (has day + slot). Map view is `workEntries`.
 */

import { calendarEntries } from './repWeekCalendar.js';
import { mapEntries } from './weekMapEntries.js';

/** Extra connections from week cards onto map-only nodes.
 *  @type {Readonly<Record<string, readonly string[]>>} */
const extraLinks = Object.freeze({
  'international-reseller-sync': [
    'partnership-contract',
    'powerschool-team-liaison',
    'itslearning-partnership',
    'powerschool-return',
    'buy-price-own-sell',
    'usa-onsite-training'
  ],
  'national-conference': [
    'conference-programme',
    'nerf-conference-stand',
    'schoology-event-app',
    'conference-concept-stand'
  ],
  'schools-database-segmentation': ['school-contact-database', 'email-sequences-lists'],
  'marketing-automation-review': ['email-sequences-lists'],
  'funded-programme-facilitation': ['digital-circus-facilitator', 'covid-training-delivery'],
  'moe-integration-tool': ['sis-for-new-zealand', 'managed-services-agreement'],
  'customer-onboarding-sessions': ['onboarding-sequence', 'train-the-trainer', 'covid-training-delivery'],
  'sla-billing-strategy': ['direct-nz-invoicing', 'managed-services-agreement', 'implementation-fee', 'support-framework-triage'],
  'feature-training-design': ['nz-product-training', 'self-paced-course-library', 'powerbuddy-campaign'],
  'network-building-partner-calls': ['schoology-educators-group', 'nz-referral-network', 'train-the-trainer'],
  'lead-generation-hooks-assets': ['phone-prospecting', 'sales-system-from-nothing'],
  'vendor-supplier-management': ['nz-referral-network', 'ecoco-school-finance'],
  'technical-implementation-new-accounts': ['onboarding-sequence', 'implementation-fee', 'corporate-government-lms'],
  'bespoke-onboarding-design': ['onboarding-sequence'],
  'proposals-and-eulas': ['direct-nz-invoicing', 'sales-system-from-nothing', 'ecoco-school-finance'],
  'feature-launch-media': ['per-product-nz-gtm', 'nz-rebuild-us-design'],
  'support-materials-updates': ['support-framework-triage', 'nz-print-user-guides', 'self-serve-videos'],
  'financial-strategy-forecasting': ['sis-for-new-zealand', 'buy-price-own-sell'],
  'sales-strategy-pipeline-review': ['phone-prospecting', 'no-licence-minimum']
});

const weekWithLinks = calendarEntries.map((entry) => {
  const extra = extraLinks[entry.id];
  if (!extra) return entry;
  return Object.freeze({
    ...entry,
    connections: Object.freeze([...entry.connections, ...extra])
  });
});

/** @type {typeof calendarEntries} */
export const workEntries = Object.freeze([...weekWithLinks, ...mapEntries]);

/** Timed subset that fills the Monday–Friday grid. */
export const weekEntries = Object.freeze(workEntries.filter((entry) => entry.day && entry.slot));

export function isWeekEntry(entry) {
  return Boolean(entry.day && entry.slot);
}
