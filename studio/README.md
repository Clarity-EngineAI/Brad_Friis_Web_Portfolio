# Sanity Studio — Brad Friis

The editing interface for bradfriis.com. Sanity-hosted, so the Astro site stays fully
static and gains no SSR surface.

- **Project:** `ao34shul` · dataset `production`
- **Studio:** https://bradfriis.sanity.studio
- **Site:** https://bradfriis.com

## What Sanity owns

Blog posts only, at this stage. Hero, career rows, capabilities and letters are still
written in code; extending Sanity to cover them is the next increment, deliberately left
until the blog pipeline had been proven end to end.

Sanity replaces `src/data/blog.ts` as the *delivery* layer. It does **not** replace
`COPY/`, which is the reasoning record — every line of site copy with a status and a
for/against case, including rejected lines that are never deleted. Two different
artefacts; do not migrate one into the other.

## How publishing works

Sanity is not a live connection. The site is static, built once and served as files, so
hitting Publish changes nothing until a build runs:

    Publish in Studio → Sanity webhook → Cloudflare deploy hook → astro build → bradfriis.com

The live host is Cloudflare only (`wrangler.jsonc`). An earlier Netlify build hook does
not publish the site. The Sanity webhook that calls Cloudflare must be created once in
the Sanity dashboard — see Setup below. **Without that webhook, Publish silently does
nothing.**

A build takes about two minutes. Changes are not instant.

## Content guardrails

Standing publication constraints from `COPY/brad-verified-claims-transcript.md` are
encoded in `schemas/guardrails.ts` and attached to every free-text field, so the warning
appears at the field while typing rather than in a review that may not happen:

- The 2015–2025 education sector employer is never named, and the dispute that ended
  that role is under a settlement gag.
- Deane Jessep, 95bFM and Canwest sales figures are never published.
- No self-assessment language; facts and third-party quotes carry characterisation.
- No invented, derived or combined figures.

The name and gag rules appear as field descriptions (they need judgement, and a regex
that tried to catch every phrasing would fire on innocent text). The barred names and
self-assessment phrases are enforced as validation that blocks publishing.

## Body model

Posts are built from three block kinds — heading, paragraph, section break — matching the
`BlogBlock` union the site has always used. Portable Text was considered and not adopted:
it would have meant rewriting `src/components/BlogBody.astro`, adding a serialiser, and
allowing formatting the site's typography cannot express. The three-kind model keeps the
renderer untouched.

## Ordering

Every query sorts `date desc` explicitly. The old array relied on hand-ordering plus a
comment; a query without an explicit sort returns documents in an arbitrary order and the
blog index would silently show the wrong posts first.

## Setup — remaining one-off steps

1. **Install and deploy the Studio**

       cd studio
       npm install
       npx sanity login
       npx sanity deploy

   Deploys to https://bradfriis.sanity.studio.

2. **Import the two existing posts** (from the repo root, once)

       SANITY_TOKEN=<write token> node scripts/import-posts.mjs

   Create the token at https://sanity.io/manage/project/ao34shul/api#tokens with Editor
   permissions. The script is idempotent — re-running updates rather than duplicates.

3. **Create the Sanity webhook** at
   https://sanity.io/manage/project/ao34shul/api#webhooks

   - URL: the Cloudflare deploy hook for this project (Workers / Pages), **not** the
     old Netlify hook
   - Dataset: `production` · Trigger on: Create, Update, Delete
   - Filter: `_type == "post"` · HTTP method: POST

4. **Verify end to end.** Change a post's standfirst, hit Publish, watch a deploy appear
   in the Cloudflare dashboard, then confirm the change on bradfriis.com. Until this
   passes, the CMS is not installed.

## Local development

    cd studio && npm run dev     # Studio at localhost:3333
    npm run dev                  # site at localhost:4321 (from repo root)

If Sanity is unreachable at build time, the build falls back to `src/data/blog.ts` and
prints `[sanity] ...` on stderr. A blog page that looks stale is the signal to check
that warning in the Cloudflare deploy log.
