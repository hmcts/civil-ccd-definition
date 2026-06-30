import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { heading, link } from './hearing-confirm-content';

@AllMethodsStep()
export default class HearingConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async clickViewStatus() {
    await super.clickLink(link.viewStatusInHearingsTab);
  }

  async submit() {
    // not needed???
  }
}
