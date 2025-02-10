import BasePage from '../../../../../../../base/base-page.ts';
import partys from '../../../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './respondent-response-type-spec-content.ts';

@AllMethodsStep()
export default class RespondentResponseTypeSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.fullDefence.label),
      super.expectLabel(radioButtons.fullAdmit.label),
      super.expectLabel(radioButtons.partAdmit.label),
      super.expectLabel(radioButtons.counterClaim.label),
    ]);
  }

  async selectFullDefence() {
    await super.clickBySelector(radioButtons.fullDefence.selector(partys.DEFENDANT_1));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
