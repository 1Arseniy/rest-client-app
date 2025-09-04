import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['app/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'app/**/*.test.{js,jsx,ts,tsx}',
        'app/**/*.spec.{js,jsx,ts,tsx}',
        'app/root.{js,jsx,ts,tsx}',
        'app/routes.{js,jsx,ts,tsx}',
        'app/lib/utils.ts',
        'app/setupTests.{js,ts}',
        'app/**/*.d.ts',
        '**/node_modules/**',
        '**/dist/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
});
