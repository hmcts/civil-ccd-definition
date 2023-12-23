const postcodeLookup = require('../../fragments/addressPostcodeLookup');
const {I} = inject();

module.exports = {

  fields: {
    respondent1LitigationFriend: {
      id: '#respondent1LitigationFriend_respondent1LitigationFriend',
      firstName: `#respondent1LitigationFriend_firstName`,
      diffAddress: `#respondent1LitigationFriend_hasSameAddressAsLitigant_No`,
      differentAddress: {
        id: `#respondent1LitigationFriend_hasSameAddressAsLitigant`,
        options: {
          yes: 'Yes',
          no: 'No'
        },
        address:`#respondent1LitigationFriend_primaryAddress`
      }
    },
  },

  async updateLitigationFriend(address) {
    I.waitForElement(this.fields.respondent1LitigationFriend.id);
    await I.runAccessibilityTest();

    I.click(this.fields.respondent1LitigationFriend.diffAddress);

    await within(this.fields.respondent1LitigationFriend.id, () => {
      I.click(this.fields.respondent1LitigationFriend.differentAddress.options.no);
    });

    await within(this.fields.respondent1LitigationFriend.address, () => {
      postcodeLookup.enterAddressManually(address);
    });

    await I.clickContinue();
  },
};
