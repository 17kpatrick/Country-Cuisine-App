import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.js'],
    environment: 'node',
    include: ['tests/**/*.test.js'],
    globals: true
  }
});
