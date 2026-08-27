import type { StructureResolver } from "sanity/structure";

/** Desk matches the live site: blog posts, newest first. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Blog posts")
            .defaultOrdering([{ field: "date", direction: "desc" }]),
        ),
    ]);
