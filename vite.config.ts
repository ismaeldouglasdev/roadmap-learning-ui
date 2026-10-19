import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // GitHub Pages serve este projeto em /roadmap-learning-ui/; o dev server roda na raiz.
  base: mode === 'production' ? '/roadmap-learning-ui/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
}));
