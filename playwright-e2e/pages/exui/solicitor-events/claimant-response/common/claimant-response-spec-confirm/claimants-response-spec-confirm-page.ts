import BasePage from '../../../../../../base/base-page.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { confirmPageHeadings, legend, link } from './claimant-response-spec-confirm-content.ts';

@AllMethodsStep()
export default class ClaimantsResponseSpecConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmPageHeadings.heading1),
      super.expectSubheading(confirmPageHeadings.whatHappensNextSubHeading),
      super.expectText(legend.checkInformation),
      super.expectLink(link.questionnaire.linkText),
    ]);
  }

  async verifyContentspec1v1SC(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectHeading(confirmPageHeadings.headingspec1v1SC),
        super.expectText(legend.mediation),
        super.expectText(legend.appointment),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectHeading(confirmPageHeadings.heading1Unspec),
        super.expectText(legend.checkInformationUnspec),
      ],
      { useAxeCache: true },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
