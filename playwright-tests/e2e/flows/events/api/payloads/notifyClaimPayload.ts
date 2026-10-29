import claimTypes from '../../../../../enums/claim-types.ts';
import notifyClaimOptions from '../../../../../enums/notifyClaimOptions.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';
import { certificateOfService, defendantToNotify } from './certificateOfService.ts';

// The case data for NOTIFY_DEFENDANT_OF_CLAIM, as the UI's NotifyClaim submits it: in a 1v2DS claim the defendant
// solicitor(s) to notify, and a Certificate of Service for each defendant who is a litigant in person.
// startCaseData is the case data CCD returned when the event was started, which holds the list of whom to notify.
export async function buildNotifyClaimPayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  whomToNotify: notifyClaimOptions,
): Promise<Record<string, any>> {
  if (c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL) {
    return defendantToNotify(startCaseData, 'defendantSolicitorNotifyClaimOptions', whomToNotify);
  }
  const data: Record<string, any> = {};
  for (const [index, defendant] of c.claimShape.defendants.entries()) {
    if (defendant.solicitor === 'none') {
      data[`cosNotifyClaimDefendant${index + 1}`] = await certificateOfService(index + 1);
    }
  }
  return data;
}
