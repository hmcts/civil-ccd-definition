export const heading = 'Use of experts in court';

export const useExpertRadioButtons = {
  label: 'Do you want to use an expert?',
  yes: {
    label: 'Yes',
    selector: '#responseClaimExpertSpecRequired_Yes',
  },
  no: {
    label: 'No',
    selector: '#responseClaimExpertSpecRequired_No',
  },
};

export const expertDetails = {
  label: 'Expert details',
  fields: [
    {
      label: 'First name (Optional)',
      selector: '#respondToClaimExperts_firstName',
    },
    {
      label: 'Last name (Optional)',
      selector: '#respondToClaimExperts_lastName',
    },
    {
      label: 'Phone number (Optional)',
      selector: '#respondToClaimExperts_phoneNumber',
    },
    {
      label: 'Email address (Optional)',
      selector: '#respondToClaimExperts_emailAddress',
    },
    {
      label: 'Field of expertise (Optional)',
      selector: '#respondToClaimExperts_fieldofExpertise',
    },
    {
      label: 'Why do you need an expert?',
      selector: '#respondToClaimExperts_whyRequired',
    },
    {
      label: 'Estimated cost',
      selector: '#respondToClaimExperts_estimatedCost',
    },
  ],
};
