import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { ReconsiderationDecision, reconsiderationDecisionOption } from '../../../../enums/reconsideration.ts';
import { upholdingReason } from '../ui/DecisionOnReconsiderationRequest.ts';

// The judge's decision on a request for reconsideration (DECISION_ON_RECONSIDERATION_REQUEST) through the CCD API,
// instead of the event's pages in XUI, with the same answers as the UI. Upholding the order runs the decision page's
// mid event callback, which generates the decision document the order preview page shows; the other answers have no
// preview page. The claim stays in CASE_PROGRESSION.
export class DecisionOnReconsiderationRequest {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, decision: ReconsiderationDecision, user: SessionUserKey = 'judge') {
    const uphold = decision === ReconsiderationDecision.UPHOLD;
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'DECISION_ON_RECONSIDERATION_REQUEST', caseId, [
      {
        page: 'JudgeResponseToReconsideration',
        answers: {
          decisionOnRequestReconsiderationOptions: reconsiderationDecisionOption[decision],
          ...(uphold ? { upholdingPreviousOrderReason: { reasonForReconsiderationTxtYes: upholdingReason } } : {}),
        },
      },
      { page: 'OrderPreview', when: () => uphold, answers: {} },
    ]);
    console.log(`DECISION_ON_RECONSIDERATION_REQUEST (${decision}) submitted through the API on case ${caseId}`);
  }
}
