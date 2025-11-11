import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    sourcemap: true,
  },
});
