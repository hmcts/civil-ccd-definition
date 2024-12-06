import BasePage from '../../../../../../base/base-page.ts';
import filePaths from '../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, fileUpload } from './upload-draft-directions-content.ts';

@AllMethodsStep()
export default class UploadDraftDirectionsPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async uploadFile() {
    await super.retryUploadFile(filePaths.testPdfFile, fileUpload.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
