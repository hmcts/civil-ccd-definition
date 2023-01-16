const apiRequest = require('../../api/apiRequest');
const chai = require('chai');
const {assert} = chai;

const assertionText = 'Asserting case flag fields have been initialised for';

const assertPartyFlags = (flagsParent, roleOnCase) => {
  if(flagsParent) {
    console.log(`${assertionText} [${roleOnCase}]`);
    assert.deepEqual(flagsParent.flags, {
      partyName: flagsParent.partyName,
      roleOnCase
    });
  }
};

const assertLitigationFriendFlags = (flagsParent, roleOnCase) => {
  if(flagsParent) {
    console.log(`${assertionText} [${roleOnCase}]`);
    assert.deepEqual(flagsParent.flags, {
      partyName: `${flagsParent.firstName} ${flagsParent.lastName}`,
      roleOnCase
    });
  }
};

module.exports = {
  assertFlagsInitialisedAfterCreateClaim: async (user, caseId) => {
    const {case_data} = await apiRequest.fetchCaseDetails(user, caseId);
    assertPartyFlags(case_data.applicant1, 'Applicant 1');
    assertPartyFlags(case_data.applicant2, 'Applicant 2');
    assertPartyFlags(case_data.respondent1, 'Respondent 1');
    assertPartyFlags(case_data.respondent2, 'Respondent 2');
    assertLitigationFriendFlags(case_data.applicant1LitigationFriend, 'Applicant 1 Litigation Friend');
    assertLitigationFriendFlags(case_data.applicant2LitigationFriend, 'Applicant 2 Litigation Friend');
  },
  assertFlagsInitialisedAfterAddLitigationFriend: async (user, caseId) => {
    const {case_data} = await apiRequest.fetchCaseDetails(user, caseId);
    assertLitigationFriendFlags(case_data.respondent1LitigationFriend, 'Respondent 1 Litigation Friend');
    assertLitigationFriendFlags(case_data.respondent2LitigationFriend, 'Respondent 2 Litigation Friend');
  }
};
