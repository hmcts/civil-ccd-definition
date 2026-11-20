// The claimant's interest settings for a specified claim (INTEREST_TYPE, INTEREST_FROM, INTEREST_UNTIL)

// How the claimant works out the interest they claim: one rate over the whole period, or a total they have broken down
// themselves
export enum InterestType {
  SAME_RATE = 'SAME_RATE_INTEREST',
  BREAK_DOWN = 'BREAK_DOWN_INTEREST',
}

// The date the claimant claims interest from: the date the claim is submitted, or a specific earlier date
export enum InterestFrom {
  SUBMIT_DATE = 'FROM_CLAIM_SUBMIT_DATE',
  SPECIFIC_DATE = 'FROM_A_SPECIFIC_DATE',
}

// With a specific date, when the interest is claimed until: until the claim is settled or judgment is made, or until
// the claim is submitted
export enum InterestUntil {
  SETTLED_OR_JUDGMENT = 'UNTIL_SETTLED_OR_JUDGEMENT_MADE',
  SUBMIT_DATE = 'UNTIL_CLAIM_SUBMIT_DATE',
}
