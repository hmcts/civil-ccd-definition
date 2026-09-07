import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, inputs } from './process-refund-content';
import BasePage from '../../../../../base/base-page';

@AllMethodsStep()
export default class ProcessRefund2Page extends ExuiRefundsPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.processRefund),
      super.expectHeading(inputs.refundReason.label),
    ]);  
  }

  async selectReasonAmendedClaim() {
    await super.clickBySelector(inputs.refundReason.amendedClaim.selector);
  }

  async selectReasonSystemTechnicalError() {
    await super.clickBySelector(inputs.refundReason.systemTechnicalErrorReason.selector);
  }

  async submit() {
    await super.retryClickContinue(async () => this.expectNoSubheading(inputs.refundReason.label));
  }
}
