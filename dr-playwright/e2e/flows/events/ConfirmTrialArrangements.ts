import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';

// A solicitor confirming the case is ready for trial (event TRIAL_READINESS, "Confirm trial arrangements"). It is
// offered on the fast track once the trial is listed, and must be done more than 3 weeks before the hearing.
// Each solicitor sees the page for their own party, whose fields differ only in their prefix (trialReadyApplicant,
// trialReadyRespondent1, applicantRevisedHearingRequirements, respondent1RevisedHearingRequirements, ...), so fields
// are found by pattern. A solicitor acting for both defendants (1v2 same solicitor) gets a page for each, so the
// page is answered for as long as it keeps coming back.
export class ConfirmTrialArrangements {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Confirm trial arrangements');

    const readyForTrial = this.page.locator('input[type=radio][id^="trialReady"][id$="-Yes"]:visible').first();
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    await readyForTrial.waitFor({ state: 'visible' });

    const maxPages = 2;
    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
      // Ready for trial, with no change to the hearing requirements
      await readyForTrial.check();
      await this.page.locator('input[type=radio][id$="RevisedHearingRequirements_revisedHearingRequirements_No"]:visible').first().check();
      await this.page.locator('textarea[id$="HearingOtherComments_hearingOtherComments"]:visible').first()
        .fill('Trial arrangements confirmed by dr-playwright');
      await this.pageHelper.continueToNextPage();

      // Either another party's page (1v2 same solicitor) or check your answers
      await readyForTrial.or(submitButton).first().waitFor({ state: 'visible' });
      if (await submitButton.isVisible()) {
        break;
      }
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
