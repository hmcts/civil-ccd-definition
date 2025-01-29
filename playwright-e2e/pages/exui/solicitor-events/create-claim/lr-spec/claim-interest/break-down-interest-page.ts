import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subheadings, paragraphs, inputs } from './break-down-interest-content';

@AllMethodsStep()
export default class BreakDownInterestPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.breakDownInterest),
      super.expectText(paragraphs.breakDownInterestDescriptionText),
    ]);
  }

  async enterBreakDownInterestTotal() {
    await super.inputText('1000', inputs.breakDownInterestTotal.selector);
  }

  async enterBreakDownInterestDescription() {
    await super.inputText('Test calculation', inputs.breakDownInterestDescription.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
