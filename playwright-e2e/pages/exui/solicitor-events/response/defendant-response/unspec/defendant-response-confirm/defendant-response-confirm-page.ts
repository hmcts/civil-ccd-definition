import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getText } from './defendant-response-confirm-content.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class DefendantResponseConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyTextGreenBox(ccdCaseData: CCDCaseData) {
    super.expectText(getText.greenText.text(ccdCaseData.legacyCaseReference));
  }

  async verifyDateText(ccdCaseData: CCDCaseData) {
    const extensionDate = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    const formatDate = DateHelper.formatDateToString(extensionDate, {
      outputFormat: 'DD Month YYYY',
    });
    super.expectText(getText.dateText.text(formatDate));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
