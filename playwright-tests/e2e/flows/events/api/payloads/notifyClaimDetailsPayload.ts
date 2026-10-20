import { randomUUID } from 'node:crypto';
import claimTypes from '../../../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../../../enums/notifyClaimOptions.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';
import { certificateOfService, defendantToNotify } from './certificateOfService.ts';

type Document = Record<string, string>;

// The documents Notify claim details serves, uploaded before it is submitted: the four the UI uploads when a defendant
// has a solicitor, and the evidence for each litigant in person defendant's Certificate of Service
export interface NotifyClaimDetailsDocuments {
  servedDocuments?: { particularsOfClaim: Document; medicalReport: Document; scheduleOfLoss: Document; certificateOfSuitability: Document };
  certificateOfServiceEvidence: Record<number, Document>;
}

// Whether any defendant has a solicitor. Without one there is no document upload page, only the Certificate(s) of
// Service, which hold their own evidence.
export function hasRepresentedDefendant(c: UnspecifiedConfig): boolean {
  return c.claimShape.defendants.some((defendant) => defendant.solicitor !== 'none');
}

// The defendants who are litigants in person, by number, who each need a Certificate of Service
export function litigantInPersonDefendants(c: UnspecifiedConfig): number[] {
  return c.claimShape.defendants.flatMap((defendant, index) => (defendant.solicitor === 'none' ? [index + 1] : []));
}

// The case data for NOTIFY_DEFENDANT_OF_CLAIM_DETAILS, as the UI's NotifyClaimDetails submits it: in a 1v2DS claim
// the defendant solicitor(s) to notify, the served documents when a defendant has a solicitor, and a Certificate of
// Service for each defendant who is a litigant in person. startCaseData is the case data CCD returned when the event
// was started, which holds the list of whom to notify.
export function buildNotifyClaimDetailsPayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  whomToNotify: notifyClaimOptions,
  documents: NotifyClaimDetailsDocuments,
): Record<string, any> {
  const data: Record<string, any> = c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL
    ? defendantToNotify(startCaseData, 'defendantSolicitorNotifyClaimDetailsOptions', whomToNotify)
    : {};

  if (documents.servedDocuments) {
    const { particularsOfClaim, medicalReport, scheduleOfLoss, certificateOfSuitability } = documents.servedDocuments;
    data.servedDocumentFiles = {
      particularsOfClaimDocument: [{ id: randomUUID(), value: particularsOfClaim }],
      medicalReport: [{ id: randomUUID(), value: { document: medicalReport } }],
      scheduleOfLoss: [{ id: randomUUID(), value: { document: scheduleOfLoss } }],
      certificateOfSuitability: [{ id: randomUUID(), value: { document: certificateOfSuitability } }],
    };
  }

  for (const defendantNumber of litigantInPersonDefendants(c)) {
    data[`cosNotifyClaimDetails${defendantNumber}`] = certificateOfService(defendantNumber, documents.certificateOfServiceEvidence[defendantNumber]);
  }
  return data;
}
