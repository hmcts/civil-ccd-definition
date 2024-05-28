const config = require('../../../config.js');
const {addUserCaseMapping, unAssignAllUsers, assignCaseRoleToUser} = require('../../../api/caseRoleAssignmentHelper');
const {checkToggleEnabled} = require('../../../api/testingSupport');
const {PBAv3} = require('../../../fixtures/featureKeys');
const serviceRequest = require('../../../pages/createClaim/serviceRequest.page');
const {paymentUpdate} = require('../../../api/apiRequest');
const claimData = require('../../../fixtures/events/createClaimSpec');
const apiRequest = require('../../../api/apiRequest');
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2,
  partyType: 'Organisation'
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 3,
  partyType: 'Organisation'
};

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with flight delay @e2e-spec @e2e-spec-1v2DS @master-e2e-ft');
Scenario('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for flight delay @create-claim-spec', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('AApplicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for flight delay @create-claim-spec');
    var user = config.applicantSolicitorUser;
    await LRspec.login(config.applicantSolicitorUser);
    await LRspec.createCaseSpecifiedForFlightDelay('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 11000);
    //caseNumber = await LRspec.grabCaseNumber();
    caseNumber = await LRspec.getCaseId();
    await LRspec.setCaseId(caseNumber);
    const pbaV3 = await checkToggleEnabled(PBAv3);
    console.log('Is PBAv3 toggle on?: ' + pbaV3);

    if (pbaV3) {
      await apiRequest.setupTokens(user);
      await serviceRequest.openServiceRequestTab();
      await serviceRequest.payFee(caseId());
      await paymentUpdate(caseId(), '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId(), 'paid'));
      console.log('Service request update sent to callback URL');
    }

    addUserCaseMapping(caseId(), config.applicantSolicitorUser);
  }
}).retry(3);
Scenario('1v2 Diff LRs Fast Track Claim  - Assign roles to defendants', async () => {
  await assignCaseRoleToUser(caseNumber, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  await assignCaseRoleToUser(caseNumber,  'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
  console.log('Assigned roles for defendant 1 and 2', caseNumber);
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - First Defendant solicitor rejects claim', async ({LRspec}) => {
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - Second Defendant solicitor rejects claim', async ({LRspec}) => {
  await LRspec.login(config.secondDefendantSolicitorUser);
  await LRspec.respond1v2DiffLR_FullDefence({
    secondDefendant: true,
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
}).retry(3);

Scenario('1v2 Diff LRs Fast Track Claim  - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
}).retry(3);

Scenario('Judge triggers SDO', async ({LRspec}) => {
  await LRspec.login(config.judgeUser2WithRegionId2);
  await LRspec.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
  await LRspec.waitForText('Summary');
  await LRspec.initiateSDO('yes', 'yes', null, null);
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
