import { expect } from '@playwright/test';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import yesNo from '../../../enums/yesNo.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import claimTypes from '../../../enums/claim-types.ts';
import claimTrack from '../../../enums/track.ts';
import Timeline from '../../../enums/timeline.ts';
import RespondentResponses from '../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../enums/admissionPaymentRoute.ts';
import caseStates from '../../../enums/caseStates.ts';
import { createClaimShape } from '../../flows/createClaimShape.ts';

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
  }, { env: scenarioEnv });

  const yes = (value: string | undefined): yesNo => (value === 'Yes' ? yesNo.YES : yesNo.NO);
  const partyType = (value: string | undefined): string =>
    ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(value) ? value : 'INDIVIDUAL';

  const claimType: claimTypes = env.CLAIM_TYPE;
  const claimantType = partyType(scenarioEnv.CLAIMANT_TYPE);
  const defendantType = partyType(scenarioEnv.DEFENDANT_TYPE);
  const track: claimTrack = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(scenarioEnv.TRACK) ? (scenarioEnv.TRACK as claimTrack) : claimTrack.FAST;
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
    // Whether each defendant's solicitor informs the court of an agreed extension to the time for responding
    // (INFORM_AGREED_EXTENSION=Yes, default No)
    informAgreedExtension: yes(scenarioEnv.INFORM_AGREED_EXTENSION),
    // Each defendant's response (RESPONDENT1_RESPONSE, RESPONDENT2_RESPONSE, default FULL_DEFENCE), and when a defendant
    // who admits all or part of the claim will pay (ADMISSION_PAYMENT_ROUTE, default IMMEDIATELY)
    respondent1Response,
    respondent2Response,
    admissionPaymentRoute: env.ADMISSION_PAYMENT_ROUTE as AdmissionPaymentRoute,
    stateAfterAllResponses,

    // Checks the settings make sense together, before the journey starts
    validate() {
      expect(interestRate, `Invalid INTEREST_RATE value: ${interestRate}. It must be a number.`).toMatch(/^\d+(\.\d+)?$/);
    },
  };
  return config;
}
