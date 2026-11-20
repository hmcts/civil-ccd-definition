import { Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';

// Court staff recording that mediation settled a specified small claim (event MEDIATION_SUCCESSFUL, "Mediation
// Successful"), which is only offered in IN_MEDIATION. civil-service moves the claim to CASE_STAYED, starts the
// MEDIATION_SUCCESSFUL business process and adds the mediation agreement to the case's documents. One page asks for the
// mediation agreement (its name, type and the file), another when the settlement was agreed (today here). AAT shows
// the agreement page first, although the definition puts the date first, so each page is answered as it comes.
export class MediationSuccessful {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Mediation Successful');

    const settlementDate = this.page.locator('#mediationSettlementAgreedAt-day:visible');
    const agreementName = this.page.locator('#mediationAgreement_name:visible');
    let dateDone = false;
    let agreementDone = false;
    while (!dateDone || !agreementDone) {
      await settlementDate.or(agreementName).first().waitFor({ state: 'visible' });
      if (await settlementDate.isVisible()) {
        // When the settlement was agreed
        await this.pageHelper.fillDate('mediationSettlementAgreedAt', moment());
        dateDone = true;
      } else {
        // The mediation agreement
        await agreementName.fill('Mediation agreement');
        await this.page.locator('#mediationAgreement_documentType').selectOption({ label: 'Mediation Agreement' });
        await this.pageHelper.uploadFile(this.page.locator('#mediationAgreement_document'), './playwright-tests/documents/TEST_DOCUMENT_1.pdf');
        agreementDone = true;
      }
      await this.pageHelper.continueToNextPage();
    }

    // Check your answers and submit, which goes back to the case
    await this.pageHelper.submitEvent();
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }
}
