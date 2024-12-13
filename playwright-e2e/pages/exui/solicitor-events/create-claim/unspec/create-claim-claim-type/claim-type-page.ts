import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, radioButtons } from './claim-type-content';

@AllMethodsStep()
export default class ClaimTypePage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(labels.claimType),
      super.expectSelector(radioButtons.claimTypeUnSpec.personalInjury),
      super.expectSelector(radioButtons.claimTypeUnSpec.clinicalNegligence),
      super.expectSelector(radioButtons.claimTypeUnSpec.professionalNegligence),
      super.expectSelector(radioButtons.claimTypeUnSpec.breachOfContract),
      super.expectSelector(radioButtons.claimTypeUnSpec.consumer),
      super.expectSelector(radioButtons.claimTypeUnSpec.consumerCredit),
      super.expectSelector(radioButtons.claimTypeUnSpec.other),
    ]);
  }

  async selectClaimType() {
    await super.clickBySelector(radioButtons.claimTypeUnSpec.personalInjury);
  }

  async submit() {
    await super.clickSubmit();
  }
}
