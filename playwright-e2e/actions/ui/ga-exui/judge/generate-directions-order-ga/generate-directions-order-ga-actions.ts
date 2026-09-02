import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import GenerateDirectionsOrderGaPageFactory from '../../../../../pages/ga-exui/judge/generate-directions-order-ga/generate-directions-order-ga-page-factory';

@AllMethodsStep()
export default class GenerateDirectionsOrderGaActions extends BaseTestData {
  private generateDirectionsOrderGaPageFactory: GenerateDirectionsOrderGaPageFactory;

  constructor(generateDirectionsOrderGaPageFactory: GenerateDirectionsOrderGaPageFactory, testData: TestData) {
    super(testData);
    this.generateDirectionsOrderGaPageFactory = generateDirectionsOrderGaPageFactory;
  }

  async selectAssistedOrder() {
    const { finalOrderSelectGaPage } = this.generateDirectionsOrderGaPageFactory;
    await finalOrderSelectGaPage.verifyContent(this.getGaCCDCaseData()!);
    await finalOrderSelectGaPage.selectAssistedOrder();
    await finalOrderSelectGaPage.submit();
  }

  async enterAssistedOrderDetails() {
    const { finalOrderAssistedPage } = this.generateDirectionsOrderGaPageFactory;
    await finalOrderAssistedPage.verifyContent(this.getGaCCDCaseData()!);
    await finalOrderAssistedPage.enterOrderDetails();
    await finalOrderAssistedPage.submit();
  }

  async reviewDraftOrder() {
    const { finalOrderDocPreviewPage } = this.generateDirectionsOrderGaPageFactory;
    await finalOrderDocPreviewPage.verifyContent(this.getGaCCDCaseData()!);
    await finalOrderDocPreviewPage.submit();
  }

  async submitOrder() {
    const { generateDirectionsOrderGaSubmitPage } = this.generateDirectionsOrderGaPageFactory;
    await generateDirectionsOrderGaSubmitPage.verifyContent(this.getGaCCDCaseData()!);
    await generateDirectionsOrderGaSubmitPage.submit();
  }

  async confirmOrder() {
    const { generateDirectionsOrderGaConfirmPage } = this.generateDirectionsOrderGaPageFactory;
    await generateDirectionsOrderGaConfirmPage.verifyContent(this.getGaCCDCaseData()!);
  }
}
