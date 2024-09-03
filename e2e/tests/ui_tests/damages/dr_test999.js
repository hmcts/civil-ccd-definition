const config = require('../../../config.js');

Feature('1v2 Different Solicitors Claim Journey @dr');
// Scenario('Judge triggers SDO', async ({I}) => {
//   if (['demo'].includes(config.runningEnv)) {
//     await I.login(config.judgeUserWithRegionId4Demo);
//     await I.amOnPage(config.url.manageCase + '/cases/case-details/' + '1705928332691250' + '/tasks');
//     await I.waitForElement('.spinner');
//     await I.waitForDetached('.spinner',60);
//     await I.waitForClickable('#action_claim',30);
//     await I.click('#action_claim');
//   } else {
//     await I.login(config.judgeUserWithRegionId4);
//   }
//   // await I.login(['demo'].includes(config.runningEnv) ? config.judgeUserWithRegionId4Demo : config.judgeUserWithRegionId4);
//   await I.amOnPage(config.url.manageCase + '/cases/case-details/' + '1705928332691250');
//   await I.waitForText('Summary');
//   await I.initiateSDO(null, null, 'fastTrack', null);
// }).retry(3);

Scenario('Judge triggers SDO @dr', async ({I}) => {
  await I.login(config.judgeUser2WithRegionId2);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/1706096369519890');
  await I.waitForText('Summary');
  await I.initiateSDO(null, null, 'fastTrack', null);
}).retry(3);

Scenario.skip('Hearing test @dr', async ({I}) => {
  await I.login(config.hearingCenterAdminWithRegionId4Demo);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/1706009299576112');
  await I.requestNewHearing();
  await I.updateHearing();
  await I.cancelHearing();
}).retry(3);

Scenario.skip('update @dr', async ({I}) => {
  await I.login(config.hearingCenterAdminWithRegionId4Demo);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/1706003229475040');
  let urlBefore = await I.grabCurrentUrl();
  await I.refreshPage();
  await I.waitForVisible(locate('div.mat-tab-label-content').withText('Hearings'), 60);

  await I.retryUntilUrlChanges(async () => {
    await I.forceClick(locate('div.mat-tab-label-content').withText('Hearings'));

  }, urlBefore);
  await I.updateHearing();
}).retry(3);


Scenario.skip('cancel @dr', async ({I}) => {
  await I.login(config.hearingCenterAdminWithRegionId4Demo);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/1706003229475040');
  let urlBefore = await I.grabCurrentUrl();
  await I.refreshPage();
  await I.waitForVisible(locate('div.mat-tab-label-content').withText('Hearings'), 60);

  await I.retryUntilUrlChanges(async () => {
    await I.forceClick(locate('div.mat-tab-label-content').withText('Hearings'));

  }, urlBefore);
  await I.cancelHearing();
}).retry(3);


//AfterSuite(async () => {
//  await unAssignAllUsers();
//});
