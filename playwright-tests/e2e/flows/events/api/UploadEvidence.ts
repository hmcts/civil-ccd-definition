import { randomUUID } from 'node:crypto';
import moment from 'moment-business-days';
import trackType from '../../../../enums/track.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// A solicitor's evidence upload once the case is in CASE_PROGRESSION ("Upload Your Documents") through the CCD API,
// instead of the event's pages in XUI: EVIDENCE_UPLOAD_APPLICANT for the claimant's solicitor and
// EVIDENCE_UPLOAD_RESPONDENT for a defendant's. As in the UI, a disclosure list is uploaded on the fast, intermediate and
// multi tracks, and on the small claims track documentary evidence for the hearing (an invoice issued a month ago).
// civil-service's test document is the file.
//
// A defendant's fields end in Res, and a solicitor acting for two parties is asked who the documents are for (both,
// where that is offered). The document selection page's mid event callback says which party's fields the upload page
// shows (caseTypeFlag: ApplicantTwoFields for Claimant 2, RespondentTwoFields for Defendant 2's own solicitor).
export class UploadEvidence {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey, track: trackType = trackType.FAST) {
    const credentials = sessionUsers[user].credentials;
    const claimant = user === 'claimantSolicitor';
    const eventId = claimant ? 'EVIDENCE_UPLOAD_APPLICANT' : 'EVIDENCE_UPLOAD_RESPONDENT';
    const suffix = claimant ? '' : 'Res';
    const smallClaim = track === trackType.SMALL;
    const document = await new TestingEndPointHelper().uploadTestDocument(credentials);

    // The upload field for the party the callback chose, e.g. documentDisclosureListRes2 for Defendant 2's own solicitor
    const uploadField = (data: Record<string, any>) => {
      const base = smallClaim ? 'documentEvidenceForTrial' : 'documentDisclosureList';
      if (data.caseTypeFlag === 'ApplicantTwoFields') {
        return `${base}App2`;
      }
      return `${base}${suffix}${data.caseTypeFlag === 'RespondentTwoFields' ? '2' : ''}`;
    };
    const entry = smallClaim
      ? { typeOfDocument: 'Invoice', documentIssuedDate: moment().subtract(1, 'month').format('YYYY-MM-DD'), documentUpload: document }
      : { documentUpload: document };

    await this.ccdApiHelper.submitEventThroughPages(credentials, eventId, caseId, (started) => [
      { page: 'EvidenceUpload' },
      ...(started.evidenceUploadOptions?.list_items?.length
        ? [{ page: 'SelectUploadOptions', answers: { evidenceUploadOptions: this.chooseParties(started.evidenceUploadOptions) } }]
        : []),
      smallClaim
        ? { page: 'DocumentSelectionSmallClaim', answers: { [`trialSelectionEvidenceSmallClaim${suffix}`]: ['DOCUMENTARY'] } }
        : { page: 'DocumentSelectionFastTrack', answers: { [`disclosureSelectionEvidence${suffix}`]: ['DISCLOSURE_LIST'] } },
      { page: 'DocumentUpload', answers: (data) => ({ [uploadField(data)]: [{ id: randomUUID(), value: entry }] }) },
    ]);
    console.log(`${eventId} submitted through the API as ${user} on case ${caseId}`);
  }

  // Both parties where the list offers that ("... 1 and 2"), otherwise the first
  private chooseParties(options: { list_items: Array<{ code: string; label: string }> }) {
    const choice = options.list_items.find((item) => /1 and 2/.test(item.label)) ?? options.list_items[0];
    return { ...options, value: choice };
  }
}
