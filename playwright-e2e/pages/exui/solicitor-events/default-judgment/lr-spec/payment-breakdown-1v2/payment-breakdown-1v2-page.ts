import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, paragraphs } from './payment-breakdown-1v2-content.ts';

@AllMethodsStep()
export default class PaymentBreakdown1v2Page extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.claimAmount),
      super.expectText(subheadings.fixedCostAmount),
      super.expectText(subheadings.claimFeeAmount),
      super.expectText(subheadings.subtotal),
      super.expectText(subheadings.totalStillOwed),
      super.expectText(paragraphs.descriptionTextStart),
      super.expectText(paragraphs.descriptionTextEnd),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
