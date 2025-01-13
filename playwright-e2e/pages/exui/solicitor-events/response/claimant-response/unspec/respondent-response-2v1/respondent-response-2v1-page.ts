import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { radioButtons, paragraphs, subheadings } from './respondent-response-2v1-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class RespondentResponse2v1Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.docUrl, { index: 0 }),
        super.expectLabel(radioButtons.proceedWithClaim.label(partys.CLAIMANT_1)),
        super.expectLabel(radioButtons.proceedWithClaim.label(partys.CLAIMANT_2)),
      ],
      { useAxeCache: true },
    );
  }

  async selectYesBothClaimants() {
    await super.clickBySelector(radioButtons.proceedWithClaim.yes.selector(partys.CLAIMANT_1));
    await super.clickBySelector(radioButtons.proceedWithClaim.yes.selector(partys.CLAIMANT_2));
  }

  async selectNoBothClaimants() {
    await super.clickBySelector(radioButtons.proceedWithClaim.no.selector(partys.CLAIMANT_1));
    await super.clickBySelector(radioButtons.proceedWithClaim.no.selector(partys.CLAIMANT_2));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
