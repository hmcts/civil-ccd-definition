import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import claimTrack from '../../../enums/track.ts';
import yesNo from '../../../enums/yesNo.ts';
import { WaTaskHelper } from '../../../helpers/WaTaskHelper.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { expectDisputeResolutionHearing } from '../disputeResolutionHearing.ts';
import { expectFlightDelayDirections } from '../flightDelay.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// A flight delay small claim (specified only), whose directions a judge gives through "Initial Directions (Flight
// Delay)"
const flightDelaySmallClaim = (c: JourneyConfig) => c.caseType === 'SPECIFIED' && c.flightDelaySmallClaim;
// A noise induced hearing loss claim (unspecified only), which gets its own directions task
const noiseInducedHearingLoss = (c: JourneyConfig) => c.caseType === 'UNSPECIFIED' && c.noiseInducedHearingLoss;

// Who makes the Standard Direction Order: a judge, apart from a specified small claim (not a flight delay one), where a
// legal adviser does
export function sdoUser(c: JourneyConfig): SessionUserKey {
  return c.caseType === 'SPECIFIED' && c.track === claimTrack.SMALL && !c.flightDelaySmallClaim ? 'legalAdviser' : 'judge';
}

// The work allocation directions task the order's maker claims for it
export function sdoTask(c: JourneyConfig): string {
  if (c.caseType === 'UNSPECIFIED') {
    return c.sdoTaskType;
  }
  if (c.track !== claimTrack.SMALL) {
    return 'FastTrackDirections';
  }
  return c.flightDelaySmallClaim ? 'InitialDirectionFlightDelay' : 'LegalAdvisorSmallClaimsTrackDirections';
}

// The Standard Direction Order, on the small claims and fast tracks, once the claimant's response has taken the claim
// to JUDICIAL_REFERRAL (or, for a specified small claim, after unsuccessful mediation). It moves the claim to
// CASE_PROGRESSION. The order puts the claim on c.sdoTrack, which is the claim's own track unless SDO_TRACK moves a
// specified fast track claim to the small claims track; who makes it and their task follow the claim's own track. Intermediate and multi track claims get a directions order instead (makeDirectionsOrder.ts).
export function createSdo(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  const user = sdoUser(c);
  const disputeResolutionHearing = c.disputeResolutionHearing === yesNo.YES;
  const flightDelay = flightDelaySmallClaim(c);
  return {
    name: 'CREATE_SDO',
    title: `${user === 'legalAdviser' ? 'Legal Adviser' : 'Judge'} makes a Standard Direction Order${c.sdoTrack !== c.track ? ' on the small claims track' : ''}${disputeResolutionHearing ? ' for a dispute resolution hearing' : ''}${flightDelay ? ' with flight delay directions' : ''}.`,
    user,
    needs: [c.facts.reachesCaseProgression],
    skipIf: [
      [c.track === claimTrack.INTERMEDIATE || c.track === claimTrack.MULTI, 'Skipping as the intermediate and multi tracks get a directions order instead'],
    ],
    run: async ({ page, storageState }) => {
      await ctx.runEvent(page, storageState, async () => {
        // Where work allocation is switched on, the directions task for the track is needed to make the order. It is
        // claimed through the API version too, as the UI would.
        await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'CREATE_SDO', sdoTask(c));
        if (!ctx.useApi()) {
          await new ui.CreateSdo(page).submit(ctx.caseId, c.sdoTrack, noiseInducedHearingLoss(c), disputeResolutionHearing, flightDelay);
        }
      });
      if (ctx.useApi()) {
        await new api.CreateSdo().submit(ctx.caseId, user, c.sdoTrack, noiseInducedHearingLoss(c), disputeResolutionHearing, flightDelay);
      }
      if (flightDelay) {
        await expectFlightDelayDirections(ctx);
      }
      if (disputeResolutionHearing) {
        await expectDisputeResolutionHearing(ctx);
      }
      await ctx.assertCaseState(caseStates.CASE_PROGRESSION);
    },
  };
}
