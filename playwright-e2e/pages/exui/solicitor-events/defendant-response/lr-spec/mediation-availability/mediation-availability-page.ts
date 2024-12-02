import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, yesNoRadioButtons } from './mediation-availability-content.ts';

@AllMethodsStep()
export default class MediationAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(yesNoRadioButtons.text.question),
      super.expectText(yesNoRadioButtons.text.hint),
      super.expectLabel(yesNoRadioButtons.radioYes.text),
      super.expectLabel(yesNoRadioButtons.radioNo.text),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(yesNoRadioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
