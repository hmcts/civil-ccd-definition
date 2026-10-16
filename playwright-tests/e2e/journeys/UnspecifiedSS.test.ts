import { test } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import { selectedScenarios } from '../../scenarios/unspecifiedScenarios.ts';
import { defineJourney, JourneyContext } from '../journey/journeyRunner.ts';
import { unspecifiedConfig } from '../journey/unspecified/unspecifiedConfig.ts';
import { unspecifiedSteps } from '../journey/unspecified/unspecifiedSteps.ts';

// Each scenario's journey runs as its own serial group, tagged with the scenario's tags, so the pipeline can pick
// the scenarios it runs by tag. Different scenarios can run at the same time on separate workers. The journey's steps
// are in journey/unspecified/unspecifiedSteps.ts, and the settings they use in journey/unspecified/unspecifiedConfig.ts.
test.describe.configure({ mode: 'parallel' });
for (const scenario of selectedScenarios()) {
  test.describe(scenario.name, { tag: scenario.tags }, () => {
    const config = unspecifiedConfig(scenario.env);
    const context = new JourneyContext(scenario.env.STOP_AT_STATE as caseStates | undefined);
    defineJourney(context, unspecifiedSteps(config, context), {
      stopAfterTest: scenario.env.STOP_AFTER_TEST,
      validate: config.validate,
    });
  });
}
