const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');

Feature('1v2 - both respondents litigant in person - NoC to same solicitor @e2e-noc @non-prod-e2e-ft');

Scenario('Applicant solicitor creates claim again 2 respondent LiPs and cos notify/notify details', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.notifyClaimLip(config.applicantSolicitorUser);
    await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  }
});

Scenario('Respondent 1 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.otherSolicitorUser1);
  await I.initiateNoticeOfChange(caseId, 'Sir John Doe');
});

Scenario('Respondent 2 files NoC with org2 solicitor', async ({I, api}) => {
  let caseId = await api.getCaseId();
  await I.login(config.otherSolicitorUser2);
  await I.initiateNoticeOfChange(caseId, 'Dr Foo Bar');
});

Scenario('Respondent solicitor completes response', async ({api}) => {
  await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP');
});

Scenario('Applicant solicitor completes response', async ({api}) => {
  await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_TWO_TWO_LEGAL_REP', 'AWAITING_APPLICANT_INTENTION');
});

AfterSuite(async  () => {
  await unAssignAllUsers();
});
