import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { confirmationHeading } from './inform-agreed-extension-date-confirm-content';

@AllMethodsStep()
export default class InformAgreedExtensionDateConfirmPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const date = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectText(DateHelper.formatDateToString(date)),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
