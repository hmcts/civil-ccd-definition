import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import StatementOfTruthFragment from '../../../../fragments/statement-of-truth/statement-of-truth-fragment.ts';
import { heading } from './statement-of-truth-create-claim-content.ts';

@AllMethodsStep()
export default class StatementOfTruthCreateClaimPage extends ExuiPage(BasePage) {
  private statementOfTruthFragment: StatementOfTruthFragment;

  constructor(page: Page, statementOfTruthFragment: StatementOfTruthFragment) {
    super(page);
    this.statementOfTruthFragment = statementOfTruthFragment;
  }

  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async enterDetails() {
    await this.statementOfTruthFragment.enterDetails();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
