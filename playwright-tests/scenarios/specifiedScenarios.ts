import { Scenario, scenarioApiUntil } from './unspecifiedScenarios.ts';

// The specified journeys. Each scenario is a set of the journey's env vars, run as its own group in
// SpecifiedSS.test.ts and tagged with its name (@SPEC_1v1_FAST etc.), @specified and the pipeline tags below.
// The spec-* projects in playwright.config.ts each run the scenarios with one pipeline tag:
//  - @spec-smoke: the pipeline's smoke test, run before the PR and master sets
//  - @spec-pr: run on every PR
//  - @spec-master: run on master
//  - @spec-nightly: run every night
//
// The list is only used when SCENARIOS=Yes. Without it a single journey is run from the env vars on the command
// line, as the test:SPEC_* scripts in package.json do, and with no env vars at all that is the default 1v1 claim.
// One scenario from the list can be run by its tag:
//   SCENARIOS=Yes npx playwright test playwright-tests/e2e/journeys/SpecifiedSS.test.ts --headed --project chromium --grep @SPEC_1v1_FAST

const SMOKE = '@spec-smoke';
const PR = '@spec-pr';
const MASTER = '@spec-master';
const NIGHTLY = '@spec-nightly';

const company1v1 = { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' };
const company1v2DS = { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION' };
const company1v2SS = { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' };
const soleTrader2v1 = { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' };
// Every defendant responds with a counterclaim (in a 2v1 claim, to both claimants)
const counterClaim = { RESPONDENT1_RESPONSE: 'COUNTER_CLAIM', RESPONDENT2_RESPONSE: 'COUNTER_CLAIM' };
// Runs every step through the CCD API, until the claim goes offline
const apiToOffline = { API_UNTIL: 'PROCEEDS_IN_HERITAGE_SYSTEM' };
// Runs the steps that have an API version through the CCD API until the claim reaches JUDICIAL_REFERRAL (IN_MEDIATION
// for a small claim), so a scenario about a later event only does that event in the UI
const apiToJudicialReferral = { API_UNTIL: 'JUDICIAL_REFERRAL' };
// Stops the journey at JUDICIAL_REFERRAL, through the API: the steps that close the claim (settling, discontinuing,
// dismissing it or taking it offline) still run, in the UI
const closeAtJudicialReferral = { API_UNTIL: 'JUDICIAL_REFERRAL', STOP_AT_STATE: 'JUDICIAL_REFERRAL' };

const scenarios: Scenario[] = [
  // The smoke test: a 1v1 claim is created and paid for, and the run stops once it is issued
  { name: 'SPEC_1v1_SMOKE', tags: [SMOKE], env: { ...company1v1, STOP_AFTER_TEST: 'CREATE_CLAIM' } },
  { name: 'SPEC_1v1_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v1_SMALL', tags: [PR, MASTER, NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TRACK: 'SMALL_CLAIM' } },
  { name: 'SPEC_1v1_AIRLINE_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', AIRLINE_CLAIM: 'Yes' } },
  { name: 'SPEC_1v1_LIP_FAST', tags: [MASTER, NIGHTLY], env: { CLAIM_TYPE: '1v1LIP', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_2v1_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2SS_FAST', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL' } },
  { name: 'SPEC_1v2DS_FAST', tags: [PR, MASTER, NIGHTLY], env: { CLAIM_TYPE: '1v2DS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'ORGANISATION' } },
  // Each solicitor adds unavailable dates while the small claim is in mediation, Defendant 1's for both defendants,
  // then the hearing centre admin adds some for both defendants
  { name: 'SPEC_1v2SS_SMALL_UNAVAILABLE_DATES', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TRACK: 'SMALL_CLAIM', ADD_UNAVAILABLE_DATES: 'Yes' } },
  // The defendants do not respond: once the response deadlines have passed the claimant's solicitor asks for default
  // judgment against them, paid immediately
  { name: 'SPEC_1v1_DEFAULT_JUDGMENT', tags: [PR, MASTER, NIGHTLY], env: { CLAIM_TYPE: '1v1', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', DEFAULT_JUDGMENT: 'Yes' } },
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
  // Once the claimant has responded, both solicitors raise a query about the hearing, which a CTSC admin answers, and
  // then each asks a follow-up question, which is answered too. The journey then runs to the final order.
  {
    name: 'SPEC_1v1_FAST_QUERY_MANAGEMENT',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'COMPANY',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      QUERY_MANAGEMENT: 'claimant,defendant1',
      QUERY_MANAGEMENT_HEARING_RELATED: 'Yes',
      QUERY_MANAGEMENT_FOLLOW_UP: 'Yes',
    },
  },
  // The claim fee is paid a second time once the claim is issued, the claimant's solicitor asks for it back, the
  // approver returns the refund, the solicitor changes its reason and sends it again, and the approver approves it.
  // The journey then runs to the final order.
  {
    name: 'SPEC_1v1_FAST_REFUND',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v1',
      CLAIMANT_TYPE: 'COMPANY',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      REFUND: 'RETURN',
    },
  },

  // General applications. Each run stops once the application has been decided.
  // The claimant's solicitor applies to stay the claim, with notice, both defendants' solicitors respond and the judge
  // approves it
  {
    name: 'SPEC_1v2DS_FAST_GENERAL_APPLICATION',
    tags: [PR, MASTER, NIGHTLY],
    env: { ...company1v2DS, GENERAL_APPLICATION: 'STAY_THE_CLAIM', STOP_AFTER_TEST: 'GENERAL_APPLICATION' },
  },
  // While the small claim is in mediation the claimant's solicitor applies for more time, the legal adviser refers the
  // application to a judge and the judge decides it
  {
    name: 'SPEC_1v1_SMALL_GENERAL_APPLICATION_REFER_TO_JUDGE',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      TRACK: 'SMALL_CLAIM',
      GENERAL_APPLICATION: 'EXTEND_TIME',
      GENERAL_APPLICATION_REFER_TO_JUDGE: 'Yes',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },
  // An application made without notice, where the judge asks for more information and the claimant's solicitor gives it
  {
    name: 'SPEC_1v1_FAST_GENERAL_APPLICATION_MORE_INFO',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      ...apiToJudicialReferral,
      GENERAL_APPLICATION: 'STAY_THE_CLAIM',
      GENERAL_APPLICATION_WITH_NOTICE: 'No',
      GENERAL_APPLICATION_DECISION: 'REQUEST_MORE_INFO',
      STOP_AFTER_TEST: 'GENERAL_APPLICATION',
    },
  },

  // Settling the claim: the claimant's solicitor marks it paid in full, or court staff record it settled after a
  // consent order or a judge's order (the last after the final orders are issued)
  { name: 'SPEC_1v1_SETTLE_PAID_IN_FULL', tags: [NIGHTLY], env: { ...company1v1, ...closeAtJudicialReferral, SETTLE_CLAIM: 'MARK_PAID_IN_FULL' } },
  { name: 'SPEC_1v2DS_SETTLE_CONSENT_ORDER', tags: [NIGHTLY], env: { ...company1v2DS, ...closeAtJudicialReferral, SETTLE_CLAIM: 'CONSENT_ORDER' } },
  {
    name: 'SPEC_2v1_SETTLE_JUDGE_ORDER',
    tags: [NIGHTLY],
    env: { CLAIM_TYPE: '2v1', CLAIMANT_TYPE: 'SOLE_TRADER', DEFENDANT_TYPE: 'INDIVIDUAL', API_UNTIL: 'All_FINAL_ORDERS_ISSUED', SETTLE_CLAIM: 'JUDGE_ORDER' },
  },

  // Discontinuing the claim: with a judge's permission, which court staff then validate, or without needing it
  { name: 'SPEC_1v1_DISCONTINUE_PERMISSION_GRANTED', tags: [NIGHTLY], env: { ...company1v1, ...closeAtJudicialReferral, DISCONTINUE_CLAIM: 'PERMISSION_GRANTED' } },
  { name: 'SPEC_1v2DS_DISCONTINUE', tags: [NIGHTLY], env: { ...company1v2DS, ...closeAtJudicialReferral, DISCONTINUE_CLAIM: 'NO_PERMISSION_NEEDED' } },

  // Judgments online. After default judgment the claimant's solicitor marks the judgment paid in full, the hearing
  // centre admin refers the defence received to a judge and sets the judgment aside after it, then takes the claim
  // offline.
  {
    name: 'SPEC_1v1_DEFAULT_JUDGMENT_SET_ASIDE',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      DEFAULT_JUDGMENT: 'Yes',
      JUDGMENT_PAID_IN_FULL: 'Yes',
      REFER_JUDGE_DEFENCE_RECEIVED: 'Yes',
      SET_ASIDE_JUDGMENT: 'ORDER_AFTER_DEFENCE',
      CASE_PROCEEDS_IN_CASEMAN: 'OTHER',
    },
  },
  // The default judgment against both defendants is set aside as made in error, then the claim is taken offline
  {
    name: 'SPEC_1v2DS_DEFAULT_JUDGMENT_SET_ASIDE_ERROR',
    tags: [NIGHTLY],
    env: {
      ...company1v2DS,
      API_UNTIL: 'All_FINAL_ORDERS_ISSUED',
      DEFAULT_JUDGMENT: 'Yes',
      SET_ASIDE_JUDGMENT: 'JUDGMENT_ERROR',
      CASE_PROCEEDS_IN_CASEMAN: 'APPLICATION',
    },
  },
  // The defendant admits the whole claim and offers to pay by a set date, the claimant accepts, which gives judgment by
  // admission, then the claimant's solicitor marks it paid in full and the defence received is referred to a judge
  {
    name: 'SPEC_1v1_JUDGMENT_BY_ADMISSION',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      API_UNTIL: 'All_FINAL_ORDERS_ISSUED',
      RESPONDENT1_RESPONSE: 'FULL_ADMISSION',
      ADMISSION_PAYMENT_ROUTE: 'BY_SET_DATE',
      JUDGMENT_PAID_IN_FULL: 'Yes',
      REFER_JUDGE_DEFENCE_RECEIVED: 'Yes',
    },
  },

  // Admissions: the claimant rejects the amount a defendant admits, so the claim goes on to the final order, or rejects
  // the defendant's payment plan and suggests a repayment plan
  {
    name: 'SPEC_1v1_PART_ADMIT_REJECTED',
    tags: [NIGHTLY],
    env: { ...company1v1, RESPONDENT1_RESPONSE: 'PART_ADMISSION', CLAIMANT_ACCEPTS_AMOUNT: 'No' },
  },
  {
    name: 'SPEC_1v1_FULL_ADMIT_REPAYMENT_PLAN',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      API_UNTIL: 'All_FINAL_ORDERS_ISSUED',
      RESPONDENT1_RESPONSE: 'FULL_ADMISSION',
      ADMISSION_PAYMENT_ROUTE: 'BY_SET_DATE',
      CLAIMANT_ACCEPTS_PLAN: 'No',
      CLAIMANT_SUGGESTED_PAYMENT: 'REPAYMENT_PLAN',
    },
  },

  // Requests for reconsideration of the legal adviser's small claims order, after unsuccessful mediation: the judge
  // upholds the order, makes a new one, or makes a general order
  {
    name: 'SPEC_1v1_SMALL_RECONSIDERATION_UPHOLD',
    tags: [NIGHTLY],
    env: { ...company1v1, ...apiToJudicialReferral, TRACK: 'SMALL_CLAIM', REQUEST_FOR_RECONSIDERATION: 'CLAIMANT' },
  },
  {
    name: 'SPEC_1v2DS_SMALL_RECONSIDERATION_NEW_SDO',
    tags: [NIGHTLY],
    env: {
      ...company1v2DS,
      ...apiToJudicialReferral,
      TRACK: 'SMALL_CLAIM',
      REQUEST_FOR_RECONSIDERATION: 'DEFENDANT_2',
      RECONSIDERATION_DECISION: 'CREATE_SDO',
    },
  },
  {
    name: 'SPEC_1v1_SMALL_RECONSIDERATION_GENERAL_ORDER',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      ...apiToJudicialReferral,
      TRACK: 'SMALL_CLAIM',
      REQUEST_FOR_RECONSIDERATION: 'DEFENDANT_1',
      RECONSIDERATION_DECISION: 'CREATE_GENERAL_ORDER',
    },
  },

  // Mediation: each solicitor uploads mediation documents once it has been unsuccessful (for both claimants, or both
  // defendants), or mediation settles the claim
  {
    name: 'SPEC_2v1_SMALL_UPLOAD_MEDIATION_DOCUMENTS',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '2v1',
      CLAIMANT_TYPE: 'SOLE_TRADER',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      TRACK: 'SMALL_CLAIM',
      UPLOAD_MEDIATION_DOCUMENTS: 'Yes',
      STOP_AFTER_TEST: 'UPLOAD_MEDIATION_DOCUMENTS',
    },
  },
  {
    name: 'SPEC_1v2SS_SMALL_UPLOAD_MEDIATION_DOCUMENTS',
    tags: [NIGHTLY],
    env: {
      CLAIM_TYPE: '1v2SS',
      CLAIMANT_TYPE: 'COMPANY',
      DEFENDANT_TYPE: 'INDIVIDUAL',
      TRACK: 'SMALL_CLAIM',
      UPLOAD_MEDIATION_DOCUMENTS: 'Yes',
      STOP_AFTER_TEST: 'UPLOAD_MEDIATION_DOCUMENTS',
    },
  },
  { name: 'SPEC_1v1_SMALL_MEDIATION_SUCCESSFUL', tags: [NIGHTLY], env: { ...company1v1, TRACK: 'SMALL_CLAIM', MEDIATION_SUCCESSFUL: 'Yes' } },

  // The legal adviser's small claims order lists a dispute resolution hearing
  {
    name: 'SPEC_1v1_SMALL_DISPUTE_RESOLUTION_HEARING',
    tags: [NIGHTLY],
    env: { ...company1v1, ...apiToJudicialReferral, TRACK: 'SMALL_CLAIM', DISPUTE_RESOLUTION_HEARING: 'Yes' },
  },

  // The intermediate and multi tracks, to the final order
  { name: 'SPEC_1v2DS_INTERMEDIATE', tags: [NIGHTLY], env: { ...company1v2DS, TRACK: 'INTERMEDIATE_CLAIM' } },
  { name: 'SPEC_1v2SS_MULTI', tags: [NIGHTLY], env: { CLAIM_TYPE: '1v2SS', CLAIMANT_TYPE: 'COMPANY', DEFENDANT_TYPE: 'INDIVIDUAL', TRACK: 'MULTI_CLAIM' } },

  // After the claimant's response the hearing centre admin adds case flags for each party and makes the first
  // inactive, and every party's contact details are updated. A case note is added once the claim is issued.
  {
    name: 'SPEC_1v1_FAST_CASE_FLAGS',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      ...apiToJudicialReferral,
      ADD_CASE_NOTE: 'Yes',
      CASE_FLAGS: 'representative',
      MANAGE_CONTACT_INFORMATION: 'representative',
      STOP_AFTER_TEST: 'MANAGE_CONTACT_INFORMATION',
    },
  },
  // The case is stayed after the claimant's response, the hearing centre admin messages a judge, who replies, the
  // parties are asked for an update and the stay is lifted
  {
    name: 'SPEC_1v2DS_FAST_STAY_CASE',
    tags: [NIGHTLY],
    env: { ...company1v2DS, ...apiToJudicialReferral, STAY_CASE: 'Yes', SEND_AND_REPLY: 'Yes', STOP_AFTER_TEST: 'LIFT_STAY' },
  },
  // The judge decides the claim is not suitable for a Standard Direction Order for another reason, which takes it
  // offline
  {
    name: 'SPEC_1v1_FAST_NOT_SUITABLE_SDO',
    tags: [NIGHTLY],
    env: { ...company1v1, ...apiToJudicialReferral, NOT_SUITABLE_SDO: 'OTHER_REASONS' },
  },
  // The hearing centre admin amends the legal representatives' details and adds a case note, the claimant's solicitor
  // changes their email address for notifications, then the case is dismissed
  {
    name: 'SPEC_1v1_FAST_DISMISS_CASE',
    tags: [NIGHTLY],
    env: { ...company1v1, ...closeAtJudicialReferral, ADD_CASE_NOTE: 'Yes', AMEND_PARTY_DETAILS: 'Yes', CHANGE_SOLICITOR_EMAIL: 'Yes', DISMISS_CASE: 'Yes' },
  },
  // The hearing centre admin takes the claim offline, as the defendant's solicitor does not consent to accept service
  // through MyHMCTS
  {
    name: 'SPEC_1v1_FAST_CASE_PROCEEDS_IN_CASEMAN',
    tags: [NIGHTLY],
    env: { ...company1v1, ...closeAtJudicialReferral, CASE_PROCEEDS_IN_CASEMAN: 'DEFENDANT_DOES_NOT_CONSENT' },
  },

  // Counterclaims: every defendant responds with a counterclaim, which takes the claim offline
  // (PROCEEDS_IN_HERITAGE_SYSTEM), on the fast track in the UI and on the small claims track through the API
  { name: 'SPEC_1v1_FAST_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...company1v1, ...counterClaim } },
  { name: 'SPEC_1v2SS_FAST_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...company1v2SS, ...counterClaim } },
  { name: 'SPEC_2v1_FAST_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...soleTrader2v1, ...counterClaim } },
  { name: 'SPEC_1v1_SMALL_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...company1v1, ...counterClaim, ...apiToOffline, TRACK: 'SMALL_CLAIM' } },
  { name: 'SPEC_1v2SS_SMALL_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...company1v2SS, ...counterClaim, ...apiToOffline, TRACK: 'SMALL_CLAIM' } },
  { name: 'SPEC_2v1_SMALL_COUNTER_CLAIM', tags: [NIGHTLY], env: { ...soleTrader2v1, ...counterClaim, ...apiToOffline, TRACK: 'SMALL_CLAIM' } },

  // Interest. In the UI, on small claims as playwright-e2e does: the statutory 8% from the submit date, a breakdown,
  // and a different rate from a specific date. Each run stops once the defendant's solicitor is assigned.
  {
    name: 'SPEC_1v1_SMALL_INTEREST_SAME_RATE',
    tags: [NIGHTLY],
    env: { ...company1v1, TRACK: 'SMALL_CLAIM', INTEREST_REQUIRED: 'Yes', STOP_AFTER_TEST: 'ASSIGN_DEFENDANT_SOLICITORS' },
  },
  {
    name: 'SPEC_1v1_SMALL_INTEREST_BREAK_DOWN',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      TRACK: 'SMALL_CLAIM',
      INTEREST_REQUIRED: 'Yes',
      INTEREST_TYPE: 'BREAK_DOWN_INTEREST',
      INTEREST_RATE: '250',
      STOP_AFTER_TEST: 'ASSIGN_DEFENDANT_SOLICITORS',
    },
  },
  {
    name: 'SPEC_1v1_SMALL_INTEREST_DIFFERENT_RATE_FROM_DATE',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      TRACK: 'SMALL_CLAIM',
      INTEREST_REQUIRED: 'Yes',
      INTEREST_RATE: '5',
      INTEREST_FROM: 'FROM_A_SPECIFIC_DATE',
      STOP_AFTER_TEST: 'ASSIGN_DEFENDANT_SOLICITORS',
    },
  },
  // Through the API: the statutory 8% from a specific date until the claim is submitted, which is in the claim fee,
  // and the claim carries on to the final order with interest on it
  {
    name: 'SPEC_1v1_FAST_INTEREST_FROM_DATE',
    tags: [NIGHTLY],
    env: {
      ...company1v1,
      API_UNTIL: 'All_FINAL_ORDERS_ISSUED',
      INTEREST_REQUIRED: 'Yes',
      INTEREST_FROM: 'FROM_A_SPECIFIC_DATE',
      INTEREST_UNTIL: 'UNTIL_CLAIM_SUBMIT_DATE',
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
      env: { ...process.env, ...scenarioApiUntil(scenario), ...scenario.env },
      settings: Object.keys(scenario.env),
    }));
  }
  return [{ name: `SPEC_${process.env.CLAIM_TYPE ?? '1v1'}`, tags: ['@specified'], env: process.env }];
}
