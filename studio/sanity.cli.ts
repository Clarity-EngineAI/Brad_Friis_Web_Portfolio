import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "ao34shul",
    dataset: "production",
  },
  studioHost: "bradfriis",

  /* Pinned from the first successful deploy, 19 August 2026. Without it every
     `sanity deploy` prompts for the application id again. */
  deployment: {
    appId: "t43fua7m2t69rwo67qu3l3fk",
  },
});
