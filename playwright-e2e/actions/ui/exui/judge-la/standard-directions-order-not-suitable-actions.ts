import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import StandardDirectionOrderNotSuitablePageFactory from '../../../../pages/exui/judge-la/not-suitable-for-sdo/standard-directions-order-not-suitable-factory';

@AllMethodsStep()
export default class StandardDirectionsOrderNotSuitableActions extends BaseTestData {
  private standardDirectionsOrder: StandardDirectionOrderNotSuitablePageFactory;

  constructor(
    standardDirectionsOrder: StandardDirectionOrderNotSuitablePageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.standardDirectionsOrder = standardDirectionsOrder;
  }

  async selectTransferCase() {
    const { notSuitableSDOPage } = this.standardDirectionsOrder;
    await notSuitableSDOPage.verifyContent(this.ccdCaseData);
    await notSuitableSDOPage.selectTransferCase();
    await notSuitableSDOPage.submit();
  }

  async selectOtherReason() {
    const { notSuitableSDOPage } = this.standardDirectionsOrder;
    await notSuitableSDOPage.verifyContent(this.ccdCaseData);
    await notSuitableSDOPage.selectOtherReason();
    await notSuitableSDOPage.submit();
  }

  async submitStandardDirectionsNotSuitableOrder() {
    const { submitSdoNotSuitablePage } = this.standardDirectionsOrder;
    await submitSdoNotSuitablePage.verifyContent(this.ccdCaseData);
    await submitSdoNotSuitablePage.submit();
  }

  async confirmStandardDirectionsOrder() {
    const { confirmSdoNotSuitablePage } = this.standardDirectionsOrder;
    await confirmSdoNotSuitablePage.verifyContent(this.ccdCaseData);
    await confirmSdoNotSuitablePage.submit();
  }
}
