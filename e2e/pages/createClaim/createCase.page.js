const {I} = inject();

const config = require('../../config.js');

module.exports = {
  async createCase() {
    await I.waitForText('Case list');
    await I.amOnPage(config.url.manageCase + '/cases/case-create/CIVIL/CIVIL/CREATE_CLAIM/CREATE_CLAIMEligibility');
    await I.waitForText('Issue civil court proceedings', 60);
  }
};
