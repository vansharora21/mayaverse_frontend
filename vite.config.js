import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
  })],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'framer-motion': ['framer-motion'],
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'framer-motion']
  }
})
