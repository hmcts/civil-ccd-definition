import { test } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import { selectedScenarios } from '../../scenarios/specifiedScenarios.ts';
import { defineJourney, JourneyContext } from '../journey/journeyRunner.ts';
import { specifiedConfig } from '../journey/specified/specifiedConfig.ts';
import { specifiedSteps } from '../journey/specified/specifiedSteps.ts';

// Each scenario's journey runs as its own serial group, tagged with the scenario's tags, so a run can pick the
// scenarios it runs by tag. Different scenarios can run at the same time on separate workers. The journey's steps are
// in journey/specified/specifiedSteps.ts, and the settings they use in journey/specified/specifiedConfig.ts.
test.describe.configure({ mode: 'parallel' });
for (const scenario of selectedScenarios()) {
  test.describe(scenario.name, { tag: scenario.tags }, () => {
    const config = specifiedConfig(scenario.env);
    const context = new JourneyContext(
      scenario.env.STOP_AT_STATE as caseStates | undefined,
      scenario.env.API_UNTIL as caseStates | undefined,
    );
    defineJourney(context, specifiedSteps(config, context), {
      stopAfterTest: scenario.env.STOP_AFTER_TEST,
      validate: config.validate,
    });
  });
}
