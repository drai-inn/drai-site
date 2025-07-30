import { defineConfig } from "tinacms";
import { BlogCollection } from "./collections/blog";
import { GlobalConfigCollection } from "./collections/global-config";
import { PageCollection } from "./collections/page";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

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
  // ADMIN BLOCK TO PROVIDE A DUMMY AUTH FOR THE BUILD PROCESS for Self Hosting on Github Pages
  // This is necessary because the Tina Cloud build process requires authentication.
  // If you are using Tina Cloud, you can remove this block.
  // If you are self-hosting, you can use this block to provide a dummy authentication
  // that satisfies the build process without needing a real user.
  // This will allow the build to complete successfully, but you will not be able to use
  // the admin interface to manage content.
  admin: {
    auth: {
      customAuth: true,
      // This function now reads a token from the environment variables,
      // which is standard practice for CI/CD.
      getToken: async () => {
        return {
          id_token: process.env.TINA_TOKEN,
        }
      },
      // These functions are not called during the build, but are required by the type definition.
      getUser: async () => {
        return
      },
      authenticate: async () => {
        // Does nothing
      },
      logOut: async () => {
        // Does nothing
      },
    },
  },
});
