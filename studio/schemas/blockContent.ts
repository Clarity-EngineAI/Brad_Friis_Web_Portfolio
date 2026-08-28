import { defineType, defineField } from "sanity";

/* The site renders exactly three block kinds, in BlogBody.astro. Modelling them as
   discrete object types rather than Portable Text keeps that renderer untouched and
   makes it impossible to author formatting the site's typography cannot express. */

export const headingBlock = defineType({
  name: "headingBlock",
  title: "Heading",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Heading text",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: title ?? "(empty heading)", subtitle: "Heading" }),
  },
});

export const paragraphBlock = defineType({
  name: "paragraphBlock",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Paragraph",
      type: "text",
      rows: 4,
      description: "Wrap text in ** for bold, e.g. **like this**.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: title ?? "(empty paragraph)", subtitle: "Paragraph" }),
  },
});

export const listBlock = defineType({
  name: "listBlock",
  title: "List",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: { list: [{ title: "Bulleted", value: "bullet" }, { title: "Numbered", value: "number" }] },
      initialValue: "bullet",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      description: "Wrap text in ** for bold, e.g. **like this**.",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items", style: "style" },
    prepare: ({ items, style }) => ({
      title: Array.isArray(items) ? items.join(" / ") : "(empty list)",
      subtitle: style === "number" ? "Numbered list" : "Bulleted list",
    }),
  },
});

export const breakBlock = defineType({
  name: "breakBlock",
  title: "Section break",
  type: "object",
  fields: [
    defineField({
      name: "note",
      title: "Note (not published)",
      type: "string",
      description: "Optional reminder to yourself. Never appears on the site.",
    }),
  ],
  preview: {
    select: { subtitle: "note" },
    prepare: ({ subtitle }) => ({ title: "— — — section break — — —", subtitle }),
  },
});

/* Images are not uploaded here. Every image on the site is a local file imported through
   Astro's asset pipeline (see src/data/letters.ts and src/data/blogImages.ts), which gives
   hashed filenames, generated widths and build-time dimensions. A Sanity asset would be a
   CDN URL and would leave that pipeline entirely. So this block stores a *key* into the
   site's own registry, and the alt text, which is genuinely editorial. */
export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Image key",
      type: "string",
      description:
        "The name of the file in src/assets/blog, without the extension, e.g. “agentic-ecommerce-hero”. The image itself is added to the repository, not uploaded here.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
            name: "lowercase-hyphenated",
            invert: false,
          })
          .error("Lowercase letters, numbers and hyphens only, e.g. “agentic-ecommerce-hero”."),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "What the image shows, for a reader who cannot see it. Describes the content, not the fact that it is an image.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional line printed under the image.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "key" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "(no alt text)",
      subtitle: subtitle ? `Image · ${subtitle}` : "Image",
    }),
  },
});
