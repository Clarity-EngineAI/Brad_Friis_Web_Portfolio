import type { ImageMetadata } from "astro";

/* The bridge between Sanity and Astro's asset pipeline.
 *
 * Blog images are not uploaded to the CMS. Sanity stores only a key (see imageBlock in
 * studio/schemas/blockContent.ts); the file itself lives in src/assets/blog and is imported
 * here, so it keeps the hashing, width generation and build-time dimensions that every other
 * image on the site gets. A Sanity asset URL would leave that pipeline.
 *
 * The cost of that trade is this file: adding an image to a post is a repository change as
 * well as a CMS change. Adding a key here that has no matching import, or publishing a key
 * that is not in this map, fails the build at getBlogImage rather than shipping a gap.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/blog/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

const byKey = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([path, module]) => [
    path.replace(/^.*\/([^/]+)\.[^.]+$/, "$1"),
    module.default,
  ]),
);

/**
 * The imported image for a CMS key, e.g. "agentic-ecommerce-hero".
 *
 * Throws at build time when the key has no file. A missing image is an authoring mistake
 * that should stop the build, not a hole that publishes silently.
 */
export function getBlogImage(key: string): ImageMetadata {
  const image = byKey.get(key);
  if (!image) {
    const known = [...byKey.keys()].sort().join(", ") || "(none)";
    throw new Error(
      `[blog] No image in src/assets/blog for key "${key}". Available keys: ${known}`,
    );
  }
  return image;
}

/** Whether a key has a file, for callers that prefer to skip rather than fail. */
export function hasBlogImage(key: string): boolean {
  return byKey.has(key);
}
