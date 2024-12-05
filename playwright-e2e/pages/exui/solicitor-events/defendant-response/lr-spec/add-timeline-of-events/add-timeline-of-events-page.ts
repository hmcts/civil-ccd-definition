import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  listEventsText,
  dateTitle,
  descriptiveText1,
  buttons,
  whatHappenedForm,
  dayMonthYear,
} from './add-timeline-of-events-content.ts';

@AllMethodsStep()
export default class AddTimelineOfEventsPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      //super.expectHeading(heading),
      super.expectText(listEventsText),
      super.expectText(buttons.text, { ignoreDuplicates: true }),
    ]);
  }

  async addNewEvent() {
    await super.clickBySelector(buttons.selector, { ignoreDuplicates: true });
    await super.retryClickBySelector(buttons.selector, () => Promise.resolve(), { retries: 2 });
    await super.expectText(dateTitle);
    await super.expectText(descriptiveText1);
    await super.expectText(dayMonthYear.day.label);
    await super.expectInputValue(dayMonthYear.day.input, 'expectedDayValue', { timeout: 3000 });
    await super.expectText(dayMonthYear.month.label);
    await super.expectInputValue(dayMonthYear.month.input, 'expectedMonthValue', { timeout: 3000 });
    await super.expectText(dayMonthYear.year.label);
    await super.expectInputValue(dayMonthYear.year.input, 'expectedYearValue', { timeout: 3000 });
    await super.expectText(whatHappenedForm.label);
    await super.expectInputValue(
      whatHappenedForm.input,
      'specResponseTimelineOfEvents_0_timelineDescription',
      { timeout: 3000 },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
