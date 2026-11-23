import caseStates from '../../../enums/caseStates.ts';
import type { SpecifiedConfig } from '../specified/specifiedConfig.ts';
import type { UnspecifiedConfig } from '../unspecified/unspecifiedConfig.ts';

// Either journey's config, for the steps both journeys share (in this folder). A shared step reads only what both
// configs have; where the journeys differ, it checks c.caseType ('SPECIFIED' or 'UNSPECIFIED').
export type JourneyConfig = SpecifiedConfig | UnspecifiedConfig;

// The state the claimant's response leaves the claim in. Where c.facts.onlineAfterClaimantResponse holds, that is
// JUDICIAL_REFERRAL in an unspecified claim, and JUDICIAL_REFERRAL, IN_MEDIATION or AWAITING_APPLICANT_INTENTION in a
// specified one.
export function stateAfterClaimantResponse(c: JourneyConfig): caseStates {
  return c.caseType === 'SPECIFIED' ? c.claimantOutcome.state : c.stateAfterClaimantResponse;
}
