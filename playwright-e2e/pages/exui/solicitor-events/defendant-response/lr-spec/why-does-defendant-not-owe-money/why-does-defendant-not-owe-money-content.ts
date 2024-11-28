export const heading = 'Respond to the claim';

export const radioButtons = (defendantName: string) => ({
  text: {
    label: `Why does [#specDefenceRouteAmountClaimedLabel${defendantName}] not owe money to the claimant?`,
  },
  radioHasPaid: {
    label: 'Has paid the amount claimed',
    selector: '#defenceRouteRequired-HAS_PAID_THE_AMOUNT_CLAIMED',
  },
  radioDisputesClaim: {
    label: 'Disputes the claim',
    selector: '#defenceRouteRequired-DISPUTES_THE_CLAIM',
  },
});

export const descriptionText1 = (claimAmount: number) =>
  'The total amount claimed is £[howMuchWasPaidLabel${claimAmount}]. This includes the claim fee and any interest.';

export const form = {
  label: 'How much was paid?',
  selector: '#respondToClaim_howMuchWasPaid',
};

export const descriptionText2 = 'When was this amount paid';

export const descriptionText3 = 'For example, 12 11 2007';

export const dayMonthYear = {
  day: {
    label: 'Day',
    selector: '#whenWasThisAmountPaid-day',
  },
  month: {
    label: 'Month',
    selector: '#whenWasThisAmountPaid-month',
  },
  year: {
    label: 'Year',
    selector: '#whenWasThisAmountPaid-year',
  },
};

export const howWasThisPaidRadioButtons = {
  label: 'How was this amount paid?',
  radioCreditCard: {
    label: 'Credit card',
    selector: '#respondToClaim_howWasThisAmountPaid-CREDIT_CARD',
  },
  radioCheque: {
    label: 'Cheque',
    selector: '#respondToClaim_howWasThisAmountPaid-CHEQUE',
  },
  radioBacs: {
    label: 'BACS',
    selector: '#respondToClaim_howWasThisAmountPaid-BACS',
  },
  radioOther: {
    label: 'Other',
    selector: '#respondToClaim_howWasThisAmountPaid-OTHER',
  },
};

export const otherForm = {
  label: 'Tell us how',
  selector: '#respondToClaim_howWasThisAmountPaidOther',
};
