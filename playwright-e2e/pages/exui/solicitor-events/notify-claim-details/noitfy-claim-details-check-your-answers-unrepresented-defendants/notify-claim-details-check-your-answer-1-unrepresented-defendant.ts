import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import NotifyClaimDetailsCheckYourAnswersFragment from '../../../fragments/notify-claim-details-check-your-answers/notify-claim-details-check-your-answers-fragment';

@AllMethodsStep()
export default class NotifyClaimDetailsCheckYourAnswers1UnrepresentedDefendantPage extends BasePage {
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
    ]);
  }

  async submit() {
    await this.notifyClaimDetailsCheckYourAnswersFragment.submit();
  }
}
