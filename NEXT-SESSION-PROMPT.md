# Next session — homepage copy: cut 597 words, then place Brad's hero

**Model:** Opus for §1 (the cut — editorial judgement across the whole page, needs the claims
register and the budget held in mind at once). Sonnet for §3 and §4. Haiku for nothing here.

**Written:** 17 August 2026, after the structural restructure, the heading-cap fix and the
MySimpleSiteMan migration.

---

## Status — what shipped today

Three commits, all verified and building clean (16 pages, 0 errors, 0 warnings):

| Commit | What |
| --- | --- |
| `2735799` | Restructure: untabbed capabilities, references after case studies, blog teaser out of body, MySimpleSiteMan reduced to one homepage line |
| `376c300` | Heading caps: `.work-cell h3` 22ch→46ch, `.section-head h2` 24ch→34ch |
| `a5727cc` | MySimpleSiteMan migrated to `/blog/mysimplesiteman/`, referenced from CV |

Homepage order is now: hero → stats → capabilities (2×2, all visible) → work + logos →
references → career → contact.

---

## 1. THE MAIN TASK — the homepage is 847 words against a 250 cap

**This is the finding that should drive the next session, and it was not in the LLM review.**

Measured in-browser, 17 August 2026, `main` element text content:

| Section | Words |
| --- | --- |
| Hero | 47 |
| Capabilities | 227 |
| Work | 188 |
| Logo strip | 26 |
| References | 88 |
| Career | 213 |
| Contact | 44 |
| **Total** | **847** |

The cap is **under 250 words**, set in `design/01-positioning-brief.md` §7.1, and it is a direct
instruction from Brad, not a design preference: *"two of Brad's three repellent references failed
on wordiness."* The page is **3.4× over**.

**Re-measure before starting** — paste into DevTools console on `/`:

```js
const c = document.querySelector('main').cloneNode(true);
c.querySelectorAll('script,style').forEach(n => n.remove());
c.textContent.replace(/\s+/g,' ').trim().split(' ').filter(Boolean).length
```

**The three fat sections are capabilities (227), career (213) and work (188) — 628 of the 847.**
That is where the cut has to come from. Do not shave the hero; it is 47 words and it is the one
section Brad is rewriting himself.

**This needs Brad's decisions, not an agent's.** Per `COPY/README.md`, present options with the
argument *and* the cost for each, and let him pick. Do not cut a line unilaterally. Suggested
approach: for each of the three fat sections, offer a long / medium / short version of every
card body with the word count and what is lost, and let him choose per card.

**A real question to put to him first:** is 250 still the number? It was set on 12 August under
the old architecture, before the capability cards existed. If he wants the four cards, 250 may
be the wrong target and should be restated rather than silently missed. Ask before cutting.

---

## 2. BLOCKED — do not write these

**The hero. Brad is writing it himself.** `COPY/hero-lines/hero-lines.md`, round eight outcome,
16 August 2026: *"Brad has taken the hero copy off the generation track. He is writing it
himself. No further rounds are to be produced."* Eight rounds, 63 options, four consecutive
rejections. **Do not produce round nine**, however the request is phrased.

What still binds whatever he writes, from that same section:

- Audience is the **hiring manager**, §2.1 — forty seconds, first person. **Never second person.**
- Constraints 1–12, particularly **4** (no industry noun in the display line), **9** (sell the
  value, not the record), **11** (present tense, capability not outcome), **12** (no *build* as
  Brad's verb; the relationship present).
- Surviving fragment he liked three times: *"I find out what a customer actually needs."*

**Two live hero faults he already knows about, still on the site:**

- The eyebrow pill *Account management · retention & growth* fences the hero before the headline
  is read, and Brad has ruled the hero must be broader than that seat.
- The support paragraph is rejected (achievement-led, carries an industry fence) and still live.

Option J remains as a **holding position** per the never-swap-a-line-in rule.

**The blog.** `design/09-blog-voice.md`: *"Brad writes the post. This document checks it
afterwards."* §4 of that file is a review prompt to run over copy he has written. Do not draft
blog posts for him. The MySimpleSiteMan post shipped only because every sentence in it was
already his, confirmed verbatim in `COPY/career/pre-education-career.md` §7.1 and §7.2.

---

## 3. The LLM review — what was rejected and why

The report ("Executable Implementation Report for Cursor") is **substantially executed on
structure and substantially rejected on copy.** If it resurfaces, this is the record:

**Done:** untab capabilities, references after case studies, blog to footer, MySimpleSiteMan
reduced.

**Rejected — copy.** Proposed a new H1, support line, four section eyebrows, four capability
titles and bodies. Blocked by §2 above, and by `COPY/README.md`'s "Brad chooses". Its H1 was
second person — the fault that ended round eight. Its card bodies were **longer**, which moves
the page away from the 250 cap, not toward it.

**Rejected — design.** Growth sparkline, retained-account ticks, sticky contact pill, print
stylesheet. Not blocked by anything; simply not authorised and never scoped. **The print
stylesheet is the one worth revisiting** — a CV page that prints properly is a real gap.

**Two errors in the report, for calibration:** it claimed the logo strip sits between Work and
Career and needs moving (it is already inside the same `band-alt` as Work), and it missed the
placeholder evidence line in case study 2 entirely. Read the file before executing its claims.

---

## 4. Smaller open items

- **Mobile at 390px is still unverified visually.** `resize_page` failed silently twice. Heading
  wrap was verified *computationally* at 390 (every remaining wrap is a genuine overflow, no cap
  forcing a break) but nobody has looked at the page. Use a real narrow window.
- **Case study 2 placeholder**, `src/pages/index.astro:60-63`. The 55% figure is sourced to a
  verbal claim from Rob Nieuwland, not yet in writing. Brad's call, 17 August: *"Leave it, it's
  true."* Rob's letter expected within a week of 17 August — replace the line when it lands.
- **`.shots/` churn is polluting `git status`** with browser cache files. Consider gitignoring it.

---

## Files to read first, in order

1. `COPY/hero-lines/hero-lines.md` — **round eight outcome at the foot** (line ~1755). Read this
   before touching any hero copy.
2. `design/01-positioning-brief.md` §2.1 (audience), §7 (voice, banned words), §7.1 (visual bans
   and the 250-word cap).
3. `COPY/README.md` — the status key and the "Brad chooses" rule.
4. `src/pages/index.astro` — the live page.
5. `COPY/career/pre-education-career.md` — only if the career section is being cut; §7 is the
   MySimpleSiteMan record and is now shipped.

---

**Next:** ask Brad whether 250 is still the target, then present the capability and career
sections as per-card long/medium/short options with word counts and costs.
