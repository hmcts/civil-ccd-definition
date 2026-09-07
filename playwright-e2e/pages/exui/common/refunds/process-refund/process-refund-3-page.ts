import BasePage from '../../../../../base/base-page';
import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, radioButtons } from './process-refund-content';

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
