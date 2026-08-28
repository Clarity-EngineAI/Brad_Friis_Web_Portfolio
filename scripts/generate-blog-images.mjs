/**
 * Generates the blog images for "Agentic ecommerce" with OpenAI's DALL·E 3.
 *
 * The prompts below are transcribed from the IMAGE 1/2/3 specs in
 * COPY/blog/Articles_Library/Agentic ecommerce.md. That file stays the source of
 * truth: if a spec changes there, change the prompt here to match.
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
 * Costs money. gpt-image-1 at 1536x1024 high is roughly USD 0.17 per image, so a
 * full run of three is about USD 0.50. The skip-if-exists default is deliberate.
 *
 * Model note: this was written for dall-e-3, which the API has since retired
 * ("The model 'dall-e-3' does not exist"). gpt-image-1 replaces it and drops the
 * `style` and `response_format` parameters; it always returns base64.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

/* A shared clause on every prompt. The site's blog is editorial, not a product
   brochure, so the images need to read as illustration rather than stock photography
   or a UI screenshot. Naming what to avoid does more work here than naming a style. */
const HOUSE_STYLE =
  "Editorial illustration for a business article. Restrained, flat, modern vector style " +
  "with a light neutral background and a single muted accent colour. Generous white space. " +
  "Calm and professional, not playful. No text, no words, no letters, no numbers, no labels, " +
  "no logos, no watermarks, no user interface chrome, no photorealism, no 3D render, " +
  "no stock-photo look, no clip art.";

const images = [
  {
    key: "agentic-ecommerce-hero",
    /* IMAGE 1 - HERO. Visual message: same person, different mission. */
    prompt:
      "Split-screen composition, divided vertically down the centre. The same woman appears on " +
      "both halves, clearly recognisable as one person. On the left half she is browsing for " +
      "running shoes and activewear, and the abstract product shapes floating behind her are " +
      "athletic: trainers, shorts, a water bottle. On the right half the same woman is browsing " +
      "for a formal outfit for a winter wedding, and the shapes behind her are elegant: a long " +
      "dress, heeled shoes, a clutch bag. The two halves are visibly different in mood but share " +
      "one colour palette so they read as a single picture. " +
      HOUSE_STYLE,
  },
  {
    key: "agentic-ecommerce-intent-model",
    /* IMAGE 2 - EXPLAINER GRAPHIC. Two stacked flows compared.
       DALL·E cannot render reliable text, so the labels are carried by the caption
       and alt text in the CMS instead. The picture supplies structure only. */
    prompt:
      "A clean abstract diagram comparing two processes, arranged as two horizontal rows stacked " +
      "one above the other. The upper row is a rigid linear chain of three identical square nodes " +
      "joined by straight arrows, ending in a single fixed shape, drawn in a flat grey to feel " +
      "static and predetermined. The lower row is a flowing chain of three rounded nodes joined by " +
      "curved arrows, ending in a shape that branches into several adapting variations, drawn in a " +
      "single warm accent colour to feel live and responsive. Several small signal dots feed into " +
      "the lower row from below. The contrast between rigid and adaptive is the whole point of the " +
      "picture. " +
      HOUSE_STYLE,
  },
  {
    key: "agentic-ecommerce-category-page",
    /* IMAGE 3 - APPLIED ECOMMERCE VISUAL. One category page, early vs late session. */
    prompt:
      "Two abstract product grids side by side, separated by a thin vertical divider, each drawn " +
      "as a simplified rectangle of card shapes representing an online shop's category listing. " +
      "The left grid is visually mixed and unfocused: many different silhouettes of outdoor " +
      "furniture, tables, chairs and loungers, in assorted sizes and muted colours, with no " +
      "apparent order. The right grid is the same size but visibly resolved: the top rows are " +
      "filled with repeating matched shapes of one large outdoor dining table with six chairs, " +
      "highlighted in a single accent colour, while the remaining unrelated shapes fade towards " +
      "the bottom. The left reads as broad and scattered, the right as narrowed and confident. " +
      HOUSE_STYLE,
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
