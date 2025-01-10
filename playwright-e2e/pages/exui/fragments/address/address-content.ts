import Party from '../../../../enums/party';

export const getInputs = (party: Party) => ({
  postCodeInput: {
    label: 'Enter a UK postcode',
    selector: `#${party}_primaryaddress_primaryaddress_postcodeInput`,
  },
  addressLine1: {
    label: 'Building and Street',
    selector: `#${party}_primaryaddress__addressLine1`,
  },
  addressLine2: {
    label: 'address Line 2 (Optional)',
    selector: `#${party}_primaryaddress__addressLine2`,
  },
  addressLine3: {
    label: 'address Line 3 (Optional)',
    selector: `#${party}_primaryaddress__addressLine3`,
  },
  postTown: {
    label: 'Town or City (Optional)',
    selector: `#${party}_primaryaddress__PostTown`,
  },
  county: {
    label: 'County (Optional)',
    selector: `#${party}_primaryaddress__County`,
  },
  country: {
    label: 'Country (Optional)',
    selector: `#${party}_primaryaddress__Country`,
  },
  postCode: {
    label: 'Postcode/Zipcode',
    selector: `#${party}_primaryaddress__PostCode`,
  },
});

export const getDropdowns = (party: Party) => ({
  addressList: {
    label: 'Select an address',
    selector: `#${party}_primaryaddress_primaryaddress_addressList`,
    options: [],
  },
});

export const buttons = {
  findaddress: {
    title: 'Find address',
  },
};

export const links = {
  cannotFindAddress: {
    title: " I can't enter a UK postcode ",
  },
};
