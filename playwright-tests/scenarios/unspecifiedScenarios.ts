// The unspecified journeys the pipeline runs. Each scenario is a set of the journey's env vars, run as its own group
// in UnspecifiedSS.test.ts and tagged with its name (@UNSPEC_1v1_FAST etc.), @unspecified and the pipeline tags below.
// The unspec-* projects in playwright.config.ts each run the scenarios with one pipeline tag:
//  - @unspec-pr: run on every PR
//  - @unspec-master: run on master
//  - @unspec-nightly: run every night
//
// The list is only used when SCENARIOS=Yes. Without it a single journey is run from the env vars on the command
// line, as the test:UNSPEC_* scripts in package.json do, and with no env vars at all that is the default 1v1 claim.
// One scenario from the list can be run by its tag:
//   SCENARIOS=Yes npx playwright test --headed --project chromium --grep @UNSPEC_1v1_FAST

export interface Scenario {
  name: string;
  tags: string[];
  env: Record<string, string | undefined>;
}

const PR = '@unspec-pr';
const MASTER = '@unspec-master';
const NIGHTLY = '@unspec-nightly';

const nihlFast = { TYPE_OF_CLAIM: 'PERSONAL_INJURY', SUB_TYPE: 'NOISE_INDUCED_HEARING_LOSS' };
const roadAccident = { TYPE_OF_CLAIM: 'PERSONAL_INJURY', SUB_TYPE: 'ROAD_ACCIDENT' };
const fastRoadAccident1v1 = {
  CLAIM_TYPE: '1v1',
  CLAIMANT_TYPE: 'INDIVIDUAL',
  DEFENDANT_TYPE: 'INDIVIDUAL',
  ...roadAccident,
  FIXED_RECOVERABLE_COSTS: 'Yes',
  FIXED_RECOVERY_COSTS_BAND: 'BAND_2',
  EXPERTS: '2',
  WITNESSES: '2',
  LANGUAGE: 'ENGLISH',
  UNAVAILABLE_DATES: 'Yes',
};

const scenarios: Scenario[] = [
  { name: 'UNSPEC_1v1_FAST', tags: [PR, MASTER, NIGHTLY], env: fastRoadAccident1v1 },
  { name: 'UNSPEC_1v1_FAST_FREE_FORM_ORDER', tags: [NIGHTLY], env: { ...fastRoadAccident1v1, FINAL_ORDER: 'FREE_FORM_ORDER' } },
  { name: 'UNSPEC_1v1_FAST_ASSISTED_ORDER', tags: [NIGHTLY], env: { ...fastRoadAccident1v1, FINAL_ORDER: 'ASSISTED_ORDER' } },
  {
    name: 'UNSPEC_1v1_SMALL',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, TRACK: 'SMALL_CLAIM' },
  },
  {
    name: 'UNSPEC_1v1_LIP_FAST',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_1v1_LIP_SMALL',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, TRACK: 'SMALL_CLAIM' },
  },
  {
    name: 'UNSPEC_1v1_CONSUMER_INTERMEDIATE',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TYPE_OF_CLAIM: 'CONSUMER', TRACK: 'INTERMEDIATE_CLAIM' },
  },
  {
    name: 'UNSPEC_1v1_FAST_REMEDY',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TYPE_OF_CLAIM: 'HOUSING_DISREPAIR' },
  },
  {
    name: 'UNSPEC_1v1_MULTI_REMEDY',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TYPE_OF_CLAIM: 'HOUSING_DISREPAIR', TRACK: 'MULTI_CLAIM' },
  },
  {
    name: 'UNSPEC_2v1_LIP_FAST',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '2v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_1v2_LIPS_FAST',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v2LIPS', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_1v2_LR_LIP_FAST',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v2LRLIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_1v2_LIP_LR_FAST',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v2LIPLR', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_2v1_FAST',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '2v1',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      CLAIMANT1_LITIGANT_FRIEND: 'Yes',
      CLAIMANT2_LITIGANT_FRIEND: 'Yes',
    },
  },
  {
    name: 'UNSPEC_2v1_SMALL',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, TRACK: 'SMALL_CLAIM' },
  },
  {
    name: 'UNSPEC_1v2SS_FAST',
    tags: [MASTER, NIGHTLY],
    env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...nihlFast },
  },
  {
    name: 'UNSPEC_1v2DS_FAST',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      DEFENDANTS_TO_NOTIFY_CLAIM: 'Defendant One',
    },
  },
  {
    name: 'UNSPEC_1v2DS_FAST_BOTH',
    tags: [MASTER, NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      DEFENDANTS_TO_NOTIFY_CLAIM: 'Both',
      DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS: 'Both',
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
      tags: [`@${scenario.name}`, '@unspecified', ...scenario.tags],
      env: { ...process.env, ...scenario.env },
    }));
  }
  return [{ name: `UNSPEC_${process.env.CLAIM_TYPE ?? '1v1'}`, tags: ['@unspecified'], env: process.env }];
}
