import { Scenario } from './unspecifiedScenarios.ts';

// The specified journeys. Each scenario is a set of the journey's env vars, run as its own group in
// SpecifiedSS.test.ts and tagged with its name (@SPEC_1v1_FAST etc.), @specified and the pipeline tag below. The
// spec-nightly project in playwright.config.ts runs the scenarios tagged @spec-nightly (every scenario here).
//
// The list is only used when SCENARIOS=Yes. Without it a single journey is run from the env vars on the command
// line, as the test:SPEC_* scripts in package.json do, and with no env vars at all that is the default 1v1 claim.
// One scenario from the list can be run by its tag:
//   SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --headed --project chromium --grep @SPEC_1v1_FAST

const NIGHTLY = '@spec-nightly';

const scenarios: Scenario[] = [
  { name: 'SPEC_1v1_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v1_SMALL', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TRACK: 'SMALL_CLAIM' } },
  { name: 'SPEC_1v1_AIRLINE_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', AIRLINE_CLAIM: 'Yes' } },
  { name: 'SPEC_1v1_LIP_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_2v1_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2SS_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2DS_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION' } },
  // The defendants do not respond: once the response deadlines have passed the claimant's solicitor asks for default
  // judgment against them, paid immediately
  { name: 'SPEC_1v1_DEFAULT_JUDGMENT', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', DEFAULT_JUDGMENT: 'Yes' } },
  { name: 'SPEC_1v2DS_DEFAULT_JUDGMENT', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION', DEFAULT_JUDGMENT: 'Yes' } },
  // The defendant, a litigant in person, instructs a solicitor once the claim is issued: the Respondent1 Solicitor gives
  // a notice of change and responds as in a 1v1 claim, which runs to the final order
  { name: 'SPEC_1v1_LIP_FAST_NOTICE_OF_CHANGE', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', NOTICE_OF_CHANGE: 'DEFENDANT_1' } },
  // Both parties change solicitor once the claimant has responded, and the new solicitors run the rest of the claim
  {
    name: 'SPEC_1v1_FAST_NOTICE_OF_CHANGE',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'COMPANY',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      NOTICE_OF_CHANGE: 'CLAIMANT_1,DEFENDANT_1',
      NOTICE_OF_CHANGE_AFTER: 'RESPOND_TO_DEFENCE',
    },
  },
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
