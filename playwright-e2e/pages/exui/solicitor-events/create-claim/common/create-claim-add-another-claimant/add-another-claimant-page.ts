import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, selectors } from './add-another-claimant-content.ts';

@AllMethodsStep()
export default class AddAnotherClaimantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(labels.addAnotherClaimant, { ignoreDuplicates: true }),
      super.expectSelector(selectors.addApplicant2No),
    ]);
  }

  async clickAddApplicant2Yes() {
    await super.clickBySelector(selectors.addApplicant2Yes);
  }

  async clickAddApplicant2No() {
    await super.clickBySelector(selectors.addApplicant2No);
  }

  async submit() {
    await super.clickSubmit();
  }
}
