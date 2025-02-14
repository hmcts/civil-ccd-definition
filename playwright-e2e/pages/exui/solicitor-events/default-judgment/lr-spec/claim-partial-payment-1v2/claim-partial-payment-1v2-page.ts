import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons, inputs } from './claim-partial-payment-1v2-content.ts';

@AllMethodsStep()
export default class ClaimPartialPayment1v2Page extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.claimPartialPayment),
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
