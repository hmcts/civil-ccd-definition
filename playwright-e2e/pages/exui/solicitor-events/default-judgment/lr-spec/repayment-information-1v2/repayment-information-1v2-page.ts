import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons } from './repayment-information-1v2-content.ts';
import DateFragment from '../../../../fragments/date/date-fragment';

@AllMethodsStep()
export default class RepaymentInformation1v2Page extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.repaymentInformation),
    ]);
  }

  async selectWeeklyRepayments() {
    await super.clickBySelector(radioButtons.howOften.everyWeek.selector);
  }

  async selectBiWeeklyRepayments() {
    await super.clickBySelector(radioButtons.howOften.every2Weeks.selector);
  }

  async selectMonthlyRepayments() {
    await super.clickBySelector(radioButtons.howOften.everyMonth.selector);
  }

  async firstInstalmentDate() {
    const setDate = DateHelper.addToToday({ months: 1 });
    await this.dateFragment.enterDate(setDate, inputs.firstInstalment.selectorKey);
  }

  async submit() {
    await super.clickSubmit();
  }
}
