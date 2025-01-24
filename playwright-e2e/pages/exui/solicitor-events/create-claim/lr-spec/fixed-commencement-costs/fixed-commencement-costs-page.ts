import BasePage from '../../../../../../base/base-page';
import partys from '../../../../../../constants/partys';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { inputs, subheadings, radioButtons } from './fixed-commencement-costs-content';

@AllMethodsStep()
export default class FixedCommencementCostsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subheadings.fixedCosts),
      super.expectText(radioButtons.fixedCosts.label),
    ]);
  }

  async selectYesAndEnterAmount() {
    await super.clickBySelector(radioButtons.fixedCosts.yes.selector);
    await super.inputText('80', inputs.fixedCosts.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.fixedCosts.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
