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

export const witnessesRadioButtonsFastTrack1v2 = (defendantNumber: number) => ({
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
