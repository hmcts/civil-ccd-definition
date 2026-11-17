import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';

// The applicant's solicitor gives the more information a judge or legal adviser asked for on a general application
// ("Respond to judges addn info", RESPOND_TO_JUDGE_ADDITIONAL_INFO, on the application), by uploading a document, as the
// API version does. civil-service adds it to the application's additional documents. The application stays in
// AWAITING_ADDITIONAL_INFORMATION until the date the information was asked for by. The application must be open in the
// page.
export class RespondToJudgeAdditionalInfo {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Respond to judges addn info');

    await this.page.getByRole('button', { name: 'Add new' }).first().click();
    await this.pageHelper.uploadFile(
      this.page.locator('#generalAppAddlnInfoUpload_value'),
      './playwright-tests/documents/TEST_DOCUMENT_1.pdf',
    );
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
