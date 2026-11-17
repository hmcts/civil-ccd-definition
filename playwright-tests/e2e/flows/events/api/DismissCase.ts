import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Dismisses the case (DISMISS_CASE, "Dismiss case") as the hearing centre admin through the CCD API, instead of the
// event's page in XUI. civil-service moves it to CASE_DISMISSED and tells the parties (business process DISMISS_CASE).
export class DismissCase {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'DISMISS_CASE', caseId, []);
    console.log(`DISMISS_CASE submitted through the API on case ${caseId}`);
  }
}
