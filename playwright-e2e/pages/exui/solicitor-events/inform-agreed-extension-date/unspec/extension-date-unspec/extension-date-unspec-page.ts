import BasePage from '../../../../../../base/base-page';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { paragraphs } from './extension-date-unspec-content';

export default class ExtensionDateUnspecPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const date = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, { days: 28 });

    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
