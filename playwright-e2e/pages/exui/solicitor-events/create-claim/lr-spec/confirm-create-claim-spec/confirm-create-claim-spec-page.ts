import BasePage from '../../../../../../base/base-page.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { confirmationHeading, paragraphs } from './confirm-create-claim-spec-content.ts';

@AllMethodsStep()
export default class ConfirmCreateClaimSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
