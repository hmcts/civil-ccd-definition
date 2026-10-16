export const headings = {
  reviewRefundDetails: 'Review refund details',
};

export const inputs = {
  returnNote: { label: 'Add a reason', selector: '#sendmeback' },
};

export const radioButtons = {
  refundAction: {
    legend: 'What do you want to do with this refund?',
    approve: {
      label: 'Approve',
      hint: 'Send to middle office',
      selector: '#refundAction-0',
    },
    reject: {
      label: 'Reject',
      hint: 'There is no refund due',
      selector: '#refundAction-1',
    },
    returnToCaseworker: {
      label: 'Return to caseworker',
      hint: 'Some information needs correcting',
      selector: '#refundAction-2',
    },
  },
  refundRejectReason: {
    noAssociatedPayment: {
      label: 'No associated payment',
      selector: '#refundRejectReason-0',
    },
    alreadyRefunded: {
      label: 'Already refunded',
      selector: '#refundRejectReason-1',
    },
    caseDetailsDontMatchHelpWithFeesDetails: {
      label: `The case details don't match the help with fees details`,
      selector: '#refundRejectReason-2',
    },
    moreEvidenceRequired: {
      label: 'More evidence is required',
      selector: '#refundRejectReason-3',
    },
    other: {
      label: 'Other',
      selector: '#refundRejectReason-4',
    },
  },
};
