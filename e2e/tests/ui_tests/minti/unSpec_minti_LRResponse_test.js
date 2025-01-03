const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const parties = require('../../../helpers/party');


const intermediateTrackClaimAmount = '99000';
const mintiEnabled = true;
const claimAmountMulti = '200001';

const track = 'INTERMEDIATE_CLAIM';
const judgeUser = config.judgeUserWithRegionId1;
const hearingCenterAdminToBeUsed = config.hearingCenterAdminWithRegionId1;
let civilCaseReference;

Feature('Minti tracks - LR responses @non-prod-e2e-ft');

Scenario('1v1 Multi track - LR responses', async ({api, I}) => {
  const mpScenario = 'ONE_V_ONE';
  civilCaseReference =  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmountMulti, mintiEnabled);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  // await I.login(config.defendantSolicitorUser);
  // await I.respondToClaimMinti({
  //   caseId: civilCaseReference,
  //   party: parties.RESPONDENT_SOLICITOR_1,
  //   defendant1Response: 'fullDefence',
  //   claimValue: claimAmountMulti});
});

AfterSuite(async  () => {
  //await unAssignAllUsers();
});
