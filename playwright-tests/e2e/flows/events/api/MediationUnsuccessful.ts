import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Records that mediation did not settle a specified small claim (MEDIATION_UNSUCCESSFUL) as the hearing centre admin
// through the CCD API, instead of the event's pages in XUI. A party withdrew: one of the list of reasons for a claim
// with CARM (showCarmFields, which the about to start callback sets), or the single reason otherwise. civil-service
// moves the claim to JUDICIAL_REFERRAL.
export class MediationUnsuccessful {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'MEDIATION_UNSUCCESSFUL', caseId, [
      {
        page: 'mediationUnsuccessful',
        answers: (data) => (data.showCarmFields === 'Yes'
          ? { mediationUnsuccessfulReasonsMultiSelect: ['PARTY_WITHDRAWS'] }
          : { unsuccessfulMediationReason: 'PARTY_WITHDRAWS' }),
      },
    ]);
    console.log(`MEDIATION_UNSUCCESSFUL submitted through the API on case ${caseId}`);
  }
}
