import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import yesNo from '../../../../enums/yesNo.ts';
import { GeneralApplicationAnswers } from '../api/GeneralApplication.ts';

// The claimant's solicitor makes a general application on the claim ("Make an application",
// INITIATE_GENERAL_APPLICATION), with the same answers as the API version: the application types, whether the other side
// agreed and, if not, with notice or not, not urgent, no hearing date to mention, an evidence document, an in person
// hearing at Clerkenwell if one is needed, and the fee the last page shows. civil-service then creates the application
// as a case of its own, waiting for its fee.
export class GeneralApplication {
  private pageHelper: PageHelper;
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
    this.buttonHelper = new ButtonHelper(this.page);
  }

  async submit(answers: GeneralApplicationAnswers, solicitorName: string, email: string) {
    await this.pageHelper.selectNextStep('Make an application');

    // The application types
    for (const type of answers.types) {
      await this.page.locator(`#generalAppTypeLR_types-${type}`).check();
    }
    await this.pageHelper.continueToNextPage();

    // No hearing date to mention
    await this.page.locator('#generalAppHearingDate_hearingScheduledPreferenceYesNo-No').check();
    await this.pageHelper.continueToNextPage();

    // Whether the other side has agreed
    await this.page.locator(`#generalAppRespondentAgreement_hasAgreed_${answers.respondentAgreed}`).check();
    await this.pageHelper.continueToNextPage();

    // Not urgent
    await this.page.locator('#generalAppUrgencyRequirement_generalAppUrgency_No').check();
    await this.pageHelper.continueToNextPage();

    // With or without notice, only asked when the other side has not agreed
    if (answers.respondentAgreed === yesNo.NO) {
      await this.page.locator(`#generalAppInformOtherParty_isWithNotice-${answers.withNotice}`).check();
      if (answers.withNotice === yesNo.NO) {
        await this.page.locator('#generalAppInformOtherParty_reasonsForWithoutNotice').fill('Application made without notice by playwright-tests');
      }
      await this.pageHelper.continueToNextPage();
    }

    // The order sought, an evidence document and the statement of truth
    await this.page.locator('#generalAppDetailsOfOrder').fill(`The order sought: ${answers.types.join(', ')}`);
    await this.page.locator('#generalAppReasonsOfOrder').fill('Reasons given by playwright-tests');
    await this.buttonHelper.addNewButton.click();
    await this.pageHelper.uploadFile(this.page.locator('#generalAppEvidenceDocument_value'), './playwright-tests/documents/TEST_DOCUMENT_1.pdf');
    await this.page.locator('#generalAppStatementOfTruthConsent-ConsentAgreementCheckBox').check();
    await this.page.locator('#generalAppStatementOfTruth_name').fill(solicitorName);
    await this.page.locator('#generalAppStatementOfTruth_role').fill('Solicitor');
    await this.pageHelper.continueToNextPage();

    // Hearing details
    await this.fillHearingDetails('generalAppHearingDetails', email);
    await this.pageHelper.continueToNextPage();

    // The fee, which the hearing details page's callback works out
    await this.pageHelper.continueToNextPage();
    await this.pageHelper.submitEvent();
    await this.closeConfirmation();
  }

  // The hearing details an applicant or respondent gives (fieldPrefix generalAppHearingDetails or hearingDetailsResp):
  // no other hearing or trial fixed, an in person hearing at Clerkenwell for 15 minutes, no unavailable dates and no
  // support needs
  async fillHearingDetails(fieldPrefix: string, email: string) {
    await this.page.locator(`#${fieldPrefix}_hearingYesorNo_No`).check();
    await this.page.locator(`#${fieldPrefix}_trialRequiredYesOrNo_No`).check();
    await this.page.locator(`#${fieldPrefix}_HearingPreferencesPreferredType-IN_PERSON`).check();
    await this.page.locator(`#${fieldPrefix}_ReasonForPreferredHearingType`).fill('In person hearing preferred by playwright-tests');
    const courts = await this.page.locator(`#${fieldPrefix}_HearingPreferredLocation option`).allTextContents();
    const clerkenwell = courts.map((court) => court.trim()).find((court) => /clerkenwell/i.test(court));
    await this.page.locator(`#${fieldPrefix}_HearingPreferredLocation`).selectOption({ label: clerkenwell });
    await this.page.locator(`#${fieldPrefix}_HearingDetailsTelephoneNumber`).fill('07123456789');
    await this.page.locator(`#${fieldPrefix}_HearingDetailsEmailID`).fill(email);
    await this.page.locator(`#${fieldPrefix}_HearingDuration-MINUTES_15`).check();
    await this.page.locator(`#${fieldPrefix}_unavailableTrialRequiredYesOrNo_No`).check();
    await this.page.locator(`#${fieldPrefix}_vulnerabilityQuestionsYesOrNo_No`).check();
  }

  // Some general application events end on a confirmation page, which is closed to go back to the case
  async closeConfirmation() {
    const close = this.buttonHelper.closeAndReturnToCaseDetailsButton;
    if (await close.isVisible({ timeout: 10000 }).catch(() => false)) {
      await close.click();
    }
  }
}
