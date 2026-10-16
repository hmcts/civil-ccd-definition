import BasePage from '../../../../../base/base-page.ts';
import ExuiRefundsPage from '../../../mixin-pages/exui-refunds-page/exui-refunds-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings, subheadings, inputs } from './process-refund-content.ts';

@AllMethodsStep()
export default class ProcessRefund1Page extends ExuiRefundsPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.processRefund),
      super.expectSubheading(subheadings.selectFeesToBeRefunded, { headingLevel: 3 })
    ]);
  }

  async selectFeeToBeRefunded() {
    await super.clickBySelector(inputs.organisationFee.selector);
  }

  async submit() {
    await super.retryClickContinue(async () => this.expectNoSubheading(subheadings.selectFeesToBeRefunded, { headingLevel: 3 }));
  }
}
