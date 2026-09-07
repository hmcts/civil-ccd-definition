import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading } from './confirm-upload-mediation-documents-content';

@AllMethodsStep()
export default class ConfirmUploadMediationDocumentsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
