import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  listEventText,
  dateTitle,
  descriptiveText1,
  buttons,
  whatHappenedForm,
  dayMonthYear,
} from './defendant-response-add-timeline-of-events-content.ts';

@AllMethodsStep()
export default class DefendantResponseAddTimelineOfEventsPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(listEventText),
      super.expectText(buttons),
      super.expectText(dateTitle),
      super.expectText(descriptiveText1),
      super.expectText(dayMonthYear),
      super.expectText(whatHappenedForm),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
