import { expect } from '@playwright/test';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { buildAcknowledgeClaimPayload } from './payloads/acknowledgeClaimPayload.ts';

// Acknowledges the claim (ACKNOWLEDGE_CLAIM) as one defendant's solicitor through the CCD API, instead of going
// through the event's pages in XUI. The solicitor must already be assigned to the case.
export class AcknowledgeClaim {
  private ccdApiHelper = new CcdApiHelper();

  async acknowledge(c: UnspecifiedConfig, caseId: string, defendantNumber: 1 | 2) {
    const solicitor = defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials;
    const started = await this.ccdApiHelper.startEvent(solicitor, 'ACKNOWLEDGE_CLAIM', caseId);
    const payload = buildAcknowledgeClaimPayload(c, started.caseData, defendantNumber);
    const saved = await this.ccdApiHelper.submitEvent(solicitor, 'ACKNOWLEDGE_CLAIM', started.token, payload, caseId);
    // Acknowledging does not change the claim's state, so the date civil-service records shows it was acknowledged
    const acknowledged = `respondent${defendantNumber}AcknowledgeNotificationDate`;
    const recorded = saved.case_data?.[acknowledged];
    expect(recorded, `ACKNOWLEDGE_CLAIM was submitted for Defendant ${defendantNumber} but no acknowledgement date was recorded`).toBeTruthy();
    console.log(`ACKNOWLEDGE_CLAIM submitted through the API for Defendant ${defendantNumber} on case ${caseId} (${acknowledged} ${recorded})`);
  }
}
