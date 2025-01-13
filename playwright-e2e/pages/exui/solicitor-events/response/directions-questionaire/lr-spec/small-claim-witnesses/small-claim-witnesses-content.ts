import Party from '../../../../../../../enums/party';

export const getRadioButtons = {
  radioYes: {
    label: 'Yes',
    selector: (party: Party) => `#${party}DQWitnessesSmallClaim_witnessesToAppear_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: (party: Party) => `#${party}respondent1DQWitnessesSmallClaim_witnessesToAppear_No`,
  },
};

export const getButtons = {
  addNewExpert: {
    title: 'Add new',
    selector: (party: Party) =>
      `div[id='${party}DQWitnesses_details'] button[class='button write-collection-add-item__top']`,
  },
};

export const getInputs = {
  label: 'Expert details',
  fields: {
    firstName: {
      label: 'First name',
      selector: (party: Party, witnessNumber: number) =>
        `#${party}DQWitnesses_details_${witnessNumber}_firstName`,
    },
    lastName: {
      label: 'Last name',
      selector: (party: Party, witnessNumber: number) =>
        `#${party}DQWitnesses_details_${witnessNumber}_lastName`,
    },
    number: {
      label: 'Phone number (Optional)',
      selector: (party: Party, witnessNumber: number) =>
        `#${party}DQWitnessses_details_${witnessNumber}_phoneNumber`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: (party: Party, witnessNumber: number) =>
        `#${party}DQWitnesses_details_${witnessNumber}_emailAddress`,
    },
    whatEvent: {
      label: 'What event did they witness?',
      selector: (party: Party, witnessNumber: number) =>
        `#${party}DQWitnesses_details_${witnessNumber}_reasonForWitness`,
    },
  },
};
