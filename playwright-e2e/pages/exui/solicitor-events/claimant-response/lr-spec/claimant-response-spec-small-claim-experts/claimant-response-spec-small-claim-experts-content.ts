export const smallClaimExpertsRadioForm = {
  radioYes: {
    label: 'Yes',
    selector: '#applicant1ClaimExpertSpecRequired_Yes',
    selector2v1: '#applicantMPClaimExpertSpecRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1ClaimExpertSpecRequired_No',
    selector2v1: '#applicantMPClaimExpertSpecRequired_No',
  },
};

export const smallClaimExpertLegends = {
  useAnExpert: {
    text: 'Do you want to use an expert?',
    containerSelector:
      "div[id='applicant1ClaimExpertSpecRequired'] " + "span[class='form-label ng-star-inserted']",
  },
};

export const expertDetailsForm = {
  lastName: {
    label: 'Last name',
    selector: '#applicant1RespondToClaimExperts_lastName',
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: '#applicant1RespondToClaimExperts_phoneNumber',
  },
  emailAddress: {
    label: 'Email address (Optional)',
    selector: '#applicant1RespondToClaimExperts_emailAddress',
  },
  firstName: {
    label: 'First name',
    selector: '#applicant1RespondToClaimExperts_firstName',
  },
  fieldOfExpertise: {
    label: 'Field of expertise',
    selector: '#applicant1RespondToClaimExperts_fieldofExpertise',
  },
  whyRequired: {
    label: 'Why do you need this expert?',
    selector: '#applicant1RespondToClaimExperts_whyRequired',
  },
  estimatedCost: {
    label: 'Estimated cost',
    selector: '#applicant1RespondToClaimExperts_estimatedCost',
  },
};
