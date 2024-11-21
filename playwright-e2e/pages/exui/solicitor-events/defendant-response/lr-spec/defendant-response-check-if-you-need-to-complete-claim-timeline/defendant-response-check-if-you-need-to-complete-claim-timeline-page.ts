import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiEvent from '../../../exui-event/exui-event';
import {
  buttons,
  heading,
  paragraphs,
} from './defendant-response-check-if-you-need-to-complete-claim-timeline-content';

@AllMethodsStep()
export default class DefendantResponseCheckIfYouNeedToCompleteClaimTimelinePage extends ExuiEvent(
  BasePage,
) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.descriptionText3),
      super.expectText(paragraphs.descriptionText4),
      super.expectText(paragraphs.descriptionText5),
      super.expectButton(buttons.previous),
      super.expectButton(buttons.submit),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
