import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  radioButtons,
  radioButtons1v2,
  form,
  dayMonthYear,
  howWasThisPaidRadioButtons,
} from './why-does-defendant-not-owe-money-content.ts';

@AllMethodsStep()
export default class WhyDoesDefendantNotOweMoneyPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.radioHasPaid.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.radioDisputesClaim.label, { ignoreDuplicates: true }),
    ]);
  }
  async verifyContent1v2(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons1v2.radioHasPaid.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons1v2.radioDisputesClaim.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectHasPaid() {
    await super.clickBySelector(radioButtons.radioHasPaid.selector);
  }

  async selectDisputesClaim() {
    await super.clickBySelector(radioButtons.radioDisputesClaim.selector);
  }

  async selectHasPaid1v2() {
    await super.clickBySelector(radioButtons1v2.radioHasPaid.selector);
  }

  async selectDisputesClaim1v2() {
    await super.clickBySelector(radioButtons1v2.radioDisputesClaim.selector);
  }

  async fillInHasPaid() {
    await super.inputText('1500', form.selector);
    await super.inputText('01', dayMonthYear.day.selector);
    await super.retryAction(
      () => super.inputText('01', dayMonthYear.day.selector),
      () => Promise.resolve(),
      'Retrying input text for day',
      { retries: 3 },
    );
    await super.inputText('01', dayMonthYear.month.selector);
    await super.inputText('2021', dayMonthYear.year.selector);
  }

  async selectCreditCard() {
    await super.clickBySelector(howWasThisPaidRadioButtons.radioCreditCard.selector);
    await super.retryClickBySelector(
      howWasThisPaidRadioButtons.radioCreditCard.selector,
      () => Promise.resolve(),
      { retries: 2 },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
