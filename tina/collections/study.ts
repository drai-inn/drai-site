import type { Collection } from "tinacms";

export const StudyCollection: Collection = {

  name: "study",
  label: "Cases",
  path: "src/content/case",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/drai-site/case/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
    {
      name: "pubDate",
      label: "Publication Date",
      type: "datetime",
    },
    {
      name: "updatedDate",
      label: "Updated Date",
      type: "datetime",
    },
    {
      name: "heroImage",
      label: "Hero Image",
      type: "image",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
    {
      name: "sector",
      label: "Sector",
      type: "string",
    },
    {
      name: "case_link",
      label: "Case Link",
      type: "string",
    },
    {
      name: "cta",
      label: "Call to Action",
      type: "string",
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
    {
      name: "image_alt",
      label: "Image Alt Text",
      type: "string",
    },
    {
      name: "bg",
      label: "Background",
      type: "string",
    },
  ],
}