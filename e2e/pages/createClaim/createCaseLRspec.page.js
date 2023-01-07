const {I} = inject();

module.exports = {

  fields: {
    jurisdiction: 'jurisdiction',
    caseType: 'case-type',
    event: 'event',
  },
  startButton: 'Start',

   async createCaseSpecified(jurisdiction) {
        await I.waitForText('Reset');
        await I.amOnPage(config.url.manageCase + '/cases/case-create/CIVIL/CIVIL/CREATE_CLAIM_SPEC/CREATE_CLAIM_SPECCheckList');
        await I.waitForText('Legal representatives: specified civil money claims service', 60);
    }
};

