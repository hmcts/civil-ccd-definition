import notifyClaimOptions from '../../../../enums/notifyClaimOptions.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import {
  buildNotifyClaimDetailsPayload,
  hasRepresentedDefendant,
  litigantInPersonDefendants,
  NotifyClaimDetailsDocuments,
} from './payloads/notifyClaimDetailsPayload.ts';

// Notifies the defendant(s) of the claim details (NOTIFY_DEFENDANT_OF_CLAIM_DETAILS) as the claimant solicitor through
// the CCD API, instead of going through the event's pages in XUI
export class NotifyClaimDetails {
  private ccdApiHelper = new CcdApiHelper();

  async notify(c: UnspecifiedConfig, caseId: string) {
    const documents = await this.uploadDocuments(c);
    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS', caseId);
    const payload = buildNotifyClaimDetailsPayload(c, started.caseData, c.defendantsToNotifyClaimDetails, documents);
    // Notifying only one of two defendants' solicitors raises a warning, which the UI continues past
    const ignoreWarning = c.defendantsToNotifyClaimDetails !== notifyClaimOptions.BOTH;
    await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS', started.token, payload, caseId, ignoreWarning);
    console.log(`NOTIFY_DEFENDANT_OF_CLAIM_DETAILS submitted through the API for case ${caseId}`);
  }

  // Each document is uploaded separately, as the UI uploads each one
  private async uploadDocuments(c: UnspecifiedConfig): Promise<NotifyClaimDetailsDocuments> {
    const testingEndPointHelper = new TestingEndPointHelper();
    const upload = () => testingEndPointHelper.uploadTestDocument(claimantSolicitorCredentials);
    const documents: NotifyClaimDetailsDocuments = { certificateOfServiceEvidence: {} };
    if (hasRepresentedDefendant(c)) {
      documents.servedDocuments = {
        particularsOfClaim: await upload(),
        medicalReport: await upload(),
        scheduleOfLoss: await upload(),
        certificateOfSuitability: await upload(),
      };
    }
    for (const defendantNumber of litigantInPersonDefendants(c)) {
      documents.certificateOfServiceEvidence[defendantNumber] = await upload();
    }
    return documents;
  }
}
