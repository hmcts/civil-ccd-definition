import Party from '../../../../../../../enums/party';

export const getRadioButtons = (party: Party) => ({
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQWitnessesSmallClaim_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}respondent1DQWitnessesSmallClaim_witnessesToAppear_No`,
  },
});

export const getButtons = (party: Party) => ({
  addNewExpert: {
    title: 'Add new',
    selector: `div[id='${party}DQWitnesses_details'] button[class='button write-collection-add-item__top']`,
  },
});

export const getInputs = (party: Party, witnessNumber: number) => ({
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
