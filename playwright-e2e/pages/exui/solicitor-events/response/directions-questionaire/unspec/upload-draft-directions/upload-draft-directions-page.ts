import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { Party } from '../../../../../../../models/partys.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { heading, inputs } from './upload-draft-directions-content.ts';

@AllMethodsStep()
export default class UploadDraftDirectionsPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async uploadFile() {
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.uploadFile.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
