import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, subHeadings } from './pba-number-content.ts';

@AllMethodsStep()
export default class PbaNumberPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.claimFee),
      super.expectText(labels.amountToPay),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
