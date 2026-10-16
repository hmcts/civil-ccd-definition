const config = require('../../../../config.js');
const { createAccount, deleteCitizenAccount } = require('../../../../api/idamHelper.js');

let civilCaseReference, gaCaseReference;

/**
 * Covers the GA_NOTIFY_HWF process, which notifies the applicant when a Help with Fees application
 * is refused. DTSCCI-6726 moved that process off the bespoke NOTIFY_APPLICANT_LIP_HWF case event
 * onto NOTIFY_EVENT and the Notifier framework, and nothing in the functional suites reached it:
 * the only HWF event any spec drove was FULL_REMISSION_HWF_GA, whose handler does not start the
 * process.
 *
 * The assertion is the business process wait inside the step. It fails on a Camunda incident, so it
 * catches both ways the migration can break: GaNotifierFactory not resolving the activity id, and
 * CCD refusing NOTIFY_EVENT for the GENERALAPPLICATION case type when the civil-ccd-definition
 * entry is missing.
 */
Feature('GA SPEC Claim 1v1 LiP Help with Fees no remission API tests')
  .tag('@civil-service-master @civil-service-pr');

Before(async () => {
  await createAccount(config.applicantCitizenUser.email, config.applicantCitizenUser.password);
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('HWF refused on a LiP general application notifies the applicant', async ({ api_ga }) => {
  civilCaseReference = await api_ga.createClaimWithUnrepresentedClaimant(
    config.applicantCitizenUser, 'SmallClaims', 'INDIVIDUAL');
  console.log('Civil Case created for general application: ' + civilCaseReference);

  console.log('*** Make a General Application with Help with Fees ***');
  gaCaseReference = await api_ga.createGAApplicationWithUnrepresented(
    config.applicantCitizenUser, civilCaseReference, '', true, 'NO_REMISSION');
  console.log('*** HWF refused and applicant notified on GA Case Reference: ' + gaCaseReference + ' ***');
}).retry(1);

AfterSuite(async ({ api_ga }) => {
  await api_ga.cleanUp();
  await deleteCitizenAccount(config.applicantCitizenUser.email);
  await deleteCitizenAccount(config.defendantCitizenUser2.email);
});
