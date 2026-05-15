import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiPage from '../../exui-page/exui-page';
import CCDCaseData from '../../../../models/ccd-case-data';
import { checkYourAnswers } from './mediation-unsuccessful-content';

@AllMethodsStep()
export default class MediationUnsuccessfulSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(checkYourAnswers.heading),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
