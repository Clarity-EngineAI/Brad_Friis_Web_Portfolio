import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "brad-friis",
  title: "Brad Friis",

  projectId: "ao34shul",
  dataset: "production",

  plugins: [structureTool()],

  schema: { types: schemaTypes },

  document: {
    /* The site sorts by date descending everywhere. Defaulting the Studio list to the
       same order means what Brad sees while editing matches what publishes. */
    newDocumentOptions: (prev) => prev,
  },
});
