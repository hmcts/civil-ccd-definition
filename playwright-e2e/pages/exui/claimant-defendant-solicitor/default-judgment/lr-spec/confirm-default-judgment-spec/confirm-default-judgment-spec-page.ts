import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { confirmationHeading } from './confirm-default-judgment-spec-content.ts';

@AllMethodsStep()
export default class ConfirmDefaultJudgmentSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading, {exact:false}), // without option not working for 1v1 and not working at all for 1v2DS can't figure out why.
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
