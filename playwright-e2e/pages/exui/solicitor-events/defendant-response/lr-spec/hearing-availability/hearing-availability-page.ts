import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  availabilityQuestionSmallTrack,
  interpreterQuestion,
  availabilityQuestionFastTrack,
  availabilityQuestionSmallTrack1v2,
  availabilityQuestion2v1,
  interpreterQuestion1v2,
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

  async selectYesAvailability2v1() {
    await super.clickBySelector(availabilityQuestion2v1.radioYes.selector);
  }

  async selectNoAvailability2v1() {
    await super.clickBySelector(availabilityQuestion2v1.radioNo.selector);
  }

  async selectYesInterpreterSmallTrack() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreterSmallTack() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async selectYesAvailabilityFastTrack(defendantNumber: number) {
    await super.clickBySelector(availabilityQuestionFastTrack(defendantNumber).radioYes.selector);
  }

  async selectNoAvailabilityFastTrack(defendantNumber: number) {
    await super.clickBySelector(availabilityQuestionFastTrack(defendantNumber).radioNo.selector);
  }

  async selectYesInterpreterFastTrack() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreterFastTrack() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async selectYesAvailabilitySmallTrack1v2() {
    await super.clickBySelector(availabilityQuestionSmallTrack1v2.radioYes.selector);
  }

  async selectNoAvailabilitySmallTrack1v2() {
    await super.clickBySelector(availabilityQuestionSmallTrack1v2.radioNo.selector);
  }

  async selectYesInterpreterSmallTrack1v2() {
    await super.clickBySelector(interpreterQuestion1v2.radioYes.selector);
  }

  async selectNoInterpreterSmallTack1v2() {
    await super.clickBySelector(interpreterQuestion1v2.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
