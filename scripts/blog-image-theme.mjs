/**
 * The house style for generated blog images, locked to the site's actual design
 * tokens (src/styles/global.css) so images don't drift from run to run or from
 * each other. This file is the single place that defines "what a Brad Friis blog
 * image looks like" — new articles should describe their scene, not their palette.
 *
 * The accent value below tracks --accent in global.css by hand (gpt-image-1 has no
 * way to read the stylesheet directly). If the site's accent ever moves, update
 * ACCENT_HEX here to match.
 */

const ACCENT_HEX = "#9c3d1e"; // --accent, burnt sienna
const GROUND_HEX = "#fbfbfd"; // --ground
const INK_HEX = "#1c1917"; // --ink

export const THEME = {
  accent: ACCENT_HEX,
  ground: GROUND_HEX,
  ink: INK_HEX,
};

const HOUSE_STYLE_BASE =
  `Editorial illustration for a business article. Restrained, flat, modern vector style. ` +
  `The background is one flat pale off-white, ${GROUND_HEX}: a bright, light, clean, airy, evenly lit ` +
  `page, the same pale tone edge to edge and corner to corner, as plain and empty as fresh paper under ` +
  `flat light. Every corner and every edge is exactly as pale and bright as the centre. No gradient, ` +
  `no vignette, no shading, no darkened or warmed corners or edges, no texture, no paper grain, no ` +
  `tint. The one accent colour, used only to fill shapes, is hex ${ACCENT_HEX}, a dark muted brick. ` +
  `Secondary shapes use warm greys and muted sage, ` +
  `never a second bright colour. Line and shadow work, where used, is a dark warm charcoal close to ` +
  `${INK_HEX}, never pure black. Generous white space. Calm and professional, not playful. ` +
  `No logos, no watermarks, no user interface chrome, no photorealism, no 3D render, ` +
  `no stock-photo look, no clip art.`;

/* Scene images (hero, applied-visual) stay text-free. A person or product grid with
   text baked in reads as a screenshot, not an illustration. Diagrams are the one
   exception: the first version of "agentic-ecommerce-intent-model" followed the
   no-text rule and came out structurally ambiguous, because shape alone couldn't
   carry "customer segment" vs "intent signals". Short labels resolved it, so
   diagrams now ask for them deliberately instead of relying on the model to break
   the rule on its own.

   Keep this block SHORT. Six generations on that one diagram, 28 August 2026, sort
   by prompt length and nothing else: the two runs with a terse label instruction
   produced a flat background and clean glyphs, and the four runs with an expanded
   typography paragraph (asking for "crisp", "professionally typeset", "layout grid")
   all produced an olive gradient, glow haloes and garbled text. Asking harder for
   crisp type appears to invoke the model's UI-mockup vocabulary, which is rendering
   effects, and the text degrades with the background. Do not re-expand this to fix
   a typography complaint. */
const NO_TEXT = `No text, no words, no letters, no numbers, no labels.`;
const SHORT_LABELS =
  `Each node carries one short text label (one or two words, e.g. "Customer segment") set in a `
  + `clean simple sans-serif, small and unobtrusive relative to the shape it labels. Place every `
  + `label the same way: centred just below the shape it names, never inside the shape. No other `
  + `text anywhere in the image, no titles, no captions, no numbers, no logos.`;

/**
 * A concept is a structured description of what the image must communicate, not
 * prose. Structuring it this way forces a decision about the relationship being
 * shown before the prompt is written, which is where "agentic-ecommerce-intent-model"
 * went wrong the first time: "a rigid chain vs a flowing chain" names a mood, not a
 * mechanism, so gpt-image-1 filled the gap with an arbitrary orange and an ambiguous
 * tangle of arrows. Naming the exact nodes and the exact relationship between them
 * gives the model a specific shape to draw instead of an impression to interpret.
 *
 * @param {object} concept
 * @param {"scene"|"diagram"} concept.type
 * @param {string} concept.subject - one sentence: what this image is of
 * @param {string[]} [concept.nodes] - diagram only: the discrete things being compared/connected, in order
 * @param {string} [concept.relationship] - diagram only: the single mechanism linking the nodes (a cause, a flow, a before/after) - the one idea the image must land
 * @param {string} [concept.detail] - additional composition detail (layout, framing, contrast)
 */
export function buildPrompt(concept) {
  if (concept.type === "diagram") {
    if (!concept.nodes?.length || !concept.relationship) {
      throw new Error(
        `Diagram concept "${concept.subject}" needs both nodes and a relationship — ` +
          `a diagram prompt without an explicit mechanism produces an ambiguous picture.`
      );
    }
    return (
      `A clean abstract diagram. Subject: ${concept.subject} ` +
      `The diagram has exactly these elements, in this order: ${concept.nodes.join(" -> ")}. ` +
      `The relationship the diagram must make visually obvious: ${concept.relationship} ` +
      `Represent each element as a distinct simple shape so the sequence and the branching or ` +
      `convergence between elements is unambiguous at a glance. ` +
      `${concept.detail ?? ""} ` +
      `${HOUSE_STYLE_BASE} ${SHORT_LABELS}`
    );
  }

  return `${concept.subject} ${concept.detail ?? ""} ${HOUSE_STYLE_BASE} ${NO_TEXT}`;
}
