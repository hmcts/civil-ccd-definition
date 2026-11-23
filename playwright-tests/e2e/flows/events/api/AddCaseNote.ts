import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Adds a note to the case (ADD_CASE_NOTE) as the hearing centre admin through the CCD API, instead of the event's page
// in XUI. civil-service moves the note to the top of the case's notes.
export class AddCaseNote {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, note: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'ADD_CASE_NOTE', caseId, [
      { page: 'CaseNote', answers: { caseNote: note } },
    ]);
    console.log(`ADD_CASE_NOTE submitted through the API on case ${caseId}`);
  }
}
