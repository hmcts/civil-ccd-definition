import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  availabilityQuestionSmallTrack,
  interpreterQuestion,
  availabilityQuestionFastTrack,
} from './hearing-availability-content.ts';

@AllMethodsStep()
export default class HearingAvailabilityPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesAvailabilitySmallTrack() {
    await super.clickBySelector(availabilityQuestionSmallTrack.radioYes.selector);
  }

  async selectNoAvailabilitySmallTrack() {
    await super.clickBySelector(availabilityQuestionSmallTrack.radioNo.selector);
  }

  async selectYesInterpreterSmallTrack() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreterSmallTack() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async selectYesAvailabilityFastTrack() {
    await super.clickBySelector(availabilityQuestionFastTrack.radioYes.selector);
  }

  async selectNoAvailabilityFastTrack() {
    await super.clickBySelector(availabilityQuestionFastTrack.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
