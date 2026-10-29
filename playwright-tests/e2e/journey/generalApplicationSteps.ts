import { expect, test } from '@playwright/test';
import CaseType from '../../enums/caseType.ts';
import GaCaseStates from '../../enums/gaCaseStates.ts';
import PaymentMethod from '../../enums/paymentMethod.ts';
import yesNo from '../../enums/yesNo.ts';
import { CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import { SessionUserKey } from '../../helpers/SessionHelper.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { ClaimShape } from '../flows/createClaimShape.ts';
import { GeneralApplication as ApiGeneralApplication } from '../flows/events/api/GeneralApplication.ts';
import { GeneralApplicationFee as ApiGeneralApplicationFee } from '../flows/events/api/GeneralApplicationFee.ts';
import { MakeDecisionOnApplication as ApiMakeDecisionOnApplication } from '../flows/events/api/MakeDecisionOnApplication.ts';
import { RespondToApplication as ApiRespondToApplication } from '../flows/events/api/RespondToApplication.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The application types the journeys can make so far
export const generalApplicationTypes = ['STAY_THE_CLAIM'];

// The parts of a journey's settings that a general application uses
export interface GaClaim {
  claimShape: ClaimShape;
  paymentMethod: PaymentMethod;
  // GENERAL_APPLICATION: the application's type, or undefined when none is made
  generalApplicationType?: string;
  // GENERAL_APPLICATION_AFTER: the step the application is made after
  generalApplicationAfter: string;
}

// The work allocation tasks for deciding an application, and who does them: civil-service's rules give an application
// at the Civil National Business Centre of some types (such as a stay) to a legal adviser, and others to a judge
const decisionTasks: Array<{ taskType: string; user: SessionUserKey; label: string }> = [
  { taskType: 'LegalAdvisorDecideOnApplication', user: 'legalAdviser', label: 'Legal Adviser' },
  { taskType: 'JudgeDecideOnApplication', user: 'judge', label: 'Judge' },
];

// Why the GENERAL_APPLICATION settings cannot be used with this claim, or undefined when they can
export function generalApplicationProblem(c: GaClaim): string | undefined {
  if (c.generalApplicationType === undefined) {
    return undefined;
  }
  if (!generalApplicationTypes.includes(c.generalApplicationType)) {
    return `Invalid GENERAL_APPLICATION value: ${c.generalApplicationType}. It must be one of ${generalApplicationTypes.join(', ')}.`;
  }
  if (c.claimShape.defendants[0].solicitor === 'none') {
    return 'GENERAL_APPLICATION needs Defendant 1 to have a solicitor, who responds to the application: applications involving a litigant in person are not covered yet.';
  }
  return undefined;
}

// Adds a general application to a journey's steps, after the GENERAL_APPLICATION_AFTER step, in group
// GENERAL_APPLICATION: the claimant's solicitor makes it with notice and pays its fee, Defendant 1's solicitor does not
// agree to it, and a legal adviser or judge (whoever work allocation gives the task to) approves the order. The
// application is a case of its own, so the claim's state is not changed by it. Without GENERAL_APPLICATION the journey
// still lists one GENERAL_APPLICATION step, skipped with the reason, as it does for other switched-off steps.
//
// The steps have no UI versions yet, so they are done through the CCD API whatever API_UNTIL says.
export function withGeneralApplication(c: GaClaim, ctx: JourneyContext, steps: JourneyStep[]): JourneyStep[] {
  const anchorIndex = steps.findIndex((step) => step.name === c.generalApplicationAfter);
  const anchor = steps[anchorIndex];
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    name: 'GENERAL_APPLICATION', title: 'The claimant\'s solicitor makes a general application.', user: 'claimantSolicitor', skipIf, invalidIf, run: async () => {},
  });

  if (anchor === undefined || anchor.closesClaim || anchor.name === 'CREATE_CLAIM') {
    const problem = `Invalid GENERAL_APPLICATION_AFTER value: ${c.generalApplicationAfter}. It must be a step after CREATE_CLAIM that does not close the claim: ${steps.slice(1).filter((step) => !step.closesClaim).map((step) => step.name).join(', ')}.`;
    const lastIndex = steps.findIndex((step) => step.closesClaim);
    const at = lastIndex === -1 ? steps.length : lastIndex;
    return [...steps.slice(0, at), placeholder([[true, problem]], () => [[c.generalApplicationType !== undefined, problem]]), ...steps.slice(at)];
  }
  if (c.generalApplicationType === undefined) {
    const off: [boolean, string] = [true, 'General applications are switched off (set GENERAL_APPLICATION=STAY_THE_CLAIM to run one)'];
    return [...steps.slice(0, anchorIndex + 1), placeholder([off]), ...steps.slice(anchorIndex + 1)];
  }
  return [...steps.slice(0, anchorIndex + 1), ...generalApplicationSteps(c, ctx, anchor), ...steps.slice(anchorIndex + 1)];
}

function generalApplicationSteps(c: GaClaim, ctx: JourneyContext, anchor: JourneyStep): JourneyStep[] {
  const type = c.generalApplicationType;
  const label = type.toLowerCase().replace(/_/g, ' ');
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
      run: async ({ user }) => {
        ctx.gaCaseId = await new ApiGeneralApplication().submit(ctx.caseId, user, { type, respondentAgreed: yesNo.NO, withNotice: yesNo.YES });
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
      run: async ({ user }) => {
        if (c.paymentMethod === PaymentMethod.CARD) {
          // Card payments are made in the UI, which the general application steps do not have yet, so civil-service is
          // told the fee was paid, as the payment service would
          console.warn('PAYMENT_METHOD=CARD: the general application fee is not paid by card yet (no UI version), so civil-service is told it was paid');
          await ctx.testingEndpointHelper.serviceRequestUpdateGeneralApplication(ctx.gaCaseId);
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.gaCaseId, 'INITIATE_GENERAL_APPLICATION_AFTER_PAYMENT');
        } else {
          await new ApiGeneralApplicationFee().pay(ctx.gaCaseId, user);
        }
        // Made with notice and not agreed, so it waits for the other side's response
        await ctx.assertGaCaseState(GaCaseStates.AWAITING_RESPONDENT_RESPONSE);
        await claimStateUnchanged();
      },
    },
    {
      name: 'GA_RESPOND',
      group: 'GENERAL_APPLICATION',
      title: 'Defendant 1 Solicitor responds to the general application.',
      user: 'respondent1Solicitor',
      skipIf: anchor.skipIf,
      run: async ({ user }) => {
        await new ApiRespondToApplication().submit(ctx.gaCaseId, user);
        await ctx.testingEndpointHelper.waitForNoOngoingBusinessProcess(ctx.gaCaseId);
        await ctx.assertGaCaseState(GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION);
        await claimStateUnchanged();
      },
    },
  ];

  // Who decides depends on where the application is and its type, so there is a step for each, and the one whose task
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
      }, ctx.gaCaseUrl());
      await new ApiMakeDecisionOnApplication().approve(ctx.gaCaseId, user);
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.gaCaseId, 'MAKE_DECISION');
      await ctx.assertGaCaseState(GaCaseStates.ORDER_MADE);
      await claimStateUnchanged();
    },
  }));
  return [...steps, ...decisionSteps];
}
