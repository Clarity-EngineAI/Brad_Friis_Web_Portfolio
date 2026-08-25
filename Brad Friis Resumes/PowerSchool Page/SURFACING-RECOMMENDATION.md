# How the representative week should be surfaced on bradfriis.com

Written 25 August 2026, alongside the V2 mockup. Nothing in `src/` has been touched.

---

## The recommendation in one paragraph

Do not give it a nav item. Publish it at `/week/`, reachable from exactly two places: a link
inside the CV's ten-year role entry, and a card in the homepage's existing "The claim proved
four times" section (`src/pages/index.astro:302`). It is evidence, not a destination — the
same category as the letters, which the site already treats as supporting proof rather than a
headline. Its job is to answer one specific objection at the moment a reader has it, and it
is nearly meaningless to a reader who arrives without that objection already formed.

---

## What the page is actually for

The page answers a question, and it is worth naming it precisely, because everything else
follows from it.

The ten-year role is a single line on a CV. A reader who has not worked in a small edtech
business reads "senior operating role" and pictures either a salesperson with a title or a
manager who ran meetings. Neither picture will get you hired for what you can actually do. The
calendar's job is to make the range concrete: to show that one person was doing pipeline
architecture on Monday morning, presenting a workshop on Thursday, and writing the board
report on Friday, and that these were not three jobs but one.

That is a **credibility repair** on a specific claim. It is not an introduction, not a
portfolio piece, and not a lead-generation asset.

Two consequences follow immediately:

1. **It only works after the claim has been made.** A reader who lands on this page cold sees
   thirty small work items with no argument attached. The page needs the claim to already be
   in the reader's head so the calendar can corroborate it. That rules out a nav item, which
   by definition offers the page to people who have not read anything yet.
2. **It must not be the site's answer to "what does Brad do".** It describes one job of seven.
   If it becomes prominent, the site starts arguing "here is a ten-year edtech role" instead of
   "here is thirty years of reading a business and building what it needed" — which the memory
   record says is the through-line the site is built on.

---

## What a reader must already know before it makes sense

Three things, in this order:

1. **That there was a ten-year senior operating role in education technology.** Without this
   the calendar is a week belonging to nobody.
2. **That it was one role, not a department.** This is the actual load-bearing fact and it is
   the one most likely to be missed. If the reader thinks a team did this, the page proves
   nothing — every company has a week that looks like this across twelve people. The page needs
   a single sentence at the top establishing that one person held all three pillars. The V2
   hero does this obliquely ("one operating role") and it should be made explicit before ship.
3. **That the employer cannot be named, and why that is not evasion.** A reader who notices
   the absence of a company name and is not told why will assume the worst. The V2 hero note
   covers the "no employer, customer or contract is identified" fact but does not say why. My
   recommendation: leave the reason unstated on this page — a settlement gag explained on a
   work-sample page raises a question the page cannot answer — and rely on the same convention
   the rest of the site already uses for this role. If the site never explains it elsewhere,
   this page should not be where the explanation debuts.

---

## URL and slug

**`/week/`**, with the H1 "What a week actually contained."

Reasoning against the alternatives:

- `/representative-week/` — accurate but it is the internal working name, and "representative"
  is a hedge word in the URL bar. It also invites the question "representative of what?" before
  the reader has any context.
- `/powerschool/` — do not. It names the platform in the URL, which is the single most
  identifying string available, and it makes the page about a vendor rather than about you. The
  current folder name is a working title, not a proposal.
- `/a-week/` — reads better in prose but `/week/` is what people will type and remember.
- Putting it under `/cv/week/` — tempting, since the CV is its parent context, but it creates a
  URL hierarchy the site does not otherwise have, and it makes the page harder to link to from
  the homepage without looking like a CV subsection.

`/week/` is short, memorable, says what it is, and names nothing it should not.

---

## Where a reader encounters it — two entry points, both contextual

### Entry point 1 (primary): inside the CV, at the ten-year role

This is where the objection is formed, so this is where the answer belongs. In the CV's entry
for that role, after the role description, a link in the pattern the site already uses for
`.letter-pill` — a bordered pill that reads as the row's footer action:

> **See a representative week →**

Why this is primary: the reader is at the exact moment of doubt. They have just read a
description of a senior role at an unnamed company and are deciding whether to believe the
scope. The link offers proof at the point of scepticism, which is the only place proof works.

### Entry point 2 (secondary): a card in "The claim proved four times"

`src/pages/index.astro:302` already holds four work cards, each making a claim with a link out
to the letter that backs it. This page is structurally the same object: a claim plus its
evidence. A fifth card there, or a replacement of whichever of the four is currently weakest,
puts the week in front of a homepage reader who is already in evidence-assessing mode.

Caveat, and it is a real one: the homepage is already about 860 words against a 250-word
budget in the §7 voice spec. A fifth card makes that worse. If the budget is being taken
seriously, the honest options are (a) the card replaces an existing one rather than adding to
them, or (b) the homepage entry point is dropped and the CV link carries the page alone. I
would take (a) if one of the four cards is weaker than this one, and (b) otherwise. Adding a
fifth card and calling the budget a later problem is the option I would not take.

### Where it should NOT go

- **Not in the primary nav.** Five items already (Work, Field notes, Letters, CV, Contact) and
  the header stacks at 640px as it is. A sixth breaks it, and more importantly it offers the
  page to readers with no context, where it reads as a strange piece of content marketing.
- **Not in the footer.** The footer is for standing destinations. This is one work sample.
- **Not above the fold anywhere.** Same rule the memory record already establishes for the
  references: supporting proof, never the headline.

---

## The end-to-end journey

The journey differs by where the reader entered, which is the argument for two entry points
rather than one canonical path.

**Path A — the CV reader (the main case).** Homepage → CV → reads the ten-year role → doubts
the scope → clicks through to `/week/` → filters to whichever pillar matches the role they are
hiring for → opens three or four entries → forms a view. **They must land back where the
decision gets made.** The page's close section should offer, in this order: book a
conversation (primary), back to the CV (secondary), the reference letters (tertiary text
link). The V2 mockup implements exactly this. Note "back to the CV" rather than "read the CV" —
they came from there and returning them is a courtesy, not a redundancy.

**Path B — the homepage reader.** Homepage → the work card → `/week/` → same exploration → but
this reader has *not* read the CV, so for them the strongest next step is the CV, not the
booking link. This is an argument for the close section's secondary button being genuinely
prominent rather than a token.

**The behaviour to design for in both paths:** a reader who is hiring will filter to one
pillar almost immediately. Someone recruiting for account management will click Growth and
ignore the other twenty entries. That is the page working, not the page failing — and it is
why the filter needs to be visible without scrolling on desktop (the V2 sticky bar) and why
the pillar standfirsts sit above it. Their real question is not "what did Brad do" but "did
Brad do *my* thing", and the filter is the fastest possible answer to it.

**Realistic time on page: 60–90 seconds.** Long enough to read three or four details. The page
should not be built as though someone will read all thirty, and the close section should be
reachable without exhausting the grid — which is why it sits directly below the calendar rather
than behind more content.

---

## The audience question you have not decided

You have said the audience is undecided between fractional/consulting work, a permanent role,
or both. Rather than assume, here is what changes and what does not.

### What is the same either way (build this now)

Everything above: the URL, both entry points, the three-pillar structure, the filter, and the
CV-return path. The page's core argument — one person held all three pillars — is exactly as
persuasive to a fractional client as to a hiring manager. Neither audience is served by the
page being longer or by a different structure. **This is most of the page, and none of it is
blocked on the audience decision.**

### What changes: only the close section, and only the copy

| | Permanent role | Fractional / consulting |
|---|---|---|
| Close heading | "That is the shape of the job." | "That is the shape of what I can take off your plate." |
| Primary action | Book a conversation | Book a conversation *(same)* |
| Secondary | Back to the CV | Back to the CV *(same)* |
| Framing of the pillars | Evidence of range in one role | A menu — "I can run any one of these" |

The pillar framing is the only structural difference, and it lives entirely in the three
standfirsts and the hero lead — perhaps forty words total.

### My actual recommendation on the audience

**Build the both-audiences version, which is the permanent-role version with one sentence
added, and do not split the page.** Reasoning:

- The two audiences overlap heavily at the top of the funnel. A hiring manager and a
  fractional client are both asking "can this person own this area", and both are reassured by
  the same evidence.
- Splitting into two pages doubles maintenance on a page that is already a work sample rather
  than a core asset, and it forces you to decide at the URL level who a visitor is, which you
  cannot know.
- The permanent-role framing is the more conservative default. A fractional client reading a
  permanent-role page sees someone employable, which is not a negative signal. A permanent
  hirer reading a consulting page sees someone who may not want the job, which is.

The one sentence to add, in the close section: *"Whether that is a role or a brief, the
conversation starts the same way."* It costs eleven words, does not commit you, and stops a
fractional reader concluding the page is not for them.

**Where I would press you:** the memory record says the target is account management —
retention plus upsell. That is a *narrower* claim than "I did all three pillars", and the two
can undercut each other. A hiring manager for an account management role who sees this page
may conclude you are a generalist operator who will be bored by the role. If account
management is genuinely the target, the CV link's label matters more than anything else on
this page — "See a representative week" is neutral, but something like "See how the growth
side actually ran" would point the same page at the right claim. Worth deciding before ship.

---

## Sequence if you approve

1. Decide the three safety items in `DESIGN-DECISIONS.md` (reseller wording, funded programme
   wording, whether PowerSchool/Schoology is named on the page at all).
2. Decide the homepage question: replace a work card, or CV-link only.
3. Decide the CV link label, which follows from the account-management question above.
4. Then port to Astro — `src/pages/week.astro` plus the data file, with the V2 CSS folded into
   `global.css` rather than shipped as a second stylesheet.

Steps 1–3 are yours and are about forty minutes of decisions. Step 4 is about half a day.
