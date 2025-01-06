import BasePage from '../../../../../../base/base-page.ts';
import filePaths from '../../../../../../config/file-paths.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { uploadForm } from './claimant-response-spec-applicant-defence-response-document-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecApplicantDefenceResponseDocumentPage extends ExuiPage(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(uploadForm.uploadFile.label, { first: true }),
    ]);
  }

  async uploadEvidenceSpec() {
    await super.retryUploadFile(filePaths.testPdfFile, uploadForm.uploadFile.selectorSpec);
  }

  async uploadEvidenceUnspec() {
    await super.retryUploadFile(filePaths.testPdfFile, uploadForm.uploadFile.selectorUnspec);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
