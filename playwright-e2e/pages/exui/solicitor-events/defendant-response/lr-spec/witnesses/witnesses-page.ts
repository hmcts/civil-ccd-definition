import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, subheading, witnessesRadioButtons } from './witnesses-content.ts';

@AllMethodsStep()
export default class DefendantResponseWitnessesPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(subheading),
      super.expectText(witnessesRadioButtons.text.label),
      super.expectLabel(witnessesRadioButtons.radioYes.label),
      super.expectLabel(witnessesRadioButtons.radioNo.label),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
