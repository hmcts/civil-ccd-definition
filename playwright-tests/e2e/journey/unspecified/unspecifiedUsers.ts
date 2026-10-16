import { selectedScenarios } from '../../../scenarios/unspecifiedScenarios.ts';
import { sessionUsers, SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { JourneyContext } from '../journeyRunner.ts';
import { unspecifiedConfig } from './unspecifiedConfig.ts';
import { unspecifiedSteps } from './unspecifiedSteps.ts';

// The saved session users the run needs, which preflight checks and the authentication setup signs in: everyone who
// runs a step in any of the run's scenarios (a step that does not apply to a scenario's claim is left out). The claimant
// and Defendant 1 solicitors are always included.
export function sessionUsersForRun(): SessionUserKey[] {
  const users = new Set<SessionUserKey>(['claimantSolicitor', 'respondent1Solicitor']);
  for (const scenario of selectedScenarios()) {
    for (const step of unspecifiedSteps(unspecifiedConfig(scenario.env), new JourneyContext(undefined))) {
      const stepApplies = !(step.skipIf ?? []).some(([condition]) => condition);
      if (stepApplies) {
        users.add(step.user);
      }
    }
  }
  return (Object.keys(sessionUsers) as SessionUserKey[]).filter((key) => users.has(key));
}
