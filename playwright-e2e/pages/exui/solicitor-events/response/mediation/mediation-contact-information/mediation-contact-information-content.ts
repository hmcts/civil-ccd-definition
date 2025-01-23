import { Party } from '../../../../../../models/partys';

export const subHeading = 'Mediation contact information';

export const content = {
  paragraph1: {
    label:
      'Please provide the contact details of the individual who will conduct the mediation appointment.',
  },
  paragraph2: {
    label: 'This should be a party to the claim or their legal representative.',
  },
};

export const inputs = {
  firstName: {
    label: 'First name',
    selector: (claimantParty: Party) => `#${claimantParty.oldKey}MediationContactInfo_firstName`,
  },
  lastName: {
    label: 'Last name',
    selector: (claimantParty: Party) => `#${claimantParty.oldKey}MediationContactInfo_lastName`,
  },
  emailAddress: {
    label: 'Email address',
    selector: (claimantParty: Party) => `#${claimantParty.oldKey}MediationContactInfo_emailAddress`,
  },
  telephoneNumber: {
    label: 'Telephone number',
    selector: (claimantParty: Party) =>
      `#${claimantParty.oldKey}MediationContactInfo_telephoneNumber`,
  },
};

export const buttons = {
  previous: {
    label: 'Previous',
    selector: '.button.button-secondary',
  },
  submit: {
    label: 'Continue',
    selector: '.button.button[type="submit"]',
  },
};
