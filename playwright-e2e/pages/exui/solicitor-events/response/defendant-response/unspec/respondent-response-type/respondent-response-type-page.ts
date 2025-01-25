import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './respondent-response-type-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { Party } from '../../../../../../../models/partys.ts';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class RespondentResponseTypePage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.rejectAll.label, {index: 0}),
      super.expectLabel(radioButtons.admitAll.label, {index: 0}),
      super.expectLabel(radioButtons.partAdmit.label, {index: 0}),
      super.expectLabel(radioButtons.counterClaim.label, {index: 0}),
    ]);
  }

  async selectRejectAll() {
    await super.clickBySelector(radioButtons.rejectAll.selector(this.defendantParty));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
