# The reference archive

Ten documents. Each source file has a `.md` transcription beside it. **The transcription is what
ships as the page; the image is the receipt behind it.** A page of JPEGs is unreadable to a screen
reader, unsearchable, unselectable and uncopyable.

Audit, publish/withhold table and image treatment spec:
[`design/01d-reference-archive-audit.md`](../../design/01d-reference-archive-audit.md).

**Settled by Brad, 11 August 2026. Six documents publish and four do not.** All six publishing
referees have consented. Decisions and their costs: `design/01d-reference-archive-audit.md` §11.

| Source | Transcription | Date | Type | Decision |
| --- | --- | --- | --- | --- |
| `Brad Friis Reference Letter.pdf` | `Brad_Friis_Dr. A_Bergh_Reference_Letter.md` | 16 Jun 2025 | Reference | **Publish.** Consented |
| `A Big Thank You from Rototuna High Schools .pdf` | `Brad_Friis_Rototuna_Reference_Letter.md` | 26 May 2025 | Reference, unsolicited | **Publish.** Consented. The only unsolicited document in the archive |
| `Brad Friis - Reference The Industry School.pdf` | `Brad_Friis_The-Industry-School-Reference.md` | 2025 | Reference | **Publish.** Consented |
| `Canwest Media.jpg` | `Brad_Friis_Canwest_Media_Reference_Letter.md` | 11 Feb 2006 | Reference | **Publish.** Consented 11 Aug 2026 |
| `Adplus Advertising.jpg` | `Brad_Friis_Adplus_Advertising_Reference_Letter.md` | 24 Mar 2003 | Reference | **Publish.** Consented 11 Aug 2026 |
| `Hawkes Bay Tourism.jpg` | `Brad_Friis_Hawkes_Bay_Tourism_Reference_Letter.md` | 12 Feb 2003 | Reference | **Publish.** Consented 11 Aug 2026. Oldest published document |
| `Napier City Councillor.jpg` — **misnamed** | `Brad_Friis_Deane_Jessep_Reference_Letter.md` | 26 Feb 2009 | Reference, friend | **Not published.** Brad is requesting a new reference from Jessep instead |
| `95 BFM.jpg` | `Brad_Friis_95bFM_Letter.md` | 9 Feb 2000 | **Artefact** | **Not published.** Cost recorded in `01d` §11 |
| `Mysimplesiteman.jpg` | `Brad_Friis_MySimpleSiteMan_Reference_Letter.md` | Undated | Reference | **Withheld.** Shared surname |
| `Canwest Sales Figures.jpg` | `Brad_Friis_Canwest_Sales_Figures.md` | Undated | **Artefact** | **Withheld.** Six colleagues' figures |

Rows are in publication order: newest first, which is the order they appear on `/letters`.

`web/` holds upright, 1800px, web-weight derivatives of three letters — Hawke's Bay Tourism, Adplus
and CanWest Media.

**Correction, 13 August 2026, 4:00 PM NZST: the claim that these three carry no redaction requirement
was wrong.** Hawke's Bay Tourism and Adplus are properly redacted. **CanWest Media was not** — both
`web/Canwest Media.jpg` and `Cropped versions/Canwest_Media_white.png` show Phillip Lemon's personal
email address and mobile number in plain text.

## Redacted finals, 13 August 2026, 5:45 PM NZST

`redacted and cropped finals/` now supersedes `web/` and `Cropped versions/` as the publication
source. All six published letters carry a scan on the site as of this date. Each was checked two ways
before wiring up: rendered and read page by page, and scanned for a live text layer behind the
redaction boxes. All four PDFs are image-only, so nothing is recoverable by selecting the text — which
is the correct way to redact. A box drawn over live text is not a redaction and must never be accepted.

Three findings from that pass:

1. **CanWest is now published.** The email and mobile are properly covered. It retains the duplicated
   line of body text in the third paragraph that the original does not have, an artefact of the crop.
   Brad reviewed this and elected to publish anyway on 13 August 2026.
2. **`HB_Tourism.pdf` in that folder is a regression and was rejected.** Its letterhead contact block
   is unredacted, showing the office address, telephone, facsimile and `info@` address that the
   existing `hawkes-bay-tourism.jpg` correctly covers. The site keeps the older, redacted image. Do not
   swap it in without redacting the letterhead first.
3. **`Rototuna_High_School_final.png` is correctly redacted** but retains a printed Outlook footer URL
   containing a message identifier from Brad's own mailbox. It is his own data and unusable without
   authentication, so it is not a blocker, but crop it out if the file is ever regenerated.

## Transcriptions are not all verbatim

**`Brad_Friis_The-Industry-School-Reference.md` is a structured digest, not a transcription.** It
carries invented section headings — Overview, Key Contributions, Strategic Alignment and Efficiency,
and others — and paraphrases the referee's sentences. None of that structure appears in the letter,
which is flowing prose.

Until 13 August 2026 the site published that digest as though it were Adrian Pilgrim's letter, and
drew its pull quote from the paraphrase. The quote read "Brad helped us see the platform's potential";
he actually wrote "Brad helped us see the platform in a new light", and "seriously considering" had
lost its adverb. Both are now corrected against the scan and `src/data/letters.ts` holds the letter as
written.

**Verify any transcription against its scan before quoting from it.** The other five were checked on
13 August 2026 and are faithful prose. A bolded label followed by a colon is the tell-tale sign of a
digest.

## Conventions

- **Verbatim means verbatim.** Original spelling, punctuation and errors are preserved and marked
  `[sic]` where they would otherwise read as transcription mistakes. The Rototuna smiley precedent
  stands: the letter is evidence, and evidence is not tidied.
- **Contact details are the one exception**, marked `[withheld]` inline. Every phone number, email,
  fax, postal address and home address comes off every document without exception.
- Each transcription carries a **personal data table** listing everything on the face of the document
  and how it is handled.

## Two warnings

1. **`Napier City Councillor.jpg` names Deane Jessep's office, not Brad's.** Brad was never a
   councillor. Recommend renaming to `Deane Jessep.jpg`. **Still outstanding as at 11 August 2026** —
   not raised with Brad, and it matters more now, not less: the document is not published, so the
   filename is the only thing a future reader will see.
2. **`Canwest Sales Figures.jpg` and its transcription carry six former colleagues' performance
   figures.** Neither may be pushed to a public repository. Check
   `gh api repos/Clarity-EngineAI/Brad_Friis_Web_Portfolio --jq .private` before any push.
