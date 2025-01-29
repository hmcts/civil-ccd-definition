import { Party } from '../../../../models/partys';

export const inputs = {
  postCodeInput: {
    label: 'Enter a UK postcode',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address_address_postcodeInput`,
  },
  addressLine1: {
    label: 'Building and Street',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailAddressLine1`,
  },
  addressLine2: {
    label: 'Address Line 2 (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailAddressLine2`,
  },
  addressLine3: {
    label: 'Address Line 3 (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailAddressLine3`,
  },
  postTown: {
    label: 'Town or City (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailPostTown`,
  },
  county: {
    label: 'County (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailCounty`,
  },
  country: {
    label: 'Country (Optional)',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailCountry`,
  },
  postCode: {
    label: 'Postcode/Zipcode',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address__detailPostCode`,
  },
};

export const dropdowns = {
  addressList: {
    label: 'Select an address',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}OrganisationDetails_address_address_addressList`,
    options: [],
  },
};

export const buttons = {
  findAddress: {
    title: 'Find address',
  },
};

export const links = {
  cannotFindAddress: {
    title: " I can't enter a UK postcode ",
  },
};
