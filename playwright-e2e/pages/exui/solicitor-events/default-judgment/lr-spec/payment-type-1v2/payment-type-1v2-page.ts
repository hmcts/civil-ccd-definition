import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons } from './payment-type-1v2-content.ts';

@AllMethodsStep()
export default class PaymentType1v2Page extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.paymentType),
    ]);
  }

  async selectImmediatePayment() {
    await super.clickBySelector(radioButtons.paymentType.immediately.selector);
  }

  async selectSetPaymentDate() {
    await super.clickBySelector(radioButtons.paymentType.setDate.selector);
  }

  async selectRepaymentPlan() {
    await super.clickBySelector(radioButtons.paymentType.repaymentPlan.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
