const {I} = inject();

module.exports = {

  fields: {
    jurisdiction: 'jurisdiction',
    caseType: 'case-type',
    event: 'event',
  },
  startButton: 'Start',

  async createCase(jurisdiction) {
    await I.waitForText('Reset');
    await I.amOnPage(config.url.manageCase + '/cases/case-create/CIVIL/CIVIL/CREATE_CLAIM/CREATE_CLAIMEligibility');
    await I.waitForText('Issue civil court proceedings', 60);
  }
};
