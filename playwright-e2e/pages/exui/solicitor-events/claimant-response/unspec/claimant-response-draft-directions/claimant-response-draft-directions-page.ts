import BasePage from '../../../../../../base/base-page';
import filePaths from '../../../../../../config/file-paths.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import { headings, uploadForm } from './claimant-response-draft-directions-content.ts';

@AllMethodsStep()
export default class ClaimantResponseDraftDirectionsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(headings.heading2.label, { first: true }),
      super.expectText(uploadForm.uploadFile.label, { ignoreDuplicates: true }),
      super.expectText(uploadForm.hint.label, { first: true }),
    ]);
  }

  async uploadEvidence() {
    await super.retryUploadFile(filePaths.testPdfFile, uploadForm.uploadFile.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
