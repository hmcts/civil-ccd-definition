export const heading = 'Use of experts in court';

export const useExpertRadioButtonsSmallTrack = {
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

export const useExpertRadioButtonsFastTrack = {
  text: {
    label: 'Do you want to use an expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQExperts_expertRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQExperts_expertRequired_No',
  },
};

export const expertDetails = {
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name',
      selector: '#respondToClaimExperts_firstName',
    },
    lastName: {
      label: 'Last name',
      selector: '#respondToClaimExperts_lastName',
    },
    number: {
      label: 'Phone number',
      selector: '#respondToClaimExperts_phoneNumber',
    },
    email: {
      label: 'Email address',
      selector: '#respondToClaimExperts_emailAddress',
    },
    fieldOfExpertise: {
      label: 'Field of expertise',
      selector: '#respondToClaimExperts_fieldofExpertise',
    },
    whyDoYouNeedExpert: {
      label: 'Why do you need this expert',
      selector: '#respondToClaimExperts_whyRequired',
    },
    estimateCost: {
      label: 'Estimated cost',
      selector: '#respondToClaimExperts_estimatedCost',
    },
  },
};
