import BasePage from '../../../../../../base/base-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import { heading2, applicationRadioForm } from './claimant-response-spec-applications-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecApplicationsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(heading2),
      super.expectText(applicationRadioForm.text),
      super.expectText(applicationRadioForm.supportRequirement.label),
    ]);
  }

  async futureApplicationsNo() {
    await super.clickBySelector(applicationRadioForm.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
