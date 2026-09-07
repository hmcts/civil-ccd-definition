export const headings = {
  processRefund: 'Process refund',
};

export const subheadings = {
  selectFeesToBeRefunded: 'Select fees to be refunded',
};

export const inputs = {
  organisationFee: {
    label: 'Organisation fee',
    selector: '[name="organisation"]',
  },
  refundReason: {
    label: 'Why are you making this refund?',
    amendedClaim: {
      selector: 'input[id="Amended claim"]',
    },
    courtDiscretion: {
      selector: 'input[id="Court discretion"]',
    },
    duplicateFeeCustomerError: {
      selector: 'input[id="Duplicate fee (customer error)"]',
    },
    feeNotDue: {
      selector: 'input[id="Fee not due"]',
    },
    applicationRejected: {
      selector: 'input[id="Application rejected"]',
    },
    duplicateFeeCourtError: {
      selector: 'input[id="Duplicate fee (court error)"]',
    },
    applicationCaseWithdrawn: {
      selector: 'input[id="Application/case withdrawn"]',
    },
    systemTechnicalErrorReason: {
      selector: 'input[id="System/technical error"]',
    },
  },
};

export const radioButtons = {
  contactInformation: {
    label: 'Contact information',
    email: { label: 'Email', selector: '#email' },
  },
};

export const dropdowns = {
  refundDDReason: {
    options: [
      'Amended court',
      'Court error',
      'Excess fee paid',
      'Following appeal',
      'Incorrect PBA reference supplied',
      "Judge's order",
      'Return of hearing fee',
      'Trial fees (on settlements)',
      'Unused warrant',
      'Unpaid cheque',
      'Other - RCJ',
      'Other - County',
      'Other - Divorce',
      'Other - Probate',
      'Other - Private Law',
      'Other - Public Law',
      'Other - Family',
      'Other - CoP',
      'Other - Tribunals',
      'Claim issued in error (court error)',
      'Claim issued in error (customer error)',
      'Incorrect fee taken/wrong fee selected',
      'Missing/incorrect documents',
      'Legal correction - legislation revised',
      'Legal correction - legislation reinterpretation',
      'Overpayment',
    ],
  },
};
