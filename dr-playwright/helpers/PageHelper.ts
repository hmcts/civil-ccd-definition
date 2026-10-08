import { expect, Locator, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { uploadRetries, xuiLoadRetries } from '../civilConfig.ts';
// import {imageLocators} from "../fixtures/imageLocators";
// import {TabsHelper} from "./TabsHelper";
// import {WaitUtils} from "../e2e/utils/wait.utils";
// import {envUrl} from "../iacConfig";

export class PageHelper {

    // readonly callbackErrorLocator: string = '//*[@id="content"]/div/exui-ccd-connector/ccd-case-edit/ccd-case-edit-page/ccd-callback-errors';
    // readonly errorsList: string = '//*[@id="errors"]/li'
    constructor(public page: Page) {}

    async grabCaseNumber() {
        await this.page.waitForSelector('.alert-message', { state: 'visible' });
        const message = await this.page.innerText('.alert-message');
        const caseId: string = (message.split('#')[1].split(' ')[0]).split('-').join('');
        return caseId;
    }

    async selectNextStep(nextStep: string) {
      console.log(nextStep);
      await expect(this.page.locator('#next-step')).toBeEnabled();
      await expect(this.page.locator('#next-step')).toContainText(nextStep);

      await expect(async () => {
        // XUI can re-render the case page after the option is chosen, resetting the dropdown to "Select action"
        // and leaving Go disabled, so the option is selected again on every attempt
        await this.page.locator('#next-step').selectOption({ label: nextStep }, { timeout: 5000 });
        await this.page.getByRole('button', { name: 'Go' }).click({ timeout: 5000 });
      }).toPass({
        intervals: [2000, 5000], // Time to wait between retries (in ms)
        timeout: 30000,          // Total maximum time for all retries combined (in ms)
      });
    }

    // Opens a URL and waits for XUI to render, reloading if it hasn't. When the environment is slow XUI can
    // leave the page blank, and every later action would otherwise wait out its full timeout.
    async gotoAndWaitForXui(url: string, attempts: number = xuiLoadRetries.attempts, waitSeconds: number = xuiLoadRetries.waitSeconds) {
      // The primary navigation is on every XUI page, so it shows the app has rendered
      const xuiNavigation = this.page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Case list' });
      await this.page.goto(url);
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const loaded = await xuiNavigation
          .waitFor({ state: 'visible', timeout: waitSeconds * 1000 })
          .then(() => true, () => false);
        if (loaded) {
          return;
        }
        if (attempt === attempts) {
          throw new Error(`XUI did not load ${url} after ${attempts} attempts of ${waitSeconds}s each`);
        }
        console.log(`XUI not loaded after ${waitSeconds}s, reloading (attempt ${attempt + 1} of ${attempts}): ${url}`);
        await this.page.reload();
      }
    }

    // Retries Continue until the next page's element shows, as CCD can drop the first click
    async continueUntilVisible(nextPageLocator: Locator) {
      await expect(async () => {
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await expect(nextPageLocator).toBeAttached({ timeout: 5000 });
      }).toPass({ intervals: [1000, 2000], timeout: 30000 });
    }

    // Uploads a file and waits for it to finish, retrying if the document store rate limits the upload
    async uploadFile(
      fileInput: Locator,
      filePath: string,
      maxAttempts: number = uploadRetries.attempts,
      waitSeconds: number = uploadRetries.waitSeconds,
    ) {
      // Only visible messages count: a page with several upload fields, or a retried upload, keeps hidden copies of
      // these messages from earlier uploads
      const uploadingMessages = this.page.locator('.error-message:visible', { hasText: 'Uploading...' });
      const rateLimitedMessages = this.page.locator('.error-message:visible', { hasText: 'Your request was rate limited' });
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await fileInput.setInputFiles([]);
        await fileInput.setInputFiles(filePath);
        await expect(uploadingMessages).toHaveCount(0);
        if ((await rateLimitedMessages.count()) === 0) {
          return;
        }
        if (attempt < maxAttempts) {
          const waitBeforeRetrySeconds = waitSeconds * attempt;
          console.log(`Upload of ${filePath} was rate limited on attempt ${attempt} of ${maxAttempts}, retrying in ${waitBeforeRetrySeconds}s`);
          await this.page.waitForTimeout(waitBeforeRetrySeconds * 1000);
        }
      }
      throw new Error(`Upload of ${filePath} was still rate limited after ${maxAttempts} attempts`);
    }

    async fillDate(fieldId: string, date: moment.Moment) {
      // CCD can render hidden duplicates of date inputs, so only target the visible ones
      await this.page.locator(`#${fieldId}-day:visible`).fill(date.date().toString());
      await this.page.locator(`#${fieldId}-month:visible`).fill((date.month() + 1).toString());
      await this.page.locator(`#${fieldId}-year:visible`).fill(date.year().toString());
    }

    // // When running as API test the search reference box is not being populated.  Tried multiple options to no avail
    // // So added 2nd parameter and use the url instead of search reference box for API tests
    // async getCase(caseId: string, isE2e: boolean = true) {
    //     if (isE2e) {
    //         await this.page.fill('#exuiCaseReferenceSearch', caseId);
    //         await this.page.getByRole( 'button', { name: 'Find' }).click();
    //     } else {
    //         await this.page.goto(envUrl + '/cases/case-details/IA/Asylum/' + caseId);
    //     }
    // }
    //
    // async waitForHearingBundleToBeGenerated() {
    //     const maxRetries: number = 10;
    //     let retry: number = 0;
    //     while (await this.page.locator('#progress_caseOfficer_finalBundling_in_new').isVisible()) {
    //         if (retry < maxRetries) {
    //             retry++;
    //             console.log('Refreshing webpage, try: ' + retry + ' of ' + maxRetries);
    //             await this.page.reload();
    //             const visibleElement = await this.page.locator('#next-step');
    //             await visibleElement.waitFor({state: 'visible'});
    //         } else {
    //             break;
    //         }
    //     }
    // }
    //
    // async areNotificationsTurnedOff() {
    //     await new TabsHelper(this.page).selectTab('Overview');
    //     return (!await this.page.locator(imageLocators.rehydrated.notifications.locator).isHidden());
    // }
    //
    // async checkForAnyErrorsOnPage() {
    //     await this.page.locator(this.callbackErrorLocator).waitFor({timeout:5000});
    //     console.log(await this.page.locator(this.callbackErrorLocator).isVisible());
    //     return (await this.page.locator(this.callbackErrorLocator).isVisible());
    // }
    //
    // async checkForSingleErrorOnPage(errorMessage: string) {
    //     await this.page.locator(this.callbackErrorLocator).waitFor({timeout:5000});
    //     console.log(await this.page.locator(this.callbackErrorLocator).isVisible());
    //     console.log(errorMessage + '>>>> ', await this.page.locator(this.errorsList).innerText());
    //     return (await this.page.locator(this.errorsList).innerText() === errorMessage);
    //
    // }
}
