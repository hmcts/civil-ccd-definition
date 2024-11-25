import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  heading,
  subheading,
  witnessesRadioButtons,
} from './defendant-response-witnesses-content-content.ts';

@AllMethodsStep()
export default class DefendantResponseWitnessesPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(subheading),
      super.expectText(witnessesRadioButtons.label),
      super.expectRadioButton(witnessesRadioButtons.yes),
      super.expectRadioButton(witnessesRadioButtons.no),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
