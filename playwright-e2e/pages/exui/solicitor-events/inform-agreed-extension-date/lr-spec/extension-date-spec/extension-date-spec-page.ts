import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { inputs } from './extension-date-spec-content';

@AllMethodsStep()
export default class ExtensionDateSpecPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async enterDate(ccdCaseData: CCDCaseData) {
    const date = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    await super.inputText(DateHelper.getTwoDigitDay(date), inputs.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(date), inputs.month.selector);
    await super.inputText(date.getFullYear(), inputs.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
