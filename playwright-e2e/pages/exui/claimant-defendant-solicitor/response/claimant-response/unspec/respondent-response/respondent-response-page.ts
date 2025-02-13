import BasePage from '../../../../../../../base/base-page';
import ExuiPage from '../../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps';
import { radioButtons, subheadings } from './respondent-response-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class RespondentResponsePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.docUrl, { index: 0 }),
      super.expectText(radioButtons.proceedWithClaim.label, { index: 0 }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.proceedWithClaim.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.proceedWithClaim.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
