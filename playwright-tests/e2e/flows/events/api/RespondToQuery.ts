import { randomUUID } from 'node:crypto';
import { ctscAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { TokensHelper } from '../../../../helpers/TokensHelper.ts';
import { QueryMessage } from '../shared_api_ui/queryManagementSpecs.ts';
import { withMessage } from './RaiseQuery.ts';

// Answers a query as the CTSC admin (queryManagementRespondQuery) through the CCD API instead of XUI's response screen.
// The response goes in the query's thread (its parentId is the query's ID), whether it answers the query itself or a
// follow-up question. Work allocation does not complete the CTSC task for a response sent this way, so the journey
// step completes it, as XUI does when the response is submitted from the task.
export class RespondToQuery {
  private ccdApiHelper = new CcdApiHelper();
  private testingEndpointHelper = new TestingEndPointHelper();

  // query is the thread's first message. Returns the response's ID.
  async respond(caseId: string, query: QueryMessage, response: string): Promise<string> {
    await this.testingEndpointHelper.waitForNoOngoingBusinessProcess(caseId);
    const { uid } = await new TokensHelper().getNonEventTokens(ctscAdminCredentials);
    const started = await this.ccdApiHelper.startEvent(ctscAdminCredentials, 'queryManagementRespondQuery', caseId);
    const id = randomUUID();
    await this.ccdApiHelper.submitEvent(ctscAdminCredentials, 'queryManagementRespondQuery', started.token, {
      queries: withMessage(started.caseData.queries, {
        id,
        subject: query.subject,
        name: ctscAdminCredentials.name,
        body: response,
        parentId: query.id,
        isHearingRelated: query.isHearingRelated,
        hearingDate: query.hearingDate,
        createdBy: uid,
        createdOn: new Date().toISOString(),
      }),
    }, caseId);
    console.log(`queryManagementRespondQuery submitted through the API as ${ctscAdminCredentials.name} on case ${caseId}`);
    return id;
  }
}
