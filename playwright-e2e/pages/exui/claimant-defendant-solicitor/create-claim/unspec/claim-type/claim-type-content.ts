export const labels = {
  claimType: 'What type of claim is this?',
};

export const radioButtons = {
  claimType: {
    personalInjury: {
      label: 'Personal injury',
      selector: '#claimTypeUnSpec-PERSONAL_INJURY',
    },
    clinicalNegligence: {
      label: 'Clinical negligence',
      selector: '#claimTypeUnSpec-CLINICAL_NEGLIGENCE',
    },
    professionalNegligence: {
      label: 'Professional negligence',
      selector: '#claimTypeUnSpec-PROFESSIONAL_NEGLIGENCE',
    },
    breachOfContract: {
      label: 'Breach of contract',
      selector: '#claimTypeUnSpec-BREACH_OF_CONTRACT',
    },
    consumer: { label: 'Consumer', selector: '#claimTypeUnSpec-CONSUMER' },
    consumerCredit: { label: 'Consumer credit', selector: '#claimTypeUnSpec-CONSUMER_CREDIT' },
    damagesAndOtherRemedy: {
      label: 'Damages and an ‘other’ remedy e.g. Payment Protection Insurance (PPI), Motor finance',
      selector: '#claimTypeUnSpec-DAMAGES_AND_OTHER_REMEDY',
    },
    other: { label: 'Other', selector: '#claimTypeUnSpec-OTHER' },
  },
};

export const inputs = {
  other: {
    label: 'Enter Claim type',
    selector: '#claimTypeOther',
  },
};
