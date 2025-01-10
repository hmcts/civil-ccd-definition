import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getInputs, getRadioButtons } from './small-claim-experts-content.ts';

@AllMethodsStep()
export default class SmallClaimExpertsPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async useExperts() {
    await super.clickBySelector(getRadioButtons.yes.selector);
  }

  async useNoExperts() {
    await super.clickBySelector(getRadioButtons.no.selector);
  }

  async enterExpertDetails() {
    await super.inputText('Test', getInputs.firstName.selector);
    await super.inputText('Test', getInputs.lastName.selector);
    await super.inputText('1234567890', getInputs.phoneNumber.selector);
    await super.inputText('test@gmail.com', getInputs.email.selector);
    await super.inputText('Test', getInputs.expertise.selector);
    await super.inputText('Test', getInputs.whyRequired.selector);
    await super.inputText('100', getInputs.estimatedCost.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
