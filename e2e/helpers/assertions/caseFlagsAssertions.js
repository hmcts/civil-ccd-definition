const apiRequest = require("../../api/apiRequest");
const config = require("../../config");
const chai = require("chai");
const {expect} = chai;

const assertionText = 'Asserting case flag fields have been initialised for';

const assertRespondent1DQPartyFields = (caseDetails) => {
  let respondentSolicitor1Experts = caseDetails.case_data.respondentSolicitor1Experts;
  let respondentSolicitor1Witnesses = caseDetails.case_data.respondentSolicitor1Witnesses;

  console.log(`${assertionText} [Respondent solicitor 1 expert]`)
  expect(respondentSolicitor1Experts[0].value.flags).deep.equal({
    "partyName": "John Doe",
    "roleOnCase": "Respondent solicitor 1 expert"
  });

  console.log(`${assertionText} [Respondent solicitor 1 witness]`)
  expect(respondentSolicitor1Witnesses[0].value.flags).deep.equal({
    "partyName": "John Smith",
    "roleOnCase": "Respondent solicitor 1 witness"
  });
}

function assertRespondent2DQPartyFields(caseDetails) {
  let respondentSolicitor2Experts = caseDetails.case_data.respondentSolicitor2Experts;
  let respondentSolicitor2Witnesses = caseDetails.case_data.respondentSolicitor2Witnesses;

  console.log(`${assertionText} [Respondent solicitor 2 expert]`)
  expect(respondentSolicitor2Experts[0].value.flags).deep.equal({
    "partyName": "John Doe",
    "roleOnCase": "Respondent solicitor 2 expert"
  });

  console.log(`${assertionText} [Respondent solicitor 2 witness]`)
  expect(respondentSolicitor2Witnesses[0].value.flags).deep.equal({
    "partyName": "John Smith",
    "roleOnCase": "Respondent solicitor 2 witness"
  });
}

function assertApplicantDQPartyFields(caseDetails) {
  let applicantSolicitorExperts = caseDetails.case_data.applicantSolicitorExperts;
  let applicantSolicitorWitnesses = caseDetails.case_data.applicantSolicitorWitnesses;

  console.log(`${assertionText} [Applicant solicitor expert]`)
  expect(applicantSolicitorExperts[0].value.flags).deep.equal({
    "partyName": "John Doe",
    "roleOnCase": "Applicant solicitor expert"
  });

  console.log(`${assertionText} [Applicant solicitor witness]`)
  expect(applicantSolicitorWitnesses[0].value.flags).deep.equal({
    "partyName": "John Smith",
    "roleOnCase": "Applicant solicitor witness"
  });
}

module.exports = {
  assertFlagsStructureIsCreatedForExpertsAndWitnessess: async (caseId, party) => {
    console.log('Asserting flags structure is available to admin user');
    const caseDetails = await apiRequest.fetchCaseDetails(config.adminUser, caseId);

    if (party === 'respondent1') {
      assertRespondent1DQPartyFields(caseDetails);
    } else if (party === 'respondent2') {
      assertRespondent2DQPartyFields(caseDetails);
    } else {
      assertApplicantDQPartyFields(caseDetails);
    }
  }
}







