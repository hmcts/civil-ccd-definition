import caseStates from '../../../enums/caseStates.ts';
import yesNo from '../../../enums/yesNo.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Default judgment (DEFAULT_JUDGMENT=Yes): the time for responding passes with no response. The response deadlines
// are moved to yesterday through civil-service's testing support, as waiting for them is not practical.
export function moveResponseDeadline(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'MOVE_RESPONSE_DEADLINE',
    title: 'The time for the defendants to respond passes.',
    user: 'claimantSolicitor',
    skipIf: [[c.defaultJudgment !== yesNo.YES, 'Default judgment is switched off (set DEFAULT_JUDGMENT=Yes to run it)']],
    run: async () => {
      await ctx.testingEndpointHelper.moveResponseDeadlinesToPast(ctx.caseId, c.claimShape.defendants.length as 1 | 2);
      await ctx.assertCaseState(caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT);
    },
  };
}
