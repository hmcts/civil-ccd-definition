import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';

// Court staff recording that mediation did not settle a specified small claim (event MEDIATION_UNSUCCESSFUL, "Mediation
// Unsuccessful"), which is only offered in IN_MEDIATION. civil-service moves the claim to JUDICIAL_REFERRAL for a
// judge's directions and starts the MEDIATION_UNSUCCESSFUL business process. The first page asks why: a list of reasons
// to tick for a claim with CARM (civil-service's showCarmFields), or a single reason otherwise. Here a party withdrew.
// A second page shows the claim's details for work allocation.
export class MediationUnsuccessful {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Mediation Unsuccessful');

    const carmReason = this.page.locator('#mediationUnsuccessfulReasonsMultiSelect-PARTY_WITHDRAWS');
    const reason = this.page.locator('#unsuccessfulMediationReason-PARTY_WITHDRAWS');
    await carmReason.or(reason).first().waitFor({ state: 'visible' });
    if (await carmReason.isVisible()) {
      await carmReason.check();
    } else {
      await reason.check();
    }
    await this.pageHelper.continueToNextPage();

    // The claim's type, track and total, shown for work allocation, with nothing to answer
    await this.page.waitForURL(/\/trigger\/MEDIATION_UNSUCCESSFUL\/MEDIATION_UNSUCCESSFULWorkAllocationIntegrationFields/);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit, which goes back to the case
    await this.pageHelper.submitEvent();
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }
}
