import { expect } from '@playwright/test';
import caseStates from '../../../enums/caseStates.ts';
import claimTrack from '../../../enums/track.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// civil-service's trial ready check scheduler asks the parties to confirm they are ready for trial once a fast track
// hearing is less than 3 weeks away. The hearing notice lists it weeks away, so the test runs TRIAL_READY_CHECK
// itself. It records the check on the case (trialReadyChecked) and leaves the claim in
// PREPARE_FOR_HEARING_CONDUCT_HEARING.
export function trialReadyCheck(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'TRIAL_READY_CHECK',
    title: 'The parties are asked to confirm they are ready for trial.',
    user: 'claimantSolicitor',
    needs: [c.facts.reachesCaseProgression],
    skipIf: [
      [c.track !== claimTrack.FAST, 'Skipping as the trial ready check is only made on the fast track'],
    ],
    run: async () => {
      await ctx.testingEndpointHelper.triggerTrialReadyCheck(ctx.caseId);
      await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'TRIAL_READY_CHECK');
      const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
      expect(caseData.trialReadyChecked, 'The trial ready check was not recorded on the case').toBe('Yes');
      await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
    },
  };
}
