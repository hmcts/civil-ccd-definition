const {I} = inject();
const postcodeLookup = require('./addressPostcodeLookup');

module.exports = {

  fields: function () {
    return {
      litigationFriendName: '#genericLitigationFriend_fullName',
      litigantInFriendDifferentAddress: {
        id: 'genericLitigationFriend_hasSameAddressAsLitigant',
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      litigantInFriendAddress: '#genericLitigationFriend_primaryAddress_primaryAddress',
      certificateOfSuitability: '#genericLitigationFriend_certificateOfSuitability_0_document'
    };
  },

  async enterLitigantFriendWithDifferentAddressToLitigant(address, file) {
    I.fillField(litigationFriendName, 'John Smith');

    await within(litigantInFriendDifferentAddress.id, () => {
      I.click(litigantInFriendDifferentAddress.options.no);
    });

    await within(litigantInFriendAddress, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.addAnotherElementToCollection();
    I.waitForElement(certificateOfSuitability);
    I.attachFile(certificateOfSuitability, file);
    await I.waitForInvisible(locate('.error-message').withText('Uploading...'));
  }
};

