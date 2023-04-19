const {I} = inject();
const config = require('../config.js');

module.exports = {

  async canRequestHearing(caseId) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Hearings');
    await I.click('Hearings');
    await I.waitForText('Request hearing', 60);
  },
};
