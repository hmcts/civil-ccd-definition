import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons } from './add-another-claimant-content.ts';

@AllMethodsStep()
export default class AddAnotherClaimantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectLegend(radioButtons.addAnotherClaimant.label, { count: 1 }),
      super.expectYesLabel(radioButtons.addAnotherClaimant.yes.selector),
      super.expectNoLabel(radioButtons.addAnotherClaimant.no.selector),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.addAnotherClaimant.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.addAnotherClaimant.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
