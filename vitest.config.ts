import { defineConfig } from 'vitest/config';


export default defineConfig({
  plugins: [],
  test: {
    environment: 'node',
    globals: true,
    setupFiles: [],
    globalSetup: [],
    include: ['src/**/__tests__/**/*.test.ts?(x)', 'src/**/?(*.)+(test).ts?(x)'],
    exclude: ['**/node_modules/**', '**/__tests__/setup/**/*'],
    environmentOptions: {
      env: {
        NODE_ENV: 'test'
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'src/test/']
    },
    root: '.',
    resolveSnapshotPath: (testPath, snapExtension) => 
      testPath.replace(/\.test\.([tj]sx?)$/, `.test${snapExtension}.$1`),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    conditions: ['import', 'node'],
    mainFields: ['module', 'main']
  }
}); 