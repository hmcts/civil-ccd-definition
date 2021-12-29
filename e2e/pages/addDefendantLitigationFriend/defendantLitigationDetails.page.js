const {I} = inject();
const litigationFriend = require('../../fragments/litigationFriend');

module.exports = {

  async enterLitigantFriendWithDifferentAddressToDefendant(address, file) {
    await I.runAccessibilityTest();
    await litigationFriend.enterLitigantFriendWithDifferentAddressToLitigant('genericLitigationFriend', address, file);
    await I.clickContinue();
  }
};

