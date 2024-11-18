import BaseSteps from '../../../../base/base-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import NotifyClaimDetailsPageFactory from '../../../../pages/exui/solicitor-events/notify-claim-details/notify-claim-details-page-factory';

@AllMethodsStep()
export default class NotifyClaimDetailsSteps extends BaseSteps {
  private notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory;

  constructor(notifyClaimDetailsPageFactory: NotifyClaimDetailsPageFactory, testData: TestData) {
    super(testData);
    this.notifyClaimDetailsPageFactory = notifyClaimDetailsPageFactory;
  }

  async NotifyClaimUnrepresentatedDefendant1() {
    const { notifyClaimDetailsUnrepresentedDefendant1Page } = this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsUnrepresentedDefendant1Page.verifyContent();
    await notifyClaimDetailsUnrepresentedDefendant1Page.fillNotifyClaimDetails();
    await notifyClaimDetailsUnrepresentedDefendant1Page.continue();
  }

  async NotifyClaimUnrepresentatedDefendant2() {
    const { notifyClaimDetailsUnrepresentedDefendant2Page } = this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsUnrepresentedDefendant2Page.verifyContent();
    await notifyClaimDetailsUnrepresentedDefendant2Page.fillNotifyClaimDetails();
    await notifyClaimDetailsUnrepresentedDefendant2Page.continue();
  }

  async NotifyClaimRepresentatedDefendants() {
    const { notifyClaimDetailsRepresentedDefendantsPage } = this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsRepresentedDefendantsPage.verifyContent();
    await notifyClaimDetailsRepresentedDefendantsPage.uploadDocuments();
    await notifyClaimDetailsRepresentedDefendantsPage.continue();
  }

  async NotifyClaimCheckYourAnswers1UnrepresentedDefendant() {
    const { notifyClaimDetailsCheckYourAnswers1UnrepresentedDefendant } =
      this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsCheckYourAnswers1UnrepresentedDefendant.verifyContent();
    await notifyClaimDetailsCheckYourAnswers1UnrepresentedDefendant.submit();
  }

  async NotifyClaimCheckYourAnswers2UnrepresentedDefendants() {
    const { notifyClaimDetailsCheckYourAnswers2UnrepresentedDefendants } =
      this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsCheckYourAnswers2UnrepresentedDefendants.verifyContent();
    await notifyClaimDetailsCheckYourAnswers2UnrepresentedDefendants.submit();
  }

  async NotifyClaimCheckYourAnswersRepresentedDefendants() {
    const { notifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage } =
      this.notifyClaimDetailsPageFactory;
    await notifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage.verifyContent();
  }
}
