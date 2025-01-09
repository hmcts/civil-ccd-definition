import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { confirmationHeadings, paragraphs } from './claimant-response-confirm-content.ts';

@AllMethodsStep()
export default class ClaimantResponseConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeadings.proceed),
      super.expectSubheading(paragraphs.descriptionText1),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
