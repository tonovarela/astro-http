// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

//import cloudflare from '@astrojs/cloudflare';

import node from '@astrojs/node';

import db from '@astrojs/db';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  output:'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [mdx(), sitemap(), db(), vue()],
  

  //output: 'hybrid',
  //adapter: cloudflare(),
});