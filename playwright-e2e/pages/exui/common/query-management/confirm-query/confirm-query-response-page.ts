import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page';
import { headings, text } from './confirm-query-content';

@AllMethodsStep()
export default class ConfirmQueryResponsePage extends ExuiQmPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.queryResponseSubmitted),
      super.expectText(text.addedToTheCase),
    ]);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
