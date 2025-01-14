import Party from '../../../../../../../enums/party';

export const subHeadings = {
 witnesses : 'Witnesses';
 defendant : 'Defendant 1 witnesses';
}

export const getWitnessesRadioButtonsSmallTrack = (party : Party) => ({
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQWitnessesSmallClaim_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQWitnessesSmallClaim_witnessesToAppear_No`,
  },
});

export const getWitnessesRadioButtonsFastTrack = (party: Party) => ({
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQWitnessesRequiredSpec_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQWitnessesRequiredSpec_No`,
  },
});

export const getWitnessesRadioButtonsSmallTrack1v2 = (party: Party) => ({
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQWitnessesSmallClaim_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQWitnessesSmallClaim_witnessesToAppear_No`,
  },
});

export const getWitnessesRadioButtonsUnspecAndFastTrack1v2 = (party: Party) => ({
  text: {
    label: 'Are there any witnesses who should attend the hearing?',
  },
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQWitnesses_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQWitnesses_witnessesToAppear_No`,
  },
});

export const addWitnessButton = (party: Party) => ({
  addNewExpert: {
    title: 'Add new',
    selector: `div[id='${party}DQWitnesses_details'] button[class='button write-collection-add-item__top']`,
  },
});
export const witnessDetails = (party: Party, witnessNumber: number) => ({
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name',
      selector: `#${party}DQWitnesses_details_${witnessNumber}_firstName`,
    },
    lastName: {
      label: 'Last name',
      selector: `#${party}DQWitnesses_details_${witnessNumber}_lastName`,
    },
    number: {
      label: 'Phone number (Optional)',
      selector: `#${party}DQWitnessses_details_${witnessNumber}_phoneNumber`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: `#${party}DQWitnesses_details_${witnessNumber}_emailAddress`,
    },
    whatEvent: {
      label: 'What event did they witness?',
      selector: `#${party}DQWitnesses_details_${witnessNumber}_reasonForWitness`,
    },
  },
});
