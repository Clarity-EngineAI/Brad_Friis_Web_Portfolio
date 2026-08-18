# Next session — verify HTTPS is live, decide on the second homepage stat-figure and design-doc changes

**Model:** Haiku for the HTTPS check alone (a single curl + report). Switch to Sonnet only if the
cert still hasn't provisioned after 24h and something needs real diagnosis, or if you also pick up
the uncommitted design-doc changes noted below (those need judgement, not just a status check).

**Task:** Confirm `https://bradfriis.com` is serving over HTTPS with a valid cert, then close the
loop on deploy. Everything else about the deploy is done — this session's only open item is a
passive wait on Netlify's Let's Encrypt provisioning.

---

## Status at handoff (18 August 2026, continued from earlier same-day session)

**Site is live and correctly configured. Read this in full before touching anything — there was a
duplicate-site false start this session that is now cleaned up, and re-deploying against the wrong
site would resurrect the confusion.**

### What's done

1. Reviewed and committed the two files flagged by the prior handoff (`src/pages/index.astro`,
   `src/styles/global.css`) — stat figure abbreviated to "2.8K → 24.5K", CSS spacing hack replaced
   with a targeted nth-child rule. Brad reviewed and approved before commit.
2. Added the noindex gate: `public/robots.txt` (blanket disallow) and
   `<meta name="robots" content="noindex, nofollow">` in `src/layouts/SiteLayout.astro`. Both
   carry an explicit "deliberate gate, do not remove without Brad's sign-off" comment. **This gate
   is still active and correct — do not remove it.** Only Brad's explicit sign-off that the copy is
   full and complete lifts it, not "it looks done" or a new session's judgement call.
3. Pushed 11 commits to `origin/main` (`Clarity-EngineAI/Brad_Friis_Web_Portfolio`, confirmed
   private repo).
4. **Netlify site:** `brad-friis` (site ID `e8cdef6b-0d72-4133-acf5-f2af31df448f`). This is the
   ONE correct site — see "the duplicate-site mistake" below before creating or linking anything.
   - GitHub repo linked, auto-deploys from `main` on every push (confirmed: a `ready` production
     deploy from `main`, `deploy_source: api`, i.e. git-triggered).
   - Local repo's `.netlify/state.json` is linked to this site (`netlify link --id
     e8cdef6b-0d72-4133-acf5-f2af31df448f` was run to fix a stale link — don't need to redo this).
   - Netlify.app URL: `https://brad-friis.netlify.app` — confirmed 200, confirmed serving the
     latest commit content (checked for "2.8K → 24.5K" and the noindex meta tag, both present).
5. **Custom domain:** `bradfriis.com` added as primary domain on the `brad-friis` site, `www`
   redirects to apex (matches `astro.config.mjs`'s `site: "https://bradfriis.com"`, apex canonical).
   Both show "Netlify DNS" with a green check in the dashboard.
6. **Nameservers:** Namecheap's Custom DNS was set to the four Netlify values
   (`dns1-4.p05.nsone.net`). Confirmed propagated — `dig +short NS bradfriis.com` returns all four.
7. Plain HTTP already serves the correct site on the apex (`curl http://bradfriis.com/` returns the
   real homepage, not a placeholder).
8. Netlify's dashboard confirms: **"DNS verification was successful"** under SSL/TLS certificate.
   Cert provisioning was in progress at handoff.

### What's NOT done — the one open item

**HTTPS was not yet live at handoff.** `curl https://bradfriis.com/` was returning connection
failures (exit code 60 — cert/handshake failure), consistent with Let's Encrypt still issuing the
certificate. Netlify's own UI says this can take up to 24 hours, though it's usually much faster.

**First thing to do next session:** run
```
curl -s -o /dev/null -w "%{http_code}\n" https://bradfriis.com/
curl -s -o /dev/null -w "%{http_code}\n" https://www.bradfriis.com/
```
If both return `200`, HTTPS is live — spot-check `/cv/`, `/blog/`, `/letters/`, confirm
`https://bradfriis.com/robots.txt` still shows the disallow, and this task is fully closed, nothing
further needed. If still failing after a full 24h from 18 Aug ~13:45 (i.e. after 19 Aug ~13:45),
that's outside Netlify's own stated normal window — worth checking their troubleshooting guide
(linked from the SSL/TLS panel in Site settings → Domain management) or contacting Netlify support,
not re-doing the DNS/domain setup, which is already correct.

### The duplicate-site mistake, for context (already fixed, nothing to do here)

Early in this session, before checking whether a Netlify site already existed, a new site
(`brad-friis-portfolio`) was created via CLI and manually deployed to (`netlify deploy --prod`).
Partway through, it turned out Brad had already created a **different** site called `brad-friis`
through the dashboard while following the GitHub-linking instructions given earlier in the session
— and that site, not the CLI-created one, is the one the custom domain and nameservers ended up
attached to. `brad-friis-portfolio` was deleted once this was discovered (confirmed via
`netlify sites:list` showing only `brad-friis` afterward). No further action needed — just don't be
surprised if you see references to `brad-friis-portfolio` in old shell history or screenshots from
earlier in the same day; it no longer exists.

---

## Separate, lower-priority items noticed but explicitly out of scope for the deploy task

These were flagged during the session but deliberately not touched, because the task was "deploy
what exists," not "also fix these":

1. **Uncommitted design docs and new files** — as of this handoff, `design/00-current-direction.md`
   and `design/01-positioning-brief.md` have uncommitted changes, and there are several new
   untracked files (`COPY/perplexity-copy-brief.md`, `COPY/section-headings/blog-section-name.md`,
   `design/11-copy-leverage-plan.md`, `design/review/`, `design/wireframes/`, `LLM reviews/`, "New
   approach images/", plus some resume/logo asset changes under `Brad Friis Resumes/`). None of
   these were reviewed or committed this session — they weren't part of the deploy task. If Brad
   wants these committed too, review with him first the same way the two homepage files were
   reviewed before committing.
2. **`.shots/cdp/**` browser-cache noise** — still dirty and still committed to the repo (a lot of
   Chrome DevTools Protocol cache files under `.shots/cdp/`). Flagged again, not touched again.
   Worth a `.gitignore` entry and a cleanup commit at some point, but that's a separate, deliberate
   task, not a side effect of a deploy.
3. **GitHub App repo access scope** — not verified whether the Netlify GitHub App was granted
   access to just `Brad_Friis_Web_Portfolio` or to all repos in `Clarity-EngineAI`. Worth a quick
   check next time you're in GitHub's App settings, not urgent.

---

## Constraints that still apply (unchanged from prior handoff)

- Education employer is never named anywhere including images; the settlement gag covers the
  cancelled-contract wording. The noindex gate stays until Brad's explicit sign-off — see above.
- Do not touch homepage copy beyond what's already committed. The Cursor restructure brief (hero
  option A/B, pill choice) is still unstarted and blocked on Brad's decision.
- Sanity CMS is still not installed — comes after domain is fully live and stable, per the original
  plan. No change to that plan from this session.

---

## Files to read first, in this order

1. This file.
2. `netlify.toml` and `astro.config.mjs` — only if something about the build looks wrong; otherwise
   skip, both were confirmed correct and unchanged.
3. Nothing else is needed for the HTTPS check itself.
