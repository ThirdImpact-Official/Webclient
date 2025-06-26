import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
} satisfies UserConfig);