import { expect } from '@playwright/test';
import claimTrack from '../../enums/track.ts';
import yesNo from '../../enums/yesNo.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// DISPUTE_RESOLUTION_HEARING=Yes: the small claims Standard Direction Order (CREATE_SDO) is for a dispute resolution
// hearing (DRH) rather than a small claims hearing. The rest of the journey is the same.

// Fails the run up front where the claim gets no small claims Standard Direction Order
export function withDisputeResolutionHearing(steps: JourneyStep[], c: { disputeResolutionHearing: yesNo; track: claimTrack }): void {
  const sdo = steps.find((step) => step.name === 'CREATE_SDO');
  if (!sdo || c.disputeResolutionHearing !== yesNo.YES) {
    return;
  }
  const sdoSkipped = (sdo.skipIf ?? []).filter(([skipped]) => skipped);
  const earlier = sdo.invalidIf;
  sdo.invalidIf = (stops) => [
    ...(earlier ? earlier(stops) : []),
    [c.track !== claimTrack.SMALL, 'DISPUTE_RESOLUTION_HEARING=Yes needs TRACK=SMALL_CLAIM: only a small claims order can list a dispute resolution hearing'],
    [
      sdoSkipped.length > 0,
      `DISPUTE_RESOLUTION_HEARING=Yes needs the claim to reach the Standard Direction Order (CREATE_SDO): ${sdoSkipped.map(([, reason]) => reason).join('; ')}`,
    ],
  ];
}

// Checks the order made was for a dispute resolution hearing: the DRH direction was chosen and its hearing saved
export async function expectDisputeResolutionHearing(ctx: JourneyContext) {
  const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  expect(caseData.smallClaims, 'The order was not made for a dispute resolution hearing').toContain('smallClaimDisputeResolutionHearing');
  expect(caseData.sdoR2SmallClaimsHearing?.trialOnOptions, 'The dispute resolution hearing was not saved').toBeTruthy();
}
