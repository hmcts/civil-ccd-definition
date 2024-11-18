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
    const { notifyClaimsUnrepresentedDefendantPage1 } = this.notifyClaimPageFactory;
    await notifyClaimsUnrepresentedDefendantPage1.verifyContent();
    await notifyClaimsUnrepresentedDefendantPage1.fillNotifyClaimDetails();
    await notifyClaimsUnrepresentedDefendantPage1.continue();
  }

  async NotifyClaimUnrepresentatedDefendant2() {
    const { notifyClaimsUnrepresentedDefendantPage2 } = this.notifyClaimPageFactory;
    await notifyClaimsUnrepresentedDefendantPage2.verifyContent();
    await notifyClaimsUnrepresentedDefendantPage2.fillNotifyClaimDetails();
    await notifyClaimsUnrepresentedDefendantPage2.continue();
  }

  async NotifyClaimCheckYourAnswers1UnrepresentedDefendant() {
    const { notifyClaimsCheckYourAnswers1UnrepresentedDefendantPage } = this.notifyClaimPageFactory;
    await notifyClaimsCheckYourAnswers1UnrepresentedDefendantPage.verifyContent();
    await notifyClaimsCheckYourAnswers1UnrepresentedDefendantPage.submit();
  }

  async NotifyClaimCheckYourAnswers2UnrepresentedDefendant() {
    const { notifyClaimsCheckYourAnswers2UnrepresentedDefendantsPage } =
      this.notifyClaimPageFactory;
    await notifyClaimsCheckYourAnswers2UnrepresentedDefendantsPage.verifyContent();
    await notifyClaimsCheckYourAnswers2UnrepresentedDefendantsPage.submit();
  }

  async NotifyClaimRepresentatedDefendant() {
    const { notifyClaimsRepresentedDefendantContinuePage } = this.notifyClaimPageFactory;
    await notifyClaimsRepresentedDefendantContinuePage.verifyContent();
    await notifyClaimsRepresentedDefendantContinuePage.continue();
  }

  async NotifyClaimRepresentatedDefendantSubmit() {
    const { notifyClaimsRepresentedDefendantSubmitPage } = this.notifyClaimPageFactory;
    await notifyClaimsRepresentedDefendantSubmitPage.verifyContent();
    await notifyClaimsRepresentedDefendantSubmitPage.submit();
  }
}
