import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';

@AllMethodsStep()
export default class StandardDirectionsOrderSubmitPage extends ExuiEvent(BasePage) {
  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
  verifyContent(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
