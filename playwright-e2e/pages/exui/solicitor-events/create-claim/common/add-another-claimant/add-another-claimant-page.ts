import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons } from './add-another-claimant-content.ts';

@AllMethodsStep()
export default class AddAnotherClaimantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(radioButtons.addAnotherClaimant.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.addAnotherClaimant.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.addAnotherClaimant.no.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
