import { defineConfig, devices } from '@playwright/test';
import config from './playwright-e2e/config/config';

export default defineConfig({
  testDir: './playwright-e2e/tests',
  globalTeardown: process.env.CI ? undefined : './playwright-e2e/global/teardown-local',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: 5,
  reporter: process.env.CI ? 'html' : 'list',
  timeout: 360_000,
  expect: {
    timeout: 30_000,
    toPass: {
      timeout: config.playwright.toPassTimeout,
    },
  },
  use: {
    actionTimeout: config.playwright.actionTimeout,
    headless: !config.playwright.showBrowserWindow,
    video: { mode: 'retain-on-failure' },
    screenshot: { mode: 'only-on-failure', fullPage: true },
    launchOptions: {
      slowMo: process.env.CI ? 200 : 500,
    },
  },
  projects: [
    {
      name: 'full-functional',
      use: { ...devices['Desktop Chrome'] },
      
    },
  ],
});
