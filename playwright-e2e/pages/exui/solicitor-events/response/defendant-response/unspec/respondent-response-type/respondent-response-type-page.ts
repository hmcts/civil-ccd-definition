import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons } from './respondent-response-type-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RespondentResponseTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(getRadioButtons(1).rejectAll.label),
      super.expectLabel(getRadioButtons(1).admitAll.label),
      super.expectLabel(getRadioButtons(1).partAdmit.label),
      super.expectLabel(getRadioButtons(1).counterClaim.label),
    ]);
  }

  async selectRejectAll() {
    await super.clickBySelector(getRadioButtons(1).rejectAll.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
