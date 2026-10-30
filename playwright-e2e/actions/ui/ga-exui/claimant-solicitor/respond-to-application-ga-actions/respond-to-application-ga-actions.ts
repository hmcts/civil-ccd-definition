import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import RespondToApplicationGaPageFactory from '../../../../../pages/ga-exui/claimant-defendant-solicitor/respond-to-application-ga/respond-to-application-ga-page-factory';

@AllMethodsStep()
export default class RespondToApplicationGaActions extends BaseTestData {
  private respondToApplicationGaPageFactory: RespondToApplicationGaPageFactory;

  constructor(
    respondToApplicationGaPageFactory: RespondToApplicationGaPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.respondToApplicationGaPageFactory = respondToApplicationGaPageFactory;
  }

  async respScreen() {
    const { respScreenPage } = this.respondToApplicationGaPageFactory;
    await respScreenPage.verifyContent(this.getGaCCDCaseData()!);
    await respScreenPage.selectYes();
    await respScreenPage.submit();
  }

  async respHearingScreen() {
    const { respHearingScreenPage } = this.respondToApplicationGaPageFactory;
    await respHearingScreenPage.verifyContent(this.getGaCCDCaseData()!);
    await respHearingScreenPage.enterDetails();
    await respHearingScreenPage.submit();
  }

  async submit() {
    const { submitPage } = this.respondToApplicationGaPageFactory;
    await submitPage.verifyContent(this.getGaCCDCaseData()!);
    await submitPage.submit();
  }

  async confirm() {
    const { confirmPage } = this.respondToApplicationGaPageFactory;
    await confirmPage.verifyContent(this.getGaCCDCaseData()!);
    await confirmPage.submit();
  }
}
