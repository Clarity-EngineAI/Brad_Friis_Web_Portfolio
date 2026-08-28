# Next session

**Model:** Sonnet for the investigation and a first attempt. If prompt-only fixes don't get the
text quality where Brad wants it, the decision about switching approach (see options below) is
Brad's, not a model-tier question.

## Start here

Brad looked at the regenerated `agentic-ecommerce-intent-model.png` and flagged that the in-image
text labels ("Customer segment", "Predetermined experience", etc.) look AI-generated — likely
uneven padding inside the node shapes, off typographic weight/kerning versus the site's real type.
Screenshot it again first to see current state:

```sh
npx astro dev stop; (npm run dev > /tmp/astro-dev.log 2>&1 &)
# wait for "Dev server running", then load and screenshot:
# http://localhost:4321/blog/your-customer-hasnt-changed
```

The diagram is the second figure on the page (scroll ~3900px). Compare its label rendering against
the surrounding page type.

## Where things stand

**Committed, on `main`:**
- `0d98112` — `scripts/blog-image-theme.mjs` (new): locks the exact accent/ground/ink hex values
  from `global.css` into every generated-image prompt, and a `buildPrompt()` helper that takes a
  structured concept (`type: "scene"` or `type: "diagram"`) instead of raw prose. Diagram concepts
  require an explicit `nodes` list and a `relationship` string (the mechanism the image must show),
  and now deliberately request short text labels on each node rather than following a blanket
  no-text rule — the first version of this diagram had no text and was structurally ambiguous
  (flagged by Brad); the second version has text but the text rendering itself is the new complaint.
- `a5a1d19` — the original imageBlock schema, image pipeline, and list/bold rendering (from the
  prior session).

**Not yet resolved:** the regenerated `src/assets/blog/agentic-ecommerce-intent-model.png` has
readable, correctly-positioned *content* (right nodes, right branching structure — that problem is
fixed) but the *typography* inside it looks synthetic. This is a known ceiling for diffusion image
models: they approximate letterforms and spacing rather than setting real type, so kerning, padding
and baseline alignment will never be as clean as CSS/SVG text.

## The actual decision needed

Prompt engineering can probably nudge this (tighter instructions on padding/alignment, asking for
"minimalist infographic style with precise typography" etc.) but is unlikely to fully close the gap
— it's a model limitation, not a prompting miss. Options, roughly in order of effort:

1. **Iterate the prompt further.** Cheap (~USD 0.17/attempt), stay inside `blog-image-theme.mjs` and
   `generate-blog-images.mjs`. Try `gpt-image-1` `quality: "high"` is already set; could try more
   explicit typography instructions in `SHORT_LABELS`. Ceiling is real but not yet proven reached —
   worth one or two more tries before concluding it can't work.
2. **Generate the diagram shapes/colours only (no text), overlay real HTML/CSS or SVG labels at
   render time.** Bigger change: `BlogBody.astro`'s `imageBlock` renderer would need a way to know
   this is a "labelled diagram" and overlay positioned `<span>` elements or an SVG `<text>` layer
   using the site's actual font. Gets pixel-perfect type but needs label positions authored somewhere
   (schema field per node, or a fixed layout assumption) — real design work, not a script tweak.
3. **Build the diagram as native SVG/CSS instead of a generated image.** Drops gpt-image-1 for this
   image entirely. Most control, most effort, and stops using the image generator for diagram-type
   content going forward (scene images like the hero would presumably stay generated).
4. **Accept it as-is.** The structural ambiguity Brad's earlier complaint was about is fixed; the
   typography quality may be a "good enough for a blog post" bar he's fine with once he sees it
   again in context, or not.

Don't default to option 1 without asking — this is a judgement call about how much polish this
image deserves, not a bug to silently patch. Bring Brad the tradeoffs and let him choose before
spending more generation budget or engineering time.

## Files to read first, in order

1. `scripts/blog-image-theme.mjs` — the `SHORT_LABELS` clause is what's currently asking for text;
   read the comment above it for why text was added back in after being removed once
2. `scripts/generate-blog-images.mjs` — the `agentic-ecommerce-intent-model` concept block, with the
   node list and relationship string
3. Current `src/assets/blog/agentic-ecommerce-intent-model.png` — look at it directly before doing
   anything else

## Cost note

Regeneration is billed, about USD 0.17 per attempt at 1536x1024 high. Don't loop attempts without
checking each result — the skip-if-exists default on the script prevents accidental double-billing,
but `--force` bypasses that deliberately, so use it once per considered change, not experimentally.
