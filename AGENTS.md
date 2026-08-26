# Agent notes — Brad Friis personal site

Read `design/00-current-direction.md` first, then `NEXT-SESSION-PROMPT.md` for the open task.
Do not invent a product direction. Do not restore Framer/Prolens material in `archive - do not use/`.

## Stack

Astro 7, TypeScript strict, static output. Homepage and CV copy live in `.astro` files, not the CMS.
Sanity is for blog post bodies only. Deploys to Cloudflare only (`wrangler.jsonc` → `dist/`).

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run dev      # http://localhost:4321
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build    # check + static build; must be 0 errors/warnings/hints
```

`ASTRO_TELEMETRY_DISABLED=1` is required or the build fails with `EPERM`.

## Hard rules

These are not style preferences. Full list is in `README.md` and `PRODUCT.md`.

1. Never name the 2015–2025 education employer, anywhere in `src/`, `public/`, or `dist/`. Describe the role via PowerSchool / Schoology / itslearning. The settlement dispute is gagged.
2. Reference quotes are verbatim single sentences. Never splice, never drop a hedge.
3. No invented figures. Nothing that implies an AI product has shipped.
4. New Zealand English in all copy, comments, and UI: organise, colour, analyse, centre, recognise, personalised, licence (noun), defence.
5. Copy changes go through `COPY/` with a status (In use / Available / Held / Rejected). Nothing rejected is deleted.
6. Never create backup, temp, or versioned copies of files.
7. This repository is private and must stay private.

Voice (everything except the blog): first person; no second person; no industry noun in display type; no advertising-device rhythm. Spec: `design/01-positioning-brief.md` §7.

## Cursor Cloud specific instructions

- Dev server: `http://localhost:4321` (started from `.cursor/environment.json` `terminals`).
- After a UI change, open the site in the browser and exercise the changed flow. A single screenshot of a static render is not verification.
- Routes that usually share state: `/`, `/cv/`, `/week/`, `/letters/`, `/blog/`.
- Do not deploy, publish, or change Cloudflare/Wrangler production from an agent unless Brad asks.
- One Cloud Agent per PR. Follow up on the same agent for the same job. A new agent is a new VM — use it for a new workstream, pointed at `main` (or the intended base), and let it create its own `cursor/…` branch.
- Do not add MCP servers or extra skills “just in case.” Put durable facts here; put the current task in `NEXT-SESSION-PROMPT.md`.
