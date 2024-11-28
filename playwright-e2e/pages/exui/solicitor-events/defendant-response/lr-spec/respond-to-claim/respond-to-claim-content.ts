export const heading = 'Respond to the claim';

export const radioButtons = {
  text: {
    label: 'Is this address correct?',
  },
  defends: {
    label: 'Defends all of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-FULL_DEFENCE',
  },
  admitsAll: {
    label: 'Admits all of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-FULL_ADMISSION',
  },
  admitsPart: {
    label: 'Admits only part of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-PART_ADMISSION',
  },
  defendsAndWantsCounterclaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: '#respondent1ClaimResponseTypeForSpec-COUNTER_CLAIM',
  },
};
