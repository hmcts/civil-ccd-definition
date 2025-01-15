import { Party } from '../../../../../../../models/partys';

export const subheadings = { experts: 'Use of experts in court' };

export const radioButtons = {
  expertsRequired: {
    label: 'Do you want to use an expert?',
    yes: {
      selector: (party: Party) =>
        `#responseClaimExpertSpecRequired${party.number === 1 ? '' : '2'}_Yes`,
    },
    no: {
      selector: (party: Party) =>
        `#responseClaimExpertSpecRequired${party.number === 1 ? '' : '2'}_No`,
    },
  },
};

export const inputs = {
  expert: {
    firstName: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_firstName`,
    },
    lastName: {
      selector: (party: Party) => `#respondToClaimExperts${party.number === 1 ? '' : '2'}_lastName`,
    },
    phoneNumber: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_phoneNumber`,
    },
    email: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_emailAddress`,
    },
    expertise: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_fieldofExpertise`,
    },
    whyRequired: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_whyRequired`,
    },
    estimatedCost: {
      selector: (party: Party) =>
        `#respondToClaimExperts${party.number === 1 ? '' : '2'}_estimatedCost`,
    },
  },
};
