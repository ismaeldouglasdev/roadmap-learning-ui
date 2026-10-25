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
  build: {
    rollupOptions: {
      output: {
        // Separa vendor do código da app e o conteúdo estático do core.
        // O chunk de dados quase nunca muda entre deploys, então fica cacheado
        // por mais tempo que o bundle de lógica.
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('/src/data/')) return 'data';
          return undefined;
        },
      },
    },
  },
}));
