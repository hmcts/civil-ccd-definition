import { fields } from '../../../../../../../e2e/pages/login.page';

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

export const useExpertsRadioButtonsSmallTrack1v2 = {
  text: {
    label: 'Do you want to use an expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#responseClaimExpertSpecRequired2_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#responseClaimExpertSpecRequired2_No',
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

export const expertDetails1v2 = {
  fields: {
    firstName: {
      label: 'First name',
      selector: '#respondToClaimExperts2_firstName',
    },
    lastName: {
      label: 'Last name',
      selector: '#respondToClaimExperts2_lastName',
    },
    number: {
      label: 'Phone number',
      selector: '#respondToClaimExperts2_phoneNumber',
    },
    email: {
      label: 'Email address',
      selector: '#respondToClaimExperts2_emailAddress',
    },
    fieldOfExpertise: {
      label: 'Field of expertise',
      selector: '#respondToClaimExperts2_fieldofExpertise',
    },
    whyDoYouNeedExpert: {
      label: 'Why do you need this expert',
      selector: '#respondToClaimExperts2_whyRequired',
    },
    estimateCost: {
      label: 'Estimated cost',
      selector: '#respondToClaimExperts2_estimatedCost',
    },
  },
};
