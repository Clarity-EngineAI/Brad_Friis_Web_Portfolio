/**
 * Evidence cards for the fit diagnostic report.
 *
 * One entry per dimension in `fitDiagnostic.ts`. The report shows a card for each matched
 * dimension with a ceiling at or above 0.85, capped at four: six cards is a brochure, four is
 * the chunking pattern the rest of the site already uses.
 *
 * EVERY string in this file is audited against `COPY/interviews/_claims-register.md` and
 * checked by `scripts/check-fit-claims.mjs`. The rules that shaped the wording here:
 *
 *   - Never "Brad built" for the SIS integration. He said "we built", he is not an engineer by
 *     trade, and origination is a different claim from construction (footnote 18).
 *   - The five-campus expansion is publishable as composition, never as magnitude. No value,
 *     no multiple, no direction of size (footnote 7).
 *   - Revenue lines never sum. The $30k and the $40-50k may never be added (C14).
 *   - The former employer is never named, on this page or any other.
 *   - "Around" survives verbatim wherever Brad hedged.
 *   - Concessions are required on `retention` and `pricing-cash` and asserted at build time.
 *
 * `letterSlug` values must exist in `src/data/letters.ts`; `letterQuote` must be the exact
 * sentence carried there, so a reader can verify the quote in one click against the scan.
 * PRODUCT.md principle 3 requires this, and a page arguing for verifiability that cannot itself
 * be verified is weaker than the rest of the site.
 */

import type { DimensionId } from "./fitDiagnostic";

export interface EvidenceCard {
  id: DimensionId;
  /** The capability claim, first person. Shown as the card heading. */
  claim: string;
  /** One or two evidence sentences. Never more. */
  evidence: string[];
  /** The bound Brad puts on his own claim. Required on retention and pricing-cash. */
  concession?: string;
  /** Slug in `src/data/letters.ts`. The quote links to that letter's scan. */
  letterSlug?: string;
  /** Verbatim from the letter. Must match the source exactly. */
  letterQuote?: string;
  /** Who said it, for attribution under the quote. */
  letterAttribution?: string;
  /** Claims-register rows. Audit trail, never displayed. */
  source: string;
}

export const evidenceCards: EvidenceCard[] = [
  {
    id: "adoption",
    claim: "Getting non-technical people to actually use software they did not ask for",
    evidence: [
      "At one school, 100% of teachers were onboarded to daily classroom use within a single term of signing.",
      "Through the lockdowns I ran 108 one-to-one interviews with teachers, and built a regional teacher network that reached around 600 people at its peak. Onboarding was built per school rather than from a template, because every school ran a different ecosystem, curriculum and practice.",
    ],
    letterSlug: "andrew-bergh",
    letterQuote:
      "One of Brad's most remarkable qualities is his ability to support teachers, particularly those resistant to change.",
    letterAttribution: "Andrew Bergh, international school, Hong Kong",
    source: "A2, A6, A7, A11, A12, A13, A14, A15",
  },
  {
    id: "retention",
    claim: "Keeping accounts that were actively considering leaving",
    evidence: [
      "A five-campus account was seriously considering moving off the platform. I spent a week across the campuses with teachers and senior leadership before proposing anything, built a strategy that linked the campuses together, then went back to deliver and teach it. They stayed, renewed, and added a sixth campus.",
      "Another school renewed for eight consecutive years while the per-student licence price rose every year.",
    ],
    concession:
      "I never lost a school over an annual price increase. I did lose the occasional school on overall cost, against government-subsidised Google Classroom and Microsoft 365, and that is the honest bound on this.",
    letterSlug: "the-industry-school",
    letterQuote:
      "At a time when we were seriously considering moving away from Schoology, Brad helped us see the platform in a new light.",
    letterAttribution: "Adrian Pilgrim, The Industry School",
    source: "A3, A4, A5, A16, A17, A18, A20, A24",
  },
  {
    id: "expansion",
    claim: "Growing revenue inside accounts that were already ours",
    evidence: [
      "Licences across the book grew from 2,800 to 29,784. One school grew from 600 students to around 1,200, and with its second high school to around 2,300.",
      "After the save, the five-campus account bought paid consultancy and an annual managed services agreement, two revenue lines that had not existed at that account before.",
    ],
    letterSlug: "rototuna-high-schools",
    letterQuote:
      "Thanks to your dedication, our team and students can use Schoology much more effectively, and we truly value the excellent service you provide.",
    letterAttribution: "Pranesh Lad, Rototuna High Schools",
    source: "A9, A16, A17, A18, A33",
  },
  {
    id: "pricing-cash",
    claim: "Pricing what was being given away, and pulling the cash cycle forward",
    evidence: [
      "Support sat unpriced inside the licence. I identified it as a separable line and created a managed services agreement, structured monthly and billed annually in advance so the year's cash came in up front. It ran at around $40,000 to $50,000 a year against work already being delivered.",
      "Implementation was a flat fee, standard for any school, because onboarding effort does not scale with size. Managed services were banded by school size, because support load does. The line grew as the customer grew, without a new sale.",
    ],
    concession:
      "At an earlier role I introduced set-up costs, raised hourly rates and put a 50% deposit on all work where there had been none. What I cannot give you is a before-and-after margin figure for any of it.",
    source: "A21, A22, A23, A32, A33, E6, E7, E8, E9, E52",
  },
  {
    id: "commercial-terms",
    claim: "Negotiating the terms the whole business then runs on",
    evidence: [
      "When the vendor returned after a pause in the channel contract, I negotiated the entire new reseller agreement: buy price, terms and the licensing framework. Licensing moved from compulsory upfront purchase with expiring licences to buy-as-needed at a fixed price with no upfront cost.",
      "I negotiated the right to invoice customers directly in local currency, which took the billing off the vendor and gave us the renewal conversation. I also held firm to remove a standard 500-licence minimum, because much of the New Zealand market is smaller than that floor. A school with fifty licences went on the books as a result.",
    ],
    letterSlug: "powerschool",
    letterQuote:
      "Your deep PowerSchool expertise and strong connections across our team, long-standing relationships with Schoology customers in New Zealand and Australia, and the trust you've built have all added significant value to our presence in the Oceania market.",
    letterAttribution: "Gavin Jeffries, PowerSchool",
    source: "A36, A37, A38, A39, A40, A41",
  },
  {
    id: "full-cycle",
    claim: "Running the whole cycle myself, from first conversation to the invoice",
    evidence: [
      "At Xplore I prospected, interviewed the client, wrote the strategy into a proposal, signed it off, briefed the project managers, designers and developers, and then held the billing and the relationship above the delivery team.",
      "I held the Hawke's Bay Chamber of Commerce as a client for four years, which is essentially my whole tenure there, and worked a two-year cycle reselling redesigns and copy refreshes back into existing clients.",
    ],
    letterSlug: "adplus-advertising",
    letterQuote:
      "He was always pleasant but somehow managed to obtain an extraordinarily high strike rate from which many clients were converted.",
    letterAttribution: "Andy Walker, Adplus Advertising",
    source: "E17, E18, E19, E23",
  },
  {
    id: "demand",
    claim: "Generating demand, where I have done it",
    evidence: [
      "On a regional visitor guide and web portal I grew total ad revenue by 60% and advertiser volume by 40% over three years, bringing traditional operators into early digital packages.",
      "Across the education decade I ran the marketing myself: direct marketing and email, two sites with booking functions, the conference stands, and presenting at the conferences. I also partnered with an accredited company to become a Ministry of Education approved facilitator, which opened access to government training funds for the schools we worked with.",
    ],
    concession:
      "This is real but it is not the deepest thing I have. If demand generation is the whole job rather than part of it, someone who has done only that for the last three years is a better fit than I am.",
    letterSlug: "hawkes-bay-tourism",
    letterQuote:
      "It is my observation that Brad has assisted with a significant improvement in tourism industry buy-in to the core marketing activities of Hawke's Bay Tourism during this time.",
    letterAttribution: "Hamish Lowry, Hawke's Bay Tourism",
    source: "E37, A10, A25, A26, A27",
  },
  {
    id: "new-logo-hunting",
    claim: "High-volume net-new acquisition",
    evidence: [
      "This is the weakest thing on the board and I would rather you knew now. At 99 Corporation the owner puts it at around 30% more profit per customer and around 70% more business clients during my tenure, and at Xplore I founded a referral network of 25 non-competing businesses that brought in over $70,000 of business across two years.",
      "That is new business, but it is relationship and referral work, not cold outbound at volume. I left that first role partly because I did not enjoy the cold calling.",
    ],
    concession:
      "If the job is hitting a call target and filling a pipeline with names nobody has spoken to, someone whose last three years were exactly that is a better fit than I am.",
    letterSlug: "canwest-media",
    letterQuote:
      "Several of Brad's past clients have mentioned his ability a number of years on from his departure.",
    letterAttribution: "Philip Lemon, CanWest Media",
    source: "E51, E12, E21, E15, E41",
  },
];

export const evidenceById: Record<DimensionId, EvidenceCard> = Object.fromEntries(
  evidenceCards.map((card) => [card.id, card]),
) as Record<DimensionId, EvidenceCard>;

/** Concessions are mandatory on these two. Asserted by `scripts/check-fit-claims.mjs`. */
export const CONCESSION_REQUIRED: DimensionId[] = ["retention", "pricing-cash"];

/** Maximum evidence cards on one report. Four, not six. */
export const MAX_EVIDENCE_CARDS = 4;
