// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import tinaDirective from "./astro-tina-directive/register"

// https://astro.build/config
export default defineConfig({
    // CONFIG FOR GITHUB PAGES
    site: 'https://drai-inn.github.io',
    base: '/drai-site',

    // Your existing integrations
    integrations: [mdx(), sitemap(), react(), tinaDirective()],

    // Blackspike theme configuration
    vite: {
        plugins: [tailwindcss()]
    },
    experimental: {
        fonts: [{
            provider: "local",
            name: "InterLocal",
            cssVariable: "--font-inter",
            variants: [
                {
                    weight: 400,
                    style: "normal",
                    src: ["./src/assets/fonts/Inter-Regular.woff2"]
                },
                {
                    weight: 600,
                    style: "normal",
                    src: ["./src/assets/fonts/Inter-SemiBold.woff2"]
                },
                {
                    weight: 700,
                    style: "normal",
                    src: ["./src/assets/fonts/Inter-Bold.woff2"]
                }
            ]
        },
        {
            provider: "local",
            name: "InterLocalDisplay",
            cssVariable: "--font-inter-display",
            variants: [
                {
                    weight: 400,
                    style: "normal",
                    src: ["./src/assets/fonts/InterDisplay-Regular.woff2"]
                },
                {
                    weight: 500,
                    style: "normal",
                    src: ["./src/assets/fonts/InterDisplay-Medium.woff2"]
                },
                {
                    weight: 600,
                    style: "normal",
                    src: ["./src/assets/fonts/InterDisplay-SemiBold.woff2"]
                }
            ]
        }]
    }

    /* vite: {
        server: {
            configureServer: (server) => {
                server.middlewares.use((req, res, next) => {
                    console.log(`[Vite] ${req.method} ${req.url}`);
                    next();
                });
            },
            proxy: {
                '/drai-site/admin/index.html': {
                    target: 'http://localhost:4001/admin/index.html',
                    changeOrigin: true,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log(`[ProxyReq] ${req.method} ${req.url} -> ${proxyReq.path}`);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log(`[ProxyRes] ${req.method} ${req.url} - Status: ${proxyRes.statusCode}`);
                        });
                        proxy.on('error', (err, req, res) => {
                            console.error(`[ProxyError] ${req.method} ${req.url} - ${err.message}`);
                        });
                    },
                },
                '/drai-site/admin': {
                    target: 'http://localhost:4001/admin/index.html',
                    changeOrigin: true,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log(`[ProxyReq] ${req.method} ${req.url} -> ${proxyReq.path}`);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log(`[ProxyRes] ${req.method} ${req.url} - Status: ${proxyRes.statusCode}`);
                        });
                        proxy.on('error', (err, req, res) => {
                            console.error(`[ProxyError] ${req.method} ${req.url} - ${err.message}`);
                        });
                    },
                },
                '/drai-site/graphql': {
                    target: 'http://localhost:4001/graphql',
                    changeOrigin: true,
                    configure: (proxy, options) => {
                        proxy.on('proxyReq', (proxyReq, req, res) => {
                            console.log(`[ProxyReq] ${req.method} ${req.url} -> ${proxyReq.path}`);
                        });
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            console.log(`[ProxyRes] ${req.method} ${req.url} - Status: ${proxyRes.statusCode}`);
                        });
                        proxy.on('error', (err, req, res) => {
                            console.error(`[ProxyError] ${req.method} ${req.url} - ${err.message}`);
                        });
                    },
                },
            },
        },
    } */
});
