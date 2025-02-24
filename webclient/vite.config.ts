import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



export default defineConfig({
  plugins: [react()],
  server: {

  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
} satisfies UserConfig);