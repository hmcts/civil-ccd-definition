import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import Party from "../../../../../../../enums/party.ts";
import {
  subHeadings,
  getWitnessesRadioButtonsFastTrack,
  getWitnessesRadioButtonsSmallTrack,
  getWitnessesRadioButtonsSmallTrack1v2,
  getWitnessesRadioButtonsUnspecAndFastTrack1v2,
  addWitnessButton,
  witnessDetails,
} from './witnesses-content.ts';

@AllMethodsStep()
export default class WitnessesPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }
  async selectYesSmallTrack() {
    await super.clickBySelector(getWitnessesRadioButtonsSmallTrack(this.party).radioYes.selector);
  }

  async selectNoSmallTrack() {
    await super.clickBySelector(getWitnessesRadioButtonsSmallTrack(this.party).radioNo.selector);
  }

  async selectYesFastTrack() {
    await super.clickBySelector(getWitnessesRadioButtonsFastTrack(this.party).radioYes.selector);
  }

  async selectNoFastTrack() {
    await super.clickBySelector(getWitnessesRadioButtonsFastTrack(this.party).radioNo.selector);
  }

  async selectYesSmallTrack1v2() {
    await super.clickBySelector(getWitnessesRadioButtonsSmallTrack1v2(this.party).radioYes.selector);
  }

  async selectNoSmallTrack1v2() {
    await super.clickBySelector(getWitnessesRadioButtonsSmallTrack1v2(this.party).radioNo.selector);
  }



  async selectNoUnspecAndFastTrack1v2() {
    await super.clickBySelector(
      getWitnessesRadioButtonsUnspecAndFastTrack1v2(this.party).radioNo.selector,
    );
  }

  async addWitnesses() {
    await super.clickBySelector(addWitnessButton(this.party).addNewExpert.selector);
  }

  async enterWitnessDetails(witnessNumber: number) {
    await super.inputText(
      'First name',
      witnessDetails(this.party, witnessNumber).fields.firstName.selector,
    );
    await super.inputText(
      'Last name',
      witnessDetails(this.party, witnessNumber).fields.lastName.selector,
    );
    await super.inputText(
      'firstlast@gmail.com',
      witnessDetails(this.party, witnessNumber).fields.email.selector,
    );
    await super.inputText(
      'Event',
      witnessDetails(this.party, witnessNumber).fields.whatEvent.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
