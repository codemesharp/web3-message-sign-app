import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run start:mock',
    port: 3000,
    timeout: 120_000,
    reuseExistingServer: false,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30_000,
    trace: 'on-first-retry',
  },
});
