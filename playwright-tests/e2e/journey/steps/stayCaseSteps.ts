import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import yesNo from '../../../enums/yesNo.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The stay steps, the same in both journeys. Each journey lists them in its steps, with send and reply between asking
// for an update and lifting the stay.

const stayOff = (c: JourneyConfig): [boolean, string] => [c.stayCase !== yesNo.YES, 'Staying the case is switched off (set STAY_CASE=Yes to run it)'];

// The hearing centre admin stays the case once the claimant's response has taken it to JUDICIAL_REFERRAL, asks the
// parties for an update and then lifts the stay. Lifting it takes the claim back to JUDICIAL_REFERRAL, so the
// journey carries on to the judge's order. Only run with STAY_CASE=Yes.
export function stayCase(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'STAY_CASE',
    title: 'Hearing Centre Admin stays the case.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesJudicialReferral],
    skipIf: [stayOff(c)],
    run: async ({ page, storageState }) => {
      await ctx.submitEvent(page, storageState, {
        api: () => new api.StayCase().submit(ctx.caseId),
        ui: () => new ui.StayCase(page).submit(),
        expectState: caseStates.CASE_STAYED,
      });
    },
  };
}

export function manageStayRequestUpdate(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'MANAGE_STAY_REQUEST_UPDATE',
    title: 'Hearing Centre Admin asks the parties for an update on the stay.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesJudicialReferral],
    skipIf: [stayOff(c)],
    run: async ({ page, storageState }) => {
      await ctx.submitEvent(page, storageState, {
        api: () => new api.ManageStay().requestUpdate(ctx.caseId),
        ui: () => new ui.ManageStay(page).requestUpdate(),
        expectState: caseStates.CASE_STAYED,
      });
    },
  };
}

export function liftStay(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'LIFT_STAY',
    title: 'Hearing Centre Admin lifts the stay.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesJudicialReferral],
    skipIf: [stayOff(c)],
    run: async ({ page, storageState }) => {
      await ctx.submitEvent(page, storageState, {
        api: () => new api.ManageStay().liftStay(ctx.caseId),
        ui: () => new ui.ManageStay(page).liftStay(),
        expectState: caseStates.JUDICIAL_REFERRAL,
      });
    },
  };
}
