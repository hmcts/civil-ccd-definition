import {test as setup, expect, test, Page, request} from "@playwright/test";
import {
  claimantSolicitorCredentials,
  envUrl, respondent1SolicitorCredentials, respondent2SolicitorCredentials,
} from '../civilConfig.ts';
import {IdamPage} from '../e2e/page-objects/pages/idam.po';
import claimTypes from '../enums/claim-types.ts';
import { SessionUtils } from '../e2e/utils/session.utils.ts';
import { judgeClaimTypes, respondent2ClaimTypes, runClaimType, sessionUsers, sessionUsersForRun, signedInToXui } from '../helpers/SessionHelper.ts';

const claimType: claimTypes = runClaimType;
// Match the heading by role rather than DOM position, as XUI versions wrap it differently
const caseListHeading = (page: Page) => page.getByRole('heading', { level: 1, name: 'Case list' });
const claimantSolicitorAuthFile = sessionUsers.claimantSolicitor.authFile;
const respondent1SolicitorAuthFile = sessionUsers.respondent1Solicitor.authFile;
const respondent2SolicitorAuthFile = sessionUsers.respondent2Solicitor.authFile;
const judgeAuthFile = sessionUsers.judge.authFile;
const hearingCentreAdminAuthFile = sessionUsers.hearingCentreAdmin.authFile;
const authCookieName = "__auth__";
const tokenValidityBufferSeconds = 60 * 60;

let idamPage: IdamPage;

test.beforeEach(async ({ page }) => {
    idamPage = new IdamPage(page);
});

// The token in a saved session can look unexpired while XUI has already dropped the session,
// so only reuse it if XUI still accepts the saved cookies. This asks XUI's user details API
// (200 when the session is accepted, 401 when not) rather than loading the case list page.
async function isSavedSessionAccepted(authFile: string): Promise<boolean> {
  if (!SessionUtils.isSessionValid(authFile, authCookieName, tokenValidityBufferSeconds)) {
    return false;
  }

  const apiContext = await request.newContext({ baseURL: envUrl, storageState: authFile });
  try {
    const response = await apiContext.get('/api/user/details', { maxRedirects: 0, timeout: 15000 });
    if (!response.ok()) {
      console.log(`Saved session in ${authFile} is no longer accepted by XUI (status ${response.status()}). Logging in again.`);
    }
    return response.ok();
  } catch (error) {
    console.log(`Could not check saved session in ${authFile}: ${error instanceof Error ? error.message : error}. Logging in again.`);
    return false;
  } finally {
    await apiContext.dispose();
  }
}

  setup("Authenticate Claimant Solicitor", async ({ page }) => {
    setup.skip(await isSavedSessionAccepted(claimantSolicitorAuthFile), "Reusing existing valid session");
    await page.goto(envUrl);
    await idamPage.login(claimantSolicitorCredentials);
    await expect(caseListHeading(page)).toBeVisible();
    await page.context().storageState({ path: claimantSolicitorAuthFile });
  });

  setup("Authenticate Respondent1 Solicitor", async ({ page }) => {
    setup.skip(await isSavedSessionAccepted(respondent1SolicitorAuthFile), "Reusing existing valid session");
    await page.goto(envUrl);
    await idamPage.login(respondent1SolicitorCredentials);
    await expect(caseListHeading(page)).toBeVisible();
    await page.context().storageState({ path: respondent1SolicitorAuthFile });
  });

  if (respondent2ClaimTypes.includes(claimType)) {
    setup("Authenticate Respondent2 Solicitor", async ({ page }) => {
      setup.skip(await isSavedSessionAccepted(respondent2SolicitorAuthFile), "Reusing existing valid session");
      await page.goto(envUrl);
      await idamPage.login(respondent2SolicitorCredentials);
      await expect(caseListHeading(page)).toBeVisible();
      await page.context().storageState({ path: respondent2SolicitorAuthFile });
    });
  }

  if (judgeClaimTypes.includes(claimType)) {
    setup("Authenticate Judge", async ({ page }) => {
      setup.skip(await isSavedSessionAccepted(judgeAuthFile), "Reusing existing valid session");
      await page.goto(envUrl);
      await idamPage.login(sessionUsers.judge.credentials);
      // Judges land on their work list rather than the case list
      await expect(signedInToXui(page)).toBeVisible();
      await page.context().storageState({ path: judgeAuthFile });
    });
  }

  // Also needed for any claim type when the journey adds a case note (ADD_CASE_NOTE=true)
  if (sessionUsersForRun().includes('hearingCentreAdmin')) {
    setup("Authenticate Hearing Centre Admin", async ({ page }) => {
      setup.skip(await isSavedSessionAccepted(hearingCentreAdminAuthFile), "Reusing existing valid session");
      await page.goto(envUrl);
      await idamPage.login(sessionUsers.hearingCentreAdmin.credentials);
      // Court staff land on their work list rather than the case list
      await expect(signedInToXui(page)).toBeVisible();
      await page.context().storageState({ path: hearingCentreAdminAuthFile });
    });
  }
