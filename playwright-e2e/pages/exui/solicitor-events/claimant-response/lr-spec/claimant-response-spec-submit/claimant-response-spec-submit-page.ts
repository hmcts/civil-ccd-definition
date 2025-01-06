import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
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
