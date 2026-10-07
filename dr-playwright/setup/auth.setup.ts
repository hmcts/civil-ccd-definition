import {test as setup, expect, test, Page} from "@playwright/test";
import {
  claimantSolicitorCredentials,
  envUrl, respondent1SolicitorCredentials, respondent2SolicitorCredentials,
} from '../civilConfig.ts';
import {IdamPage} from '../e2e/page-objects/pages/idam.po';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import claimTypes from '../enums/claim-types.ts';
import { SessionUtils } from '../e2e/utils/session.utils.ts';

const env = cleanEnv({
  CLAIM_TYPE: enums({
    values: [claimTypes.ONE_VS_ONE_LIP, claimTypes.TWO_VS_ONE_LIP, claimTypes.ONE_VS_TWO_LIPS, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL] as const,
    default: claimTypes.ONE_VS_ONE,
  }),
});
const claimType: claimTypes = env.CLAIM_TYPE;
// Match the heading by role rather than DOM position, as XUI versions wrap it differently
const caseListHeading = (page: Page) => page.getByRole('heading', { level: 1, name: 'Case list' });
const claimantSolicitorAuthFile = "./dr-playwright/e2e/.auth/ClaimantSolicitorUser.json";
const respondent1SolicitorAuthFile = "./dr-playwright/e2e/.auth/Respondent1SolicitorUser.json";
const respondent2SolicitorAuthFile = "./dr-playwright/e2e/.auth/Respondent2SolicitorUser.json";
const authCookieName = "__auth__";
const tokenValidityBufferSeconds = 60 * 60;

let idamPage: IdamPage;

test.beforeEach(async ({ page }) => {
    idamPage = new IdamPage(page);
});

// The token in a saved session can look unexpired while XUI has already dropped the session,
// so only reuse it if XUI still shows the case list when loaded with the saved cookies.
async function isSavedSessionAccepted(page: Page, authFile: string): Promise<boolean> {
  if (!SessionUtils.isSessionValid(authFile, authCookieName, tokenValidityBufferSeconds)) return false;

  await page.context().addCookies(SessionUtils.getCookies(authFile));
  await page.goto(envUrl);
  const accepted = await caseListHeading(page)
    .waitFor({ timeout: 15000 })
    .then(() => true, () => false);

  if (!accepted) {
    console.log(`Saved session in ${authFile} is no longer accepted by XUI. Logging in again.`);
    await page.context().clearCookies();
  }
  return accepted;
}

  setup("Authenticate Claimant Solicitor", async ({ page }) => {
    setup.skip(await isSavedSessionAccepted(page, claimantSolicitorAuthFile), "Reusing existing valid session");
    await page.goto(envUrl);
    await idamPage.login(claimantSolicitorCredentials);
    await expect(caseListHeading(page)).toBeVisible();
    await page.context().storageState({ path: claimantSolicitorAuthFile });
  });

  setup("Authenticate Respondent1 Solicitor", async ({ page }) => {
    setup.skip(await isSavedSessionAccepted(page, respondent1SolicitorAuthFile), "Reusing existing valid session");
    await page.goto(envUrl);
    await idamPage.login(respondent1SolicitorCredentials);
    await expect(caseListHeading(page)).toBeVisible();
    await page.context().storageState({ path: respondent1SolicitorAuthFile });
  });

  if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL || claimType === claimTypes.ONE_VS_TWO_LIP_LR) {
    setup("Authenticate Respondent2 Solicitor", async ({ page }) => {
      setup.skip(await isSavedSessionAccepted(page, respondent2SolicitorAuthFile), "Reusing existing valid session");
      await page.goto(envUrl);
      await idamPage.login(respondent2SolicitorCredentials);
      await expect(caseListHeading(page)).toBeVisible();
      await page.context().storageState({ path: respondent2SolicitorAuthFile });
    });
  }
