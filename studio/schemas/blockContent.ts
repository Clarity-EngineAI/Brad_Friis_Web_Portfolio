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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: title ?? "(empty paragraph)", subtitle: "Paragraph" }),
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
