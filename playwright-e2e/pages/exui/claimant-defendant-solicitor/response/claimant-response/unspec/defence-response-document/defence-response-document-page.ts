import BasePage from '../../../../../../../base/base-page.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { subheadings, inputs } from './defence-response-document-content.ts';

@AllMethodsStep()
export default class DefenceResponseDocumentPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.respondToDefence, { index: 0 }),
      super.expectLabel(inputs.uploadDoc.label, { index: 0 }),
    ]);
  }

  async uploadDocument() {
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadDoc.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
