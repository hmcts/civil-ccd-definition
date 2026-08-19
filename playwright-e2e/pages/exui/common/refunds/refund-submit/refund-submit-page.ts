import BasePage from '../../../../../base/base-page';
import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { containers, headings, links } from './refund-submit-content';

@AllMethodsStep()
export default class RefundSubmitPage extends ExuiRefundsPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(headings.checkYourAnswers)]);
  }

  async changeReason() {
    await super.clickBySelector(links.change.selector, {
      containerSelector: containers.refundReason.selector,
    });
    await super.expectNoHeading(headings.checkYourAnswers);
  }

  async submit() {
    await super.retryClickSubmitRefund(() => this.expectNoHeading(headings.checkYourAnswers));
  }
}
