import { Page, TestInfo } from '@playwright/test';

// Where a journey step fails in the UI, takes a screenshot of the page as it was when it failed and attaches it to the
// step's test, named after the step and the page on screen, with a note of the page's address and the error. The
// pipeline's Allure report shows it under the step that failed and at the top of the scenario (see
// scripts/pipeline/merge-allure-scenarios.ts). A step that fails in an API call (CCD, the testing support endpoints,
// work allocation, payments and so on) gets none, as the page has nothing to do with the failure.
//
// The name every failure screenshot starts with, which merge-allure-scenarios.ts looks for
export const failureScreenshotName = 'Failure screenshot';

// The files that only call APIs. A failure whose first frame in playwright-tests is in one of these is an API failure;
// any other failure (a page, a button, a check on the page, or a step that ran out of time) is a UI failure.
const apiFiles = [
  /\/e2e\/flows\/events\/api\//,
  /\/helpers\/(CcdApiHelper|TestingEndPointHelper|WaTaskHelper|RoleAssignmentHelper|TokensHelper|PaymentHelper|FeesHelper|WireMockHelper|CaseUserRegistry|WorkingDayHelper)\.ts/,
];

export function isUiFailure(stack: string | undefined): boolean {
  const firstFrame = (stack ?? '').split('\n').find((line) => line.includes('/playwright-tests/') && !line.includes('node_modules'));
  if (firstFrame === undefined) {
    return true;
  }
  return !apiFiles.some((file) => file.test(firstFrame));
}

// stepName is the journey step's name, such as CREATE_CLAIM
export async function attachFailureScreenshot(page: Page, testInfo: TestInfo, stepName: string) {
  const failed = testInfo.status !== testInfo.expectedStatus && testInfo.status !== 'skipped';
  if (!failed || page.isClosed()) {
    return;
  }
  const error = testInfo.error;
  if (!isUiFailure(error?.stack)) {
    return;
  }

  // The page's heading names the screen the step was on, such as an event page or the case details
  const heading = (await page.locator('h1').first().textContent({ timeout: 2_000 }).catch(() => null))?.trim() ?? '';
  const testNumber = testInfo.titlePath.filter((title) => /^test\d+$/.test(title)).pop() ?? '';
  const where = [testNumber, stepName].filter(Boolean).join(' ');
  const name = `${failureScreenshotName}: ${where}${heading ? ` on "${heading}"` : ''}`;

  try {
    const screenshot = await page.screenshot({ fullPage: true, timeout: 15_000 });
    await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
  } catch (screenshotError) {
    console.warn(`Could not take the failure screenshot for ${where}: ${screenshotError}`);
    return;
  }
  // Playwright colours its error messages for the terminal, which the note leaves out
  const colourCodes = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');
  const firstErrorLine = (error?.message ?? '').replace(colourCodes, '').split('\n')[0];
  await testInfo.attach(`${failureScreenshotName} details: ${where}`, {
    body: `Step: ${where} (${testInfo.title})\nPage: ${heading || 'no heading'}\nAddress: ${page.url()}\nError: ${firstErrorLine}\n`,
    contentType: 'text/plain',
  });
  console.log(`${where} failed on ${heading ? `"${heading}"` : 'a page with no heading'} (${page.url()}): failure screenshot attached`);
}
