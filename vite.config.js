import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/wp-api': {
        target: 'https://identifine.com.ng/wp-json/wp/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-api/, '')
      }
    }
  }
});
