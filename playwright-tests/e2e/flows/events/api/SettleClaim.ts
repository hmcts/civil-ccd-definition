import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import SettleClaimReason from '../../../../enums/settleClaim.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Records that the claim has settled (SETTLE_CLAIM, "Settle this claim") as the hearing centre admin through the CCD
// API, instead of the event's page in XUI, following a judge's order or an approved consent order. civil-service moves
// the claim to CASE_SETTLED.
export class SettleClaim {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, reason: SettleClaimReason.JUDGE_ORDER | SettleClaimReason.CONSENT_ORDER) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'SETTLE_CLAIM', caseId, [
      { page: 'SettleClaim', answers: { settleReason: reason } },
    ]);
    console.log(`SETTLE_CLAIM (${reason}) submitted through the API on case ${caseId}`);
  }
}
