import BasePage from '../../../../../../../base/base-page';
import ExuiPage from '../../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps';
import { paragraphs, radioButtons } from './respondent-response-spec-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { getResponseSealedFormDocName } from '../../../../../exui-page/exui-content.ts';

@AllMethodsStep()
export default class RespondentResponseSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(paragraphs.responseForm, { index: 2 }),
      super.expectText(radioButtons.proceedWithClaim.label),
      super.expectLink(getResponseSealedFormDocName(ccdCaseData)),
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
