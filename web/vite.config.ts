import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_PAGES } from './src/about/routes.ts'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Demo stays at /; each promotional page has a directly loadable HTML entry.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(SITE_PAGES.map(({ id, slug }) => [
          `site-${id}`, resolve(import.meta.dirname, 'hakkimizda', slug, 'index.html'),
        ])),
      },
    },
  },
})
