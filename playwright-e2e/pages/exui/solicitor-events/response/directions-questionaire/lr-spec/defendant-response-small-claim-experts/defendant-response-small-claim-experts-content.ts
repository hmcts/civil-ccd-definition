import { Party } from '../../../../../../../models/partys';

export const subheadings = { experts: 'Use of experts in court' };

export const radioButtons = {
  expertsRequired: {
    label: 'Do you want to use an expert?',
    yes: {
      selector: (defendantParty: Party) =>
        `#responseClaimExpertSpecRequired${defendantParty.number === 1 ? '' : '2'}_Yes`,
    },
    no: {
      selector: (defendantParty: Party) =>
        `#responseClaimExpertSpecRequired${defendantParty.number === 1 ? '' : '2'}_No`,
    },
  },
};

export const inputs = {
  expert: {
    firstName: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_firstName`,
    },
    lastName: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_lastName`,
    },
    phoneNumber: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_phoneNumber`,
    },
    email: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_emailAddress`,
    },
    expertise: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_fieldofExpertise`,
    },
    whyRequired: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_whyRequired`,
    },
    estimatedCost: {
      selector: (defendantParty: Party) =>
        `#respondToClaimExperts${defendantParty.number === 1 ? '' : '2'}_estimatedCost`,
    },
  },
};
