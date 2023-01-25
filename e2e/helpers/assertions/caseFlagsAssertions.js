const apiRequest = require('../../api/apiRequest');
const config = require('../../config');
const chai = require('chai');
const {assert,expect} = chai;

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

const assertRespondent1DQPartyFields = (caseDetails) => {
  let respondentSolicitor1Experts = caseDetails.case_data.respondentSolicitor1Experts;
  let respondentSolicitor1Witnesses = caseDetails.case_data.respondentSolicitor1Witnesses;

  console.log(`${assertionText} [Respondent solicitor 1 expert]`);
  expect(respondentSolicitor1Experts[0].value.flags).deep.equal({
    'partyName': 'John Doe',
    'roleOnCase': 'Respondent solicitor 1 expert'
  });

  console.log(`${assertionText} [Respondent solicitor 1 witness]`);
  expect(respondentSolicitor1Witnesses[0].value.flags).deep.equal({
    'partyName': 'John Smith',
    'roleOnCase': 'Respondent solicitor 1 witness'
  });
};

function assertRespondent2DQPartyFields(caseDetails) {
  let respondentSolicitor2Experts = caseDetails.case_data.respondentSolicitor2Experts;
  let respondentSolicitor2Witnesses = caseDetails.case_data.respondentSolicitor2Witnesses;

  console.log(`${assertionText} [Respondent solicitor 2 expert]`);
  expect(respondentSolicitor2Experts[0].value.flags).deep.equal({
    'partyName': 'John Doe',
    'roleOnCase': 'Respondent solicitor 2 expert'
  });

  console.log(`${assertionText} [Respondent solicitor 2 witness]`);
  expect(respondentSolicitor2Witnesses[0].value.flags).deep.equal({
    'partyName': 'John Smith',
    'roleOnCase': 'Respondent solicitor 2 witness'
  });
}

function assertApplicantDQPartyFields(caseDetails) {
  let applicantSolicitorExperts = caseDetails.case_data.applicantSolicitorExperts;
  let applicantSolicitorWitnesses = caseDetails.case_data.applicantSolicitorWitnesses;

  console.log(`${assertionText} [Applicant solicitor expert]`);
  expect(applicantSolicitorExperts[0].value.flags).deep.equal({
    'partyName': 'John Doe',
    'roleOnCase': 'Applicant solicitor expert'
  });

  console.log(`${assertionText} [Applicant solicitor witness]`);
  expect(applicantSolicitorWitnesses[0].value.flags).deep.equal({
    'partyName': 'John Smith',
    'roleOnCase': 'Applicant solicitor witness'
  });
}


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
  },
  assertCaseFlags: async (caseId, user, response) => {
    if (['FULL_DEFENCE1', 'FULL_DEFENCE2', 'FULL_DEFENCE'].indexOf(response) > -1) {
      console.log('Asserting flags structure is available to admin user');
      const caseDetails = await apiRequest.fetchCaseDetails(config.adminUser, caseId);

      if (user === config.defendantSolicitorUser) {
        await assertRespondent1DQPartyFields(caseDetails);
      } else if (user === config.secondDefendantSolicitorUser) {
        await assertRespondent2DQPartyFields(caseDetails);
      } else {
        assertApplicantDQPartyFields(caseDetails);
      }
    }
  }
};
