export const heading = 'Respond to claim';

export const radioButtons = {
  text: (defendantName: string) => ({
    label: 'Defendant: ${defendantName}',
  }),
  defends: {
    label: 'Defends all of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-FULL_DEFENCE',
  },
  admitsAll: {
    label: 'Admits all of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-FULL_ADMISSION',
  },
  admitsPart: {
    label: 'Admits part of the claim',
    selector: '#respondent1ClaimResponseTypeForSpec-PART_ADMISSION',
  },
  defendsAndWantsCounterclaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: '#respondent1ClaimResponseTypeForSpec-COUNTER_CLAIM',
  },
};
