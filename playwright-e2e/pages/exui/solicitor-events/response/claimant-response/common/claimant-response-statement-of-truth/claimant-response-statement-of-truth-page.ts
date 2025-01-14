import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { paragraphs } from './claimant-response-statement-of-truth-content.ts';
import StatementOfTruthFragment from '../../../../../fragments/statement-of-truth/statement-of-truth-fragment.ts';

@AllMethodsStep()
export default class ClaimantResponseStatementOfTruthPage extends ExuiPage(BasePage) {
  private statementOfTruthFragment: StatementOfTruthFragment;

  constructor(page: Page, statementOfTruthFragment: StatementOfTruthFragment) {
    super(page);
    this.statementOfTruthFragment = statementOfTruthFragment;
  }
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.statementOfTruthFragment.verifyContent(),
      super.expectText(paragraphs.descriptiveText1),
      super.expectText(paragraphs.descriptiveText2),
    ]);
  }

  async enterDetails() {
    await this.statementOfTruthFragment.enterDetails('Claimant Solicitor', 'Solicitor');
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
