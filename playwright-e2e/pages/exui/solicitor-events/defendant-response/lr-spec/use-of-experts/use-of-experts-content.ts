export const heading = 'Use of experts in court';

export const useExpertRadioButtons = {
  text: {
    label: 'Do you want to use an expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#responseClaimExpertSpecRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#responseClaimExpertSpecRequired_No',
  },
};

export const expertDetails = {
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name (Optional)',
      selector: '#respondToClaimExperts_firstName',
    },
    lastName: {
      label: 'Last name (Optional)',
      selector: '#respondToClaimExperts_lastName',
    },
    number: {
      label: 'Phone number (Optional)',
      selector: '#respondToClaimExperts_phoneNumber',
    },
    email: {
      label: 'Email address (Optional)',
      selector: '#respondToClaimExperts_emailAddress',
    },
    fieldOfExpertise: {
      label: 'Field of expertise (Optional)',
      selector: '#respondToClaimExperts_fieldofExpertise',
    },
    whyDoYouNeedExpert: {
      label: 'Why do you need an expert?',
      selector: '#respondToClaimExperts_whyRequired',
    },
    estimateCost: {
      label: 'Estimated cost',
      selector: '#respondToClaimExperts_estimatedCost',
    },
  },
};
