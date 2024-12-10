import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import { inputs, paragraph, radioButtons } from './draw-directions-order-content';

@AllMethodsStep()
export default class DrawDirectionsOrderPage extends ExuiEvent(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    await super.wait(10000);
    await super.runVerifications([
      super.expectText(paragraph),
      super.expectLabel(radioButtons.yes.label),
      super.expectLabel(radioButtons.no.label),
      super.expectNoText(inputs.judgementSum.label),
    ]);
  }

  async enterSumOfDamages() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.expectLabel(inputs.judgementSum.label);
    await super.inputText('100', inputs.judgementSum.selector);
  }

  async enterNoSumOfDamages() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
