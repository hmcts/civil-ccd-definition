import { selectedScenarios } from '../../../scenarios/specifiedScenarios.ts';
import { SessionUserKey } from '../../../helpers/SessionHelper.ts';
import { JourneyContext } from '../journeyRunner.ts';
import { specifiedConfig } from './specifiedConfig.ts';
import { specifiedSteps } from './specifiedSteps.ts';

// Everyone who runs a step in any of the run's specified scenarios (a step that does not apply to a scenario's claim
// is left out)
export function specifiedSessionUsers(): Set<SessionUserKey> {
  const users = new Set<SessionUserKey>();
  for (const scenario of selectedScenarios()) {
    for (const step of specifiedSteps(specifiedConfig(scenario.env), new JourneyContext(undefined))) {
      const stepApplies = !(step.skipIf ?? []).some(([condition]) => condition);
      if (stepApplies) {
        users.add(step.user);
      }
    }
  }
  return users;
}
