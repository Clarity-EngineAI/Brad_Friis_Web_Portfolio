import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "brad-friis",
  title: "Brad Friis",

  projectId: "ao34shul",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: "2026-08-19",
      defaultDataset: "production",
    }),
  ],

  schema: { types: schemaTypes },

  document: {
    /* Object types (heading / paragraph / break) are not documents. Without this
       filter they can still appear in the New menu and create unusable records. */
    newDocumentOptions: (prev) =>
      prev.filter((template) => template.templateId === "post"),
  },
});
