import { expect } from '@playwright/test';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import yesNo from '../../../enums/yesNo.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import claimTypes from '../../../enums/claim-types.ts';
import claimTrack from '../../../enums/track.ts';
import Timeline from '../../../enums/timeline.ts';
import RespondentResponses from '../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../enums/admissionPaymentRoute.ts';
import DefendantEmployment from '../../../enums/defendantEmployment.ts';
import ClaimantSuggestedPayment from '../../../enums/claimantSuggestedPayment.ts';
import caseStates from '../../../enums/caseStates.ts';
import FinalOrder, { finalOrdersForTrack } from '../../../enums/finalOrders.ts';
import SettleClaim from '../../../enums/settleClaim.ts';
import DiscontinueClaim from '../../../enums/discontinueClaim.ts';
import { createClaimShape } from '../../flows/createClaimShape.ts';
import { caseFlagsProblem } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { mciProblem } from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';

export type SpecifiedConfig = ReturnType<typeof specifiedConfig>;

// How the claimant works out the interest they claim: one rate over the whole period, or a total they have broken down
// themselves
export enum InterestType {
  SAME_RATE = 'SAME_RATE_INTEREST',
  BREAK_DOWN = 'BREAK_DOWN_INTEREST',
}

// The settings of one specified journey, read from its scenario's env vars
export function specifiedConfig(scenarioEnv: Record<string, string | undefined>) {
  const env = cleanEnv({
    PAYMENT_METHOD: enums({
      values: [PaymentMethod.PBA, PaymentMethod.CARD],
      default: PaymentMethod.PBA,
    }),
    CLAIM_TYPE: enums({
      values: [
        claimTypes.ONE_VS_ONE_LIP,
        claimTypes.TWO_VS_ONE_LIP,
        claimTypes.ONE_VS_TWO_LIPS,
        claimTypes.ONE_VS_TWO_LR_LIP,
        claimTypes.ONE_VS_TWO_LIP_LR,
        claimTypes.ONE_VS_ONE,
        claimTypes.TWO_VS_ONE,
        claimTypes.ONE_VS_TWO_SAME_SOL,
        claimTypes.ONE_VS_TWO_DIFF_SOL,
      ] as const,
      default: claimTypes.ONE_VS_ONE,
    }),
    INTEREST_TYPE: enums({
      values: [InterestType.SAME_RATE, InterestType.BREAK_DOWN],
      default: InterestType.SAME_RATE,
    }),
    TIMELINE: enums({
      values: [Timeline.MANUAL, Timeline.UPLOAD],
      default: Timeline.MANUAL,
    }),
    // Each defendant's response. In a 2v1 claim RESPONDENT2_RESPONSE is the defendant's response to Claimant 2.
    RESPONDENT1_RESPONSE: enums({
      values: [RespondentResponses.FULL_DEFENCE, RespondentResponses.FULL_ADMISSION, RespondentResponses.PART_ADMISSION, RespondentResponses.COUNTER_CLAIM],
      default: RespondentResponses.FULL_DEFENCE,
    }),
    RESPONDENT2_RESPONSE: enums({
      values: [RespondentResponses.FULL_DEFENCE, RespondentResponses.FULL_ADMISSION, RespondentResponses.PART_ADMISSION, RespondentResponses.COUNTER_CLAIM],
      default: RespondentResponses.FULL_DEFENCE,
    }),
    ADMISSION_PAYMENT_ROUTE: enums({
      values: [AdmissionPaymentRoute.IMMEDIATELY, AdmissionPaymentRoute.BY_SET_DATE, AdmissionPaymentRoute.SUGGESTION_OF_REPAYMENT_PLAN],
      default: AdmissionPaymentRoute.IMMEDIATELY,
    }),
    // What each defendant says about their work when they give their finances (an individual or sole trader admitting
    // the claim and not paying immediately)
    RESPONDENT1_EMPLOYMENT: enums({
      values: [DefendantEmployment.RETIRED, DefendantEmployment.SELF_EMPLOYED],
      default: DefendantEmployment.RETIRED,
    }),
    RESPONDENT2_EMPLOYMENT: enums({
      values: [DefendantEmployment.RETIRED, DefendantEmployment.SELF_EMPLOYED],
      default: DefendantEmployment.RETIRED,
    }),
    // Whether the claimant proceeds with the claim once the defendants have entered a full defence, or in a 2v1 or 1v2SS
    // claim have admitted it (both claimants in a 2v1 claim, against both defendants in a 1v2 claim: a specified claim
    // asks once)
    CLAIMANT_PROCEED: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES,
    }),
    // A 1v1 claimant's answers to an admission: whether they accept the amount a defendant admits (part admission), and
    // whether they accept the date or repayment plan the defendant offers when not paying immediately. Rejecting the
    // date or plan, the claimant suggests how the defendant pays instead.
    CLAIMANT_ACCEPTS_AMOUNT: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES,
    }),
    CLAIMANT_ACCEPTS_PLAN: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES,
    }),
    CLAIMANT_SUGGESTED_PAYMENT: enums({
      values: [ClaimantSuggestedPayment.IMMEDIATELY, ClaimantSuggestedPayment.SET_DATE, ClaimantSuggestedPayment.REPAYMENT_PLAN],
      default: ClaimantSuggestedPayment.IMMEDIATELY,
    }),
  }, { env: scenarioEnv });

  const yes = (value: string | undefined): yesNo => (value === 'Yes' ? yesNo.YES : yesNo.NO);
  const partyType = (value: string | undefined): string =>
    ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(value) ? value : 'INDIVIDUAL';

  const claimType: claimTypes = env.CLAIM_TYPE;
  const claimantType = partyType(scenarioEnv.CLAIMANT_TYPE);
  const defendantType = partyType(scenarioEnv.DEFENDANT_TYPE);
  const track: claimTrack = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(scenarioEnv.TRACK) ? (scenarioEnv.TRACK as claimTrack) : claimTrack.FAST;
  // The judge's final order (FINAL_ORDER). If it is not set, the first order the track offers is made: a free form order
  // on the small claims and fast tracks, the blank after-hearing template on the intermediate and multi tracks.
  const finalOrder: FinalOrder = (scenarioEnv.FINAL_ORDER as FinalOrder) ?? finalOrdersForTrack[track][0];
  // With the same rate, 8 is the statutory rate and any other rate needs a reason. With a breakdown, it is the total
  // interest in pounds.
  const interestRate: string = scenarioEnv.INTEREST_RATE ?? '8';
  const respondent1Response: RespondentResponses = env.RESPONDENT1_RESPONSE;
  const respondent2Response: RespondentResponses = env.RESPONDENT2_RESPONSE;
  // Once every response is in, the claim waits for the claimant if they are all the same and not a counterclaim. A
  // counterclaim, or responses that differ (divergent), take it offline. With two defendants' solicitors responding
  // separately (1v2DS), civil-service only keeps the claim online when both enter a full defence.
  const responses = [claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(claimType)
    ? [respondent1Response, respondent2Response]
    : [respondent1Response];
  const allSame = responses.every((response) => response === responses[0]);
  const staysOnline = claimType === claimTypes.ONE_VS_TWO_DIFF_SOL
    ? responses.every((response) => response === RespondentResponses.FULL_DEFENCE)
    : allSame && responses[0] !== RespondentResponses.COUNTER_CLAIM;
  const stateAfterAllResponses = staysOnline ? caseStates.AWAITING_APPLICANT_INTENTION : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;
  // The claimant's solicitor responds once every response is in and the claim is still online (all full defences, or
  // all the same admission). Where the claim goes then is worked out in claimantResponseOutcome.
  const claimantResponse = {
    proceed: env.CLAIMANT_PROCEED as yesNo,
    acceptsAmount: env.CLAIMANT_ACCEPTS_AMOUNT as yesNo,
    acceptsPlan: env.CLAIMANT_ACCEPTS_PLAN as yesNo,
    suggestedPayment: env.CLAIMANT_SUGGESTED_PAYMENT as ClaimantSuggestedPayment,
  };
  const claimantResponds = staysOnline;
  const claimantOutcome = claimantResponseOutcome(claimType, track, responses[0], env.ADMISSION_PAYMENT_ROUTE as AdmissionPaymentRoute, claimantResponse);

  const config = {
    claimType,
    caseType: 'SPECIFIED',
    claimantType,
    defendantType,
    // The parties to the claim and who represents them, which creating the claim follows (through the UI or the API).
    // A specified claim does not ask about a claimant's litigation friend when it is created.
    claimShape: createClaimShape(claimType, claimantType, defendantType, [yesNo.NO, yesNo.NO]),
    track,
    // Whether the claim is for a delayed or cancelled flight (AIRLINE_CLAIM=Yes, default No)
    airlineClaim: yes(scenarioEnv.AIRLINE_CLAIM),
    // Whether the timeline of events is typed in (MANUAL, the default) or uploaded as a document (UPLOAD)
    timeline: env.TIMELINE as Timeline,
    // Whether the claimant claims interest (INTEREST_REQUIRED=Yes, default No), and how (INTEREST_TYPE, INTEREST_RATE)
    interestRequired: yes(scenarioEnv.INTEREST_REQUIRED),
    interestType: env.INTEREST_TYPE as InterestType,
    interestRate,
    // How the claimant's solicitor pays the claim fee: from their PBA account (PAYMENT_METHOD=PBA, the default) or by
    // card (CARD), which is always done in the UI, even when the claim is created through the API
    paymentMethod: env.PAYMENT_METHOD as PaymentMethod,
    // Whether the claimant claims fixed commencement costs (FIXED_COMMENCEMENT_COSTS=Yes, default No)
    fixedCommencementCosts: yes(scenarioEnv.FIXED_COMMENCEMENT_COSTS),
    // Whether the hearing centre admin adds a case note straight after the claim is issued (ADD_CASE_NOTE=Yes,
    // default No)
    addCaseNote: yes(scenarioEnv.ADD_CASE_NOTE),
    // Whether the hearing centre admin stays the case once the claimant's response has taken it to JUDICIAL_REFERRAL,
    // asks the parties for an update and lifts the stay (STAY_CASE=Yes, default No)
    stayCase: yes(scenarioEnv.STAY_CASE),
    // Whether mediation settles a small claim the claimant's response took to mediation, which stays the case and ends
    // the journey there, instead of being unsuccessful (MEDIATION_SUCCESSFUL=Yes, default No)
    mediationSuccessful: yes(scenarioEnv.MEDIATION_SUCCESSFUL),
    // Whether and how the claim is settled with "Settle this claim" once the rest of the journey has run: the
    // claimant's solicitor marks it paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL), which stays the case, or court staff
    // record it settled after a judge's order (JUDGE_ORDER) or a consent order (CONSENT_ORDER). Not settled by default.
    settleClaim: scenarioEnv.SETTLE_CLAIM as SettleClaim | undefined,
    // Whether the claimant's solicitor fully discontinues the claim with "Discontinue this claim" once the rest of the
    // journey has run: without needing the court's permission (DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED), or with a
    // judge's permission (PERMISSION_GRANTED), which court staff then validate. Not discontinued by default.
    discontinueClaim: scenarioEnv.DISCONTINUE_CLAIM as DiscontinueClaim | undefined,
    // Whether each defendant's solicitor informs the court of an agreed extension to the time for responding
    // (INFORM_AGREED_EXTENSION=Yes, default No)
    informAgreedExtension: yes(scenarioEnv.INFORM_AGREED_EXTENSION),
    // Each defendant's response (RESPONDENT1_RESPONSE, RESPONDENT2_RESPONSE, default FULL_DEFENCE), and when a defendant
    // who admits all or part of the claim will pay (ADMISSION_PAYMENT_ROUTE, default IMMEDIATELY)
    respondent1Response,
    respondent2Response,
    admissionPaymentRoute: env.ADMISSION_PAYMENT_ROUTE as AdmissionPaymentRoute,
    // Whether each defendant giving their finances is retired or self-employed (RESPONDENT1_EMPLOYMENT,
    // RESPONDENT2_EMPLOYMENT, default RETIRED)
    respondent1Employment: env.RESPONDENT1_EMPLOYMENT as DefendantEmployment,
    respondent2Employment: env.RESPONDENT2_EMPLOYMENT as DefendantEmployment,
    stateAfterAllResponses,
    // Whether the claimant responds to the defence (CLAIMANT_PROCEED, default Yes), and where the claim goes then
    // The claimant's answers (CLAIMANT_PROCEED, CLAIMANT_ACCEPTS_AMOUNT, CLAIMANT_ACCEPTS_PLAN, CLAIMANT_SUGGESTED_PAYMENT),
    // whether they respond, and the business process and state their response leads to
    claimantResponse,
    claimantResponds,
    // The flags the hearing centre admin adds once the claimant has responded and the claim is still online
    // (CASE_FLAGS: "representative", or a list such as CASE:CF0002,DEFENDANT_1:RA0012; see caseFlagSpecs.ts)
    caseFlagsSetting: scenarioEnv.CASE_FLAGS,
    // The Manage Contact Information runs once the claimant has responded and the claim is still online
    // (MANAGE_CONTACT_INFORMATION: "representative", or a list such as admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1;
    // see manageContactInformationSpecs.ts)
    manageContactInformationSetting: scenarioEnv.MANAGE_CONTACT_INFORMATION,
    claimantOutcome,
    finalOrder,

    // Checks the settings make sense together, before the journey starts
    validate() {
      expect(
        [undefined, ...Object.values(SettleClaim)],
        `Invalid SETTLE_CLAIM value: ${scenarioEnv.SETTLE_CLAIM}. It must be one of ${Object.values(SettleClaim).join(', ')}.`,
      ).toContain(scenarioEnv.SETTLE_CLAIM);
      expect(
        [undefined, ...Object.values(DiscontinueClaim)],
        `Invalid DISCONTINUE_CLAIM value: ${scenarioEnv.DISCONTINUE_CLAIM}. It must be one of ${Object.values(DiscontinueClaim).join(', ')}.`,
      ).toContain(scenarioEnv.DISCONTINUE_CLAIM);
      expect(
        scenarioEnv.SETTLE_CLAIM === undefined || scenarioEnv.DISCONTINUE_CLAIM === undefined,
        'SETTLE_CLAIM and DISCONTINUE_CLAIM cannot both be set: a claim is either settled or discontinued.',
      ).toBeTruthy();
      expect(interestRate, `Invalid INTEREST_RATE value: ${interestRate}. It must be a number.`).toMatch(/^\d+(\.\d+)?$/);
      expect(
        Object.values(FinalOrder),
        `Invalid FINAL_ORDER value: ${finalOrder}. It must be one of ${Object.values(FinalOrder).join(', ')}.`,
      ).toContain(finalOrder);
      expect(
        finalOrdersForTrack[track],
        `Invalid FINAL_ORDER value: ${finalOrder} for track ${track}. The ${track} track offers ${finalOrdersForTrack[track].join(', ')}.`,
      ).toContain(finalOrder);
      const caseFlagsError = caseFlagsProblem(config);
      expect(caseFlagsError, caseFlagsError).toBeUndefined();
      const mciError = mciProblem(config);
      expect(mciError, mciError).toBeUndefined();
    },
  };
  return config;
}

// Where the claimant's response takes the claim (civil-service's DetermineNextState and the claimant response process).
// response is every defendant's response, as they are all the same once the claim waits for the claimant.
//  - A full defence: proceeding takes a small claim to mediation (CARM) and any other claim to JUDICIAL_REFERRAL; not
//    proceeding takes it offline.
//  - A 2v1 or 1v2SS admission: the claimant is only asked whether they proceed, and either way the claim goes offline
//    (even a small claim, checked with a 1v2SS part admission).
//  - A 1v1 admission paid immediately and accepted (a full admission is not asked about at all) waits for the payment,
//    so the claim stays in AWAITING_APPLICANT_INTENTION.
//  - A 1v1 date or repayment plan the claimant accepts becomes a judgment by admission (All_FINAL_ORDERS_ISSUED, through
//    the JUDGEMENT_BY_ADMISSION_NON_DIVERGENT_SPEC process). A rejected full admission plan goes offline, and a rejected
//    part admission plan goes to JUDICIAL_REFERRAL.
//  - A 1v1 part admission amount the claimant rejects is disputed like a defence: JUDICIAL_REFERRAL, or mediation for a
//    small claim.
export function claimantResponseOutcome(
  claimType: claimTypes,
  track: claimTrack,
  response: RespondentResponses,
  paymentRoute: AdmissionPaymentRoute,
  answers: { proceed: yesNo; acceptsAmount: yesNo; acceptsPlan: yesNo },
): { state: caseStates; businessProcess: string } {
  const outcome = (state: caseStates, businessProcess = 'CLAIMANT_RESPONSE_SPEC') => ({ state, businessProcess });
  const disputed = track === claimTrack.SMALL ? caseStates.IN_MEDIATION : caseStates.JUDICIAL_REFERRAL;
  if (response === RespondentResponses.FULL_DEFENCE) {
    return outcome(answers.proceed === yesNo.NO ? caseStates.PROCEEDS_IN_HERITAGE_SYSTEM : disputed);
  }
  if (claimType !== claimTypes.ONE_VS_ONE) {
    return outcome(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
  }
  const partAdmission = response === RespondentResponses.PART_ADMISSION;
  if (partAdmission && answers.acceptsAmount === yesNo.NO) {
    return outcome(disputed);
  }
  if (paymentRoute === AdmissionPaymentRoute.IMMEDIATELY) {
    return outcome(caseStates.AWAITING_APPLICANT_INTENTION);
  }
  if (answers.acceptsPlan === yesNo.YES) {
    return outcome(caseStates.All_FINAL_ORDERS_ISSUED, 'JUDGEMENT_BY_ADMISSION_NON_DIVERGENT_SPEC');
  }
  return outcome(partAdmission ? caseStates.JUDICIAL_REFERRAL : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
}
