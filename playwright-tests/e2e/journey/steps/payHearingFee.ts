import caseStates from '../../../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Listing the trial set a hearing fee, which the claimant's solicitor pays from the Service Request tab. Once it is
// paid, HEARING_FEE_PAID moves the claim to PREPARE_FOR_HEARING_CONDUCT_HEARING.
export function payHearingFee(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'PAY_HEARING_FEE',
    title: 'Claimant Solicitor pays the hearing fee.',
    user: 'claimantSolicitor',
    needs: [c.facts.reachesCaseProgression],
    run: async ({ page, storageState }) => {
      // Paid in the hearing fee's row of the Service Request tab, which can also list the claim fee
      await ctx.payFeeInUi(page, storageState, 'hearingFeePBADetails', c.paymentMethod);
      // The payment service tells civil-service about the payment, which can take a while. Where it cannot reach
      // civil-service the test tells it instead. Telling it both ways would update the case twice, and the late
      // update can clash with the next event (CCD rejects it with HTTP 409), so the test only steps in if the payment
      // service has not done it within a minute.
      const recordedByPaymentService = await ctx.testingEndpointHelper.waitForFeePaid(ctx.caseId, 'hearingFeePaymentDetails', 60);
      if (!recordedByPaymentService) {
        console.log('The payment service did not record the hearing fee payment, so the test does');
        await ctx.testingEndpointHelper.serviceRequestUpdateHearingFee(ctx.caseId);
      }
      // civil-service's scheduler would run HEARING_FEE_PAID later, so it is run now
      await ctx.testingEndpointHelper.triggerHearingFeePaid(ctx.caseId);
      await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
    },
  };
}
