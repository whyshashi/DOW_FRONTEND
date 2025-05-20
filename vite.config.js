import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // Ensure correct aliasing
    }
  },
  build: {
    minify: false, // Disable minification for debugging
    assetsInlineLimit: 0, // Avoids inline asset size issues
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'EMPTY_BUNDLE') return; // Ignore empty bundle warning
        warn(warning);
      }
    }
  }
});
