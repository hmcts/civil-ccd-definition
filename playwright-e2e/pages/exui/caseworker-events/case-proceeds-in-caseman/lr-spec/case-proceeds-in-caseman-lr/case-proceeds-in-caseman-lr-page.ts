import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { date, proceedOnPaperReasonButtons } from './case-proceeds-in-caseman-lr-content.ts';

@AllMethodsStep()
export default class CaseProceedsInCasemanLRPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async enterDate() {
    await super.inputText('01', date.day);
    await super.inputText('01', date.month);
    await super.inputText('2022', date.year);
  }

  async selectProceedOnPaperReasonApplication() {
    await super.clickBySelector(proceedOnPaperReasonButtons.application);
  }

  async selectProceedOnPaperReasonJudgmentRequest() {
    await super.clickBySelector(proceedOnPaperReasonButtons.judgmentRequest);
  }

  async selectProceedOnPaperReasonDefendantSolDoesNotConsent() {
    await super.clickBySelector(proceedOnPaperReasonButtons.defendantSolDoesNotConsent);
  }

  async selectProceedOnPaperReasonCaseSettled() {
    await super.clickBySelector(proceedOnPaperReasonButtons.caseSettled);
  }

  async selectProceedOnPaperReasonOtherAndFillText() {
    await super.clickBySelector(proceedOnPaperReasonButtons.other.selector);
    await super.inputText('Other reason', proceedOnPaperReasonButtons.other.textAreaSelector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
