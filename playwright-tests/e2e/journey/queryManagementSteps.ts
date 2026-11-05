import { expect } from '@playwright/test';
import { workAllocation } from '../../civilConfig.ts';
import yesNo from '../../enums/yesNo.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { ClaimShape } from '../flows/createClaimShape.ts';
import { RaiseQuery } from '../flows/events/ui/RaiseQuery.ts';
import { RaiseQuery as ApiRaiseQuery } from '../flows/events/api/RaiseQuery.ts';
import { RespondToQuery } from '../flows/events/ui/RespondToQuery.ts';
import { RespondToQuery as ApiRespondToQuery } from '../flows/events/api/RespondToQuery.ts';
import {
  followUpQuestionFor,
  newQueryFor,
  QueryMessage,
  queryMessages,
  QueryParty,
  queryParties,
  queryResponseFor,
} from '../flows/events/shared_api_ui/queryManagementSpecs.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The parts of a journey's settings that query management uses
export interface QueryClaim {
  // The run's settings as given, so their values can be checked before they are read as yes or no
  scenarioEnv: Record<string, string | undefined>;
  claimShape: ClaimShape;
  // QUERY_MANAGEMENT: whose solicitors raise a query (a comma separated list such as claimant,defendant1), or undefined
  // when no one does
  queryManagementSetting?: string;
  // QUERY_MANAGEMENT_AFTER: the step the queries are raised after
  queryManagementAfter: string;
  // QUERY_MANAGEMENT_HEARING_RELATED: whether the queries are about a hearing, which asks for the hearing's date
  // (default No)
  queryManagementHearingRelated: yesNo;
  // QUERY_MANAGEMENT_FOLLOW_UP: whether each solicitor asks a follow-up question once CTSC has answered, which CTSC then
  // answers too (default No)
  queryManagementFollowUp: yesNo;
  // The step after which each defendant's solicitor has the case, so can raise a query: their acknowledgement in an
  // unspecified claim, ASSIGN_DEFENDANT_SOLICITORS in a specified one
  defendantSolicitorAssignedAfter: Record<1 | 2, string>;
}

const queryTask = 'respondToQueryCTSC';

// The QUERY_MANAGEMENT parties, in the order given
export function queryPartiesOf(c: QueryClaim): string[] {
  return (c.queryManagementSetting ?? '').split(',').map((party) => party.trim()).filter(Boolean);
}

const yesNoSettings = ['QUERY_MANAGEMENT_HEARING_RELATED', 'QUERY_MANAGEMENT_FOLLOW_UP'];

// Why the QUERY_MANAGEMENT settings cannot be used with this claim, or undefined when they can. Where the queries go
// (QUERY_MANAGEMENT_AFTER) is checked by withQueryManagement, which has the journey's steps.
export function queryManagementProblem(c: QueryClaim): string | undefined {
  const parties = queryPartiesOf(c);
  if (parties.length === 0) {
    return undefined;
  }
  const problems: string[] = [];
  const unknown = parties.filter((party) => !(party in queryParties));
  if (unknown.length > 0) {
    problems.push(`${unknown.join(', ')} ${unknown.length === 1 ? 'is' : 'are'} not one of ${Object.keys(queryParties).join(', ')}`);
  }
  if (new Set(parties).size !== parties.length) {
    problems.push('each party can only be given once');
  }
  const defendants = c.claimShape.defendants;
  for (const [party, defendant] of [['defendant1', defendants[0]], ['defendant2', defendants[1]]] as const) {
    if (!parties.includes(party)) {
      continue;
    }
    if (defendant === undefined) {
      problems.push(`${party}: the claim has one defendant`);
    } else if (defendant.solicitor === 'none') {
      problems.push(`${party} is a litigant in person, who raises queries in the citizen UI, which is not covered`);
    } else if (defendant.solicitor === 'sameAsDefendant1') {
      problems.push(`${party} shares Defendant 1's solicitor, so give defendant1 instead`);
    }
  }
  // The yes or no settings are read as No unless they are exactly Yes, so a typo such as QUERY_MANAGEMENT_FOLLOW_UP=yes
  // would quietly leave the follow-up out
  for (const setting of yesNoSettings) {
    const value = c.scenarioEnv[setting];
    if (value !== undefined && value !== 'Yes' && value !== 'No') {
      problems.push(`${setting}=${value} must be Yes or No`);
    }
  }
  return problems.length ? `Invalid QUERY_MANAGEMENT value: ${c.queryManagementSetting}. ${problems.join('; ')}` : undefined;
}

// Adds query management to a journey's steps, after the QUERY_MANAGEMENT_AFTER step, in group QUERY_MANAGEMENT. For
// each QUERY_MANAGEMENT party in turn, their solicitor raises a query (about a hearing with
// QUERY_MANAGEMENT_HEARING_RELATED=Yes) and the CTSC admin answers it; with QUERY_MANAGEMENT_FOLLOW_UP=Yes the solicitor
// then asks a follow-up question, which the CTSC admin answers too. Queries do not change the claim's state. Without
// QUERY_MANAGEMENT the journey still lists one QUERY_MANAGEMENT step, skipped with the reason, as it does for other
// switched-off steps.
//
// Each step uses its API version while the claim has not reached API_UNTIL, and the UI otherwise.
export function withQueryManagement(c: QueryClaim, ctx: JourneyContext, steps: JourneyStep[]): JourneyStep[] {
  const parties = queryPartiesOf(c).filter((party): party is QueryParty => party in queryParties);
  const anchorIndex = steps.findIndex((step) => step.name === c.queryManagementAfter);
  const anchor = steps[anchorIndex];
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    name: 'QUERY_MANAGEMENT', title: 'A solicitor raises a query and CTSC answers it.', user: 'claimantSolicitor', skipIf, invalidIf, run: async () => {},
  });

  if (anchor === undefined || anchor.closesClaim) {
    const problem = `Invalid QUERY_MANAGEMENT_AFTER value: ${c.queryManagementAfter}. It must be a step that does not close the claim: ${steps.filter((step) => !step.closesClaim).map((step) => step.name).join(', ')}.`;
    const lastIndex = steps.findIndex((step) => step.closesClaim);
    const at = lastIndex === -1 ? steps.length : lastIndex;
    return [...steps.slice(0, at), placeholder([[true, problem]], () => [[parties.length > 0, problem]]), ...steps.slice(at)];
  }
  if (parties.length === 0) {
    const off: [boolean, string] = [true, 'Query management is switched off (set QUERY_MANAGEMENT to a list such as claimant,defendant1 to run it)'];
    return [...steps.slice(0, anchorIndex + 1), placeholder([off]), ...steps.slice(anchorIndex + 1)];
  }
  // A defendant's solicitor can only raise a query once they have the case
  const tooEarly = parties
    .filter((party) => party !== 'claimant')
    .filter((party) => anchorIndex < steps.findIndex((step) => step.name === c.defendantSolicitorAssignedAfter[party === 'defendant1' ? 1 : 2]))
    .map((party) => `${party}'s solicitor only has the case after ${c.defendantSolicitorAssignedAfter[party === 'defendant1' ? 1 : 2]}`);
  if (tooEarly.length > 0) {
    const problem = `Invalid QUERY_MANAGEMENT_AFTER value: ${c.queryManagementAfter}. ${tooEarly.join('; ')}.`;
    return [...steps.slice(0, anchorIndex + 1), placeholder([[true, problem]], () => [[true, problem]]), ...steps.slice(anchorIndex + 1)];
  }
  return [...steps.slice(0, anchorIndex + 1), ...parties.flatMap((party) => queryStepsFor(c, ctx, party, anchor)), ...steps.slice(anchorIndex + 1)];
}

// The steps for one party's query: raise it, CTSC answers, and with QUERY_MANAGEMENT_FOLLOW_UP=Yes a follow-up question
// and its answer. Each step checks what it added to the queries collection and that the claim's state has not changed.
function queryStepsFor(c: QueryClaim, ctx: JourneyContext, party: QueryParty, anchor: JourneyStep): JourneyStep[] {
  const { user, label, step } = queryParties[party];
  const hearingRelated = c.queryManagementHearingRelated === yesNo.YES;
  const query = newQueryFor(party, hearingRelated);
  const question = followUpQuestionFor(party);
  const noFollowUp: [boolean, string] = [
    c.queryManagementFollowUp !== yesNo.YES,
    'Skipping as no follow-up question is asked (set QUERY_MANAGEMENT_FOLLOW_UP=Yes to ask one)',
  ];
  // The query's first message, once it has been raised, which its replies point to
  let raised: QueryMessage | undefined;
  const raisedQuery = () => {
    expect(raised, `${label}'s query "${query.subject}" has not been raised`).toBeDefined();
    return raised;
  };

  // The claim stays where the step the queries follow left it
  const claimStateUnchanged = async () => {
    if (ctx.lastStateReached !== undefined) {
      await ctx.assertCaseState(ctx.lastStateReached);
    }
  };

  // Checks the message is the case's latest query and work allocation has given CTSC a task to answer it. Only where
  // the test can see Camunda's tasks (CAMUNDA_URL is set, or a preview).
  const checkAwaitingResponse = async (caseData: Record<string, any>, message: QueryMessage) => {
    expect(caseData.qmLatestQuery?.queryId, `The case's latest query (qmLatestQuery) is not ${label}'s message`).toBe(message.id);
    if (workAllocation.hasCamunda) {
      const created = await WaTaskHelper.createdTaskType(ctx.caseId, [queryTask]);
      expect(created, `Work allocation did not give CTSC a ${queryTask} task for ${label}'s query`).toBe(queryTask);
    }
  };

  const raiseStep: JourneyStep = {
    name: `QUERY_RAISE_${step}`,
    group: 'QUERY_MANAGEMENT',
    title: `${label} raises a query${hearingRelated ? ' about the hearing' : ''}.`,
    user,
    skipIf: anchor.skipIf,
    run: async ({ page, storageState, user: sessionUser }) => {
      if (ctx.useApi()) {
        await new ApiRaiseQuery().raise(ctx.caseId, sessionUser, query);
      } else {
        await ctx.runEvent(page, storageState, async () => {
          await new RaiseQuery(page).raise(ctx.caseId, query);
        });
      }
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'queryManagementRaiseQuery');

      const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      raised = queryMessages(caseData).find((message) => message.subject === query.subject && !message.parentId);
      expect(raised, `${label}'s query "${query.subject}" was not saved in the case's queries`).toBeDefined();
      expect(raised.body, `${label}'s query was saved with the wrong text`).toBe(query.body);
      expect(raised.isHearingRelated, `${label}'s query was not saved as ${hearingRelated ? '' : 'not '}hearing related`).toBe(hearingRelated ? 'Yes' : 'No');
      await checkAwaitingResponse(caseData, raised);
      await claimStateUnchanged();
    },
  };

  // CTSC answers the thread's latest message: the query, or the follow-up question
  const respondStep = (followUp: boolean): JourneyStep => {
    const response = queryResponseFor(party, followUp);
    return {
      name: followUp ? `QUERY_RESPOND_FOLLOW_UP_${step}` : `QUERY_RESPOND_${step}`,
      group: 'QUERY_MANAGEMENT',
      title: `CTSC Admin responds to the ${label}'s ${followUp ? 'follow-up question' : 'query'}.`,
      user: 'ctscAdmin',
      skipIf: followUp ? [...(anchor.skipIf ?? []), noFollowUp] : anchor.skipIf,
      run: async ({ page, storageState }) => {
        const thread = raisedQuery();
        const latestMessageId = (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).qmLatestQuery?.queryId;
        let taskId: string | undefined;
        await ctx.runEvent(page, storageState, async () => {
          // Where XUI only lets CTSC respond with the task (such as AAT), it is claimed
          taskId = await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'queryManagementRespondQuery', queryTask);
          if (!ctx.useApi()) {
            await new RespondToQuery(page).respond(ctx.caseId, latestMessageId, followUp ? question : query.body, response);
          }
        });
        if (ctx.useApi()) {
          await new ApiRespondToQuery().respond(ctx.caseId, thread, response);
          // XUI completes the task as it submits the response, but work allocation does not complete it for a response
          // sent through the CCD API, so it is completed here. Left open, it would sit beside the task for a follow-up.
          if (taskId) {
            await new WaTaskHelper(page).completeTask(taskId);
          }
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'queryManagementRespondQuery');

        const messages = queryMessages(await ctx.testingEndpointHelper.getCaseData(ctx.caseId));
        expect(
          messages.some((message) => message.parentId === thread.id && message.body === response),
          `CTSC's response to ${label}'s ${followUp ? 'follow-up question' : 'query'} was not saved in the query's thread`,
        ).toBe(true);
        await claimStateUnchanged();
      },
    };
  };

  const followUpStep: JourneyStep = {
    name: `QUERY_FOLLOW_UP_${step}`,
    group: 'QUERY_MANAGEMENT',
    title: `${label} asks a follow-up question on their query.`,
    user,
    skipIf: [...(anchor.skipIf ?? []), noFollowUp],
    run: async ({ page, storageState, user: sessionUser }) => {
      const thread = raisedQuery();
      if (ctx.useApi()) {
        await new ApiRaiseQuery().followUp(ctx.caseId, sessionUser, thread, question);
      } else {
        await ctx.runEvent(page, storageState, async () => {
          await new RaiseQuery(page).followUp(ctx.caseId, query.subject, queryResponseFor(party, false), question);
        });
      }
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'queryManagementRaiseQuery');

      const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      const asked = queryMessages(caseData).find((message) => message.parentId === thread.id && message.body === question);
      expect(asked, `${label}'s follow-up question was not saved in the query's thread`).toBeDefined();
      await checkAwaitingResponse(caseData, asked);
      await claimStateUnchanged();
    },
  };

  return [raiseStep, respondStep(false), followUpStep, respondStep(true)];
}
