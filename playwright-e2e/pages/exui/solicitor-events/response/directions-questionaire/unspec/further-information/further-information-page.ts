import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { heading, radioButtons, form } from './further-information-content.ts';

@AllMethodsStep()
export default class FurtherInformationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector(this.party));
    await super.inputText('test', form.whatForForm.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector(this.party));
  }

  async inputFurtherInformation() {
    await super.inputText('test', form.furtherInformationForm.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
