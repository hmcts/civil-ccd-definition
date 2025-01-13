import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { getRadioButtons, paragraphs, subheadings } from './respondent-response-2v1-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RespondentResponse2v1Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.docUrl, { index: 0 }),
        super.expectLabel(getRadioButtons(1).proceedWithClaim.label),
        super.expectLabel(getRadioButtons(2).proceedWithClaim.label),
      ],
      { useAxeCache: true },
    );
  }

  async selectYesBothClaimants() {
    await super.clickBySelector(getRadioButtons(1).proceedWithClaim.yes.selector);
    await super.clickBySelector(getRadioButtons(2).proceedWithClaim.yes.selector);
  }

  async selectNoBothClaimants() {
    await super.clickBySelector(getRadioButtons(1).proceedWithClaim.no.selector);
    await super.clickBySelector(getRadioButtons(2).proceedWithClaim.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
