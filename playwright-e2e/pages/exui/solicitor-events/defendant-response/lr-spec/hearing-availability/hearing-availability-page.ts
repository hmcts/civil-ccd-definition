import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  availabilityQuestion,
  interpreterQuestion,
} from './hearing-availability-content.ts';

@AllMethodsStep()
export default class HearingAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      //super.expectHeading(heading),
      super.expectText(availabilityQuestion.question, { ignoreDuplicates: true }),
      super.expectText(availabilityQuestion.hint, { ignoreDuplicates: true }),
      super.expectText(interpreterQuestion.label.question, { ignoreDuplicates: true }),
    ]);
  }

  async selectYesAvailability() {
    await super.clickBySelector(availabilityQuestion.radioYes.selector);
  }

  async selectNoAvailability() {
    await super.clickBySelector(availabilityQuestion.radioNo.selector);
  }

  async selectYesInterpreter() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreter() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
