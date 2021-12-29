const {I} = inject();
const postcodeLookup = require('./addressPostcodeLookup');

module.exports = {

  fields: function () {
    return {
      litigationFriendName: '#genericLitigationFriend_fullName',
      litigantInFriendDifferentAddress: {
        id: '#genericLitigationFriend_hasSameAddressAsLitigant',
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      litigantInFriendAddress: '#genericLitigationFriend_primaryAddress_primaryAddress',
      certificateOfSuitability: '#genericLitigationFriend_certificateOfSuitability_0_document'
    };
  },

  async enterLitigantFriendWithDifferentAddressToLitigant(partyType, address, file) {
    I.fillField(this.fields.litigationFriendName, 'John Smith');

    await within(this.fields.litigantInFriendDifferentAddress.id, () => {
      I.click(this.fields.litigantInFriendDifferentAddress.options.no);
    });

    await within(this.fields.litigantInFriendAddress, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields.certificateOfSuitability);
    I.attachFile(this.fields.certificateOfSuitability, file);
    await I.waitForInvisible(locate('.error-message').withText('Uploading...'));
  }
};

