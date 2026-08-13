import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { headings, subheadings, buttons } from './refund-details-content';

@AllMethodsStep()
export default class RefundDetailsPage extends BasePage {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(headings.refundDetails),
      super.expectText(subheadings.notifcationsSent),
      super.expectText(subheadings.refundStatusHistory),
    ]);
  }

  async changeRefundDetails() {
    await super.clickButtonByName(buttons.changeRefundDetails.title);
  }
}
