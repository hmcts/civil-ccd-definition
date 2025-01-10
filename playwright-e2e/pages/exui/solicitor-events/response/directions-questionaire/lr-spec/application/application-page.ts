import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons, getForms } from './application-content.ts';

@AllMethodsStep()
export default class ApplicationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.party).yes.selector);
    await super.inputText('test', getForms(this.party).whatForForm.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party).no.selector);
  }

  async enterAdditionalInformation() {
    await super.inputText('test', getForms().otherInformationForm.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
