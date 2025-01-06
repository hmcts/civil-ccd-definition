import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import { subHeadings, fileDqForm } from './claimant-response-spec-file-dq-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecFileDqPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeadings.heading2, { containerSelector: subHeadings.containerSelector }),
      super.expectText(fileDqForm.checkbox.text, {
        containerSelector: fileDqForm.checkbox.containerSelector,
      }),
      super.expectText(fileDqForm.legend1, {
        containerSelector: fileDqForm.monthStayedRequestedRadioYes.containerSelector,
      }),
      super.expectText(fileDqForm.legend2, {
        containerSelector: fileDqForm.protocolCompliedRadioYes.containerSelector,
      }),
    ]);
  }

  async selectBoxesFileDq() {
    await super.clickBySelector(fileDqForm.checkbox.checkboxSelector);
    await super.clickBySelector(fileDqForm.monthStayedRequestedRadioYes.selector);
    await super.clickBySelector(fileDqForm.protocolCompliedRadioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
