import BasePage from '../../../../../../../base/base-page.ts';
import partys from '../../../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { Party } from '../../../../../../../models/partys.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './respondent-response-type-spec-content.ts';

@AllMethodsStep()
export default class RespondentResponseTypeSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.fullDefence.label, { ignoreDuplicates: true }),
      super.expectLabel(radioButtons.fullAdmit.label, { ignoreDuplicates: true }),
      super.expectLabel(radioButtons.partAdmit.label, { ignoreDuplicates: true }),
      super.expectLabel(radioButtons.counterClaim.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectFullDefence(party: Party) {
    await super.clickBySelector(radioButtons.fullDefence.selector(party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
