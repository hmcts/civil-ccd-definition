import BasePage from '../.../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../.../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../.../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../.../../exui-page/exui-page.ts';
import { date, proceedOnPaperReasonButtons } from './case-proceeds-in-caseman-content.ts';
import DateHelper from "../../../../../helpers/date-helper.ts";
import DateFragment from "../../../fragments/date/date-fragment.ts";
import {Page} from "playwright-core";

@AllMethodsStep()
export default class CaseProceedsInCasemanPage extends ExuiPage(BasePage) {
  private dateFragment : DateFragment

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }


  async enterTodayDate() {
    // const date = DateHelper.subtractFromToday({ months: 6 });
    await this.dateFragment.enterDate(DateHelper.getToday(), date.day);
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
