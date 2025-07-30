import { defineConfig } from "tinacms";
import { BlogCollection } from "./collections/blog";
import { GlobalConfigCollection } from "./collections/global-config";
import { PageCollection } from "./collections/page";

// Check if the '--local' flag is present in the command-line arguments.
// This is a more direct way to detect if we are running a local-only build.
const isLocalBuild = process.argv.includes('--local');

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Define the cloud-specific configuration in its own object
const cloudConfig = {
  branch,
  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
}

export default defineConfig({
  branch,
  
  // Conditionally spread the cloud config.
  // When '--local' is used, this will be an empty object, completely removing the cloud keys
  // and forcing a true local build.
  ...(isLocalBuild ? {} : cloudConfig),

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
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      BlogCollection,
      PageCollection,
      GlobalConfigCollection,
    ],
  },
});
