import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import StandardDirectionOrderDJPageFactory from '../../../../pages/exui/judge-la/standard-directions-order-dj/standard-directions-order-dj-factory';

@AllMethodsStep()
export default class StandardDirectionsOrderDJActions extends BaseTestData {
  private standardDirectionsOrderDJ: StandardDirectionOrderDJPageFactory;

  constructor(standardDirectionsOrderDJ: StandardDirectionOrderDJPageFactory, testData: TestData) {
    super(testData);
    this.standardDirectionsOrderDJ = standardDirectionsOrderDJ;
  }

  async sdoDJSelectDisposalHearing() {
    const { caseManagementOrderPage } = this.standardDirectionsOrderDJ;
    await caseManagementOrderPage.verifyContent(this.ccdCaseData);
    await caseManagementOrderPage.selectDisposalHearing();
    await caseManagementOrderPage.submit();
  }

  async sdoDJSelectTrialHearing() {
    const { caseManagementOrderPage } = this.standardDirectionsOrderDJ;
    await caseManagementOrderPage.verifyContent(this.ccdCaseData);
    await caseManagementOrderPage.selectTrialHearing();
    await caseManagementOrderPage.submit();
  }

  async sdoDJDisposalHearingDetails() {
    const { disposalHearingSdoDJPage } = this.standardDirectionsOrderDJ;
    await disposalHearingSdoDJPage.verifyContent(this.ccdCaseData);
    await disposalHearingSdoDJPage.addHearingTimeEstimate();
    await disposalHearingSdoDJPage.addDisposalHearingBundle();
    await disposalHearingSdoDJPage.submit();
  }

  async sdoDJTrialHearingDetails() {
    const { trialHearingSdoDJPage } = this.standardDirectionsOrderDJ;
    await trialHearingSdoDJPage.verifyContent(this.ccdCaseData);
    await trialHearingSdoDJPage.addHearingTimeEstimate();
    await trialHearingSdoDJPage.submit();
  }

  async sdoDJOrderPreview() {
    const { orderPreviewSdoDJPage } = this.standardDirectionsOrderDJ;
    await orderPreviewSdoDJPage.verifyContent(this.ccdCaseData);
    await orderPreviewSdoDJPage.submit();
  }

  async sdoDJSubmit() {
    const { submitSdoDJPage } = this.standardDirectionsOrderDJ;
    await submitSdoDJPage.verifyContent(this.ccdCaseData);
    await submitSdoDJPage.submit();
  }

  async sdoDJConfirm() {
    const { confirmSdoDJPage } = this.standardDirectionsOrderDJ;
    await confirmSdoDJPage.verifyContent(this.ccdCaseData);
    await confirmSdoDJPage.submit();
  }
}
