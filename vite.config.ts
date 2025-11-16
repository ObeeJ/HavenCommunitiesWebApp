import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to handle Figma asset imports
const figmaAssetPlugin = {
  name: 'figma-asset',
  resolveId(id) {
    if (id.startsWith('figma:asset/')) {
      return id;
    }
  },
  load(id) {
    if (id.startsWith('figma:asset/')) {
      // Return a placeholder image for development
      return `export default "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3C/svg%3E";`;
    }
  }
};

export default defineConfig({
  plugins: [figmaAssetPlugin, react()],
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [/^figma:asset\//],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
})