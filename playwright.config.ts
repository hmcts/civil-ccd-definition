/* eslint-disable @typescript-eslint/no-require-imports */
import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// civil-service, civil-wa-task-configuration and civil-camunda-bpmn-definition copy this file into their own pipelines
// with playwright-e2e, but without playwright-tests. Where playwright-tests is missing, nothing of it is loaded and the
// config is the playwright-e2e one, exactly as before playwright-tests was added: keep it that way when changing this
// file.
const playwrightTestsPresent = fs.existsSync(path.join(__dirname, 'playwright-tests'));

// Must stay first: loads the playwright-tests environment (ENV) before anything below reads process.env
const playwrightTestsEnvLoaded: boolean = playwrightTestsPresent
  ? require('./playwright-tests/env.ts').playwrightTestsEnvLoaded
  : false;
const envUrl: string | undefined = playwrightTestsPresent ? require('./playwright-tests/civilConfig.ts').envUrl : undefined;

// Set once by the runner process and inherited by every worker, so the playwright-tests case unassignment
// teardown only processes cases recorded by this run (see playwright-tests/helpers/CaseUserRegistry.ts)
if (playwrightTestsPresent) {
  process.env.PLAYWRIGHT_RUN_ID ??= `${process.pid}-${Date.now()}`;
}

// Where traces, videos and screenshots go. Locally each run has its own folder, named after its run ID, so a run
// started while another is going does not wipe the other's results; the newest RESULTS_RUNS_TO_KEEP finished runs
// (default 10) are kept. On CI (one run per build, and the reports come from Allure) it is a single folder of its own,
// as Playwright empties it at the start of a run and the playwright-e2e projects' folders are next to it.
// The playwright-e2e projects set their own folders. Without playwright-tests it is the playwright-e2e folder.
const resultsRoot = './playwright-test-results';
let outputDir = resultsRoot;
if (playwrightTestsPresent) {
  outputDir = process.env.CI ? `${resultsRoot}/journeys` : `${resultsRoot}/${process.env.PLAYWRIGHT_RUN_ID}`;
  if (!process.env.CI && process.env.TEST_WORKER_INDEX === undefined) {
    require('./playwright-tests/helpers/RunHelper.ts').pruneOldRunResults(resultsRoot, Number(process.env.RESULTS_RUNS_TO_KEEP ?? 10));
  }
}

// How many playwright-tests scenarios run at the same time (WORKERS, default 1). It is a limit on our projects only, so
// the other suites are not affected. Each scenario's journey still runs in order on one worker.
const playwrightTestsWorkers = Number(process.env.WORKERS ?? 1);

// Settings the playwright-tests projects use whatever the playwright-e2e settings below are (PLAYWRIGHT_RETRIES,
// PLAYWRIGHT_SHOW_BROWSER_WINDOW and PLAYWRIGHT_TEST_SPEED): a journey's tests depend on each other, so they are never
// retried or run fully in parallel, and they run headless (use --headed to watch) at full speed.
const playwrightTestsProject = { retries: 0, fullyParallel: false };
const playwrightTestsUse = { headless: true, launchOptions: {} };
// The journeys take their own screenshot where a step fails in the UI, named after the step and the page it failed on,
// and none where it fails in an API call (playwright-tests/helpers/FailureScreenshotHelper.ts), in place of Playwright's
const journeyScreenshots = { screenshot: 'off' as const };

// The settings of playwright-e2e, which is kept for reference. Loading them also loads .env.tests.local, so a
// playwright-tests run (ENV=aat|demo|ithc|preview) does not load them: it only uses playwright-tests/env/.env.<ENV>,
// and only the playwright-tests projects are defined.
const config = playwrightTestsEnvLoaded ? undefined : require('./playwright-e2e/config/config').default;

export default defineConfig({
  testDir: './playwright-e2e/tests',
  // playwright-e2e's local clean-up (it deletes the citizen users that suite creates, and its cached sessions) is left
  // out of playwright-tests runs (ENV=aat|demo|ithc|preview), which have their own teardown
  globalTeardown: process.env.CI || playwrightTestsEnvLoaded ? undefined : './playwright-e2e/global/teardown-local',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: config?.playwright.retries ?? 0,
  // At least WORKERS, so PLAYWRIGHT_WORKERS (for the playwright-e2e suites) does not hold our projects back. Without
  // playwright-tests, PLAYWRIGHT_WORKERS as it is.
  workers: !config ? playwrightTestsWorkers
    : !playwrightTestsPresent ? config.playwright.workers
      : Number.isNaN(config.playwright.workers) ? undefined : Math.max(config.playwright.workers, playwrightTestsWorkers),
  reporter: getReporter(),
  timeout: 1_200_000,
  expect: {
    timeout: 60_000,
    toPass: {
      timeout: config ? config.playwright.toPassTimeout : 25_000,
    },
  },
  outputDir,
  use: {
    actionTimeout: config ? config.playwright.actionTimeout : 25_000,
    headless: !config?.playwright.showBrowserWindow,
    video: { mode: 'retain-on-failure' },
    screenshot: { mode: 'only-on-failure', fullPage: true },
    launchOptions: {
      slowMo: config?.playwright.testSpeed?.slowMo,
    },
  },
  projects: [
    ...(playwrightTestsPresent ? playwrightTestsProjects() : []),
    ...(config ? playwrightE2eProjects(config) : []),
  ],
});

// The playwright-tests projects, only defined where playwright-tests is present
function playwrightTestsProjects() {
  return [
    // Checks the settings, services and users the playwright-tests journeys need before anything else runs. As a
    // setup project it runs once per run, before any worker starts a test, however many workers or projects there are,
    // and is never retried (see preflight.setup.ts). Skip it with PREFLIGHT=false.
    {
      name: 'preflight',
      testDir: './playwright-tests/setup',
      testMatch: /preflight\.setup\.ts/,
      ...playwrightTestsProject,
    },
    {
      name: "authentication",
      dependencies: ['preflight'],
      testDir: "./playwright-tests/setup",
      use: {
        baseURL: envUrl,
        ...devices['Desktop Chrome'],
        ...playwrightTestsUse,
      },
      testMatch: /.*\auth.setup\.ts/,
      teardown: 'case-unassignment',
      ...playwrightTestsProject,
    },
    {
      name: 'case-unassignment',
      testDir: './playwright-tests/setup',
      testMatch: /caseUnassignment\.teardown\.ts/,
      ...playwrightTestsProject,
    },
    // The bundled Chromium, as the pipeline projects below use. The installed Google Chrome (channel: 'chrome') is not
    // used: when it has an update waiting it starts crashpad and GoogleUpdater, which outlive it holding its stderr, so
    // browser.close never finishes and the worker is killed 5 minutes after its tests pass.
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...playwrightTestsUse,
        viewport: { width: 1929, height: 959 },
        ...journeyScreenshots,
      },
      dependencies: ["authentication"],
      testDir: './playwright-tests/e2e/journeys',
      workers: playwrightTestsWorkers,
      ...playwrightTestsProject,
    },
    // The pipeline's journeys, run with SCENARIOS=Yes. Each project runs the scenarios with its tag (see
    // playwright-tests/scenarios), headless in the bundled Chromium: unspec-pr, unspec-master and unspec-nightly run
    // the unspecified journeys, spec-smoke, spec-pr, spec-master and spec-nightly the specified ones.
    // playwright-tests/scripts/pipeline/run-journeys.sh runs them on the pipelines.
    ...[
      ...['pr', 'master', 'nightly'].map((pipeline) => `unspec-${pipeline}`),
      ...['smoke', 'pr', 'master', 'nightly'].map((pipeline) => `spec-${pipeline}`),
    ].map((name) => ({
      name,
      use: {
        ...devices['Desktop Chrome'],
        ...playwrightTestsUse,
        viewport: { width: 1929, height: 959 },
        ...journeyScreenshots,
      },
      dependencies: ['authentication'],
      testDir: './playwright-tests/e2e/journeys',
      grep: new RegExp(`@${name}\\b`),
      workers: playwrightTestsWorkers,
      ...playwrightTestsProject,
    })),
  ];
}

// The playwright-e2e projects, only defined when its settings are loaded
function playwrightE2eProjects(config) {
  return [
      {
        name: 'data-setup',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/data-setup`,
        testMatch: '**playwright-e2e/tests/bootstrap/data/**.setup.ts',
        retries: 0,
      },
      {
        name: 'exui-users-data-setup',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/exui-users-data-setup`,
        testMatch: '**playwright-e2e/tests/bootstrap/users-data/exui-users-data.setup.ts',
        retries: 0,
      },
      {
        name: 'cui-users-setup',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/cui-users-setup`,
        testMatch: '**playwright-e2e/tests/bootstrap/users/cui-users.setup.ts',
        dependencies: ['exui-users-data-setup'],
        teardown: 'cui-users-teardown',
        retries: 0,
      },
      {
        name: 'cui-users-data-setup',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/cui-users-data-setup`,
        testMatch: '**playwright-e2e/tests/bootstrap/users-data/cui-users-data.setup.ts',
        dependencies: ['cui-users-setup'],
        retries: 0,
      },
      {
        name: 'exui-users-auth-setup',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/exui-users-auth-setup`,
        use: { ...devices['Desktop Chrome'] },
        testMatch: '**playwright-e2e/tests/bootstrap/auth/exui-users-auth.setup.ts',
        dependencies: ['exui-users-data-setup'],
      },
      {
        name: 'cui-users-teardown',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/cui-users-teardown`,
        testMatch: '**playwright-e2e/tests/bootstrap/users/cui-users.teardown.ts',
        retries: 0,
      },
      {
        name: 'case-role-assignment-teardown',
        outputDir: `${config.playwright.bootstrapTestResultsDir}/case-role-assignment-teardown`,
        use: { ...devices['Desktop Chrome'] },
        testMatch: '**playwright-e2e/tests/bootstrap/case-role-assignment/**.teardown.ts',
      },
      {
        name: 'civil-ccd-master-pr-smoke',
        outputDir: config.playwright.smokeTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-auth-setup', 'cui-users-data-setup'],
        grep: /@civil-ccd-master-pr-smoke/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-ccd-pr',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-auth-setup', 'cui-users-data-setup'],
        grep: process.env.PLAYWRIGHT_PR_FT_GROUPS ? undefined : /@civil-ccd-pr/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-ccd-master',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-auth-setup', 'cui-users-data-setup'],
        grep: /@civil-ccd-master/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-ccd-nightly-smoke',
        outputDir: config.playwright.smokeTestResultsDir,
        dependencies: ['data-setup', 'exui-users-auth-setup', 'cui-users-data-setup'],
        use: { ...devices['Desktop Chrome'] },
        grep: /@civil-ccd-master-pr-smoke/,
        teardown: 'case-role-assignment-teardown',
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
        name: 'civil-service-master-pr-smoke',
        outputDir: config.playwright.smokeTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: /@civil-service-master-pr-smoke/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-service-pr',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: process.env.PLAYWRIGHT_PR_FT_GROUPS ? undefined : /@civil-service-pr/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-service-master',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: /@civil-service-master/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-service-nightly-smoke',
        outputDir: config.playwright.smokeTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: /@civil-service-nightly-smoke/,
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
        name: 'civil-wa-master-pr-smoke',
        outputDir: config.playwright.smokeTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: /@civil-wa-master-pr-smoke/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-wa-pr',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: process.env.PLAYWRIGHT_PR_FT_GROUPS ? undefined : /@civil-wa-pr/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'civil-wa-master',
        outputDir: config.playwright.functionalTestResultsDir,
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        grep: /@civil-wa-master/,
        teardown: 'case-role-assignment-teardown',
      },
      {
        name: 'functional-tests',
        use: { ...devices['Desktop Chrome'] },
        dependencies: ['data-setup', 'exui-users-data-setup', 'cui-users-data-setup'],
        teardown: 'case-role-assignment-teardown',
      },
  ];
}

function getReporter(): any {
  const allurePlaywright = (outputFolder: string) => [
    'allure-playwright',
    {
      outputFolder: outputFolder,
      environmentInfo: {
        Environment: config ? config.environment : process.env.ENVIRONMENT,
        Workers: process.env.PLAYWRIGHT_WORKERS,
        OS: os.platform(),
        Architecture: os.arch(),
        NodeVersion: process.version,
        ftGroups: process.env.PLAYWRIGHT_PR_FT_GROUPS
          ? process.env.PLAYWRIGHT_PR_FT_GROUPS
          : 'None',
        gitCommit: process.env.GIT_COMMIT ? process.env.GIT_COMMIT : 'None',
      },
      detail: false,
    },
  ];

  const failedAndNotExecutedTestFilesReporter = [
    './playwright-e2e/report/failed-and-not-executed-test-files-reporter.ts',
  ];
  const junitReporter = process.env.PLAYWRIGHT_JUNIT_OUTPUT_FILE
    ? [['junit', { outputFile: process.env.PLAYWRIGHT_JUNIT_OUTPUT_FILE }]]
    : [];

  // A pipeline run of the playwright-tests journeys (playwright-tests/scripts/pipeline/run-journeys.sh): an Allure
  // report of its own, so it does not mix with the playwright-e2e one when both run in a build, a JSON report the
  // script reads the failed scenarios from, and each test's result in the build log
  if (process.env.CI && process.env.PLAYWRIGHT_JOURNEYS_JSON_REPORT) {
    return [
      allurePlaywright('playwright-allure-journeys-results'),
      ['json', { outputFile: process.env.PLAYWRIGHT_JOURNEYS_JSON_REPORT }],
      ['list'],
      ...junitReporter,
    ];
  }
  if (process.env.CI && process.env.PLAYWRIGHT_FUNCTIONAL) {
    return [
      allurePlaywright('playwright-allure-functional-results'),
      failedAndNotExecutedTestFilesReporter,
      ...junitReporter,
    ];
  } else if (process.env.CI && process.env.PLAYWRIGHT_SMOKE) {
    return [allurePlaywright('playwright-allure-functional-results'), ...junitReporter];
  } else if (process.env.CI) {
    return [allurePlaywright('playwright-allure-bootstrap-results'), ...junitReporter];
  }
  return 'list';
}
