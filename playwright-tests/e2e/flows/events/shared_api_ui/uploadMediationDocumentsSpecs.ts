import moment from 'moment';

// The answers a solicitor gives in "Upload mediation documents" (UPLOAD_MEDIATION_DOCUMENTS), the same through the UI
// and the API: one non-attendance statement and one document referred to in it, both dated yesterday (civil-service
// rejects a date in the future), for every party the solicitor acts for.

export const statementName = 'Statement by the Playwright journey';
export const referredDocumentType = 'Letter referred to in the statement';
export const documentDate = () => moment().subtract(1, 'day');

// The party options civil-service offers the solicitor (the codes of uploadMediationDocumentsPartyChosen): the
// claimants' solicitor gets Claimant 1, or with two claimants also Claimant 2 and "Claimants 1 and 2"; Defendant 1's
// solicitor gets Defendant 1, or acting for both defendants also Defendant 2 and "Defendants 1 and 2"; Defendant 2's own
// solicitor gets Defendant 2. The option for every party the solicitor acts for is chosen.
export function mediationPartyCode(codes: string[]): string {
  return codes.find((code) => code === 'CLAIMANTS' || code === 'DEFENDANTS') ?? codes[0];
}

// Where civil-service keeps each party's mediation documents, for the party option chosen
const partyFields: Record<string, string[]> = {
  CLAIMANT_1: ['app1'],
  CLAIMANT_2: ['app2'],
  CLAIMANTS: ['app1', 'app2'],
  DEFENDANT_1: ['res1'],
  DEFENDANT_2: ['res2'],
  DEFENDANTS: ['res1', 'res2'],
};

export function mediationDocumentFields(code: string): Array<{ nonAttendance: string; referred: string }> {
  return (partyFields[code] ?? []).map((party) => ({
    nonAttendance: `${party}MediationNonAttendanceDocs`,
    referred: `${party}MediationDocumentsReferred`,
  }));
}

// How many documents of each kind every party the option covers has on the case
export function countMediationDocuments(caseData: Record<string, any>, code: string): number[] {
  return mediationDocumentFields(code).flatMap(({ nonAttendance, referred }) => [
    (caseData[nonAttendance] ?? []).length,
    (caseData[referred] ?? []).length,
  ]);
}
