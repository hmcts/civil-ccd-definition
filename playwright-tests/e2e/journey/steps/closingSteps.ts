import { test } from '@playwright/test';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import yesNo from '../../../enums/yesNo.ts';
import SettleClaimReason from '../../../enums/settleClaim.ts';
import DiscontinueClaimType from '../../../enums/discontinueClaim.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import { JourneyContext, JourneyStep, JourneyStops } from '../journeyRunner.ts';
import { discontinuableStates, holds, settleableStates } from '../claimFacts.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The steps that close the claim, the same in both journeys: settling, discontinuing and dismissing it. Each journey
// lists them at the end of its steps. They have closesClaim, so they still run where STOP_AT_STATE or STOP_AFTER_TEST
// stops the journey.

// The problems with closing the claim, given the settings and how the run is stopped (see closingProblemsFor)
export type ClosingProblems = (setting: string, stops: JourneyStops, offeredIn: caseStates[], claimantSolicitor: boolean) => Array<[boolean, string]>;

// The settings that cannot close the claim: two defendants where either is a litigant in person, which civil-service
// does not allow the claimant's solicitor to settle or discontinue, or a journey that ends in a state the closing
// event is not offered in. journeyEndState is where the journey ends, which each journey works out from its own steps.
export function closingProblemsFor(c: JourneyConfig, journeyEndState: (stops: JourneyStops) => caseStates | undefined): ClosingProblems {
  return (setting, stops, offeredIn, claimantSolicitor) => {
    const endState = journeyEndState(stops);
    return [
      [
        claimantSolicitor && !holds(c.facts.claimantSolicitorCanCloseClaim),
        `${setting} cannot be used with CLAIM_TYPE=${c.claimType}: the claimant's solicitor cannot settle or discontinue a claim against two defendants where one is a litigant in person`,
      ],
      [
        endState !== undefined && !offeredIn.includes(endState),
        `${setting} cannot be used where the journey ends in ${endState}${stops.stopAtState ? ' (STOP_AT_STATE)' : ''}: it is only offered in ${offeredIn.join(', ')}`,
      ],
    ];
  };
}

// The claim is settled with "Settle this claim" once the rest of the journey has run, or where STOP_AT_STATE or
// STOP_AFTER_TEST stops it (SETTLE_CLAIM). Each event is only offered in some states, so the step is skipped where
// the journey ended in another.
//
// The claimant's solicitor marks the claim as paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL): civil-service stays
// the case (CASE_STAYED) and tells the defendants. It is not offered where there are two defendants and either is a
// litigant in person.
export function settleClaimMarkPaidFull(c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems): JourneyStep {
  return {
    name: 'SETTLE_CLAIM_MARK_PAID_FULL',
    title: 'Claimant Solicitor marks the claim as paid in full.',
    user: 'claimantSolicitor',
    closesClaim: true,
    invalidIf: (stops) => c.settleClaim === SettleClaimReason.MARK_PAID_IN_FULL ? closingProblems('SETTLE_CLAIM=MARK_PAID_IN_FULL', stops, settleableStates, true) : [],
    skipIf: [
      [c.settleClaim !== SettleClaimReason.MARK_PAID_IN_FULL, 'Skipping as the claimant\'s solicitor does not settle the claim (set SETTLE_CLAIM=MARK_PAID_IN_FULL to run it)'],
    ],
    run: async ({ page, storageState, user }) => {
      test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the claim cannot be settled in ${ctx.lastStateReached}`);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.SettleClaimMarkPaidFull().submit(ctx.caseId, user),
        ui: () => new ui.SettleClaimMarkPaidFull(page).submit(c.claimShape.claimants.length === 2),
        businessProcess: 'SETTLE_CLAIM_MARKED_PAID_IN_FULL',
        expectState: caseStates.CASE_STAYED,
      });
    },
  };
}

// Court staff record that the claim settled after a judge's order or an approved consent order
// (SETTLE_CLAIM=JUDGE_ORDER or CONSENT_ORDER), which moves it to CASE_SETTLED. Unlike the solicitor's event, it is
// also offered while the case is stayed.
export function settleClaim(c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems): JourneyStep {
  return {
    name: 'SETTLE_CLAIM',
    title: `Hearing Centre Admin records that the claim has settled${c.settleClaim === SettleClaimReason.JUDGE_ORDER || c.settleClaim === SettleClaimReason.CONSENT_ORDER ? ` (${c.settleClaim})` : ''}.`,
    user: 'hearingCentreAdmin',
    closesClaim: true,
    invalidIf: (stops) => c.settleClaim === SettleClaimReason.JUDGE_ORDER || c.settleClaim === SettleClaimReason.CONSENT_ORDER
      ? closingProblems(`SETTLE_CLAIM=${c.settleClaim}`, stops, [...settleableStates, caseStates.CASE_STAYED], false)
      : [],
    skipIf: [
      [
        c.settleClaim !== SettleClaimReason.JUDGE_ORDER && c.settleClaim !== SettleClaimReason.CONSENT_ORDER,
        'Skipping as court staff do not settle the claim (set SETTLE_CLAIM=JUDGE_ORDER or CONSENT_ORDER to run it)',
      ],
    ],
    run: async ({ page, storageState }) => {
      const reason = c.settleClaim as SettleClaimReason.JUDGE_ORDER | SettleClaimReason.CONSENT_ORDER;
      test.skip(![...settleableStates, caseStates.CASE_STAYED].includes(ctx.lastStateReached), `Skipping as the claim cannot be settled in ${ctx.lastStateReached}`);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.SettleClaim().submit(ctx.caseId, reason),
        ui: () => new ui.SettleClaim(page).submit(reason),
        expectState: caseStates.CASE_SETTLED,
      });
    },
  };
}

// The claimant's solicitor fully discontinues the claim with "Discontinue this claim" once the rest of the journey
// has run (DISCONTINUE_CLAIM). It is only offered in some states, so the step is skipped where the journey ended in
// another, and not where there are two defendants and either is a litigant in person. Without the court's
// permission (NO_PERMISSION_NEEDED) civil-service discontinues the claim (CASE_DISCONTINUED). With a judge's
// permission (PERMISSION_GRANTED) the claim stays where it is until court staff validate the discontinuance.
//
// Court staff check the order that gave the claimant permission to discontinue with "Validate discontinuance"
// (DISCONTINUE_CLAIM=PERMISSION_GRANTED). Confirming the order gives permission discontinues the claim. Where work
// allocation is switched on, the hearing centre admin needs the "Claim Discontinued - Validate discontinuance" task
// (ValidateDiscontinuanceAdmin), which is claimed through the API version too, as the UI would.
export function discontinueSteps(c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems): JourneyStep[] {
  // Whether the claimant's discontinuance waits for court staff to validate it, once the claimant has discontinued
  let discontinuanceAwaitingValidation = false;
  return [
    {
      name: 'DISCONTINUE_CLAIM',
      title: `Claimant Solicitor discontinues the claim${c.discontinueClaim ? ` (${c.discontinueClaim})` : ''}.`,
      user: 'claimantSolicitor',
      closesClaim: true,
      invalidIf: (stops) => c.discontinueClaim !== undefined ? closingProblems(`DISCONTINUE_CLAIM=${c.discontinueClaim}`, stops, discontinuableStates, true) : [],
      skipIf: [
        [c.discontinueClaim === undefined, 'Discontinuing the claim is switched off (set DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED or PERMISSION_GRANTED to run it)'],
      ],
      run: async ({ page, storageState, user }) => {
        const stateBefore = ctx.lastStateReached;
        test.skip(!discontinuableStates.includes(stateBefore), `Skipping as the claim cannot be discontinued in ${stateBefore}`);
        await ctx.submitEvent(page, storageState, {
          api: () => new api.DiscontinueClaim().submit(ctx.caseId, c.discontinueClaim, user),
          ui: () => new ui.DiscontinueClaim(page).submit(c.discontinueClaim),
        });
        const awaitingValidation = c.discontinueClaim === DiscontinueClaimType.PERMISSION_GRANTED;
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'DISCONTINUE_CLAIM_CLAIMANT');
        await ctx.assertCaseState(awaitingValidation ? stateBefore : caseStates.CASE_DISCONTINUED);
        discontinuanceAwaitingValidation = awaitingValidation;
      },
    },
    {
      name: 'VALIDATE_DISCONTINUANCE',
      title: 'Hearing Centre Admin validates the discontinuance.',
      user: 'hearingCentreAdmin',
      closesClaim: true,
      skipIf: [
        [c.discontinueClaim !== DiscontinueClaimType.PERMISSION_GRANTED, 'Skipping as the discontinuance did not need the court\'s permission (set DISCONTINUE_CLAIM=PERMISSION_GRANTED to run it)'],
      ],
      run: async ({ page, storageState }) => {
        test.skip(!discontinuanceAwaitingValidation, 'Skipping as the claimant did not discontinue the claim');
        await ctx.runEvent(page, storageState, async () => {
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'VALIDATE_DISCONTINUE_CLAIM_CLAIMANT', 'ValidateDiscontinuanceAdmin');
          if (!ctx.useApi()) {
            await new ui.ValidateDiscontinueClaim(page).submit();
          }
        });
        if (ctx.useApi()) {
          await new api.ValidateDiscontinueClaim().submit(ctx.caseId);
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'VALIDATE_DISCONTINUE_CLAIM_CLAIMANT');
        await ctx.assertCaseState(caseStates.CASE_DISCONTINUED);
      },
    },
  ];
}

// The hearing centre admin dismisses the case with "Dismiss case" once the rest of the journey has run, or where
// STOP_AT_STATE or STOP_AFTER_TEST stops it (DISMISS_CASE=Yes), which moves it to CASE_DISMISSED and tells the
// parties. It is offered in the same states as "Settle this claim" (not CASE_STAYED), so the step is skipped where the
// journey ended in another.
export function dismissCase(c: JourneyConfig, ctx: JourneyContext, closingProblems: ClosingProblems): JourneyStep {
  return {
    name: 'DISMISS_CASE',
    title: 'Hearing Centre Admin dismisses the case.',
    user: 'hearingCentreAdmin',
    closesClaim: true,
    invalidIf: (stops) => c.dismissCase === yesNo.YES ? closingProblems('DISMISS_CASE=Yes', stops, settleableStates, false) : [],
    skipIf: [
      [c.dismissCase !== yesNo.YES, 'Dismissing the case is switched off (set DISMISS_CASE=Yes to run it)'],
    ],
    run: async ({ page, storageState }) => {
      test.skip(!settleableStates.includes(ctx.lastStateReached), `Skipping as the case cannot be dismissed in ${ctx.lastStateReached}`);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.DismissCase().submit(ctx.caseId),
        ui: () => new ui.DismissCase(page).submit(),
        businessProcess: 'DISMISS_CASE',
        expectState: caseStates.CASE_DISMISSED,
      });
    },
  };
}
