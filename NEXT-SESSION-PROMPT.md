# Next session

**Updated:** 13 August 2026, 2:14 PM NZST  
**Status:** Fresh-build path implemented in Astro. Framer is no longer the delivery path.

**Recommended focus:** test the static release in real browsers, make only evidence-backed corrections, then deploy it to a preview URL. The site now has a homepage, references page and printable CV page with no CMS or unnecessary dependencies.

## Prompt for the next session

Continue the bespoke minimal static site in `/Users/admin/Developer/Brad Personal Website`.

Start with these actions:

1. Run `npm install` if dependencies are unavailable, then `npm run dev`.
2. Review `/`, `/letters/` and `/cv/` at desktop, tablet and 390px mobile widths.
3. Test keyboard navigation, visible focus, the capability tabs, mobile capability stacking, mail links and CV print/PDF output.
4. Compare every public claim with `FRAMER-PASTE-SHEET.md`. Correct only from named sources; do not fill gaps from inference.
5. Confirm the preferred deployment host and domain, then create a preview deployment. Do not add a CMS, analytics or a form before there is a real requirement.

## Read first, in this order

1. `FRAMER-PASTE-SHEET.md` — approved copy and factual cautions.
2. `src/pages/index.astro` — employment-first homepage and capability interaction.
3. `src/pages/letters.astro` — selected approved reference excerpts.
4. `src/pages/cv.astro` — web and print CV.
5. `src/styles/global.css` — responsive visual system and accessibility states.
6. `src/layouts/SiteLayout.astro` — metadata, navigation and shared footer.
7. `design/06-hybrid-direction.md` — layout logic and risks.
8. `FRAMER-AI-SITE-STRATEGY.md` — positioning and conversion standards.

## Current implementation decisions

- Astro with strict TypeScript and static output; no framework integration, CMS or client library.
- Warm editorial materials from the hybrid direction, with one list/detail capability panel and no fake-app chrome.
- The mobile header keeps CV and Contact visible. Capability content stacks into a simple grouped list.
- The contact form is deferred because its fields and delivery service are unresolved. Direct email remains the primary action.
- A portrait is omitted because no approved production portrait exists.
- The disputed Visitor Guide figures and the unconfirmed 400 per cent result are not published.
- Existing local logos are not used because they do not support the employment-first story.

## Non-negotiables

- Never name GCT Education.
- Do not invent figures or imply shipped AI products that are not shipped.
- Do not publish or mock fake testimonials as if real.
- Education is proof, not the target industry.
- Workshops are product adoption and enablement, not a training role.
- UI/UX/CX is commercial product judgement, not designer-for-hire.
- Do not hide sales operations, lead generation, proposals, revenue systems or SaaS strategy.
- Keep consulting separate from the employment funnel.
- No dock, fake desktop, dashboard widgets or command-centre naming.
- Use New Zealand English throughout.

## Next options

- **A (recommended):** Browser QA, factual review and preview deployment. This converts the completed build into a shareable recruiter URL with the least new risk.
- **B:** Add approved original reference documents and anchors to `/letters/` after checking redactions and publication consent.
- **C:** Add a real portrait only after Brad supplies and approves the image.
