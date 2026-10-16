import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page';
import { headings, text } from './confirm-query-content';

@AllMethodsStep()
export default class ConfirmQueryPage extends ExuiQmPage(BasePage) {
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
