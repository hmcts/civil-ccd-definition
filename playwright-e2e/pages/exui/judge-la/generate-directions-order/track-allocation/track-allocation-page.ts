import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { radioButtons } from './track-allocation-content';

@AllMethodsStep()
export default class TrackAllocationPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLegend(radioButtons.finalOrderAllocateToTrack.label),
      super.expectLabel(radioButtons.finalOrderAllocateToTrack.yes.label, {
        containerSelector: radioButtons.finalOrderAllocateToTrack.containerSelector,
      }),
      super.expectLabel(radioButtons.finalOrderAllocateToTrack.no.label, {
        containerSelector: radioButtons.finalOrderAllocateToTrack.containerSelector,
      }),
    ]);
  }

  async finalOrderAllocateToTrackYes() {
    await super.clickBySelector(radioButtons.finalOrderAllocateToTrack.yes.selector);
    await super.expectLegend(radioButtons.finalOrderTrackAllocation.label);
    await super.expectLabel(radioButtons.finalOrderTrackAllocation.intermediateClaim.label);
    await super.expectLabel(radioButtons.finalOrderTrackAllocation.multiClaim.label);
  }

  async finalOrderAllocateToTrackNo() {
    await super.clickBySelector(radioButtons.finalOrderAllocateToTrack.no.selector);
  }

  async selectIntermediateTrack() {
    await super.clickBySelector(radioButtons.finalOrderTrackAllocation.intermediateClaim.selector);
  }

  async selectMultiTrack() {
    await super.clickBySelector(radioButtons.finalOrderTrackAllocation.multiClaim.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
