import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import { confirmationHeading, paragraphs } from './confirm-notify-claim-cos-content';

@AllMethodsStep()
export default class ConfirmNotifyClaimCOSPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
