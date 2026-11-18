import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page';
import { radioButtons, subheadings, paragraphs, inputs } from './same-rate-interest-selection-content';

@AllMethodsStep()
export default class SameRateInterestSelectionPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.whatInterest),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async selectEightPercent() {
    await super.clickBySelector(radioButtons.sameRateInterestSelection.eightPercent.selector);
  }

  async selectDifferentRate() {
    await super.clickBySelector(radioButtons.sameRateInterestSelection.differentRate.selector);
  }

  async enterDifferentRate() {
    await super.inputText('10', inputs.differentRate.selector);
  }

  async enterDifferentRateReason() {
    await super.inputText('Different rate reason', inputs.differentRateReason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
