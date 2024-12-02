import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  availabilityQuestion,
  interpreterQuestion,
} from './hearing-availability-content.ts';

@AllMethodsStep()
export default class HearingAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(availabilityQuestion.question),
      super.expectText(availabilityQuestion.hint),
      super.expectLabel(availabilityQuestion.answer.yes.label),
      super.expectLabel(availabilityQuestion.answer.no.label),
      super.expectText(interpreterQuestion.label.question),
      super.expectLabel(interpreterQuestion.radioYes.label),
      super.expectLabel(interpreterQuestion.radioNo.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
