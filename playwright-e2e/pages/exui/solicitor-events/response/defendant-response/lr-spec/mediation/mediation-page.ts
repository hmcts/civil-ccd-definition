import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './mediation-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class MediationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectLabel(radioButtons.yesMediation.label),
        super.expectLabel(radioButtons.yesMediation.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yesMediation.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.noMediation.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
