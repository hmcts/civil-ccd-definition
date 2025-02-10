import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons, form } from './further-information-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class FurtherInformationPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.furtherInformation, { index: 0 }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector(this.claimantDefendantParty));
    await super.inputText(
      `Further information - ${this.claimantDefendantParty.key}`,
      form.whatForForm.selector(this.claimantDefendantParty),
    );
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector(this.claimantDefendantParty));
  }

  async enterFurtherInformation() {
    await super.inputText(
      'test',
      form.furtherInformationForm.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
