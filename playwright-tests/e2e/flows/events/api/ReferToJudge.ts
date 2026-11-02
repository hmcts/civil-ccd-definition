import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// A legal adviser refers a general application to a judge (REFER_TO_JUDGE, "Refer to Judge", on the application) through
// the CCD API, instead of the event's page in XUI. The event asks nothing: its one page shows the application's urgency
// and types, read only (its event description and additional information page has been hidden since DTSCCI-6455). The
// application stays APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION: work allocation completes the legal adviser's
// LegalAdvisorDecideOnApplication task and creates a JudgeDecideOnApplication task. The legal adviser's task is claimed
// first, as in the UI (see WaTaskHelper). Only the page shown is submitted, as in XUI.
export class ReferToJudge {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async submit(applicationCaseId: string, user: SessionUserKey) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'REFER_TO_JUDGE', applicationCaseId, [
      { page: 'rtj' },
    ], false, true);
    console.log(`REFER_TO_JUDGE submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
