import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => ({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  publicDir: 'public'
}))