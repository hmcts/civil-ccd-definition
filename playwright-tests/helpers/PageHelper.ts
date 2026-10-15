import { expect, Locator, Page, Request, Response } from '@playwright/test';
import moment from 'moment-business-days';
import { continueRetries, uploadRetries, xuiLoadRetries } from '../civilConfig.ts';
import { SessionEndedError, sessionUserOf } from './SessionEndedError.ts';
import { TestingEndPointHelper } from './TestingEndPointHelper.ts';

// How long to wait for a document upload to start, and then to finish
const uploadStartSeconds = 3;
const uploadFinishSeconds = 120;

// Errors CCD returns when checking an event page that come from a busy environment rather than the page itself, so
// clicking Continue again can succeed
const transientCcdErrors = [
  'Client error when getting Role Assignments',
  'Server error when getting Role Assignments',
  'Connection reset',
  'timed out',
];

// The body XUI returns, with HTTP 403, when it no longer has the user's session
const xuiSessionEndedBody = '{"message":"Internal Server Error"}';
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
        // The event's page may have opened late, after the previous attempt stopped waiting for it
        if (this.page.url().includes('/trigger/')) {
          return;
        }
        // XUI can re-render the case page after the option is chosen, resetting the dropdown to "Select action"
        // and leaving Go disabled, so the option is selected again on every attempt
        await this.page.locator('#next-step').selectOption({ label: nextStep }, { timeout: 5000 });
        await this.page.getByRole('button', { name: 'Go' }).click({ timeout: 5000 });
        // XUI can also leave the case page showing after Go is clicked, so the event's page is waited for and Go is
        // clicked again if it has not opened
        await expect(this.page).toHaveURL(/\/trigger\//, { timeout: 15000 });
      }).toPass({
        intervals: [2000, 5000], // Time to wait between retries (in ms)
        timeout: 60000,          // Total maximum time for all retries combined (in ms)
      });
    }

    // Opens a URL and waits for XUI to render, reloading if it hasn't. When the environment is slow XUI can
    // leave the page blank, and every later action would otherwise wait out its full timeout.
    // If XUI sends the user to the sign in page instead, their session has ended, so SessionEndedError is thrown.
    async gotoAndWaitForXui(url: string, attempts: number = xuiLoadRetries.attempts, waitSeconds: number = xuiLoadRetries.waitSeconds) {
      // The primary navigation is on every XUI page, so it shows the app has rendered
      const xuiNavigation = this.page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Case list' });
      const signInEmail = this.page.locator('#email');
      await this.page.goto(url);
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const loaded = await xuiNavigation
          .or(signInEmail)
          .first()
          .waitFor({ state: 'visible', timeout: waitSeconds * 1000 })
          .then(() => true, () => false);
        if (loaded && await signInEmail.isVisible()) {
          throw new SessionEndedError(`opening ${url} went to the sign in page`);
        }
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

    // Waits for an element that only exists once the page has finished loading, reloading the page if it hasn't.
    // Only use it on pages that can safely be reloaded (ones opened by a link or URL, not the pages of an event).
    async waitForReady(readyLocator: Locator, description: string, attempts: number = xuiLoadRetries.attempts, waitSeconds: number = xuiLoadRetries.waitSeconds) {
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const ready = await readyLocator
          .waitFor({ state: 'attached', timeout: waitSeconds * 1000 })
          .then(() => true, () => false);
        if (ready) {
          return;
        }
        if (attempt === attempts) {
          throw new Error(`${description} did not load after ${attempts} attempts of ${waitSeconds}s each`);
        }
        console.log(`${description} not loaded after ${waitSeconds}s, reloading (attempt ${attempt + 1} of ${attempts})`);
        await this.page.reload();
      }
    }

    // Clicks Continue on an event page and waits for the next page. On Continue XUI asks CCD to check the page (a
    // POST to .../validate?pageId=...). On a busy environment that check can fail for reasons that have nothing to
    // do with the page (a 5xx, or CCD failing to reach the role assignment service), so Continue is clicked again.
    // Anything else fails straight away so that real errors are not hidden:
    //  - errors about the answers on the page (XUI's own checks, or CCD returning 4xx)
    //  - the user's session has ended (401, or XUI's 403): SessionEndedError, so the event can be restarted
    //  - no response from CCD at all: XUI keeps the request open and Continue disabled, so it cannot be clicked again
    // XUI can also drop a click on Continue, sending nothing to CCD and leaving the page as it is. If nothing has been
    // sent within continueRetries.droppedClickSeconds, Continue is clicked again (this counts as an attempt).
    // The page is never reloaded, as that would lose the answers already given in the event.
    async continueToNextPage(
      attempts: number = continueRetries.attempts,
      waitSeconds: number = continueRetries.waitSeconds,
      responseTimeoutSeconds: number = continueRetries.responseTimeoutSeconds,
      droppedClickSeconds: number = continueRetries.droppedClickSeconds,
    ) {
      const continueButton = this.page.getByRole('button', { name: 'Continue' });
      const errorSummary = this.page.locator('.error-summary:visible, .govuk-error-summary:visible').first();
      // Wait for the event page to show before noting its URL. Straight after Start, or after the previous page, the
      // browser can still be on the old URL, and the event page arriving would look like Continue had moved on.
      await continueButton.waitFor({ state: 'visible' });
      const startUrl = this.page.url();
      const pageId = startUrl.split('/').pop() ?? startUrl;
      const timeout = responseTimeoutSeconds * 1000;
      const errorText = async () => (await errorSummary.innerText().catch(() => '')).replace(/\s+/g, ' ').trim();

      const isValidateRequest = (request: Request) => request.url().includes('/validate') && request.method() === 'POST';
      // Once CCD has rejected an attempt its error summary stays showing, so it is no longer watched for
      let ccdRejectedAnAttempt = false;

      for (let attempt = 1; attempt <= attempts; attempt++) {
        type Outcome = { kind: 'response'; response: Response } | { kind: 'navigated' } | { kind: 'errors' } | { kind: 'dropped' } | { kind: 'timeout' };
        const requestSent = this.page
          .waitForRequest(isValidateRequest, { timeout: droppedClickSeconds * 1000 })
          .then(() => true, () => false);
        const outcomes: Promise<Outcome>[] = [
          this.page
            .waitForResponse((response) => isValidateRequest(response.request()), { timeout })
            .then((response): Outcome => ({ kind: 'response', response })),
          this.page
            .waitForURL((url) => url.href !== startUrl, { timeout })
            .then((): Outcome => ({ kind: 'navigated' })),
          // Only settles if nothing was sent to CCD in time, as otherwise the response decides what happened
          requestSent.then((sent) => (sent ? new Promise<Outcome>(() => {}) : { kind: 'dropped' })),
        ];
        if (!ccdRejectedAnAttempt) {
          outcomes.push(errorSummary.waitFor({ state: 'visible', timeout }).then((): Outcome => ({ kind: 'errors' })));
        }
        await continueButton.click();
        const outcome = await Promise.race(outcomes.map((outcome) => outcome.catch((): Outcome => ({ kind: 'timeout' }))));

        if (outcome.kind === 'navigated') {
          return;
        }
        if (outcome.kind === 'errors') {
          throw new Error(`Continue on ${pageId} was rejected: ${await errorText()}`);
        }
        if (outcome.kind === 'timeout') {
          throw new Error(`Continue on ${pageId} did not get a response from CCD within ${responseTimeoutSeconds}s`);
        }
        if (outcome.kind === 'dropped') {
          if (attempt === attempts) {
            throw new Error(`Continue on ${pageId} sent nothing to CCD after ${attempts} clicks and showed no errors`);
          }
          console.log(`Continue on ${pageId} sent nothing to CCD within ${droppedClickSeconds}s, clicking it again (attempt ${attempt + 1} of ${attempts})`);
          continue;
        }

        const status = outcome.response.status();
        if (outcome.response.ok()) {
          // CCD can accept the page with a warning, in which case XUI stays on the page and offers "Ignore Warning
          // and Continue" for the caller to click
          const ignoreWarningButton = this.page.getByRole('button', { name: 'Ignore Warning and Continue' });
          const moved = await Promise.race([
            this.page.waitForURL((url) => url.href !== startUrl, { timeout }).then(() => true),
            ignoreWarningButton.waitFor({ state: 'visible', timeout }).then(() => true),
          ]).catch(() => false);
          if (moved) {
            return;
          }
          throw new Error(`CCD accepted ${pageId} but the next page did not show within ${responseTimeoutSeconds}s. ${await errorText()}`.trim());
        }

        const body = await outcome.response.text().catch(() => '');
        // 401: XUI still has the session but CCD rejected the user's token. 403 with XUI's own "Internal Server Error"
        // body: XUI no longer has the session (it fails its CSRF check). Any other 403 is CCD refusing access.
        if (status === 401 || (status === 403 && body.includes(xuiSessionEndedBody))) {
          throw new SessionEndedError(`CCD rejected ${pageId} with HTTP ${status}`);
        }
        const isTransient = status >= 500 || transientCcdErrors.some((error) => body.includes(error));
        if (!isTransient) {
          throw new Error(`CCD rejected ${pageId} with HTTP ${status}: ${body.slice(0, 500)}`);
        }
        if (attempt === attempts) {
          throw new Error(`CCD still could not check ${pageId} after ${attempts} attempts (last HTTP ${status}): ${body.slice(0, 500)}`);
        }
        ccdRejectedAnAttempt = true;
        console.log(`CCD could not check ${pageId} (HTTP ${status}), clicking Continue again in ${waitSeconds}s (attempt ${attempt + 1} of ${attempts})`);
        await this.page.waitForTimeout(waitSeconds * 1000);
      }
    }

    // Clicks the event's submit button (one whose name contains Submit, or the event's own label such as
    // "Acknowledge claim") and waits for CCD to save the event. If the user's session has ended (CCD 401, or XUI's
    // 403) the event may or may not have been saved, so CCD's event history is checked with the user's own API token
    // before anything is done again:
    //  - saved: SessionEndedError with eventSaved, so the user is signed in again but the event is not submitted again
    //  - not saved: SessionEndedError, so the user is signed in again and the event is restarted
    // Creating a claim has no case to check yet. XUI and CCD reject a request from an ended session before saving
    // anything, so a claim is treated as not created.
    // Any other failure is thrown straight away and never submitted again.
    async submitEvent(buttonName: string = 'Submit', responseTimeoutSeconds: number = continueRetries.responseTimeoutSeconds) {
      // Matched the same way as ButtonHelper.submitButton, so 'Submit' also finds labels such as "Submit your response"
      const submitButton = this.page.getByRole('button', { name: buttonName });
      await submitButton.waitFor({ state: 'visible' });
      const url = this.page.url();
      // e.g. /cases/case-details/CIVIL/CIVIL/<case id>/trigger/<event id>/submit, or /cases/case-create/CIVIL/CIVIL/<event id>/submit
      const caseId = url.match(/\/(\d{16})\/trigger\//)?.[1];
      const eventId = url.match(/\/trigger\/([^/]+)\//)?.[1] ?? url.match(/\/case-create\/[^/]+\/[^/]+\/([^/]+)\//)?.[1] ?? url;
      const user = sessionUserOf(this.page);
      const testingEndpointHelper = new TestingEndPointHelper();
      const savedBefore = caseId && user ? await testingEndpointHelper.countCaseEvents(user, caseId, eventId) : undefined;

      const submitResponse = this.page
        .waitForResponse(
          (response) => response.request().method() === 'POST' && /\/data\/(cases\/\d+\/events|case-types\/[^/]+\/cases)(\?|$)/.test(response.url()),
          { timeout: responseTimeoutSeconds * 1000 },
        )
        .catch(() => null);
      await submitButton.click();
      const response = await submitResponse;
      if (response === null) {
        throw new Error(`Submitting ${eventId} did not get a response from CCD within ${responseTimeoutSeconds}s`);
      }
      if (response.ok()) {
        return;
      }

      const status = response.status();
      const body = await response.text().catch(() => '');
      const sessionEnded = status === 401 || (status === 403 && body.includes(xuiSessionEndedBody));
      if (!sessionEnded) {
        throw new Error(`CCD rejected submitting ${eventId} with HTTP ${status}: ${body.slice(0, 500)}`);
      }
      const isCaseEvent = url.includes('/trigger/');
      if (isCaseEvent && savedBefore === undefined) {
        // Without the case or the user CCD's event history cannot be checked, so it is not safe to submit again
        throw new Error(`Submitting ${eventId} got HTTP ${status} and it cannot be checked whether CCD saved it, so it is not submitted again`);
      }
      if (isCaseEvent) {
        const savedAfter = await testingEndpointHelper.countCaseEvents(user, caseId, eventId);
        if (savedAfter > savedBefore) {
          throw new SessionEndedError(`submitting ${eventId} got HTTP ${status}, but CCD had saved it`, true);
        }
      }
      throw new SessionEndedError(`submitting ${eventId} got HTTP ${status} and CCD did not save it`);
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
      // CCD enables Cancel upload while a document is being uploaded (it stays on the page, disabled, afterwards).
      // Continue is held until the upload finishes, so the upload must be finished before moving on, not just started.
      const cancelUploadButtons = this.page.getByRole('button', { name: 'Cancel upload' }).locator('visible=true').and(this.page.locator(':enabled'));
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await fileInput.setInputFiles([]);
        await fileInput.setInputFiles(filePath);
        // The upload can take a moment to start, and a quick one may finish before it is seen, so not seeing it is fine
        await cancelUploadButtons.first().waitFor({ state: 'visible', timeout: uploadStartSeconds * 1000 }).catch(() => {});
        await expect(cancelUploadButtons, `Upload of ${filePath} did not finish within ${uploadFinishSeconds}s`)
          .toHaveCount(0, { timeout: uploadFinishSeconds * 1000 });
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
