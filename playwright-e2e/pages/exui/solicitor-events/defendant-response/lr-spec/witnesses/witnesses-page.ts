import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  subheading,
  witnessesRadioButtonsFastTrack,
  witnessesRadioButtonsSmallTrack,
  witnessesRadioButtonsSmallTrack1v2,
  witnessesRadioButtonsFastTrack1v2,
} from './witnesses-content.ts';

@AllMethodsStep()
export default class WitnessesPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesSmallTrack() {
    await super.clickBySelector(witnessesRadioButtonsSmallTrack.radioYes.selector);
  }

  async selectNoSmallTrack() {
    await super.clickBySelector(witnessesRadioButtonsSmallTrack.radioNo.selector);
  }

  async selectYesFastTrack() {
    await super.clickBySelector(witnessesRadioButtonsFastTrack.radioYes.selector);
  }

  async selectNoFastTrack() {
    await super.clickBySelector(witnessesRadioButtonsFastTrack.radioNo.selector);
  }

  async selectYesSmallTrack1v2() {
    await super.clickBySelector(witnessesRadioButtonsSmallTrack1v2.radioYes.selector);
  }

  async selectNoSmallTrack1v2() {
    await super.clickBySelector(witnessesRadioButtonsSmallTrack1v2.radioNo.selector);
  }

  async selectYesFastTrack1v2() {
    await super.clickBySelector(witnessesRadioButtonsFastTrack1v2.radioYes.selector);
  }

  async selectNoFastTrack1v2() {
    await super.clickBySelector(witnessesRadioButtonsFastTrack1v2.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
