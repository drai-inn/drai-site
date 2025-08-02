// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"

// https://astro.build/config
export default defineConfig({
    // CONFIG FOR GITHUB PAGES
    site: 'https://ndjones.github.io',
    base: '/drai-site',

    // Your existing server proxy for local development
    server: {
        proxy: {
          '/drai-site/admin': 'http://0.0.0.0:4001/admin',
          '/admin': 'http://0.0.0.0:4001',
          '/graphql': 'http://0.0.0.0:4001',
        },
    },

    // Your existing integrations
    integrations: [mdx(), sitemap(), react(), tinaDirective()],
});