import { expect } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import trackType from '../../enums/track.ts';
import { AutomatedHearingNotice } from '../flows/events/api/AutomatedHearingNotice.ts';
import { JourneyContext } from './journeyRunner.ts';

// HEARING_NOTICE_SCHEDULER=Yes on a civil-service PR preview: HMC (WireMock) returns a LISTED trial for the claim and
// civil-service's automated hearing notice scheduler sends the notice, in place of the hearing centre admin's
// "Create a hearing notice". The claim moves to HEARING_READINESS for the hearing fee, as with the admin's notice, and
// the notice is checked on the case: the hearing date, a hearing fee, and a new hearing notice document.
export async function runHearingNoticeScheduler(ctx: JourneyContext, journey: 'unspec' | 'spec', track: trackType) {
  const before = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  const documentsBefore = (before.hearingDocuments ?? []).length;

  const { hearingDate } = await new AutomatedHearingNotice().run(ctx.caseId, journey, track);
  await ctx.assertCaseState(caseStates.HEARING_READINESS);

  const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
  expect(saved.hearingDate, 'The listed hearing date was not saved').toBe(hearingDate);
  expect(saved.hearingFee?.calculatedAmountInPence, 'No hearing fee was charged').toBeTruthy();
  expect((saved.hearingDocuments ?? []).length, 'No hearing notice document was added').toBeGreaterThan(documentsBefore);
}
