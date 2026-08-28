import { defineType, defineField } from "sanity";
import { checkGuardrails, GUARDRAIL_NOTE } from "./guardrails";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: GUARDRAIL_NOTE,
      validation: (rule) => rule.required().max(70).custom(checkGuardrails),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "The web address, e.g. “plastic-bags” becomes bradfriis.com/blog/plastic-bags/. Changing this on a published post breaks any existing link to it.",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Standfirst",
      type: "text",
      rows: 2,
      description: `The one-line summary under the title, on the index and at the top of the post. ${GUARDRAIL_NOTE}`,
      validation: (rule) => rule.required().max(180).custom(checkGuardrails),
    }),
    defineField({
      name: "date",
      title: "Publication date",
      type: "date",
      description: "Sets the order posts appear in — newest first.",
      options: { dateFormat: "D MMMM YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "The label above the title, e.g. “A story”.",
      validation: (rule) => rule.required().max(40).custom(checkGuardrails),
    }),
    defineField({
      name: "image",
      title: "Lead image",
      type: "imageBlock",
      description:
        "Optional image shown above the body, under the standfirst. Same rule as an in-body image: the file lives in src/assets/blog and this records its key.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: `Built from five kinds of block: heading, paragraph, list, section break, and image. ${GUARDRAIL_NOTE}`,
      of: [
        { type: "headingBlock" },
        { type: "paragraphBlock" },
        { type: "listBlock" },
        { type: "breakBlock" },
        { type: "imageBlock" },
      ],
      validation: (rule) =>
        rule.required().min(1).custom((blocks) => {
          if (!Array.isArray(blocks)) return true;
          for (const block of blocks) {
            const text = (block as { text?: unknown })?.text;
            const result = checkGuardrails(text);
            if (result !== true) return result;
            const items = (block as { items?: unknown })?.items;
            if (Array.isArray(items)) {
              for (const item of items) {
                const itemResult = checkGuardrails(item);
                if (itemResult !== true) return itemResult;
              }
            }
          }
          return true;
        }),
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", date: "date" },
    prepare: ({ title, subtitle, date }) => ({
      title,
      subtitle: [subtitle, date].filter(Boolean).join(" · "),
    }),
  },
});
