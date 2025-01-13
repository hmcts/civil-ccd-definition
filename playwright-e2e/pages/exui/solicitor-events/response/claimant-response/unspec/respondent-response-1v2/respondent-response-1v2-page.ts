import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { radioButtons, subheadings } from './respondent-response-1v2-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class RespondentResponse1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.docUrl, { index: 0 }),
        super.expectLabel(radioButtons.proceedWithClaim.label, { count: 2 }),
      ],
      { useAxeCache: true },
    );
  }

  async selectYesBothDefendants() {
    await super.clickBySelector(radioButtons.proceedWithClaim.yes.selector(partys.DEFENDANT_1));
    await super.clickBySelector(radioButtons.proceedWithClaim.yes.selector(partys.DEFENDANT_2));
  }

  async selectNoBothDefendants() {
    await super.clickBySelector(radioButtons.proceedWithClaim.no.selector(partys.DEFENDANT_1));
    await super.clickBySelector(radioButtons.proceedWithClaim.no.selector(partys.DEFENDANT_2));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
