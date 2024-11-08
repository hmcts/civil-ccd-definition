import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import NotifyClaimFragment from '../../../fragments/notify-claim/notify-claim-fragment';

@AllMethodsStep()
export default class NotifyClaimDefendant2Page extends BasePage {
  private notifyClaimFragment: NotifyClaimFragment;

  constructor(notifyClaimFragment: NotifyClaimFragment, page: Page) {
    super(page);
    this.notifyClaimFragment = notifyClaimFragment;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      this.notifyClaimFragment.verifyContent(),
      this.notifyClaimFragment.verifyDefendant2Content(),
    ]);
  }

  async fillNotifyClaimDetails() {
    await this.notifyClaimFragment.fillDefendant2NotifyClaim();
    await this.notifyClaimFragment.fillDefendant2StatementOfTruth();
  }

  async continue() {
    await this.notifyClaimFragment.continue();
  }
}
