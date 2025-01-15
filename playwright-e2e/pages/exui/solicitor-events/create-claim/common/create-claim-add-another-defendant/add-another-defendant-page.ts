import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { selectors } from './add-another-defendant-content.ts';

@AllMethodsStep()
export default class AddAnotherDefendantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSelector(selectors.addRespondent2Yes),
      super.expectSelector(selectors.addRespondent2No),
    ]);
  }

  async clickAddRespondent2Yes() {
    await super.clickBySelector(selectors.addRespondent2Yes);
  }

  async clickAddRespondent2No() {
    await super.clickBySelector(selectors.addRespondent2No);
  }

  async submit() {
    await super.clickSubmit();
  }
}
