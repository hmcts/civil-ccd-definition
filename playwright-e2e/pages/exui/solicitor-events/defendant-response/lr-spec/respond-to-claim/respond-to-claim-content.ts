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

export const defendant1RadioButtons = radioButtons(1);
export const defendant2RadioButtons = radioButtons(2);
