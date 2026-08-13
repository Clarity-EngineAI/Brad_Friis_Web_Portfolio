# Next session

**Updated:** Thursday 13 August 2026, 5:50 PM NZST
**Status:** Bespoke Astro static site. Framer and the Prolens template are abandoned. The build passes
with zero errors, warnings and hints across 10 pages, and all six published references now carry a
redacted scan. Nothing is known-broken; the site has not yet been reviewed in a real browser.

**Recommended focus:** review the site in a real browser at three widths, then deploy a Netlify
preview. Do not add features before there is a shareable URL.

## Read first, in this order

0. `README.md` — what this project is, where authority lives, and the hard rules. Start here.
1. `design/08-visual-direction.md` — the approved visual direction and what was explicitly rejected. This is the current design authority.
2. `COPY-SOURCE-OF-TRUTH.md` — copy source of truth. Section 6 carries corrected verbatim reference quotes; the section above "Fact checks still needed" carries Brad's employment-date rulings. Despite the filename it still governs.
3. `Brad Friis Resumes/References/README.md` — which six references publish, which four never do.
4. `design/07-framer-feasibility.md` — still valid for its token values: spacing ladder, radius ladder, border alphas.
5. `design/06-hybrid-direction.md` — the original layout logic and risk list.

## Start with these actions

1. Run `ASTRO_TELEMETRY_DISABLED=1 npm run build`. The telemetry env var is required or the build fails with an `EPERM` on the Astro telemetry directory. It must pass with zero errors and zero warnings.
2. Run `ASTRO_TELEMETRY_DISABLED=1 npm run dev` and review `/`, `/letters/`, each `/letters/<slug>/`, `/cv/` and `/thanks/` at 1440px, 768px and **390px**. The phone breakpoint is where layouts break; check the oversized hero name does not cause horizontal scroll. Pay attention to the two-page scans on `/letters/andrew-bergh/` and `/letters/the-industry-school/`, which stack two full-page images and were added without browser review.
4. Test keyboard access end to end: skip link, capability pill selector (roving tabindex, arrow keys), contact form, every link. Focus must be visible everywhere.
5. Print `/cv/` to PDF and confirm it is clean.
6. Connect the GitHub repo to Netlify and deploy a preview. `netlify.toml` is already written; no configuration should be needed in their interface.

## Decisions already locked — do not reopen

- **Delivery is Astro, not Framer.** Framer could only carry the list/detail pattern as an unmaintainable bespoke section, so owning the code directly is cheaper.
- **All six consented references publish**, newest first. Never publish Deane Jessep, 95bFM, MySimpleSiteMan or the Canwest Sales Figures — the last carries six former colleagues' performance data.
- **Reference quotes are verbatim single sentences**, and verbatim means checked against the scan, not against a transcription. Never splice two sentences, never drop a hedge, never promote "one of" to "the". The letters sit beside the quotes and are checkable in one click. Three quotes were overstated and a fourth was drawn from a paraphrase; all are corrected in `COPY-SOURCE-OF-TRUTH.md`.
- **`Brad_Friis_The-Industry-School-Reference.md` is a digest, not a transcription.** It invents section headings and paraphrases sentences. The site published it as the letter until 13 August 2026 and now holds the letter as written. Never quote from it. See the References README.
- **Phillip Lemon's attribution must carry the disclosure** that the letterhead is The Radio Network.
- **CanWest and Adplus publish no years.** The letters contradict the ranges and Brad chose to show none rather than one he cannot evidence. Adplus is named "Adplus Advertising (now Tracta)".
- **Hawke's Bay Tourism is a client account, not an employer.**
- **The education role started June 2015, so "ten years" stands.** The promotion to General Manager is real and stays.
- **Insights/blog is hidden for launch.** Contact form fields are settled: Name, Email, Organisation (optional), Reason dropdown, Message.
- **The repo is private and must stay private.** It holds resumes, reference letters and the education employer's name. Never make it public. If a public showcase repo is ever wanted, create a separate one containing only `src/` and `public/`.

## Non-negotiables

- Never name GCT Education in site output. It appears in source resumes; it must never reach `src/`, `public/` or `dist/`.
- Do not invent figures or imply any AI product has shipped. The Pikle work is commercial and UX work.
- Never publish the disputed Hawke's Bay Visitor Guide figures or the unconfirmed 400 per cent result.
- Education is proof, not the target industry.
- Workshops are product adoption and enablement, not a training role.
- UI/UX/CX is commercial product judgement, not designer-for-hire.
- Do not hide sales operations, lead generation, proposals, revenue systems or SaaS strategy.
- Keep consulting separate from the employment funnel; the Reason dropdown does this work.
- No dock, fake desktop, dashboard widgets or command-centre naming.
- New Zealand English throughout.
- Never create backup, temp or versioned copies of files.

## Outstanding, needs Brad

- **Is `brad@clarityengine.co` monitored?** The master resume lists `clarityengineai@gmail.com`. A hiring site with a dead contact address is the worst possible bug.
- **The phone number on the CV document is malformed** — `+64 022 854 9696` cannot have both the country code and the trunk zero. The site uses `+64 22 854 9696`; the document Brad sends recruiters still has the broken version.
- **A portrait.** A placeholder slot is built and the swap is a one-line change.
- **`HB_Tourism.pdf` in `redacted and cropped finals/` is unredacted** and was rejected — its letterhead still shows the office address, telephone, facsimile and `info@` address. The site keeps the older redacted `hawkes-bay-tourism.jpg`. Redact the letterhead if the newer crop is wanted.
- **The CanWest scan carries a duplicated line** in the third paragraph that the original does not. Brad chose to publish anyway. Regenerate from the original if it ever bothers him.
- **Rename `Napier City Councillor.jpg`** to `Deane Jessep.jpg`. It names Jessep's office, not any role of Brad's, and since the document is unpublished the filename is all a future reader sees.
- **Does the logo strip survive review?** It skews to the media and agency years and may pull the story away from SaaS. Cut it if it pulls focus.

## Options

- **A (recommended):** Verify the design pass, fix what browser review turns up, deploy the Netlify preview. Rationale: everything else is speculative until Brad can open the site on his phone and send the URL to someone.
- **B:** Point `brad.clarityengine.co` at Netlify and go live. Only after A passes and the contact address is confirmed.
- **C:** Revisit the hero scale or cut the logo strip if the measured direction reads as too much. Brad explicitly reserved the right to rewind; the clamp on the hero name is a one-line change.
