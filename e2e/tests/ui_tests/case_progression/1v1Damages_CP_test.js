const config = require('../../../config.js');
const {assignCaseRoleToUser, unAssignAllUsers, addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');

// Reinstate the line below when https://tools.hmcts.net/jira/browse/EUI-6286 is fixed
//const caseEventMessage = eventName => `Case ${caseNumber} has been updated with event: ${eventName}`;
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const claimant1 = {
  litigantInPerson: true
};

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
Feature('1v1 Unspec Create Hearing Schedule @zakiTest');

Scenario('Create Hearing Schedule', async ({I}) => {
  await I.login(config.hearingCenterAdminWithRegionId4);
  await I.amOnPage(config.url.manageCase + '/cases/case-details/' + 1674041823016792);
  await I.createHearingScheduled();
  await I.click('Sign out');
}).retry(3);

