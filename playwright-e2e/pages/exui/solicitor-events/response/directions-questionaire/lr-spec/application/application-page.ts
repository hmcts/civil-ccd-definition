import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons, inputs, subheadings } from './application-content.ts';
import { Party } from '../../../../../../../models/partys.ts';

@AllMethodsStep()
export default class ApplicationPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.claimantDefendantParty = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.application),
      super.expectText(inputs.otherInformation.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.application.yes.selector(this.claimantDefendantParty));
    await super.inputText('test', inputs.whatFor.selector(this.claimantDefendantParty));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.application.no.selector(this.claimantDefendantParty));
  }

  async enterAdditionalInformation() {
    await super.inputText('test', inputs.otherInformation.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
