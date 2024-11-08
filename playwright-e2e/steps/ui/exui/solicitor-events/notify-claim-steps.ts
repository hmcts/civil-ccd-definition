import BaseSteps from '../../../../base/base-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import NotifyClaimPageFactory from '../../../../pages/exui/solicitor-events/notify-claim/notify-claim-page-factory';

@AllMethodsStep()
export default class NotifyClaimSteps extends BaseSteps {
  private notifyClaimPageFactory: NotifyClaimPageFactory;

  constructor(notifyClaimPageFactory: NotifyClaimPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimPageFactory = notifyClaimPageFactory;
  }

  async NotifyClaimUnrepresentatedDefendant1() {
    const { notifyClaimsPage } = this.notifyClaimPageFactory;
    await notifyClaimsPage.verifyContent();
    await notifyClaimsPage.fillNotifyClaimDetails();
    await notifyClaimsPage.continue();
  }

  async NotifyClaimUnrepresentatedDefendant2() {
    const { notifyClaimsDefendant2Page } = this.notifyClaimPageFactory;
    await notifyClaimsDefendant2Page.verifyContent();
    await notifyClaimsDefendant2Page.fillNotifyClaimDetails();
    await notifyClaimsDefendant2Page.continue();
  }

  async NotifyClaimCheckYourAnswers1Defendant() {
    const { notifyClaimsCheckYourAnswersPage } = this.notifyClaimPageFactory;
    await notifyClaimsCheckYourAnswersPage.verifyContent();
    // await notifyClaimsCheckYourAnswersPage.submit();
  }
}
