import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { heading, paragraphs } from './check-if-you-need-to-complete-claim-timeline-content';

@AllMethodsStep()
export default class DefendantResponseCheckIfYouNeedToCompleteClaimTimelinePage extends ExuiEvent(
  BasePage,
) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(paragraphs.descriptionText2),
      super.expectText(paragraphs.descriptionText3),
      super.expectText(paragraphs.descriptionText4),
      super.expectText(paragraphs.descriptionText5),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
