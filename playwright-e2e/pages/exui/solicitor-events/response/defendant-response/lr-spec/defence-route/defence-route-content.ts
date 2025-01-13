export const getRadioButtons = (defendantNumber?: number) => ({
  defenceRoute: {
    hasPaid: {
      label: 'Has paid the amount claimed',
      selector: `#defenceRouteRequired${defendantNumber ?? ''}-HAS_PAID_THE_AMOUNT_CLAIMED`,
    },
    disputesClaim: {
      label: 'Disputes the claim',
      selector: `#defenceRouteRequired${defendantNumber ?? ''}-DISPUTES_THE_CLAIM`,
    },
  },
  amountPaid: {
    label: 'How was this amount paid?',
    creditCard: {
      label: 'Credit card',
      selector: `#respondToClaim${defendantNumber ?? ''}_howWasThisAmountPaid-CREDIT_CARD`,
    },
    cheque: {
      label: 'Cheque',
      selector: `#respondToClaim${defendantNumber ?? ''}_howWasThisAmountPaid-CHEQUE`,
    },
    bacs: {
      label: 'BACS',
      selector: `#respondToClaim${defendantNumber ?? ''}_howWasThisAmountPaid-BACS`,
    },
    other: {
      label: 'Other',
      selector: `#respondToClaim${defendantNumber ?? ''}_howWasThisAmountPaid-OTHER`,
    },
  },
});

export const getInputs = (defendantNumber?: number) => ({
  amountPaid: {
    label: 'How much was paid?',
    selector: `#respondToClaim${defendantNumber ?? ''}_howMuchWasPaid`,
  },
  amountPaidDate: {
    label: 'When was this amount paid?',
    day: {
      label: 'Day',
      selector: `#whenWasThisAmountPaid-day`,
    },
    month: {
      label: 'Month',
      selector: '#whenWasThisAmountPaid-month',
    },
    year: {
      label: 'Year',
      selector: 'whenWasThisAmountPaid-year',
    },
  },
  amountPaidOther: {
    label: 'Tell us how',
    selector: `#respondToClaim${defendantNumber ?? ''}_howWasThisAmountPaidOther`,
  },
});
