import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { confirmationHeading, paragraphs } from './defendant-response-confirm-content.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class DefendantResponseConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const claimantResponseDate = DateHelper.addToToday({
      days: 28,
      workingDay: true,
      addDayAfter4pm: true,
    });
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectText(ccdCaseData.legacyCaseReference),
      super.expectText(
        paragraphs.claimantsResponse(
          DateHelper.formatDateToString(claimantResponseDate, { outputFormat: 'DD Month YYYY' }),
        ),
      ),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
