import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { headings, text } from './confirm-query-content';

@AllMethodsStep()
export default class ConfirmQueryPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.querySubmitted),
      super.expectText(text.submitted),
    ]);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
