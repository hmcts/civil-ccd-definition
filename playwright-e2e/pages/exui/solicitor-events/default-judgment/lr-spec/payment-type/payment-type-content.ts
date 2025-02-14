export const subheadings = {
  paymentType: 'How do you want <name> to pay?',
};

export const radioButtons = {
  paymentType: {
    label: 'Payment type',
    immediately: {
      label: 'Immediately',
      selector: '#paymentTypeSelection-IMMEDIATELY',
    },
    setDate: {
      label: 'By a set date',
      selector: '#paymentTypeSelection-SET_DATE',
    },
    repaymentPlan: {
      label: 'By repayment plan',
      selector: '#paymentTypeSelection-REPAYMENT_PLAN',
    },
  },
};
