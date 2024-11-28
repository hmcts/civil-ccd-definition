import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  listEventsText,
  dateTitle,
  descriptiveText1,
  buttons,
  whatHappenedForm,
  dayMonthYear,
} from './add-timeline-of-events-content.ts';

@AllMethodsStep()
export default class DefendantResponseAddTimelineOfEventsPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(listEventsText),
      super.expectText(buttons),
      super.expectText(dateTitle),
      super.expectText(descriptiveText1),
      super.expectText(dayMonthYear.day.label),
      super.expectInputValue(dayMonthYear.day.input, 'expectedDayValue', { timeout: 3000 }),
      super.expectText(dayMonthYear.month.label),
      super.expectInputValue(dayMonthYear.month.input, 'expectedMonthValue', { timeout: 3000 }),
      super.expectText(dayMonthYear.year.label),
      super.expectInputValue(dayMonthYear.year.input, 'expectedYearValue', { timeout: 3000 }),
      super.expectText(whatHappenedForm.label),
      super.expectInputValue(
        whatHappenedForm.input,
        'specResponseTimelineOfEvents_0_timelineDescription',
        { timeout: 3000 },
      ),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
