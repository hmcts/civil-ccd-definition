/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

let civilCaseReference, gaCaseReference;

Feature('GA 1v1 Make Adjourn Vacate API tests').tag('@api-nightly-prod @api-adjourn-ga');

Scenario('AC 4 - 15 Days with consent', async ({api}) => {
  let hearingDate = await api.createDateString(15);
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateAdjournVacateGeneralApplication(
    config.applicantSolicitorUser, civilCaseReference, 'No',
    'Yes', hearingDate, '0', 'FEE0414', '1');
}).retry(1).tag('@api-prod @ui-prod');

Scenario('AC 3 - 14 Days with consent', async ({api}) => {
  let hearingDate = await api.createDateString(14);
  civilCaseReference = await api.createUnspecifiedClaim(
    config.applicantSolicitorUser, mpScenario, 'Company');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateAdjournVacateGeneralApplication(
    config.applicantSolicitorUser, civilCaseReference, 'No',
    'Yes', hearingDate, '11900', 'FEE0443', '2');
}).retry(1);

Scenario('AC 2 - 14 Days without consent, without notice', async ({api}) => {
  let hearingDate = await api.createDateString(14);
  civilCaseReference = await api.createUnspecifiedClaim(
    config.applicantSolicitorUser, mpScenario, 'Company');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateAdjournVacateGeneralApplication(
    config.applicantSolicitorUser, civilCaseReference, 'No',
    'No', hearingDate, '11900', 'FEE0443', '2');
}).retry(1).tag('@api-prod @ui-prod');

Scenario('AC 1 - 14 Days without consent, with notice', async ({api}) => {
  let hearingDate = await api.createDateString(14);
  civilCaseReference = await api.createUnspecifiedClaim(config.applicantSolicitorUser, mpScenario, 'Company', '11000');
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario, civilCaseReference);
  await api.notifyClaimDetails(config.applicantSolicitorUser, civilCaseReference);
  await api.acknowledgeClaim(config.defendantSolicitorUser, civilCaseReference, true);
  await api.defendantResponseClaim(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.claimantResponseUnSpec(config.applicantSolicitorUser, mpScenario, 'JUDICIAL_REFERRAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);
  console.log('Make a General Application');
  gaCaseReference = await api.initiateAdjournVacateGeneralApplication(
    config.applicantSolicitorUser, civilCaseReference, 'Yes',
    'No', hearingDate, '30300', 'FEE0442', '2');
}).retry(1);

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
