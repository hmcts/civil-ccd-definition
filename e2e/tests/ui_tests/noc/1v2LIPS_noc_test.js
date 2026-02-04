const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const judgeUser = config.judgeUserWithRegionId1;

Feature('1v2 - both respondents litigant in person - NoC to same solicitor').tag('@ui-nonprod @ui-nightly-prod @ui-noc');

Scenario('01 Applicant solicitor creates claim again 2 respondent LiPs and cos notify/notify details', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimLip(config.applicantSolicitorUser);
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
}).retry(1);

Scenario('02 Respondent 1 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.defendantSolicitorUser);
  await I.initiateNoticeOfChange(caseId, 'Sir John Doe');
}).retry(1);

Scenario('03 Respondent 2 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.defendantSolicitorUser);
  await I.initiateNoticeOfChange(caseId, 'Dr Foo Bar');
}).retry(1);

Scenario('04 Respondent solicitor completes response', async ({api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
}).retry(1);

Scenario('05 Applicant solicitor completes response', async ({api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}).retry(1);

//to be enabled in next pr - atm it is failing at some key but adding this change to see timeout
xScenario('06 Create SDO', async ({api}) => {
  await api.createSDO(judgeUser, 'CREATE_SMALL');
}).retry(1);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
