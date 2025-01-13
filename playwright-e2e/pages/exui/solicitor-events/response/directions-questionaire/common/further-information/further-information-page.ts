import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import Party from "../../../../../../../enums/party.ts";
import {
  subheadings,
  getRadioButtons,
  getReasonForFutureApplications,
  getfurtherInformationForm,
} from './further-information-content.ts';

@AllMethodsStep()
export default class FurtherInformationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

async verifyContent(ccdCaseData: CCDCaseData){
  await super.runVerifications([
    super.verifyHeadings(ccdCaseData),
    super.expectText(subheadings.information, {ignoreDuplicates: true}),
  ]);
}
  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.party).yes.selector);
    await super.inputText('test', getReasonForFutureApplications(this.party).selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party).no.selector);
  }

  async inputFurtherInformation() {
    await super.inputText('test', getfurtherInformationForm(this.party).selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
