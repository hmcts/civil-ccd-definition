const config = require('../config.js');
const {checkCaseFlagsEnabled} = require('../api/testingSupport');

module.exports = {
  removeFlagsFieldsFromFixture: async (data) => {
    if (!(await checkCaseFlagsEnabled()) || !['preview', 'demo'].includes(config.runningEnv)) {
      ['ConfirmNameAddress', 'ConfirmDetails'].forEach(pageId =>
        ['respondent1', 'respondent2'].forEach(field => {
          if (data.valid[pageId] && data.valid[pageId][field]) {
            delete data.valid[pageId][field]['flags'];
          }
        })
      );
    }
  }
};
