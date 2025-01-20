import BasePage from '../../../../../../../base/base-page.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import {
  confirmationHeadings,
  paragraphs,
  subheadings,
} from './confirm-claimant-response-spec-content.ts';

@AllMethodsStep()
export default class ConfirmClaimantResponseSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeadings.proceed),
      super.expectSubheading(subheadings.happensNext),
      super.expectText(paragraphs.descriptionText1),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
