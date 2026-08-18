# Next session — build the homepage from the amalgamation proposal

**Model:** Sonnet for the build (structured copy application into existing components, with the
proposal and the claims register as rails). Opus only if the §7 graphic needs real design
iteration.

**Status: unblocked.** Brad ruled on the seven decisions on 18 August — recorded in
`design/12-homepage-amalgamation-proposal.md` **§9**, which is now the build brief. Base
confirmed; proof-strip slot = eight consecutive renewals; fourth moment = reseller
renegotiation; graphic = Option A ("One motion, four eras"); Steak Out = standalone blog post,
no homepage teaser; AI year = capability-first framing, Pikle demoted to a mention, Clarity
Engine off the career row.

## Second round of rulings landed later on 18 Aug — see proposal §9 (end)

Resolved: **99 Corp figures are Rob's set** (around 30% more profit per customer, around 70%
more clients) — the 55%/30% placeholder at `index.astro:63` dies. GCT scope grew: conference
*presenter*, and Brad authored and delivered the training (live workshops + self-paced
development).

## The hero is RULED and SHIPPED — 18 Aug, do not reopen

Brad approved his own round-eleven line, U2 with the trims, and it is applied and pushed:
H1 **"I win, grow and renew accounts."**, pill **"Account management"**, support line
**"Commercial operator across SaaS, web strategy and revenue systems."** (The trims kill a
three-deep repetition the layout test exposed — record in `COPY/hero-lines/hero-lines.md`,
end of round eleven.) The H1 and pill are settled copy. The support line is still holding
copy and may be reworked in the §9 build, but must not reintroduce "keeps/expands/renews" —
the H1 owns that now.

## Two things still needing Brad during the build

1. **The training verb.** Brad wants "built and delivered the training material"; "built"
   collides with the build-verb rule (constraint 7). Present "created and delivered" vs his
   verbatim wording as an explicit override — his call.
2. **The field-notes teaser** — one story from plastic bags / Cubs uniform, or none (§9,
   ruling 6). Steak Out is excluded.

Also fix regardless: the 70%/120% figures sit under the *Xplore* row at `index.astro:84–87` —
wrong role, live today.

## New registered material, 18 August

`COPY/brad-verified-claims-transcript.md` now ends with a dated addendum: (a) the AI year is
confirmed hands-on Brad's; (b) the full 2015–2025 commercial scope (sales strategy through
channel-contract negotiations), with Brad's three caveats — must not price him out of
account-management roles, must not read as a GM-title demand, must stay transferable and not
edtech-fenced. §9 of the proposal records the adopted treatment: fold the breadth into the
2015 career-row detail and the five capability cards, grouped demand/land/keep/grow. No new
homepage section.

## Files to read first, in this order

1. This file.
2. `design/12-homepage-amalgamation-proposal.md` — **§9 first** (the rulings), then §3–§8.
3. `COPY/brad-verified-claims-transcript.md` — the fact gate, including the 18 Aug addendum.
4. `design/00-current-direction.md` — binding rules.
5. `src/pages/index.astro` — the components being reused.

## Other unverified item before ship

The draft's "zero customers lost" (2020) is not in the register; the registered 108 line says
"interviews with teachers," not "client calls." Check `COPY/interviews/`; if unregistered, the
moment ships without that claim.

## Standing constraints carried forward

- **Noindex gate stays** (`public/robots.txt` + the meta tag in `src/layouts/SiteLayout.astro`)
  until Brad explicitly signs off the copy. Removing it is his call, and a separate ruling.
- `main` auto-deploys to production on push (Netlify site `brad-friis`,
  ID `e8cdef6b-0d72-4133-acf5-f2af31df448f`) — review before commit.
- Education employer never named; settlement gag; hedges verbatim; no combined/derived figures;
  Brad chooses the copy — present options, never swap unasked.
- Full constraint-sweep checklist: proposal §8 step 4.
- Housekeeping still open, still not blocking: `.shots/cdp/**` noise needs a `.gitignore` entry
  and cleanup commit; Netlify GitHub App repo-access scope unverified.
