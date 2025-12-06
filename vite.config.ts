import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      'localhost:3000',
      '127.0.0.1',
      '0.0.0.0',
      'zsqd-frontend.onrender.com',
      'zsquared-frontend.onrender.com',
      '*.onrender.com',
    ],
  },
})