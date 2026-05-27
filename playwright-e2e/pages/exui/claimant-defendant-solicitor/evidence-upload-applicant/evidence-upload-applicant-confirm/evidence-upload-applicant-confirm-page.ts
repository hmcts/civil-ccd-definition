import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings } from './evidence-upload-applicant-confirm-content.ts';

@AllMethodsStep()
export default class EvidenceUploadConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(headings.documentsUploaded)]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
