const config = require('../../../config.js');
const {assignCaseToLRSpecDefendant} = require('../../../api/testingSupport');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const {PARTY_FLAGS} = require('../../../fixtures/caseFlags');
// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;

let caseNumber;

Feature('1v1 spec case flags journey').tag('@ui-nightly-prod @ui-case-flags');

Scenario('01 Prepare 1v1 spec small track claim up to case progression', async ({api_spec, LRspec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_ONE', true);
  await api_spec.claimantResponse(config.applicantSolicitorUser, true);
  caseNumber = await api_spec.getCaseId();
  await LRspec.setCaseId(caseNumber);
  addUserCaseMapping(caseNumber, config.applicantSolicitorUser);
}).retry(2);

Scenario('02 Add case flags', async ({LRspec}) => {
  const caseFlags = [{
    partyName: 'Example applicant1 company', roleOnCase: 'Claimant 1',
    details: [PARTY_FLAGS.vulnerableUser.value]
  },{
    partyName: 'John Smith', roleOnCase: 'Claimant solicitor expert',
    details: [PARTY_FLAGS.unacceptableBehaviour.value]
  }
  ];

  await LRspec.login(config.hearingCenterAdminWithRegionId1);
  await LRspec.createCaseFlags(caseFlags);
  // await LRspec.validateCaseFlags(caseFlags);
}).retry(2);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
