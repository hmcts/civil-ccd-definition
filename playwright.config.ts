import { defineConfig, devices } from '@playwright/test';
import config from './playwright-e2e/config/config';
import os from 'node:os';

export default defineConfig({
  testDir: './playwright-e2e/tests',
  globalTeardown: process.env.CI ? undefined : './playwright-e2e/global/teardown-local',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: 5,
  reporter: process.env.CI
    ? 'html'
    : 'list',
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
      name: 'users-setup',
      testMatch: '**playwright/tests/bootstrap/users/**.setup.ts',
      teardown: 'users-teardown',
      retries: 0,
    },
    {
      name: 'users-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.setup.ts',
      dependencies: ['users-setup'],
      teardown: 'users-auth-teardown',
    },
    {
      name: 'users-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright/tests/bootstrap/auth/**.teardown.ts',
    },
    {
      name: 'users-teardown',
      testMatch: '**playwright/tests/bootstrap/users/**.teardown.ts',
      retries: 0,
    },
    {
      name: 'chrome-full-functional',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'firefox-full-functional',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'edge-full-functional',
      use: { ...devices['Desktop Edge'] },
      dependencies: ['users-auth-setup'],
    },
    {
      name: 'safari-full-functional',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['users-auth-setup'],
      timeout: 432_000 
    },
  ],
});