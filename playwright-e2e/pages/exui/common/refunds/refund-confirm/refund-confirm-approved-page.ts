import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings } from './refund-confirm-content';

@AllMethodsStep()
export default class RefundConfirmApprovedPage extends BasePage {
  async verifyContent() {
    await super.expectHeading(headings.refundApproved);
  }
}
