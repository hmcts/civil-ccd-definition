import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../exui-page/exui-page';
import { confirmationHeading, paragraphs } from './notify-claim-cos-confirm-content';

@AllMethodsStep()
export default class NotifyClaimCOSConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
