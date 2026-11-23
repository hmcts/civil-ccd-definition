import { randomUUID } from 'node:crypto';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import {
  documentDate, mediationPartyCode, referredDocumentType, statementName,
} from '../shared_api_ui/uploadMediationDocumentsSpecs.ts';

// A solicitor uploads mediation documents (UPLOAD_MEDIATION_DOCUMENTS, "Upload mediation documents") through the CCD
// API, instead of the event's pages in XUI, with the same answers as the UI (see uploadMediationDocumentsSpecs.ts).
// The first page's mid event callback fills in the parties the solicitor can choose from, and the upload page's checks
// the dates. The document is civil-service's test document. Returns the party option chosen.
export class UploadMediationDocuments {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey): Promise<string> {
    const { credentials } = sessionUsers[user];
    const document = await new TestingEndPointHelper().uploadTestDocument(credentials);
    const date = documentDate().format('YYYY-MM-DD');
    let chosen = '';
    await this.ccdApiHelper.submitEventThroughPages(credentials, 'UPLOAD_MEDIATION_DOCUMENTS', caseId, [
      { page: 'Explanation' },
      {
        page: 'WhoIsDocumentFor',
        answers: (data) => {
          const items: Array<{ code: string; label: string }> = data.uploadMediationDocumentsPartyChosen?.list_items ?? [];
          chosen = mediationPartyCode(items.map((item) => item.code));
          return { uploadMediationDocumentsPartyChosen: { value: items.find((item) => item.code === chosen), list_items: items } };
        },
      },
      { page: 'DocumentType', answers: { mediationDocumentsType: ['NON_ATTENDANCE_STATEMENT', 'REFERRED_DOCUMENTS'] } },
      {
        page: 'DocumentUpload',
        answers: {
          nonAttendanceStatementForm: [{ id: randomUUID(), value: { yourName: statementName, documentDate: date, document } }],
          documentsReferredForm: [{ id: randomUUID(), value: { documentType: referredDocumentType, documentDate: date, document } }],
        },
      },
    ]);
    console.log(`UPLOAD_MEDIATION_DOCUMENTS for ${chosen} submitted through the API as ${user} on case ${caseId}`);
    return chosen;
  }
}
