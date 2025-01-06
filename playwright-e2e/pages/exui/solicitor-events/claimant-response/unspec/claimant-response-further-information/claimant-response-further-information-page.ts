import BasePage from '../../../../../../base/base-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  heading2,
  furtherInformationRadioForm,
} from './claimant-response-further-information-content.ts';

@AllMethodsStep()
export default class ClaimantResponseFurtherInformationPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading2, { first: true }),
      super.expectText(furtherInformationRadioForm.text, { first: true }),
      super.expectText(furtherInformationRadioForm.supportRequirement.label, { first: true }),
    ]);
  }

  async futureApplicationsNo() {
    await super.clickBySelector(furtherInformationRadioForm.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
