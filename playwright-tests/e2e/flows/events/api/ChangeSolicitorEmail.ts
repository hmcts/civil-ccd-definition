import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Changes the claimant's solicitor's email address for notifications (CHANGE_SOLICITOR_EMAIL, "Change solicitor's
// information") as the claimant's solicitor through the CCD API, instead of the event's page in XUI, with the same
// answers as the UI
export class ChangeSolicitorEmail {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, email: string) {
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'CHANGE_SOLICITOR_EMAIL', caseId, [
      {
        page: 'Applicant1SolicitorEmail',
        answers: (data) => ({
          applicantSolicitor1ServiceAddressRequired: 'No',
          applicantSolicitor1UserDetails: { ...data.applicantSolicitor1UserDetails, email },
        }),
      },
    ]);
    console.log(`CHANGE_SOLICITOR_EMAIL submitted through the API on case ${caseId}`);
  }
}
