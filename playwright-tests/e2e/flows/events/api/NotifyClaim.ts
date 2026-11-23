import notifyClaimOptions from '../../../../enums/notifyClaimOptions.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { buildNotifyClaimPayload } from './payloads/notifyClaimPayload.ts';

// Notifies the defendant(s) of the claim (NOTIFY_DEFENDANT_OF_CLAIM) as the claimant solicitor through the CCD API,
// instead of going through the event's pages in XUI
export class NotifyClaim {
  private ccdApiHelper = new CcdApiHelper();

  async notify(c: UnspecifiedConfig, caseId: string) {
    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'NOTIFY_DEFENDANT_OF_CLAIM', caseId);
    const payload = await buildNotifyClaimPayload(c, started.caseData, c.defendantsToNotifyClaim);
    // Notifying only one of two defendants' solicitors raises a warning, which the UI continues past
    const ignoreWarning = c.defendantsToNotifyClaim !== notifyClaimOptions.BOTH;
    await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'NOTIFY_DEFENDANT_OF_CLAIM', started.token, payload, caseId, ignoreWarning);
    console.log(`NOTIFY_DEFENDANT_OF_CLAIM submitted through the API for case ${caseId}`);
  }
}
