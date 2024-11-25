import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  question,
  hintText,
  yesNoRadioButtons,
} from './defendant-response-mediation-availability-content.ts';

@AllMethodsStep()
export default class DefendantResponseMediationAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(question),
      super.expectText(hintText),
      super.expectRadioButton(yesNoRadioButtons),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
