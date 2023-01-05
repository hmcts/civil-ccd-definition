// in this file you can append custom step methods to 'I' object

const { assert } = require('chai');

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


module.exports = function (){
  return actor({
    runChallengedAccessSteps: async function(caseId) {
      await this.click('Search');
      await this.waitForElement('#caseRef');
      await this.fillField('#caseRef', caseId);
      await this.click('//button[@type=\'submit\']');
      await this.waitForText(caseId);
      await this.waitForClickable('//a[contains(text(), \'Challenged access\')]', 60);
      await this.click('Challenged access');
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
