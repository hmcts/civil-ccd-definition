import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class StandardDirectionsOrderSubmitPage extends ExuiPage(BasePage) {
  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
  async verifyContent(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
