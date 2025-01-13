import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { getRadioButtons, subheadings } from './respondent-response-1v2-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RespondentResponse1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.docUrl, { index: 0 }),
        super.expectLabel(getRadioButtons(1).proceedWithClaim.label, { count: 2 }),
      ],
      { useAxeCache: true },
    );
  }

  async selectYesBothDefendants() {
    await super.clickBySelector(getRadioButtons(1).proceedWithClaim.yes.selector);
    await super.clickBySelector(getRadioButtons(2).proceedWithClaim.yes.selector);
  }

  async selectNoBothDefendants() {
    await super.clickBySelector(getRadioButtons(1).proceedWithClaim.no.selector);
    await super.clickBySelector(getRadioButtons(2).proceedWithClaim.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
