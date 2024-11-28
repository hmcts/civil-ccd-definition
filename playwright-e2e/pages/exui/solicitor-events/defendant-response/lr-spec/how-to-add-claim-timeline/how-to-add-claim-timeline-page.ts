import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { howToAddClaimTimeLine } from './how-to-add-claim-timeline-content.ts';

@AllMethodsStep()
export default class DefendantResponseHowToAddClaimTimeline extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(howToAddClaimTimeLine.text.label),
      super.expectLabel(howToAddClaimTimeLine.radioUpload.label),
      super.expectLabel(howToAddClaimTimeLine.radioManual.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(howToAddClaimTimeLine.radioUpload.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
