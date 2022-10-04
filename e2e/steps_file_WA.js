// in this file you can append custom step methods to 'I' object

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
    }
  });
};
