import { expect } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import claimTypes from '../../enums/claim-types.ts';
import yesNo from '../../enums/yesNo.ts';
import { AddUnavailableDates } from '../flows/events/ui/AddUnavailableDates.ts';
import { AddUnavailableDates as ApiAddUnavailableDates } from '../flows/events/api/AddUnavailableDates.ts';
import {
  addUnavailableDatesSpecs,
  expectedUnavailableDatesData,
  unavailableDatesFor,
} from '../flows/events/shared_api_ui/addUnavailableDatesSpecs.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The steps for ADD_UNAVAILABLE_DATES=Yes, in group ADD_UNAVAILABLE_DATES: each solicitor on the claim adds a single
// date and a date range their parties cannot attend a hearing, then the hearing centre admin adds some for a defendant
// (see addUnavailableDatesSpecs). Each run's dates are checked on the parties they were added to. They run once the
// claimant's response has taken the claim to stateAfter (JUDICIAL_REFERRAL, or IN_MEDIATION for a specified small
// claim), which they leave it in. skipIf are the journey's reasons the claim does not get there. Without
// ADD_UNAVAILABLE_DATES the journey still lists one ADD_UNAVAILABLE_DATES step, skipped with the reason.
export function addUnavailableDatesSteps(
  c: { claimType: claimTypes; addUnavailableDates: yesNo },
  ctx: JourneyContext,
  defendant1HasSolicitor: boolean,
  stateAfter: caseStates,
  skipIf: Array<[boolean, string]>,
): JourneyStep[] {
  const off: [boolean, string] = [c.addUnavailableDates !== yesNo.YES, 'Adding unavailable dates is switched off (set ADD_UNAVAILABLE_DATES=Yes to run it)'];
  const offeredIn = [caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION];
  const notOffered: [boolean, string] = [!offeredIn.includes(stateAfter), `Skipping as unavailable dates cannot be added in ${stateAfter}`];
  if (c.addUnavailableDates !== yesNo.YES) {
    return [{ name: 'ADD_UNAVAILABLE_DATES', title: 'Unavailable dates are added.', user: 'claimantSolicitor', skipIf: [off], run: async () => {} }];
  }
  return addUnavailableDatesSpecs(c.claimType, defendant1HasSolicitor).map((spec, index) => ({
    name: spec.name,
    group: 'ADD_UNAVAILABLE_DATES',
    title: `${spec.label} adds unavailable dates${spec.adminChoice ? ` for ${spec.adminChoice}` : ''}.`,
    user: spec.user,
    skipIf: [...skipIf, notOffered],
    run: async ({ page, storageState, user }) => {
      const dates = unavailableDatesFor(index);
      if (ctx.useApi()) {
        await new ApiAddUnavailableDates().submit(ctx.caseId, dates, user, spec.adminChoice);
      } else {
        await ctx.runEvent(page, storageState, async () => {
          await new AddUnavailableDates(page).submit(dates, spec.adminChoice);
        });
      }
      const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      expect(saved, `The unavailable dates ${spec.label} added were not saved on ${spec.parties.join(' and ')}`).toMatchObject(expectedUnavailableDatesData(spec, dates));
      await ctx.assertCaseState(stateAfter);
    },
  }));
}
