// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://reef.support',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  // Fetch the next page when a visitor hovers or focuses a link (small built-in script, same origin only).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|search)$/.test(page.replace(/\/$/, '')),
    }),
  ],
});
