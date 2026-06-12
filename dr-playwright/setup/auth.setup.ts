import {test as setup, expect, test} from "@playwright/test";
import {
  claimantSolicitorCredentials,
  envUrl, respondent1SolicitorCredentials, respondent2SolicitorCredentials,
} from '../civilConfig.ts';
import {IdamPage} from '../e2e/page-objects/pages/idam.po';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import claimTypes from '../enums/claim-types.ts';

const env = cleanEnv({
  CLAIM_TYPE: enums({
    values: [claimTypes.ONE_VS_ONE_LIP, claimTypes.TWO_VS_ONE_LIP, claimTypes.ONE_VS_TWO_LIPS, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL] as const,
    default: claimTypes.ONE_VS_ONE,
  }),
});
const claimType: claimTypes = env.CLAIM_TYPE;
const caseListLocator: string = '//*[@id="content"]/div/h1';
const caseList: string = 'Case list'
const claimantSolicitorAuthFile = "./dr-playwright/e2e/.auth/ClaimantSolicitorUser.json";
const respondent1SolicitorAuthFile = "./dr-playwright/e2e/.auth/Respondent1SolicitorUser.json";
const respondent2SolicitorAuthFile = "./dr-playwright/e2e/.auth/Respondent2SolicitorUser.json";

let idamPage: IdamPage;

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    idamPage = new IdamPage(page);
    await page.goto(envUrl);
});

  setup("Authenticate Claimant Solicitor", async ({ page }) => {
    await idamPage.login(claimantSolicitorCredentials);
    await expect(page.locator(caseListLocator)).toContainText(caseList);
    await page.context().storageState({ path: claimantSolicitorAuthFile });
  });

  setup("Authenticate Respondent1 Solicitor", async ({ page }) => {
    await idamPage.login(respondent1SolicitorCredentials);
    await expect(page.locator(caseListLocator)).toContainText(caseList);
    await page.context().storageState({ path: respondent1SolicitorAuthFile });
  });

  // if (claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
  //   setup("Authenticate Respondent2 Solicitor", async ({ page }) => {
  //     await idamPage.login(respondent2SolicitorCredentials);
  //     await expect(page.locator(caseListLocator)).toContainText(caseList);
  //     await page.context().storageState({ path: respondent2SolicitorAuthFile });
  //   });
  // }
