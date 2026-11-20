import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Validates the claimant's discontinuance (VALIDATE_DISCONTINUE_CLAIM_CLAIMANT, "Validate discontinuance") as the
// hearing centre admin through the CCD API, instead of the event's page in XUI: the order gives permission, so
// civil-service discontinues the claim (CASE_DISCONTINUED)
export class ValidateDiscontinueClaim {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'VALIDATE_DISCONTINUE_CLAIM_CLAIMANT', caseId, [
      { page: 'ValidateDiscontinuance', answers: { confirmOrderGivesPermission: 'YES' } },
    ]);
    console.log(`VALIDATE_DISCONTINUE_CLAIM_CLAIMANT submitted through the API on case ${caseId}`);
  }
}
