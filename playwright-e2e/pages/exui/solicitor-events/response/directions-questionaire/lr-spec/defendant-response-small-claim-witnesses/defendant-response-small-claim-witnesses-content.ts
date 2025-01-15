import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  witnesses: 'Witnesses',
  partyWitnesses: (defendantParty: Party) => `Defendant ${defendantParty.number} witnesses`,
};

export const radioButtons = {
  witnessesRequired: {
    label: 'Are there any witnesses who should attend the hearing?',
    yes: {
      label: 'Yes',
      selector: (defendantParty: Party) =>
        `#${defendantParty.oldKey}DQWitnessesSmallClaim_witnessesToAppear_Yes`,
    },
    no: {
      label: 'No',
      selector: (defendantParty: Party) =>
        `#${defendantParty.oldKey}DQWitnessesSmallClaim_witnessesToAppear_No`,
    },
  },
};

export const buttons = {
  addNewWitness: {
    title: 'Add new',
    selector: (defendantParty: Party) =>
      `div[id='${defendantParty.oldKey}DQWitnesses_details'] button[class='button write-collection-add-item__top']`,
  },
};

export const inputs = {
  witnessDetails: {
    label: 'Witness details',
    firstName: {
      label: 'First name',
      selector: (defendantParty: Party, defendantWitnessParty: Party) =>
        `#${defendantParty.oldKey}DQWitnesses_details_${defendantWitnessParty.number - 1}_firstName`,
    },
    lastName: {
      label: 'Last name',
      selector: (defendantParty: Party, defendantWitnessParty: Party) =>
        `#${defendantParty.oldKey}DQWitnesses_details_${defendantWitnessParty.number - 1}_lastName`,
    },
    number: {
      label: 'Phone number (Optional)',
      selector: (defendantParty: Party, defendantWitnessParty: Party) =>
        `#${defendantParty.oldKey}DQWitnessses_details_${defendantWitnessParty.number - 1}_phoneNumber`,
    },
    email: {
      label: 'Email address (Optional)',
      selector: (defendantParty: Party, defendantWitnessParty: Party) =>
        `#${defendantParty.oldKey}DQWitnesses_details_${defendantWitnessParty.number - 1}_emailAddress`,
    },
    whatEvent: {
      label: 'What event did they witness?',
      selector: (defendantParty: Party, defendantWitnessParty: Party) =>
        `#${defendantParty.oldKey}DQWitnesses_details_${defendantWitnessParty.number - 1}_reasonForWitness`,
    },
  },
};
