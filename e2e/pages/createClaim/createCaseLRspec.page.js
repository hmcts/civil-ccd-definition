const {I} = inject();

const config = require('../../config.js');

module.exports = {
   async createCaseSpecified() {
        await I.waitForText('Reset');
        await I.amOnPage(config.url.manageCase + '/cases/case-create/CIVIL/CIVIL/CREATE_CLAIM_SPEC/CREATE_CLAIM_SPECCheckList');
        await I.waitForText('Legal representatives: specified civil money claims service', 60);
    }
};

