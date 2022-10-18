// in this file you can append custom step methods to 'I' object

const config = require('./config.js');

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
      await this.waitForClickable('//a[contains(text(), \'Specific access\')]', 60);
      await this.click('Specific access');
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
      await this.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId + '/tasks');
      await this.waitForText('Assign to me');
      await this.click('Assign to me');
      await this.waitForText('Review Access Request');
      await this.click('Review Access Request');
      await this.waitForText('Approve request');
      await this.click('#APPROVE_REQUEST');
      await this.clickContinue();
      await this.waitForText('How long do you want to give access to this case for');
      if (approveType == '7 days') {
        await this.click('specific-access-1');
      } else if (approveType == 'Indefinite'){
        await this.click('specific-access-2');
      } else if (approveType == 'Another period'){
        await this.click('specific-access-3');
      }
      await this.see('Access approved');
      await this.click('Return to My tasks');
      await this.see('My tasks');
    },

    verifyApprovedSpecificAccess: async function(caseId) {
      await this.amOnPage(config.url.manageCase + 'cases/case-details/' + caseId);
      await this.waitForText('Your fee will be calculated based on the statement of value');
    }
  });
};
