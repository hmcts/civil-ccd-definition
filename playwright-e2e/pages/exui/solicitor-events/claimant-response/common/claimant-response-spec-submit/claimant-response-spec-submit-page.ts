import BasePage from '../../../../../../base/base-page.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import {
  subHeadings,
  inlineText,
  submitNavigationsButtons,
} from './claimant-response-spec-submit-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeadings.heading2.text),
      super.expectSubheading(subHeadings.claimantHeading2),
      super.expectSubheading(subHeadings.StatementOfTruthHeading2),
      super.expectText(inlineText.checkInformation),
    ]);
  }

  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(subHeadings.heading2.text, {
          containerSelector: subHeadings.heading2.containerSelector,
        }),
        super.expectText(inlineText.checkInformation),
      ],
      { useAxeCache: true },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
