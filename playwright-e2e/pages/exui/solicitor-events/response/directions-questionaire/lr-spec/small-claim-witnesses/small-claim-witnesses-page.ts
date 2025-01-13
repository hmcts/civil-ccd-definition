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
    await super.clickBySelector(getRadioButtons(this.party).radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party).radioNo.selector);
  }

  async addWitnesses() {
    await super.clickBySelector(getButtons(this.party).addNewExpert.selector);
  }

  async enterWitnessDetails(witnessNumber: number) {
    await super.inputText(
      'First name',
      getInputs(this.party, witnessNumber).fields.firstName.selector,
    );
    await super.inputText(
      'Last name',
      getInputs(this.party, witnessNumber).fields.lastName.selector,
    );
    await super.inputText(
      'firstlast@gmail.com',
      getInputs(this.party, witnessNumber).fields.email.selector,
    );
    await super.inputText('Event', getInputs(this.party, witnessNumber).fields.whatEvent.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
