import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons, inputs } from './claim-partial-payment-content.ts';

@AllMethodsStep()
export default class ClaimPartialPaymentPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const defendantName = ccdCaseData.respondent1?.partyName;
    const subheadingClaimPartialPayment = subheadings.claimPartialPayment.replace(
      '<name>',
      defendantName,
    );
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadingClaimPartialPayment),
    ]);
  }

  async selectYesPartialPayment() {
    await super.clickBySelector(radioButtons.partialPayment.yes.selector);
    await super.inputText('100', inputs.amountAlreadyPaid.selector);
  }

  async selectNoPartialPayment() {
    await super.clickBySelector(radioButtons.partialPayment.no.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
