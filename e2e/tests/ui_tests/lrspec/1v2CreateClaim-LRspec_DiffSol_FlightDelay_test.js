const config = require('../../../config.js');
const {addUserCaseMapping, unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
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
Scenario.skip('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for flight delay @create-claim-spec', async ({LRspec}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    console.log('AApplicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for flight delay @create-claim-spec');
    var user = config.applicantSolicitorUser;
    await LRspec.login(config.applicantSolicitorUser);
    //await LRspec.createCaseSpecified('1v2 Different LRs fast claim','Individual', null, respondent1, respondent2, 15450);
    await LRspec.createCaseSpecifiedForFlightDelay('1v2 Different LRs fast claim','Organisation', null, respondent1, respondent2, 15450);
    caseNumber = await LRspec.grabCaseNumber();

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

AfterSuite(async  () => {
  await unAssignAllUsers();
});
