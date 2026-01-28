/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const {assignCaseRoleToUser} = require('../../../api/caseRoleAssignmentHelper');
const mpScenario = 'ONE_V_ONE';
const errorMsg = 'Application cannot be created until all the required respondent solicitor are assigned to the case.';
let civilCaseReference, gaCaseReference;

Feature('1v1 unspecified assert general application unavailable before respondent assigned').tag('@ui-prod @api-ga-access');

Scenario.skip('1v1 unspecified assert general application unavailable before respondent assigned', async ({I,api}) => {
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  console.log('Assert Make a General Application fails, as respondent not assigned');
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(civilCaseReference);
  await I.verifyNoAccessToGeneralApplications(errorMsg);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);

}).retry(1);

Scenario.skip('1v1 specified assert general application unavailable before respondent assigned', async ({I,api}) => {
  civilCaseReference = await api.createSpecifiedClaim(config.applicantSolicitorUser, mpScenario, false);
  console.log('Assert Make a General Application fails, as respondent not assigned');
  await I.login(config.applicantSolicitorUser);
  await I.navigateToCaseDetails(civilCaseReference);
  await I.verifyNoAccessToGeneralApplications(errorMsg);
  console.log('Assign case to respondent');
  await assignCaseRoleToUser(civilCaseReference, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateGeneralApplication(config.applicantSolicitorUser, civilCaseReference);
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

