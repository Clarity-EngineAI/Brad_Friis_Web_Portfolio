> **Archived 17 August 2026.** The site is a bespoke Astro build; Framer and the Prolens template are abandoned. Read `design/00-current-direction.md` first. The reasoning here still stands where it is about positioning, copy or layout logic — ignore anything about Framer as a delivery path.

# Stage 4 Prompt — parked

**Parked 10 August 2026.** Structure and tone were reopened. Do not run this until the information
architecture session in `NEXT-SESSION-PROMPT.md` is finished and Brad has signed off the new
structure. When it runs, the route names, the navigation and the section list below will all have
changed — reconcile against the revised `design/01b-*` document before using anything here.

**Model:** Opus. Stage 4 is design judgement applied at length — one direction extended across the
homepage at two breakpoints, plus motion written per section. Do not run this on Sonnet.

**Also still true:** do not start this session until Brad has picked an art direction.

---

## Paste the following into a new session

You are picking up a design-first project at Stage 4 of 4. Stages 1, 2 and 3 are complete and in
the repository. Do not rewrite them. Do not start application code.

### Project

A personal website and thought-leadership blog for **Brad Friis**, an Auckland-based commercial
manager with 25 years in software, media and agency work. Two jobs: a standout professional resume
that wins account management, customer success and channel partnership roles, and a thought-leader
presence in AI for business, sales, marketing, customer onboarding, design and website strategy.

Brad cares intensely about design quality, whitespace, information architecture, copy hierarchy and
snappy messaging. **The site must not look like a template.** That constraint has already caused two
rejections — ScrewFast as a base, and the ui-ux-pro-max-skill design generator — both on the grounds
that widely circulated design kits converge into a recognisable house style. Hold the same line.

### Read these first, in this order

1. `design/index.html` — the contact sheet. Stage 3 recommendation, what is closed, what is waiting.
2. `design/03-direction-<chosen>.html` — the direction Brad picked, including its specification and
   its stated cost. Open it in a browser.
3. `design/02-wireframes.html` — all eight routes, one scrollable document. Structure is settled;
   Stage 4 applies surface to it. Open in a browser rather than reading the source.
4. `design/01-positioning-brief.md` — proof ordering, voice and the banned-words list in section 7.
5. `COPY/` — every line written for the site, in use or not, with the argument for and against each.
   **Add to it as you write.** Anything worth keeping goes in, with a status.
6. `/Users/admin/.cursor/plans/brad_friis_personal_site_34637f86.plan.md` — the approved plan and
   the Phase B build.
7. `Brad Friis Resumes/` — five resume variants and three reference letters, only to check a fact.

Ignore `Brad Friis Resumes/IGNORE -DOCX VERSIONS RESUMES/` and any `.docx` or `~$` files.

### What is now settled, and what Stage 4 must honour

- **Hero line:** "Three customers wrote references I never asked for." Chosen 10 August 2026 after
  options A, C and E were turned down. Full set in `COPY/hero-lines/hero-lines.md`.
- **The hero claim names three documents**, so three names — Adrian Pilgrim, Dr Andrew Bergh,
  Pranesh Lad — must be visible in the same viewport as the claim, at every breakpoint. This is not
  a detail. It is the site's governing rule applied to its own headline.
- **No claim appears without its evidence in the same viewport**, and every quote links to the full
  letter at `/proof`. A section that separates a claim from its proof has failed.
- **Proof leads with the five-campus save**, not the 2,800 to 29,784 figure.
- **The audience lens is confirmed dropped.** No visible switcher. `/resume/[lens]` survives as four
  routes Brad sets on outbound links.
- **No family content.** Community and governance sit on `/about`.
- **"What I'm proud of" stays cut** from the homepage.
- **The portrait exists.** `Brad Friis Resumes/B Friis.jpg` (945×1181) and `B Friis_.jpg`
  (3276×4095) are the same 4:5 studio shot. All three Stage 3 directions use it.
- **Voice:** warmth, patience and humour alongside commercial capability. Banned-words list in
  section 7 of the brief. Cold and corporate is off-brief even when it looks expensive.

### The Stage 3 recommendation, if Brad has not overridden it

**Direction A, Editorial, with the evidence table from Direction B grafted into the hero.** The
reasoning is in `design/index.html` under "Stage 3 — the recommendation". The short version: the
brief rules out cold, which ends B as a whole-site system; the differentiator is signed documents,
which is what editorial typography is for; and the blog is the entire sales asset for the consulting
audience, so the site needs to be a reading system. B's three-row evidence table is the best single
component produced at Stage 3 and belongs in whichever direction wins.

### Your task this session

Produce **Stage 4: the high-fidelity homepage**. Create `design/04-homepage.html`.

- The **chosen direction applied across the full homepage**, every section from the Stage 2
  wireframe, at desktop and mobile. Show both breakpoints in the one document.
- A **motion specification written against each section** — trigger, property, duration, easing,
  stagger, and the `prefers-reduced-motion` fallback. Written as a table per section, not as prose.
  This artefact is what the Phase B build works to, so it has to be unambiguous.
- Update `design/index.html` to link it and mark Stage 4 ready for review.
- Add any new copy to `COPY/` with its status and its argument.

Flag, do not guess, anything that needs a decision from Brad.

### Constraints

- No application code, no `npm create next-app`, no Sanity setup
- Design artefacts are self-contained HTML and CSS with no build step. Web fonts load from Google
  Fonts by URL.
- Never create backup files, temp files or versioned copies. Overwrite in place.
- New Zealand English throughout. No emojis.
- One main task this session. When Stage 4 is delivered, overwrite this file with the Phase B
  handoff and stop.

### Waiting on Brad

| # | Needed | Recommendation | Blocks |
| --- | --- | --- | --- |
| 1 | **Pick a direction — A, B or C**, or say what is wrong with all three | A with B's evidence table | Stage 4 start |
| 2 | Written consent from Andrew Bergh, Adrian Pilgrim and Pranesh Lad to be named publicly with their letters in full | Now urgent — the new hero puts all three names above the fold. Withhold Dr Bergh's email and phone regardless. | Stage 4 sign-off, launch |
| 3 | A second photograph for `/about` | Working environment rather than studio | Stage 4 |
| 4 | Proof strip fourth figure now repeats the hero claim | Recaption to "Written, signed, and reproduced in full", or drop to three figures | Stage 4 |
| 5 | Domain | `bradfriis.co` assumed throughout | Phase B |

### Git — read before pushing anything

The repository is `https://github.com/Clarity-EngineAI/Brad_Friis_Web_Portfolio.git`. The workspace
is still not a git repository and nothing has been pushed.

**As of 10 August 2026 the API still reports `private: false`.** Check again with
`gh api repos/Clarity-EngineAI/Brad_Friis_Web_Portfolio --jq .private` before doing anything. The
workspace contains three reference letters naming Andrew Bergh, Adrian Pilgrim and Pranesh Lad, none
of whom has consented to publication, plus Dr Bergh's personal email address and phone number.

If it reads private: initialise, add a `.gitignore` covering `.DS_Store`, `.env*` and `~$*`, commit,
push. If it still reads public: do not push, and tell Brad.

---

## After Stage 4

- **Gate 3:** Brad signs off the homepage and the motion spec.
- **Phase B** (Sonnet for scaffold, Sanity setup and schemas; Haiku for seed content and SEO
  wiring): Next.js 15 App Router, TypeScript, Tailwind CSS v4, Sanity Studio embedded at `/studio`,
  Vercel, Resend server action for contact.

## If a different focus is wanted

- **Stage 4 as scoped above.** Recommended, once a direction is chosen.
- **A fourth art direction** (Opus). Choose this only if all three Stage 3 directions are wrong.
  Two hours now, a fortnight after Stage 4.
- **Chase consent** (no session needed). Three emails. It is the only item that can block launch
  outright, and the new hero raised its cost.
- **Make the repository private and push** (Haiku). Five minutes, and it is a clean unit of work.
