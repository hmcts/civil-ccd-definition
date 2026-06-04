import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { confirmationHeadings, paragraphs } from './confirm-manage-stay-lift-stay-content';

@AllMethodsStep()
export default class ConfirmManageStayLiftStayPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeadings.heading1),
      super.expectHeading(confirmationHeadings.heading2),
      super.expectText(paragraphs.notification),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
