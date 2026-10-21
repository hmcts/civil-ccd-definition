import { selectedScenarios } from '../../../scenarios/unspecifiedScenarios.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { JourneyContext } from '../journeyRunner.ts';
import { unspecifiedConfig } from './unspecifiedConfig.ts';
import { unspecifiedSteps } from './unspecifiedSteps.ts';

// Everyone who runs a step in any of the run's unspecified scenarios (a step that does not apply to a scenario's claim
// is left out)
export function unspecifiedSessionUsers(): Set<SessionUserKey> {
  const users = new Set<SessionUserKey>();
  for (const scenario of selectedScenarios()) {
    for (const step of unspecifiedSteps(unspecifiedConfig(scenario.env), new JourneyContext(undefined))) {
      const stepApplies = !(step.skipIf ?? []).some(([condition]) => condition);
      if (stepApplies) {
        users.add(step.user);
      }
    }
  }
  return users;
}
