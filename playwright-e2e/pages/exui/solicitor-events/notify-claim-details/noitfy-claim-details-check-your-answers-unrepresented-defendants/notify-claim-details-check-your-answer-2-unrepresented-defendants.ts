import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import NotifyClaimDetailsCheckYourAnswersFragment from '../../../fragments/notify-claim-details-check-your-answers/notify-claim-details-check-your-answers-fragment';
import { AllMethodsStep } from '../../../../../decorators/test-steps';

@AllMethodsStep()
export default class NotifyClaimDetailsCheckYourAnswers2UnrepresentedDefendantsPage extends BasePage {
  private notifyClaimDetailsCheckYourAnswersFragment: NotifyClaimDetailsCheckYourAnswersFragment;

  constructor(
    notifyClaimDetailsCheckYourAnswersFragment: NotifyClaimDetailsCheckYourAnswersFragment,
    page: Page,
  ) {
    super(page);
    this.notifyClaimDetailsCheckYourAnswersFragment = notifyClaimDetailsCheckYourAnswersFragment;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      this.notifyClaimDetailsCheckYourAnswersFragment.verifyContent(),
      this.notifyClaimDetailsCheckYourAnswersFragment.checkDefendant1Answers(),
      this.notifyClaimDetailsCheckYourAnswersFragment.checkDefendant2Answers(),
    ]);
  }

  async submit() {
    await this.notifyClaimDetailsCheckYourAnswersFragment.submit();
  }
}
