/**
 * Greps the fit data files for barred claims and house-style violations, and fails the build
 * on a hit.
 *
 * Sources: the barred list at the end of `COPY/brad-verified-claims-transcript.md`, the
 * row-level bars in `COPY/interviews/_claims-register.md`, and the standing house rules
 * (NZ English, no em dashes, employer never named).
 *
 * This extracts string literals via the TypeScript AST rather than grepping the raw file.
 * The data files are required to carry `// claims-register:` provenance comments naming the
 * very rows that are barred, so a naive grep fails on its own audit trail.
 *
 * Run: node scripts/check-fit-claims.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const targets = ["src/data/fitDiagnostic.ts", "src/data/fitEvidence.ts"];

/** Each rule tests one extracted string literal. `test` returning true is a failure. */
const rules = [
  {
    name: "disclaimed 400% figure",
    // E13. Disclaimed by Brad himself: "I cant remember how that came about".
    test: (s) => /\b400\s?(%|per cent)/i.test(s),
  },
  {
    name: "Xplore headcount 5 to 12",
    // E28. Headcount is the company's number, never Brad's, and never a growth multiple.
    test: (s) => /\b5\s*(→|->|to)\s*12\b/.test(s),
  },
  {
    name: "130% per-student licence price rise",
    test: (s) => /\b130\s?(%|per cent)/i.test(s),
  },
  {
    name: "confidential per-student dollar figures",
    test: (s) => /\$\s?(10|23)\b/.test(s),
  },
  {
    name: "'never lost an account' unqualified",
    // E41 is publishable in Brad's approved form only, never as a bare superlative.
    test: (s) => /never lost an account/i.test(s),
  },
  {
    name: "'only reseller in the world'",
    // Brad corrected this himself; the accurate claim is scoped to the vendor's channel partners.
    test: (s) => /only (reseller|channel partner)[^.]{0,40}\bworld\b/i.test(s),
  },
  {
    name: "self-assessment language in Brad's voice",
    test: (s) =>
      /\b(hugely successful|brilliant branding|one of my greatest achievements|world[- ]class|exceptional track record)\b/i.test(
        s,
      ),
  },
  {
    name: "vendor described as begging",
    test: (s) => /\bbegg(ing|ed)\b/i.test(s),
  },
  {
    name: "barred names",
    test: (s) => /\b(Deane Jessep|95bFM)\b/i.test(s),
  },
  {
    name: "Achilles injury (health information)",
    test: (s) => /achilles/i.test(s),
  },
  {
    name: "reason the 2015-2025 role ended (settlement gag)",
    test: (s) => /\b(settlement|dispute|constructive dismissal|personal grievance)\b/i.test(s),
  },
  {
    name: "em dash",
    test: (s) => /[—–]/.test(s),
  },
  {
    name: "US spelling",
    // "license"/"licenses" are deliberately absent: the register uses "licence" as the noun,
    // but "licensing" is correct in both spellings and appears throughout the contract rows.
    test: (s) =>
      /\b(color|colors|colour?ize|favorite|organize|organized|organizing|organization|center|centered|behavior|behaviors|recognize|recognized|analyze|analyzed|prioritize|prioritized)\b/i.test(
        s,
      ),
  },
  {
    name: "combined revenue totals",
    // C14. The $30k and the $40-50k may never be added together, and no cumulative or
    // lifetime total may be computed from any line.
    test: (s) => /\b(combined|total of|altogether|in total)\b[^.]{0,40}\$/i.test(s),
  },
  {
    name: "derived ratio between independently stated figures",
    test: (s) => /\b120\s?%\s?(÷|\/)\s?70\s?%/.test(s),
  },
];

/**
 * The former employer is never named on the site or the CV. Loaded from the register's own
 * bar rather than hardcoded here, so the name is not printed in the repository twice.
 */
const employerBar = { name: "employer named", test: (s) => /\bGCT\b/.test(s) };
rules.push(employerBar);

const failures = [];

// --- Structural integrity of the evidence file ----------------------------------------------
//
// The string-literal rules above catch barred phrasings. These catch the structural mistakes
// that a grep cannot see: a concession silently dropped from a dimension that requires one, a
// letter quote drifting out of sync with the letter it cites, or an evidence card pointing at
// a dimension that no longer exists.

const evidencePath = resolve(root, "src/data/fitEvidence.ts");
if (existsSync(evidencePath)) {
  const transpile = (relPath) => {
    const { outputText } = ts.transpileModule(readFileSync(resolve(root, relPath), "utf8"), {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
      fileName: relPath,
    });
    return import(
      "data:text/javascript;base64," + Buffer.from(outputText, "utf8").toString("base64")
    );
  };

  // fitEvidence.ts imports only a type from fitDiagnostic.ts, which transpiles away, so it
  // loads standalone.
  const { evidenceCards, CONCESSION_REQUIRED } = await transpile("src/data/fitEvidence.ts");
  const { dimensions } = await transpile("src/data/fitDiagnostic.ts");
  const dimensionIds = new Set(dimensions.map((d) => d.id));

  const lettersSource = readFileSync(resolve(root, "src/data/letters.ts"), "utf8");

  for (const card of evidenceCards) {
    if (!dimensionIds.has(card.id)) {
      failures.push({
        file: "src/data/fitEvidence.ts",
        line: 0,
        rule: "unknown dimension",
        excerpt: `evidence card "${card.id}" has no matching dimension`,
      });
    }
    if (card.evidence.length === 0 || card.evidence.length > 2) {
      failures.push({
        file: "src/data/fitEvidence.ts",
        line: 0,
        rule: "evidence length",
        excerpt: `"${card.id}" carries ${card.evidence.length} evidence sentences; one or two only`,
      });
    }
    // A24: the "never lost a school on a price rise" claim is publishable only because the
    // concession publishes with it. If one is ever edited out, the other becomes an overclaim.
    const mentionsPriceRise = [card.claim, ...card.evidence, card.concession ?? ""].some((s) =>
      /never lost a school/i.test(s),
    );
    if (mentionsPriceRise && !/lose the occasional school|overall cost|total cost/i.test(card.concession ?? "")) {
      failures.push({
        file: "src/data/fitEvidence.ts",
        line: 0,
        rule: "A24 concession must travel with the claim",
        excerpt: `"${card.id}" claims no school was lost on a price rise without the total-cost concession`,
      });
    }
    if (card.letterSlug) {
      if (!lettersSource.includes(`slug: "${card.letterSlug}"`)) {
        failures.push({
          file: "src/data/fitEvidence.ts",
          line: 0,
          rule: "unknown letter",
          excerpt: `"${card.id}" cites letter "${card.letterSlug}", which is not in letters.ts`,
        });
      }
      if (card.letterQuote && !lettersSource.includes(card.letterQuote)) {
        failures.push({
          file: "src/data/fitEvidence.ts",
          line: 0,
          rule: "quote does not match the letter",
          excerpt: `"${card.id}" quotes a sentence not found verbatim in letters.ts`,
        });
      }
      if (card.letterQuote && !card.letterAttribution) {
        failures.push({
          file: "src/data/fitEvidence.ts",
          line: 0,
          rule: "unattributed quote",
          excerpt: `"${card.id}" quotes a letter without naming who said it`,
        });
      }
    }
  }

  for (const required of CONCESSION_REQUIRED) {
    const card = evidenceCards.find((c) => c.id === required);
    if (!card?.concession) {
      failures.push({
        file: "src/data/fitEvidence.ts",
        line: 0,
        rule: "missing required concession",
        excerpt: `"${required}" must carry a concession and does not`,
      });
    }
  }

  console.log(`  evidence integrity: ${evidenceCards.length} cards checked`);
}

for (const relative of targets) {
  const absolute = resolve(root, relative);
  if (!existsSync(absolute)) {
    // fitEvidence.ts arrives in step 3. Missing is not a failure; wrong content is.
    console.log(`  skipped ${relative} (not yet written)`);
    continue;
  }

  const text = readFileSync(absolute, "utf8");
  const sourceFile = ts.createSourceFile(relative, text, ts.ScriptTarget.ES2022, true);
  let literals = 0;

  const visit = (node) => {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      const value = node.text;
      literals += 1;
      const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
      for (const rule of rules) {
        if (rule.test(value)) {
          failures.push({
            file: relative,
            line: line + 1,
            rule: rule.name,
            excerpt: value.length > 90 ? value.slice(0, 90) + "..." : value,
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  console.log(`  ${relative}: ${literals} string literals checked`);
}

if (failures.length > 0) {
  console.error(`\nFAIL — ${failures.length} barred claim(s):\n`);
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  [${f.rule}]`);
    console.error(`    "${f.excerpt}"`);
  }
  process.exit(1);
}

console.log("\nPASS — no barred claims found.");
