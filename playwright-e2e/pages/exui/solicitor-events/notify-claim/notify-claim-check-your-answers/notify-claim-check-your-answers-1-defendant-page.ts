import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import NotifyClaimCheckYourAnswersFragment from '../../../fragments/notify-claim-check-your-answers/notify-claim-check-your-answers-fragment';

@AllMethodsStep()
export default class NotifyClaimCheckYourAnswersPage extends BasePage {
  private notifyClaimCheckYourAnswersFragment: NotifyClaimCheckYourAnswersFragment;

  constructor(
    notifyClaimCheckYourAnswersFragment: NotifyClaimCheckYourAnswersFragment,
    page: Page,
  ) {
    super(page);
    this.notifyClaimCheckYourAnswersFragment = notifyClaimCheckYourAnswersFragment;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([this.notifyClaimCheckYourAnswersFragment.verifyContent()]);
  }

  async checkAnswers() {
    await this.notifyClaimCheckYourAnswersFragment.checkDefendant1Answers();
  }

  async submit() {
    await this.notifyClaimCheckYourAnswersFragment.submit();
  }
}
