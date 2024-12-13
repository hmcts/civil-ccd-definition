import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, selectors, subHeadings } from './claim-interest-spec-content';

@AllMethodsStep()
export default class ClaimInterestSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.claimInterest),
      super.expectText(labels.claimInterestInfo),
      super.expectSelector(selectors.claimInterestYesLabel),
      super.expectSelector(selectors.claimInterestNoInput),
    ]);
  }

  async clickNoForClaimInterest() {
    await super.clickBySelector(selectors.claimInterestNoInput);
  }

  async submit() {
    await super.clickSubmit();
  }
}
