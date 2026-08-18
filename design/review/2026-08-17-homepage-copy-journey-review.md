# Homepage copy + journey strategy — for external review

**Prepared:** 17 August 2026. **Purpose:** hand this single file to another LLM for a fresh read on
the homepage's copy and the reader journey it builds, without needing repo access. Everything below
is either the live homepage copy verbatim, or strategy/constraints quoted from the project's own
decision record.

---

## 1. Who this is for, and what "good" means here

**The site:** a personal positioning site for Brad Friis — a resume-replacement that has to win
account management, customer success and channel partnership roles, plus a secondary blog presence.

**Primary reader: a hiring manager or internal recruiter, forty seconds, one question** — *is this
person going to hit a retention and expansion number.* Three secondary audiences exist (channel/
partner lead, early-stage founder buying consulting, cold blog reader) but the primary reader is the
one the homepage is optimised for.

**The working three-second proposition** (not yet re-tested with a reader, treat as draft):

> Brad Friis keeps software customers, and grows them, for a decade at a time.

**Target role framing:** account management — retention and growth of existing accounts, not
net-new hunting ("land-keep-grow", not hunting). Copy must not fence itself to SaaS only; software is
a scope note for the target market, not a display-copy restriction.

**What "good" looks like for this review:** does the homepage, read top to bottom by a skimming
hiring manager, build a coherent case for that proposition in the right order, with proof that lands
before the reader's attention runs out? Where does it drag, repeat itself, bury the strongest
evidence, or ask the reader to do work the copy should be doing for them?

---

## 2. Non-negotiable constraints (do not suggest changes that violate these)

These are locked decisions, not style preferences. A rewrite suggestion that breaks one of these is
not usable, however good the copy is.

1. **The 2015–2025 employer is never named** — on the site, in the CV, in text or image. Described
   by what the role was, never by who it was for.
2. **The dispute that ended that role is under a legal settlement gag.** No oblique references.
3. **Certain names/figures are permanently barred**: specific individuals and organisations, and two
   specific dead percentage figures (a "172%" and a "400 per cent" figure) that must never be
   revived or reconstructed. (A *different* $400k figure elsewhere is unrelated and not barred.)
4. **One past employer is withheld as a published reference** — it appears as a plain career-record
   line only, no letter, no elaboration. It is the one visible failure/gap in the record, deliberately
   left as a single human data point rather than explained away.
5. **Nothing implies an AI product has shipped.** Both current AI ventures are pre-revenue/unregistered
   or paused.
6. **Exactly six reference letters exist and are shown, newest first.** No copy may imply the
   reference archive is complete — more exist privately than are shown.
7. **No composite or derived figures, anywhere.** Two separately-sourced numbers may never be
   combined, divided, annualised or compounded into a third. Approximate figures ("around 70 per
   cent") must stay exactly as hedged — never tightened, never rounded to look more precise.
8. **Every concession travels with its claim**, same sentence or the next — a retention statistic
   that has a caveat must carry the caveat, not just the number.
9. **No universal quantifiers, no unfalsifiable self-praise, no comparison to other named or implied
   people** (predecessors, competitors, colleagues).
10. **The correct span claim is "two bosses and four customers, 2003 to 2025."** Not "four
    industries" (checked and disproven), not twenty-five years applied to the letters archive
    specifically (that figure belongs to the career, not the archive).
11. **The target market is software; breadth beyond software is proven only by the underlying
    evidence archive, never announced in headline/display copy.**
12. One proper-noun product name in the CV/copy has a fixed, mandatory lower-case spelling
    ("itslearning") — flag if you see it capitalised.

---

## 3. Voice rules (binding across the whole homepage)

- First person. Present tense for a capability claim ("I find the need behind the brief"), past
  tense for a finished, dated record.
- NZ English spelling throughout.
- **Banned words/phrases:** passionate, results-driven, proven track record, journey, thrilled,
  excited to share, leveraged, synergy, "I'm not just X, I'm Y", and generally any sentence a
  hundred other candidates could have written.
- **Specific over impressive — state numbers once, plainly.** Let named customers do the praising;
  Brad's own copy never claims he is patient, trusted, empathetic, etc. — those adjectives may only
  appear inside a direct quote from someone else.
- **No second person.** The reader is never addressed as "you". (An entire earlier copy round was
  rejected for exactly this — it read as sales copy pitched at a services buyer, not a value case
  read by an employer.)
- **No industry noun in display type** (headings, hero, section titles) — not "software", "SaaS",
  "edtech". Body copy may name a sector where factual.
- **No "device."** No two-part rhythm with a withheld second clause, no reversal, no
  colon-then-punchline construction. Direct Brad quote on why: *"you are writing as if it is an
  advertisement instead of a value proposition."* Plain declarative sentences are the standard; a
  full round of hero-line generation was killed for leaning on this kind of device.
- **Vary sentence openers across any set** — no more than two headings/cards in a group may start
  with the same word.
- Sentence case everywhere, never Title Case (except an eyebrow-pill CSS transform, which is styling
  not copy).
- **Every surprise must carry information.** Motion or reveal that delivers a fact is fine;
  decoration for its own sake is banned. No scroll-jacking, no fixed side frames.
- **Never use "build" as Brad's verb** — his own words: "it suggests I build software or apps, I
  don't." Use *originate*, *shape*, *get it made*, *get it to market* instead.
- **Relationships are shown as a consequence, never claimed as a self-adjective.** "A very close
  working relationship" is banned outright; the underlying fact (e.g. a vendor comparing him
  favourably across partners) is fine to publish. Show it, don't name it.

---

## 4. Open / unresolved items you should know about before critiquing

- **The hero headline is explicitly unruled and known to be weak.** The line currently live
  (`"Helping SaaS and digital businesses turn customer needs into growth"` in older working notes)
  came from an untracked brainstorm file, was never part of the formal hero-generation rounds, and
  breaks the "no industry noun in display type" rule (contains "SaaS"). **The current shipped
  headline (see §5 below, `"Turning customer needs into long-term account growth."`) is Brad's own
  replacement, written directly by him, after eight generation rounds were all rejected.** Feel free
  to critique it on its merits — it is not a placeholder, but it also isn't run through the same
  adversarial process the rest of the copy went through, so a fresh critique is genuinely useful
  here.
- **Word budget:** resolved 17 August. The binding cap is **~250 words for hero + stats only** (the
  actual above-the-fold content at the live breakpoint) — capability cards and everything below sit
  below the fold and are uncapped. There is currently **no whole-page word ceiling** in force.
- **Navigation/route structure is a live unresolved conflict**, not something to fix in this review:
  an earlier design doc specified a 4-route nav (`/record`, `/consulting`, `/field-notes`,
  `/letters`); the live site instead runs a simpler `/`, `/cv`, `/letters`, `/blog` shape, with the
  blog labelled "Field notes & stories" in navigation. Treat the live shape below as ground truth for
  this review — do not recommend the abandoned 4-route plan.
- **The blog has no homepage teaser or link currently** — a planned "Explore field notes & stories"
  call-to-action has no live home on the page yet.

---

## 5. The homepage copy, verbatim, in document order

### Hero

> **Eyebrow pill:** Account management · retention & expansion
>
> **H1:** Turning customer needs into long-term account growth.
>
> **Subhead:** Commercial operator across SaaS, web strategy and revenue systems who keeps and
> expands the accounts that matter.
>
> **CTAs:** [Start a conversation] (anchors to contact) · [View CV] (links to /cv/)
>
> **Aside:** Portrait photo. Caption: "Available for commercial roles" / "Auckland, New Zealand"

### Stat band (four figures, equal visual weight, no section heading)

| Figure | Label |
|---|---|
| 5 campuses | Account retained mid-defection, then expanded |
| 2.8K → 24.5K | Licensed users, NZ and Australia |
| +30% | Lift in initial client investment |
| 10 years | Holding the vendor channel relationship |

### "How I work" — four capability cards

Eyebrow: *How I work*. H2: **Four parts of one method.** Lead: *Find the real need, keep the
account, originate the next offer, and own the terms that make it possible.*

1. **I find the need behind the brief** — *Understand before I pitch*
   Before building a retention strategy for a multi-campus account, I spent a week on the ground
   learning how each campus actually used the platform, then went back and taught what I found.
   *Evidence: Adrian Pilgrim: "custom strategies and workarounds that fit our operations."*

2. **I keep the account close to its value** — *Renewals that survive a competitor's pitch*
   Eight consecutive renewals at one school. A multi-campus account that renewed and expanded after
   evaluating a direct competitor. Renewed through annual price rises — the schools I lost were on
   total cost, never on the rise alone.
   *Evidence: Andrew Bergh: even the most hesitant teachers became confident users.*

3. **I turn gaps into the next offer** — *New lines from unpriced work*
   Support was being given away, so I made it a paid line, billed annually in advance. The same
   instinct now applies to positioning, CRM stages and sales assets for early-stage work.
   *Evidence: Managed services scaled with the account, so revenue grew without a new sale each time.*

4. **I make the terms support the work** — *Own the contract, not just the relationship*
   When a channel contract was cancelled, I negotiated its replacement myself — no upfront cost, and
   the right to invoice customers directly.
   *Evidence: The accounts were mine to keep because I made them mine to bill.*

### "Work" — three case studies, plus logo strip

Eyebrow: *Work*. H2: **The claim proved three times.** Lead: *Three concrete stories. Each ends with
a number or a named voice the reader can verify.*

1. **The account that was leaving, then grew** — *Multi-campus account · retention under pressure ·
   2015–2025*
   A multi-campus account was actively evaluating a move away from the platform. I spent a week on
   the ground, rebuilt the adoption strategy campus by campus, and went back to teach it. The account
   stayed, then expanded.
   *Evidence: Adrian Pilgrim, Teaching and Learning Manager: "giving us the confidence to invest in
   the platform further."* → links to full letter.

2. **The job nobody was charging for** — *National sales and marketing · 99 Corporation, 2013*
   Support was being handled for free, on request, with no line item. I made it a structured, paid
   service, so it became revenue instead of overhead.
   *Evidence: During Brad's tenure, 99 Corporation's customer base grew by around 55 per cent and
   income by around 30 per cent.* (No link — no letter for this one yet.)

3. **The contract that made the decade possible** — *Channel contract renegotiation*
   When the channel agreement was cancelled — a pandemic-driven platform change, not a performance
   issue — I negotiated its replacement directly: no upfront cost, and the right to invoice customers
   myself.
   *Evidence: The accounts were mine to keep because I made them mine to bill.* (No link.)

**Logo strip:** Eyebrow: *Brands I've sold to and worked with · 1999–2025*. Note: *Past accounts and
employers across the media, agency and software years. Not current clients, and not an endorsement.*
(Row of company logos, alt-text only, no copy.)

### "References" — two homepage quotes

Eyebrow: *References*. H2: **The customers who nearly left said it themselves.** Lead: *Both wrote in
2025. Both describe keeping an account that had a reason to go.*

1. *"This clarity and customisation shifted our thinking, giving us the confidence not only to stay
   with Schoology, but to invest in getting the very best from it."*
   — Adrian Pilgrim, Teaching and Learning Manager, The Industry School · 2025

2. *"His empathetic and proactive approach ensures that even the most hesitant team members became
   confident users of Schoology."*
   — Andrew Bergh, High School Principal · June 2025

→ links to full letters page ("Read all verified reference letters").

### "Career" — seven-row timeline

Eyebrow: *Career*. H2: **The range came one job at a time.** Lead: *Generate demand. Shape the offer.
Close the work. Enable users. Then grow the account.* Standfirst: *I kept the bulk of the accounts I
won. Not all of them, and not everywhere — but the billing, the contracts, the renewals and the
relationship were mine at every job I have had since 2001.*

| Row title | Meta | Detail |
|---|---|---|
| Sold sponsorship before the event existed | 1999 · Event director, 2000AD | — |
| Held the flagship account personally | 2001 · Business development, Adplus Advertising (later Tracta) | — |
| Kept the national account for three years | 2003 · Sales, Canwest Media | I held the Harvey Norman account for the full three years I was at Canwest Media (Radioworks). |
| Turned one-off projects into repeat work | 2009 · Business development, Xplore | Customers up around 70 per cent, income up around 120 per cent, in my time there. Rob Nieuwland, who owned the business, puts it differently but the same way: profit from each customer was up around 30 per cent too. |
| Put a price on previously unbilled work | 2013 · National sales and marketing, 99 Corporation | — |
| Grew the territory and kept key accounts | 2015 · Sales and Marketing Manager, then General Manager | — |
| Turn AI into commercial systems | 2025 · Independent consultant, Clarity Engine AI and Pikle | — |

→ links to full CV ("View the full CV").

### Contact panel

(Component not expanded here — standard contact form/details section, closes the page.)

---

## 6. Section order, as built

Hero → Stat band → How I work (4 capabilities) → Work (3 case studies + logo strip) → References (2
quotes) → Career (7-row timeline) → Contact.

---

## 7. What to actually review

Please give a fresh, critical read on:

1. **Journey logic** — does this order build the strongest possible case for a skimming hiring
   manager, or does it front-load the wrong kind of proof? Note in particular: capability claims
   (section 3) come *before* the concrete work evidence (section 4) that backs them — is that the
   right sequence, or should proof lead?
2. **Repetition** — the "account that nearly left / stayed / grew" story (Adrian Pilgrim /
   Industry School) appears in the capability card, the work case study, *and* the references
   quote. Is three appearances of the same underlying story reinforcement or redundancy to a
   skimming reader?
3. **The hero headline** — critique `"Turning customer needs into long-term account growth."`
   against the proposition it's meant to sell (`"Brad Friis keeps software customers, and grows
   them, for a decade at a time"`). Does it land the retention-first framing, or does it read
   generic?
4. **Missing or misplaced proof** — is the strongest evidence (the stat band, the eight-renewal
   claim, the channel-contract renegotiation) positioned where a 40-second reader will actually see
   it?
5. **Two case studies with no letter/link** (99 Corporation, channel contract) sit next to one that
   has both — does the asymmetry read as weaker evidence, or is it not noticeable?
6. **Anything that reads like it violates the voice rules or hard constraints in §2–§3 above**,
   even subtly.

Structure your response however is clearest — you don't need to follow this file's own structure
back.
