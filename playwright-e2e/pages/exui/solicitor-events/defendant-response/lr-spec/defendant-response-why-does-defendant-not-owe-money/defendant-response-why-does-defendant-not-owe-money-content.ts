export const heading = 'Respond to the claim';

export const radioButtons = (defendantName: string) => ({
  label: `Why does [#specDefenceRouteAmountClaimedLabel${defendantName}] not owe money to the claimant?`,
  hasPaid: {
    label: 'Has paid the amount claimed',
    selector: '#defenceRouteRequired-HAS_PAID_THE_AMOUNT_CLAIMED',
  },
  disputesClaim: {
    label: 'Disputes the claim',
    selector: '#defenceRouteRequired-DISPUTES_THE_CLAIM',
  },
});

//export const descriptionText1 = (claimAmount: number) =>
//    'The total amount claimed is £[howMuchWasPaidLabel${claimAmount}]. This includes the claim fee and any interest.';

export const form = {
  label: 'How much was paid?',
  input: '#respondToClaim_howMuchWasPaid',
};

export const descriptionText2 = 'When was this amount paid';

export const descriptionText3 = 'For example, 12 11 2007';

export const dayMonthYear = {
  day: {
    label: 'Day',
    input: '#whenWasThisAmountPaid-day',
  },
  month: {
    label: 'Month',
    input: '#whenWasThisAmountPaid-month',
  },
  year: {
    label: 'Year',
    input: '#whenWasThisAmountPaid-year',
  },
};

export const howWasThisPaidRadioButtons = {
  label: 'How was this amount paid?',
  creditCard: {
    label: 'Credit card',
    selector: '#respondToClaim_howWasThisAmountPaid-CREDIT_CARD',
  },
  cheque: {
    label: 'Cheque',
    selector: '#respondToClaim_howWasThisAmountPaid-CHEQUE',
  },
  bacs: {
    label: 'BACS',
    selector: '#respondToClaim_howWasThisAmountPaid-BACS',
  },
  other: {
    label: 'Other',
    selector: '#respondToClaim_howWasThisAmountPaid-OTHER',
  },
};

export const otherForm = {
  label: 'Tell us how',
  input: '#respondToClaim_howWasThisAmountPaidOther',
};
