import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  subheadings,
  radioButtons,
  inputs,
} from '../claim-partial-payment/claim-partial-payment-content.ts';

@AllMethodsStep()
export default class ClaimPartialPayment1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subheadings.hasPaid1v2),
    ]);
  }

  async selectYesPartialPayment() {
    await super.clickBySelector(radioButtons.partialPayment.yes.selector);
    await super.inputText('100', inputs.amount.selector);
  }

  async selectNoPartialPayment() {
    await super.clickBySelector(radioButtons.partialPayment.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
