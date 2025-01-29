import { Party } from '../../../../models/partys';

export const content = 'Enter organisation details manually. The claim will then continue offline.';

export const inputs = {
  organisationName: {
    label: 'Organisation name',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_organisationName`,
  },
  phoneNumber: {
    label: 'Phone number (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_phoneNumber`,
  },
  email: {
    label: 'Email (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_email`,
  },
  DX: {
    label: 'DX (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_dx`,
  },
  fax: {
    label: 'Fax (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_fax`,
  },
};
