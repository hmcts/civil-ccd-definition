// in this file you can append custom step methods to 'I' object

const {assert} = require('chai');
const config = require('../e2e/config');
const caseViewPage = require('./pages/caseView.page');

const taskFieldsToBeValidated = {
  taskInitiationFields: [
    'name',
    'type',
    'task_title',
  ],
  taskConfigurationFields: [
    'location_name',
    'location',
    'execution_type',
    'jurisdiction',
    'region',
    'case_type_id',
    'case_category',
    'auto_assigned',
    'case_management_category',
    'work_type_id',
    'work_type_label',
    'description',
    'role_category'
  ],
  taskPermissionFields: [
    'permissions'
  ]
};


module.exports = function () {
  return actor({
    goToTask: async function (caseId, taskName) {
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForElement('#event');
      await this.click('#action_claim');
      await this.waitForElement('#action_reassign');
      await this.waitForText(taskName);
      await this.click(taskName);
      await this.wait(3);
      if (taskName === 'JudgeDecideOnApplication') {
        await this.waitInUrl('MAKE_DECISIONGAJudicialDecision', 10);
      } else if (taskName === 'LegalAdvisorDecideOnApplication') {
        await this.waitInUrl('MAKE_DECISIONGAJudicialDecision', 10);
      } else if (taskName === 'ScheduleApplicationHearing') {
        await this.waitInUrl('HEARING_SCHEDULED_GAHearingNoticeGADetail', 10);
      } else {
        await this.waitInUrl('Application', 5);
      }
    },

    verifyAdminTask: async function (caseId, taskName) {
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForElement('#event');
      await this.click('#action_claim');
      await this.waitForElement('#action_reassign');
      await this.waitForText(taskName);
      await this.see('Active tasks');
      await this.see('Next steps');
    },

    verifyNoActiveTask: async function (caseId) {
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.dontSeeElement('#action_claim');
    },

    goToEvent: async function (eventName) {
      await caseViewPage.start(eventName);
    },

    referToJudge: async function () {
      await this.waitInUrl('REFER_TO_JUDGE');
      await this.fillField('#referToJudge_judgeReferEventDescription', 'Test test');
      await this.fillField('#referToJudge_judgeReferAdditionalInfo', 'Test additional Info');
      await this.click('Continue');
      await this.waitInUrl('REFER_TO_JUDGE/submit', 5);
      await this.click('Submit');
      await this.wait(5);
    },

    referToLA: async function () {
      await this.waitInUrl('REFER_TO_LEGAL_ADVISOR');
      await this.fillField('#referToLegalAdvisor_legalAdvisorEventDescription', 'Test test');
      await this.fillField('#referToLegalAdvisor_legalAdvisorAdditionalInfo', 'Test additional Info');
      await this.click('Continue');
      await this.waitInUrl('REFER_TO_LEGAL_ADVISOR/submit', 5);
      await this.click('Submit');
    },

    runChallengedAccessSteps: async function (caseId) {
      await this.fillField('#caseReference', caseId);
      await this.click('Find');
      await this.wait(10);
      await this.waitForText('Request access');
      await this.forceClick('Request access');
      await this.see('To determine if the case needs to be consolidated');
      await this.forceClick('#reason-1');
      await this.forceClick('Submit');
      await this.waitForText('Access successful');
      await this.see(caseId);
      await this.click('View case file');
      console.log('Challenged access requested successfully');
    },

    runSpecificAccessRequestSteps: async function (caseId) {
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForElement('#action_claim');
      await this.wait(10);
      await this.click('Request access');
      await this.waitForText('Why do you need to access this case');
      await this.fillField('#specific-reason', 'Req for iac user');
      await this.click('Submit');
      await this.waitForText('Request sent');
      await this.see(caseId);
      await this.click('My access');
      const caseIdLinkinMyAccess = `//a[contains(text(), ${caseId})]`;
      await this.waitForSelector(caseIdLinkinMyAccess);
      console.log('Specific access requested successfully');
    },

    runSpecificAccessApprovalSteps: async function (caseId, approveType) {
      console.log('config.url.manageCase...', config.url.manageCase);
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForElement('#action_claim');
      await this.forceClick(locate('#action_claim').at(1));
      await this.waitForElement('#action_reassign');
      await this.forceClick('Review Access Request');
      await this.waitForSelector('#APPROVE_REQUEST', 10);
      await this.forceClick('Approve request');
      await this.wait(2);
      await this.forceClick('Continue');
      await this.waitForElement('#specific-access-1');
      if (approveType == '7 days') {
        await this.forceClick('7 days');
      } else if (approveType == 'Indefinite') {
        await this.forceClick('Indefinite');
      } else if (approveType == 'Another period') {
        await this.forceClick('Another period');
      }
      await this.forceClick('Submit');
      await this.waitForText('Access approved', 10);
    },

    runJudgeSpecificAccessApprovalSteps: async function (caseId) {
      console.log('config.url.manageCase...', config.url.manageCase);
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForElement('#action_assign');
      await this.forceClick(locate('#action_assign').at(1));
      await this.waitForElement('#JUDICIAL');
      await this.click('Continue');
      await this.wait(5);
      await this.waitForElement('#sub-title-hint');
      await this.fillField('#inputSelectPerson', 'Shaun Micheal ');
      await this.waitForSelector('span.mat-option-text', 20);
      await this.forceClick(locate('span.mat-option-text').at(1));
      await this.click('Continue');
      await this.waitForElement('#reassign-confirm-hint');
      await this.see('Check you are assigning work to the right person.');
      await this.click('Assign');
      await this.wait(5);
    },

    validateTaskInfo(createdTask, expectedTaskInfo) {
      if (expectedTaskInfo && createdTask) {
        for (let taskDMN of Object.keys(taskFieldsToBeValidated)) {
          console.log(`asserting dmn info: ${taskDMN} has valid data`);
          taskFieldsToBeValidated[taskDMN].forEach(
            fieldsToBeValidated => {
              assert.deepEqual(createdTask[fieldsToBeValidated], expectedTaskInfo[fieldsToBeValidated]);
            }
          );
        }
      }
    }
  });
};
