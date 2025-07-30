// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"

// https://astro.build/config
export default defineConfig({
    // This is the new block to add for the dev server
    server: {
        proxy: {
          '/admin': 'http://localhost:4001',
          '/graphql': 'http://localhost:4001',
        },
    },

    // Your existing site and integrations configuration
    site: process.env.SITE_URL || `https://${process.env.VERCEL_URL}`,
    integrations: [mdx(), sitemap(), react(), tinaDirective()],
});