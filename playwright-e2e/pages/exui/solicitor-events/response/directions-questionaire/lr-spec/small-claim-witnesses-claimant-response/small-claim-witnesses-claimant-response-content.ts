import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  witnesses: `Witnesses`,
  partyWitnesses: `Claimant 1 witnesses`,
};

export const radioButtons = {
  witnessesRequired: {
    label: `Are there any witnesses who should attend the hearing?`,
    yes: {
      label: `Yes`,
      selector: `#applicant1DQWitnessesSmallClaimSmallClaim_witnessesToAppear_Yes`,
    },
    no: {
      label: `No`,
      selector: `#applicant1DQWitnessesSmallClaimSmallClaim_witnessesToAppear_No`,
    },
  },
};

export const buttons = {
  addNewWitness: {
    title: `Add new`,
    selector:
      'div[id=`applicant1DQWitnessesSmallClaim_details`] button[class=`button write-collection-add-item__top`]',
  },
};

export const inputs = {
  witnessDetails: {
    label: `Witness details`,
    firstName: {
      label: `First name`,
      selector: (claimantWitnessParty: Party) =>
        `#applicant1DQWitnessesSmallClaim_details_${claimantWitnessParty.number - 1}_firstName`,
    },
    lastName: {
      label: `Last name`,
      selector: (claimantWitnessParty: Party) =>
        `#applicant1DQWitnessesSmallClaim_details_${claimantWitnessParty.number - 1}_lastName`,
    },
    number: {
      label: `Phone number (Optional)`,
      selector: (claimantWitnessParty: Party) =>
        `#applicant1DQWitnessses_details_${claimantWitnessParty.number - 1}_phoneNumber`,
    },
    email: {
      label: `Email address (Optional)`,
      selector: (claimantWitnessParty: Party) =>
        `#applicant1DQWitnessesSmallClaim_details_${claimantWitnessParty.number - 1}_emailAddress`,
    },
    whatEvent: {
      label: `What event did they witness?`,
      selector: (claimantWitnessParty: Party) =>
        `#applicant1DQWitnessesSmallClaim_details_${claimantWitnessParty.number - 1}_reasonForWitness`,
    },
  },
  witnessNumber: {
    label: `How many witnesses, including the claimant, will give evidence at the hearing?`,
    selector: `#applicant1ClaimWitnesses`,
  },
};
