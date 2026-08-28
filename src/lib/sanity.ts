import { createClient } from "@sanity/client";
import type { BlogPost, BlogBlock } from "../data/blog";
import { posts as fallbackPosts } from "../data/blog";

const projectId = "ao34shul";
const dataset = "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-19",
  useCdn: false, // A static build runs once per publish; stale CDN data would defeat the webhook.
});

/* Sanity's document shape, before it is mapped to the site's BlogPost. The _type on each
   body block is the schema name; the site's discriminant is `kind`. */
interface SanityBlock {
  _type: "headingBlock" | "paragraphBlock" | "listBlock" | "breakBlock" | "imageBlock";
  text?: string;
  style?: "bullet" | "number";
  items?: string[];
  key?: string;
  alt?: string;
  caption?: string;
}

interface SanityImage {
  key?: string;
  alt?: string;
  caption?: string;
}

interface SanityPost {
  title: string;
  slug: string;
  dek: string;
  date: string;
  category: string;
  image: SanityImage | null;
  body: SanityBlock[] | null;
}

/* Ordering is stated explicitly. The site's newest-first order was previously held only by
   a hand-sorted array and a comment; a GROQ query without this clause returns documents in
   an arbitrary order and the homepage would silently feature the wrong posts. */
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(date desc, _createdAt desc) {
  title,
  "slug": slug.current,
  dek,
  date,
  category,
  image{ key, alt, caption },
  body[]{ _type, text, style, items, key, alt, caption }
}`;

/** en-NZ long date, matching the hand-written dateLabel format ("15 August 2026"). */
function formatDateLabel(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function toLeadImage(image: SanityImage | null): BlogPost["image"] {
  if (!image?.key || !image.alt) return undefined;
  return { key: image.key, alt: image.alt, caption: image.caption };
}

function toBlogBlocks(blocks: SanityBlock[] | null): BlogBlock[] {
  if (!blocks) return [];
  return blocks.flatMap<BlogBlock>((block) => {
    if (block._type === "breakBlock") return [{ kind: "break" }];
    if (block._type === "imageBlock") {
      /* Alt text is required in the schema, so an image missing one is a document that
         predates the field. Dropping it beats publishing an unlabelled image. */
      if (!block.key || !block.alt) return [];
      return [{ kind: "image", key: block.key, alt: block.alt, caption: block.caption }];
    }
    if (block._type === "listBlock") {
      if (!block.items?.length) return [];
      return [{ kind: "list", style: block.style ?? "bullet", items: block.items }];
    }
    if (!block.text) return [];
    if (block._type === "headingBlock") return [{ kind: "heading", text: block.text }];
    return [{ kind: "paragraph", text: block.text }];
  });
}

/**
 * Blog posts for the build, newest first.
 *
 * Falls back to `src/data/blog.ts` when Sanity is unreachable or returns nothing, so an
 * outage or an expired token produces the previous content rather than an empty blog.
 * The fallback is announced on stderr — a silent fallback would hide a broken pipeline.
 */
export async function getPosts(): Promise<BlogPost[]> {
  let raw: SanityPost[];

  try {
    raw = await client.fetch<SanityPost[]>(POSTS_QUERY);
  } catch (error) {
    console.warn(
      `[sanity] Fetch failed, building from src/data/blog.ts instead: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return fallbackPosts;
  }

  if (!raw || raw.length === 0) {
    console.warn("[sanity] No posts returned, building from src/data/blog.ts instead.");
    return fallbackPosts;
  }

  return raw.map((post) => ({
    slug: post.slug,
    title: post.title,
    dek: post.dek,
    date: post.date,
    dateLabel: formatDateLabel(post.date),
    category: post.category,
    image: toLeadImage(post.image),
    body: toBlogBlocks(post.body),
  }));
}
