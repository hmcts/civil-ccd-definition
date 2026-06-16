import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  confirmationHeading,
  subheading,
  paragraph,
} from './confirm-decision-on-reconsideration-request-uphold-order-content';

@AllMethodsStep()
export default class ConfirmDecisionOnReconsiderationRequestUpholdOrderPage extends ExuiPage(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectSubheading(subheading, { headingLevel: 3 }),
      super.expectText(paragraph),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
