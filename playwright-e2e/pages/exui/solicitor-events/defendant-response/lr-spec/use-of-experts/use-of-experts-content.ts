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

export const useExpertRadioButtonsFastTrack = (defendantNumber: number) => ({
  text: {
    label: 'Do you want to use an expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQExperts_expertRequired_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQExperts_expertRequired_No`,
  },
});

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

export const useExpertsRadioButtonsFastTrack1v2 = {
  text: {
    label: 'Do you want to use an expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent2DQExperts_expertRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent2DQExperts_expertRequired_No',
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

export const alreadySentExpertReportsRadioFastTrack1v2 = (defendantNumber: number) => ({
  text: {
    label: 'Have you already sent expert reports to the other side?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-YES`,
  },
  radioNo: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-NO`,
  },
  radioNotYet: {
    label: 'Not yet obtained',
    selector: `#respondent${defendantNumber}DQExperts_expertReportsSent-NOT_OBTAINED`,
  },
});

export const suitableForJointExpertRadioFastTrack1v2 = (defendantNumber: number) => ({
  text: {
    label: 'Do you think the case suitable for a joint expert?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQExperts_jointExpertSuitable_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQExperts_jointExpertSuitable_No`,
  },
});

export const addExpertButton = {
  text: 'Add new',
  selector: '#button.write-collection-add-item__top',
};

export const expertDetails2v1 = (defendantNumber: number) => ({
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name',
      selector: `#respondent${defendantNumber}DQExperts_details_0_firstName`,
    },
    lastName: {
      label: 'Last name',
      selector: `#respondent${defendantNumber}DQExperts_details_0_lastName`,
    },
    email: {
      label: 'Email address',
      selector: `#respondent${defendantNumber}DQExperts_details_0_emailAddress`,
    },
    number: {
      label: 'Phone number',
      selector: `#respondent${defendantNumber}DQExperts_details_0_phoneNumber`,
    },
    fieldOfExpertise: {
      label: 'Field of expertise',
      selector: `#respondent${defendantNumber}DQExperts_details_0_fieldOfExpertise`,
    },
  },
});
