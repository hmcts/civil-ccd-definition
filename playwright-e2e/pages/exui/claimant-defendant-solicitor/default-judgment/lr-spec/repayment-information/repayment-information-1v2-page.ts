import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons } from './repayment-information-content.ts';
import DateFragment from '../../../../fragments/date/date-fragment';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RepaymentInformation1v2Page extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subheadings.instalments1v2),
    ]);
  }

  async selectEveryWeek() {
    await super.clickBySelector(radioButtons.howOften.everyWeek.selector);
  }

  async selectEvery2Weeks() {
    await super.clickBySelector(radioButtons.howOften.every2Weeks.selector);
  }

  async selectEveryMonth() {
    await super.clickBySelector(radioButtons.howOften.everyMonth.selector);
  }

  async firstInstalmentDate() {
    const setDate = DateHelper.addToToday({ months: 1 });
    await this.dateFragment.enterDate(setDate, inputs.firstInstalmentDate.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
