import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons, subheadings } from './interest-claim-from-content';

@AllMethodsStep()
export default class InterestClaimFromPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.interestClaimFrom),
    ]);
  }

  async selectFromClaimSubmitDate() {
    await super.clickBySelector(radioButtons.interestClaimFrom.fromClaimSubmitDate.selector);
  }

  async selectfromASpecificDate() {
    await super.clickBySelector(radioButtons.interestClaimFrom.fromSpecificDate.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}