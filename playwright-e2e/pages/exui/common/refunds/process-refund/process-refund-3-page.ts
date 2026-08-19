import BasePage from '../../../../../base/base-page.js';
import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page.js';
import { AllMethodsStep } from '../../../../../decorators/test-steps.js';
import { headings, radioButtons } from './process-refund-content.js';

@AllMethodsStep()
export default class ProcessRefund3Page extends ExuiRefundsPage(BasePage) {
  async verifyContent() {
    super.runVerifications([
      super.expectHeading(headings.processRefund),
      super.expectLegend(radioButtons.contactInformation.label),
    ]);
  }

  async enterContactInformation() {
    await super.inputText('test@hmcts.net', radioButtons.contactInformation.email.selector);
  }

  async submit() {
    await super.retryClickContinue(async () => this.expectNoText(radioButtons.contactInformation.label));
  }
}
