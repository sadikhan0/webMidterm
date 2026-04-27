import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/swapi': {
        target: 'https://swapi.info/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/swapi/, ''),
      },
    },
  },
})
