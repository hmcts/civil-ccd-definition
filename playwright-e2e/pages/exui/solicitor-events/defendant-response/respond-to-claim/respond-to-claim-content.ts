export const heading = 'Respond to claim';

export const radioButtons = (defendantNumber: number) => ({
  defends: {
    label: 'Defends all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-FULL_DEFENCE`,
  },
  admitsAll: {
    label: 'Admits all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-FULL_ADMISSION`,
  },
  admitsPart: {
    label: 'Admits part of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-PART_ADMISSION`,
  },
  defendsAndWantsCounterclaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-COUNTER_CLAIM`,
  },
});

export const radioButtons2v1SpecAnd1v2Unspec = (defendantNumber: number) => ({
  reject: {
    label: 'Reject all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseType-FULL_DEFENCE`,
  },
  admitsAll: {
    label: 'Admit all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseType-FULL_ADMISSION`,
  },
  admitsPart: {
    label: 'Admit part of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseType-PART_ADMISSION`,
  },
  rejectAndWantsCounterclaim: {
    label: 'Reject all of the claim and wants to counterclaim',
    selector: `#respondent${defendantNumber}ClaimResponseType-COUNTER_CLAIM`,
  },
});

export const radioButtons2v1app2 = {
  reject: {
    label: 'Reject all of the claim',
    selector: '#respondent1ClaimResponseTypeToApplicant2-FULL_DEFENCE',
  },
  admitsAll: {
    label: 'Admit all of the claim',
    selector: '#respondent1ClaimResponseTypeToApplicant2-FULL_ADMISSION',
  },
  admitsPart: {
    label: 'Admit part of the claim',
    selector: '#respondent1ClaimResponseTypeToApplicant2-PART_ADMISSION',
  },
  rejectAndWantsCounterclaim: {
    label: 'Reject all of the claim and wants to counterclaim',
    selector: '#respondent1ClaimResponseTypeToApplicant2-COUNTER_CLAIM',
  },
};

export const radioButtons2v1 = (claimantNumber: number) => ({
  defends: {
    label: 'Defends all of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-FULL_DEFENCE`,
  },
  admitsAll: {
    label: 'Admits all of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-FULL_ADMISSION`,
  },
  admitsPart: {
    label: 'Admits part of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-PART_ADMISSION`,
  },
  defendsAndWantsCounterclaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-COUNTER_CLAIM`,
  },
});
