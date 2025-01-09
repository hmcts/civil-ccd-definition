import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons, getInputs } from './defence-route-content.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class DefenceRoutePage extends ExuiPage(BasePage) {
  private defendantNumber?: number;

  constructor(page: Page, defendantNumber?: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectLabel(getRadioButtons(this.defendantNumber).defenceRoute.hasPaid.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).defenceRoute.disputesClaim.label),
      ],
      { pageInsertName: this.defendantNumber ? 'Defendant2' : '' },
    );
  }

  async selectHasPaid() {
    await super.clickBySelector(
      getRadioButtons(this.defendantNumber).defenceRoute.hasPaid.selector,
    );
  }

  async selectDisputesClaim() {
    await super.clickBySelector(
      getRadioButtons(this.defendantNumber).defenceRoute.disputesClaim.selector,
    );
  }

  async fillInHasPaid() {
    const datePaid = DateHelper.subtractFromToday({ months: 1 });
    await super.inputText('500', getInputs(this.defendantNumber).amountPaid.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(datePaid),
      getInputs(this.defendantNumber).amountPaidDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(datePaid),
      getInputs(this.defendantNumber).amountPaidDate.month.selector,
    );
    await super.inputText(
      datePaid.getFullYear(),
      getInputs(this.defendantNumber).amountPaidDate.year.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
