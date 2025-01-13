import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './respondent-response-type-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../../constants/partys.ts';
import { Party } from '../../../../../../../models/partys.ts';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class RespondentResponseTypePage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.rejectAll.label),
      super.expectLabel(radioButtons.admitAll.label),
      super.expectLabel(radioButtons.partAdmit.label),
      super.expectLabel(radioButtons.counterClaim.label),
    ]);
  }

  async selectRejectAll() {
    await super.clickBySelector(radioButtons.rejectAll.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
