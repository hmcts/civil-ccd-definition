import { expect, test } from '@playwright/test';
import CaseType from '../../enums/caseType.ts';
import GaCaseStates from '../../enums/gaCaseStates.ts';
import PaymentMethod from '../../enums/paymentMethod.ts';
import yesNo from '../../enums/yesNo.ts';
import { CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import { sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { PaymentPage } from '../page-objects/pages/payment_page.ts';
import { ClaimShape } from '../flows/createClaimShape.ts';
import { GeneralApplication } from '../flows/events/ui/GeneralApplication.ts';
import { GeneralApplication as ApiGeneralApplication } from '../flows/events/api/GeneralApplication.ts';
import { GeneralApplicationFee as ApiGeneralApplicationFee } from '../flows/events/api/GeneralApplicationFee.ts';
import { MakeDecisionOnApplication } from '../flows/events/ui/MakeDecisionOnApplication.ts';
import { MakeDecisionOnApplication as ApiMakeDecisionOnApplication } from '../flows/events/api/MakeDecisionOnApplication.ts';
import { RespondToApplication } from '../flows/events/ui/RespondToApplication.ts';
import { RespondToApplication as ApiRespondToApplication } from '../flows/events/api/RespondToApplication.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The application types the journeys can make, as "Make an application" lists them
export const generalApplicationTypes = [
  'ADJOURN_HEARING', 'AMEND_A_STMT_OF_CASE', 'EXTEND_TIME', 'RELIEF_FROM_SANCTIONS', 'SET_ASIDE_JUDGEMENT',
  'STAY_THE_CLAIM', 'STRIKE_OUT', 'SUMMARY_JUDGEMENT', 'UNLESS_ORDER', 'VARY_ORDER', 'OTHER',
];

// Application types that are listed but cannot be made by the journeys yet, and why
const unsupportedTypes: Record<string, string> = {
  VARY_PAYMENT_TERMS_OF_JUDGMENT: 'it is only offered once there is a judgment, and asks for an N245 form',
  // Agreed with the other side, it gets a ReviewApplication task for court staff (hearing-centre-admin), who approve
  // the consent order (APPROVE_CONSENT_ORDER), rather than a judge's or legal adviser's decision
  SETTLE_BY_CONSENT: 'it is approved by court staff ("Approve consent order"), which the journeys do not do yet',
};

// The parts of a journey's settings that a general application uses
export interface GaClaim {
  claimShape: ClaimShape;
  paymentMethod: PaymentMethod;
  // GENERAL_APPLICATION: the application's types (a comma separated list, such as STAY_THE_CLAIM or
  // EXTEND_TIME,STAY_THE_CLAIM), or undefined when none is made
  generalApplicationSetting?: string;
  // GENERAL_APPLICATION_AFTER: the step the application is made after
  generalApplicationAfter: string;
  // GENERAL_APPLICATION_AGREED: whether the other side has agreed to it (default No)
  generalApplicationAgreed: yesNo;
  // GENERAL_APPLICATION_WITH_NOTICE: when they have not agreed, whether it is made with notice to them (default Yes)
  generalApplicationWithNotice: yesNo;
}

// Whether the other side's solicitor responds: to an application made with notice, which civil-service takes every
// agreed application to be (they confirm they agreed). One made without notice goes to a judge or legal adviser as soon
// as its fee is paid (civil-service's EndGeneralAppBusinessProcessCallbackHandler).
function respondentResponds(c: GaClaim): boolean {
  return c.generalApplicationAgreed === yesNo.YES || c.generalApplicationWithNotice === yesNo.YES;
}

// The GENERAL_APPLICATION types, in the order given
export function generalApplicationTypesOf(c: GaClaim): string[] {
  return (c.generalApplicationSetting ?? '').split(',').map((type) => type.trim()).filter(Boolean);
}

// The work allocation tasks for deciding an application, and who does them: civil-service's rules give an application
// at the Civil National Business Centre of some types (such as a stay) to a legal adviser, and others to a judge
const decisionTasks: Array<{ taskType: string; user: SessionUserKey; label: string }> = [
  { taskType: 'LegalAdvisorDecideOnApplication', user: 'legalAdviser', label: 'Legal Adviser' },
  { taskType: 'JudgeDecideOnApplication', user: 'judge', label: 'Judge' },
];

// Why the GENERAL_APPLICATION settings cannot be used with this claim, or undefined when they can
export function generalApplicationProblem(c: GaClaim): string | undefined {
  const types = generalApplicationTypesOf(c);
  if (types.length === 0) {
    return undefined;
  }
  const problems: string[] = [];
  const unknown = types.filter((type) => !generalApplicationTypes.includes(type) && !(type in unsupportedTypes));
  if (unknown.length > 0) {
    problems.push(`${unknown.join(', ')} ${unknown.length === 1 ? 'is' : 'are'} not one of ${generalApplicationTypes.join(', ')}`);
  }
  for (const type of types.filter((type) => type in unsupportedTypes)) {
    problems.push(`${type} cannot be made yet: ${unsupportedTypes[type]}`);
  }
  if (new Set(types).size !== types.length) {
    problems.push('each type can only be given once');
  }
  // civil-service's rules for the types (InitiateGeneralApplicationHandler)
  if (types.includes('SETTLE_BY_CONSENT') && types.length > 1) {
    problems.push('SETTLE_BY_CONSENT cannot be combined with another type');
  }
  if (types.includes('SETTLE_BY_CONSENT') && c.generalApplicationAgreed !== yesNo.YES) {
    problems.push('SETTLE_BY_CONSENT must be agreed with the other side (set GENERAL_APPLICATION_AGREED=Yes)');
  }
  if (c.claimShape.defendants[0].solicitor === 'none') {
    problems.push('Defendant 1 needs a solicitor, who responds to the application: applications involving a litigant in person are not covered yet');
  }
  return problems.length ? `Invalid GENERAL_APPLICATION value: ${c.generalApplicationSetting}. ${problems.join('; ')}` : undefined;
}

// Adds a general application to a journey's steps, after the GENERAL_APPLICATION_AFTER step, in group
// GENERAL_APPLICATION: the claimant's solicitor makes it (agreed by the other side or not, and with notice or not) and
// pays its fee, Defendant 1's solicitor responds to one made with notice (confirming they agreed, or not agreeing), and a legal
// adviser or judge (whoever work allocation gives the task to) approves the order. The
// application is a case of its own, so the claim's state is not changed by it. Without GENERAL_APPLICATION the journey
// still lists one GENERAL_APPLICATION step, skipped with the reason, as it does for other switched-off steps.
//
// Each step uses its API version while the claim has not reached API_UNTIL, and the UI otherwise. A card payment is
// always made in the UI.
export function withGeneralApplication(c: GaClaim, ctx: JourneyContext, steps: JourneyStep[]): JourneyStep[] {
  const types = generalApplicationTypesOf(c);
  const anchorIndex = steps.findIndex((step) => step.name === c.generalApplicationAfter);
  const anchor = steps[anchorIndex];
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    name: 'GENERAL_APPLICATION', title: 'The claimant\'s solicitor makes a general application.', user: 'claimantSolicitor', skipIf, invalidIf, run: async () => {},
  });

  if (anchor === undefined || anchor.closesClaim || anchor.name === 'CREATE_CLAIM') {
    const problem = `Invalid GENERAL_APPLICATION_AFTER value: ${c.generalApplicationAfter}. It must be a step after CREATE_CLAIM that does not close the claim: ${steps.slice(1).filter((step) => !step.closesClaim).map((step) => step.name).join(', ')}.`;
    const lastIndex = steps.findIndex((step) => step.closesClaim);
    const at = lastIndex === -1 ? steps.length : lastIndex;
    return [...steps.slice(0, at), placeholder([[true, problem]], () => [[types.length > 0, problem]]), ...steps.slice(at)];
  }
  if (types.length === 0) {
    const off: [boolean, string] = [true, 'General applications are switched off (set GENERAL_APPLICATION to a type such as STAY_THE_CLAIM to run one)'];
    return [...steps.slice(0, anchorIndex + 1), placeholder([off]), ...steps.slice(anchorIndex + 1)];
  }
  return [...steps.slice(0, anchorIndex + 1), ...generalApplicationSteps(c, ctx, types, anchor), ...steps.slice(anchorIndex + 1)];
}

function generalApplicationSteps(c: GaClaim, ctx: JourneyContext, types: string[], anchor: JourneyStep): JourneyStep[] {
  const label = types.map((type) => type.toLowerCase().replace(/_/g, ' ')).join(', ');
  // Once its order is approved, the claimant's application to strike out is dealt with offline (civil-service's
  // StateGeneratorService); any other is left with the order made
  const stateAfterDecision = types.includes('STRIKE_OUT') ? GaCaseStates.PROCEEDS_IN_HERITAGE : GaCaseStates.ORDER_MADE;
  // The claim stays where the step the application follows left it
  const claimStateUnchanged = async () => {
    if (ctx.lastStateReached !== undefined) {
      await ctx.assertCaseState(ctx.lastStateReached);
    }
  };

  const steps: JourneyStep[] = [
    {
      name: 'GA_MAKE_APPLICATION',
      group: 'GENERAL_APPLICATION',
      title: `Claimant Solicitor makes a general application (${label}).`,
      user: 'claimantSolicitor',
      skipIf: anchor.skipIf,
      run: async ({ page, storageState, user }) => {
        const answers = { types, respondentAgreed: c.generalApplicationAgreed, withNotice: c.generalApplicationWithNotice };
        if (ctx.useApi()) {
          ctx.gaCaseId = await new ApiGeneralApplication().submit(ctx.caseId, user, answers);
        } else {
          const knownApplications = await ctx.testingEndpointHelper.generalApplicationCaseIds(ctx.caseId);
          const { name, username } = sessionUsers[user].credentials;
          await ctx.runEvent(page, storageState, async () => {
            await new GeneralApplication(page).submit(answers, name, username);
          });
          ctx.gaCaseId = await ctx.testingEndpointHelper.waitForNewGeneralApplication(ctx.caseId, knownApplications);
        }
        // civil-service gives the parties' solicitors the application as it makes it, and they are unassigned at teardown
        CaseUserRegistry.record(ctx.gaCaseId, 'claimantSolicitor');
        CaseUserRegistry.record(ctx.gaCaseId, 'respondent1Solicitor');
        await ctx.assertGaCaseState(GaCaseStates.AWAITING_APPLICATION_PAYMENT);
        await claimStateUnchanged();
      },
    },
    {
      name: 'GA_PAY_FEE',
      group: 'GENERAL_APPLICATION',
      title: 'Claimant Solicitor pays the general application fee.',
      user: 'claimantSolicitor',
      skipIf: anchor.skipIf,
      run: async ({ page, storageState, user }) => {
        if (ctx.useApi() && c.paymentMethod === PaymentMethod.PBA) {
          await new ApiGeneralApplicationFee().pay(ctx.gaCaseId, user);
        } else {
          // Paid from the application's own Service Request tab
          const serviceRequestReference = await ctx.testingEndpointHelper.waitForServiceRequestReference(ctx.gaCaseId, 'generalAppPBADetails');
          await ctx.runEvent(page, storageState, async () => {
            await ctx.pageHelper.gotoAndWaitForXui(ctx.gaCaseUrl());
            await new PaymentPage(page).makePayment(c.paymentMethod, serviceRequestReference);
          }, ctx.gaCaseUrl());
          // The payment service tells civil-service; the test only does so if it has not within a minute, as telling
          // it both ways would run the business process twice
          if (!await ctx.testingEndpointHelper.waitForFeePaid(ctx.gaCaseId, 'generalAppPBADetails.paymentDetails', 60)) {
            console.log('The payment service did not record the general application fee payment, so the test does');
            await ctx.testingEndpointHelper.serviceRequestUpdateGeneralApplication(ctx.gaCaseId);
          }
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.gaCaseId, 'INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT');
        }
        // Made with notice and not agreed, it waits for the other side's response; otherwise it goes to a judge or legal
        // adviser
        await ctx.assertGaCaseState(respondentResponds(c)
          ? GaCaseStates.AWAITING_RESPONDENT_RESPONSE
          : GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION);
        await claimStateUnchanged();
      },
    },
    {
      name: 'GA_RESPOND',
      group: 'GENERAL_APPLICATION',
      title: 'Defendant 1 Solicitor responds to the general application.',
      user: 'respondent1Solicitor',
      skipIf: [
        ...(anchor.skipIf ?? []),
        [!respondentResponds(c), 'Skipping as the application was made without notice, so the other side does not respond'],
      ],
      run: async ({ page, storageState, user }) => {
        if (ctx.useApi()) {
          await new ApiRespondToApplication().submit(ctx.gaCaseId, user);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await ctx.pageHelper.gotoAndWaitForXui(ctx.gaCaseUrl());
            await new RespondToApplication(page).submit(sessionUsers[user].credentials.username);
          }, ctx.gaCaseUrl());
        }
        await ctx.testingEndpointHelper.waitForNoOngoingBusinessProcess(ctx.gaCaseId);
        await ctx.assertGaCaseState(GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION);
        await claimStateUnchanged();
      },
    },
  ];

  // Who decides depends on where the application is and its types, so there is a step for each, and the one whose task
  // work allocation did not create is skipped when it runs
  let decisionTask: Promise<string | undefined> | undefined;
  const decisionSteps: JourneyStep[] = decisionTasks.map(({ taskType, user, label: decider }) => ({
    name: `GA_DECISION_${user === 'judge' ? 'JUDGE' : 'LEGAL_ADVISER'}`,
    group: 'GENERAL_APPLICATION',
    title: `${decider} approves the general application.`,
    user,
    skipIf: anchor.skipIf,
    run: async ({ page, storageState }) => {
      decisionTask ??= WaTaskHelper.createdTaskType(ctx.gaCaseId, decisionTasks.map((task) => task.taskType));
      const created = await decisionTask;
      expect(created, `Work allocation created no task to decide application ${ctx.gaCaseId}`).toBeDefined();
      test.skip(created !== taskType, `Skipping as work allocation gave the decision to ${decisionTasks.find((task) => task.taskType === created)?.label} (${created})`);
      await ctx.runEvent(page, storageState, async () => {
        await ctx.pageHelper.gotoAndWaitForXui(ctx.gaCaseUrl());
        await new WaTaskHelper(page, CaseType.GENERAL_APPLICATION).assignTaskForEvent(ctx.gaCaseId, 'MAKE_DECISION', taskType);
        if (!ctx.useApi()) {
          await new MakeDecisionOnApplication(page).approve();
        }
      }, ctx.gaCaseUrl());
      if (ctx.useApi()) {
        await new ApiMakeDecisionOnApplication().approve(ctx.gaCaseId, user);
      }
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.gaCaseId, 'MAKE_DECISION');
      await ctx.assertGaCaseState(stateAfterDecision);
      await claimStateUnchanged();
    },
  }));
  return [...steps, ...decisionSteps];
}
