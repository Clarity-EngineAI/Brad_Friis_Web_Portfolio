> **Archived 17 August 2026.** The site is a bespoke Astro build; Framer and the Prolens template are abandoned. Read `design/00-current-direction.md` first. The reasoning here still stands where it is about positioning, copy or layout logic — ignore anything about Framer as a delivery path.

# Hybrid direction — proof page plus iPort panels

**Written:** 13 August 2026, 2:12 PM NZST  
**Status:** Direction test. Does not replace the current Framer paste sheet or Stage 3.  
**Mockup:** `design/06-hybrid-direction.html`

Open the HTML and use Desktop / Mobile. This note is the judgement layer around that mock.

---

## What was tested

Could Brad's current proof-led personal site borrow iPort's premium macOS/iOS feel without becoming a fake desktop, a dashboard product, or a novelty portfolio?

iPort's public line is a portfolio that mirrors macOS on desktop and iOS on mobile. The useful parts are materials and scan patterns: panels, list/detail, grouped lists, familiar chrome. The unusable parts are the metaphor itself: docks, widgets, login chrome, command centres that ask the reader to play with software before they know who Brad is.

The mock keeps the Framer paste-sheet copy and the four first-screen questions. It adds one workspace window after the fold.

---

## Homepage information architecture

Order decided before visual treatment:

1. **Identity, hire-for, proof, contact.** No metaphor. Name, commercial subhead, five tags, Contact, CV, six letters, one scale number.
2. **Capability workspace.** One window. Four methods. Selecting a row reveals the proof in the same viewport.
3. **Work.** Same pattern for four checkable cases across the revenue path.
4. **Letters.** Four real quotes as documents, each pointing to `/letters`.
5. **Commercial range.** Seven compact entries. Titles only on the homepage.
6. **Contact.** Email plus a short form. CV and letters repeated.

Cut from this homepage: Insights/blog, social networks, consulting as a second hero, fake metrics widgets, a dock of "apps".

Consulting appears once, as the Pikle work row. It is evidence of range, not the offer.

---

## 1. Desktop homepage mockup

The live artefact is the Desktop view in `06-hybrid-direction.html`.

**First screen**

- Translucent top bar: wordmark, Work, Letters, CV, Contact.
- Large name. Paste-sheet subhead. Five hire-for tags.
- Primary button Contact Brad. Secondary View CV.
- Trust line: six written references.
- Portrait panel with a quiet availability chip. Employment stays on this screen; consulting does not.
- Proof strip in the same first view: 2,800 → 29,784; six letters; full-cycle sales.

This screen is a senior commercial landing page. It should still work if every window chrome treatment below it were deleted.

**After the fold**

- One macOS-like window, *Sell, Build, Enable*. Traffic-light dots appear here only. Left: four capabilities. Right: body from the paste sheet plus the matching letter or artefact in the same panel.
- A second window, *The Commercial System*. Same list/detail pattern for the four work cases.
- Four letter cards. They look like paper, not testimonials.
- Seven-year range as small tiles. Enough to show breadth; not a memoir.
- Contact as a two-pane window: details left, form right.

What was deliberately not drawn: desktop wallpaper, icon grid, dock, notifications, charts, a command palette, a login, or windows the reader is invited to drag.

---

## 2. Mobile homepage mockup

The live artefact is the Mobile view in the same file.

- Compact header. Contact stays in the corner.
- Hero stacks. Tags wrap. One portrait slab. One scale number, not three competing stats.
- Capabilities and work become iOS grouped lists. A tap should open detail; the mock shows the scan pattern, not every expanded state.
- One letter on the homepage. The rest live on Letters.
- Bottom tabs: Home, Work, Letters, Contact. CV stays in the header so the tab bar does not become five items.

Mobile is not a shrunk desktop. If a panel needs two columns to make sense, it does not ship on a phone.

---

## 3. Section-by-section layout plan

| Section | Job | Desktop treatment | Mobile treatment | Conversion test |
| --- | --- | --- | --- | --- |
| Nav | Find Work, Letters, CV, Contact without learning a UI | Menu bar. Contact is the only filled button | Wordmark + Contact. Tabs at the bottom | Can a recruiter reach CV in one tap? |
| Hero | Who, hire-for, contact | Name, subhead, tags, two actions, portrait | Same stack, smaller type, tags wrap | Answers questions 1, 2 and 4 without scroll |
| Proof strip | Question 3 before personality | Three facts on one row | One fact: 2,800 → 29,784 | Number is checkable later; letters are the witnessed proof |
| Capabilities | Show the system, not a slogan | One window, list/detail | Grouped list | Selecting a row reveals proof, not decoration |
| Work | Breadth across sales, adoption, AI, UX | Second window, four cases | Grouped list, newest commercial case first | Education is one row, not the category |
| Letters | Evidence, not praise | Four document cards | One quote + path to Letters | Every quote has a named author and a destination |
| Career | Range without a life story | Seven title tiles | Optional later; hide if the page runs long | No entry without a commercial verb |
| Contact | Make the next step obvious | Two-pane window | Native-feeling form, email visible without it | Form is optional. Email is not |
| Insights | None at launch | Hidden | Hidden | Empty cards cost more than absence |

Interaction rule, carried from the positioning brief: every surprise must carry information. Expanding a capability row is allowed because the reader then knows the proof. Window bounce, dock magnification and scroll-jacked side frames are not.

---

## 4. Why this direction can improve conversion

The current Framer path is already right on message. The risk in Prolens is generic personal-brand layout: equal cards, equal weight, a blog-shaped hole. iPort's useful gift is hierarchy that feels like software people already know how to scan.

A hiring manager does not want a product. They want to sort. List/detail lets them pick Sales Growth or Product Adoption and see the matching letter in the same viewport. That is the Stage 1 rule — no claim without its evidence — expressed as a familiar OS pattern rather than as a long scroll of cards.

On mobile, grouped lists are faster than a desktop grid squeezed into 390px. Recruiters read on phones. An iOS list with a persistent Contact tab removes the cleverness tax that kills most "app-like" portfolios.

The first screen stays a proof page, so the reader who never touches a panel still gets Brad's name, the hire-for line, the scale number, the letters and a way to write. The panels are for the reader who wants range without being told to admire a dashboard.

---

## 5. Risk list

**Too clever.** Traffic lights on every card, a dock of capability "apps", widgets, a command palette as navigation, fake notifications. The mock already draws one window chrome. More than that starts to answer "the site can do that" instead of "Brad can do this". Ban docks, wallpaper icons and draggable windows.

**Too EdTech.** If the work window opens on PowerSchool/Schoology and the first letter is about teachers, the site will read as an education hire. Keep the SaaS decade as the strongest case, but the capability default should stay Sales Growth, and the proof strip should lead with the scale number and the letters as a set, not with schools. Education is proof. It is not the target.

**Too training-focused.** "Enablement workshops" is true and easy to misread as trainer. The adoption panel must keep stakeholder communication, signed-contract-to-use, and the Bergh quote about resistant users becoming confident. Do not let workshop photography, course grids or "sessions delivered" language in.

**Too AI-consultant.** Pikle as the second work row is enough. If AI Enablement becomes the hero identity, or if the workspace is titled like a product (Clarity Engine, command centre, operating system for growth), the employment funnel collapses into a consultancy landing page. Clarity Engine stays quiet. No shipped-AI-product claim.

**Too designer-for-hire.** Product & UX is commercial judgement: messaging, kits, the path to the buyer. A visual portfolio of screens without artefacts would over-claim. Until real UI kits exist, this panel stays copy-led.

**Too Direction B.** Stage 3 already rejected a cold technical system. IBM Plex, "Reference 01 of 03", and developer-tool furniture would make this hybrid fail for the same reason. The panels have to stay warm. System chrome, not engineering chrome.

**Word-count creep.** The positioning brief asked for under 250 words on the homepage. Panels help only if unread rows stay unread. If every panel renders fully expanded, this becomes the wordy sites Brad named as repellent.

**Framer cost.** A true list/detail window may not be a native Prolens component. If the graft costs a custom site, it is no longer a light adaptation.

---

## 6. Recommendation

**Adapt lightly. Do not proceed with a full iPort rebuild. Do not stay with unmodified Prolens cards if the live first screen still feels like a template.**

Take three things from this mock into the current Framer direction:

1. Keep the conversion-first first screen exactly as the paste sheet specifies. Do not put window chrome above the fold.
2. Replace the four equal About cards and the four equal project tiles with one list/detail treatment each, if Framer can do it without a science project. If it cannot, keep the cards and steal only the materials: system type, hairlines, 12–16px radii, grouped mobile lists.
3. On mobile, prefer iOS grouped lists and a persistent Contact path over a miniature desktop.

Leave behind: docks, desktop metaphor, dashboard widgets, command-centre naming, and any visual that makes Brad look like a product rather than a person who can join a commercial team.

Stage 3's editorial recommendation still stands for letters and long documents. This hybrid is furniture for scanning, not a new voice. If the two fight, the letters stay editorial and the workspace stays quiet.

**Do not switch the live build to this until Brad has looked at the HTML.** The open Framer work (contact fields, blog hidden, Visitor Guide figure alignment) still converts the site. This file only tests whether the next visual pass should be warmer Prolens or Prolens with one workspace graft.

---

## What this does not change

- Never name GCT Education.
- Do not invent figures or imply shipped AI products.
- Do not mock fake testimonials.
- Six letters remain six named documents, not a complete archive.
- Consulting stays off the first screen.
- The employer from the channel decade stays unnamed.
- Copy source of truth remains `COPY-SOURCE-OF-TRUTH.md`.
