import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading, subheading, inputs, paragraphs } from './upload-order-content';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class UploadOrderPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectCaseHeading(getFormattedCaseId(ccdCaseData.id!)),
      super.expectCaseHeading(ccdCaseData.caseNamePublic!),
      super.expectSubheading(subheading),
    ]);
  }

  async uploadOrderDocument() {
    await super.retryUploadFile(filePaths.testDocxFile, inputs.upload.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
