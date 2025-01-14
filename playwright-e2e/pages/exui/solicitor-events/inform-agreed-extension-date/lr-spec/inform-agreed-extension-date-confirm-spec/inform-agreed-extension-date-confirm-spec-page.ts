import BasePage from '../../../../../../base/base-page';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  confirmationHeading,
  subheadings,
} from './inform-agreed-extension-date-confirm-spec-content';

export default class InformAgreedExtensionDateConfirmSpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const date = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(confirmationHeading),
      super.expectSubheading(subheadings.happensNext),
      super.expectText(DateHelper.formatDateToString(date)),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
