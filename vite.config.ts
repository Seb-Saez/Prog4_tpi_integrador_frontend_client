import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath,URL} from 'url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
    server: {
    // Add the specific hostnames you want to allow
    allowedHosts: ['823a-191-81-176-225.ngrok-free.app', 'aa96-191-81-176-225.ngrok-free.app', 'localhost'],
  }

})
