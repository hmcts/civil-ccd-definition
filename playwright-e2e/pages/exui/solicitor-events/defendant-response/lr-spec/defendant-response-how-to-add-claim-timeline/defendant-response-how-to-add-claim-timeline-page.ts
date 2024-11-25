import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  howToAddClaimTimeline,
  radioButtons,
} from './defendant-response-how-to-add-claim-timeline-selectors';

@AllMethodsStep()
export default class DefendantResponseHowToAddClaimTimeline extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.verifyContent(howToAddClaimTimeline.label),
      super.expectRadioButton(radioButtons.upload),
      super.expectRadioButton(radioButtons.manual),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
