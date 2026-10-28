import { Scenario } from './unspecifiedScenarios.ts';

// The specified journeys. Each scenario is a set of the journey's env vars, run as its own group in
// SpecifiedSS.test.ts and tagged with its name (@SPEC_1v1_FAST etc.) and @specified.
//
// The list is only used when SCENARIOS=Yes. Without it a single journey is run from the env vars on the command
// line, as the test:SPEC_* scripts in package.json do, and with no env vars at all that is the default 1v1 claim.
// One scenario from the list can be run by its tag:
//   SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --headed --project chromium --grep @SPEC_1v1_FAST

const scenarios: Scenario[] = [
  { name: 'SPEC_1v1_FAST', tags: [], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v1_SMALL', tags: [], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TRACK: 'SMALL_CLAIM' } },
  { name: 'SPEC_1v1_AIRLINE_FAST', tags: [], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', AIRLINE_CLAIM: 'Yes' } },
  { name: 'SPEC_1v1_LIP_FAST', tags: [], env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_2v1_FAST', tags: [], env: { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2SS_FAST', tags: [], env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2DS_FAST', tags: [], env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION' } },
  // The defendants do not respond: once the response deadlines have passed the claimant's solicitor asks for default
  // judgment against them, paid immediately
  { name: 'SPEC_1v1_DEFAULT_JUDGMENT', tags: [], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', DEFAULT_JUDGMENT: 'Yes' } },
  { name: 'SPEC_1v2DS_DEFAULT_JUDGMENT', tags: [], env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION', DEFAULT_JUDGMENT: 'Yes' } },
];

// The scenarios to run. With SCENARIOS=Yes it is the list above, each scenario's env vars set over the run's own
// (so ENVIRONMENT, STOP_AT_STATE etc. still apply). Otherwise it is one journey from the run's env vars, which is the
// default 1v1 claim when none are set.
export function selectedScenarios(): Scenario[] {
  if (process.env.SCENARIOS === 'Yes') {
    return scenarios.map((scenario) => ({
      name: scenario.name,
      tags: [`@${scenario.name}`, '@specified', ...scenario.tags],
      env: { ...process.env, ...scenario.env },
    }));
  }
  return [{ name: `SPEC_${process.env.CLAIM_TYPE ?? '1v1'}`, tags: ['@specified'], env: process.env }];
}
