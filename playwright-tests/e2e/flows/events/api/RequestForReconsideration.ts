import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { RequestForReconsiderationBy, reconsiderationReasonField } from '../../../../enums/reconsideration.ts';
import { reconsiderationReason } from '../ui/RequestForReconsideration.ts';

// Asks for the legal adviser's small claims order to be reconsidered (REQUEST_FOR_RECONSIDERATION) as a party's
// solicitor through the CCD API, instead of the event's page in XUI, with the same reason as the UI. The event's start
// checks the claim is £10,000 or less and the order is under 7 days old, and works out the party from the user's case
// role. The claim stays in CASE_PROGRESSION.
export class RequestForReconsideration {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, by: RequestForReconsiderationBy, user: SessionUserKey) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'REQUEST_FOR_RECONSIDERATION', caseId, [
      { page: 'RequestForReconsideration', answers: { [reconsiderationReasonField[by]]: { reasonForReconsiderationTxt: reconsiderationReason } } },
    ]);
    console.log(`REQUEST_FOR_RECONSIDERATION submitted through the API on case ${caseId} (${by})`);
  }
}
