import { expect, test } from '@playwright/test';
import CaseType from '../../enums/caseType.ts';
import GaCaseStates from '../../enums/gaCaseStates.ts';
import PaymentMethod from '../../enums/paymentMethod.ts';
import yesNo from '../../enums/yesNo.ts';
import { CaseUserKey, CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import { sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { PaymentPage } from '../page-objects/pages/payment_page.ts';
import { ClaimShape } from '../flows/createClaimShape.ts';
import { GeneralApplication } from '../flows/events/ui/GeneralApplication.ts';
import { GeneralApplication as ApiGeneralApplication } from '../flows/events/api/GeneralApplication.ts';
import { GeneralApplicationFee as ApiGeneralApplicationFee } from '../flows/events/api/GeneralApplicationFee.ts';
import { MakeDecisionOnApplication } from '../flows/events/ui/MakeDecisionOnApplication.ts';
import { MakeDecisionOnApplication as ApiMakeDecisionOnApplication } from '../flows/events/api/MakeDecisionOnApplication.ts';
import { ApproveConsentOrder } from '../flows/events/ui/ApproveConsentOrder.ts';
import { ApproveConsentOrder as ApiApproveConsentOrder } from '../flows/events/api/ApproveConsentOrder.ts';
import { ReferToJudge } from '../flows/events/ui/ReferToJudge.ts';
import { ReferToJudge as ApiReferToJudge } from '../flows/events/api/ReferToJudge.ts';
import { RespondToApplication } from '../flows/events/ui/RespondToApplication.ts';
import { RespondToApplication as ApiRespondToApplication } from '../flows/events/api/RespondToApplication.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The application types the journeys can make, as "Make an application" lists them
export const generalApplicationTypes = [
  'ADJOURN_HEARING', 'AMEND_A_STMT_OF_CASE', 'EXTEND_TIME', 'RELIEF_FROM_SANCTIONS', 'SET_ASIDE_JUDGEMENT',
  'SETTLE_BY_CONSENT', 'STAY_THE_CLAIM', 'STRIKE_OUT', 'SUMMARY_JUDGEMENT', 'UNLESS_ORDER', 'VARY_ORDER', 'OTHER',
];

// Application types that are listed but cannot be made by the journeys yet, and why
const unsupportedTypes: Record<string, string> = {
  VARY_PAYMENT_TERMS_OF_JUDGMENT: 'it is only offered once there is a judgment, and asks for an N245 form',
};

// The parts of a journey's settings that a general application uses
export interface GaClaim {
  // The run's settings as given, so their values can be checked before they are read as yes or no
  scenarioEnv: Record<string, string | undefined>;
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
  // GENERAL_APPLICATION_URGENT: whether it is urgent (default No)
  generalApplicationUrgent: yesNo;
  // GENERAL_APPLICATION_BY: whose solicitor makes it (default claimant)
  generalApplicationBy: string;
  // GENERAL_APPLICATION_REFER_TO_JUDGE: whether a legal adviser given the decision refers it to a judge, who then decides
  // it (default No)
  generalApplicationReferToJudge: yesNo;
}

// The parties who can make an application, each with their solicitor's session user and a label
export type GaParty = 'claimant' | 'defendant1' | 'defendant2';
const gaParties: Record<GaParty, { user: SessionUserKey; label: string; step: string }> = {
  claimant: { user: 'claimantSolicitor', label: 'Claimant Solicitor', step: 'CLAIMANT' },
  defendant1: { user: 'respondent1Solicitor', label: 'Defendant 1 Solicitor', step: 'DEFENDANT1' },
  defendant2: { user: 'respondent2Solicitor', label: 'Defendant 2 Solicitor', step: 'DEFENDANT2' },
};

// The other parties' solicitors, who respond to an application made with notice: one response from each organisation
// (civil-service's RespondentsResponsesUtil), so a solicitor acting for both defendants (1v2SS) responds once, for
// Defendant 1. Two claimants share one solicitor.
function respondingParties(c: GaClaim): GaParty[] {
  const defendants = c.claimShape.defendants;
  const ownSolicitorDefendants: GaParty[] = defendants[1]?.solicitor === 'own' ? ['defendant1', 'defendant2'] : ['defendant1'];
  return (['claimant', ...ownSolicitorDefendants] as GaParty[]).filter((party) => party !== c.generalApplicationBy);
}

// Whether the other side's solicitor responds: to an application made with notice, which civil-service takes every
// agreed application to be (they confirm they agreed). One made without notice goes to a judge or legal adviser as soon
// as its fee is paid (civil-service's EndGeneralAppBusinessProcessCallbackHandler).
// A solicitor's application to settle by consent (on its own, as it must be) goes straight to the court once its fee is
// paid, as the other side has already agreed to it (isLRConsentApplication).
// An urgent application also goes straight to the court, even one made with notice (isNotificationCriteriaSatisfied).
function respondentResponds(c: GaClaim): boolean {
  const types = generalApplicationTypesOf(c);
  if (types.length === 1 && types[0] === 'SETTLE_BY_CONSENT') {
    return false;
  }
  if (c.generalApplicationUrgent === yesNo.YES) {
    return false;
  }
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

// An application the other side agreed to is a consent order, and those of the types court staff can deal with (such
// as Settle by consent or a stay, but not a strike out) get a ReviewApplication task for court staff instead, who
// approve the consent order (APPROVE_CONSENT_ORDER). It is the National Business Centre's admin while the application
// is at the Civil National Business Centre, and the hearing centre's admin once it has moved to a hearing centre
// (civil-wa-task-configuration's GA permissions DMN).
const consentOrderTask = 'ReviewApplication';
const consentOrderReviewers: Array<{ user: SessionUserKey; label: string; atNationalBusinessCentre: boolean; step: string }> = [
  { user: 'nbcAdmin', label: 'National Business Centre Admin', atNationalBusinessCentre: true, step: 'NBC_ADMIN' },
  { user: 'hearingCentreAdmin', label: 'Hearing Centre Admin', atNationalBusinessCentre: false, step: 'HEARING_CENTRE_ADMIN' },
];

// Who does a decision task, for the reasons a step is skipped
function deciderOf(taskType: string | undefined): string {
  if (taskType === consentOrderTask) {
    return 'court staff';
  }
  return decisionTasks.find((task) => task.taskType === taskType)?.label ?? 'no one';
}

// The general application settings that take Yes or No
const yesNoSettings = [
  'GENERAL_APPLICATION_AGREED',
  'GENERAL_APPLICATION_WITH_NOTICE',
  'GENERAL_APPLICATION_URGENT',
  'GENERAL_APPLICATION_REFER_TO_JUDGE',
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
  // The yes or no settings are read as their default unless they are exactly the other answer, so a typo such as
  // GENERAL_APPLICATION_URGENT=yes would quietly run a non-urgent application
  for (const setting of yesNoSettings) {
    const value = c.scenarioEnv[setting];
    if (value !== undefined && value !== 'Yes' && value !== 'No') {
      problems.push(`${setting}=${value} must be Yes or No`);
    }
  }
  if (!(c.generalApplicationBy in gaParties)) {
    problems.push(`GENERAL_APPLICATION_BY=${c.generalApplicationBy} is not one of ${Object.keys(gaParties).join(', ')}`);
  }
  if (c.generalApplicationBy === 'defendant2' && c.claimShape.defendants[1]?.solicitor !== 'own') {
    problems.push('GENERAL_APPLICATION_BY=defendant2 needs Defendant 2 to have their own solicitor (1v2DS)');
  }
  if (c.claimShape.defendants.some((defendant) => defendant.solicitor === 'none')) {
    problems.push('every defendant needs a solicitor: applications involving a litigant in person are not covered yet');
  }
  return problems.length
    ? `Invalid general application settings (GENERAL_APPLICATION=${c.generalApplicationSetting}): ${problems.join('; ')}`
    : undefined;
}

// Adds a general application to a journey's steps, after the GENERAL_APPLICATION_AFTER step, in group
// GENERAL_APPLICATION: the claimant's solicitor makes it (agreed by the other side or not, and with notice or not) and
// pays its fee (or a defendant's solicitor does, GENERAL_APPLICATION_BY), the other parties' solicitors respond to one
// made with notice (confirming they agreed, or not agreeing), and a legal
// adviser or judge (whoever work allocation gives the task to) approves the order, or court staff approve an agreed one
// as a consent order where work allocation gives it to them (ReviewApplication, such as Settle by consent). With
// GENERAL_APPLICATION_REFER_TO_JUDGE=Yes, a legal adviser given the task refers it to a judge (GA_REFER_TO_JUDGE), who
// approves it instead. The
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
  const label = types.map((type) => type.toLowerCase().replace(/_/g, ' ')).join(', ')
    + (c.generalApplicationUrgent === yesNo.YES ? ', urgent' : '');
  // Why the other side does not respond, when they do not
  const notRespondingReason = () => {
    if (types.includes('SETTLE_BY_CONSENT')) {
      return 'Skipping as an application to settle by consent goes straight to the court, so the other side does not respond';
    }
    if (c.generalApplicationUrgent === yesNo.YES) {
      return 'Skipping as the application is urgent, so it goes straight to the court and the other side does not respond';
    }
    return 'Skipping as the application was made without notice, so the other side does not respond';
  };
  const applicant = gaParties[c.generalApplicationBy as GaParty];
  const respondents = respondingParties(c);
  // Once its order is approved, the claimant's application to strike out is dealt with offline (civil-service's
  // StateGeneratorService); any other is left with the order made
  const stateAfterDecision = types.includes('STRIKE_OUT') && c.generalApplicationBy === 'claimant'
    ? GaCaseStates.PROCEEDS_IN_HERITAGE
    : GaCaseStates.ORDER_MADE;
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
      title: `${applicant.label} makes a general application (${label}).`,
      user: applicant.user,
      skipIf: anchor.skipIf,
      run: async ({ page, storageState, user }) => {
        const answers = {
          types,
          respondentAgreed: c.generalApplicationAgreed,
          withNotice: c.generalApplicationWithNotice,
          urgent: c.generalApplicationUrgent,
        };
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
        for (const party of [c.generalApplicationBy as GaParty, ...respondents]) {
          CaseUserRegistry.record(ctx.gaCaseId, gaParties[party].user as CaseUserKey);
        }
        await ctx.assertGaCaseState(GaCaseStates.AWAITING_APPLICATION_PAYMENT);
        await claimStateUnchanged();
      },
    },
    {
      name: 'GA_PAY_FEE',
      group: 'GENERAL_APPLICATION',
      title: `${applicant.label} pays the general application fee.`,
      user: applicant.user,
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
        // Made with notice or agreed, it waits for the other side's response; otherwise (or to settle by consent) it goes
        // to a judge, legal adviser or court staff
        await ctx.assertGaCaseState(respondentResponds(c)
          ? GaCaseStates.AWAITING_RESPONDENT_RESPONSE
          : GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION);
        await claimStateUnchanged();
      },
    },
    // Each respondent's solicitor responds, and the application waits until the last of them has
    ...respondents.map((party, index): JourneyStep => ({
      name: `GA_RESPOND_${gaParties[party].step}`,
      group: 'GENERAL_APPLICATION',
      title: `${gaParties[party].label} responds to the general application.`,
      user: gaParties[party].user,
      skipIf: [
        ...(anchor.skipIf ?? []),
        [!respondentResponds(c), notRespondingReason()],
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
        await ctx.assertGaCaseState(index === respondents.length - 1
          ? GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION
          : GaCaseStates.AWAITING_RESPONDENT_RESPONSE);
        await claimStateUnchanged();
      },
    })),
  ];

  // Who decides depends on where the application is and its types, so there is a step for each, and the one whose task
  // work allocation did not create is skipped when it runs
  let decisionTask: Promise<string | undefined> | undefined;
  const findDecisionTask = () => {
    decisionTask ??= WaTaskHelper.createdTaskType(ctx.gaCaseId, [...decisionTasks.map((task) => task.taskType), consentOrderTask]);
    return decisionTask;
  };
  const referToJudge = c.generalApplicationReferToJudge === yesNo.YES;
  let referred = false;

  // With GENERAL_APPLICATION_REFER_TO_JUDGE=Yes, a legal adviser given the decision refers it to a judge (REFER_TO_JUDGE,
  // from the application's Next step list) instead of deciding it: work allocation completes their task and gives a
  // judge a JudgeDecideOnApplication task, and the application waits for the judge's decision
  const referStep: JourneyStep = {
    name: 'GA_REFER_TO_JUDGE',
    group: 'GENERAL_APPLICATION',
    title: 'Legal Adviser refers the general application to a judge.',
    user: 'legalAdviser',
    skipIf: [
      ...(anchor.skipIf ?? []),
      [!referToJudge, 'Skipping as the legal adviser does not refer the application to a judge (set GENERAL_APPLICATION_REFER_TO_JUDGE=Yes to)'],
    ],
    run: async ({ page, storageState, user }) => {
      const created = await findDecisionTask();
      expect(created, `Work allocation created no task to decide application ${ctx.gaCaseId}`).toBeDefined();
      test.skip(created !== 'LegalAdvisorDecideOnApplication', `Skipping as work allocation gave the decision to a judge (${created}), so there is nothing to refer`);
      await ctx.runEvent(page, storageState, async () => {
        await ctx.pageHelper.gotoAndWaitForXui(ctx.gaCaseUrl());
        await new WaTaskHelper(page, CaseType.GENERAL_APPLICATION).assignTaskForEvent(ctx.gaCaseId, 'REFER_TO_JUDGE', 'LegalAdvisorDecideOnApplication');
        if (!ctx.useApi()) {
          await new ReferToJudge(page).submit();
        }
      }, ctx.gaCaseUrl());
      if (ctx.useApi()) {
        await new ApiReferToJudge().submit(ctx.gaCaseId, user);
      }
      await ctx.testingEndpointHelper.waitForNoOngoingBusinessProcess(ctx.gaCaseId);
      await ctx.assertGaCaseState(GaCaseStates.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION);
      // The judge decides it now
      referred = true;
      decisionTask = WaTaskHelper.createdTaskType(ctx.gaCaseId, ['JudgeDecideOnApplication']);
      expect(await decisionTask, `Work allocation created no JudgeDecideOnApplication task for application ${ctx.gaCaseId} after it was referred`).toBeDefined();
      await claimStateUnchanged();
    },
  };

  const decisionSteps: JourneyStep[] = decisionTasks.map(({ taskType, user, label: decider }) => ({
    name: `GA_DECISION_${user === 'judge' ? 'JUDGE' : 'LEGAL_ADVISER'}`,
    group: 'GENERAL_APPLICATION',
    title: `${decider} approves the general application.`,
    user,
    skipIf: anchor.skipIf,
    run: async ({ page, storageState }) => {
      test.skip(referred && taskType === 'LegalAdvisorDecideOnApplication', 'Skipping as the legal adviser referred the application to a judge');
      const created = await findDecisionTask();
      expect(created, `Work allocation created no task to decide application ${ctx.gaCaseId}`).toBeDefined();
      test.skip(created !== taskType, `Skipping as work allocation gave the decision to ${deciderOf(created)} (${created})`);
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
  // An agreed application that work allocation gives to court staff (ReviewApplication): whoever deals with it where
  // the application is approves the consent order. Only agreed applications can get the task, so the steps are skipped
  // for any other.
  const orderSought = `The order sought: ${types.join(', ')}`;
  const consentOrderSteps: JourneyStep[] = consentOrderReviewers.map(({ user, label: reviewer, atNationalBusinessCentre, step }) => ({
    name: `GA_APPROVE_CONSENT_ORDER_${step}`,
    group: 'GENERAL_APPLICATION',
    title: `${reviewer} approves the general application as a consent order.`,
    user,
    skipIf: [
      ...(anchor.skipIf ?? []),
      [c.generalApplicationAgreed !== yesNo.YES, 'Skipping as the other side did not agree to the application, so it is not a consent order'],
    ],
    run: async ({ page, storageState }) => {
      const created = await findDecisionTask();
      expect(created, `Work allocation created no task to decide application ${ctx.gaCaseId}`).toBeDefined();
      test.skip(created !== consentOrderTask, `Skipping as work allocation gave the decision to ${deciderOf(created)} (${created})`);
      const atCnbc = (await ctx.testingEndpointHelper.getCaseData(ctx.gaCaseId)).isCcmccLocation === 'Yes';
      test.skip(atCnbc !== atNationalBusinessCentre, `Skipping as the application is ${atCnbc ? 'at the Civil National Business Centre' : 'at a hearing centre'}, so another admin approves it`);
      await ctx.runEvent(page, storageState, async () => {
        await ctx.pageHelper.gotoAndWaitForXui(ctx.gaCaseUrl());
        await new WaTaskHelper(page, CaseType.GENERAL_APPLICATION).assignTaskForEvent(ctx.gaCaseId, 'APPROVE_CONSENT_ORDER', consentOrderTask);
        if (!ctx.useApi()) {
          await new ApproveConsentOrder(page).approve(orderSought);
        }
      }, ctx.gaCaseUrl());
      if (ctx.useApi()) {
        await new ApiApproveConsentOrder().approve(ctx.gaCaseId, user, orderSought);
      }
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.gaCaseId, 'APPROVE_CONSENT_ORDER');
      // civil-service's StateGeneratorService: an approved consent order is an order made
      await ctx.assertGaCaseState(GaCaseStates.ORDER_MADE);
      await claimStateUnchanged();
    },
  }));

  // The legal adviser's decision step comes first, so the referral goes before it
  return [...steps, referStep, ...decisionSteps, ...consentOrderSteps];
}
