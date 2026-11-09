import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sitePages } from './scripts/site-pages.ts'

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), sitePages()],
  build: {
    rollupOptions: {
      input: {
        demo: resolve(import.meta.dirname, 'demo/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
      },
    },
  },
})
