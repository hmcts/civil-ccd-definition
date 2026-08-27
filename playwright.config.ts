import { defineConfig, devices } from '@playwright/test';
import config from './playwright-e2e/config/config';
import os from 'node:os';

export default defineConfig({
  testDir: './playwright-e2e/tests',
  globalTeardown: process.env.CI ? undefined : './playwright-e2e/global/teardown-local',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: config.playwright.retries ?? 0,
  workers: config.playwright.workers,
  reporter: getReporter(),
  timeout: 1_200_000,
  expect: {
    timeout: 60_000,
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
      slowMo: config.playwright.testSpeed?.slowMo,
    },
  },
  projects: [
    {
      name: 'data-setup',
      outputDir: './playwright-bootstrap-test-results/data-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/data/**.setup.ts',
      retries: 0,
    },
    {
      name: 'exui-users-data-setup',
      outputDir: './playwright-bootstrap-test-results/exui-users-data-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/users-data/exui-users-data.setup.ts',
      retries: 0,
    },
    {
      name: 'cui-users-setup',
      outputDir: './playwright-bootstrap-test-results/cui-users-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/users/cui-users.setup.ts',
      dependencies: ['exui-users-data-setup'],
      teardown: 'cui-users-teardown',
      retries: 0,
    },
    {
      name: 'cui-users-data-setup',
      outputDir: './playwright-bootstrap-test-results/cui-users-data-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/users-data/cui-users-data.setup.ts',
      dependencies: ['cui-users-setup'],
      retries: 0,
    },
    {
      name: 'exui-users-auth-setup',
      outputDir: './playwright-bootstrap-test-results/exui-users-auth-setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/auth/exui-users-auth.setup.ts',
      dependencies: ['exui-users-data-setup'],
      teardown: 'exui-users-auth-teardown',
    },
    {
      name: 'cui-users-teardown',
      outputDir: './playwright-bootstrap-test-results/cui-users-teardown',
      testMatch: '**playwright-e2e/tests/bootstrap/users/cui-users.teardown.ts',
      retries: 0,
    },
    {
      name: 'exui-users-auth-teardown',
      outputDir: './playwright-bootstrap-test-results/exui-users-auth-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/auth/exui-users-auth.teardown.ts',
    },
    {
      name: 'case-role-assignment-teardown',
      outputDir: './playwright-bootstrap-test-results/case-role-assignment-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/case-role-assignment/**.teardown.ts',
    },
    {
      name: 'civil-ccd-nightly',
      outputDir: config.playwright.functionalTestResultsDir,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['data-setup', 'exui-users-auth-setup', 'cui-users-data-setup'],
      grep: /@civil-ccd-nightly/,
      teardown: 'case-role-assignment-teardown',
    },
    {
      name: 'civil-service-nightly',
      outputDir: config.playwright.functionalTestResultsDir,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
      grep: /@civil-service-nightly/,
      teardown: 'case-role-assignment-teardown',
    },
    {
      name: 'debug',
      outputDir: `${config.playwright.functionalTestResultsDir}/debug`,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
      grep: /@debug/,
    },
  ],
});

function getReporter(): any {
  const allurePlaywright = (outputFolder: string) => [
    'allure-playwright',
    {
      outputFolder: outputFolder,
      environmentInfo: {
        Environment: config.environment,
        Workers: process.env.PLAYWRIGHT_WORKERS,
        OS: os.platform(),
        Architecture: os.arch(),
        NodeVersion: process.version,
      },
      detail: false,
    },
  ];

  const failedAndNotExecutedTestFilesReporter = ['./playwright-e2e/report/failed-and-not-executed-test-files-reporter.ts'];
  
  if (process.env.CI && process.env.PLAYWRIGHT_FUNCTIONAL) {
    return [
      allurePlaywright('playwright-allure-functional-results'),
      failedAndNotExecutedTestFilesReporter,
    ];
  } else if (process.env.CI)  {
    return [allurePlaywright('playwright-allure-bootstrap-results')];
  }
  return 'list';
}
