const {I} = inject();

module.exports = {

  fields: {
    postcodeLookup: '#postcodeInput',
    addressList: '#addressList',
    buildingAndStreet: {
      lineOne: '#AddressLine1',
      lineTwo: '#AddressLine2',
      lineThree: '#AddressLine3',
    },
    town: '#PostTown"]',
    county: '#County"]',
    country: '#Country"]',
    postcode: '#PostCode"]',
  },
  findAddressButton: 'Find address',
  cantEnterPostcodeLink: locate('a').withText('I can\'t enter a UK postcode'),

  enterAddressManually(address, link = this.cantEnterPostcodeLink) {
    I.click(link);
    I.fillField(this.fields.buildingAndStreet.lineOne, address.buildingAndStreet.lineOne);
    I.fillField(this.fields.buildingAndStreet.lineTwo, address.buildingAndStreet.lineTwo);
    I.fillField(this.fields.buildingAndStreet.lineThree, address.buildingAndStreet.lineThree);
    I.fillField(this.fields.town, address.town);
    I.fillField(this.fields.county, address.county);
    I.fillField(this.fields.country, address.country);
    I.fillField(this.fields.postcode, address.postcode);
  }
};
