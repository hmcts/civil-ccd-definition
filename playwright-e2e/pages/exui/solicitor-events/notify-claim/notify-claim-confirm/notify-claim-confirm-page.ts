import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../exui-page/exui-page';
import { confirmationHeading, paragraphs } from './notify-claim-confirm-content';

@AllMethodsStep()
export default class NotifyClaimConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
