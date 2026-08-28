/**
 * Generates blog images with OpenAI's gpt-image-1, styled to a fixed house theme so
 * every article's images read as one consistent set rather than independently
 * re-imagined each run.
 *
 * Run:
 *   node scripts/generate-blog-images.mjs              # only missing images
 *   node scripts/generate-blog-images.mjs --force      # regenerate everything
 *   node scripts/generate-blog-images.mjs hero         # one image, by key suffix
 *
 * The key of each image matches the `key` field of an imageBlock in Sanity and
 * the filename in src/assets/blog. Those three names must agree or the build
 * fails at getBlogImage, which is the intended behaviour.
 *
 * Costs money. gpt-image-1 at 1536x1024 high is roughly USD 0.17 per image.
 * The skip-if-exists default is deliberate so a re-run cannot silently double-bill.
 *
 * Model note: this was written for dall-e-3, which the API has since retired
 * ("The model 'dall-e-3' does not exist"). gpt-image-1 replaces it and drops the
 * `style` and `response_format` parameters; it always returns base64.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrompt } from "./blog-image-theme.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outputDir = join(here, "..", "src", "assets", "blog");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("OPENAI_API_KEY is not set.\n");
  console.error("Create a key at https://platform.openai.com/api-keys, then either:");
  console.error("  echo 'OPENAI_API_KEY=sk-...' >> .env   (the file is gitignored)");
  console.error("and run with:  node --env-file=.env scripts/generate-blog-images.mjs");
  console.error("or pass it for one run:  OPENAI_API_KEY=sk-... node scripts/generate-blog-images.mjs");
  process.exit(1);
}

const images = [
  {
    key: "agentic-ecommerce-hero",
    /* IMAGE 1 - HERO. Visual message: same person, different mission. */
    prompt: buildPrompt({
      type: "scene",
      subject:
        "Split-screen composition, divided vertically down the centre. The same woman appears on " +
        "both halves, clearly recognisable as one person. On the left half she is browsing for " +
        "running shoes and activewear, and the abstract product shapes floating behind her are " +
        "athletic: trainers, shorts, a water bottle. On the right half the same woman is browsing " +
        "for a formal outfit for a winter wedding, and the shapes behind her are elegant: a long " +
        "dress, heeled shoes, a clutch bag.",
      detail: "The two halves are visibly different in mood but share one colour palette so they read as a single picture.",
    }),
  },
  {
    key: "agentic-ecommerce-intent-model",
    /* IMAGE 2 - EXPLAINER GRAPHIC. Two stacked flows compared.
       Rewritten with an explicit node list and relationship (see blog-image-theme.mjs)
       after the first version came out visually ambiguous — "rigid vs flowing" named
       a mood, not a mechanism. In-image text labels were then added back deliberately
       (SHORT_LABELS in blog-image-theme.mjs) because shape alone couldn't carry
       "customer segment" vs "intent signals"; see that file's typography instructions
       for the follow-up fix to soft/synthetic-looking label rendering. */
    prompt: buildPrompt({
      type: "diagram",
      subject: "Two competing models of ecommerce personalisation, stacked one above the other for direct comparison.",
      nodes: [
        "customer history (a small archive/stack icon)",
        "customer segment (one fixed labelled-looking box)",
        "predetermined experience (a single static output shape)",
      ],
      relationship:
        "The upper row shows this three-step chain as rigid and linear: identical square nodes, straight arrows, " +
        "flat grey, one fixed destination shape, feeling closed and predetermined. The lower row shows a second, " +
        "different three-step chain (current behaviour, then intent signals, then a continuously adapting " +
        "experience) as fluid: rounded nodes in the single accent colour, curved arrows, feeling live and " +
        "responsive. The critical difference between the two rows is what happens at the end. The upper row " +
        "ends in exactly one output shape. The lower row fans out into a spray of four separate small output " +
        "shapes, stacked in a vertical column at the far right, each a different silhouette (a square, a " +
        "circle, a tall rectangle, a wide rectangle), with its own curved arrow reaching it from the final " +
        "node, so the fan of four is the single most eye-catching thing in the lower row. One output against " +
        "four outputs is the whole point of the picture. A few small dots flow into the lower chain from below " +
        "to represent the customer's historical data still feeding in as one input among several, not the " +
        "whole story. The two rows must be readable as two different structures, a closed chain against a " +
        "branching chain, not just two different colours.",
      detail:
        "Vertically stacked, generous gap between the two rows, both rows the same width and scale so they " +
        "compare directly. The two rows share one column grid: the first node of the lower row sits directly " +
        "beneath the first node of the upper row, the second beneath the second, the third beneath the third, " +
        "with the arrows between them the same length in both rows.",
    }),
  },
  {
    key: "agentic-ecommerce-category-page",
    /* IMAGE 3 - APPLIED ECOMMERCE VISUAL. One category page, early vs late session. */
    prompt: buildPrompt({
      type: "scene",
      subject:
        "Two abstract product grids side by side, separated by a thin vertical divider, each drawn " +
        "as a simplified rectangle of card shapes representing an online shop's category listing. " +
        "The left grid is visually mixed and unfocused: many different silhouettes of outdoor " +
        "furniture, tables, chairs and loungers, in assorted sizes and muted colours, with no " +
        "apparent order. The right grid is the same size but visibly resolved: the top rows are " +
        "filled with repeating matched shapes of one large outdoor dining table with six chairs, " +
        "highlighted in the single accent colour, while the remaining unrelated shapes fade towards " +
        "the bottom.",
      detail: "The left reads as broad and scattered, the right as narrowed and confident.",
    }),
  },
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate({ key, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      /* 1536x1024 is the widest gpt-image-1 offers, a 3:2 landscape. The blog
         figure is fluid, and the renderer generates 640/960/1280 widths from it. */
      size: "1536x1024",
      quality: "high",
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI returned ${response.status}: ${detail}`);
  }

  const payload = await response.json();
  const encoded = payload.data?.[0]?.b64_json;
  if (!encoded) throw new Error("Response contained no image data.");

  const target = join(outputDir, `${key}.png`);
  await writeFile(target, Buffer.from(encoded, "base64"));

  /* dall-e-3 returned a rewritten prompt to explain its output; gpt-image-1 does
     not, so this is usually absent and the caller prints nothing. */
  return { target, revised: payload.data[0].revised_prompt };
}

const force = process.argv.includes("--force");
const filters = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));

const selected = filters.length
  ? images.filter((image) => filters.some((filter) => image.key.includes(filter)))
  : images;

if (!selected.length) {
  console.error(`No image matched ${filters.join(", ")}. Known keys:`);
  for (const image of images) console.error(`  ${image.key}`);
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

let written = 0;
let failed = 0;

for (const image of selected) {
  const target = join(outputDir, `${image.key}.png`);

  if (!force && (await exists(target))) {
    console.log(`skip   ${image.key} (already exists, use --force to replace)`);
    continue;
  }

  process.stdout.write(`build  ${image.key} ... `);
  try {
    const { revised } = await generate(image);
    console.log("done");
    if (revised) {
      console.log(`       rewritten as: ${revised.replace(/\s+/g, " ").slice(0, 160)}...`);
    }
    written += 1;
  } catch (error) {
    /* One failure must not lose the images that already succeeded, so this
       records and continues rather than exiting. */
    console.log("failed");
    console.error(`       ${error.message}`);
    failed += 1;
  }
}

console.log(`\n${written} written, ${failed} failed, into src/assets/blog`);
if (failed) process.exit(1);
