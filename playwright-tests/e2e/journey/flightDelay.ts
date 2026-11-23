import { expect } from '@playwright/test';
import { OTHER_AIRLINE_NAME } from '../flows/createSpecifiedCase.ts';
import { JourneyContext } from './journeyRunner.ts';

// AIRLINE_CLAIM=Yes or OTHER (specified claims): a claim for a delayed or cancelled flight. Creating the claim saves it
// as a flight delay claim with the airline's court, or no court for an airline not on the list (OTHER). On the small
// claims track the claimant's response then moves the claim to that court (for OTHER, to the court the claimant asked
// for), and a judge makes the Standard Direction Order with the flight delay directions.

// Checks the claim was saved as a flight delay claim, with the airline's court where the airline is on the list
export async function expectFlightDelayClaim(ctx: JourneyContext, otherAirline: boolean) {
  const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  expect(caseData.claimType, 'The claim was not saved as a flight delay claim').toBe('FLIGHT_DELAY');
  if (otherAirline) {
    expect(caseData.flightDelayDetails?.airlineList?.value?.code, 'The airline was not saved as OTHER').toBe('OTHER');
    expect(caseData.flightDelayDetails?.nameOfAirline, 'The airline\'s name was not saved').toBe(OTHER_AIRLINE_NAME);
    expect(caseData.flightDelayDetails?.flightCourtLocation?.baseLocation, 'An airline not on the list has no court').toBeUndefined();
  } else {
    expect(caseData.flightDelayDetails?.flightCourtLocation?.baseLocation, 'The airline\'s court was not saved').toBeTruthy();
  }
}

// Checks the claimant's response moved a flight delay small claim to the airline's court, or for an airline not on the
// list to the court the claimant asked for
export async function expectFlightDelayCourt(ctx: JourneyContext, otherAirline: boolean) {
  const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  const court = otherAirline
    ? caseData.applicant1DQRequestedCourt?.caseLocation
    : caseData.flightDelayDetails?.flightCourtLocation;
  const which = otherAirline ? 'the court the claimant asked for' : 'the airline\'s court';
  expect(court?.baseLocation, `The claim has no ${which}`).toBeTruthy();
  expect(caseData.caseManagementLocation?.baseLocation, `The claim is not managed at ${which}`).toBe(court.baseLocation);
  console.log(`Flight delay claim managed at ${which}, ${court.baseLocation}`);
}

// Checks the Standard Direction Order has the flight delay directions, filled in by civil-service
export async function expectFlightDelayDirections(ctx: JourneyContext) {
  const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  expect(caseData.smallClaims, 'The order was not given the flight delay directions').toContain('smallClaimFlightDelay');
  expect(caseData.smallClaimsFlightDelay?.relatedClaimsInput, 'The flight delay directions were not saved').toBeTruthy();
  expect(caseData.smallClaimsFlightDelay?.legalDocumentsInput, 'The flight delay directions were not saved').toBeTruthy();
}
