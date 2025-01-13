import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons } from './respondent-response-type-spec-content.ts';

@AllMethodsStep()
export default class RespondentResponseTypeSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(getRadioButtons(1).fullDefence.label),
      super.expectLabel(getRadioButtons(1).fullAdmit.label),
      super.expectLabel(getRadioButtons(1).partAdmit.label),
      super.expectLabel(getRadioButtons(1).counterClaim.label),
    ]);
  }

  async selectFullDefence() {
    await super.clickBySelector(getRadioButtons(1).fullDefence.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
