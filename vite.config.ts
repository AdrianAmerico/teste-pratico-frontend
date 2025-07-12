/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@types': '/src/@types',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/global-setup.ts'],
    exclude: ['**/node_modules/**', '*/__test__/*', 'dist'],
    coverage: {
      all: true,
      exclude: [
        '**/node_modules/**',
        '*/__test__/*',
        'dist',
        'commitlint.config.cjs',
        'vite.config.ts',
        '/src/main.tsx',
        'vite-env.d.ts',
        '**/*.d.ts',
        'src/main.tsx',
        'src/@types/*',
        '**/index.ts',
        'src/pages/auth/**',
        'vitest.config.ts',
        'eslint.config.js',
      ],
    },
  },
});
