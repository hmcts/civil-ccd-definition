/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
let civilCaseReference;

Feature('CCD 1v2 2 LIPs COS UI test @cos-tests');

Scenario('Create claim where two respondents are LIP - notify/notify claim details journey', async ({I, api}) => {
  if (['preview', 'demo'].includes(config.runningEnv)) {
    civilCaseReference = await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser,
      'ONE_V_TWO_LIPS');
    console.log('Case created for COS: ' + civilCaseReference);
    await I.login(config.applicantSolicitorUser);
    await I.fillNotifyClaimCOSForm(civilCaseReference);
    await I.verifyCOSTabDetails();
    await I.navigateToTab('History');
    await I.see('Awaiting Claim Details Notification');
    await I.fillNotifyClaimDetailsCOSForm(civilCaseReference);
    await I.verifyCOSTabNotifyClaimDetails();
    await I.navigateToTab('History');
    await I.see('Awaiting Defendant Response');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
