import { SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// Query management: a party's solicitor raises a query with the court (queryManagementRaiseQuery, "Raise a new query"),
// a CTSC admin answers it (queryManagementRespondQuery, "Respond to a query"), and the solicitor can ask a follow-up
// question in the same thread, which is raised with the same event and answered again.
//
// The queries are in one collection, queries ("All queries"), which every party and court staff can see. A query's
// replies (responses and follow-ups) have its ID as their parentId, which is how civil-service and XUI group them into
// a thread. civil-service refuses a follow-up while the solicitor's last message is still unanswered.

// Whose solicitor raises a query (QUERY_MANAGEMENT, a list such as claimant,defendant1)
export type QueryParty = 'claimant' | 'defendant1' | 'defendant2';

export const queryParties: Record<QueryParty, { user: SessionUserKey; label: string; step: string }> = {
  claimant: { user: 'claimantSolicitor', label: 'Claimant Solicitor', step: 'CLAIMANT' },
  defendant1: { user: 'respondent1Solicitor', label: 'Defendant 1 Solicitor', step: 'DEFENDANT1' },
  defendant2: { user: 'respondent2Solicitor', label: 'Defendant 2 Solicitor', step: 'DEFENDANT2' },
};

// What a solicitor enters for a new query. A hearing related query also has the hearing's date.
export interface NewQuery {
  subject: string;
  body: string;
  hearingDate?: Date;
}

// The query a party's solicitor raises, with a subject of its own so it can be found among the other parties' queries
export function newQueryFor(party: QueryParty, hearingRelated: boolean): NewQuery {
  const { label } = queryParties[party];
  return {
    subject: `${label} query${hearingRelated ? ' about the hearing' : ''}`,
    body: `This query was raised by the ${label} in playwright-tests.`,
    hearingDate: hearingRelated ? hearingDateForQuery() : undefined,
  };
}

export function followUpQuestionFor(party: QueryParty): string {
  return `The ${queryParties[party].label}'s follow-up question, asked in playwright-tests.`;
}

export function queryResponseFor(party: QueryParty, followUp: boolean): string {
  return `CTSC's response to the ${queryParties[party].label}'s ${followUp ? 'follow-up question' : 'query'}, given in playwright-tests.`;
}

// The hearing a hearing related query is about: ten days from today
function hearingDateForQuery(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  return date;
}

// The date as CCD holds it (YYYY-MM-DD)
export function ccdDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// One message in the queries collection, as civil-service saves it
export interface QueryMessage {
  id: string;
  subject?: string;
  name?: string;
  body?: string;
  parentId?: string;
  isHearingRelated?: string;
  hearingDate?: string;
  createdOn?: string;
}

// The messages in the case's queries collection
export function queryMessages(caseData: Record<string, any>): QueryMessage[] {
  return (caseData.queries?.caseMessages ?? []).map((element) => element.value as QueryMessage);
}
