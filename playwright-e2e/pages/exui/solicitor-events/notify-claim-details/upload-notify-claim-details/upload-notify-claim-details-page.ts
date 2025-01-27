import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import ParticularsOfClaimFragment from '../../../fragments/particulars-of-claim/particulars-of-claim-fragment';

@AllMethodsStep()
export default class UploadNotifyClaimDetailsPage extends ExuiPage(BasePage) {
  private particularsOfClaimFragment: ParticularsOfClaimFragment;

  constructor(page: Page, particularsOfClaimFragment: ParticularsOfClaimFragment) {
    super(page);
    this.particularsOfClaimFragment = particularsOfClaimFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.particularsOfClaimFragment.verifyContent(),
    ]);
  }

  async uploadDocuments() {
    await this.particularsOfClaimFragment.uploadDocuments();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
