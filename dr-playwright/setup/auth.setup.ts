import {test as setup, expect, test} from "@playwright/test";
import {
  claimantSolicitorCredentials,
  envUrl,
} from '../civilConfig.ts';

import {IdamPage} from '../e2e/page-objects/pages/idam.po';

let idamPage: IdamPage;
test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    idamPage = new IdamPage(page);
    await page.goto(envUrl);
});


setup("Authenticate Claimant Solicitor", async ({ page }) => {
    const authFile = "./dr-playwright/e2e/.auth/ClaimantSolicitorUser.json";

    //Login
    await idamPage.login(claimantSolicitorCredentials);

    // Assertion: Verify login success
    await expect(page.locator('//*[@id="content"]/div/h1')).toContainText('Case list');
  //  await expect(page.locator('//*[@id="content"]/h3')).toContainText('My work');

    // Save authentication state
    await page.context().storageState({ path: authFile });

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

