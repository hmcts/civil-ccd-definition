import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Changes the legal representatives' email addresses (AMEND_PARTY_DETAILS, "Amend party details") as the hearing centre
// admin through the CCD API, instead of the event's page in XUI, with the same answers as the UI: Defendant 1's
// solicitor's email in both of the page's boxes for it, and the claimant's solicitor's email
export class AmendPartyDetails {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, emails: { defendant1Solicitor: string; claimantSolicitor: string }) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'AMEND_PARTY_DETAILS', caseId, [
      {
        page: 'Email',
        answers: (data) => ({
          specRespondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          respondentSolicitor1EmailAddress: emails.defendant1Solicitor,
          applicantSolicitor1UserDetails: { ...data.applicantSolicitor1UserDetails, email: emails.claimantSolicitor },
        }),
      },
    ]);
    console.log(`AMEND_PARTY_DETAILS submitted through the API on case ${caseId}`);
  }
}
