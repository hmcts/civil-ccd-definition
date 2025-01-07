export const heading = 'Witnesses';

export const subheading = 'Defendant 1 witnesses';

export const witnessesRadioButtonsSmallTrack = {
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQWitnessesSmallClaim_witnessesToAppear_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQWitnessesSmallClaim_witnessesToAppear_No',
  },
};

export const witnessesRadioButtonsFastTrack = {
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQWitnessesRequiredSpec_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQWitnessesRequiredSpec_No',
  },
};

export const witnessesRadioButtonsSmallTrack1v2 = {
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#respondent2DQWitnessesSmallClaim_witnessesToAppear_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent2DQWitnessesSmallClaim_witnessesToAppear_No',
  },
};

export const witnessesRadioButtonsUnspecAndFastTrack1v2 = (defendantNumber: number) => ({
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#respondent${defendantNumber}DQWitnesses_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#respondent${defendantNumber}DQWitnesses_witnessesToAppear_No`,
  },
});

export const addWitnessButton = (defendantNumber: number) => ({
  addNewExpert: {
    title: 'Add new',
    selector: `div[id='respondent${defendantNumber}DQWitnesses_details'] button[class='button write-collection-add-item__top']`,
  },
});

export const witnessDetails = (defendantNumber: number, witnessNumber: number) => ({
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name',
      selector: `#respondent${defendantNumber}DQWitnesses_details_${witnessNumber}_firstName`,
    },
    lastName: {
      label: 'Last name',
      selector: `#respondent${defendantNumber}DQWitnesses_details_${witnessNumber}_lastName`,
    },
    number: {
      label: 'Phone number (Optional)',
      selector: `#respondent${defendantNumber}DQWitnessses_details_${witnessNumber}_phoneNumber`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: `#respondent${defendantNumber}DQWitnesses_details_${witnessNumber}_emailAddress`,
    },
    whatEvent: {
      label: 'What event did they witness?',
      selector: `#respondent${defendantNumber}DQWitnesses_details_${witnessNumber}_reasonForWitness`,
    },
  },
});
