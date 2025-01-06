import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  subHeadingsDisclosureReports,
  disclosureReportsform,
} from './claimant-response-spec-disclosureReport-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecDisclosureReportPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeadingsDisclosureReports.heading2, { first: true }),
      super.expectText(disclosureReportsform.filedServedDisclosureReport.legend),
      super.expectText(disclosureReportsform.agreedProposal.legend),
    ]);
  }

  async selectDisclosureReportButtons() {
    await super.clickBySelector(
      disclosureReportsform.filedServedDisclosureReport.radioYes.selector,
    );
    await super.clickBySelector(disclosureReportsform.agreedProposal.radioYes.selector);
    await super.expectText(disclosureReportsform.inputBox.text);
    await super.inputText('1823849', disclosureReportsform.inputBox.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
