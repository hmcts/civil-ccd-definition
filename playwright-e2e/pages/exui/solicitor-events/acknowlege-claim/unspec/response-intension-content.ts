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

export const intensionRadioButtons2v1 = {
  defendsAll: {
    label: 'Defend all of the claim',
    selector: `#respondent1ClaimResponseIntentionTypeApplicant2-FULL_DEFENCE`,
  },
  defendsPart: {
    label: 'Defend part of the claim',
    selector: `#respondent1ClaimResponseIntentionTypeApplicant2-PART_DEFENCE`,
  },
  contests: {
    label: 'Contest jurisdiction',
    selector: `#respondent1ClaimResponseIntentionTypeApplicant2-CONTEST_JURISDICTION`,
  },
};
