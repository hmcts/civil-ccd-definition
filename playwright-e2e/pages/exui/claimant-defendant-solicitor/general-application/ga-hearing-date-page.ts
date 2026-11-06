import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { paragraph, inputs, radioButtons } from './ga-hearing-date-content';

@AllMethodsStep()
export default class GaHearingDatePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraph.fourteenDaysAway),
      super.expectLabel(radioButtons.scheduled.label),
      super.expectLabel(radioButtons.scheduled.yes.label),
      super.expectLabel(radioButtons.scheduled.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.scheduled.yes.selector);
  }

  async enterHearingDates() {
    const date = DateHelper.addToToday({ days: 1 });
    await super.inputText(date.getDate(), inputs.hearingScheduledDate.day);
    await super.inputText(date.getMonth() + 1, inputs.hearingScheduledDate.month);
    await super.inputText(date.getFullYear(), inputs.hearingScheduledDate.year);
  }

  async submit() {
    await super.retryClickSubmit(() =>
      super.expectNoText(paragraph.fourteenDaysAway, { timeout: 500 }),
    )}
}
