const {I} = inject();
const postcodeLookup = require('./addressPostcodeLookup');
const {checkToggleEnabled} = require('../api/testingSupport');

module.exports = {

  fields: function (partyType) {
    return {
      oldFields: {
        litigationFriendName: `#${partyType}LitigationFriend_fullName`,
      },
      litigationFirstName: `#${partyType}LitigationFriend_firstName`,
      litigationLastName: `#${partyType}LitigationFriend_lastName`,
      litigationEmail: `#${partyType}LitigationFriend_emailAddress`,
      litigationPhone: `#${partyType}LitigationFriend_phoneNumber`,
      litigantInFriendDifferentAddress: {
        id: `#${partyType}LitigationFriend_hasSameAddressAsLitigant`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
      litigantInFriendAddress: `#${partyType}LitigationFriend_primaryAddress_primaryAddress`,
      certificateOfSuitability: `#${partyType}LitigationFriend_certificateOfSuitability_0_document`
    };
  },

  async enterLitigantFriendWithDifferentAddressToLitigant(partyType, address, file) {
    let isHNLEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if (!isHNLEnabled) {
      I.fillField(this.fields(partyType).oldFields.litigationFriendName, 'John Smith');
    } else {
      I.fillField(this.fields(partyType).litigationFirstName, 'John');
      I.fillField(this.fields(partyType).litigationLastName, 'Smith');
      I.fillField(this.fields(partyType).litigationEmail, 'jsmith@email.com');
      I.fillField(this.fields(partyType).litigationPhone, '07123456789');
    }

    await within(this.fields(partyType).litigantInFriendDifferentAddress.id, () => {
      I.click(this.fields(partyType).litigantInFriendDifferentAddress.options.no);
    });

    await within(this.fields(partyType).litigantInFriendAddress, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.addAnotherElementToCollection();
    I.waitForElement(this.fields(partyType).certificateOfSuitability);
    I.attachFile(this.fields(partyType).certificateOfSuitability, file);
    await I.waitForInvisible(locate('.error-message').withText('Uploading...'));
  }
};

