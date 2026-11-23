import caseStates from '../../../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Civil has no record of the hearing itself taking place. Once the hearing date has passed, a civil-service scheduler
// runs MOVE_TO_DECISION_OUTCOME, on every track, which moves the claim to DECISION_OUTCOME to wait for the judge's
// decision. The hearing is weeks away, so the test runs that event itself.
export function moveToDecisionOutcome(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'MOVE_TO_DECISION_OUTCOME',
    title: 'Hearing date passes and the claim moves to decision outcome.',
    user: 'judge',
    needs: [c.facts.reachesCaseProgression],
    run: async () => {
      await ctx.testingEndpointHelper.moveToDecisionOutcome(ctx.caseId);
      await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
    },
  };
}
