import BasePage from '../../../../../../base/base-page.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { confirmationHeading } from './confirm-acknowledge-claim-content.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class ConfirmAcknowledgeClaimPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const responseDeadline = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 14,
      addDayAfter4pm: false, // no working for 1 v 2DS so had to change to false (wasnt adding a day on aat)
      workingDay: true,
    });
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectSubheading(ccdCaseData.legacyCaseReference, { exact: false }),
      super.expectText(DateHelper.formatDateToString(responseDeadline), { exact: false }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
