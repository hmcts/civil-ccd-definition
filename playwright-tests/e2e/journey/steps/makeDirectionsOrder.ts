import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import claimTrack from '../../../enums/track.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Intermediate and multi track claims get no Standard Direction Order: the judge's task is to allocate the claim
// to its track, which is done with a directions order made with "Make an order"
export function makeDirectionsOrder(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'MAKE_DIRECTIONS_ORDER',
    title: 'Judge makes a directions order.',
    user: 'judge',
    needs: [c.facts.reachesJudicialReferral],
    skipIf: [
      [c.track !== claimTrack.INTERMEDIATE && c.track !== claimTrack.MULTI, 'Skipping as the directions order is for the intermediate and multi tracks'],
    ],
    run: async ({ page, storageState }) => {
      await ctx.runEvent(page, storageState, async () => {
        // Where work allocation is switched on, the judge needs the task to allocate the claim to its track
        await new WaTaskHelper(page).assignTaskForEvent(
          ctx.caseId,
          'GENERATE_DIRECTIONS_ORDER',
          c.track === claimTrack.INTERMEDIATE ? 'allocateIntermediateTrack' : 'allocateMultiTrack',
        );
        if (!ctx.useApi()) {
          await new ui.MakeDirectionsOrder(page).submit();
        }
      });
      if (ctx.useApi()) {
        await new api.MakeDirectionsOrder().submit(ctx.caseId);
      }
      await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
    },
  };
}
