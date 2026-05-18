import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiPage from '../../exui-page/exui-page';
import CCDCaseData from '../../../../models/ccd-case-data';
import { table } from './mediation-unsuccessful-content';

@AllMethodsStep()
export default class MediationUnsuccessfulSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(table.mediationFailedReason, { count: 1 }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
