import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Stays the case (STAY_CASE) as the hearing centre admin through the CCD API, instead of the event's page in XUI.
// civil-service moves it to CASE_STAYED and keeps the state it was in (preStayState) for when the stay is lifted.
export class StayCase {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'STAY_CASE', caseId, []);
    console.log(`STAY_CASE submitted through the API on case ${caseId}`);
  }
}
