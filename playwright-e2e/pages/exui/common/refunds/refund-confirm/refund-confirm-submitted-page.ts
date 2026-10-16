import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { headings, paragraphs } from './refund-confirm-content';

@AllMethodsStep()
export default class RefundConfirmSubmittedPage extends BasePage {
  async verifyContent() {
    await super.expectHeading(headings.refundSubmitted);
    await super.expectText(paragraphs.refundReference, { exact: false });
  }
}
