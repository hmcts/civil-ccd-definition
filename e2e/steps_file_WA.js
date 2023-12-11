// in this file you can append custom step methods to 'I' object

const { assert } = require('chai');


const config = require('./config.js');

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
  ],
  taskPriorityFields: [
    'minor_priority',
    'major_priority'
  ]
};


module.exports = function (){
  return actor({
    runChallengedAccessSteps: async function(caseId) {
      await this.click('Search');
      await this.waitForElement('#caseRef');
      await this.fillField('#caseRef', caseId);
      await this.click('//button[@type=\'submit\']');
      await this.waitForText(caseId);
      await this.waitForClickable('//a[contains(text(), \'Challenged access\')]', 60);
      await this.click('//a[contains(text(), \'Challenged access\')]');
      await this.waitForText('This case requires challenged access');
      await this.waitForText('Request access');
      await this.forceClick('Request access');
      await this.waitForText('To determine if the case needs to be consolidated');
      await this.click('#reason-1');
      await this.click('Submit');
      await this.waitForText('Access successful');
      await this.see(caseId);
      await this.click('View case file');
      await this.waitForText('Your fee will be calculated based on the statement of value');
    },

    runSpecificAccessRequestSteps: async function(caseId) {
      await this.click('Search');
      await this.waitForElement('#caseRef');
      await this.fillField('#caseRef', caseId);
      await this.click('//button[@type=\'submit\']');
      await this.waitForText(caseId);
      await this.wait(5);
      await this.waitForText('Specific access', 60);
      await this.click('Specific access');
      await this.wait(5);
      await this.waitForText('Request access');
      await this.click('Request access');
      await this.waitForText('Why do you need to access this case');
      await this.fillField('#specific-reason', 'Req for iac user');
      await this.click('Submit');
      await this.waitForText('Request sent');
      await this.see(caseId);
      await this.click('My access');
      const caseIdLinkinMyAccess = `//a[contains(text(), ${caseId})]`;
      await this.waitForSelector(caseIdLinkinMyAccess);
      console.log('i am done');
    },

    runSpecificAccessApprovalSteps: async function(caseId, approveType = '7 days') {
      console.log('Test...', caseId);
      console.log('config.url.manageCase...', config.url.manageCase);
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/tasks');
      await this.waitForText('Assign to me');
      await this.click('Assign to me');
      await this.waitForText('Review Access Request');
      await this.click('Review Access Request');
      await this.waitForText('Approve request');
      await this.click('#APPROVE_REQUEST');
      await this.click('Continue');
      await this.waitForText('How long do you want to give access to this case for');
      if (approveType == '7 days') {
        await this.click('#specific-access-1');
      } else if (approveType == 'Indefinite'){
        await this.click('#specific-access-2');
      } else if (approveType == 'Another period'){
        await this.click('#specific-access-3');
      }
      await this.click('Submit');
      await this.waitForText('Access approved');
      await this.click('Return to My tasks');
      await this.see('My tasks');
    },

    verifyApprovedSpecificAccess: async function(caseId) {
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
      await this.waitForText('Your fee will be calculated based on the statement of value');
    },

    verifyStaffLink: async function (){
      await this.waitForText('Staff');
      await this.click('Staff');
      await this.waitForText('Add new user');
      await this.wait(5);
      await this.fillField({css: 'input#user-partial-name'}, 'nbc team');
      await this.wait(5);
      await this.click('#applyFilter');
      await this.waitForText('nbc teamlead');
    },

    createBooking: async function (location) {
      await this.amOnPage(config.url.manageCase + '/booking');
      await this.waitForText('Create a new booking');
      await this.waitForClickable('input#type-1');
      await this.click({css: 'input#type-1'});
      await this.click('Continue');
      await this.fillField({css: 'input#inputLocationSearch'}, location);
      await this.wait(5);
      await this.click('#mat-option-0');
      await this.wait(2);
      await this.click('Continue');
      await this.waitForText('Book your time at the location');
      await this.click({css: 'input#date-0'});
      await this.click('Continue');
      await this.waitForText('Check your new booking');
      await this.click('Confirm Booking');
      await this.waitForText('Show work filter');
      console.log('Booking is created for ', location);
    },

    verifyCreatedBooking: async function(location) {
      await this.amOnPage(config.url.manageCase + '/booking');
      await this.waitForText('Choose an existing booking');
      await this.waitForClickable('input#type-0');
      await this.click('input#type-0');
      await this.waitForText(location);
    },

    validateTaskInfo(createdTask, expectedTaskInfo) {
      if(expectedTaskInfo && createdTask) {
        for (let taskDMN of Object.keys(taskFieldsToBeValidated)) {
            console.log(`asserting dmn info: ${taskDMN} has valid data`);
            taskFieldsToBeValidated[taskDMN].forEach(
              fieldsToBeValidated  => {
                assert.deepEqual(createdTask[fieldsToBeValidated], expectedTaskInfo[fieldsToBeValidated]);
              }
            );
        }
      }
    }
  });
};
