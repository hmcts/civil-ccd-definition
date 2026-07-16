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
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectSubheading(subheading),
      super.expectText(paragraphs.upload),
    ]);
  }

  async uploadOrderDocument() {
    await super.retryUploadFile(filePaths.testDocxFile, inputs.upload.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
