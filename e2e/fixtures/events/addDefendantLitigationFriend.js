const { buildAddress } = require('../../api/dataHelper');

module.exports = {
  ONE_V_ONE: {
    valid: {
      DefendantLitigationFriend: {
        respondent1LitigationFriend: {
          firstName: 'Bob',
          lastName: 'the litigant friend',
          emailAddress: 'bobthelitigant@litigants.com',
          phoneNumber: '07123456789',
          hasSameAddressAsLitigant: 'No',
          primaryAddress: buildAddress('litigant friend')
        }
      }
    }
  },
  ONE_V_TWO_TWO_LEGAL_REP: {
    valid: {
      DefendantLitigationFriend: {
        respondent2LitigationFriend: {
          firstName: 'Davif',
          lastName: 'the litigant friend',
          emailAddress: 'davidthelitigant@litigants.com',
          phoneNumber: '07123458675',
          hasSameAddressAsLitigant: 'No',
          primaryAddress: buildAddress('litigant friend')
        }
      }
    }
  }
};
