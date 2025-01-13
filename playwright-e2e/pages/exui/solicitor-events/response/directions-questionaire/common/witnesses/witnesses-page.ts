import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  subheading,
  witnessesRadioButtonsFastTrack,
  witnessesRadioButtonsSmallTrack,
  witnessesRadioButtonsSmallTrack1v2,
  witnessesRadioButtonsUnspecAndFastTrack1v2,
  addWitnessButton,
  witnessDetails,
} from './witnesses-content.ts';

@AllMethodsStep()
export default class WitnessesPage extends ExuiPage(BasePage) {
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

  async selectYesUnspecAndFastTrack1v2(defendantNumber: number) {
    await super.clickBySelector(
      witnessesRadioButtonsUnspecAndFastTrack1v2(defendantNumber).radioYes.selector,
    );
  }

  async selectNoUnspecAndFastTrack1v2(defendantNumber: number) {
    await super.clickBySelector(
      witnessesRadioButtonsUnspecAndFastTrack1v2(defendantNumber).radioNo.selector,
    );
  }

  async addWitnesses(defendantNumber: number) {
    await super.clickBySelector(addWitnessButton(defendantNumber).addNewExpert.selector);
  }

  async enterWitnessDetails(defendantNumber: number, witnessNumber: number) {
    await super.inputText(
      'First name',
      witnessDetails(defendantNumber, witnessNumber).fields.firstName.selector,
    );
    await super.inputText(
      'Last name',
      witnessDetails(defendantNumber, witnessNumber).fields.lastName.selector,
    );
    await super.inputText(
      'firstlast@gmail.com',
      witnessDetails(defendantNumber, witnessNumber).fields.email.selector,
    );
    await super.inputText(
      'Event',
      witnessDetails(defendantNumber, witnessNumber).fields.whatEvent.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
