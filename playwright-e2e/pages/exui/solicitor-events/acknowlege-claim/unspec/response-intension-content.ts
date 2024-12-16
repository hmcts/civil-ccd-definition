export const intensionRadioButtons = (defendantNumber: number) => ({
  defendsAll: {
    label: 'Defend all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseIntentionType-FULL_DEFENCE`,
  },
  defendsPart: {
    label: 'Defend part of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseIntentionType-PART_DEFENCE`,
  },
  contests: {
    label: 'Contest jurisdiction',
    selector: `#respondent${defendantNumber}ClaimResponseIntentionType-CONTEST_JURISDICTION`,
  },
});
