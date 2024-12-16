import BasePage from '../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps.ts';
import ExuiPage from '../../exui-page/exui-page.ts';
import { dob } from './confirm-name-and-address-content.ts';
import CCDCaseData from '../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ConfirmNameAndAddressPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async enterDob(day: number, month: number, year: number) {
    await super.inputText(day, dob.day.selector);
    await super.inputText(month, dob.month.selector);
    await super.inputText(year, dob.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
