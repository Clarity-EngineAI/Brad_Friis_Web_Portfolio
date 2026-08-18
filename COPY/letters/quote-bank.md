# Quote bank — reference-letter excerpts chosen by Brad

**Status: Brad's own selection, 19 August 2026.** These eight sentences were chosen by Brad
himself from the six published letters, in response to the fault logged below. They are the
approved pool for every `evidence:` slot on the homepage and for any future slot that needs a
third-party voice.

**Do not substitute a different sentence from the letters without asking him.** That is the exact
mistake this file exists to prevent.

## Why this file exists

On 18 August 2026 Brad reviewed the homepage and wrote:

> "there was no consultation on the excerpts from the reference letters used as quotes"

That was logged as a decision to bring back to him. It never was. A later session selected the
quotes itself from `src/data/letters.ts`, and its own wrap-up described them as "Brad's supplied
quotes" — which they were not. The result was the same two sentences appearing three times each
across three sections that were each meant to be making a different argument:

| Sentence | Capability card | Case study | Letters section |
|---|---|---|---|
| Pilgrim, "confidence to invest in the platform further" | card 1 | study 1 | homeQuotes |
| Bergh, "even the most hesitant team members became confident users" | card 3 | study 2 | homeQuotes |

Brad caught it on 19 August: *"the quotes in the how i work and work sections are repeating!"*

## The eight quotes

All eight verified verbatim against `src/data/letters.ts` on 19 August 2026.

### Pranesh Lad — IT Systems Engineer, Rototuna High Schools (26 May 2025)

> Working with you is always a pleasure - your professionalism and positive attitude make
> everything so much smoother. You're a real star, Brad :)

Two adjacent paragraphs in the source, joined. The only unsolicited document in the archive.
Note the source uses a hyphen, not an em dash, and keeps the smiley — both are verbatim.

### Hamish Lowry — General Manager, Hawke's Bay Tourism (12 February 2003)

> My observations are that he is an individual with integrity; plus the drive and dedication to
> reach and exceed sales targets.

> Brad ensured that service excellence was paramount and clearly recognised its vital importance
> in the highly competitive marketplace of today.

The only referee who was Brad's **client** rather than his employer, which is the more persuasive
voice for an account-management seat. Was quoted nowhere on the homepage before this selection.

### Philip Lemon — CanWest Media, letter on The Radio Network letterhead (11 February 2006)

> Brad quickly became known for thinking outside of the square and for creating new and untapped
> opportunities for his clients.

> I found a highly commendable aspect of Brads approach to his role was the innate ability to
> discover new methods of attracting and securing new business in what can be a very difficult
> industry to work in.

"Brads" is unpunctuated in the source. Quote verbatim, do not silently correct it.

### AR Walker — Managing Director, Adplus Advertising, now Tracta (24 March 2003)

> People with Brad's skill do not come along every day.

**Placement open.** Brad's instruction, 19 August: *"add the walker quote somewhere else"* — it is
not to displace the Nieuwland deposit quote on capability card 4, and it does not belong on the
MySimpleSiteMan failure story. Needs a slot found for it.

### Andrew Bergh — High School Principal, international school, Hong Kong (16 June 2025)

> He consistently brought a student-centered mindset to our strategic conversations, contributing
> invaluable insight and humility to complex, system-level discussions.

> It is difficult to overstate the impact Brad has had on my previous school and the broader
> community of Schoology schools in New Zealand.

"student-centered" is US spelling in the source. Verbatim quote, so it stays; the NZ English rule
governs Brad's own prose, not other people's words.

## Still in use, not part of this selection

Two existing evidence lines were not replaced and are not in dispute:

- **Rob Nieuwland**, card 4 — *the deposit change made "a massive difference to cashflow and
  operations."* The only cashflow-negotiation evidence on the page, and the only line matching
  that card's terms-and-contracts claim.
- **Pranesh Lad**, card 5 — *"your deep knowledge has been key to solving every issue we've thrown
  your way."* Matches that card's know-the-product claim precisely.

## Sentences read but not chosen

Held for future slots. Brad read the full inventory from all six letters and selected the eight
above; these are the runners-up worth keeping visible, not a second-tier approval list.

- Lemon: *"Monthly KPI targets were always achieved and Brad's dedication to his role resulted in
  consistent growth of his client base and overall billing for each quarter."* — the only quote in
  the archive speaking directly to quota.
- Lemon: *"Several of Brad's past clients have mentioned his ability a number of years on from his
  departure."* — retention evidenced by a third party, years after.
- Lemon: *"I would consider Brad a great asset to any business development and account management
  role."* — names the target role in a referee's words.
- Walker: *"He came highly recommended and achieved far [sic] during the period he was with us than
  I had imagined would be the case."* — `[sic]` is in the source; the word "more" is missing from
  the original letter.
- Walker: *"Often too I found Brad putting in hours over and above that expected in order to
  improve his results."*
- Bergh: *"Brad's support has been a constant through significant sector changes, including the
  disruptions of COVID-19, curriculum rewrites, and policy shifts."*
- Bergh: *"One of Brad's most remarkable qualities is his ability to support teachers, particularly
  those resistant to change."*
- Pilgrim: *"Brad took the time to first consult with our leadership team to define the top-level
  strategic goals of our organisation."*
- Pilgrim: *"He helped us unlock its full potential by tailoring it to our goals and creating
  custom strategies and workarounds that fit how we actually operate."*
- Lowry: *"During this time a highly successful business partnership has formed between Hawke's Bay
  Tourism and this major regional advertising company."*

## Source of truth

Letter bodies live in `src/data/letters.ts`. Original scans and transcripts are in
`Brad Friis Resumes/References/`. Check any quote against `letters.ts` before placing it — the
sentence-splitting used to build inventories drops standalone short paragraphs, which is how Lad's
"You're a real star, Brad :)" went missing from an earlier extraction.
