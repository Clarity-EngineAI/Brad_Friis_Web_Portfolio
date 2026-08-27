# Next session

**Updated:** Thursday 27 August 2026, 2:33 PM NZST

**Recommended focus:** finish the Sanity → Cloudflare publish hook, then deploy the Studio so the new desk and Vision tool are live.

## Status

The Sanity CMS (blog) is installed but the publish pipeline is not complete after the
Netlify → Cloudflare move. Studio is up at https://bradfriis.sanity.studio. Four posts
are already in dataset `production` (`plastic-bags`, `cubs-uniform`, `simplesiteman`,
`Dog-bone`). Do **not** re-run `scripts/import-posts.mjs` — it overwrites live documents.

This session updated Studio config and docs. Dashboard steps still need Brad's logins.

Separately, 27 August 2026: Skip the Pitch How I work header was taken off the homepage
(clashed with the cards). Wording held in `COPY/section-headings/section-headings.md`.
Header restored to eyebrow / Five parts to my method / amalgamation lead. Landed with
this: week stack, CV/homepage week entry points, Cloud Agent environment, `AGENTS.md`,
sentence-wrap rule. Do not put Skip the Pitch back on How I work. Do not generate How I
work copy. Do not put nodes back on `/week/`. Do not edit the hero.

## Prompt for the next session

Complete the remaining one-off publish wiring so hitting Publish in Studio rebuilds
bradfriis.com.

1. Create a Cloudflare Deploy Hook on Worker `brad-friis-web-portfolio`
   (Settings → Builds → Deploy Hooks). Name it `Sanity publish`. Do not commit the URL.
2. Create a Sanity webhook at
   https://sanity.io/manage/project/ao34shul/api#webhooks pointing at that URL.
   Filter `_type == "post"`. Trigger on create/update/delete. Drafts off.
3. From `studio/`: `npm install`, then `npx sanity deploy` (login if prompted).
4. Verify: change a standfirst, Publish, confirm a Cloudflare build, then check
   bradfriis.com.

Do not commit unprompted. Stage only `studio/` plus the README/PRODUCT updates from
this session if Brad wants them in git.

## Files to read first

1. This file.
2. `studio/README.md` — current pipeline and remaining steps.
3. `studio/sanity.config.ts` and `studio/structure.ts` — desk + Vision.
4. `src/lib/sanity.ts` — build-time fetch and fallback.
5. `PRODUCT.md` — Cloudflare note and remaining webhook.
6. `AGENTS.md`
7. `design/00-current-direction.md`
8. `COPY/section-headings/section-headings.md` — How I work (held Skip the Pitch block)

## Options

1. **Finish the webhook + Studio deploy (recommended).** Without it, Publish does nothing
   to the live site. One-off, needs Cloudflare and Sanity logins.
2. **Wire the contact form off Netlify.** The form still uses `data-netlify`. That is a
   separate job (Cloudflare Worker or a form service), not the blog CMS.
3. **Commit the Studio config/docs** if Brad has already created the hook himself.

Recommend option 1.

Next: start a new session (Sonnet) to complete the Sanity → Cloudflare deploy hook wiring.
