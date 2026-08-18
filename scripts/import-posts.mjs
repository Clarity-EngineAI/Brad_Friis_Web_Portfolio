/**
 * One-off import of src/data/blog.ts into Sanity.
 *
 * Run once, after `npx sanity login`:
 *   SANITY_TOKEN=<write token> node scripts/import-posts.mjs
 *
 * Idempotent: documents use a deterministic _id derived from the slug, so re-running
 * updates the same documents rather than creating duplicates.
 */
import { createClient } from "@sanity/client";
import { posts } from "../src/data/blog.ts";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("SANITY_TOKEN is not set. Create a write token at");
  console.error("https://sanity.io/manage/project/ao34shul/api#tokens");
  process.exit(1);
}

const client = createClient({
  projectId: "ao34shul",
  dataset: "production",
  apiVersion: "2026-08-19",
  token,
  useCdn: false,
});

/* Sanity array members need a stable _key. Index-based keys are fine here because the
   import runs once against a fixed source array. */
function toSanityBody(blocks) {
  return blocks.map((block, index) => {
    const _key = `block-${index}`;
    if (block.kind === "break") return { _key, _type: "breakBlock" };
    if (block.kind === "heading") return { _key, _type: "headingBlock", text: block.text };
    return { _key, _type: "paragraphBlock", text: block.text };
  });
}

const transaction = client.transaction();

for (const post of posts) {
  transaction.createOrReplace({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    dek: post.dek,
    date: post.date,
    category: post.category,
    body: toSanityBody(post.body),
  });
  console.log(`queued: ${post.slug} (${post.body.length} blocks)`);
}

await transaction.commit();
console.log(`\nImported ${posts.length} posts into ao34shul/production.`);
