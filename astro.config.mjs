import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  server: {
    host: '127.0.0.1'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: netlify(),
  integrations: [mdx(), react()]
});
