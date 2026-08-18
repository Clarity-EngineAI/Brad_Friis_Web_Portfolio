# Next session — blog images, then extend the CMS past the blog

**Model:** Opus for tasks 1 and 3 — both are design decisions before they are typing. Task 1
decides how images enter a static Astro build without giving up optimisation; task 3 is a
rewrite of two pages whose copy is inline rather than in data files. **Sonnet is enough for
task 2** (the booking embed) once Brad has chosen hosted-versus-custom, since it is then a
styling and placement job.

Order them 1, 2, 3 or 2, 1, 3 — the booking embed is independent of the image work and is the
shortest of the three, so it is a reasonable warm-up.

## Where things stand — the CMS is installed and working

Verified end to end on 19 August 2026, not merely committed:

- Brad edited a post in the Studio and clicked Publish.
- Sanity's webhook fired the Netlify build hook unprompted.
- Netlify deploy `16:10 — "Deploy triggered by hook: Sanity publish"` went to `ready`.
- The site build read live Sanity content, with no `[sanity]` fallback warning.

That was the bar the previous handoff set — "until step 4 passes, the CMS is not installed."
It passes. **Do not re-verify the blog pipeline from scratch.** If a doubt comes up, check
one deploy title in Netlify rather than rebuilding the proof.

Both posts live in Sanity as `post-plastic-bags` and `post-cubs-uniform`.

## Read first, in this order

1. `studio/README.md` — what Sanity owns, the publish chain, the guardrails, and why the
   body model is a 3-kind union rather than Portable Text. Most context is here, not below.
2. `src/lib/sanity.ts` — the fetch layer, the GROQ query, and the fallback behaviour.
3. `studio/schemas/blockContent.ts` — the three block types an image type would join.

## One thing left over from the install

**The Studio only runs locally.** `cd studio && npm run dev` → http://localhost:3333.
Brad edits from that machine, with the dev server running; not from his phone.

The hosted Studio at `bradfriis.sanity.studio` is still blocked. `npx sanity login` fails on
the browser callback with a 404 — five attempts, three distinct failure modes. Upgrading the
CLI to v8 cleared an earlier 403 but not this. The config itself verifies clean, so this
looks environmental rather than a fault in the repo.

Worth **one** retry at the start of the session, since it may simply have been transient:

```
cd studio && npx sanity login && npx sanity deploy
```

If it 404s again, stop. Do not spend another session on it. The local Studio does everything
except remote access, and the fallback if Brad wants phone editing is to embed the Studio at
`/admin` — which is a real decision with a cost, because it adds an SSR surface to a static
build and the `X-Frame-Options = DENY` header in `netlify.toml` was deliberately left alone
on the strength of there not being one.

## Task 1 — images in blog posts (Brad's ask, 19 August 2026)

He asked for this directly: "I'd like to be able to add images to the blog too."

### The decision that has to be made first

Every image on the site today is a **local file imported through Astro's asset pipeline**:

```ts
import berghScan1 from "../assets/letters/andrew-bergh-1.png";
```

That is what gives the site optimisation, hashed filenames and width/height at build time.
Sanity images arrive as **remote CDN URLs instead**, which Astro cannot process the same way.

So the question is not "add an image field." It is: what does Brad get, and what does he
give up? Present it as a real trade before building either:

- **Sanity asset store** — he uploads in the Studio, alone, no terminal. Images serve from
  Sanity's CDN with URL-parameter transforms rather than Astro's pipeline. This is the only
  option that actually delivers what he asked for.
- **Local files** — keeps the existing pipeline exactly, but every image needs a developer
  and a commit, which defeats the request.

Recommend the asset store. Say plainly what it costs: images no longer pass through
`astro:assets`, so sizing and format come from Sanity URL parameters, and the blog's images
serve from a different host than the rest of the site's.

### What implementing it touches

`kind` is a discriminated union all the way through, so an image is a **fourth kind**, not a
new field bolted onto paragraphs. Four files move together:

- `studio/schemas/blockContent.ts` — add `imageBlock`: the asset, plus **required** alt text.
  Make alt required in the schema, not optional-with-a-note. It is the one accessibility
  guarantee that survives Brad writing at speed, and the schema is where it holds.
- `studio/schemas/post.ts` — add the new type to the body array's `of`.
- `src/data/blog.ts` — extend the `BlogBlock` union with the image kind. This is a **type**
  change to the fallback file, distinct from its content, which stays as it is.
- `src/lib/sanity.ts` — the GROQ query currently projects `body[]{ _type, text }`, which
  would silently drop an image's asset reference and return a block with no content. It needs
  the asset URL and dimensions projected explicitly. **This is the failure mode to watch**:
  the image would appear in the Studio, publish without error, and render as nothing.
- `src/components/BlogBody.astro` — a branch for the image kind. It is 16 lines and maps
  kinds to elements; the shape is obvious once you read it.

Include a caption field only if Brad wants one. Do not add it speculatively — every field in
the Studio is a field he has to understand.

### Verifying it

Same bar as the pipeline: an image is not working until it is **on bradfriis.com**. Upload
one in the Studio, Publish, wait for the hook-triggered deploy, load the post. A local
`astro build` proving the type-checks pass is not the same claim.

## Task 2 — "book a meeting" on the site (Brad's ask, 19 August 2026)

His words: "a calendly styled 'book a meeting' function". That phrasing is ambiguous and the
ambiguity is the whole decision — **actually Calendly**, or **custom-built to resemble it**.
Settle it with him before writing anything.

### What already exists

`src/components/ContactPanel.astro` is a complete, well-built contact form — name, email,
organisation, a reason select, message, posting to Netlify Forms with a honeypot, landing on
`src/pages/thanks.astro`. Booking is therefore **not filling a gap**. It is a faster path
competing with the existing slower one for the same click.

That makes placement a real question, not an afterthought. Recommendation: booking sits
**above** the form, with the form kept for people not ready to commit to a time. Someone
hiring for an account management role who wants to talk will take a slot over composing a
message and waiting a day — but plenty of visitors are not at that stage, and removing the
form would cost those.

### The recommendation, with its cost stated

Use a hosted scheduler — **Calendly, or Cal.com** (same model, open source, and its free tier
carries no branding, which Calendly's does). Style the container so it sits inside the site's
type and colour rather than looking bolted on. About 30 minutes.

Do **not** build a custom scheduler. It means reimplementing availability rules, timezone
conversion, calendar writes and reminder emails on a static site with no backend — days of
work and a permanent maintenance liability, for a booking form. If Brad wants the custom route
anyway, say plainly what it costs and let him decide; do not start it silently.

The cost of the hosted route, stated rather than glossed: a third-party script loads on the
page, on a site that currently loads none. That is a privacy and performance change, small but
real, and worth naming to Brad rather than absorbing quietly.

**Checked 19 August 2026: `netlify.toml` has no CSP**, only `X-Content-Type-Options`,
`Referrer-Policy` and `X-Frame-Options = DENY`. That last one governs other sites framing
bradfriis.com, not bradfriis.com framing a scheduler, so an embed needs no header change. Do
not add a CSP as part of this task — if one is wanted it is its own decision, and adding it
blind alongside a new third-party script is how a page silently stops working.

### The non-technical risk, which matters more than the implementation

**An empty calendar is worse than no calendar.** If a visitor opens it and finds no
availability for two weeks, that undercuts a candidate arguing he is responsive and easy to
deal with. Brad needs real slots open before this goes live. Raise it with him — it is his
call, but it is not a detail.

## Task 3 — extend Sanity past the blog

Brad's decision, unchanged and not to be reopened: Sanity owns every editable string, not
just blog bodies. Blog-first was the staged route to that end state, not the destination.

**The obstacle, found two sessions ago:** homepage and CV copy is not in `src/data/*.ts` at
all. It is inline in `src/pages/index.astro` (417 lines) and `src/pages/cv.astro` (279
lines). Covering hero, career rows and capabilities is a rewrite of both pages, not a data
migration. Materially larger than the blog step. Budget accordingly.

Suggested order, smallest genuine surface first:

- `src/data/letters.ts` — 349 lines, already list-shaped, closest analogue to the blog. Its
  `LetterBlock` union has five kinds to the blog's three, and it carries nine `ImageMetadata`
  imports for document scans. **Task 1 settles the asset question before this starts**, which
  is a good reason to do them in this order.
- `src/data/logos.ts` and `contact.ts` — same asset question, much smaller.
- Then the inline page copy, which is the real work.

**Widen the webhook filter when you do this.** It is currently `_type == "post"`, so only
blog posts trigger a rebuild. The moment Sanity owns a second document type, edits to it
publish silently into nothing — the exact failure the webhook exists to prevent. It lives at
https://sanity.io/manage/project/ao34shul/api#webhooks.

## What Sanity does not own

`COPY/` is the argument record — every line with a status and a for/against case, including
rejected lines, which are never deleted. Sanity replaces the delivery layer, not the
reasoning layer. Do not migrate `COPY/` into Sanity and do not propose it.

## Repo state

- Branch `main`, clean, pushed.
- Build clean, 15 pages, `astro check` reports 0 errors.
- `src/data/blog.ts` is the build-time fallback, relabelled as such. It announces itself on
  stderr when used; a silent fallback would hide a broken pipeline. Keep that property.
- `src/pages/preview/hero-a.astro` and `hero-c.astro` import the static post array directly
  and deliberately — design mockups, not live routes.
- Do not run `npm audit fix --force` in `studio/`. The advisories are browser-only Studio
  dependencies that never ship to bradfriis.com, and `--force` downgrades to a breaking
  version.
- The 99 Corporation raw `.ai`/`.psd` sources are gitignored. Brad's call. Settled; stop
  raising it.

## Still open, not a blocker

**Mobile PDF panning (cosmetic).** The 99 Corporation brand guide dialog was verified at
390×844 with device emulation — full screen, no page overflow, close button and
`src`-clear-on-close both work. The embedded PDF is wider than a phone screen, so Chrome's
own viewer pans horizontally inside the iframe. The fix, if Brad wants one, is an "open in
new tab" fallback on small screens, not a CSS change. Check breakpoints with **device
emulation**, never `resize_page`, which has given a false 390px overflow reading on this site
before.
