import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';

// The other side's solicitor responds to a general application made with notice ("Respond to application",
// RESPOND_TO_APPLICATION, on the application), with the same answers as the API version: to an application the
// applicant said they agreed to, they confirm it; to any other, they do not agree, giving a reason and a supporting
// document. Either way they want an in person hearing at Clerkenwell if one is needed. civil-service then sends the
// application to a judge or legal adviser. The application must be open in the page.
export class RespondToApplication {
  private pageHelper: PageHelper;
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
    this.buttonHelper = new ButtonHelper(this.page);
  }

  async submit(email: string) {
    await this.pageHelper.selectNextStep('Respond to application');

    // An application the applicant said was agreed gets the consent page, which they confirm; any other, the response
    // page, where they do not agree, with a reason and a supporting document
    const consent = this.page.locator('#gaRespondentConsent_Yes');
    const notAgreed = this.page.locator('#generalAppRespondent1Representative_hasAgreed_No');
    await consent.or(notAgreed).first().waitFor({ state: 'visible' });
    if (await consent.isVisible()) {
      await consent.check();
    } else {
      await notAgreed.check();
      await this.page.locator('#generalAppRespondReason').fill('The respondent does not agree, a reason given by playwright-tests');
      await this.buttonHelper.addNewButton.click();
      await this.pageHelper.uploadFile(this.page.locator('#generalAppRespondDocument_value'), './playwright-tests/documents/TEST_DOCUMENT_1.pdf');
    }
    await this.pageHelper.continueToNextPage();

    // Hearing details, as the applicant gives them
    const application = new GeneralApplication(this.page);
    await application.fillHearingDetails('hearingDetailsResp', email);
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await application.closeConfirmation();
  }
}
