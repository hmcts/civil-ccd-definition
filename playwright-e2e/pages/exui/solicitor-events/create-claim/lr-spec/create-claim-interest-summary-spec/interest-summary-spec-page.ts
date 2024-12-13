import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subHeadings, tableHeadings } from './interest-summary-spec-content';

@AllMethodsStep()
export default class InterestSummarySpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.totalAmountOfClaim),
      super.expectText(tableHeadings.description, { ignoreDuplicates: true }),
      super.expectText(tableHeadings.amount, { ignoreDuplicates: true }),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
