# Next session — wire bradfriis.com to Netlify

**Model:** Sonnet. Not Haiku — the git reconciliation and the DNS/cert verification both need
judgement, and misreading a half-propagated DNS state as a failure wastes a session. Not Opus
either; there is no architecture here.

**Task:** Deploy the existing Astro site to Netlify and point the purchased domain
`bradfriis.com` at it, with search indexing switched OFF until Brad signs the copy off.

---

## Status at handoff (18 August 2026)

**Decided by Brad this session:**

1. Host: **Netlify**.
2. DNS: **switch nameservers** to Netlify DNS (not per-record at Namecheap).
3. Indexing: **noindex until Brad explicitly signs the copy off as full and complete.**
   This is a gate, not a preference. Do not remove the noindex on your own judgement, and do not
   remove it because the copy "looks finished". Only Brad's explicit sign-off lifts it.
4. Sanity CMS: comes *after* the domain is live. Does not change the deploy shape.

**Verified this session (do not re-check):**

- `npm run build` passes cleanly — 15 pages, no errors.
- `astro.config.mjs` already sets `site: "https://bradfriis.com"` (apex, not www) and
  `output: "static"`. Both correct. Leave alone.
- `netlify.toml` exists and is correct: build command `npm run build`, publish `dist`,
  NODE_VERSION 22, security headers. It was written in anticipation and never used.
- No Netlify site has ever been linked — there is no `.netlify/state.json`. Netlify CLI is not
  installed. This is a first deploy, not a repair.
- Domain is registered at **Namecheap**, currently on their parking page. Nameservers are
  `dns1.registrar-servers.com` / `dns2.registrar-servers.com`. `www` resolves to
  `parkingpage.namecheap.com`. Nothing of Brad's is served yet.
- `public/` contains only `favicon.svg` — there is **no robots.txt yet**.

**Git state — read this carefully, it is the opposite of what it first looks like:**

- Local `main` is **9 commits AHEAD of origin**, not behind. HEAD is `57490cc`. These are
  unpushed local commits, so there is nothing to merge and no conflict to resolve — just push.
- Two files are **uncommitted**: `src/pages/index.astro` (1 line) and `src/styles/global.css`
  (30 lines, 16 insertions / 16 deletions). Review these with Brad before committing — they are
  small but they are live homepage and global styling.
- A large volume of `.shots/cdp/**` browser-cache noise is dirty in the working tree. It is
  committed to the repo and it should not be. Do not sweep it up as part of this task unless Brad
  asks — flag it and move on.

---

## The task, in order

### 1. Get a clean, pushed `main`

- Show Brad the diff of the two uncommitted files. Let him decide commit or discard.
- Push the 9 (or 10) commits to `origin/main`. Netlify builds from what is *pushed*, not from disk.

### 2. Add the noindex gate

- Create `public/robots.txt` with a blanket disallow.
- Belt and braces: also add `<meta name="robots" content="noindex, nofollow">` to the shared
  layout head, so a stray direct URL is still covered.
- Leave an obvious marker (a comment in both places) saying this is a deliberate gate awaiting
  Brad's sign-off, so a future session does not "helpfully" remove it.

### 3. Deploy to Netlify

- Install the Netlify CLI, run `netlify init` against the existing repo
  `Clarity-EngineAI/Brad_Friis_Web_Portfolio`.
- **Ask Brad whether that repo is public or private** — it was not confirmed this session, and it
  changes the GitHub authorisation step.
- Confirm the `.netlify.app` URL works and all 15 pages render. This URL is shareable with other
  LLMs immediately, which is Brad's actual goal — it does not wait on DNS.

### 4. Custom domain + nameserver switch

- Add `bradfriis.com` as the custom domain in Netlify; let it provision `www` as a redirect to
  apex (apex is canonical per `astro.config.mjs`).
- Netlify will output four nameservers. Give Brad the exact four values and tell him precisely
  where in the Namecheap dashboard to paste them (Domain List → Manage → Nameservers → Custom DNS).
- Warn him about propagation: minutes to hours, and nameserver switches sit at the slow end. The
  `.netlify.app` URL covers him in the meantime.

### 5. Verify

- Once propagated: apex and `www` both serve, HTTPS cert is valid, no redirect loop, all 15 pages
  resolve, and `robots.txt` is being served with the disallow intact.

---

## Constraints that still apply

- Do not deploy anything that breaches the standing content rules: the education employer is never
  named anywhere including images; the settlement gag covers the cancelled-contract wording. A
  public URL is where a breach becomes permanent and indexed — this is exactly why indexing is
  gated.
- Do not touch homepage copy. The Cursor restructure brief (hero option A/B, pill choice) is
  **unstarted and blocked on Brad's decision**. This session ships the *current* homepage as-is.
  Deploying is not permission to fix the copy.
- Do not install or configure Sanity in this session.

---

## Sanity, for later (not this session)

Scope is unchanged: Sanity owns blog bodies only. Sales copy and the publish gate stay in `COPY/`
permanently. Because the build stays static, adding Sanity later needs only:

- Two env vars in the Netlify UI (`SANITY_PROJECT_ID`, `SANITY_DATASET`).
- A Netlify build hook URL pasted into Sanity, so publishing a post triggers a rebuild.
- No change to `output: "static"`, no SSR, no serverless functions.

If Sanity is unreachable at build time the build fails and the last good deploy keeps serving.
That is the safe failure mode and it is the default — leave it.

---

## Files to read first, in this order

1. `netlify.toml` — already correct, confirm nothing drifted.
2. `astro.config.mjs` — confirm `site` and `output` unchanged.
3. `src/layouts/` — find the shared head for the noindex meta tag.
4. `NEXT-SESSION-PROMPT.md` — this file.

Do not re-read the homepage copy or the `COPY/` library. Not needed for this task.
