# Decisions on the fit diagnostic

Running record. Newest at the top. This is the authority for what changed and why; the plan file
gets updated to match.

---

## 28 August 2026: the 99 Corporation letter is found, and left unpublished

**Decided by Brad: keep it as is.** No register edit, no new letter slug, no change to any ceiling.

**What was found.** `Brad Friis Resumes/Brad Friis 99 Corporation Reference.docx` is a complete,
signed reference from Rob Nieuwland, Managing Director, 99 Corporation, covering May 2013 to 2015.
The PDF export beside it is blank letterhead only (the document was open in Word at export time),
so the DOCX is the only readable copy.

**Why it is not published.** The letter contains the sentence "He more than doubled our customer
base and billable income." That is row E14 verbatim, which the register marks superseded and
barred. The live row is E51: around 70% more business clients and 30% more profit per customer,
owner-sourced on 14 August and naming-approved. On 28 August Brad confirmed directly that
"doubled" was a misspeak and that the around-70% figure stands.

**Brad then argued the reverse**, and the argument is a fair one: Rob's phone estimate was
off-the-cuff, the letter is his considered figure after reflection, and a written signed number
from the owner ordinarily outranks a verbal one from the same source. The counter-argument put to
him was that the claim is the highest-magnitude on the site, that it needs the letter linked
beside it to survive scrutiny, and that a hiring manager ringing Rob must hear the same number
back. Brad's call: **keep it as is.** E51 stands, E14 stays barred, the letter stays off the site.

**What this closes.** The `customer-base` evidence card carries no letter link. It attributes E51
as owner-confirmed by name, and that asymmetry is visible rather than hidden. The 0.85 ceiling is
unaffected either way: it is set by breadth across four employers, not by peak magnitude at one.

**Do not reopen this.** Not to re-rank E14 against E51, not to add the letter to `letters.ts`, and
not to re-export the PDF. It was adjudicated twice on the same day with the document in hand.

**Left on the table, if it is ever wanted.** The letter's strongest material is not the growth
figure at all. It is four owner-attested pricing and cash-cycle interventions (unbilled set-up and
script-writing work, an hourly rate rise Brad pushed for against the owner's instinct, a deposit
structure, and volume pricing), a new revenue stream from licensing the farming database, four
named accounts (Lexis Nexis, Spaceworks, Xero, Promax Industries), and an owner sentence that is
`full-cycle` in plain words. None of it is in the register. Adding those as new owner-sourced rows
would not require publishing the barred sentence. Brad has not asked for this.

---

## 28 August 2026: dimension 8 is split in two

**Decided by Brad.** The single dimension "High-volume net-new acquisition, cold outbound" at 0.25
was measuring the wrong thing. It was capped from the cold-calling motion, but the evidence sitting
underneath it is a record of growing a business's customer base, which is a different capability
and is evidenced at four separate employers.

**Brad's challenge, verbatim in substance:** he does not accept that cold outbound is a poor skill,
and pointed to Adplus, Hawke's Bay Tourism, Canwest and 99 Corporation as roles where he
significantly increased the business base.

**The register backs the second half of that squarely.** What was found:

| Role | Register rows | What it evidences |
|---|---|---|
| 99 Corporation | E12, E51, E52 | Customer base up ~70%, income up ~120%. **Owner Rob Nieuwland independently confirmed 14 Aug 2026**: 70% more business clients, 30% more profit per customer. Naming approved. Footnote 45 calls E12 "the single most direct evidence for the target role in the entire archive". |
| Adplus / HB Tourism | E31, E32, E33, E37 | Ad revenue +60%, advertiser volume +40% over 3 years, average deal size ~+14%. Two-tier Gold Pages product. By year three every winery had to be in the guide or miss out. |
| Xplore | E21 | Founded Xchange, a 25-business weekly referral network, and collected **over $70,000 in business from it across two years**. Self-originated new business with a figure attached. |
| Canwest | E45, E46 | Account growth 10–20% a year against a 10% company minimum, hit every year. 178% of budget at best. |

**The distinction that resolves it.** Growing a customer base is not the same capability as
high-volume cold outbound as a daily motion. Brad has strong, multi-employer, partly
owner-corroborated evidence for the first. The 0.25 was set from the second. E15 remains on the
record and is the honest bound on the second: he left 99 Corporation partly because he did not
enjoy outbound cold calling, and no dial or meeting volumes exist anywhere in the register.

**The resolution: nine dimensions, not eight.**

| id | Visitor-facing label | Ceiling | Was |
|---|---|---|---|
| `adoption` | Getting non-technical users to actually use the product | 0.95 | unchanged |
| `retention` | Keeping accounts that are at risk of leaving | 0.92 | unchanged |
| `expansion` | Growing revenue inside accounts already held | 0.90 | unchanged |
| `pricing-cash` | Pricing structure and cash cycle | 0.90 | unchanged |
| `commercial-terms` | Contracts, licensing and vendor terms | 0.88 | unchanged |
| `full-cycle` | Owning the whole cycle solo, prospect to invoice | 0.85 | unchanged |
| `customer-base` | **Growing the size of a customer base** | **0.85** | **NEW** |
| `demand` | Generating new demand: campaigns, partnerships, marketing | **0.70** | 0.60 |
| `cold-outbound` | High-volume cold outbound as the daily motion | **0.35** | 0.25 |

`demand` rises to 0.70 because E32, E35, E42 and E43 are campaign, partnership and packaging work
the eight-dimension model did not count anywhere.

**Consequence, and it is not optional.** The enumerated distribution in the plan (min 20, max 96,
median 70, 31.4% below Substantial) was computed on eight dimensions and **no longer holds**. The
question set in §2 of the plan also has no route to `customer-base` yet, because the dimension did
not exist when it was written. Both must be reworked and the enumeration re-run before any code is
written. Do not trust a scoring model on this feature that has not been enumerated.

**Open risk to watch when re-tuning.** Splitting one 0.25 dimension into a 0.85 and a 0.35 raises
the floor of the model. The SDR-led manager path scored 21 under the old model; it will score
higher now. If the sub-65 share falls below 25%, the question set needs the low-ceiling routes
strengthened, not the ceilings pushed back down.

---

## 28 August 2026: the 99 Corporation evidence has no scan

**Found while checking the above.** `src/data/letters.ts` holds seven letters, with scans in
`src/assets/letters/`: Sancta Maria, PowerSchool, Andrew Bergh, Rototuna, The Industry School,
Canwest Media, Adplus Advertising, Hawke's Bay Tourism.

**There is no 99 Corporation or Nieuwland letter.** The register records E51 as "Vouched — Rob
Nieuwland, owner, same-day", which is a phone call on 14 August 2026, not a document.

**Why it matters.** The 99 Corporation numbers are the strongest single evidence behind the new
`customer-base` dimension, and PRODUCT.md principle 3 requires every quoted claim on the site to be
verifiable in one click against its source. Brad has said he already has the Nieuwland reference.
**What form it is in decides what the page can do:**

- A signed letter or email that can be scanned → add to `letters.ts` and `src/assets/letters/`,
  and the strongest evidence card on the page gets a one-click link like every other.
- Verbal only → the evidence card must attribute it as owner-confirmed by name, without a link,
  and that asymmetry should be visible rather than hidden.

**Unresolved. Blocks the evidence card for `customer-base`, not the scoring model.**
