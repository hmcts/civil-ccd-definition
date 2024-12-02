import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { howToAddClaimTimeLine } from './how-to-add-claim-timeline-content.ts';

@AllMethodsStep()
export default class HowToAddClaimTimeline extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(howToAddClaimTimeLine.text.label),
      super.expectText(howToAddClaimTimeLine.radioUpload.label, { ignoreDuplicates: true }),
      super.expectText(howToAddClaimTimeLine.radioManual.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectUpload() {
    await super.clickBySelector(howToAddClaimTimeLine.radioUpload.selector);
  }

  async selectManually() {
    await super.clickBySelector(howToAddClaimTimeLine.radioManual.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
