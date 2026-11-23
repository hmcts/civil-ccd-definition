import { APIRequestContext, expect, request } from '@playwright/test';
import { caseAssignmentApiBaseUrl } from '../../../../civilConfig.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TokensHelper } from '../../../../helpers/TokensHelper.ts';

// A solicitor takes over a party with a notice of change through the case assignment service
// (aac-manage-case-assignment), as XUI's Notice of change pages do: the case's challenge question is fetched, the
// client's name is checked against it, and the request is made. civil-service approves it as NOC_REQUEST is
// submitted, so the case role moves to the solicitor's organisation, the solicitor is given it, and APPLY_NOC_DECISION
// starts a business process that updates the case.
export class NoticeOfChange {
  private tokensHelper = new TokensHelper();

  async submit(caseId: string, user: SessionUserKey, clientName: string) {
    const { accessToken, s2sToken } = await this.tokensHelper.getNonEventTokens(sessionUsers[user].credentials);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ServiceAuthorization: s2sToken,
    };
    const apiRequestContext: APIRequestContext = await request.newContext();
    try {
      const questionsResponse = await apiRequestContext.get(`${caseAssignmentApiBaseUrl}/noc/noc-questions?case_id=${caseId}`, { headers });
      expect(questionsResponse.ok(), `Getting the notice of change questions for case ${caseId} returned ${questionsResponse.status()}: ${await questionsResponse.text()}`).toBeTruthy();
      const questions: Array<{ question_id: string }> = (await questionsResponse.json()).questions ?? [];
      expect(questions.map((question) => question.question_id), `Case ${caseId}'s notice of change question is not the client's name`).toEqual(['clientName']);

      const answers = { case_id: caseId, answers: [{ question_id: 'clientName', value: clientName }] };
      const verifyResponse = await apiRequestContext.post(`${caseAssignmentApiBaseUrl}/noc/verify-noc-answers`, { headers, data: answers });
      expect(verifyResponse.ok(), `The client's name "${clientName}" was not accepted for case ${caseId} (HTTP ${verifyResponse.status()}): ${await verifyResponse.text()}`).toBeTruthy();

      const requestResponse = await apiRequestContext.post(`${caseAssignmentApiBaseUrl}/noc/noc-requests`, { headers, data: answers });
      expect(requestResponse.status(), `The notice of change request for case ${caseId} returned ${requestResponse.status()}: ${await requestResponse.text()}`).toBe(201);
      const { approval_status } = await requestResponse.json();
      console.log(`Notice of change made through the API as ${user} on case ${caseId}, for "${clientName}" (${approval_status})`);
    } finally {
      await apiRequestContext.dispose();
    }
  }
}
