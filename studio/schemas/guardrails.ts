/* Standing publication constraints, from COPY/brad-verified-claims-transcript.md
   ("Hard constraints"). These are enforced today only because copy passes through a
   working session that holds them in mind. A CMS field is a direct path from the
   keyboard to production, so the constraints are restated here as validation that
   fires while Brad is typing, at the field, rather than in a review that may not happen. */

/** Names that must never reach site output. Case-insensitive, whole-word matched. */
const BARRED_TERMS: { term: string; why: string }[] = [
  {
    term: "Deane Jessep",
    why: "Never published. See COPY hard constraint 3.",
  },
  {
    term: "95bFM",
    why: "95bFM sales figures are never published. See COPY hard constraint 3.",
  },
];

/** Self-assessment language: facts and third-party quotes carry characterisation instead. */
const SELF_ASSESSMENT = [
  "hugely successful",
  "brilliant",
  "deep empathy",
  "world-class",
  "passionate",
  "results-driven",
  "proven track record",
];

function escape(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Returns a warning string when text trips a standing constraint, or true when clean.
 * Used as a Sanity custom validation rule.
 */
export function checkGuardrails(text: unknown): true | string {
  if (typeof text !== "string" || text.length === 0) return true;

  for (const { term, why } of BARRED_TERMS) {
    const pattern = new RegExp(`\\b${escape(term)}\\b`, "i");
    if (pattern.test(text)) {
      return `"${term}" cannot be published. ${why}`;
    }
  }

  for (const phrase of SELF_ASSESSMENT) {
    const pattern = new RegExp(`\\b${escape(phrase)}\\b`, "i");
    if (pattern.test(text)) {
      return `"${phrase}" is self-assessment language. Let a fact or a third-party quote carry this instead.`;
    }
  }

  return true;
}

/** The note shown under every free-text field, so the rules are visible before they fire. */
export const GUARDRAIL_NOTE =
  "Never name the 2015–2025 education sector employer, and never reference the dispute " +
  "that ended that role beyond “the role ended in September 2025”. No invented or combined " +
  "figures. No self-assessment language — let facts and quotes do the work.";
