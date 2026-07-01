import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { heading, checkboxes } from './hearing-cancel-content';

@AllMethodsStep()
export default class HearingCancelPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectText(heading)]);
  }

  async selectListedInError() {
    await super.clickBySelector(checkboxes.listedInError.selector);
  }

  async submit() {
    await super.clickContinue();
  }
}
