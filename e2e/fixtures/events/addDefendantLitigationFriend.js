const { buildAddress } = require('../../api/dataHelper');

module.exports = {
  valid: {
    DefendantLitigationFriend: {
      respondent11LitigationFriend: {
        firstName: 'Bob',
        lastName: 'the litigant friend',
        emailAddress: 'bobthelitigant@litigants.com',
        phoneNumber: '07123456789',
        hasSameAddressAsLitigant: 'No',
        primaryAddress: buildAddress('litigant friend')
      }
    }
  }
};
