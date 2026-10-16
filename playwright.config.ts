// Must stay first: loads the playwright-tests environment (ENV) before anything below reads process.env
import './playwright-tests/env.ts';
import { defineConfig, devices } from '@playwright/test';
import config from './playwright-e2e/config/config';
import {envUrl} from './playwright-tests/civilConfig.ts';
import os from 'node:os';

// Set once by the runner process and inherited by every worker, so the playwright-tests case unassignment
// teardown only processes cases recorded by this run (see playwright-tests/helpers/CaseUserRegistry.ts)
process.env.PLAYWRIGHT_RUN_ID ??= `${process.pid}-${Date.now()}`;

// How many playwright-tests scenarios run at the same time (WORKERS, default 1). It is a limit on our projects only, so
// the other suites are not affected. Each scenario's journey still runs in order on one worker.
const playwrightTestsWorkers = Number(process.env.WORKERS ?? 1);

export default defineConfig({
  // testDir: './playwright-e2e/tests',
  // globalTeardown: process.env.CI ? undefined : './playwright-e2e/global/teardown-local',
  // forbidOnly: !!process.env.CI,
  // fullyParallel: true,
 // retries: config.playwright.retries ?? 0,
  //workers: config.playwright.workers,
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
              Workers: process.env.PLAYWRIGHT_WORKERS,
              OS: os.platform(),
              Architecture: os.arch(),
              NodeVersion: process.version,
            },
          },
        ],
      ]
    : 'list',
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
   // headless: !config.playwright.showBrowserWindow,
    video: { mode: 'retain-on-failure' },
    screenshot: { mode: 'only-on-failure', fullPage: true },
    launchOptions: {
   //   slowMo: config.playwright.testSpeed?.slowMo,
    },
  },
  projects: [
    // Checks the settings, services and users the playwright-tests journeys need before anything else runs. As a
    // setup project it runs once per run, before any worker starts a test, however many workers or projects there are,
    // and is never retried (see preflight.setup.ts). Skip it with PREFLIGHT=false.
    {
      name: 'preflight',
      testDir: './playwright-tests/setup',
      testMatch: /preflight\.setup\.ts/,
    },
    {
      name: "authentication",
      dependencies: ['preflight'],
      testDir: "./playwright-tests/setup",
      use: {
        baseURL: envUrl,
        ...devices['Desktop Chrome'],
      },
      testMatch: /.*\auth.setup\.ts/,
      teardown: 'case-unassignment',
    },
    {
      name: 'case-unassignment',
      testDir: './playwright-tests/setup',
      testMatch: /caseUnassignment\.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1929, height: 959 },
        launchOptions: {
          //slowMo: 1000,
        },
      },
      dependencies: ["authentication"],
      testDir: './playwright-tests/e2e/journeys',
      workers: playwrightTestsWorkers,
    },
    // The pipeline's unspecified journeys, run with SCENARIOS=Yes. Each project runs the scenarios with its tag (see
    // playwright-tests/scenarios/unspecifiedScenarios.ts), headless in the bundled Chromium.
    ...['pr', 'master', 'nightly'].map((pipeline) => ({
      name: `unspec-${pipeline}`,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1929, height: 959 },
      },
      dependencies: ['authentication'],
      testDir: './playwright-tests/e2e/journeys',
      grep: new RegExp(`@unspec-${pipeline}\\b`),
      workers: playwrightTestsWorkers,
    })),
    {
      name: 'data-setup',
      testMatch: '**playwright-e2e/tests/bootstrap/data/**.setup.ts',
      retries: 0,
    },
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
      name: 'case-role-assignment-teardown',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**playwright-e2e/tests/bootstrap/case-role-assignment/**.teardown.ts',
    },
    {
      name: 'e2e-full-functional',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['data-setup', 'users-auth-setup'],
      teardown: 'case-role-assignment-teardown',
    },
  ],
});
