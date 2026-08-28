# Next session

**Model:** Sonnet. This is finishing and verifying work already designed, not new architecture.

## Start here

**The feature is finished and verified live. Nothing is committed.** The task is to review the
work and commit it.

```sh
git status --short
git diff
```

Then commit. Note the separation problem in "Open, for Brad to decide" item 3 before you do:
the tree carries unrelated uncommitted work from earlier sessions.

Suggested split, if Brad wants clean history:

1. `feat(blog): add imageBlock schema and local-asset image pipeline` — the studio schema,
   `blogImages.ts`, the renderer and styles, `generate-blog-images.mjs`, the three PNGs, `.gitignore`
2. The pre-existing list-block and inline-bold work as its own commit

## Where things stand

Everything below is done and verified.

**Published and rendering.** The post `your-customer-hasnt-changed` is live in Sanity with 172 body
blocks including all three `imageBlock`s. `npm run build` is green at 21 pages, and the rendered HTML
at `dist/blog/your-customer-hasnt-changed/index.html` contains 3 figures, 3 responsive srcsets,
3 captions, correct alt text on each, and 12 generated WebP variants.

To re-verify at any point, query the live API, **not** `apicdn.sanity.io` — the CDN caches and will
show stale results:

```sh
curl -s 'https://ao34shul.api.sanity.io/v2026-08-19/data/query/production?query=*%5Bslug.current%3D%3D%22your-customer-hasnt-changed%22%5D%7B%22imgs%22%3Abody%5B_type%3D%3D%22imageBlock%22%5D.key%7D'
```

The import script is idempotent (fixed `_id`, `createOrReplace`), so re-running it is safe.

**Studio schema** — `imageBlock` added to [blockContent.ts](studio/schemas/blockContent.ts), registered
in [index.ts](studio/schemas/index.ts), and a post-level optional `image` (lead image) added to
[post.ts](studio/schemas/post.ts).

**Site rendering** — [blogImages.ts](src/data/blogImages.ts) (new) resolves a CMS key to a local file;
types and GROQ in [blog.ts](src/data/blog.ts) and [sanity.ts](src/lib/sanity.ts); rendering in
[BlogBody.astro](src/components/BlogBody.astro) and [[slug].astro](src/pages/blog/[slug].astro);
styles in [global.css](src/styles/global.css). Smoke-tested end to end: lead and inline images render,
WebP with 640/960/1280 srcsets, captions carried through. `astro check` 0 errors, build green at 21 pages.

**Three images generated**, in `src/assets/blog/`, each checked against its spec in the article:
`agentic-ecommerce-hero`, `agentic-ecommerce-intent-model`, `agentic-ecommerce-category-page`.

**`.env` added to [.gitignore](.gitignore)** — it was missing, only `.venv/` was listed.

## Decisions made, and why

**Images are repo files, not Sanity uploads.** Sanity stores only a *key*; the file lives in
`src/assets/blog` and is imported through Astro's asset pipeline, keeping hashing, generated widths
and build-time dimensions. A Sanity asset would be a CDN URL and would leave that pipeline entirely.
The cost: adding a blog image is a repo change **and** a CMS change. This is the trade Brad has not
yet explicitly ratified — worth confirming before the next article.

**OpenAI `gpt-image-1`, not DALL·E 3.** Brad chose DALL·E 3, but the API returns
`The model 'dall-e-3' does not exist` — it has been retired. `gpt-image-1` is the replacement and drops
the `style` and `response_format` parameters. The schema needed no change for this: it stores a
filename, so the generator is irrelevant to it.

**Secrets go in `.env`, never on the command line.** A Sanity token was exposed in shell history this
session and has been rotated. Do not suggest `SANITY_TOKEN=... node ...`.

## Open, for Brad to decide

1. **The intent-model image uses a brighter orange** than the muted beige and sage of the other two.
   Side by side in one article it reads louder than its neighbours. Regenerate with
   `node --env-file=.env scripts/generate-blog-images.mjs intent --force` (about USD 0.17) if it bothers him.
2. **IMAGE 2's labels are not in the picture.** The article specifies labelled nodes
   (`Customer history -> Customer segment -> ...`). Generative models cannot render reliable text, so the
   labels live in the caption and alt text instead. Getting them visibly into the image needs a real
   diagram tool, not a model.
3. **Nothing is committed.** The working tree also carries pre-existing uncommitted work from earlier
   sessions (list blocks and inline bold in `BlogBody.astro`, `blog.ts`, `sanity.ts`) that is **not**
   from this session. Separate the two before committing if that matters.

## Files to read first, in order

1. `src/data/blogImages.ts` — the key-to-file bridge, and the header explaining the trade
2. `studio/schemas/blockContent.ts` — the `imageBlock` type
3. `scripts/generate-blog-images.mjs` — the three prompts, transcribed from the article specs
4. `COPY/blog/Articles_Library/Agentic ecommerce.md` — IMAGE 1/2/3 specs at lines 33, 123, 259

## Cost note

Image generation is billed. About USD 0.17 per image at 1536x1024 high. The script skips existing
files by default so a re-run cannot silently double-bill; `--force` overrides that deliberately.
