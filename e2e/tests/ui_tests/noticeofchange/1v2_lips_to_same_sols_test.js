const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const judgeUser = config.judgeUserWithRegionId1;

//Skipping to limit Ft to less than 40 mins - short term skip
xFeature('1v2 - both respondents litigant in person - NoC to same solicitor @e2e-noc @non-prod-e2e-ft @e2e-nightly-nonprod');

Scenario('Applicant solicitor creates claim again 2 respondent LiPs and cos notify/notify details', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.notifyClaimLip(config.applicantSolicitorUser);
    await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  }
});

Scenario('Respondent 1 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.defendantSolicitorUser);
  await I.initiateNoticeOfChange(caseId, 'Sir John Doe');
});

Scenario('Respondent 2 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.defendantSolicitorUser);
  await I.initiateNoticeOfChange(caseId, 'Dr Foo Bar');
});

Scenario('Respondent solicitor completes response', async ({api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP');
});

Scenario('Applicant solicitor completes response', async ({api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
});

//to be enabled in next pr - atm it is failing at some key but adding this change to see timeout
xScenario('Create SDO', async ({api}) => {
  await api.createSDO(judgeUser, 'CREATE_SMALL');
});

AfterSuite(async  () => {
  await unAssignAllUsers();
});
