import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import NotifyClaimFragment from '../../../fragments/notify-claim/notify-claim-fragment';

@AllMethodsStep()
export default class NotifyClaimUnrepresentedDefendant1Page extends BasePage {
  private notifyClaimFragment: NotifyClaimFragment;

  constructor(notifyClaimFragment: NotifyClaimFragment, page: Page) {
    super(page);
    this.notifyClaimFragment = notifyClaimFragment;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      this.notifyClaimFragment.verifyContent(),
      this.notifyClaimFragment.verifyDefendant1Content(),
    ]);
  }

  async fillNotifyClaimDetails() {
    await this.notifyClaimFragment.fillDefendant1NotifyClaim();
    await this.notifyClaimFragment.fillDefendant1StatementOfTruth();
  }

  async continue() {
    await this.notifyClaimFragment.continue();
  }
}
