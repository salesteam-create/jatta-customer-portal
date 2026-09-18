import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The source entry lives in app/ rather than the project root.
 *
 * GitHub Pages on this repository serves the repository root, so the BUILT index.html
 * is committed there. If the source entry were also called index.html at the root, the
 * two would collide and Vite would bundle its own previous output. Keeping the entry in
 * app/ removes that collision.
 *
 * If Pages is ever switched to the "GitHub Actions" source, this can move back to the
 * root and the committed build output can be deleted.
 */
export default defineConfig({
  root: 'app',
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    fs: {
      // src/ sits above the Vite root.
      allow: ['..'],
    },
  },
})
