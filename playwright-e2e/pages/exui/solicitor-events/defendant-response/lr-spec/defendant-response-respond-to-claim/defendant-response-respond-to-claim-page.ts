import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading, radioButtons } from './defendant-response-respond-to-claim-content.ts';

@AllMethodsStep()
export default class DefendantResponseRespondToClaimPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(radioButtons.label),
      super.expectRadioButton(radioButtons.defends),
      super.expectRadioButton(radioButtons.admitsAll),
      super.expectRadioButton(radioButtons.admitsPart),
      super.expectRadioButton(radioButtons.defendsAndWantsCounterclaim),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
