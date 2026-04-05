import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  server: {
    host: '127.0.0.1'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  adapter: process.env.NODE_ENV === 'production' ?
    netlify() : node({
      mode: 'standalone'
    }),
  integrations: [mdx(), react()]
});
