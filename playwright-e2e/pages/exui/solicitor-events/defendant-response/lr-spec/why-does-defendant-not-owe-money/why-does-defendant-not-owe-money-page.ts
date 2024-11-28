import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, radioButtons } from './why-does-defendant-not-owe-money-content.ts';

@AllMethodsStep()
export default class DefendantResponseWhyDoesDefendantNotOweMoneyPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      //super.expectLabel(radioButtons.text.label),
      //super.expectLabel(radioButtons.radioHasPaid.label),
      //super.expectLabel(radioButtons.radioDisputesClaim.lable),
    ]);
  }

  async selectHasPaid() {
    //await super.clickBySelector(radioButtons.radioHasPaid.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
