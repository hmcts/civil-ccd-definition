import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  radioButtons,
} from './defendant-response-why-does-defendant-not-owe-money-content';

@AllMethodsStep()
export default class DefendantResponseWhyDoesDefendantNotOweMoneyPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(radioButtons.label),
      super.expectRadioButton(radioButtons.hasPaid),
      super.expectRadioButton(radioButtons.disputesClaim),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
