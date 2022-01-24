const {I} = inject();
const litigationFriend = require('../../fragments/litigationFriend');

module.exports = {

  fields: (applicantNumber) => {
    return {
      childApplicant: {
        id: `#applicant${applicantNumber}LitigationFriendRequired`,
        options: {
          yes: 'Yes',
          no: 'No'
        }
      },
    };
  },

  async enterLitigantFriend(applicantNumber = '1', response = 'no', address, file) {
    I.waitForElement(this.fields(applicantNumber).childApplicant.id);
    await I.runAccessibilityTest();
    await within(this.fields(applicantNumber).childApplicant.id, () => {
      I.click(this.fields(applicantNumber).childApplicant.options[response]);
    });

    if(response === 'yes') {
      await litigationFriend.enterLitigantFriendWithDifferentAddressToLitigant(`applicant${applicantNumber}`, address, file);
    }

    await I.clickContinue();
  }
};

