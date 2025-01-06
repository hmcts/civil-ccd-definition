export const subHeadings = {
  pageSubHeading: {
    label: 'Witnesses',
  },
  claimantSubHeading: {
    label: 'Claimant 1 witnesses',
  },
};

export const claimantWitnessesLegends = {
  anyWitnesses: 'Are there any witnesses who should attend the hearing?',
};

export const witnessesRadioForm = {
  text: 'Do you want to use a witness?',
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQWitnessesSmallClaim_witnessesToAppear_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQWitnessesSmallClaim_witnessesToAppear_No',
  },
};

export const witnessDetailsForm = {
  firstName: {
    label: 'First name',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_firstName',
  },
  lastName: {
    label: 'Last name',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_lastName',
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_phoneNumber',
  },
  emailAddress: {
    label: 'Email address (Optional)',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_emailAddress',
  },
  reasonForWitness1v2SS: {
    label: 'What event did they witness?',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_reasonForWitness',
  },
  reasonForWitness: {
    label: 'Reason for witness (Optional)',
    selector: '#applicant1DQWitnessesSmallClaim_details_0_reasonForWitness',
  },
};

export const dateAdded = {
  day: {
    label: 'Day',
    selector: '#dateAdded-day',
  },
  month: {
    label: 'Month',
    selector: '#dateAdded-month',
  },
  year: {
    label: 'Year',
    selector: '#dateAdded-year',
  },
};

export const witnessesActionButtons = {
  addNewWitnessTop: {
    label: 'Add a new witness (Top)',
    selector: '.write-collection-add-item__top',
  },
  addNewWitnessBottom: {
    label: 'Add a new witness (Bottom)',
    selector: '.write-collection-add-item__bottom',
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
