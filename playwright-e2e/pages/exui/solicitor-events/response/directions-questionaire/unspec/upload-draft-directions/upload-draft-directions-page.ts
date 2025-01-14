import BasePage from '../../../../../base/base-page.ts';
import filePaths from '../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { heading, fileUpload } from './upload-draft-directions-content.ts';

@AllMethodsStep()
export default class UploadDraftDirectionsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async uploadFile(defendantNumber: number) {
    await super.retryUploadFile(filePaths.testPdfFile, fileUpload(defendantNumber).selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
