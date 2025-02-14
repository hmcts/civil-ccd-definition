import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons } from './payment-type-content.ts';

@AllMethodsStep()
export default class PaymentTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const defendantName = ccdCaseData.respondent1?.partyName;
    const paymentType = subheadings.paymentType.replace('<name>', defendantName);
    await super.runVerifications([super.verifyHeadings(), super.expectText(paymentType)]);
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
