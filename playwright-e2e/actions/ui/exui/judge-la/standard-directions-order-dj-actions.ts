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
    const { sdoDJDisposalHearingPage } = this.standardDirectionsOrderDJ;
    await sdoDJDisposalHearingPage.verifyContent(this.ccdCaseData);
    await sdoDJDisposalHearingPage.addHearingTimeEstimate();
    await sdoDJDisposalHearingPage.addDisposalHearingBundle();
    await sdoDJDisposalHearingPage.submit();
  }

  async sdoDJTrialHearingDetails() {
    const { sdoDJTrialHearingPage } = this.standardDirectionsOrderDJ;
    await sdoDJTrialHearingPage.verifyContent(this.ccdCaseData);
    await sdoDJTrialHearingPage.addHearingTimeEstimate();
    await sdoDJTrialHearingPage.submit();
  }

  async sdoDJOrderPreview() {
    const { sdoDJOrderPreviewPage } = this.standardDirectionsOrderDJ;
    await sdoDJOrderPreviewPage.verifyContent(this.ccdCaseData);
    await sdoDJOrderPreviewPage.submit();
  }

  async sdoDJSubmit() {
    const { sdoDJSubmitPage } = this.standardDirectionsOrderDJ;
    await sdoDJSubmitPage.verifyContent(this.ccdCaseData);
    await sdoDJSubmitPage.submit();
  }

  async sdoDJConfirm() {
    const { sdoDJConfirmPage } = this.standardDirectionsOrderDJ;
    await sdoDJConfirmPage.verifyContent(this.ccdCaseData);
    await sdoDJConfirmPage.submit();
  }
}
