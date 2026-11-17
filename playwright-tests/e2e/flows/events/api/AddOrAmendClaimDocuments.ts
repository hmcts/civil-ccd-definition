import { randomUUID } from 'node:crypto';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// Uploads the particulars of claim (ADD_OR_AMEND_CLAIM_DOCUMENTS, "Add or amend claim documents") as the claimant's
// solicitor through the CCD API, instead of the event's page in XUI, with civil-service's test document in place of the
// UI's PDF. Any documents already on the claim are kept, as the page shows them.
export class AddOrAmendClaimDocuments {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    const particularsOfClaim = await new TestingEndPointHelper().uploadTestDocument(claimantSolicitorCredentials);
    await this.ccdApiHelper.submitEventThroughPages(claimantSolicitorCredentials, 'ADD_OR_AMEND_CLAIM_DOCUMENTS', caseId, [
      {
        page: 'Upload',
        answers: (data) => ({
          servedDocumentFiles: {
            ...data.servedDocumentFiles,
            particularsOfClaimDocument: [
              ...(data.servedDocumentFiles?.particularsOfClaimDocument ?? []),
              { id: randomUUID(), value: particularsOfClaim },
            ],
          },
        }),
      },
    ]);
    console.log(`ADD_OR_AMEND_CLAIM_DOCUMENTS submitted through the API on case ${caseId}`);
  }
}
