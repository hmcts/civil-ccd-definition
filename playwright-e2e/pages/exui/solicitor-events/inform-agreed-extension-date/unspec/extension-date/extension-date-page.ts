import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { paragraphs } from './extension-date-content';

@AllMethodsStep()
export default class ExtensionDatePage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const date = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraphs.descriptionText, { first: true }),
      super.expectText(DateHelper.formatDateToString(date, { outputFormat: 'DD Mon YYYY' })),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
