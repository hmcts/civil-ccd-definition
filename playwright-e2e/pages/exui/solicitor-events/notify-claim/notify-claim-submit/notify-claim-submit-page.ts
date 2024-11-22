import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';

@AllMethodsStep()
export default class NotifyClaimSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(super.verifyHeadings(ccdCaseData));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
