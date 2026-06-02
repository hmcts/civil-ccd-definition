import {test as setup, expect, test} from "@playwright/test";
import {
  claimantSolicitorCredentials,
  envUrl, respondent1SolicitorCredentials, respondent2SolicitorCredentials,
} from '../civilConfig.ts';

const env = cleanEnv({
  CLAIM_TYPE: enums({
    values: [claimTypes.ONE_VS_ONE_LIP, claimTypes.TWO_VS_ONE_LIP, claimTypes.ONE_VS_TWO_LIPS, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL] as const,
    default: claimTypes.ONE_VS_ONE,
  }),
});

import {IdamPage} from '../e2e/page-objects/pages/idam.po';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import claimTypes from '../enums/claim-types.ts';
import yesNo from '../enums/yesNo.ts';

let idamPage: IdamPage;
test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    idamPage = new IdamPage(page);
    await page.goto(envUrl);
});


setup("Authenticate Claimant and Respondent Solicitors", async ({ page }) => {
  const claimantSolicitorAuthFile = "./dr-playwright/e2e/.auth/ClaimantSolicitorUser.json";
  const respondent1SolicitorAuthFile = "./dr-playwright/e2e/.auth/Responent1SolicitorUser.json";
  const respondent2SolicitorAuthFile = "./dr-playwright/e2e/.auth/Responent2SolicitorUser.json";
  const caseListLocator: string = '//*[@id="content"]/div/h1';
  const caseList: string = 'Case list'
  const claimType: claimTypes = env.CLAIM_TYPE;

  switch (claimType) {
    case claimTypes.ONE_VS_TWO_LR_LIP:
    case claimTypes.ONE_VS_TWO_LIP_LR:
    case claimTypes.ONE_VS_ONE:
    case claimTypes.TWO_VS_ONE:
    case claimTypes.ONE_VS_TWO_SAME_SOL:
      await idamPage.login(claimantSolicitorCredentials);
      await expect(page.locator(caseListLocator)).toContainText(caseList);
      await page.context().storageState({ path: claimantSolicitorAuthFile });
      await idamPage.logout();
      await idamPage.login(respondent1SolicitorCredentials);
      await expect(page.locator(caseListLocator)).toContainText(caseList);
      await page.context().storageState({ path: respondent1SolicitorAuthFile });
      await idamPage.logout();
      break;
    case claimTypes.ONE_VS_TWO_DIFF_SOL:
      await idamPage.login(claimantSolicitorCredentials);
      await expect(page.locator(caseListLocator)).toContainText(caseList);
      await page.context().storageState({ path: claimantSolicitorAuthFile });
      await idamPage.login(respondent1SolicitorCredentials);
      await expect(page.locator(caseListLocator)).toContainText(caseList);
      await page.context().storageState({ path: respondent1SolicitorAuthFile });
      await idamPage.login(respondent2SolicitorCredentials);
      await expect(page.locator(caseListLocator)).toContainText(caseList);
      await page.context().storageState({ path: respondent2SolicitorAuthFile });
      break;
    default:
  }


    //Login
  //  await idamPage.login(claimantSolicitorCredentials);

    // Assertion: Verify login success
  //  await expect(page.locator('//*[@id="content"]/div/h1')).toContainText('Case list');
  //  await expect(page.locator('//*[@id="content"]/h3')).toContainText('My work');

    // Save authentication state
   // await page.context().storageState({ path: claimantSolicitorAuthFile });

});

// setup("Authenticate Legal Officer", async ({ page }) => {
//     const authFile = "./.auth/LegalOfficer.json";
//     await idamPage.login(legalOfficerCredentials);
//     await expect(page.locator('//*[@id="content"]/h3')).toContainText('My work');
//     await page.context().storageState({ path: authFile });
// });

// setup("Authenticate Home Office Officer", async ({ page }) => {
//     const authFile = "./.auth/HomeOfficeOfficer.json";
//     await idamPage.login(homeOfficeOfficerCredentials);
//     await expect(page.locator('//*[@id="content"]/div/h1')).toContainText('Case list');
//     await page.context().storageState({ path: authFile });
// });
//
// setup("Authenticate Listing Officer", async ({ page }) => {
//     const authFile = "./.auth/ListingOfficer.json";
//     await idamPage.login(listingOfficerCredentials);
//     await expect(page.locator('//*[@id="content"]/h3')).toContainText('My work');
//     await page.context().storageState({ path: authFile });
// });
//
// setup("Authenticate Judge", async ({ page }) => {
//     const authFile = "./.auth/Judge.json";
//     await idamPage.login(judgeCredentials);
//     await expect(page.locator('//*[@id="content"]/h3')).toContainText('My work');
//     await page.context().storageState({ path: authFile });
// });

