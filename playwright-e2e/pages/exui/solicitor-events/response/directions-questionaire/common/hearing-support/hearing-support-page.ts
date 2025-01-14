import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, getRadioButtons } from './hearing-support-content.ts';
import Party from "../../../../../../../enums/party.ts";

@AllMethodsStep()
export default class HearingSupportPage extends ExuiPage(BasePage) {
  private party: Party;

constructor(page: Page, party: Party) {
  super(page);
  this.party = party;
}

async verifyContent(ccdCaseData: CCDCaseData)  {
  await super.runVerifications([
    super.verifyHeadings(ccdCaseData),
    super.expectHeading(subheadings.supportNeeds),
    super.expectText(getRadioButtons(this.party).text.label),
    super.expectText(getRadioButtons(this.party).supportRequirement.label),
  ]);
}

  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.party).radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party).radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
