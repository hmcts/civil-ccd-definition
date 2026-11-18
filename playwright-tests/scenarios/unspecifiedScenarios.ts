// The unspecified journeys the pipeline runs. Each scenario is a set of the journey's env vars, run as its own group
// in UnspecifiedSS.test.ts and tagged with its name (@UNSPEC_1v1_FAST etc.), @unspecified and the pipeline tags below.
// The unspec-* projects in playwright.config.ts each run the scenarios with one pipeline tag:
//  - @unspec-pr: run on every PR
//  - @unspec-master: run on master
//  - @unspec-nightly: run every night
// (the pipeline's smoke test is a specified one, @spec-smoke in specifiedScenarios.ts)
//
// The list is only used when SCENARIOS=Yes. Without it a single journey is run from the env vars on the command
// line, as the test:UNSPEC_* scripts in package.json do, and with no env vars at all that is the default 1v1 claim.
// One scenario from the list can be run by its tag:
//   SCENARIOS=Yes npx playwright test --headed --project chromium --grep @UNSPEC_1v1_FAST

export interface Scenario {
  name: string;
  tags: string[];
  env: Record<string, string | undefined>;
  // Always runs every step in the UI, even when the run sets SCENARIO_API_UNTIL
  ui?: boolean;
}

// SCENARIO_API_UNTIL=<state> gives every scenario that does not set its own API_UNTIL, and is not marked ui, that
// API_UNTIL, so a run can go through the CCD API while keeping a few scenarios in the UI. The PR pipeline sets it
// (playwright-tests/scripts/pipeline/run-journeys.sh); master and nightly runs keep each scenario's own settings.
export function scenarioApiUntil(scenario: Scenario): Record<string, string> {
  const apiUntil = process.env.SCENARIO_API_UNTIL;
  return apiUntil && !scenario.ui ? { API_UNTIL: apiUntil } : {};
}

const PR = '@unspec-pr';
const MASTER = '@unspec-master';
const NIGHTLY = '@unspec-nightly';

const nihlFast = { TYPE_OF_CLAIM: 'PERSONAL_INJURY', SUB_TYPE: 'NOISE_INDUCED_HEARING_LOSS' };
const roadAccident = { TYPE_OF_CLAIM: 'PERSONAL_INJURY', SUB_TYPE: 'ROAD_ACCIDENT' };
const individual1v1 = { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident };
// Runs the steps that have an API version through the CCD API until the claim reaches JUDICIAL_REFERRAL, so a
// scenario about a later event only does that event in the UI
const apiToJudicialReferral = { API_UNTIL: 'JUDICIAL_REFERRAL' };
// Takes the claim through the API to HEARING_READINESS, once the hearing notice is out, and stops there: the steps
// that close the claim (discontinuing it) still run, in the UI
const closeAfterHearingNotice = { API_UNTIL: 'HEARING_READINESS', STOP_AT_STATE: 'HEARING_READINESS' };
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
  // The PR set's one journey run fully in the UI (ui), however the run is set up
  { name: 'UNSPEC_1v1_FAST', tags: [PR, MASTER, NIGHTLY], env: fastRoadAccident1v1, ui: true },
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
    name: 'UNSPEC_1v1_FAST_DAMAGES_REMEDY',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'COMPANY', TYPE_OF_CLAIM: 'DAMAGES_AND_OTHER_REMEDY' },
  },
  {
    name: 'UNSPEC_1v1_SMALL_REMEDY',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'ORGANISATION', TYPE_OF_CLAIM: 'HOUSING_DISREPAIR', TRACK: 'SMALL_CLAIM' },
  },
  {
    name: 'UNSPEC_1v2DS_SMALL_REMEDY',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'ORGANISATION', TYPE_OF_CLAIM: 'HOUSING_DISREPAIR', TRACK: 'SMALL_CLAIM' },
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
      FIXED_RECOVERABLE_COSTS: 'Yes',
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
    tags: [PR, MASTER, NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      DEFENDANTS_TO_NOTIFY_CLAIM: 'Both',
      DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS: 'Both',
    },
  },
  // After the claimant's response the hearing centre admin adds case flags to each party, then makes the first inactive:
  // a sign language interpreter (BSL) for Claimant 1, Detained individual for Defendant 1 and a Spanish interpreter for
  // Defendant 2
  {
    name: 'UNSPEC_1v2SS_FAST_CASE_FLAGS',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2SS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      CASE_FLAGS: 'CLAIMANT_1:RA0042:British Sign Language (BSL),DEFENDANT_1:PF0019,DEFENDANT_2:PF0015:Spanish',
    },
  },
  // After the claimant's response every kind of contact information is updated: the admin adds an expert for
  // Defendant 1, the claimant's solicitor changes Claimant 1, their litigation friend and their witness, Defendant 1's
  // solicitor adds someone attending for the company, and Defendant 2's solicitor adds someone attending for their firm
  // and changes their expert
  {
    name: 'UNSPEC_1v2DS_FAST_MANAGE_CONTACT_INFORMATION',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      ADD_UNAVAILABLE_DATES: 'Yes',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      CLAIMANT1_LITIGANT_FRIEND: 'Yes',
      DEFENDANT_TYPE: 'COMPANY',
      ...nihlFast,
      WITNESSES: '1',
      EXPERTS: '1',
      MANAGE_CONTACT_INFORMATION: [
        'admin:DEFENDANT_1_EXPERTS',
        'claimantSolicitor:CLAIMANT_1',
        'claimantSolicitor:CLAIMANT_1_LITIGATION_FRIEND',
        'claimantSolicitor:CLAIMANT_1_WITNESSES',
        'respondent1Solicitor:DEFENDANT_1_ORGANISATION_INDIVIDUALS',
        'respondent2Solicitor:DEFENDANT_2_LR_INDIVIDUALS',
        'respondent2Solicitor:DEFENDANT_2_EXPERTS',
      ].join(','),
    },
  },
  // Each defendant's solicitor adds a litigation friend for their defendant, then informs the court of an agreed 28
  // day extension before responding
  {
    name: 'UNSPEC_1v2DS_FAST_EXTENSION',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      INFORM_AGREED_EXTENSION: 'Yes',
      DEFENDANT_LITIGATION_FRIEND: 'Yes',
    },
  },
  // Defendant 1's solicitor adds one litigation friend for both defendants, who have the same solicitor
  {
    name: 'UNSPEC_1v2SS_FAST_LITIGATION_FRIEND',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2SS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...nihlFast,
      DEFENDANT_LITIGATION_FRIEND: 'Yes',
    },
  },
  // The case is stayed after the claimant's response, the parties are asked for an update and the stay is lifted, then
  // the journey carries on to the final order. It is a road accident claim rather than noise induced hearing loss: the
  // WA initiation DMN only raises a directions task when a stay is lifted for a standard claim, so the judge would have
  // no task for the Standard Direction Order on a NIHL claim where WA is switched on.
  {
    name: 'UNSPEC_1v2DS_FAST_STAY_CASE',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      STAY_CASE: 'Yes',
    },
  },
  // The defendants do not respond: once the response deadlines have passed the claimant's solicitor asks for default
  // judgment, with the damages decided at a disposal hearing, and the judge makes the directions order after judgment
  {
    name: 'UNSPEC_1v1_FAST_DEFAULT_JUDGMENT',
    tags: [PR, MASTER, NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, DEFAULT_JUDGMENT: 'Yes' },
  },
  // Default judgment on an other remedy claim: the claimant's solicitor abandons the other remedy to get judgment
  {
    name: 'UNSPEC_1v1_FAST_REMEDY_DEFAULT_JUDGMENT',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TYPE_OF_CLAIM: 'HOUSING_DISREPAIR', DEFAULT_JUDGMENT: 'Yes' },
  },
  {
    name: 'UNSPEC_1v2DS_FAST_DEFAULT_JUDGMENT',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, DEFAULT_JUDGMENT: 'Yes' },
  },
  // The defendant, a litigant in person, instructs a solicitor once the claim details are served: the Respondent1
  // Solicitor gives a notice of change, then acknowledges and responds as in a 1v1 claim, which runs to the final order
  {
    name: 'UNSPEC_1v1_LIP_FAST_NOTICE_OF_CHANGE',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'INDIVIDUAL', DEFENDANT_TYPE: 'INDIVIDUAL', ...roadAccident, NOTICE_OF_CHANGE: 'DEFENDANT_1' },
  },
  // Both parties change solicitor once the claimant has responded: solicitors of two other organisations give notices
  // of change, and the new solicitors upload the evidence, pay the hearing fee and confirm the trial arrangements
  {
    name: 'UNSPEC_1v1_FAST_NOTICE_OF_CHANGE',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      NOTICE_OF_CHANGE: 'CLAIMANT_1,DEFENDANT_1',
      NOTICE_OF_CHANGE_AFTER: 'RESPOND_TO_DEFENCE',
    },
  },
  // Once the claimant has responded, both solicitors raise a query about the hearing, which a CTSC admin answers, and
  // then each asks a follow-up question, which is answered too. The journey then runs to the final order.
  {
    name: 'UNSPEC_1v1_FAST_QUERY_MANAGEMENT',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      QUERY_MANAGEMENT: 'claimant,defendant1',
      QUERY_MANAGEMENT_HEARING_RELATED: 'Yes',
      QUERY_MANAGEMENT_FOLLOW_UP: 'Yes',
    },
  },
  // The claim fee is paid a second time once the claim is issued, the claimant's solicitor asks for it back, the
  // approver returns the refund, the solicitor changes its reason and sends it again, and the approver approves it.
  // The journey then runs to the final order.
  {
    name: 'UNSPEC_1v1_FAST_REFUND',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      REFUND: 'RETURN',
    },
  },

  // General applications. Each run stops once the application has been decided.
  // The claimant's solicitor applies to stay the claim, with notice, the defendant's solicitor responds and the judge
  // lists it for a hearing, which court staff schedule
  {
    name: 'UNSPEC_1v1_FAST_GENERAL_APPLICATION_HEARING',
    tags: [PR, MASTER, NIGHTLY],
    env: {
      ...individual1v1,
      GENERAL_APPLICATION: 'STAY_THE_CLAIM',
      GENERAL_APPLICATION_DECISION: 'LIST_FOR_HEARING',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },
  // Defendant 2's solicitor applies for more time, and the other solicitors respond
  {
    name: 'UNSPEC_1v2DS_FAST_GENERAL_APPLICATION_BY_DEFENDANT2',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      ...apiToJudicialReferral,
      GENERAL_APPLICATION: 'EXTEND_TIME',
      GENERAL_APPLICATION_BY: 'defendant2',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },
  // An application made without notice, which the judge sends to the other side: the claimant's solicitor pays the
  // extra fee and the defendant's solicitor responds before it is decided
  {
    name: 'UNSPEC_1v1_FAST_GENERAL_APPLICATION_SEND_TO_OTHER_PARTY',
    tags: [NIGHTLY],
    env: {
      ...individual1v1,
      ...apiToJudicialReferral,
      GENERAL_APPLICATION: 'STAY_THE_CLAIM',
      GENERAL_APPLICATION_WITH_NOTICE: 'No',
      GENERAL_APPLICATION_SEND_TO_OTHER_PARTY: 'Yes',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },
  // An urgent application, which goes straight to the judge, who asks for more information
  {
    name: 'UNSPEC_1v1_FAST_GENERAL_APPLICATION_URGENT',
    tags: [NIGHTLY],
    env: {
      ...individual1v1,
      ...apiToJudicialReferral,
      GENERAL_APPLICATION: 'STAY_THE_CLAIM',
      GENERAL_APPLICATION_URGENT: 'Yes',
      GENERAL_APPLICATION_DECISION: 'REQUEST_MORE_INFO',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },
  // An application the other side has agreed to
  {
    name: 'UNSPEC_1v1_FAST_GENERAL_APPLICATION_AGREED',
    tags: [NIGHTLY],
    env: {
      ...individual1v1,
      ...apiToJudicialReferral,
      GENERAL_APPLICATION: 'EXTEND_TIME',
      GENERAL_APPLICATION_AGREED: 'Yes',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },

  // Discontinuing the claim once the hearing notice is out: without needing the court's permission, or with a judge's
  // permission, which court staff then validate
  {
    name: 'UNSPEC_1v1_FAST_DISCONTINUE_AFTER_HEARING_NOTICE',
    tags: [NIGHTLY],
    env: { ...individual1v1, ...closeAfterHearingNotice, DISCONTINUE_CLAIM: 'NO_PERMISSION_NEEDED' },
  },
  {
    name: 'UNSPEC_1v2DS_FAST_DISCONTINUE_AFTER_HEARING_NOTICE',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      ...closeAfterHearingNotice,
      DISCONTINUE_CLAIM: 'NO_PERMISSION_NEEDED',
    },
  },
  {
    name: 'UNSPEC_2v1_FAST_DISCONTINUE_AFTER_HEARING_NOTICE',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '2v1',
      CLAIMANT_TYPE: 'INDIVIDUAL',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      ...closeAfterHearingNotice,
      DISCONTINUE_CLAIM: 'PERMISSION_GRANTED',
    },
  },

  // The judge decides the claim is not suitable for a Standard Direction Order: it should go to another hearing centre,
  // which the hearing centre admin transfers it to before the order is made there, or for another reason, which takes
  // it offline
  {
    name: 'UNSPEC_1v1_FAST_NOT_SUITABLE_SDO_CHANGE_LOCATION',
    tags: [NIGHTLY],
    env: { ...individual1v1, ...apiToJudicialReferral, NOT_SUITABLE_SDO: 'CHANGE_LOCATION', STOP_AT_STATE: 'CASE_PROGRESSION' },
  },
  {
    name: 'UNSPEC_1v2DS_FAST_NOT_SUITABLE_SDO_OTHER_REASONS',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2DS',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      ...roadAccident,
      ...apiToJudicialReferral,
      NOT_SUITABLE_SDO: 'OTHER_REASONS',
    },
  },

  // The judge's small claims order lists a dispute resolution hearing
  {
    name: 'UNSPEC_1v1_SMALL_DISPUTE_RESOLUTION_HEARING',
    tags: [NIGHTLY],
    env: { ...individual1v1, ...apiToJudicialReferral, TRACK: 'SMALL_CLAIM', DISPUTE_RESOLUTION_HEARING: 'Yes' },
  },

  // Court staff events: a case note once the claim is issued, the particulars of claim added with "Add or amend claim
  // documents", the legal representatives' details amended, then after the claimant's response the case is stayed and
  // the hearing centre admin messages a judge, who replies, and the stay is lifted. Then the claim is taken offline.
  {
    name: 'UNSPEC_1v1_FAST_COURT_STAFF_EVENTS',
    tags: [NIGHTLY],
    env: {
      ...individual1v1,
      ADD_CASE_NOTE: 'Yes',
      ADD_OR_AMEND_CLAIM_DOCUMENTS: 'Yes',
      AMEND_PARTY_DETAILS: 'Yes',
      STAY_CASE: 'Yes',
      SEND_AND_REPLY: 'Yes',
      STOP_AFTER_TEST: 'LIFT_STAY',
      CASE_PROCEEDS_IN_CASEMAN: 'OTHER',
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
      env: { ...process.env, ...scenarioApiUntil(scenario), ...scenario.env },
    }));
  }
  return [{ name: `UNSPEC_${process.env.CLAIM_TYPE ?? '1v1'}`, tags: ['@unspecified'], env: process.env }];
}
