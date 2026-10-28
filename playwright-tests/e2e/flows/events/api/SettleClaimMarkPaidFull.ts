import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Marks the claim as paid in full (SETTLE_CLAIM_MARK_PAID_FULL, "Settle this claim") as the claimant's solicitor
// through the CCD API, instead of the event's pages in XUI, with the same answers as the UI: with one claimant they
// confirm it, and with two (addApplicant2) it is for both claimants. civil-service stays the case (CASE_STAYED).
export class SettleClaimMarkPaidFull {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'SETTLE_CLAIM_MARK_PAID_FULL', caseId, [
      { page: 'MultipleClaimant', when: (data) => data.addApplicant2 === 'Yes', answers: { markPaidForAllClaimants: 'Yes' } },
      { page: 'SingleClaimant', when: (data) => data.addApplicant2 === 'No', answers: { markPaidConsent: 'YES' } },
    ]);
    console.log(`SETTLE_CLAIM_MARK_PAID_FULL submitted through the API on case ${caseId}`);
  }
}
