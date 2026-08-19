import BasePage from '../../../../../base/base-page';
import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, inputs, radioButtons } from './review-refund-details-content';

@AllMethodsStep()
export default class ReviewRefundDetailsPage extends ExuiRefundsPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.reviewRefundDetails),
      super.expectLegend(radioButtons.refundAction.legend),
      super.expectSelector(radioButtons.refundAction.approve.selector),
      super.expectText(radioButtons.refundAction.approve.hint),
      super.expectSelector(radioButtons.refundAction.reject.selector),
      super.expectText(radioButtons.refundAction.reject.hint),
      super.expectSelector(radioButtons.refundAction.returnToCaseworker.selector),
      super.expectText(radioButtons.refundAction.returnToCaseworker.hint),
    ]);
  }

  async approve() {
    await super.clickBySelector(radioButtons.refundAction.approve.selector);
  }

  async reject() {
    await super.clickBySelector(radioButtons.refundAction.reject.selector);
    await super.clickBySelector(radioButtons.refundRejectReason.noAssociatedPayment.selector);
  }

  async returnToCaseworker() {
    await super.clickBySelector(radioButtons.refundAction.returnToCaseworker.selector);
    await super.inputText('Test Comments', inputs.returnNote.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
