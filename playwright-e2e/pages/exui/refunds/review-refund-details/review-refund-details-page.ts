import BasePage from '../../../../base/base-page';
import ExuiServiceRequestPage from '../../mixin-pages/exui-service-request-page/exui-service-request-page.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { headings, inputs, radioButtons } from './review-refund-details-content';

@AllMethodsStep()
export default class ReviewRefundDetailsPage extends ExuiServiceRequestPage(BasePage) {
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
    await super.runVerifications([
      super.expectSelector(radioButtons.refundRejectReason.noAssociatedPayment.selector),
      super.expectSelector(radioButtons.refundRejectReason.alreadyRefunded.selector),
      super.expectSelector(
        radioButtons.refundRejectReason.caseDetailsDontMatchHelpWithFeesDetails.selector,
      ),
      super.expectSelector(radioButtons.refundRejectReason.moreEvidenceRequired.selector),
      super.expectSelector(radioButtons.refundRejectReason.other.selector),
    ]);
    await super.clickBySelector(radioButtons.refundRejectReason.noAssociatedPayment.selector);
  }

  async returnToCaseworker() {
    await super.clickBySelector(radioButtons.refundAction.returnToCaseworker.selector);
    await super.inputText('Automation Test Comments', inputs.returnNote.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
