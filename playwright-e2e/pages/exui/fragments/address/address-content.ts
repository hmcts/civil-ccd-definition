import Party from '../../../../enums/party';

export const heading = 'Address';

export const getInputs = (party: Party) => ({
  postCodeInput: {
    label: 'Enter a UK postcode',
    selector: `#${party}_primaryAddress_primaryAddress_postcodeInput`,
  },
  detailAddressLine1: {
    label: 'Building and Street',
    selector: `#${party}_primaryAddress__detailAddressLine1`,
  },
  detailAddressLine2: {
    label: 'Address Line 2 (Optional)',
    selector: `#${party}_primaryAddress__detailAddressLine2`,
  },
  detailAddressLine3: {
    label: 'Address Line 3 (Optional)',
    selector: `#${party}_primaryAddress__detailAddressLine3`,
  },
  detailPostTown: {
    label: 'Town or City (Optional)',
    selector: `#${party}_primaryAddress__detailPostTown`,
  },
  detailCounty: {
    label: 'County (Optional)',
    selector: `#${party}_primaryAddress__detailCounty`,
  },
  detailCountry: {
    label: 'Country (Optional)',
    selector: `#${party}_primaryAddress__detailCountry`,
  },
  detailPostCode: {
    label: 'Postcode/Zipcode',
    selector: `#${party}_primaryAddress__detailPostCode`,
  },
});

export const getDropdowns = (party: Party) => ({
  addressList: {
    label: 'Select an address',
    selector: `#${party}_primaryAddress_primaryAddress_addressList`,
    options: ['George Mitchell Comprehensive School, Farmer Road, London'],
  },
});

export const buttons = {
  findAddress: {
    title: 'Find address',
  },
};
