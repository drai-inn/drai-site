import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";
import { glob } from "astro/loaders";
import path from "path";
import fs from "fs";

// Static content loader for production builds (when TinaCMS server is not available)
const createStaticBlogLoader = () => {
  // Check if we're in a build environment without TinaCMS server
  const isStaticBuild = process.env.NODE_ENV === 'production' || process.env.ASTRO_BUILD === 'true';
  
  if (isStaticBuild) {
    // Use file-based loading for static builds
    return glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" });
  }
  
  // Use TinaCMS client for dev builds (when server is running)
  return async () => {
    try {
      const postsResponse = await client.queries.blogConnection();

      // Map Tina posts to the correct format for Astro
      return postsResponse.data.blogConnection.edges
        ?.filter((post) => !!post)
        .map((post) => {
          const node = post?.node;

          return {
            ...node,
            id: node?._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
            tinaInfo: node?._sys, // Include Tina system info if needed
          };
        });
    } catch (error) {
      console.warn('TinaCMS client failed, falling back to file-based loading:', error.message);
      // Fallback to file-based loading if TinaCMS client fails
      const globLoader = glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" });
      return typeof globLoader === 'function' ? await globLoader() : globLoader;
    }
  };
};

const blog = defineCollection({
  loader: createStaticBlogLoader(),
  schema: z.object({
    // Make tinaInfo optional for static loading
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }).optional(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
  }),
});

// Static content loader for pages
const createStaticPageLoader = () => {
  // Check if we're in a build environment without TinaCMS server
  const isStaticBuild = process.env.NODE_ENV === 'production' || process.env.ASTRO_BUILD === 'true';
  
  if (isStaticBuild) {
    // Use file-based loading for static builds
    return glob({ pattern: "**/*.{md,mdx}", base: "./src/content/page" });
  }
  
  // Use TinaCMS client for dev builds (when server is running)
  return async () => {
    try {
      const postsResponse = await client.queries.pageConnection();

      // Map Tina posts to the correct format for Astro
      return postsResponse.data.pageConnection.edges
        ?.filter((p) => !!p)
        .map((p) => {
          const node = p?.node;

          return {
            ...node,
            id: node?._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
            tinaInfo: node?._sys, // Include Tina system info if needed
          };
        });
    } catch (error) {
      console.warn('TinaCMS client failed for pages, falling back to file-based loading:', error.message);
      // Fallback to file-based loading if TinaCMS client fails
      const globLoader = glob({ pattern: "**/*.{md,mdx}", base: "./src/content/page" });
      return typeof globLoader === 'function' ? await globLoader() : globLoader;
    }
  };
};

const page = defineCollection({
  loader: createStaticPageLoader(),
  schema: z.object({
    // Make tinaInfo optional for static loading
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }).optional(),
    seoTitle: z.string(),
    body: z.any().optional(), // Body might not be present in static mode
  }),
})
export const collections = { blog, page };
