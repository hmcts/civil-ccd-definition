import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-utils/test-data';
import GenerateDirectionsOrderPageFactory from '../../../../pages/exui/judge-la/generate-directions-order/generate-directions-order-page-factory';

@AllMethodsStep()
export default class GenerateDirectionsOrderActions extends BaseTestData {
  private generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory;

  constructor(
    generateDirectionsOrderPageFactory: GenerateDirectionsOrderPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.generateDirectionsOrderPageFactory = generateDirectionsOrderPageFactory;
  }

  async selectFreeFormOrder() {
    const { finalOrderSelectPage } = this.generateDirectionsOrderPageFactory;
    await finalOrderSelectPage.verifyContent(this.ccdCaseData);
    await finalOrderSelectPage.selectFreeFormOrder();
    await finalOrderSelectPage.submit();
  }

  async enterFreeFormOrderDetails() {
    const { freeFormOrderPage } = this.generateDirectionsOrderPageFactory;
    await freeFormOrderPage.verifyContent(this.ccdCaseData);
    await freeFormOrderPage.enterOrderDetails();
    await freeFormOrderPage.submit();
  }

  async previewFreeFormOrderDetails() {
    const { finalOrderPreviewPage } = this.generateDirectionsOrderPageFactory;
    await finalOrderPreviewPage.verifyContent(this.ccdCaseData);
    await finalOrderPreviewPage.submit();
  }

  async trackAllocationIntermediate() {
    const { trackAllocationPage } = this.generateDirectionsOrderPageFactory;
    await trackAllocationPage.verifyContent(this.ccdCaseData);
    await trackAllocationPage.finalOrderAllocateToTrackYes();
    await trackAllocationPage.selectIntermediateTrack();
    await trackAllocationPage.submit();
  }

  async intermediateTrackComplexityBand() {
    const { intermediateTrackComplexityBandPage } = this.generateDirectionsOrderPageFactory;
    await intermediateTrackComplexityBandPage.verifyContent(this.ccdCaseData);
    await intermediateTrackComplexityBandPage.assignComplexityBandYes();
    await intermediateTrackComplexityBandPage.selectComplexityBand2();
    await intermediateTrackComplexityBandPage.submit();
  }

  async trackAllocationMulti() {
    const { trackAllocationPage } = this.generateDirectionsOrderPageFactory;
    await trackAllocationPage.verifyContent(this.ccdCaseData);
    await trackAllocationPage.finalOrderAllocateToTrackYes();
    await trackAllocationPage.selectMultiTrack();
    await trackAllocationPage.submit();
  }

  async selectTemplateIntermediate() {
    const { selectTemplatePage } = this.generateDirectionsOrderPageFactory;
    await selectTemplatePage.verifyContent(this.ccdCaseData);
    await selectTemplatePage.selectTemplateIntermediate();
    await selectTemplatePage.submit();
  }

  async selectTemplateMulti() {
    const { selectTemplatePage } = this.generateDirectionsOrderPageFactory;
    await selectTemplatePage.verifyContent(this.ccdCaseData);
    await selectTemplatePage.selectTemplateMulti();
    await selectTemplatePage.submit();
  }

  async downloadTemplate() {
    const { downloadTemplatePage } = this.generateDirectionsOrderPageFactory;
    await downloadTemplatePage.verifyContent(this.ccdCaseData);
    await downloadTemplatePage.submit();
  }

  async uploadOrder() {
    const { uploadOrderPage } = this.generateDirectionsOrderPageFactory;
    await uploadOrderPage.verifyContent(this.ccdCaseData);
    await uploadOrderPage.uploadOrderDocument();
    await uploadOrderPage.submit();
  }

  async submitFreeFormOrderDetails() {
    const { submitGenerateDirectionsOrderPage } = this.generateDirectionsOrderPageFactory;
    await submitGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await submitGenerateDirectionsOrderPage.submit();
  }

  async confirmFreeFormOrderDetails() {
    const { confirmGenerateDirectionsOrderPage } = this.generateDirectionsOrderPageFactory;
    await confirmGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await confirmGenerateDirectionsOrderPage.submit();
  }

  async submitGenerateDirectionsOrder() {
    const { submitGenerateDirectionsOrderPage } = this.generateDirectionsOrderPageFactory;
    await submitGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await submitGenerateDirectionsOrderPage.submit();
  }

  async confirmGenerateDirectionsOrder() {
    const { confirmGenerateDirectionsOrderPage } = this.generateDirectionsOrderPageFactory;
    await confirmGenerateDirectionsOrderPage.verifyContent(this.ccdCaseData);
    await confirmGenerateDirectionsOrderPage.submit();
  }
}
