import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  howToAddClaimTimeLine,
  howToAddClaimTimeLine1v2,
} from './how-to-add-claim-timeline-content.ts';

@AllMethodsStep()
export default class HowToAddClaimTimeline extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyContent1v2(ccdCaseData: CCDCaseData) {
    super.expectText(howToAddClaimTimeLine.text.label),
      super.expectText(howToAddClaimTimeLine.radioUpload.label, { ignoreDuplicates: true }),
      super.expectText(howToAddClaimTimeLine.radioManual.label, { ignoreDuplicates: true });
  }

  async selectUpload() {
    await super.clickBySelector(howToAddClaimTimeLine.radioUpload.selector);
  }

  async selectManually() {
    await super.clickBySelector(howToAddClaimTimeLine.radioManual.selector);
  }

  async selectUpload1v2() {
    await super.clickBySelector(howToAddClaimTimeLine1v2.radioUpload.selector);
  }

  async selectManually1v2() {
    await super.clickBySelector(howToAddClaimTimeLine1v2.radioManual.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
