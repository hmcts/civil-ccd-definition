import { defineConfig, devices } from '@playwright/test';
import config from './playwright-e2e/config/config';
import os from 'node:os';

export default defineConfig({
  testDir: './playwright-e2e/tests',
  globalTeardown: process.env.CI ? undefined : './playwright-e2e/global/teardown',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: config.playwright.workers,
  reporter: process.env.CI
    ? [
        [
          'allure-playwright',
          {
            outputFolder:
              process.env.FUNCTIONAL === 'true'
                ? 'playwright-allure-functional-results'
                : 'playwright-allure-bootstrap-results',
            environmentInfo: {
              Environment: config.environment,
              Workers: process.env.WORKERS,
              OS: os.platform(),
              Architecture: os.arch(),
              NodeVersion: process.version,
            },
          },
        ],
      ]
    : 'list',
  timeout: 360_000,
  expect: {
    timeout: 30_000,
    toPass: {
      timeout: config.playwright.toPassTimeout,
    },
  },
  outputDir: './playwright-test-results',
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
      name: 'users-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/users/**.setup.ts',
      retries: 0,
    },
    {
      name: 'users-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/auth/**.setup.ts',
      dependencies: ['users-setup'],
      teardown: 'users-auth-teardown',
    },
    {
      name: 'users-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/auth/**.teardown.ts',
    },
    {
      name: 'full-functional',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['users-auth-setup'],
    },
  ],
});
