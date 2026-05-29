import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-utils/test-data';
import GenerateDirectionsOrderPageFactory from '../../../../pages/exui/judge-la/generate-directions-order/generate-directions-order-page-factory';

@AllMethodsStep()
export default class GenerateDirectionsOrderActions extends BaseTestData {
  private generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory;

  constructor(generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory, testData: TestData) {
    super(testData);
    this.generateDirectionsOrderPageFactory = generateDirectionsOrderPageFactory;
  }

  async makeFreeFormOrder() {
    const {
      finalOrderSelectPage,
      freeFormOrderPage,
      finalOrderPreviewPage,
      submitGenerateDirectionsOrderPage,
      confirmGenerateDirectionsOrderPage,
    } = this.generateDirectionsOrderPageFactory;
    await finalOrderSelectPage.verifyContent(this.ccdCaseData);
    await finalOrderSelectPage.selectFreeFormOrder();
    await finalOrderSelectPage.submit();

    await freeFormOrderPage.verifyContent(this.ccdCaseData);
    await freeFormOrderPage.enterOrderDetails();
    await freeFormOrderPage.submit();

    await finalOrderPreviewPage.verifyContent(this.ccdCaseData);
    await finalOrderPreviewPage.submit();

    await submitGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await submitGenerateDirectionsOrderPage.submit();

    await confirmGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await confirmGenerateDirectionsOrderPage.submit();
  }
}
