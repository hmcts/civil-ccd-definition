// Checks every named scenario's settings without running anything: builds each scenario's journey and runs the
// checks the journey runs before its first step (the config's validate and each step's invalidIf), and checks that
// STOP_AFTER_TEST, STOP_AT_STATE, API_UNTIL and API_FROM name real steps and states. Prints ok or FAIL for each scenario with its
// pipeline tags, and exits 1 if any fails. Needs no environment or secrets:
//   yarn check:scenarios
import caseStates from '../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../e2e/journey/journeyRunner.ts';
import { specifiedConfig } from '../e2e/journey/specified/specifiedConfig.ts';
import { specifiedSteps } from '../e2e/journey/specified/specifiedSteps.ts';
import { unspecifiedConfig } from '../e2e/journey/unspecified/unspecifiedConfig.ts';
import { unspecifiedSteps } from '../e2e/journey/unspecified/unspecifiedSteps.ts';
import { selectedScenarios as specifiedScenarios } from '../scenarios/specifiedScenarios.ts';
import { Scenario, selectedScenarios as unspecifiedScenarios } from '../scenarios/unspecifiedScenarios.ts';

interface Journey {
  scenarios: () => Scenario[];
  // Builds the scenario's settings and steps, as SpecifiedSS.test.ts and UnspecifiedSS.test.ts do
  build: (scenario: Scenario, context: JourneyContext) => { validate: () => void; steps: JourneyStep[] };
}

const journeys: Journey[] = [
  {
    scenarios: specifiedScenarios,
    build: (scenario, context) => {
      const config = specifiedConfig(scenario.env);
      return { validate: config.validate, steps: specifiedSteps(config, context) };
    },
  },
  {
    scenarios: unspecifiedScenarios,
    build: (scenario, context) => {
      const config = unspecifiedConfig(scenario.env);
      return { validate: config.validate, steps: unspecifiedSteps(config, context) };
    },
  },
];

const states: string[] = Object.values(caseStates);
const pipelineTag = /^@(un)?spec-(smoke|pr|master|nightly)$/;

// The problems with one scenario's settings, empty when there are none
function problemsWith(journey: Journey, scenario: Scenario): string[] {
  const { STOP_AT_STATE, API_UNTIL, API_FROM, STOP_AFTER_TEST } = scenario.env;
  const problems: string[] = [];
  try {
    const context = new JourneyContext(STOP_AT_STATE as caseStates | undefined, API_UNTIL as caseStates | undefined, API_FROM as caseStates | undefined);
    const { validate, steps } = journey.build(scenario, context);
    validate();
    const stops = { stopAtState: context.stopAtState, stopAfterTest: STOP_AFTER_TEST };
    problems.push(...steps.flatMap((step) => (step.invalidIf?.(stops) ?? []).filter(([invalid]) => invalid).map(([, problem]) => problem)));
    if (STOP_AFTER_TEST !== undefined && !steps.some((step) => step.name === STOP_AFTER_TEST || step.group === STOP_AFTER_TEST)) {
      problems.push(`STOP_AFTER_TEST=${STOP_AFTER_TEST} is not one of the journey's steps`);
    }
    for (const [setting, state] of [['STOP_AT_STATE', STOP_AT_STATE], ['API_UNTIL', API_UNTIL], ['API_FROM', API_FROM]]) {
      if (state !== undefined && !states.includes(state)) {
        problems.push(`${setting}=${state} is not a case state`);
      }
    }
  } catch (error) {
    // validate() fails with an expect error, whose message starts with the problem
    problems.push(String((error as Error).message).split('\n').slice(0, 3).join(' '));
  }
  return problems;
}

process.env.SCENARIOS = 'Yes';
let failures = 0;
for (const journey of journeys) {
  for (const scenario of journey.scenarios()) {
    const problems = problemsWith(journey, scenario);
    if (problems.length > 0) {
      failures++;
      console.log(`FAIL ${scenario.name}: ${problems.join(' | ')}`);
    } else {
      console.log(`ok   ${scenario.name} ${scenario.tags.filter((tag) => pipelineTag.test(tag)).join(' ')}`);
    }
  }
}
console.log(failures > 0 ? `${failures} scenario(s) have invalid settings` : 'Every scenario\'s settings are valid');
process.exit(failures > 0 ? 1 : 0);
