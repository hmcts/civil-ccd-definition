import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import NotifyClaimDetailsFragment from '../../../fragments/notify-claim-details/notify-claim-details-fragment';

@AllMethodsStep()
export default class NotifyClaimDetailsUnreprentedDefendant1Page extends BasePage {
  private notifyClaimDetailsFragment: NotifyClaimDetailsFragment;

  constructor(notifyClaimDetailsFragment: NotifyClaimDetailsFragment, page: Page) {
    super(page);
    this.notifyClaimDetailsFragment = notifyClaimDetailsFragment;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      this.notifyClaimDetailsFragment.verifyContent(),
      this.notifyClaimDetailsFragment.verifyDefendant1Content(),
    ]);
  }

  async fillNotifyClaimDetails() {
    await this.notifyClaimDetailsFragment.fillDefendant1NotifyClaim();
    await this.notifyClaimDetailsFragment.uploadDefendant1SupportingEvidence();
    await this.notifyClaimDetailsFragment.fillDefendant1StatementOfTruth();
  }

  async continue() {
    await this.notifyClaimDetailsFragment.continue();
  }
}
