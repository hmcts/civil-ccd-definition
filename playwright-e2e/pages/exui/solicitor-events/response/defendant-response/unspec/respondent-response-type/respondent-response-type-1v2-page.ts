import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons } from './respondent-response-type-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RespondentResponseType1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(getRadioButtons(1).rejectAll.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).admitAll.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).partAdmit.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).counterClaim.label, { count: 2 }),
    ]);
  }

  async selectRejectAll() {
    await super.clickBySelector(getRadioButtons(1).rejectAll.selector);
    await super.clickBySelector(getRadioButtons(2).rejectAll.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
