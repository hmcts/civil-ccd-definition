import { randomUUID } from 'node:crypto';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { TokensHelper } from '../../../../helpers/TokensHelper.ts';
import { ccdDate, NewQuery, QueryMessage } from '../shared_api_ui/queryManagementSpecs.ts';

// Raises a query, or asks a follow-up question, as a solicitor (queryManagementRaiseQuery) through the CCD API instead
// of XUI's query management screens. XUI adds the new message to the end of the queries collection and submits the
// collection, which is what is done here. A new query has a document attached, as the UI version does (civil-service's
// test document).
export class RaiseQuery {
  private ccdApiHelper = new CcdApiHelper();
  private testingEndpointHelper = new TestingEndPointHelper();

  // Returns the new query's ID
  async raise(caseId: string, user: SessionUserKey, query: NewQuery): Promise<string> {
    const credentials = sessionUsers[user].credentials;
    const attachment = await this.testingEndpointHelper.uploadTestDocument(credentials);
    const id = await this.submit(caseId, user, {
      subject: query.subject,
      body: query.body,
      isHearingRelated: query.hearingDate ? 'Yes' : 'No',
      ...(query.hearingDate ? { hearingDate: ccdDate(query.hearingDate) } : {}),
      attachments: [{ id: randomUUID(), value: attachment }],
    });
    console.log(`queryManagementRaiseQuery submitted through the API as ${credentials.name} on case ${caseId}`);
    return id;
  }

  // Asks a follow-up question in the thread of query (its first message). Returns the follow-up's ID.
  async followUp(caseId: string, user: SessionUserKey, query: QueryMessage, question: string): Promise<string> {
    const id = await this.submit(caseId, user, {
      subject: query.subject,
      body: question,
      parentId: query.id,
      isHearingRelated: query.isHearingRelated,
      hearingDate: query.hearingDate,
    });
    console.log(`queryManagementRaiseQuery (a follow-up question) submitted through the API as ${sessionUsers[user].credentials.name} on case ${caseId}`);
    return id;
  }

  private async submit(caseId: string, user: SessionUserKey, message: Record<string, unknown>): Promise<string> {
    const credentials = sessionUsers[user].credentials;
    await this.testingEndpointHelper.waitForNoOngoingBusinessProcess(caseId);
    const { uid } = await new TokensHelper().getNonEventTokens(credentials);
    const started = await this.ccdApiHelper.startEvent(credentials, 'queryManagementRaiseQuery', caseId);
    const id = randomUUID();
    await this.ccdApiHelper.submitEvent(credentials, 'queryManagementRaiseQuery', started.token, {
      queries: withMessage(started.caseData.queries, {
        id,
        name: credentials.name,
        createdBy: uid,
        createdOn: new Date().toISOString(),
        ...message,
      }),
    }, caseId);
    return id;
  }
}

// The queries collection with the message added at the end, as XUI adds it. The collection is made when it is the
// case's first query.
export function withMessage(queries: Record<string, any> | undefined, message: Record<string, unknown> & { id: string }) {
  return {
    partyName: 'All queries',
    ...queries,
    caseMessages: [...(queries?.caseMessages ?? []), { id: message.id, value: message }],
  };
}
