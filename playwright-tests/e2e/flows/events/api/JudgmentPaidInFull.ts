import moment from 'moment';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// Marks the live judgment as paid in full (JUDGMENT_PAID_IN_FULL, "Mark judgment as paid in full") as the claimant's
// solicitor through the CCD API, instead of the event's page in XUI, with the same answers as the UI: paid today, and
// confirmed. The page's mid event callback checks the date is not in the future or before the judgment.
export class JudgmentPaidInFull {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey = 'claimantSolicitor') {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'JUDGMENT_PAID_IN_FULL', caseId, [
      {
        page: 'MarkJudgmentPaidInFull',
        answers: {
          joJudgmentPaidInFull: {
            dateOfFullPaymentMade: moment().format('YYYY-MM-DD'),
            confirmFullPaymentMade: ['CONFIRMED'],
          },
        },
      },
    ]);
    console.log(`JUDGMENT_PAID_IN_FULL submitted through the API on case ${caseId}`);
  }
}
