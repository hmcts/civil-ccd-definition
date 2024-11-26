import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { subheading, table } from './notify-claim-details-submit-content';

@AllMethodsStep()
export default class NotifyClaimDetailsSubmitPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheading),
      super.expectText(table.uploadDocuments, { index: 1 }),
      super.expectText(table.partiularsOfClaim, { first: true }),
      super.expectText(table.medicalReports, { first: true }),
      super.expectText(table.scheduleOfLoss, { first: true }),
      super.expectText(table.certificateOfSuitability, { first: true }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
