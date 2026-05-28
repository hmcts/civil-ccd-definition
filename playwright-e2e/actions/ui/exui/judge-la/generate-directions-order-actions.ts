import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import GenerateDirectionsOrderPageFactory from '../../../../../pages/exui/judge-la/generate-directions-order/generate-directions-order-page-factory';

@AllMethodsStep()
export default class GenerateDirectionsOrderActions extends BaseTestData {
  private generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory;

  constructor(generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory, testData: TestData) {
    super(testData);
    this.generateDirectionsOrderPageFactory = generateDirectionsOrderPageFactory;
  }

  async makeFreeFormOrder() {
    const {
      finalOrderSelectSpecPage,
      freeFormOrderSpecPage,
      finalOrderPreviewSpecPage,
      submitGenerateDirectionsOrderSpecPage,
      confirmGenerateDirectionsOrderSpecPage,
    } = this.generateDirectionsOrderPageFactory;
    await finalOrderSelectSpecPage.verifyContent(this.ccdCaseData);
    await finalOrderSelectSpecPage.selectFreeFormOrder();
    await finalOrderSelectSpecPage.submit();

    await freeFormOrderSpecPage.verifyContent(this.ccdCaseData);
    await freeFormOrderSpecPage.enterOrderDetails();
    await freeFormOrderSpecPage.submit();

    await finalOrderPreviewSpecPage.verifyContent(this.ccdCaseData);
    await finalOrderPreviewSpecPage.submit();

    await submitGenerateDirectionsOrderSpecPage.verifyContent(this.ccdCaseData);
    await submitGenerateDirectionsOrderSpecPage.submit();

    await confirmGenerateDirectionsOrderSpecPage.verifyContent(this.ccdCaseData);
    await confirmGenerateDirectionsOrderSpecPage.submit();
  }
}
