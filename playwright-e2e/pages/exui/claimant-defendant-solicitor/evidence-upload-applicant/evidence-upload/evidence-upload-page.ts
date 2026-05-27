import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings } from './evidence-upload-content.ts';

@AllMethodsStep()
export default class EvidenceUploadPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(headings.uploadYourDocuments)]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
