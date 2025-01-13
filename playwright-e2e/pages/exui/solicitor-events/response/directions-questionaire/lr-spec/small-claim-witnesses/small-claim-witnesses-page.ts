import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getButtons, getInputs, getRadioButtons } from './small-claim-witnesses-content.ts';

@AllMethodsStep()
export default class SmallClaimWitnessesPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons.radioYes.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons.radioNo.selector(this.party));
  }

  async addWitnesses() {
    await super.clickBySelector(getButtons.addNewExpert.selector(this.party));
  }

  async enterWitnessDetails(witnessNumber: number) {
    await super.inputText(
      'First name',
      getInputs.fields.firstName.selector(this.party, witnessNumber),
    );
    await super.inputText(
      'Last name',
      getInputs.fields.lastName.selector(this.party, witnessNumber),
    );
    await super.inputText(
      'firstlast@gmail.com',
      getInputs.fields.email.selector(this.party, witnessNumber),
    );
    await super.inputText('Event', getInputs.fields.whatEvent.selector(this.party, witnessNumber));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
