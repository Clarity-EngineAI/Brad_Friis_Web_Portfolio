# Reference letter page — conventions

Status: live. Applied 20 August 2026.

These are standing rules for `/letters/<slug>/`, held here so they survive a session
boundary. The page is built from `src/data/letters.ts` and rendered by
`src/pages/letters/[slug].astro`.

---

## 1. The subtitle line under the name

Rendered as `{role}, {organisation}. {dateLabel}.`

The role field carries the **job title the person held**, not a description of their
relationship to Brad. The organisation field carries the company the letter is *about*,
not the letterhead it happens to be printed on.

This was wrong on the CanWest letter until 20 August 2026. It read:

> Brad's manager at CanWest Media, The Radio Network. 11 February 2006.

That put a relationship description in the role slot and the wrong company in the
organisation slot — Philip Lemon had moved to The Radio Network by the time he wrote,
and used their letterhead, but the letter is about Brad's time at CanWest. Corrected to:

> Sales Manager, CanWest Media, Radioworks. 11 February 2006.

The letterhead fact has not been lost. It still sits in the About-this-document card,
which is where the explanation belongs.

## 2. About-this-document opens on the first name

The context paragraph names the referee by **first name**, never surname alone.
"Philip managed Brad at CanWest Media", not "Lemon managed Brad at CanWest Media".

Surname-only reads as a case file. The letters are people vouching for a person, and
the card sits directly beside their full name in the h1, so the first name is
unambiguous.

## 3. Company logo sits below the context card

Each letter may carry a `logo` on its record in `src/data/letters.ts`:

```ts
logo: { image: someLogo, alt: "..." }
```

It renders inside the left `.letter-meta` column, directly under the context card.
Source files live in `src/assets/letter-logos/`.

Two rules the styling already handles:

- **The plate stays white in both themes.** Company marks arrive as dark artwork on
  white or transparent. Letting the plate follow the dark theme turns them into an
  unreadable smudge.
- **Stacked and square lockups get more height.** A square mark capped at the same
  height as a wordmark reads about half the size. The page applies `.is-stacked` when
  the aspect ratio is under 2.6, matching the rule `src/data/logos.ts` already uses
  for the client scroller.

The field is optional. A letter with no usable logo simply omits it — no placeholder,
no fabricated mark.

All six letters now carry one:

| Letter | Logo |
| --- | --- |
| Andrew Bergh | Elim Christian College |
| Pranesh Lad | Rototuna High Schools |
| Adrian Pilgrim | The Industry School |
| Philip Lemon | MediaWorks (RadioWorks as it trades now) |
| Andy Walker | Tracta (Adplus as it trades now) |
| Hamish Lowry | Hawke's Bay Tourism |

**The gag does not reach these.** It covers **GCT Education**, Brad's employer and the
channel partner — not the customer schools he sold to. Naming Elim Christian College
identifies a school that bought Schoology; it does not identify GCT. Brad confirmed this
on 20 August 2026. Bergh's organisation field still reads "International school, Hong
Kong" because that is where he is a principal *now*, which is a separate fact from the
New Zealand school his letter describes. See `memory/gct-never-named.md` for what the
gag actually covers.

**Two marks are the current brand, not the period one.** MediaWorks (2021 identity) for a
2006 RadioWorks letter, and Tracta for a 2003 Adplus letter. Both are deliberate — the
logo shows the company as it exists today, which is what a reader chasing the reference
would find. The letterhead of the day is described in the context card instead.

## 4. Andy Walker, not AR Walker

The Adplus managing director is **Andy Walker**, Managing Director. Site copy names him
in full — the letter page h1, the letters index, and the homepage quote attribution on
the Adplus row.

One deliberate exception: the **transcription keeps "AR Walker" verbatim**, because that
is how he signed the original and the scan sits directly beneath it. A transcription
that disagrees with the image it transcribes is a worse problem than the initials.

Older working files under `COPY/` and `design/` still say "AR Walker". They are a
record of what was decided when, not live copy, so they are left alone.
