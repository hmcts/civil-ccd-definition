import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import MakeDecisionPageFactory from '../../../../../pages/ga-exui/judge/make-decision/make-decision-page-factory';

@AllMethodsStep()
export default class MakeDecisionActions extends BaseTestData {
  private makeDecisionPageFactory: MakeDecisionPageFactory;

  constructor(makeDecisionPageFactory: MakeDecisionPageFactory, testData: TestData) {
    super(testData);
    this.makeDecisionPageFactory = makeDecisionPageFactory;
  }

  async selectAssistedOrder() {
    const { selectPage } = this.makeDecisionPageFactory;
    await selectPage.verifyContent(this.getGaCCDCaseData()!);
    await selectPage.selectAssistedOrder();
    await selectPage.submit();
  }

  async enterAssistedOrderDetails() {
    const { assistedPage } = this.makeDecisionPageFactory;
    await assistedPage.verifyContent(this.getGaCCDCaseData()!);
    await assistedPage.enterOrderDetails();
    await assistedPage.submit();
  }

  async reviewDraftOrder() {
    const { previewPage } = this.makeDecisionPageFactory;
    await previewPage.verifyContent(this.getGaCCDCaseData()!);
    await previewPage.submit();
  }

  async submitOrder() {
    const { checkAnswersPage } = this.makeDecisionPageFactory;
    await checkAnswersPage.verifyContent(this.getGaCCDCaseData()!);
    await checkAnswersPage.submit();
  }

  async confirmOrder() {
    const { confirmationPage } = this.makeDecisionPageFactory;
    await confirmationPage.verifyContent(this.getGaCCDCaseData()!);
  }
}
