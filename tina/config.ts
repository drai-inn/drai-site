import { defineConfig } from "tinacms";
import { BlogCollection } from "./collections/blog";
import { GlobalConfigCollection } from "./collections/global-config";
import { PageCollection } from "./collections/page";

// Check if the '--local' flag is present in the command-line arguments.
const isLocalBuild = process.argv.includes('--local');

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Configuration for connecting to Tina Cloud (used for local development)
const cloudConfig = {
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
};

// For a local-only build (in CI), we provide an empty configuration object.
// This prevents any cloud or auth logic from being triggered.
const localConfig = {};

export default defineConfig({
  // Conditionally use the correct configuration. When '--local' is used,
  // no cloud or auth properties will be present in the config.
  ...(isLocalBuild ? localConfig : cloudConfig),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      BlogCollection,
      PageCollection,
      GlobalConfigCollection,
    ],
  },
});
