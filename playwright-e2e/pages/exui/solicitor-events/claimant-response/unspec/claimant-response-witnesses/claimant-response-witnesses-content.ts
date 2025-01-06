export const witnessesSubHeadings = {
  witnesses: 'Witnesses',
  containerSelector:
    "div[id='applicant1DQWitnesses_applicant1DQWitnesses'] h2[class='heading-h2 ng-star-inserted']",
  witnessesDetails: 'Witnesses',
};

export const witnessesRadioForm = {
  text: 'Are there any witnesses who should attend the hearing?',
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQWitnesses_witnessesToAppear_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQWitnesses_witnessesToAppear_No',
  },
};

export const witnessDetailsForm = {
  firstName: {
    label: 'First name',
    selector: '#applicant1DQWitnesses_details_0_firstName',
  },
  lastName: {
    label: 'Last name',
    selector: '#applicant1DQWitnesses_details_0_lastName',
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: '#applicant1DQWitnesses_details_0_phoneNumber',
  },
  emailAddress: {
    label: 'Email address (Optional)',
    selector: '#applicant1DQWitnesses_details_0_emailAddress',
  },
  reasonForWitness: {
    label: 'What event did they witness?',
    selector: '#applicant1DQWitnesses_details_0_reasonForWitness',
  },
};

export const witnessesActionButtons = {
  addNewWitnessTop: {
    label: 'Add new',
    selector: "div[id='applicant1DQWitnesses_details'] button[type='button']",
  },

  removeWitness: {
    label: 'Remove witness details',
    selector: '.button.button-secondary[aria-label="Remove Witness details"]',
  },
};

export const witnessesNumber = {
  input: {
    label: 'How many witnesses, including the claimant, will give evidence at the hearing?',
    selector: '#applicant1ClaimWitnesses',
  },
};
