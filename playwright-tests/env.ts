import * as dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

// Loads the settings for the environment named in ENV (aat, demo, ithc or preview), secrets included, from
// playwright-tests/env/.env.<ENV>. That file is the framework's only source of settings; it is git-ignored, as it holds
// secrets:
//
//   ENV=aat yarn test:UNSPEC_1v1_FAST
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8327 yarn test:UNSPEC_1v1_FAST
//   ENV=preview PREVIEW_SERVICE=webapp PR_NUMBER=5365 yarn test:UNSPEC_1v1_FAST   (an XUI webapp PR, see below)
//
// What is already set in the shell (or by Jenkins) wins over the environment file.
// Without ENV nothing is loaded here, so runs that set the variables themselves, and the pipelines, work as before.
// Imported first in playwright.config.ts, so it runs before anything reads process.env.

const environments = ['aat', 'demo', 'ithc', 'preview'];
const previewServices = ['ccd', 'citizen-ui', 'service', 'webapp'];
const required = [
  'URL',
  'IDAM_API_URL',
  'SERVICE_AUTH_PROVIDER_API_BASE_URL',
  'CIVIL_SERVICE_URL',
  'DEFAULT_PASSWORD',
  'JUDGE_DEFAULT_PASSWORD',
  'S2S_SECRET',
];

const rootDir = path.resolve(__dirname, '..');

function readEnvFile(file: string): Record<string, string> {
  if (!fs.existsSync(file)) {
    return {};
  }
  return dotenv.parse(fs.readFileSync(file));
}

// Fills in ${NAME} from what has been set so far, for the preview file's PREVIEW_SERVICE and PR_NUMBER
function substitute(value: string, file: string, key: string): string {
  return value.replace(/\$\{([A-Z_0-9]+)\}/g, (_match, name: string) => {
    const replacement = process.env[name];
    if (!replacement) {
      throw new Error(`playwright-tests: ${key} in ${path.relative(rootDir, file)} needs ${name} to be set`);
    }
    return replacement;
  });
}

// A preview of XUI itself (an rpx-xui-webapp PR, PREVIEW_SERVICE=webapp) is only XUI: everything behind it is AAT, so
// apart from XUI's address its settings are AAT's. The secrets and run settings still come from env/.env.preview.
function webappPreviewSettings(prNumber: string): Record<string, string> {
  return {
    ENVIRONMENT: 'aat',
    URL: `https://xui-webapp-pr-${prNumber}.preview.platform.hmcts.net`,
    CCD_DATA_STORE_URL: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal',
    CIVIL_SERVICE_URL: 'http://civil-service-aat.service.core-compute-aat.internal',
    AAC_API_URL: 'http://aac-manage-case-assignment-aat.service.core-compute-aat.internal',
    CAMUNDA_URL: 'http://camunda-api-aat.service.core-compute-aat.internal/engine-rest',
    WA_TASK_MONITOR_URL: 'http://wa-task-monitor-aat.service.core-compute-aat.internal',
  };
}

function loadEnv(envName: string) {
  if (envName === 'preview' && !previewServices.includes(process.env.PREVIEW_SERVICE ?? '')) {
    throw new Error(`playwright-tests: ENV=preview needs PREVIEW_SERVICE set to one of ${previewServices.join(', ')}, and PR_NUMBER`);
  }

  const envFile = path.join(__dirname, 'env', `.env.${envName}`);
  const fromShell = new Set(Object.keys(process.env));
  const overridden: string[] = [];

  for (const [key, value] of Object.entries(readEnvFile(envFile))) {
    const fileValue = substitute(value, envFile, key);
    if (!fromShell.has(key)) {
      process.env[key] = fileValue;
    } else if (process.env[key] !== fileValue) {
      overridden.push(key);
    }
  }

  if (envName === 'preview' && process.env.PREVIEW_SERVICE === 'webapp') {
    for (const [key, value] of Object.entries(webappPreviewSettings(process.env.PR_NUMBER ?? ''))) {
      if (!fromShell.has(key)) {
        process.env[key] = value;
      }
    }
  }

  // civil-service's preview address depends on the repo the preview belongs to (see env/.env.preview)
  if (envName === 'preview' && process.env.PREVIEW_SERVICE !== 'webapp' && !fromShell.has('CIVIL_SERVICE_URL')) {
    const service = process.env.PREVIEW_SERVICE;
    const host = service === 'citizen-ui'
      ? `civil-${service}-pr-${process.env.PR_NUMBER}-civil-service`
      : `civil-${service}-pr-${process.env.PR_NUMBER}`;
    process.env.CIVIL_SERVICE_URL = `https://${host}.preview.platform.hmcts.net`;
  }

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`playwright-tests: ENV=${envName} is missing ${missing.join(', ')} (add them to playwright-tests/env/.env.${envName})`);
  }

  // Playwright loads the config again in each worker, so this is only reported once, by the runner
  if (process.env.TEST_WORKER_INDEX === undefined) {
    console.log(`playwright-tests: ${envName} (${process.env.URL})`);
    if (overridden.length > 0) {
      console.log(`playwright-tests: the shell's values were used for ${overridden.join(', ')}, not those in env/.env.${envName}`);
    }
  }
}

// ENV is also a standard shell variable (the sh start-up file), so a value that is not one of ours is reported and
// ignored, not treated as an error: playwright.config.ts is shared with the other Playwright suites
const envName = process.env.ENV;
// Whether this run is a playwright-tests run, with one of our environments loaded
export const playwrightTestsEnvLoaded = Boolean(envName && environments.includes(envName));
if (envName && environments.includes(envName)) {
  loadEnv(envName);
} else if (envName && process.env.TEST_WORKER_INDEX === undefined) {
  console.log(`playwright-tests: ENV=${envName} is not one of ${environments.join(', ')}, so no environment file was loaded`);
}
