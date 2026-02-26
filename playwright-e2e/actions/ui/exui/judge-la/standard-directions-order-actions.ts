import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import StandardDirectionOrderPageFactory from '../../../../pages/exui/judge-la/standard-directions-order/standard-directions-order-factory';

@AllMethodsStep()
export default class StandardDirectionsOrderActions extends BaseTestData {
  private standardDirectionsOrder: StandardDirectionOrderPageFactory;

  constructor(standardDirectionsOrder: StandardDirectionOrderPageFactory, testData: TestData) {
    super(testData);
    this.standardDirectionsOrder = standardDirectionsOrder;
  }

  async enterJudgementYes() {
    const { sdoPage } = this.standardDirectionsOrder;
    await sdoPage.verifyContent(this.ccdCaseData);
    await sdoPage.selectYes();
    await sdoPage.submit();
  }

  async enterJudgementNo() {
    const { sdoPage } = this.standardDirectionsOrder;
    await sdoPage.verifyContent(this.ccdCaseData);
    await sdoPage.selectNo();
    await sdoPage.submit();
  }

  async selectSmallTrack() {
    const { claimsTrackSmallPage } = this.standardDirectionsOrder;
    await claimsTrackSmallPage.verifyContent(this.ccdCaseData);
    await claimsTrackSmallPage.selectYes();
    await claimsTrackSmallPage.submit();
  }

  async selectSmallTrackDRH() {
    const { claimsTrackSmallPage } = this.standardDirectionsOrder;
    await claimsTrackSmallPage.verifyContent(this.ccdCaseData);
    await claimsTrackSmallPage.selectYesDisputeResolutionHearing();
    await claimsTrackSmallPage.submit();
  }

  async allocateSmallTrackNo() {
    const { claimsTrackSmallPage } = this.standardDirectionsOrder;
    await claimsTrackSmallPage.verifyContent(this.ccdCaseData);
    await claimsTrackSmallPage.selectNo();
    await claimsTrackSmallPage.submit();
  }

  async selectFastTrack() {
    const { claimsTrackPage } = this.standardDirectionsOrder;
    await claimsTrackPage.verifyContent(this.ccdCaseData);
    await claimsTrackPage.selectFastTrack();
    await claimsTrackPage.submit();
  }

  async selectFastTrackNIHL() {
    const { claimsTrackPage } = this.standardDirectionsOrder;
    await claimsTrackPage.verifyContent(this.ccdCaseData);
    await claimsTrackPage.selectFastTrack();
    await claimsTrackPage.selectNoiseInducedHearingLoss();
    await claimsTrackPage.submit();
  }

  async selectDisposalHearing() {
    const { orderTypePage } = this.standardDirectionsOrder;
    await orderTypePage.verifyContent(this.ccdCaseData);
    await orderTypePage.selectDisposalHearing();
    await orderTypePage.submit();
  }

  async disposalHearingDetails() {
    const { disposalHearingPage } = this.standardDirectionsOrder;
    await disposalHearingPage.verifyContent(this.ccdCaseData);
    await disposalHearingPage.addHearingTime();
    await disposalHearingPage.addDisposalHearingBundle();
    await disposalHearingPage.submit();
  }

  async smallTrackDetails() {
    const { smallClaimsPage } = this.standardDirectionsOrder;
    await smallClaimsPage.verifyContent(this.ccdCaseData);
    await smallClaimsPage.removeHearingTime();
    await smallClaimsPage.submit();
  }

  async sdoDRHDetails() {
    const { sdoR2SmallClaimsPage } = this.standardDirectionsOrder;
    await sdoR2SmallClaimsPage.verifyContent(this.ccdCaseData);
    await sdoR2SmallClaimsPage.submit();
  }

  async fastTrackDetails() {
    const { fastTrackPage } = this.standardDirectionsOrder;
    await fastTrackPage.verifyContent(this.ccdCaseData);
    await fastTrackPage.addAllocation();
    await fastTrackPage.addHearingTime();
    await fastTrackPage.submit();
  }

  async sdoNIHLDetails() {
    const { sdoR2FastTrackPage } = this.standardDirectionsOrder;
    await sdoR2FastTrackPage.verifyContent(this.ccdCaseData);
    await sdoR2FastTrackPage.submit();
  }

  async orderPreview() {
    const { orderPreviewPage } = this.standardDirectionsOrder;
    await orderPreviewPage.verifyContent(this.ccdCaseData);
    await orderPreviewPage.submit();
  }

  async submitStandardDirectionsOrder() {
    const { submitStandardDirectionsOrderPage } = this.standardDirectionsOrder;
    await submitStandardDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await submitStandardDirectionsOrderPage.submit();
  }

  async confirmStandardDirectionsOrder() {
    const { confirmStandardDirectionsOrderPage } = this.standardDirectionsOrder;
    await confirmStandardDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await confirmStandardDirectionsOrderPage.submit();
  }
}
