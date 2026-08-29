/**
 * Enumerates every reachable answer path through the fit diagnostic and fails the build if the
 * model has drifted back into flattery.
 *
 * This exists because the first version of the model was a flatterer and nobody noticed by
 * reading it. Enumerated, it produced a median of 81 with 97.7% of paths scoring 65 or above,
 * five paths in forty thousand returning "Weak", and two questions with no route to a low score
 * at all. All of that was invisible in review and obvious in one pass of arithmetic.
 *
 * Do not soften these thresholds to make a failing build pass. If the distribution has moved,
 * either the ceilings changed deliberately (in which case update the thresholds AND the numbers
 * published on the page in the same commit) or the model broke.
 *
 * Run: node scripts/check-fit-model.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// The data file is TypeScript. Transpile it with the real compiler rather than stripping types
// with regexes: the plan warned against hand-rolled parsing for the barred-string check and the
// same reasoning applies here. `typescript` is already a devDependency.
const source = readFileSync(resolve(root, "src/data/fitDiagnostic.ts"), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  fileName: "fitDiagnostic.ts",
});

const moduleUrl = "data:text/javascript;base64," + Buffer.from(outputText, "utf8").toString("base64");

const { scoreFit, questions, scoredQuestions, dimensions, bands, SCORE_FLOOR, SCORE_ROOF } =
  await import(moduleUrl);

// --- Invariants that do not need enumeration ------------------------------------------------

const failures = [];
const ceilings = dimensions.map((d) => d.ceiling);
const lowest = Math.min(...ceilings);
const highest = Math.max(...ceilings);

if (SCORE_FLOOR !== lowest) {
  failures.push(
    `SCORE_FLOOR is ${SCORE_FLOOR} but the lowest ceiling is ${lowest}. ` +
      `The rescale constants must track the ceilings or every score is skewed.`,
  );
}
if (SCORE_ROOF !== highest) {
  failures.push(
    `SCORE_ROOF is ${SCORE_ROOF} but the highest ceiling is ${highest}. ` +
      `The rescale constants must track the ceilings or every score is skewed.`,
  );
}

// Authoring rule 3: every scored question must contain at least one route to a low-ceiling
// dimension. The first draft wrote this rule and broke it on Q2 and Q4.
const lowCeilingIds = new Set(dimensions.filter((d) => d.ceiling <= 0.7).map((d) => d.id));
for (const question of scoredQuestions) {
  const hasLowRoute = question.options.some((option) =>
    Object.keys(option.demand).some((id) => lowCeilingIds.has(id)),
  );
  if (!hasLowRoute) {
    failures.push(
      `${question.id} has no route to a low-ceiling dimension. Every scored question must be ` +
        `able to move the result down, or the instrument cannot say no.`,
    );
  }
}

// Rule 4: no option may name its own dimension.
for (const question of questions) {
  for (const option of question.options) {
    for (const dimension of dimensions) {
      if (option.label.toLowerCase().includes(dimension.label.toLowerCase())) {
        failures.push(`${question.id}:${option.id} is labelled with its own dimension.`);
      }
    }
  }
}

// --- Full enumeration -----------------------------------------------------------------------

const axes = scoredQuestions.map((q) => ({ id: q.id, options: q.options.map((o) => o.id) }));
const totalPaths = axes.reduce((n, axis) => n * axis.options.length, 1);

const scores = [];
const bandCounts = new Map(bands.map((b) => [b.id, 0]));
// Per-question sensitivity: how much does changing this one answer move the result?
const swingByQuestion = new Map(axes.map((a) => [a.id, { sum: 0, n: 0 }]));

const answers = {};
let minPath = null;
let maxPath = null;

function walk(depth) {
  if (depth === axes.length) {
    const result = scoreFit(answers);
    scores.push(result.raw);
    bandCounts.set(result.band.id, bandCounts.get(result.band.id) + 1);

    if (minPath === null || result.raw < minPath.raw) minPath = { raw: result.raw, answers: { ...answers } };
    if (maxPath === null || result.raw > maxPath.raw) maxPath = { raw: result.raw, answers: { ...answers } };
    return;
  }
  const axis = axes[depth];
  for (const optionId of axis.options) {
    answers[axis.id] = optionId;
    walk(depth + 1);
  }
  delete answers[axis.id];
}

walk(0);

// Sensitivity, sampled: for a spread of paths, vary one question at a time.
{
  const sample = [];
  const sampleAnswers = {};
  const sampleWalk = (depth) => {
    if (sample.length >= 400) return;
    if (depth === axes.length) {
      sample.push({ ...sampleAnswers });
      return;
    }
    for (const optionId of axes[depth].options) {
      sampleAnswers[axes[depth].id] = optionId;
      sampleWalk(depth + 1);
    }
  };
  sampleWalk(0);

  for (const path of sample) {
    const base = scoreFit(path).raw;
    for (const axis of axes) {
      for (const optionId of axis.options) {
        if (optionId === path[axis.id]) continue;
        const varied = scoreFit({ ...path, [axis.id]: optionId }).raw;
        const entry = swingByQuestion.get(axis.id);
        entry.sum += Math.abs(varied - base);
        entry.n += 1;
      }
    }
  }
}

scores.sort((a, b) => a - b);
const pct = (p) => scores[Math.min(scores.length - 1, Math.floor((p / 100) * scores.length))];
const mean = scores.reduce((s, n) => s + n, 0) / scores.length;
const median = pct(50);
const sd = Math.sqrt(scores.reduce((s, n) => s + (n - mean) ** 2, 0) / scores.length);
const belowSubstantial = scores.filter((s) => s < 65).length;
const belowShare = (belowSubstantial / scores.length) * 100;

const round = (n) => Math.round(n * 10) / 10;

const report = {
  paths: totalPaths,
  min: round(scores[0]),
  max: round(scores[scores.length - 1]),
  mean: round(mean),
  median: round(median),
  sd: round(sd),
  p5: round(pct(5)),
  p25: round(pct(25)),
  p50: round(median),
  p75: round(pct(75)),
  p95: round(pct(95)),
  bands: Object.fromEntries(
    bands.map((b) => [
      b.id,
      { count: bandCounts.get(b.id), share: round((bandCounts.get(b.id) / scores.length) * 100) },
    ]),
  ),
  belowSubstantialShare: round(belowShare),
  displayMin: Math.round(scores[0] / 5) * 5,
  displayMax: Math.round(scores[scores.length - 1] / 5) * 5,
  displayMedian: Math.round(median / 5) * 5,
  meanSwing: round(
    [...swingByQuestion.values()].reduce((s, e) => s + e.sum, 0) /
      [...swingByQuestion.values()].reduce((s, e) => s + e.n, 0),
  ),
  swingByQuestion: Object.fromEntries(
    [...swingByQuestion.entries()].map(([id, e]) => [id, round(e.sum / e.n)]),
  ),
};

// --- Canonical paths ------------------------------------------------------------------------

const retentionLed = { q1: "a", q2: "d", q3: "a", q4: "a", q5: "a", q6: "c", q8: "a", q7: "b" };
const outboundLed = { q1: "c", q2: "e", q3: "e", q4: "d", q5: "e", q6: "a", q8: "c", q7: "b" };

const retention = scoreFit(retentionLed);
const outbound = scoreFit(outboundLed);

report.canonical = {
  retentionLed: { raw: round(retention.raw), display: retention.display, band: retention.band.id },
  outboundLed: {
    raw: round(outbound.raw),
    display: outbound.display,
    band: outbound.band.id,
    gaps: outbound.gaps.map((g) => g.id),
  },
};

// --- Thresholds -----------------------------------------------------------------------------

if (report.median > 74) {
  failures.push(`Median is ${report.median}, above the 74 ceiling. The model is drifting toward flattery.`);
}
if (report.belowSubstantialShare < 25) {
  failures.push(
    `Only ${report.belowSubstantialShare}% of paths score below 65, under the 25% floor. ` +
      `An instrument that cannot say no is not an instrument.`,
  );
}
if (report.canonical.outboundLed.band !== "weak") {
  failures.push(
    `The outbound-led path scores ${report.canonical.outboundLed.display} ` +
      `(${report.canonical.outboundLed.band}), not Weak. This path failing is the tool being broken.`,
  );
}
if (report.canonical.retentionLed.band !== "strong") {
  failures.push(
    `The retention-led path scores ${report.canonical.retentionLed.display} ` +
      `(${report.canonical.retentionLed.band}), not Strong.`,
  );
}
if (!outbound.gaps.some((g) => g.id === "new-logo-hunting")) {
  failures.push("The outbound-led path does not surface new-logo-hunting as a gap.");
}

writeFileSync(resolve(root, "scripts/fit-distribution.json"), JSON.stringify(report, null, 2) + "\n");

console.log(`Enumerated ${report.paths.toLocaleString()} reachable paths.\n`);
console.log(
  `  min ${report.min}  max ${report.max}  mean ${report.mean}  median ${report.median}  sd ${report.sd}`,
);
console.log(`  p5 ${report.p5}  p25 ${report.p25}  p50 ${report.p50}  p75 ${report.p75}  p95 ${report.p95}\n`);
for (const band of bands) {
  const b = report.bands[band.id];
  console.log(`  ${band.label.padEnd(12)} ${String(b.count).padStart(6)}  ${b.share}%`);
}
console.log(`\n  below Substantial: ${report.belowSubstantialShare}%`);
console.log(`  mean single-answer swing: ${report.meanSwing} points`);
console.log(`  per-question swing: ${JSON.stringify(report.swingByQuestion)}`);
console.log(
  `\n  retention-led: ${report.canonical.retentionLed.display} ${report.canonical.retentionLed.band}`,
);
console.log(
  `  outbound-led:  ${report.canonical.outboundLed.display} ${report.canonical.outboundLed.band} ` +
    `(gaps: ${report.canonical.outboundLed.gaps.join(", ") || "none"})`,
);

if (failures.length > 0) {
  console.error(`\nFAIL — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\nPASS");
