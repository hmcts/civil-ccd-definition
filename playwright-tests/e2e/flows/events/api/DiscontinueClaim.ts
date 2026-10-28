import moment from 'moment-business-days';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import DiscontinueClaimType from '../../../../enums/discontinueClaim.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Fully discontinues the claim (DISCONTINUE_CLAIM_CLAIMANT, "Discontinue this claim") as the claimant's solicitor
// through the CCD API, instead of the event's pages in XUI, with the same answers as the UI: every claimant
// discontinues, against every defendant, either without needing the court's permission or with permission a judge
// granted today. The about to start callback fills in the lists of claimants and defendants to choose from.
export class DiscontinueClaim {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, type: DiscontinueClaimType) {
    const permissionNeeded = type === DiscontinueClaimType.PERMISSION_GRANTED;
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'DISCONTINUE_CLAIM_CLAIMANT', caseId, [
      {
        page: 'MultipleClaimant',
        when: (data) => data.addApplicant2 === 'Yes',
        answers: (data) => {
          const options = data.claimantWhoIsDiscontinuing;
          return { claimantWhoIsDiscontinuing: { ...options, value: options.list_items.find((item) => item.label === 'Both') } };
        },
      },
      {
        page: 'CourtPermission',
        answers: permissionNeeded
          ? { courtPermissionNeeded: 'YES' }
          : { courtPermissionNeeded: 'NO', courtPermissionNeededChecked: ['CourtPermissionNeededChecked'] },
      },
      {
        page: 'PermissionGranted',
        when: () => permissionNeeded,
        answers: {
          isPermissionGranted: 'YES',
          permissionGrantedComplex: { permissionGrantedJudge: 'District Judge Playwright', permissionGrantedDate: moment().format('YYYY-MM-DD') },
        },
      },
      {
        page: 'DiscontinuingAgainstDefendants',
        when: (data) => data.applicant1Represented !== 'No' && data.respondent2Represented === 'Yes',
        answers: { isDiscontinuingAgainstBothDefendants: 'YES' },
      },
      { page: 'DiscontinuanceType', answers: { typeOfDiscontinuance: 'FULL_DISCONTINUANCE' } },
    ]);
    console.log(`DISCONTINUE_CLAIM_CLAIMANT (${type}) submitted through the API on case ${caseId}`);
  }
}
