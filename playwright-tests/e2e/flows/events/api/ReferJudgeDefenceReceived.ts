import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Refers the claim to a judge because a defence was received in time (REFER_JUDGE_DEFENCE_RECEIVED, "Refer to
// judge-defended claim") as the hearing centre admin through the CCD API, instead of the event's page in XUI, confirming
// it as the UI does
export class ReferJudgeDefenceReceived {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'REFER_JUDGE_DEFENCE_RECEIVED', caseId, [
      { page: 'ReferJudgeDefenceReceived', answers: { confirmReferToJudgeDefenceReceived: ['CONFIRM'] } },
    ]);
    console.log(`REFER_JUDGE_DEFENCE_RECEIVED submitted through the API on case ${caseId}`);
  }
}
