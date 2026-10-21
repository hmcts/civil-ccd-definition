import { expect } from '@playwright/test';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import yesNo from '../../../enums/yesNo.ts';
import claimTypes from '../../../enums/claim-types.ts';
import claimTrack from '../../../enums/track.ts';
import Timeline from '../../../enums/timeline.ts';
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
    // Whether the claimant claims fixed commencement costs (FIXED_COMMENCEMENT_COSTS=Yes, default No)
    fixedCommencementCosts: yes(scenarioEnv.FIXED_COMMENCEMENT_COSTS),

    // Checks the settings make sense together, before the journey starts
    validate() {
      expect(interestRate, `Invalid INTEREST_RATE value: ${interestRate}. It must be a number.`).toMatch(/^\d+(\.\d+)?$/);
    },
  };
  return config;
}
