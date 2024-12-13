import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { tableHeaders } from './claim-amount-details-spec-content';

@AllMethodsStep()
export default class ClaimAmountDetailsSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(tableHeaders.description, { ignoreDuplicates: true }),
      super.expectText(tableHeaders.amount, { ignoreDuplicates: true }),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
